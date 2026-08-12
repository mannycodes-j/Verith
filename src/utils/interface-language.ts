import {
  isSupportedLanguage,
  type SupportedLanguage,
} from "@/data/supported-languages";

const STORAGE_KEY = "verith:interface-language";
export const INTERFACE_LANGUAGE_EVENT = "verith:interface-language-changed";
export const GOOGLE_TRANSLATE_READY_EVENT = "verith:google-translate-ready";

function clearGoogleTranslateCookies(): void {
  if (typeof document === "undefined") return;
  document.cookie = "googtrans=; path=/; Max-Age=0; SameSite=Lax";
  const hostname = window.location.hostname;
  if (hostname) {
    document.cookie = `googtrans=; path=/; domain=${hostname}; Max-Age=0; SameSite=Lax`;
    document.cookie = `googtrans=; path=/; domain=.${hostname}; Max-Age=0; SameSite=Lax`;
  }
}

function cookieLanguage(): SupportedLanguage | undefined {
  if (typeof document === "undefined") return undefined;
  const entries = document.cookie
    .split("; ")
    .filter((cookie) => cookie.startsWith("googtrans="));
  for (let index = entries.length - 1; index >= 0; index -= 1) {
    const entry = entries[index];
    const raw = entry.slice("googtrans=".length);
    let value = raw;
    try {
      value = decodeURIComponent(raw);
    } catch {
      // Ignore malformed cookie encoding and inspect the raw value safely.
    }
    const code = value.split("/").filter(Boolean).at(-1);
    if (isSupportedLanguage(code)) return code;
  }
  return undefined;
}

export function getCurrentInterfaceLanguage(): SupportedLanguage {
  if (typeof window === "undefined") return "en";
  const translated = cookieLanguage();
  if (translated) return translated;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (isSupportedLanguage(stored)) return stored;
  return "en";
}

export function applyInterfaceLanguage(language: SupportedLanguage): boolean {
  if (typeof document === "undefined") return false;
  const googleSelect = document.querySelector<HTMLSelectElement>(
    "select.goog-te-combo",
  );
  if (!googleSelect) return false;
  const nextValue = language === "en" ? "" : language;
  if (googleSelect.value !== nextValue) {
    googleSelect.value = nextValue;
    googleSelect.dispatchEvent(new Event("change", { bubbles: true }));
  }
  return true;
}

export function setCurrentInterfaceLanguage(
  language: SupportedLanguage,
): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, language);
  document.documentElement.lang = language;
  clearGoogleTranslateCookies();
  if (language !== "en") {
    document.cookie = `googtrans=/en/${language}; path=/; SameSite=Lax`;
  }
  window.dispatchEvent(
    new CustomEvent(INTERFACE_LANGUAGE_EVENT, { detail: language }),
  );
  if (language === "en") {
    // Google Translate does not expose the source language as a translated
    // option. Reloading after clearing its cookie restores React's original
    // English DOM while preserving the current route and query string.
    window.location.reload();
    return;
  }
  applyInterfaceLanguage(language);
}

export function isInterfaceLanguageStorageEvent(event: StorageEvent): boolean {
  return event.key === STORAGE_KEY && isSupportedLanguage(event.newValue);
}
