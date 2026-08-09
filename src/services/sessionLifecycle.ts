export const SESSION_IDENTITY_CHANGE_EVENT =
  "verith:session-identity-change";
export const SESSION_IDENTITY_CHANGE_STORAGE_KEY =
  "verith:session-identity-change:last";

export type SessionIdentityChangeReason =
  | "AUTHENTICATED"
  | "LOGOUT"
  | "PASSWORD_CHANGED"
  | "REFRESH_FAILED"
  | "SESSION_CLEARED"
  | "SESSION_REVOKED"
  | "SIGNED_OUT_EVERYWHERE";

const SESSION_IDENTITY_CHANGE_REASONS = new Set<SessionIdentityChangeReason>([
  "AUTHENTICATED",
  "LOGOUT",
  "PASSWORD_CHANGED",
  "REFRESH_FAILED",
  "SESSION_CLEARED",
  "SESSION_REVOKED",
  "SIGNED_OUT_EVERYWHERE",
]);

export interface SessionIdentityChange {
  changedAt: number;
  id: string;
  reason: SessionIdentityChangeReason;
}

type StorageAdapter = Pick<Storage, "getItem" | "setItem">;

interface SessionLifecycleHost {
  addEventListener(type: string, listener: EventListener): void;
  dispatchEvent(event: Event): boolean;
  localStorage?: StorageAdapter;
  removeEventListener(type: string, listener: EventListener): void;
}

export interface SessionBoundQueryCache {
  cancelQueries(): Promise<unknown>;
  clear(): void;
}

function browserHost(): SessionLifecycleHost | undefined {
  if (
    typeof window === "undefined" ||
    typeof window.addEventListener !== "function" ||
    typeof window.removeEventListener !== "function" ||
    typeof window.dispatchEvent !== "function"
  ) {
    return undefined;
  }
  return window as unknown as SessionLifecycleHost;
}

function changeId() {
  return (
    globalThis.crypto?.randomUUID?.() ??
    `${Date.now()}-${Math.random().toString(36).slice(2)}`
  );
}

function isSessionIdentityChange(
  value: unknown,
): value is SessionIdentityChange {
  if (!value || typeof value !== "object") return false;
  const record = value as Partial<SessionIdentityChange>;
  return (
    typeof record.id === "string" &&
    record.id.length > 0 &&
    typeof record.changedAt === "number" &&
    Number.isFinite(record.changedAt) &&
    typeof record.reason === "string" &&
    SESSION_IDENTITY_CHANGE_REASONS.has(
      record.reason as SessionIdentityChangeReason,
    )
  );
}

function parseSessionIdentityChange(value: string | null) {
  if (!value) return undefined;
  try {
    const parsed: unknown = JSON.parse(value);
    return isSessionIdentityChange(parsed) ? parsed : undefined;
  } catch {
    return undefined;
  }
}

function identityChangeEvent(change: SessionIdentityChange) {
  const event = new Event(SESSION_IDENTITY_CHANGE_EVENT);
  Object.defineProperty(event, "detail", {
    configurable: false,
    enumerable: true,
    value: change,
  });
  return event;
}

/**
 * Announces a browser-session identity boundary in this tab and every other
 * same-origin tab. No user identifier or credential is stored in browser storage.
 */
export function publishSessionIdentityChange(
  reason: SessionIdentityChangeReason,
  host = browserHost(),
) {
  if (!host) return undefined;
  const change = {
    changedAt: Date.now(),
    id: changeId(),
    reason,
  } satisfies SessionIdentityChange;

  host.dispatchEvent(identityChangeEvent(change));
  try {
    host.localStorage?.setItem(
      SESSION_IDENTITY_CHANGE_STORAGE_KEY,
      JSON.stringify(change),
    );
  } catch {
    // The in-tab event remains sufficient when browser storage is unavailable.
  }
  return change;
}

/**
 * Subscribes to local identity changes and the storage signal produced by
 * another tab. The returned cleanup removes both listeners.
 */
export function subscribeToSessionIdentityChanges(
  listener: (change: SessionIdentityChange) => void,
  host = browserHost(),
) {
  if (!host) return () => undefined;
  let lastDeliveredId: string | undefined;
  const deliver = (change: SessionIdentityChange | undefined) => {
    if (!change || change.id === lastDeliveredId) return;
    lastDeliveredId = change.id;
    listener(change);
  };
  const localListener: EventListener = (event) => {
    deliver(
      isSessionIdentityChange(
        (event as Event & { detail?: unknown }).detail,
      )
        ? (event as Event & { detail: SessionIdentityChange }).detail
        : undefined,
    );
  };
  const storageListener: EventListener = (event) => {
    const storageEvent = event as Event & {
      key?: string | null;
      newValue?: string | null;
    };
    if (storageEvent.key !== SESSION_IDENTITY_CHANGE_STORAGE_KEY) return;
    deliver(parseSessionIdentityChange(storageEvent.newValue ?? null));
  };

  host.addEventListener(SESSION_IDENTITY_CHANGE_EVENT, localListener);
  host.addEventListener("storage", storageListener);
  return () => {
    host.removeEventListener(SESSION_IDENTITY_CHANGE_EVENT, localListener);
    host.removeEventListener("storage", storageListener);
  };
}

/**
 * Cancels active reads before synchronously removing cached queries and
 * mutations. Cancellation is best-effort; cache disposal must still happen if
 * a custom query function cannot be cancelled.
 */
export function clearSessionBoundQueryCache(cache: SessionBoundQueryCache) {
  let cancellation: Promise<unknown> | undefined;
  try {
    cancellation = cache.cancelQueries();
  } catch {
    // Cache removal below is the privacy boundary, even if cancellation fails.
  }
  cache.clear();
  void cancellation?.catch(() => undefined);
}
