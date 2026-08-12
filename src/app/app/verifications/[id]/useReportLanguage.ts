"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  isSupportedLanguage,
  type SupportedLanguage,
} from "@/data/supported-languages";

export function useReportLanguage(): [
  SupportedLanguage | undefined,
  (language: SupportedLanguage) => void,
] {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const raw = searchParams.get("language");
  const language = isSupportedLanguage(raw) ? raw : undefined;
  return [language, (next) => {
    const query = new URLSearchParams(searchParams.toString());
    query.set("language", next);
    router.replace(`${pathname}?${query}`, { scroll: false });
  }];
}
