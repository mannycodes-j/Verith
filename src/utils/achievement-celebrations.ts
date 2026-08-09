export const ACHIEVEMENT_CHECK_EVENT = "verith:achievement-check";
export const ACHIEVEMENT_PRESENTATION_LEASE_KEY =
  "verith:achievement-presentation-lease";
export const PENDING_CELEBRATION_ACKNOWLEDGEMENTS_KEY =
  "verith:pending-celebration-acknowledgements";

const PRESENTATION_LEASE_DURATION_MS = 15_000;
const PENDING_ACKNOWLEDGEMENT_MAX_AGE_MS = 24 * 60 * 60_000;

type StorageAdapter = Pick<Storage, "getItem" | "removeItem" | "setItem">;

export interface AchievementCheckOptions {
  allowDuringCriticalInteraction?: boolean;
}

export interface AchievementPresentationLease {
  expiresAt: number;
  ownerId: string;
}

export interface PendingCelebrationAcknowledgement {
  celebrationId: string;
  claimToken: string;
  queuedAt: number;
}

function parseJson<T>(value: string | null): T | undefined {
  if (!value) return undefined;
  try {
    return JSON.parse(value) as T;
  } catch {
    return undefined;
  }
}

function scopedStorageKey(key: string, scope?: string) {
  return scope ? `${key}:${scope}` : key;
}

export function achievementPresentationLeaseKey(scope?: string) {
  return scopedStorageKey(ACHIEVEMENT_PRESENTATION_LEASE_KEY, scope);
}

export function achievementCheckAllowsCriticalInteraction(event: Event) {
  return Boolean(
    (event as CustomEvent<AchievementCheckOptions>).detail
      ?.allowDuringCriticalInteraction,
  );
}

export function isAchievementCriticalRoute(pathname: string) {
  return (
    pathname.includes("/app/quizzes/") ||
    pathname.includes("/app/challenges/") ||
    pathname.includes("/app/missions/") ||
    pathname === "/app/verify"
  );
}

export function readAchievementPresentationLease(
  storage: StorageAdapter,
  scope?: string,
): AchievementPresentationLease | undefined {
  let value: AchievementPresentationLease | undefined;
  try {
    value = parseJson<AchievementPresentationLease>(
      storage.getItem(achievementPresentationLeaseKey(scope)),
    );
  } catch {
    return undefined;
  }
  return value &&
    typeof value.ownerId === "string" &&
    Number.isFinite(value.expiresAt)
    ? value
    : undefined;
}

export function acquireAchievementPresentationLease(
  storage: StorageAdapter,
  ownerId: string,
  now = Date.now(),
  scope?: string,
) {
  const current = readAchievementPresentationLease(storage, scope);
  if (current && current.ownerId !== ownerId && current.expiresAt > now) {
    return false;
  }
  const lease = {
    expiresAt: now + PRESENTATION_LEASE_DURATION_MS,
    ownerId,
  } satisfies AchievementPresentationLease;
  storage.setItem(
    achievementPresentationLeaseKey(scope),
    JSON.stringify(lease),
  );
  return readAchievementPresentationLease(storage, scope)?.ownerId === ownerId;
}

export function releaseAchievementPresentationLease(
  storage: StorageAdapter,
  ownerId: string,
  scope?: string,
) {
  try {
    if (readAchievementPresentationLease(storage, scope)?.ownerId === ownerId) {
      storage.removeItem(achievementPresentationLeaseKey(scope));
    }
  } catch {
    // Storage may become unavailable while a tab is closing.
  }
}

export function readPendingCelebrationAcknowledgements(
  storage: StorageAdapter,
  now = Date.now(),
  scope?: string,
) {
  let value: PendingCelebrationAcknowledgement[] | undefined;
  try {
    value = parseJson<PendingCelebrationAcknowledgement[]>(
      storage.getItem(
        scopedStorageKey(PENDING_CELEBRATION_ACKNOWLEDGEMENTS_KEY, scope),
      ),
    );
  } catch {
    return [];
  }
  if (!Array.isArray(value)) return [];
  return value.filter(
    (item) =>
      typeof item?.celebrationId === "string" &&
      typeof item.claimToken === "string" &&
      Number.isFinite(item.queuedAt) &&
      item.queuedAt >= now - PENDING_ACKNOWLEDGEMENT_MAX_AGE_MS,
  );
}

export function queueCelebrationAcknowledgement(
  storage: StorageAdapter,
  acknowledgement: PendingCelebrationAcknowledgement,
  scope?: string,
) {
  const records = readPendingCelebrationAcknowledgements(
    storage,
    Date.now(),
    scope,
  ).filter(
    (item) => item.celebrationId !== acknowledgement.celebrationId,
  );
  try {
    storage.setItem(
      scopedStorageKey(PENDING_CELEBRATION_ACKNOWLEDGEMENTS_KEY, scope),
      JSON.stringify([...records, acknowledgement]),
    );
  } catch {
    // Acknowledgement still proceeds in memory when storage is unavailable.
  }
}

export function removeCelebrationAcknowledgement(
  storage: StorageAdapter,
  celebrationId: string,
  scope?: string,
) {
  const records = readPendingCelebrationAcknowledgements(
    storage,
    Date.now(),
    scope,
  ).filter(
    (item) => item.celebrationId !== celebrationId,
  );
  try {
    if (records.length === 0) {
      storage.removeItem(
        scopedStorageKey(PENDING_CELEBRATION_ACKNOWLEDGEMENTS_KEY, scope),
      );
      return;
    }
    storage.setItem(
      scopedStorageKey(PENDING_CELEBRATION_ACKNOWLEDGEMENTS_KEY, scope),
      JSON.stringify(records),
    );
  } catch {
    // Nothing else is required; the server remains authoritative.
  }
}

export function requestAchievementCelebrationCheck(
  options: AchievementCheckOptions = {},
) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<AchievementCheckOptions>(ACHIEVEMENT_CHECK_EVENT, {
      detail: options,
    }),
  );
}
