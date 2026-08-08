import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import {
  ApiClientError,
  apiClient,
  sessionToken,
} from "./apiClient";

function envelope(data: unknown, status = 200) {
  return new Response(
    JSON.stringify({
      data,
      message: "OK",
      meta: {
        requestId: "request-test",
        timestamp: "2026-07-29T00:00:00.000Z",
      },
      success: true,
    }),
    {
      headers: { "content-type": "application/json" },
      status,
    },
  );
}

function errorEnvelope(
  code: string,
  message: string,
  status: number,
) {
  return new Response(
    JSON.stringify({
      error: { code, details: null },
      message,
      meta: {
        requestId: "request-error",
        timestamp: "2026-07-29T00:00:00.000Z",
      },
      success: false,
    }),
    {
      headers: { "content-type": "application/json" },
      status,
    },
  );
}

const originalFetch = globalThis.fetch;

describe("apiClient browser session contract", () => {
  beforeEach(() => {
    sessionToken.clear();
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: {},
    });
    Object.defineProperty(globalThis, "document", {
      configurable: true,
      value: { cookie: "" },
    });
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    Reflect.deleteProperty(globalThis, "window");
    Reflect.deleteProperty(globalThis, "document");
  });

  it("maps backend error codes and request IDs without replacing the safe message", async () => {
    globalThis.fetch = async () =>
      errorEnvelope(
        "VERIFICATION_NOT_RETRYABLE",
        "Only failed or cancelled verifications can be retried",
        409,
      );

    await assert.rejects(
      apiClient.post("/admin/verifications/id/retry"),
      (error: unknown) => {
        assert.ok(error instanceof ApiClientError);
        assert.equal(error.code, "VERIFICATION_NOT_RETRYABLE");
        assert.equal(
          error.message,
          "Only failed or cancelled verifications can be retried",
        );
        assert.equal(error.requestId, "request-error");
        assert.equal(error.status, 409);
        return true;
      },
    );
  });

  it("rotates with the readable CSRF cookie and retries with the new bearer token", async () => {
    document.cookie = "verith_csrf=csrf-test";
    const responses = [
      errorEnvelope("AUTHENTICATION_REQUIRED", "Sign in required", 401),
      envelope({
        accessToken: "rotated-access-token",
        accessTokenExpiresIn: "15m",
        user: { id: "user-1" },
      }),
      envelope({ id: "user-1" }),
    ];
    const calls: Array<[RequestInfo | URL, RequestInit | undefined]> = [];
    globalThis.fetch = async (input, init) => {
      calls.push([input, init]);
      return responses.shift()!;
    };

    const result = await apiClient.get<{ id: string }>("/users/me");

    assert.deepEqual(result, { id: "user-1" });
    assert.equal(calls.length, 3);
    assert.match(String(calls[1]![0]), /\/api\/v1\/auth\/refresh$/);
    assert.equal(
      (calls[1]![1]!.headers as Record<string, string>)["x-csrf-token"],
      "csrf-test",
    );
    const retriedHeaders = new Headers(calls[2]![1]?.headers);
    assert.equal(
      retriedHeaders.get("authorization"),
      "Bearer rotated-access-token",
    );
  });

  it("coalesces concurrent 401 responses into one refresh request", async () => {
    document.cookie = "verith_csrf=csrf-lock";
    let refreshCalls = 0;
    globalThis.fetch = async (input, init) => {
      const url = String(input);
      if (url.endsWith("/auth/refresh")) {
        refreshCalls += 1;
        await Promise.resolve();
        return envelope({
          accessToken: "shared-token",
          accessTokenExpiresIn: "15m",
          user: { id: "user-1" },
        });
      }
      const headers = new Headers(init?.headers);
      return headers.get("authorization") === "Bearer shared-token"
        ? envelope({ ok: true })
        : errorEnvelope(
            "AUTHENTICATION_REQUIRED",
            "Sign in required",
            401,
          );
    };

    await Promise.all([
      apiClient.get("/notifications"),
      apiClient.get("/users/me"),
    ]);

    assert.equal(refreshCalls, 1);
  });
});
