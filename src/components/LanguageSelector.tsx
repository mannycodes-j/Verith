"use client";

import { useEffect, useRef, useState } from "react";
import { Globe, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const languages = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "yo", label: "Yorùbá" },
];

export default function LanguageSelector({
  name,
  defaultValue,
  id,
  variant = "subtle",
}: {
  name?: string;
  defaultValue?: string;
  id?: string;
  variant?: "subtle" | "input";
}) {
  const [lang, setLang] = useState(defaultValue || "en");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if googtrans cookie is set
    const cookies = document.cookie.split("; ");
    const googtrans = cookies.find((c) => c.startsWith("googtrans="));
    if (googtrans) {
      const val = googtrans.split("=")[1];
      if (val.includes("fr")) setLang("fr");
      else if (val.includes("yo")) setLang("yo");
      else setLang("en");
    }
  }, []);

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

  const handleChange = (newLang: string) => {
    setLang(newLang);
    setIsOpen(false);
    
    // Set googtrans cookie
    const val = newLang === "en" ? "/en/en" : `/en/${newLang}`;
    
    document.cookie = `googtrans=${val}; path=/`;
    document.cookie = `googtrans=${val}; path=/; domain=${window.location.hostname}`;
    
    // Reload to apply translation
    window.location.reload();
  };

  const selectedLang = languages.find((l) => l.code === lang) || languages[0];

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <input type="hidden" name={name} id={id} value={lang} />
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
              {languages.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => handleChange(l.code)}
                  className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
                    lang === l.code
                      ? "bg-white/10 text-white"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {l.label}
                  {lang === l.code && <Check size={12} className="text-white/80" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
