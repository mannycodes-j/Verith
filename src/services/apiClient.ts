// Browser traffic stays on the frontend origin and is forwarded to the API by
// the Next.js rewrite. This keeps refresh and CSRF cookies first-party when the
// frontend and backend are hosted by different providers (for example, Vercel
// and Render).
const API_ORIGIN = "";
const API_PREFIX = "/api/v1";
const CSRF_STORAGE_KEY = "verith_csrf_token";

interface ResponseMeta {
  requestId: string;
  timestamp: string;
}

interface SuccessEnvelope<T> {
  success: true;
  message: string;
  data: T;
  meta: ResponseMeta;
}

interface ErrorEnvelope {
  success: false;
  message: string;
  error: {
    code: string;
    details: unknown;
  };
  meta: ResponseMeta;
}

export class ApiClientError extends Error {
  readonly status: number;
  readonly code: string;
  readonly details: unknown;
  readonly requestId?: string;
  readonly isUnavailable: boolean;

  constructor({
    message,
    status,
    code = "REQUEST_FAILED",
    details = null,
    requestId,
  }: {
    message: string;
    status: number;
    code?: string;
    details?: unknown;
    requestId?: string;
  }) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.code = code;
    this.details = details;
    this.requestId = requestId;
    this.isUnavailable = status === 502 || status === 503 || status === 504;
  }
}

interface AuthenticationPayload {
  accessToken: string;
  accessTokenExpiresIn: string;
  csrfToken?: string;
  user: Record<string, unknown>;
}

let accessToken: string | null = null;
let refreshRequest: Promise<boolean> | null = null;

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;

  const prefix = `${encodeURIComponent(name)}=`;
  const cookie = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(prefix));

  return cookie ? decodeURIComponent(cookie.slice(prefix.length)) : undefined;
}

function getStoredCsrfToken(): string | undefined {
  const cookieToken = getCookie("verith_csrf");
  if (cookieToken) return cookieToken;
  if (typeof window === "undefined") return undefined;
  try {
    return window.localStorage.getItem(CSRF_STORAGE_KEY) ?? undefined;
  } catch {
    return undefined;
  }
}

function storeCsrfToken(token?: string) {
  if (typeof window === "undefined") return;
  try {
    if (token) window.localStorage.setItem(CSRF_STORAGE_KEY, token);
    else window.localStorage.removeItem(CSRF_STORAGE_KEY);
  } catch {
    // Same-site deployments can still read the non-HTTP-only CSRF cookie when
    // browser storage is unavailable.
  }
}

function isErrorEnvelope(value: unknown): value is ErrorEnvelope {
  if (!value || typeof value !== "object") return false;
  return "success" in value && value.success === false;
}

function isSuccessEnvelope<T>(value: unknown): value is SuccessEnvelope<T> {
  if (!value || typeof value !== "object") return false;
  return "success" in value && value.success === true && "data" in value;
}

function isDataLessSuccessEnvelope(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  return "success" in value && value.success === true && !("data" in value);
}

async function parseResponseBody(response: Response): Promise<unknown> {
  if (response.status === 204) return undefined;

  const contentType = response.headers.get("content-type");
  if (!contentType?.includes("application/json")) return undefined;

  return response.json();
}

async function refreshBrowserSession(): Promise<boolean> {
  if (typeof window === "undefined") return false;
  if (refreshRequest) return refreshRequest;

  refreshRequest = (async () => {
    const csrfToken = getStoredCsrfToken();
    if (!csrfToken) return false;

    try {
      const response = await fetch(`${API_ORIGIN}${API_PREFIX}/auth/refresh`, {
        body: "{}",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": csrfToken,
        },
        method: "POST",
      });
      const body: unknown = await parseResponseBody(response);

      if (!response.ok || !isSuccessEnvelope<AuthenticationPayload>(body)) {
        accessToken = null;
        storeCsrfToken();
        return false;
      }

      accessToken = body.data.accessToken;
      storeCsrfToken(body.data.csrfToken);
      return true;
    } catch {
      accessToken = null;
      return false;
    } finally {
      refreshRequest = null;
    }
  })();

  return refreshRequest;
}

interface RequestOptions extends RequestInit {
  allowDataLessSuccess?: boolean;
  retryAuthentication?: boolean;
}

async function request<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const {
    allowDataLessSuccess = false,
    retryAuthentication = true,
    headers: providedHeaders,
    ...fetchOptions
  } = options;
  const headers = new Headers(providedHeaders);

  if (
    !headers.has("Content-Type") &&
    fetchOptions.body !== undefined &&
    !(fetchOptions.body instanceof FormData)
  ) {
    headers.set("Content-Type", "application/json");
  }
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  let response: Response;
  try {
    response = await fetch(`${API_ORIGIN}${API_PREFIX}${endpoint}`, {
      ...fetchOptions,
      credentials: "include",
      headers,
    });
  } catch {
    throw new ApiClientError({
      code: "NETWORK_UNAVAILABLE",
      message:
        "Verith could not reach the service. Check your connection and try again.",
      status: 503,
    });
  }

  if (response.status === 401 && retryAuthentication) {
    const refreshed = await refreshBrowserSession();
    if (refreshed) {
      return request<T>(endpoint, {
        ...options,
        retryAuthentication: false,
      });
    }
  }

  const body: unknown = await parseResponseBody(response);

  if (!response.ok) {
    if (isErrorEnvelope(body)) {
      throw new ApiClientError({
        code: body.error.code,
        details: body.error.details,
        message: body.message,
        requestId: body.meta.requestId,
        status: response.status,
      });
    }

    throw new ApiClientError({
      message: `The request failed with status ${response.status}.`,
      status: response.status,
    });
  }

  if (response.status === 204) return undefined as T;
  if (isSuccessEnvelope<T>(body)) {
    return (allowDataLessSuccess ? undefined : body.data) as T;
  }
  if (
    allowDataLessSuccess &&
    (body === undefined || isDataLessSuccessEnvelope(body))
  ) {
    return undefined as T;
  }

  throw new ApiClientError({
    code: "INVALID_API_RESPONSE",
    message: "Verith received an unexpected response from the service.",
    status: 502,
  });
}

