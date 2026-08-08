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

export default function PublicNavbar({ mainId = "main-content" }: { mainId?: string }) {
	const pathname = usePathname();
	const reduceMotion = useReducedMotion();
	const [menuOpen, setMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const update = () => setScrolled(window.scrollY > 20);
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
			<a className="fixed top-4 left-4 z-[70] -translate-y-[160%] rounded-full bg-white px-4 py-3 text-sm font-medium text-black transition-transform focus:translate-y-0" href={`#${mainId}`}>
				Skip to content
			</a>
			<motion.header
				animate={{ opacity: 1, y: 0 }}
				className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-6"
				initial={reduceMotion ? false : { opacity: 0, y: -20 }}
				transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
			>
				<motion.div
					animate={{
						backgroundColor: scrolled ? "rgba(10, 10, 10, 0.65)" : "rgba(10, 10, 10, 0)",
						borderColor: scrolled ? "rgba(255, 255, 255, 0.08)" : "transparent",
						boxShadow: scrolled ? "0 4px 24px -1px rgba(0,0,0,0.2), 0 0 1px 0 rgba(255,255,255,0.1) inset" : "none",
						backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
					}}
					className="pointer-events-auto relative flex w-full max-w-6xl items-center justify-between rounded-full border border-transparent px-4 py-2.5 transition-all duration-300"
					ref={menuRef}
				>
					<Link aria-label="Verith home" className="flex items-center gap-2.5 pl-2 hover:opacity-80 transition-opacity" href="/">
						<VerithLogo />
					</Link>

					<nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
						{publicLinks.map((link) => {
							const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
							return (
								<Link
									className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${active ? "text-white" : "text-white/60 hover:text-white"}`}
									href={link.href}
									key={link.href}
								>
									{active && (
										<motion.span
											className="absolute inset-0 rounded-full bg-white/[0.06]"
											layoutId="public-navigation-active"
											transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
										/>
									)}
									<span className="relative z-10">{link.label}</span>
								</Link>
							);
						})}
					</nav>

					<div className="flex items-center gap-3">
						<Link className="hidden rounded-full px-4 py-2 text-sm font-medium text-white/70 transition hover:text-white md:block" href="/login">
							Log in
						</Link>
						<Link
							className="hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-transform hover:scale-105 active:scale-95 md:flex shadow-[0_0_15px_rgba(255,255,255,0.15)]"
							href="/login"
						>
							Try Verith <ArrowRight aria-hidden="true" size={14} className="opacity-80" />
						</Link>
						<button
							aria-expanded={menuOpen}
							aria-label={menuOpen ? "Close navigation" : "Open navigation"}
							className="grid size-9 touch-manipulation place-items-center rounded-full bg-white/5 text-white transition hover:bg-white/10 md:hidden"
							onClick={() => setMenuOpen((open) => !open)}
							type="button"
						>
							<AnimatePresence initial={false} mode="wait">
								<motion.span
									animate={{ opacity: 1, rotate: 0, scale: 1 }}
									exit={{ opacity: 0, rotate: menuOpen ? -45 : 45, scale: 0.8 }}
									initial={{ opacity: 0, rotate: menuOpen ? 45 : -45, scale: 0.8 }}
									key={menuOpen ? "close" : "open"}
									transition={{ duration: 0.15 }}
								>
									{menuOpen ? <X size={16} /> : <UnequalMenuBars />}
								</motion.span>
							</AnimatePresence>
						</button>
					</div>

					<AnimatePresence>
						{menuOpen && (
							<motion.div
								animate={{ opacity: 1, scale: 1, y: 0 }}
								className="absolute inset-x-2 top-[calc(100%+0.5rem)] origin-top overflow-hidden rounded-[1.5rem] border border-white/[.08] bg-[#0A0A0A]/95 px-4 pb-4 pt-2 shadow-[0_24px_70px_rgba(0,0,0,.6)] backdrop-blur-xl md:hidden"
								exit={{ opacity: 0, scale: 0.98, y: -4 }}
								initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: -4 }}
								transition={{ duration: reduceMotion ? 0.01 : 0.25, ease: [0.16, 1, 0.3, 1] }}
							>
								<div className="grid gap-1">
									{publicLinks.map((link, index) => (
										<motion.div
											animate={{ opacity: 1, x: 0 }}
											initial={reduceMotion ? false : { opacity: 0, x: -8 }}
											key={link.href}
											transition={{ delay: index * 0.04 }}
										>
											<Link
												className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-white/70 transition hover:bg-white/[.04] hover:text-white"
												href={link.href}
												onClick={() => setMenuOpen(false)}
											>
												{link.label}
												<ArrowRight aria-hidden="true" size={14} className="opacity-50" />
											</Link>
										</motion.div>
									))}
									<div className="mt-2 border-t border-white/[.06] pt-3">
										<Link
											className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition active:scale-95"
											href="/login"
											onClick={() => setMenuOpen(false)}
										>
											Try Verith <ArrowRight aria-hidden="true" size={14} />
										</Link>
									</div>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</motion.div>
			</motion.header>
		</>
	);
}
