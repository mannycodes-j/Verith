import {
	ArrowRight,
	BadgeCheck,
	BookOpen,
	Check,
	ChevronDown,
	CircleHelp,
	Crosshair,
	FileSearch,
	Globe2,
	GraduationCap,
	History,
	ImageIcon,
	Layers3,
	MessageCircle,
	Mic2,
	ScanSearch,
	Search,
	ShieldAlert,
	ShieldCheck,
	Sparkles,
	Video,
} from "lucide-react";
import Link from "next/link";
import PublicNavbar from "@/components/public/PublicNavbar";
import VerithLogo from "@/components/brand/VerithLogo";
import MotionReveal from "@/components/public/MotionReveal";
import PremiumBackground from "@/components/public/PremiumBackground";
import ScrollProgress from "@/components/public/ScrollProgress";
import SpotlightCard from "@/components/public/SpotlightCard";
import { INVESTIGATION_GUIDE, USER_CAPABILITIES } from "@/data/landing";
import type { LandingIconKey } from "@/types/landing";

const inputTypes = [
	{ icon: MessageCircle, label: "Text" },
	{ icon: ImageIcon, label: "Image" },
	{ icon: ScanSearch, label: "Screenshot" },
	{ icon: Mic2, label: "Voice note" },
	{ icon: Video, label: "Video" },
] as const;

const productPillars = [
	{
		icon: ShieldCheck,
		title: "See the reasons, not just a label",
		text: "Verith explains why a claim appears supported, challenged, misleading, or still uncertain instead of stopping at a verdict.",
	},
	{
		icon: Search,
		title: "Open the sources yourself",
		text: "See which sources were used, what each one says, and whether it supports, challenges, or simply adds context to the claim.",
	},
	{
		icon: ShieldAlert,
		title: "Know what is still uncertain",
		text: "When reliable information is missing, conflicting, or unavailable, Verith shows the gap so you can pause instead of acting on false confidence.",
	},
	{
		icon: BookOpen,
		title: "Learn skills you can reuse",
		text: "Courses, lessons, quizzes, daily practice, and community missions help you recognise weak sources, manipulation, and missing context on your own.",
	},
];

const landingIcons: Record<LandingIconKey, typeof Search> = {
	capture: Layers3,
	focus: Crosshair,
	inspect: ScanSearch,
	decide: ShieldCheck,
	investigate: FileSearch,
	evidence: Search,
	learning: GraduationCap,
	practice: CircleHelp,
	achievements: BadgeCheck,
	history: History,
};

function Brand() {
	return (
		<Link className="flex items-center gap-2.5 hover:opacity-80 transition-opacity" href="/" aria-label="Verith home">
			<VerithLogo />
		</Link>
	);
}