async function streamRequest(
  endpoint: string,
  signal: AbortSignal,
  retryAuthentication = true,
): Promise<Response> {
  const headers = new Headers({ Accept: "text/event-stream" });
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  let response: Response;
  try {
    response = await fetch(`${API_ORIGIN}${API_PREFIX}${endpoint}`, {
      cache: "no-store",
      credentials: "include",
      headers,
      signal,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw error;
    }
    throw new ApiClientError({
      code: "STREAM_UNAVAILABLE",
      message: "The live update stream could not be reached.",
      status: 503,
    });
  }

  if (response.status === 401 && retryAuthentication) {
    const refreshed = await refreshBrowserSession();
    if (refreshed) return streamRequest(endpoint, signal, false);
  }

  if (!response.ok) {
    const body: unknown = await parseResponseBody(response);
    if (isErrorEnvelope(body)) {
      throw new ApiClientError({
        code: body.error.code,
        details: body.error.details,
        message: body.message,
        requestId: body.meta.requestId,
        status: response.status,
      });
    }
    throw new ApiClientError({
      code: "STREAM_REQUEST_FAILED",
      message: `The live update stream failed with status ${response.status}.`,
      status: response.status,
    });
  }

  if (!response.body) {
    throw new ApiClientError({
      code: "STREAM_BODY_UNAVAILABLE",
      message: "The service did not return a readable update stream.",
      status: 502,
    });
  }
  return response;
}

async function downloadRequest(
  endpoint: string,
  providedHeaders?: HeadersInit,
  retryAuthentication = true,
): Promise<{ blob: Blob; filename?: string }> {
  const headers = new Headers(providedHeaders);
  if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);

  let response: Response;
  try {
    response = await fetch(`${API_ORIGIN}${API_PREFIX}${endpoint}`, {
      credentials: "include",
      headers,
    });
  } catch {
    throw new ApiClientError({
      code: "DOWNLOAD_UNAVAILABLE",
      message: "The report download service could not be reached.",
      status: 503,
    });
  }

  if (response.status === 401 && retryAuthentication) {
    const refreshed = await refreshBrowserSession();
    if (refreshed) return downloadRequest(endpoint, providedHeaders, false);
  }

  if (!response.ok) {
    const body: unknown = await parseResponseBody(response);
    if (isErrorEnvelope(body)) {
      throw new ApiClientError({
        code: body.error.code,
        details: body.error.details,
        message: body.message,
        requestId: body.meta.requestId,
        status: response.status,
      });
    }
    throw new ApiClientError({
      code: "REPORT_EXPORT_FAILED",
      message: `The report export failed with status ${response.status}.`,
      status: response.status,
    });
  }

  const disposition = response.headers.get("content-disposition");
  const encodedFilename = disposition?.match(/filename\*=UTF-8''([^;]+)/i)?.[1];
  const quotedFilename = disposition?.match(/filename="([^"]+)"/i)?.[1];
  const filename = encodedFilename
    ? decodeURIComponent(encodedFilename)
    : quotedFilename;
  return { blob: await response.blob(), filename };
}

function serializeBody(body: unknown): BodyInit | undefined {
  if (body === undefined) return undefined;
  if (body instanceof FormData) return body;
  return JSON.stringify(body);
}

export const sessionToken = {
  clear() {
    accessToken = null;
    storeCsrfToken();
  },
  set(token: string, csrfToken?: string) {
    accessToken = token;
    storeCsrfToken(csrfToken);
  },
};

export const apiClient = {
  delete: <T>(
    endpoint: string,
    body?: unknown,
    options?: RequestOptions,
  ) =>
    request<T>(endpoint, {
      ...options,
      body: serializeBody(body),
      method: "DELETE",
    }),
  deleteVoid: (
    endpoint: string,
    body?: unknown,
    options?: RequestOptions,
  ) =>
    request<void>(endpoint, {
      ...options,
      allowDataLessSuccess: true,
      body: serializeBody(body),
      method: "DELETE",
    }),
  download: (endpoint: string, headers?: HeadersInit) =>
    downloadRequest(endpoint, headers),
  get: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: "GET" }),
  patch: <T>(
    endpoint: string,
    body?: unknown,
    options?: RequestOptions,
  ) =>
    request<T>(endpoint, {
      ...options,
      body: serializeBody(body),
      method: "PATCH",
    }),
  post: <T>(
    endpoint: string,
    body?: unknown,
    options?: RequestOptions,
  ) =>
    request<T>(endpoint, {
      ...options,
      body: serializeBody(body),
      method: "POST",
    }),
  postVoid: (
    endpoint: string,
    body?: unknown,
    options?: RequestOptions,
  ) =>
    request<void>(endpoint, {
      ...options,
      allowDataLessSuccess: true,
      body: serializeBody(body),
      method: "POST",
    }),
  put: <T>(
    endpoint: string,
    body?: unknown,
    options?: RequestOptions,
  ) =>
    request<T>(endpoint, {
      ...options,
      body: serializeBody(body),
      method: "PUT",
    }),
  stream: (endpoint: string, signal: AbortSignal) =>
    streamRequest(endpoint, signal),
};
