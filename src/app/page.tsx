import { ArrowRight, BookOpen, Check, FileSearch, GraduationCap, Globe2, ImageIcon, Layers3, Link2, MessageCircle, Mic2, Search, ShieldCheck, Video } from "lucide-react";
import Link from "next/link";
import MotionReveal from "@/components/public/MotionReveal";
import PublicNavbar from "@/components/public/PublicNavbar";
import VerithLogo from "@/components/brand/VerithLogo";

const inputTypes = [
	{ icon: MessageCircle, label: "Text" },
	{ icon: Link2, label: "Link" },
	{ icon: ImageIcon, label: "Image" },
	{ icon: Mic2, label: "Voice note" },
	{ icon: Video, label: "Short video" },
] as const;

const benefits = [
	{
		icon: FileSearch,
		title: "Claim-level intelligence",
		text: "Verith decomposes complex media into verifiable claims, separating fact, opinion, framing, and rhetoric before analysis begins.",
		color: "from-violet-500/20 to-indigo-500/5",
		iconColor: "text-violet-300",
	},
	{
		icon: Search,
		title: "Traceable evidence",
		text: "Every conclusion remains connected to the source material that supports, challenges, or contextualises it—ready for human inspection.",
		color: "from-cyan-500/20 to-sky-500/5",
		iconColor: "text-cyan-300",
	},
	{
		icon: ShieldCheck,
		title: "Calibrated uncertainty",
		text: "Verith exposes evidence gaps, analytical limitations, and unresolved questions instead of manufacturing certainty where none exists.",
		color: "from-emerald-500/20 to-teal-500/5",
		iconColor: "text-emerald-300",
	},
] as const;

const steps = [
	{
		title: "Capture the source",
		text: "Submit text, a link, image, screenshot, voice note, or short video while preserving the original material and its context.",
	},
	{
		title: "Build the evidence map",
		text: "Verith extracts factual claims, retrieves relevant sources, compares competing evidence, and surfaces missing context.",
	},
	{
		title: "Act with confidence",
		text: "Explore an explainable report, inspect every source, understand uncertainty, and make a more informed sharing decision.",
	},
] as const;

const productPillars = [
	{
		icon: Layers3,
		title: "Multimodal by default",
		text: "One investigation model supports the formats misinformation actually travels in: text, links, screenshots, images, voice notes, and short video.",
	},
	{
		icon: Search,
		title: "Evidence before verdict",
		text: "Claim extraction, retrieval, comparison, source review, and context analysis form an inspectable chain—not an unexplained AI answer.",
	},
	{
		icon: Globe2,
		title: "Built for everyday reach",
		text: "A focused web workspace and WhatsApp entry point bring verification closer to the conversations where questionable content is shared.",
	},
	{
		icon: GraduationCap,
		title: "A learning loop, not a dead end",
		text: "Courses, quizzes, and challenges help users carry stronger evaluation habits into their next information decision.",
	},
] as const;

function Brand() {
	return (
		<Link className="flex items-center gap-2.5" href="/" aria-label="Verith home">
			<VerithLogo />
		</Link>
	);
}