export default function LandingPage() {
	return (
		<div className="min-h-screen bg-[#0a0a0a] text-[#fafafa] selection:bg-white/10 selection:text-white relative">
			<ScrollProgress />
			<PremiumBackground />

			<PublicNavbar />

			<main id="main-content" tabIndex={-1}>
				{/* HERO SECTION */}
				<section className="relative pt-40 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
					<div className="mx-auto max-w-6xl relative z-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center">
						{/* Left Copy */}
						<div className="max-w-2xl">
							<div className="flex items-center gap-3 mb-8">
								<div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
									<span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" />
									<span className="text-xs font-medium text-white/70">Evidence you can inspect</span>
								</div>
								<div className="hidden sm:flex items-center gap-2.5 rounded-full border border-white/10 bg-black/50 px-3 py-1 shadow-inner shadow-white/5">
									<span className="relative size-1.5">
										<span className="absolute inset-0 animate-ping rounded-full bg-violet-400 opacity-50"></span>
										<span className="absolute inset-0 rounded-full bg-violet-500 blur-[2px]"></span>
										<span className="relative block size-1.5 rounded-full bg-violet-300"></span>
									</span>
									<span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">Built for everyday decisions</span>
								</div>
							</div>

							<h1 className="text-5xl md:text-7xl font-semibold tracking-tighter leading-[1.05] text-balance">
								Check what you see before you{" "}
								<span className="animate-text-shimmer bg-[linear-gradient(110deg,#a78bfa,45%,#fff,55%,#a78bfa)] bg-[length:200%_100%] bg-clip-text text-transparent">
									believe or share it.
								</span>
							</h1>

							<p className="mt-6 text-lg text-white/50 leading-relaxed max-w-xl">
								Paste a claim or upload an image, screenshot, voice note, or short video. Verith finds the checkable claims, compares relevant sources, and explains what is known, disputed, or still missing.
							</p>

							<div className="mt-10 flex flex-wrap items-center gap-6">
								<Link
									className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-violet-500/20 bg-gradient-to-r from-[#C084FC] to-[#6366F1] px-8 text-sm font-bold text-white transition-transform hover:scale-105 active:scale-95 shadow-[0_4px_24px_rgba(139,92,246,0.3)] group"
									href="/login"
								>
									<span className="relative z-10 flex items-center gap-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
										Try now
										<ArrowRight size={16} className="opacity-70 group-hover:translate-x-1 transition-transform" />
									</span>
								</Link>
								<a
									className="inline-flex h-14 items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 text-sm font-bold text-white/70 transition-all hover:bg-white/10 hover:text-white"
									href="#how-it-works"
								>
									See how it works
								</a>
							</div>
						</div>

						<MotionReveal className="group relative mx-auto mt-20 max-w-[auto] md:[perspective:auto]" delay={0.15}>
							<div className="landing-product-preview relative overflow-hidden rounded-3xl border border-white/10 bg-[#0F1012] p-3 shadow-2xl transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] [transform-style:preserve-3d] md:[transform:rotateX(15deg)_rotateY(20deg)_rotateZ(-10deg)] md:group-hover:[transform:rotateX(0deg)_rotateY(0deg)_rotateZ(0deg)]">
								<div className="grid gap-3 grid-cols-1">
									<div className="rounded-[1.25rem] border border-white/[0.04] bg-[#0B0C0E] p-6 md:p-8">
										<div className="flex flex-wrap items-center justify-between gap-4">
											<div>
												<p className="text-sm font-semibold">What would you like to check?</p>
												<p className="mt-1 text-xs text-muted-foreground">Bring the original content and ask one clear question.</p>
											</div>
											<span className="rounded-full bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-300">Private by default</span>
										</div>
										<div className="mt-6 flex flex-wrap gap-2">
											{inputTypes.map(({ icon: Icon, label }, index) => (
												<span
													className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-medium ${
														index === 0 ? "bg-violet-500 text-white" : "bg-white/[0.045] text-muted-foreground"
													}`}
													key={label}
												>
													<Icon size={14} />
													{label}
												</span>
											))}
										</div>
										<div className="mt-5 min-h-48 rounded-2xl bg-white/[0.035] p-5 text-left">
											<p className="text-sm leading-7 text-muted-foreground">
											Paste the message or claim you received, or upload the clearest version of the media. Keep names, dates, captions, and surrounding context so Verith can examine the right thing.
											</p>
										</div>
										<div className="mt-4 flex flex-wrap items-center justify-between gap-3">
										<p className="text-xs text-muted">Your investigation starts private. You choose whether to share it later.</p>
											<span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#C084FC] to-[#6366F1] px-5 py-3 text-xs font-semibold text-white">
												Investigate
												<ArrowRight size={14} />
											</span>
										</div>
									</div>
								</div>
							</div>
						</MotionReveal>
					</div>
				</section>

				{/* INFINITE MARQUEE BANNER */}
				<div className="relative mx-auto w-full max-w-7xl overflow-hidden border-y border-white/5 bg-black/40 py-6 mb-12">
					<div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent"></div>
					<div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent"></div>
					<div className="flex w-max animate-marquee whitespace-nowrap text-sm text-white/40">
						{[...Array(2)].map((_, i) => (
							<div key={i} aria-hidden={i !== 0} className="flex items-center">
								{["Check claims", "Inspect sources", "See limitations", "Understand context", "Practise daily", "Build confidence"].map((text) => (
									<span key={text} className="flex items-center">
										<span className="mx-8 font-medium tracking-wide">{text}</span>
										<span className="opacity-40">•</span>
									</span>
								))}
							</div>
						))}
					</div>
				</div>

				{/* PRODUCT PILLARS SECTION */}
				<section className="py-24 px-6 relative z-10" id="features">
					<div className="mx-auto max-w-6xl">
						<MotionReveal>
							<div className="mb-16 max-w-2xl">
								<span className="inline-flex rounded-full bg-violet-500/10 px-3 py-1.5 text-xs font-semibold text-violet-300 mb-4 border border-violet-500/20">
									Why Verith is different
								</span>
								<h2 className="text-3xl md:text-5xl font-medium tracking-tight text-balance">
									A useful answer should help you understand, <span className="text-white/40">not ask you to trust blindly.</span>
								</h2>
							</div>
						</MotionReveal>

						<div className="grid gap-6 md:grid-cols-2">
							{productPillars.map(({ icon: Icon, text, title }, index) => (
								<MotionReveal delay={index * 0.1} depth={30} key={title}>
									<article className="group h-full rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.04] hover:border-white/20 hover:shadow-[0_0_40px_rgba(139,92,246,0.15)] relative overflow-hidden">
										<div className="absolute inset-0 bg-gradient-to-br from-[#C084FC]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
										<span className="relative grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-[#C084FC]/20 to-[#6366F1]/10 border border-white/10 text-violet-300 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-inner shadow-white/5">
											<Icon size={24} />
										</span>
										<h3 className="relative mt-8 text-xl font-medium text-white group-hover:text-violet-200 transition-colors duration-300">{title}</h3>
										<p className="relative mt-3 text-sm leading-relaxed text-white/50 group-hover:text-white/70 transition-colors duration-300">{text}</p>
									</article>
								</MotionReveal>
							))}
						</div>
					</div>
				</section>

				{/* BENTO GRID SECTION (Why Verith) */}
				<section className="py-24 px-6 relative z-10" id="why-verith">
					<div className="mx-auto max-w-6xl">
						<MotionReveal>
							<div className="max-w-2xl mb-16">
								<h2 className="text-3xl md:text-4xl font-medium tracking-tight">
									Everything you need to check carefully.
									<br />
									<span className="text-white/40">Explained in words you can use.</span>
								</h2>
								<p className="mt-4 text-base text-white/50 leading-relaxed">
									You do not need to be a journalist or researcher. Verith helps you move from “I am not sure” to a decision you can explain.
								</p>
							</div>
						</MotionReveal>

						{/* BENTO GRID */}
						<div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">
							{/* Card 1 - Large Feature */}
							<MotionReveal delay={0.1} className="md:col-span-2 h-full">
								<SpotlightCard className="h-full p-8 md:p-10 flex flex-col group">
									<div className="relative z-10">
										<div className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6 group-hover:text-violet-300 group-hover:bg-violet-500/20 transition-colors">
											<FileSearch size={20} />
										</div>
										<h3 className="text-xl font-medium text-white">Find the claims that can actually be checked</h3>
										<p className="mt-2 text-sm text-white/50 max-w-md leading-relaxed group-hover:text-white/70 transition-colors">
											A post may mix facts, opinions, emotion, and persuasion. Verith separates the factual parts so the investigation stays focused.
										</p>
									</div>
									<div className="absolute right-0 bottom-0 w-2/3 h-2/3 bg-gradient-to-tl from-[#C084FC]/10 to-transparent blur-2xl group-hover:bg-violet-500/30 transition-colors duration-500" />
								</SpotlightCard>
							</MotionReveal>

							{/* Card 2 - Vertical */}
							<MotionReveal delay={0.2} className="h-full">
								<SpotlightCard className="h-full p-8 md:p-10 flex flex-col group">
									<div className="relative z-10">
										<div className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6 group-hover:text-indigo-300 group-hover:bg-indigo-500/20 transition-colors">
											<Search size={20} />
										</div>
										<h3 className="text-xl font-medium text-white">Evidence you can open</h3>
										<p className="mt-2 text-sm text-white/50 leading-relaxed group-hover:text-white/70 transition-colors">
											Every important explanation stays connected to the source that supports, challenges, or adds context to it.
										</p>
									</div>
								</SpotlightCard>
							</MotionReveal>

							{/* Card 3 - Vertical */}
							<MotionReveal delay={0.3} className="h-full">
								<SpotlightCard className="h-full p-8 md:p-10 flex flex-col group">
									<div className="relative z-10">
										<div className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6 group-hover:text-fuchsia-300 group-hover:bg-fuchsia-500/20 transition-colors">
											<ShieldCheck size={20} />
										</div>
										<h3 className="text-xl font-medium text-white">Honest limits</h3>
										<p className="mt-2 text-sm text-white/50 leading-relaxed group-hover:text-white/70 transition-colors">
											If a page cannot be read or good evidence cannot be found, Verith tells you instead of pretending the answer is certain.
										</p>
									</div>
								</SpotlightCard>
							</MotionReveal>

							{/* Card 4 - Wide Feature */}
							<MotionReveal delay={0.4} className="md:col-span-2 h-full">
								<SpotlightCard className="h-full p-8 md:p-10 flex flex-col group">
									<div className="relative z-10 h-full flex flex-col justify-between">
										<div>
											<h3 className="text-xl font-medium text-white group-hover:text-violet-300 transition-colors">
											Every check can make your next check better.
											</h3>
											<p className="mt-2 text-sm text-white/50 max-w-md leading-relaxed group-hover:text-white/70 transition-colors">
											Guided investigations, lessons, quizzes, daily practice, and community missions help you build habits you can use on any platform.
											</p>
										</div>
										<div className="flex gap-4">
											<div className="flex items-center gap-2 text-xs font-medium text-white/40 group-hover:text-white/70 transition-colors">
											<Check size={14} className="text-emerald-500" /> Sources stay visible
											</div>
											<div className="flex items-center gap-2 text-xs font-medium text-white/40 group-hover:text-white/70 transition-colors">
											<Check size={14} className="text-emerald-500" /> Limits stay visible
											</div>
										</div>
									</div>
								</SpotlightCard>
							</MotionReveal>
						</div>
					</div>
				</section>

				{/* HOW IT WORKS (List Layout instead of cards) */}
				<section className="py-24 px-6 border-y border-white/5 bg-violet-500/[0.03]" id="how-it-works">
					<div className="mx-auto max-w-6xl grid lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24">
						<div>
							<div className="sticky top-32">
								<h2 className="text-3xl md:text-4xl font-medium tracking-tight">
									One piece of content.
									<br />
									<span className="text-white/40">Three understandable steps.</span>
								</h2>
								<p className="mt-6 text-base text-white/50 leading-relaxed max-w-md">
									Verith keeps the process visible so you know what is happening, what was found, and what you should still check for yourself.
								</p>
							</div>
						</div>

						<div className="flex flex-col gap-12">
							<div className="flex gap-6 group cursor-default">
								<div className="flex flex-col items-center">
									<div className="size-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-sm font-bold text-white group-hover:bg-violet-600 group-hover:border-violet-500 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all">
										1
									</div>
									<div className="w-px h-full bg-white/10 my-4 group-hover:bg-violet-500/50 transition-colors" />
								</div>
								<div className="pb-8">
									<h3 className="text-xl font-medium text-white">Bring the original content</h3>
									<p className="mt-2 text-sm text-white/50 leading-relaxed">
										Paste the full message or upload a clear image, screenshot, voice note, or short video. Add one focused question.
									</p>
								</div>
							</div>

							<div className="flex gap-6 group cursor-default">
								<div className="flex flex-col items-center">
									<div className="size-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-sm font-bold text-white group-hover:bg-violet-600 group-hover:border-violet-500 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all">
										2
									</div>
									<div className="w-px h-full bg-white/10 my-4 group-hover:bg-violet-500/50 transition-colors" />
								</div>
								<div className="pb-8">
									<h3 className="text-xl font-medium text-white">Verith checks the claims</h3>
									<p className="mt-2 text-sm text-white/50 leading-relaxed">
										It identifies factual claims, looks for useful sources, compares what they say, and points out missing context.
									</p>
								</div>
							</div>

							<div className="flex gap-6 group cursor-default">
								<div className="flex flex-col items-center">
									<div className="size-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-sm font-bold text-white group-hover:bg-violet-600 group-hover:border-violet-500 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all">
										3
									</div>
								</div>
								<div className="pb-8">
									<h3 className="text-xl font-medium text-white">You inspect the answer</h3>
									<p className="mt-2 text-sm text-white/50 leading-relaxed">
										Read the simple finding, open the evidence, see the limitations, and decide whether to share, wait, correct, or learn more.
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* INVESTIGATION PLAYBOOK */}
				<section className="relative overflow-hidden px-6 py-24 md:py-32" id="investigation-guide">
					<div aria-hidden="true" className="absolute left-1/2 top-16 size-[34rem] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[120px]" />
					<div className="relative mx-auto max-w-6xl">
						<MotionReveal>
							<div className="mx-auto max-w-3xl text-center">
								<span className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-4 py-2 text-xs font-semibold text-violet-200">
									<Sparkles size={14} />
									Your investigation playbook
								</span>
								<h2 className="mt-6 text-3xl font-medium tracking-tight md:text-5xl">
									Get a useful answer without wasting time.
								</h2>
								<p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/50">
									A strong investigation starts before you press submit. These four habits help Verith examine the right claim and help you use the result responsibly.
								</p>
							</div>
						</MotionReveal>

						<div className="mt-16 grid gap-5 md:grid-cols-2">
							{INVESTIGATION_GUIDE.map((item, index) => {
								const Icon = landingIcons[item.iconKey];
								return (
									<MotionReveal delay={index * 0.08} key={item.title}>
										<article className="group relative h-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-violet-300/30 hover:bg-violet-400/[0.06] md:p-9">
											<div aria-hidden="true" className="absolute -right-14 -top-14 size-40 rounded-full bg-violet-500/10 blur-3xl transition-transform duration-700 group-hover:scale-150" />
											<div className="relative flex items-start gap-5">
												<span className="grid size-14 shrink-0 place-items-center rounded-[1.25rem] border border-white/10 bg-gradient-to-br from-violet-400/20 to-indigo-500/10 text-violet-200 shadow-inner shadow-white/5 transition-transform duration-500 group-hover:rotate-3 group-hover:scale-105">
													<Icon size={24} />
												</span>
												<div>
													<span className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-300/70">Step {index + 1}</span>
													<h3 className="mt-2 text-xl font-medium text-white">{item.title}</h3>
												</div>
											</div>
											<p className="relative mt-6 text-sm leading-7 text-white/55">{item.description}</p>
											<div className="relative mt-6 rounded-2xl bg-black/30 px-4 py-3 text-xs leading-5 text-white/55">
												<span className="font-semibold text-violet-200">Useful tip:</span> {item.tip}
											</div>
										</article>
									</MotionReveal>
								);
							})}
						</div>
					</div>
				</section>

				{/* AUTHENTICATED USER CAPABILITIES */}
				<section className="relative px-6 py-24" id="user-capabilities">
					<div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-violet-500/[0.09] via-white/[0.025] to-indigo-500/[0.07] p-7 shadow-[0_35px_100px_rgba(0,0,0,0.35)] md:p-12 lg:p-16">
						<div aria-hidden="true" className="absolute -right-24 -top-24 size-80 animate-pulse rounded-full border border-violet-300/10 bg-violet-500/10 blur-2xl" />
						<MotionReveal>
							<div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
								<div className="max-w-2xl">
									<span className="inline-flex rounded-full border border-white/10 bg-black/25 px-4 py-2 text-xs font-semibold text-white/60">Inside your Verith account</span>
									<h2 className="mt-5 text-3xl font-medium tracking-tight md:text-5xl">One workspace. More confident digital decisions.</h2>
									<p className="mt-5 text-base leading-relaxed text-white/50">
										These tools are available to signed-in users and are designed to move you from checking one claim to building habits you can use anywhere.
									</p>
								</div>
								<Link className="inline-flex h-12 shrink-0 items-center justify-center gap-2 self-start rounded-full bg-white px-6 text-sm font-bold text-black transition-all hover:scale-105 hover:bg-violet-100 active:scale-95 lg:self-auto" href="/login">
									Sign in to your workspace
									<ArrowRight size={16} />
								</Link>
							</div>
						</MotionReveal>

						<div className="relative mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{USER_CAPABILITIES.map((capability, index) => {
								const Icon = landingIcons[capability.iconKey];
								return (
									<MotionReveal delay={index * 0.06} key={capability.title}>
										<article className="group h-full rounded-3xl border border-white/[0.08] bg-black/25 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]">
											<span className="grid size-11 place-items-center rounded-2xl bg-white/[0.06] text-violet-200 transition-all duration-500 group-hover:bg-violet-500/20 group-hover:scale-110">
												<Icon size={20} />
											</span>
											<h3 className="mt-5 text-base font-medium text-white">{capability.title}</h3>
											<p className="mt-2 text-sm leading-6 text-white/45 transition-colors group-hover:text-white/65">{capability.description}</p>
										</article>
									</MotionReveal>
								);
							})}
						</div>
					</div>
				</section>

				{/* EVERYDAY USE CASES */}
				<section className="py-24 px-6 relative z-10" id="everyday-use">
					<div className="mx-auto max-w-6xl">
						<MotionReveal>
							<div className="text-center max-w-2xl mx-auto mb-16">
								<h2 className="text-3xl md:text-4xl font-medium tracking-tight">Use Verith in the moments that make you pause.</h2>
								<p className="mt-4 text-base text-white/50 leading-relaxed">
									You do not need a perfect investigation topic. Start with the everyday content that asks for your trust, attention, money, or action.
								</p>
							</div>
						</MotionReveal>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
							{[
								{
									title: "An urgent forwarded message",
									text: "A message says you must pay, register, or act today. Check who made the announcement, whether an official source confirms it, and what details may be missing.",
									icon: MessageCircle,
								},
								{
									title: "A screenshot without a source",
									text: "A screenshot looks convincing but leaves out the page, date, or account. Investigate the visible claim and use the limitations to decide whether more context is needed.",
									icon: ScanSearch,
								},
								{
									title: "A clip making a big claim",
									text: "A voice note or short video makes a health, political, financial, or public-safety claim. Check the exact statement, then compare it with the sources Verith finds.",
									icon: Video,
								},
							].map(({ icon: Icon, text, title }, i) => (
								<MotionReveal delay={i * 0.1} key={i} className="flex flex-col">
									<div className="flex flex-col h-full rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 hover:-translate-y-1 hover:border-violet-300/25 transition-all duration-300">
										<span className="grid size-12 place-items-center rounded-2xl bg-violet-400/10 text-violet-200"><Icon aria-hidden="true" size={22} /></span>
										<h3 className="mt-6 text-xl font-medium text-white">{title}</h3>
										<p className="mt-3 text-sm leading-7 text-white/55">{text}</p>
									</div>
								</MotionReveal>
							))}
						</div>
					</div>
				</section>

				{/* FAQ SECTION */}
				<section className="py-24 px-6 relative z-10" id="faq">
					<div className="mx-auto max-w-3xl">
						<MotionReveal>
							<div className="text-center mb-16">
								<h2 className="text-3xl md:text-4xl font-medium tracking-tight">Frequently asked questions</h2>
							</div>
						</MotionReveal>

						<div className="flex flex-col gap-4">
							{[
								{
									q: "What is Verith?",
									a: "Verith is an investigation and learning tool. It helps you check uncertain digital content, inspect relevant sources, understand limitations, and practise the skills needed to make better information decisions.",
								},
								{
									q: "What can I investigate?",
									a: "You can submit text, an image, a screenshot, a voice note, or a short video. Direct link investigation is unavailable for now, so paste the important claim or upload the original media instead.",
								},
								{
									q: "What happens after I submit something?",
									a: "Verith identifies the factual claims, searches for relevant sources, compares what those sources say, and builds a report. You can follow the stages while it works and inspect the final sources yourself.",
								},
								{
									q: "Is Verith always right?",
									a: "No. Verith can make mistakes or encounter incomplete information. That is why it keeps sources, uncertainty, and limitations visible. Use the report to support your judgement, not replace it.",
								},
								{
									q: "What is Guided Investigation?",
									a: "It is a step-by-step activity that asks you to examine the main claim, source, date, context, and warning signs. You think first, then compare your reasoning with Verith’s report.",
								},
								{
									q: "How can I build my skills?",
									a: "Take courses and lessons, answer quizzes, practise daily questions, and complete community missions. Verith records completed work and shows your progress, achievements, streaks, XP, and ranks.",
								},
								{
									q: "Which languages does Verith support?",
									a: "Verith supports English, French, Spanish, and Yorùbá for the investigation experience and report presentation. Original content remains available so you can compare it with the explanation.",
								},
								{
									q: "Are my investigations public?",
									a: "Investigations are private by default. You control visibility and sharing. Review a report carefully before choosing to make it public.",
								},
								{
									q: "How do daily investigation allowances work?",
									a: "Your workspace shows the allowance you have left before you submit. Some media investigations may use more allowance than a text check, and Verith should show that cost before you continue. A failed attempt should not be presented as a completed investigation.",
								},
								{
									q: "What if Verith cannot find enough evidence?",
									a: "The report should say that clearly and show the limitation. An incomplete result is a reason to pause, look for the original source, or check again when better information is available.",
								},
							].map((faq, i) => (
								<MotionReveal delay={i * 0.1} key={i}>
									<details className="group rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl [&_summary::-webkit-details-marker]:hidden">
										<summary className="flex cursor-pointer items-center justify-between gap-4 p-6 text-base font-medium text-white transition-colors hover:text-violet-300">
											{faq.q}
											<ChevronDown className="h-5 w-5 text-white/40 transition-transform group-open:rotate-180" />
										</summary>
										<div className="px-6 pb-6 text-sm leading-relaxed text-white/60">{faq.a}</div>
									</details>
								</MotionReveal>
							))}
						</div>
					</div>
				</section>

				{/* VISION SECTION */}
				<section className="relative py-32 px-6 overflow-hidden z-10" id="product-vision">
					<div className="mx-auto max-w-4xl text-center relative z-10">
						<MotionReveal>
							<h2 className="text-3xl md:text-5xl font-medium tracking-tight text-balance leading-tight">
								The goal is not to make every decision for you.
								<br />
								<span className="text-white/40">It is to help you make better ones.</span>
							</h2>
							<p className="mt-6 text-base md:text-lg text-white/50 leading-relaxed mx-auto max-w-2xl text-balance">
								Check the content in front of you, understand the evidence behind the finding, and build habits that make the next uncertain message easier to handle.
							</p>
							<div className="mt-10 flex items-center justify-center gap-6">
								<Link
									className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-violet-500/20 bg-gradient-to-r from-[#C084FC] to-[#6366F1] px-10 text-base font-bold text-white transition-transform hover:scale-105 active:scale-95 shadow-[0_4px_24px_rgba(139,92,246,0.3)]"
									href="/login"
								>
									Create your free account
									<ArrowRight size={18} className="opacity-70" />
								</Link>
							</div>
						</MotionReveal>
					</div>
				</section>
			</main>

			{/* ENHANCED FOOTER */}
			<footer className="relative border-t border-white/10 bg-black/60 px-6 py-16 md:py-24 overflow-hidden z-10">
				<div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

				<div className="mx-auto max-w-6xl relative z-10">
					<div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 mb-16">
						<div className="lg:col-span-6">
							<Brand />
							<p className="mt-6 max-w-sm text-sm text-white/50 leading-relaxed">
								Check uncertain content, understand the evidence, and build practical media-literacy skills for everyday digital life.
							</p>
							<div className="mt-8 flex gap-4">
								<Link
									aria-label="Learn more about Verith"
									href="/about"
									className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-violet-500 hover:bg-violet-500/10 transition-all"
								>
									<Globe2 aria-hidden="true" size={18} />
								</Link>
							</div>
						</div>

						<div className="lg:col-span-2 flex flex-col gap-4">
							<span className="text-sm font-semibold text-white tracking-wider uppercase mb-2">Product</span>
							<Link className="text-sm text-white/50 hover:text-violet-300 transition-colors" href="/how-it-works">
								How it works
							</Link>
							<Link className="text-sm text-white/50 hover:text-violet-300 transition-colors" href="/learning">
								Learning
							</Link>
						</div>

						<div className="lg:col-span-2 flex flex-col gap-4">
							<span className="text-sm font-semibold text-white tracking-wider uppercase mb-2">About Verith</span>
							<Link className="text-sm text-white/50 hover:text-violet-300 transition-colors" href="/about">
								About Us
							</Link>
							<Link className="text-sm text-white/50 hover:text-violet-300 transition-colors" href="/privacy">
								Privacy Policy
							</Link>
							<Link className="text-sm text-white/50 hover:text-violet-300 transition-colors" href="/terms">
								Terms of Service
							</Link>
						</div>

						<div className="lg:col-span-2 flex flex-col gap-4">
							<span className="text-sm font-semibold text-white tracking-wider uppercase mb-2">Get started</span>
							<Link className="text-sm text-white/50 hover:text-violet-300 transition-colors" href="/register">
								Create an account
							</Link>
							<Link className="text-sm text-white/50 hover:text-violet-300 transition-colors" href="/login">
								Log in
							</Link>
							<Link className="text-sm text-white/50 hover:text-violet-300 transition-colors" href="/login">
								Start an investigation
							</Link>
						</div>
					</div>

					<div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
						<p className="text-xs text-white/40 font-medium">© {new Date().getFullYear()} Verith. All rights reserved.</p>
						<div className="flex items-center gap-6 text-xs font-medium text-white/30">
							<span>Follow the evidence. Keep your judgement.</span>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}
