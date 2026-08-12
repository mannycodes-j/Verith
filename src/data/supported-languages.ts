export const SUPPORTED_LANGUAGES = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
  { code: "yo", label: "Yorùbá" },
] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]["code"];

export const isSupportedLanguage = (
  value: unknown,
): value is SupportedLanguage =>
  SUPPORTED_LANGUAGES.some((language) => language.code === value);

export const resolveSupportedLanguage = (
  ...candidates: unknown[]
): SupportedLanguage =>
  candidates.find(isSupportedLanguage) ?? "en";
