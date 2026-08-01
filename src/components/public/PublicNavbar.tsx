"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import UnequalMenuBars from "@/components/UnequalMenuBars";
import VerithLogo from "@/components/brand/VerithLogo";

const publicLinks = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/learning", label: "Learning" },
  { href: "/whatsapp", label: "WhatsApp" },
  { href: "/about", label: "About" },
] as const;

export default function PublicNavbar({
  mainId = "main-content",
}: {
  mainId?: string;
}) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 18);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const closeOnOutsidePress = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("pointerdown", closeOnOutsidePress);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("pointerdown", closeOnOutsidePress);
    };
  }, [menuOpen]);

  return (
    <>
      <a
        className="fixed top-4 left-4 z-[70] -translate-y-[160%] rounded-full bg-white px-4 py-3 text-sm font-semibold text-black transition-transform focus:translate-y-0"
        href={`#${mainId}`}
      >
        Skip to content
      </a>
      <motion.header
        animate={{ opacity: 1, y: 0 }}
        className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-4 sm:pt-4 md:pt-6"
        initial={reduceMotion ? false : { opacity: 0, y: -40 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          animate={{
            backgroundColor: scrolled ? "rgba(9,9,11,.88)" : "rgba(255,255,255,.025)",
            borderColor: scrolled ? "rgba(255,255,255,.14)" : "rgba(255,255,255,.07)",
            boxShadow: scrolled ? "0 18px 55px rgba(0,0,0,.38)" : "0 0 0 rgba(0,0,0,0)",
          }}
          className="pointer-events-auto relative w-full max-w-6xl rounded-[1.75rem] border px-3 py-2 backdrop-blur-2xl sm:rounded-full sm:px-4 sm:py-2.5"
          ref={menuRef}
          transition={{ duration: 0.35 }}
        >
          <nav className="flex items-center justify-between" aria-label="Primary navigation">
            <Link aria-label="Verith home" className="flex items-center gap-2.5 pl-1" href="/">
              <VerithLogo />
            </Link>

            <div className="hidden items-center gap-1 lg:flex">
              {publicLinks.map((link) => {
                const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
                return (
                  <Link
                    className="relative rounded-full px-4 py-2 text-xs font-semibold text-white/50 transition-colors hover:bg-white/[.05] hover:text-white"
                    href={link.href}
                    key={link.href}
                  >
                    {active && (
                      <motion.span
                        className="absolute inset-0 rounded-full bg-white/[.07]"
                        layoutId="public-navigation-active"
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-1.5">
              <Link className="hidden rounded-full px-4 py-2.5 text-xs font-semibold text-white/55 transition hover:bg-white/[.05] hover:text-white sm:block" href="/login">
                Log in
              </Link>
              <Link className="hidden items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-extrabold text-black transition hover:scale-[1.03] lg:flex" href="/login">
                Try Verith <ArrowRight aria-hidden="true" size={15} />
              </Link>
              <button
                aria-expanded={menuOpen}
                aria-label={menuOpen ? "Close navigation" : "Open navigation"}
                className="grid size-10 touch-manipulation place-items-center rounded-full border border-white/10 text-white transition hover:bg-white/[.06] lg:hidden"
                onClick={() => setMenuOpen((open) => !open)}
                type="button"
              >
                <AnimatePresence initial={false} mode="wait">
                  <motion.span
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: menuOpen ? -45 : 45, scale: 0.75 }}
                    initial={{ opacity: 0, rotate: menuOpen ? 45 : -45, scale: 0.75 }}
                    key={menuOpen ? "close" : "open"}
                    transition={{ duration: 0.2 }}
                  >
                    {menuOpen ? <X size={17} /> : <UnequalMenuBars />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </nav>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="absolute inset-x-0 top-[calc(100%+0.5rem)] origin-top overflow-hidden rounded-[1.5rem] border border-white/[.12] bg-[#09090b]/[.97] px-3 pb-3 shadow-[0_24px_70px_rgba(0,0,0,.52)] [contain:layout_paint] [will-change:transform,opacity] lg:hidden"
                exit={{ opacity: 0, scale: 0.985, y: -6 }}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.985, y: -6 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mt-3 grid gap-1 border-t border-white/[.07] pt-3">
                  {publicLinks.map((link, index) => (
                    <motion.div
                      animate={{ opacity: 1, x: 0 }}
                      initial={reduceMotion ? false : { opacity: 0, x: 16 }}
                      key={link.href}
                      transition={{ delay: index * 0.045 }}
                    >
                      <Link className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold text-white/65 transition hover:bg-white/[.055] hover:text-white" href={link.href} onClick={() => setMenuOpen(false)}>
                        {link.label}<ArrowRight aria-hidden="true" size={14} />
                      </Link>
                    </motion.div>
                  ))}
                  <Link className="mt-2 flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-extrabold text-black" href="/login" onClick={() => setMenuOpen(false)}>
                    Try Verith <ArrowRight aria-hidden="true" size={15} />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.header>
    </>
  );
}
