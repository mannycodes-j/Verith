import {
  ArrowRight,
  BookOpen,
  Check,
  FileSearch,
  GraduationCap,
  Globe2,
  ImageIcon,
  Layers3,
  Link2,
  MessageCircle,
  Mic2,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import MotionReveal from "@/components/public/MotionReveal";

const inputTypes = [
  { icon: MessageCircle, label: "Text" },
  { icon: Link2, label: "Link" },
  { icon: ImageIcon, label: "Image" },
  { icon: Mic2, label: "Voice note" },
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
    text: "Submit text, a link, image, screenshot, or voice note while preserving the original material and its context.",
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
    text: "One investigation model supports the formats misinformation actually travels in: text, links, screenshots, images, and voice notes.",
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
      <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-violet-400 to-indigo-600 text-sm font-bold text-white shadow-[0_12px_32px_-14px_rgba(139,92,246,0.95)]">
        V
      </span>
      <span className="text-[17px] font-semibold tracking-normal">Verith</span>
    </Link>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground">
      <a
        className="fixed top-4 left-4 z-1000 -translate-y-[160%] rounded-full bg-white px-4 py-3 text-black transition-transform focus:translate-y-0"
        href="#main-content"
      >
        Skip to content
      </a>

      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
        <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between rounded-2xl border border-white/[0.07] bg-[#0d1015]/85 px-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl">
          <Brand />
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex" aria-label="Primary navigation">
            <a className="transition-colors hover:text-white" href="#how-it-works">
              How it works
            </a>
            <a className="transition-colors hover:text-white" href="#why-verith">
              Why Verith
            </a>
            <a className="transition-colors hover:text-white" href="#product-vision">
              Product
            </a>
            <Link className="transition-colors hover:text-white" href="/learning">
              Learn
            </Link>
            <Link className="transition-colors hover:text-white" href="/whatsapp">
              WhatsApp
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link className="hidden rounded-full px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-white sm:block" href="/login">
              Log in
            </Link>
            <Link
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_30px_-14px_rgba(139,92,246,0.95)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
              href="/verify"
            >
              Try now
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </header>

      <main id="main-content">
        <section className="relative isolate px-5 pt-40 pb-24 md:pt-48">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="animate-friendly-float absolute top-24 left-[8%] size-80 rounded-full bg-violet-500/20 blur-[110px]" />
            <div className="animate-friendly-float absolute top-36 right-[6%] size-72 rounded-full bg-cyan-500/15 blur-[100px] [animation-delay:-3s]" />
            <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background to-transparent" />
          </div>

          <div className="mx-auto max-w-5xl text-center">
            <MotionReveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-300/15 bg-violet-400/[0.08] px-4 py-2 text-xs font-semibold text-violet-200">
                <Sparkles size={14} />
                Evidence infrastructure for a more resilient information ecosystem
              </span>
              <h1 className="mx-auto mt-7 max-w-[13ch] text-[clamp(3.4rem,8vw,7rem)] leading-[0.98] font-semibold tracking-normal">
                Turn information overload into informed action.
              </h1>
              <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-muted-foreground md:text-xl md:leading-8">
                Verith is an explainable, multimodal verification platform that transforms claims, articles, screenshots, images, and voice notes into transparent evidence maps people can understand and trust.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  className="inline-flex min-h-12 items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 px-7 text-sm font-semibold text-white shadow-[0_18px_45px_-18px_rgba(139,92,246,0.95)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  href="/verify"
                >
                  Try Verith now
                  <ArrowRight size={16} />
                </Link>
                <a className="inline-flex min-h-12 items-center rounded-full bg-white/[0.055] px-7 text-sm font-semibold transition-colors hover:bg-white/[0.09]" href="#how-it-works">
                  Explore the product
                </a>
              </div>
            </MotionReveal>
          </div>

          <MotionReveal className="mx-auto mt-20 max-w-[1180px]" delay={0.15}>
            <div className="relative rounded-[2rem] border border-white/[0.08] bg-surface/75 p-3 shadow-[0_45px_120px_-45px_rgba(67,56,202,0.55)] backdrop-blur">
              <div className="grid gap-3 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="rounded-[1.5rem] bg-[#0d1015] p-6 md:p-8">
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
                      Submit the claim, headline, forwarded message, or article excerpt you need to assess. Add a focused question to shape the investigation around the decision you need to make.
                    </p>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-xs text-muted">Source provenance is preserved throughout the investigation.</p>
                    <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 px-5 py-3 text-xs font-semibold text-white">
                      Investigate
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  <div className="rounded-[1.5rem] bg-gradient-to-br from-violet-500/15 to-indigo-500/5 p-6">
                    <span className="grid size-10 place-items-center rounded-xl bg-violet-400/15 text-violet-300">
                      <FileSearch size={19} />
                    </span>
                    <h2 className="mt-5 text-xl font-semibold">Explainable by design</h2>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Findings translate complex analysis into what was discovered, why it matters, and which action the evidence supports.
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] bg-gradient-to-br from-cyan-500/15 to-sky-500/5 p-6">
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

        <section className="px-5 py-24" id="why-verith">
          <div className="mx-auto max-w-[1180px]">
            <MotionReveal>
              <div className="max-w-3xl">
                <span className="inline-flex rounded-full bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold text-cyan-300">Human-centred verification</span>
                <h2 className="mt-5 text-4xl font-semibold tracking-normal md:text-6xl">Powerful enough for investigation. Clear enough for everyone.</h2>
                <p className="mt-5 text-base leading-7 text-muted-foreground">
                  Verith brings evidence retrieval, source comparison, manipulation analysis, and media literacy into one coherent experience—without asking people to become professional fact-checkers.
                </p>
              </div>
            </MotionReveal>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {benefits.map(({ color, icon: Icon, iconColor, text, title }, index) => (
                <MotionReveal className="h-full" delay={index * 0.06} key={title}>
                  <article className={`h-full rounded-3xl bg-gradient-to-br ${color} p-7 transition-transform duration-300 hover:-translate-y-1`}>
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

        <section className="px-5 py-24" id="how-it-works">
          <div className="mx-auto max-w-[1180px] rounded-[2rem] bg-surface/70 p-7 md:p-12">
            <MotionReveal>
              <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
                <div>
                  <span className="inline-flex rounded-full bg-violet-400/10 px-3 py-1.5 text-xs font-semibold text-violet-300">How it works</span>
                  <h2 className="mt-5 text-4xl font-semibold tracking-normal md:text-5xl">One input. A complete chain of reasoning.</h2>
                </div>
                <p className="max-w-xl text-base leading-7 text-muted-foreground lg:justify-self-end">
                  The product turns an ambiguous piece of content into a structured investigation: claims, evidence relationships, source quality, context, limitations, and practical next steps.
                </p>
              </div>
            </MotionReveal>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {steps.map((step, index) => (
                <MotionReveal className="h-full" delay={index * 0.07} key={step.title}>
                  <article className="h-full rounded-3xl bg-white/[0.035] p-6">
                    <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 text-sm font-bold text-white">
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

        <section className="px-5 py-24">
          <div className="mx-auto grid max-w-[1180px] gap-5 lg:grid-cols-2">
            <MotionReveal>
              <article className="h-full rounded-[2rem] bg-gradient-to-br from-emerald-500/15 to-teal-500/5 p-8 md:p-10">
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
              <article className="grid h-full gap-5 rounded-[2rem] bg-gradient-to-br from-violet-500/15 to-indigo-500/5 p-8 md:grid-cols-2 md:p-10">
                <div>
                  <span className="grid size-11 place-items-center rounded-2xl bg-violet-400/15 text-violet-300">
                    <BookOpen size={22} />
                  </span>
                  <h2 className="mt-7 text-3xl font-semibold tracking-normal">Verification that builds lasting media literacy.</h2>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">
                    Lessons, quizzes, and evidence challenges turn each investigation into practical skills people can reuse across platforms and communities.
                  </p>
                </div>
                <div className="flex flex-col justify-end gap-3">
                  <Link className="inline-flex items-center justify-between rounded-full bg-white/[0.065] px-5 py-3 text-sm font-semibold hover:bg-white/10" href="/learning">
                    Explore learning <ArrowRight size={15} />
                  </Link>
                  <Link className="inline-flex items-center justify-between rounded-full bg-white/[0.065] px-5 py-3 text-sm font-semibold hover:bg-white/10" href="/whatsapp">
                    Use WhatsApp <ArrowRight size={15} />
                  </Link>
                </div>
              </article>
            </MotionReveal>
          </div>
        </section>

        <section className="px-5 py-24" id="product-vision">
          <div className="mx-auto max-w-[1180px] rounded-[2rem] bg-gradient-to-br from-violet-500/10 via-surface/80 to-cyan-500/[0.07] p-7 md:p-12">
            <MotionReveal>
              <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
                <div>
                  <span className="inline-flex rounded-full bg-violet-400/10 px-3 py-1.5 text-xs font-semibold text-violet-300">
                    The Verith product thesis
                  </span>
                  <h2 className="mt-5 text-4xl font-semibold tracking-normal md:text-6xl">
                    Verification should create informed people, not dependent users.
                  </h2>
                </div>
                <p className="text-base leading-7 text-muted-foreground lg:justify-self-end">
                  Verith combines explainable AI, inspectable evidence, accessible
                  distribution, and practical media literacy into one continuous
                  intervention against misinformation.
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
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {text}
                    </p>
                  </article>
                </MotionReveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="px-5 pb-8">
        <div className="mx-auto max-w-[1320px] rounded-[2rem] bg-surface/80 p-8 md:p-10">
          <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
            <div>
              <Brand />
              <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">Explainable verification and media literacy infrastructure for healthier digital communities.</p>
            </div>
            <div className="grid grid-cols-2 gap-8 text-sm">
              <div className="grid content-start gap-3">
                <strong>Explore</strong>
                <Link className="text-muted-foreground hover:text-white" href="/how-it-works">How it works</Link>
                <Link className="text-muted-foreground hover:text-white" href="/learning">Learning</Link>
                <Link className="text-muted-foreground hover:text-white" href="/about">About</Link>
              </div>
              <div className="grid content-start gap-3">
                <strong>Support</strong>
                <Link className="text-muted-foreground hover:text-white" href="/privacy">Privacy</Link>
                <Link className="text-muted-foreground hover:text-white" href="/terms">Terms</Link>
                <Link className="text-muted-foreground hover:text-white" href="/login">Log in</Link>
              </div>
            </div>
          </div>
          <p className="mt-10 text-xs text-muted">© {new Date().getFullYear()} Verith. Building resilience against misinformation through evidence, transparency, and education.</p>
        </div>
      </footer>
    </div>
  );
}