export default function LandingPage() {
	return (
		<div className="min-h-screen overflow-hidden bg-background text-foreground">
			<a className="fixed top-4 left-4 z-1000 -translate-y-[160%] rounded-full bg-white px-4 py-3 text-black transition-transform focus:translate-y-0" href="#main-content">
				Skip to content
			</a>

			<PublicNavbar />

			<main id="main-content" tabIndex={-1}>
				<section className="relative isolate overflow-hidden px-6 pt-40 pb-24 md:pt-44">
					<div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
						<div className="hero-dot-grid absolute inset-0 opacity-[0.08]" />
						<div
							className="animate-sweep absolute top-1/2 left-1/2 h-[140%] w-[140%]"
							style={{
								background: "conic-gradient(from 0deg, transparent 0%, rgba(139,92,246,0.18) 8%, transparent 18%)",
							}}
						/>
						<div className="animate-float-1 absolute -top-[10%] -left-[5%] size-[600px] rounded-full bg-violet-500/30 blur-[100px]" />
						<div className="animate-float-2 absolute top-[10%] -right-[5%] size-[500px] rounded-full bg-cyan-500/20 blur-[90px]" />
						<div className="animate-float-3 absolute bottom-[-5%] left-[25%] size-[550px] rounded-full bg-indigo-500/25 blur-[100px]" />
						<div className="animate-float-4 absolute top-[8%] right-[20%] hidden size-[350px] rounded-full bg-fuchsia-400/20 blur-[80px] md:block" />
						<div className="animate-float-5 absolute bottom-[10%] left-[8%] hidden size-[300px] rounded-full bg-emerald-500/15 blur-[80px] md:block" />
						<div className="animate-light-streak absolute top-[40%] left-0 h-px w-full bg-gradient-to-r from-transparent via-violet-400/30 to-transparent" />
						<div className="absolute inset-0 [background-image:radial-gradient(ellipse_at_center,transparent_30%,#08090A_90%)]" />
					</div>

					<div className="mx-auto max-w-5xl text-left">
						<MotionReveal>
							<span className="inline-flex items-center gap-2 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-white/60">
								<span className="relative inline-flex size-1.5 rounded-full bg-violet-400">
									<span className="absolute inset-0 animate-ping rounded-full bg-violet-400 opacity-50" />
								</span>
								Evidence infrastructure for a more resilient information ecosystem
							</span>
							<h1 className="mt-7 max-w-[14ch] text-5xl leading-[1.05] font-semibold tracking-tighter md:text-7xl">
								Turn information overload
								<br />
								<span className="bg-gradient-to-b from-foreground to-foreground/40 bg-clip-text text-transparent">into informed action.</span>
							</h1>
							<p className="mt-8 max-w-2xl text-base leading-relaxed text-white/50 md:text-xl">
								Verith is an explainable, multimodal verification platform that transforms claims, articles, screenshots, images, and voice notes into transparent evidence maps people
								can understand and trust.
							</p>
							<div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
								<Link
									className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#C084FC] to-[#6366F1] px-7 text-center text-sm font-medium text-white shadow-[0_0_45px_rgba(139,92,246,0.28)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
									href="/login"
								>
									Start now
									<ArrowRight size={16} />
								</Link>
								<a
									className="inline-flex min-h-12 items-center rounded-full border border-white/10 bg-white/[0.04] px-7 text-sm font-medium transition-colors hover:border-white/15 hover:bg-white/[0.08]"
									href="#how-it-works"
								>
									Explore the product
								</a>
							</div>
						</MotionReveal>
					</div>

					<MotionReveal className="group relative mx-auto mt-20 max-w-[1200px] md:[perspective:2000px]" delay={0.15}>
						<div className="landing-product-preview relative overflow-hidden rounded-3xl border border-white/10 bg-[#0F1012] p-3 shadow-2xl transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] [transform-style:preserve-3d] md:[transform:rotateX(15deg)_rotateY(20deg)_rotateZ(-10deg)] md:group-hover:[transform:rotateX(0deg)_rotateY(0deg)_rotateZ(0deg)]">
							<div className="grid gap-3 lg:grid-cols-[1.2fr_0.8fr]">
								<div className="rounded-[1.25rem] border border-white/[0.04] bg-[#0B0C0E] p-6 md:p-8">
									<div className="flex flex-wrap items-center justify-between gap-4">
										<div>
											<p className="text-sm font-semibold">Start an evidence-led investigation</p>
											<p className="mt-1 text-xs text-muted-foreground">Bring the content. Verith orchestrates the verification workflow.</p>
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
											Submit the claim, headline, forwarded message, or article excerpt you need to assess. Add a focused question to shape the investigation
											around the decision you need to make.
										</p>
									</div>
									<div className="mt-4 flex flex-wrap items-center justify-between gap-3">
										<p className="text-xs text-muted">Source provenance is preserved throughout the investigation.</p>
										<span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#C084FC] to-[#6366F1] px-5 py-3 text-xs font-semibold text-white">
											Investigate
											<ArrowRight size={14} />
										</span>
									</div>
								</div>

								<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
									<div className="rounded-[1.25rem] border border-white/[0.05] bg-card/60 p-6">
										<span className="grid size-10 place-items-center rounded-xl bg-violet-400/15 text-violet-300">
											<FileSearch size={19} />
										</span>
										<h2 className="mt-5 text-xl font-semibold">Explainable by design</h2>
										<p className="mt-2 text-sm leading-6 text-muted-foreground">
											Findings translate complex analysis into what was discovered, why it matters, and which action the evidence supports.
										</p>
									</div>
									<div className="rounded-[1.25rem] border border-white/[0.05] bg-card/60 p-6">
										<span className="grid size-10 place-items-center rounded-xl bg-cyan-400/15 text-cyan-300">
											<Search size={19} />
										</span>
										<h2 className="mt-5 text-xl font-semibold">Evidence you can audit</h2>
										<p className="mt-2 text-sm leading-6 text-muted-foreground">
											Sources, contradictions, limitations, and missing context remain visible—never hidden behind a single confidence score.
										</p>
									</div>
								</div>
							</div>
						</div>
					</MotionReveal>
				</section>

				<section className="bg-[#0B0C0E]/30 px-6 py-6 md:py-24" id="why-verith">
					<div className="mx-auto max-w-[1300px]">
						<MotionReveal>
							<div className="max-w-3xl">
								<span className="inline-flex rounded-full bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold text-cyan-300">Human-centred verification</span>
								<h2 className="mt-5 text-4xl font-semibold tracking-normal md:text-6xl">Powerful enough for investigation. Clear enough for everyone.</h2>
								<p className="mt-5 text-base leading-7 text-muted-foreground">
									Verith brings evidence retrieval, source comparison, manipulation analysis, and media literacy into one coherent experience—without asking people to become
									professional fact-checkers.
								</p>
							</div>
						</MotionReveal>
						<div className="mt-12 grid gap-5 md:grid-cols-3">
							{benefits.map(({ color, icon: Icon, iconColor, text, title }, index) => (
								<MotionReveal className="h-full" delay={index * 0.06} key={title}>
									<article
										className={`h-full rounded-3xl border border-white/[0.06] bg-gradient-to-br ${color} p-7 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1 hover:border-white/15`}
									>
										<span className={`grid size-11 place-items-center rounded-2xl bg-white/[0.06] ${iconColor}`}>
											<Icon size={21} />
										</span>
										<h3 className="mt-7 text-xl font-semibold">{title}</h3>
										<p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p>
									</article>
								</MotionReveal>
							))}
						</div>
					</div>
				</section>

				<section className="px-6 py-6 md:py-24" id="how-it-works">
					<div className="mx-auto max-w-[1300px] rounded-3xl border border-white/[0.06] bg-card/60 p-3 md:p-7 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] lg:p-12">
						<MotionReveal>
							<div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
								<div>
									<span className="inline-flex rounded-full bg-violet-400/10 px-3 py-1.5 text-xs font-semibold text-violet-300">How it works</span>
									<h2 className="mt-5 text-4xl font-semibold tracking-normal md:text-5xl">One input. A complete chain of reasoning.</h2>
								</div>
								<p className="max-w-xl text-base leading-7 text-muted-foreground lg:justify-self-end">
									The product turns an ambiguous piece of content into a structured investigation: claims, evidence relationships, source quality, context, limitations, and
									practical next steps.
								</p>
							</div>
						</MotionReveal>
						<div className="mt-10 grid gap-4 md:grid-cols-3">
							{steps.map((step, index) => (
								<MotionReveal className="h-full" delay={index * 0.07} key={step.title}>
									<article className="h-full rounded-2xl border border-white/[0.04] bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.04]">
										<span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-[#C084FC] to-[#6366F1] text-sm font-bold text-white">
											{index + 1}
										</span>
										<h3 className="mt-6 text-lg font-semibold">{step.title}</h3>
										<p className="mt-3 text-sm leading-6 text-muted-foreground">{step.text}</p>
									</article>
								</MotionReveal>
							))}
						</div>
					</div>
				</section>

				<section className="bg-[#0B0C0E]/30 px-6 py-6 md:py-24">
					<div className="mx-auto grid max-w-[1300px] gap-5 lg:grid-cols-2">
						<MotionReveal>
							<article className="h-full rounded-3xl border border-emerald-500/10 bg-card/60 p-8 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] md:p-10">
								<span className="grid size-11 place-items-center rounded-2xl bg-emerald-400/15 text-emerald-300">
									<ShieldCheck size={22} />
								</span>
								<h2 className="mt-7 text-3xl font-semibold tracking-normal">Trust is a product requirement, not a confidence score.</h2>
								<div className="mt-6 grid gap-3 text-sm text-muted-foreground">
									{["No invented citations", "No hidden uncertainty", "No claim that AI detection is proof", "No guess presented as evidence"].map((item) => (
										<p className="flex items-center gap-3" key={item}>
											<Check className="text-emerald-300" size={16} />
											{item}
										</p>
									))}
								</div>
							</article>
						</MotionReveal>
						<MotionReveal delay={0.06}>
							<article className="grid h-full gap-5 rounded-3xl border border-violet-500/10 bg-card/60 p-8 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] grid-cols-1 md:p-10">
								<div>
									<span className="grid size-11 place-items-center rounded-2xl bg-violet-400/15 text-violet-300">
										<BookOpen size={22} />
									</span>
									<h2 className="mt-7 text-3xl font-semibold tracking-normal">Verification that builds lasting media literacy.</h2>
									<p className="mt-4 text-sm leading-6 text-muted-foreground">
										Lessons, quizzes, and evidence challenges turn each investigation into practical skills people can reuse across platforms and communities.
									</p>
								</div>
								{/* <div className="flex flex-col justify-end gap-3">
									<Link
										className="inline-flex items-center justify-center gap-2 rounded-full bg-white/[0.065] px-5 py-3 text-center text-sm font-semibold hover:bg-white/10"
										href="/learning"
									>
										Explore learning <ArrowRight size={15} />
									</Link>
									<Link
										className="inline-flex items-center justify-center gap-2 rounded-full bg-white/[0.065] px-5 py-3 text-center text-sm font-semibold hover:bg-white/10"
										href="/whatsapp"
									>
										Use WhatsApp <ArrowRight size={15} />
									</Link>
								</div> */}
							</article>
						</MotionReveal>
					</div>
				</section>

				<section className="px-6 py-2 md:py-24" id="product-vision">
					<div className="mx-auto max-w-[1300px] rounded-3xl border border-white/[0.06] bg-card/60 p-3 md:p-7 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] lg:p-12">
						<MotionReveal>
							<div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
								<div>
									<span className="inline-flex rounded-full bg-violet-400/10 px-3 py-1.5 text-xs font-semibold text-violet-300">The Verith product thesis</span>
									<h2 className="mt-5 text-4xl font-semibold tracking-normal md:text-6xl">Verification should create informed people, not dependent users.</h2>
								</div>
								<p className="text-base leading-7 text-muted-foreground lg:justify-self-end">
									Verith combines explainable AI, inspectable evidence, accessible distribution, and practical media literacy into one continuous intervention against
									misinformation.
								</p>
							</div>
						</MotionReveal>

						<div className="mt-12 grid gap-4 md:grid-cols-2">
							{productPillars.map(({ icon: Icon, text, title }, index) => (
								<MotionReveal delay={index * 0.065} depth={30} key={title}>
									<article className="group h-full rounded-3xl border border-white/[0.06] bg-white/[0.035] p-7 transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.06] hover:shadow-[0_28px_70px_-36px_rgba(139,92,246,0.8)]">
										<span className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-500/10 text-violet-200 transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:scale-110">
											<Icon size={21} />
										</span>
										<h3 className="mt-6 text-xl font-semibold">{title}</h3>
										<p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p>
									</article>
								</MotionReveal>
							))}
						</div>
					</div>
				</section>
			</main>

			<footer className="border-t border-white/[0.06] px-6 pt-4 md:pt-8">
				<div className="mx-auto max-w-[1300px] p-4 md:p-8">
					<div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
						<div>
							<Brand />
							<p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">Explainable verification and media literacy infrastructure for healthier digital communities.</p>
						</div>
						<div className="grid grid-cols-2 gap-8 text-sm">
							<div className="grid content-start gap-3">
								<strong>Explore</strong>
								<Link className="text-muted-foreground hover:text-white" href="/how-it-works">
									How it works
								</Link>
								<Link className="text-muted-foreground hover:text-white" href="/whatsapp">
									WhatsApp
								</Link>
								<Link className="text-muted-foreground hover:text-white" href="/about">
									About
								</Link>
							</div>
							<div className="grid content-start gap-3">
								<strong>Support</strong>
								<Link className="text-muted-foreground hover:text-white" href="/privacy">
									Privacy
								</Link>
								<Link className="text-muted-foreground hover:text-white" href="/terms">
									Terms
								</Link>
								<Link className="text-muted-foreground hover:text-white" href="/login">
									Log in
								</Link>
							</div>
						</div>
					</div>
					<p className="mt-16 text-xs text-muted flex justify-center items-center">
						© {new Date().getFullYear()} Verith. Building resilience against misinformation through evidence, transparency, and education.
					</p>
				</div>
			</footer>
		</div>
	);
}
