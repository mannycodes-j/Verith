export const VERIFICATION_RESEND_COOLDOWN_MS = 3 * 60 * 1000;

const STORAGE_KEY = "verith:verification-resend-available-at";

export function getVerificationResendAvailableAt(): number {
  if (typeof window === "undefined") return 0;

  try {
    const value = Number(window.localStorage.getItem(STORAGE_KEY));
    if (Number.isFinite(value) && value > Date.now()) return value;
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage can be unavailable in privacy-restricted browser contexts.
  }

  return 0;
}

export function startVerificationResendCooldown(): number {
  const availableAt = Date.now() + VERIFICATION_RESEND_COOLDOWN_MS;

  try {
    window.localStorage.setItem(STORAGE_KEY, String(availableAt));
  } catch {
    // The in-memory countdown still protects the current page session.
  }

  return availableAt;
}
