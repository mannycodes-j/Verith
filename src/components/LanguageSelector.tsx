"use client";

import { useEffect, useRef, useState } from "react";
import { Globe, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SUPPORTED_LANGUAGES,
  isSupportedLanguage,
  type SupportedLanguage,
} from "@/data/supported-languages";
import {
  applyInterfaceLanguage,
  GOOGLE_TRANSLATE_READY_EVENT,
  getCurrentInterfaceLanguage,
  INTERFACE_LANGUAGE_EVENT,
  isInterfaceLanguageStorageEvent,
  setCurrentInterfaceLanguage,
} from "@/utils/interface-language";

export default function LanguageSelector({
  name,
  defaultValue,
  id,
  onChange,
  value,
  variant = "subtle",
  syncInterface = true,
}: {
  name?: string;
  defaultValue?: string;
  id?: string;
  onChange?: (language: SupportedLanguage) => void;
  value?: SupportedLanguage;
  variant?: "subtle" | "input";
  syncInterface?: boolean;
}) {
  const initialLanguage = isSupportedLanguage(value)
    ? value
    : isSupportedLanguage(defaultValue)
      ? defaultValue
      : "en";
  const [lang, setLang] = useState<SupportedLanguage>(initialLanguage);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setLang(
        value ??
          (isSupportedLanguage(defaultValue)
            ? defaultValue
            : getCurrentInterfaceLanguage()),
      );
    });
    return () => window.cancelAnimationFrame(frame);
  }, [defaultValue, value]);

  useEffect(() => {
    if (!syncInterface || value !== undefined) return;
    const syncLanguage = (event?: Event) => {
      const detail = (event as CustomEvent<unknown> | undefined)?.detail;
      setLang(
        isSupportedLanguage(detail)
          ? detail
          : getCurrentInterfaceLanguage(),
      );
    };
    const syncStoredLanguage = (event: StorageEvent) => {
      if (isInterfaceLanguageStorageEvent(event)) syncLanguage();
    };
    const applyPendingLanguage = () => {
      const current = getCurrentInterfaceLanguage();
      setLang(current);
      applyInterfaceLanguage(current);
    };
    window.addEventListener(INTERFACE_LANGUAGE_EVENT, syncLanguage);
    window.addEventListener("storage", syncStoredLanguage);
    window.addEventListener(
      GOOGLE_TRANSLATE_READY_EVENT,
      applyPendingLanguage,
    );
    return () => {
      window.removeEventListener(INTERFACE_LANGUAGE_EVENT, syncLanguage);
      window.removeEventListener("storage", syncStoredLanguage);
      window.removeEventListener(
        GOOGLE_TRANSLATE_READY_EVENT,
        applyPendingLanguage,
      );
    };
  }, [syncInterface, value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (newLang: SupportedLanguage) => {
    setLang(newLang);
    setIsOpen(false);
    if (syncInterface) setCurrentInterfaceLanguage(newLang);
    onChange?.(newLang);
  };

  const activeLanguage = value ?? lang;
  const selectedLang =
    SUPPORTED_LANGUAGES.find((language) => language.code === activeLanguage) ??
    SUPPORTED_LANGUAGES[0];

  return (
    <div
      className="notranslate relative inline-block text-left"
      ref={containerRef}
      translate="no"
    >
      <input type="hidden" name={name} id={id} value={activeLanguage} />
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={
          variant === "input"
            ? "flex min-h-12 w-full items-center justify-between gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 text-base text-white/70 transition-all hover:border-white/20 focus:border-white/30 focus:bg-white/10 focus:outline-none focus:ring-4 focus:ring-violet-500/15"
            : "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
        }
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2">
          {variant === "subtle" && <Globe size={14} className="opacity-100" />}
          {selectedLang.label}
        </span>
        {variant === "input" && (
          <svg className="h-4 w-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={`absolute z-50 mt-2 w-40 origin-top rounded-xl border border-white/10 bg-[#171717] p-1 shadow-2xl backdrop-blur-xl ${
              variant === "input" ? "left-0" : "right-0 origin-top-right"
            }`}
          >
            <div className="grid gap-0.5">
              {SUPPORTED_LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => handleChange(l.code)}
                  className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
                    activeLanguage === l.code
                      ? "bg-white/10 text-white"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {l.label}
                  {activeLanguage === l.code && <Check size={12} className="text-white/80" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
