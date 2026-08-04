import { ArrowRight, Check, FileSearch, Globe2, ImageIcon, Link2, MessageCircle, Mic2, Search, ShieldCheck, Video, ShieldAlert, BookOpen, Quote, ChevronDown } from "lucide-react";
import Link from "next/link";
import PublicNavbar from "@/components/public/PublicNavbar";
import VerithLogo from "@/components/brand/VerithLogo";
import MotionReveal from "@/components/public/MotionReveal";
import PremiumBackground from "@/components/public/PremiumBackground";
import ScrollProgress from "@/components/public/ScrollProgress";
import LevitatingUI from "@/components/public/LevitatingUI";
import SpotlightCard from "@/components/public/SpotlightCard";

const inputTypes = [
  { icon: MessageCircle, label: "Text" },
  { icon: Link2, label: "Link" },
  { icon: ImageIcon, label: "Image" },
  { icon: Mic2, label: "Voice note" },
  { icon: Video, label: "Video" },
] as const;

const productPillars = [
  {
    icon: ShieldCheck,
    title: "Explainable Verification",
    text: "Go beyond 'true' or 'false'. Understand exactly why a claim is disputed with clear, traceable evidence mapped directly to original sources."
  },
  {
    icon: Search,
    title: "Deep Source Analysis",
    text: "Automatically retrieve, cross-reference, and evaluate the credibility of sources across the web, identifying bias and missing context."
  },
  {
    icon: ShieldAlert,
    title: "Calibrated Uncertainty",
    text: "Never manufacture certainty. When evidence is inconclusive or missing, Verith clearly exposes the gaps so you can make informed decisions."
  },
  {
    icon: BookOpen,
    title: "Media Literacy Engine",
    text: "Every investigation is a learning opportunity. Interactive challenges and evidence quizzes turn fact-checking into practical, reusable skills."
  }
];

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
                  <span className="text-xs font-medium text-white/70">Evidence infrastructure</span>
                </div>
                <div className="hidden sm:flex items-center gap-2.5 rounded-full border border-white/10 bg-black/50 px-3 py-1 shadow-inner shadow-white/5">
                  <span className="relative size-1.5"><span className="absolute inset-0 animate-ping rounded-full bg-violet-400 opacity-50"></span><span className="absolute inset-0 rounded-full bg-violet-500 blur-[2px]"></span><span className="relative block size-1.5 rounded-full bg-violet-300"></span></span>
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">Verith.Engine_Active</span>
                </div>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter leading-[1.05] text-balance">
                Turn information overload into{" "}
                <span className="animate-text-shimmer bg-[linear-gradient(110deg,#a78bfa,45%,#fff,55%,#a78bfa)] bg-[length:200%_100%] bg-clip-text text-transparent">informed action.</span>
              </h1>
              
              <p className="mt-6 text-lg text-white/50 leading-relaxed max-w-xl">
                Verith is an explainable verification platform that transforms claims, articles, screenshots, and voice notes into transparent evidence maps you can trust.
              </p>
              
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <Link
                  className="group relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-full font-bold text-white transition-all duration-500 hover:scale-[1.03] active:scale-[0.97] px-8 py-3.5 text-sm"
                  href="/login"
                >
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-900 via-violet-600 to-fuchsia-500 p-px shadow-[0_0_20px_-5px_rgba(139,92,246,0.5)] transition-shadow duration-500 group-hover:shadow-[0_0_35px_-5px_rgba(139,92,246,0.85)]">
                    <span className="block size-full rounded-full bg-gradient-to-b from-[#1a103c] to-black backdrop-blur-xl"></span>
                  </span>
                  <span aria-hidden="true" className="absolute top-1/2 -right-4 size-24 -translate-y-1/2 bg-violet-600/30 blur-3xl transition-all duration-700 group-hover:bg-violet-500/50"></span>
                  <span className="relative z-10 flex items-center gap-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                    Start Investigating
                    <ArrowRight size={16} className="opacity-70 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <a
                  className="inline-flex h-12 items-center justify-center rounded-full px-4 text-sm font-medium text-white/50 transition-colors hover:text-white"
                  href="#how-it-works"
                >
                  Explore Product
                </a>
              </div>
            </div>

            {/* Right UI Abstraction */}
            <LevitatingUI className="relative w-full aspect-square md:aspect-auto md:h-[600px] rounded-3xl border border-white/10 bg-[#111] shadow-2xl shadow-black/50 overflow-hidden flex flex-col">
              {/* Fake Window Header */}
              <div className="h-12 border-b border-white/10 flex items-center px-4 gap-2 bg-[#0a0a0a]">
                <div className="flex gap-1.5">
                  <div className="size-3 rounded-full bg-white/20" />
                  <div className="size-3 rounded-full bg-white/20" />
                  <div className="size-3 rounded-full bg-white/20" />
                </div>
                <div className="mx-auto px-24 py-1.5 rounded-md bg-white/5 border border-white/5 text-[10px] text-white/30 font-medium">
                  verith.app/investigate
                </div>
              </div>
              
              {/* Fake Window Content */}
              <div className="flex-1 p-6 flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-white/90">New Investigation</h3>
                    <p className="text-xs text-white/40 mt-1">Upload a file or paste a link to begin.</p>
                  </div>
                  <div className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-medium border border-emerald-500/20">
                    Private
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {inputTypes.map(({ icon: Icon, label }, i) => (
                    <div key={label} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium border ${i === 0 ? 'bg-white text-black border-transparent' : 'bg-white/5 border-white/10 text-white/60'}`}>
                      <Icon size={14} />
                      {label}
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex-1 rounded-xl border border-white/10 bg-[#0a0a0a] p-4">
                  <div className="h-4 w-1/3 bg-white/5 rounded" />
                  <div className="h-3 w-3/4 bg-white/5 rounded mt-3" />
                  <div className="h-3 w-2/3 bg-white/5 rounded mt-2" />
                </div>
                
                <div className="flex justify-end">
                  <div className="h-9 w-28 bg-white/10 rounded-full" />
                </div>
              </div>
              
              {/* Decorative gradients */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 blur-3xl rounded-full" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-fuchsia-500/10 blur-3xl rounded-full" />
            </LevitatingUI>
          </div>
        </section>

        {/* INFINITE MARQUEE BANNER */}
        <div className="relative mx-auto w-full max-w-7xl overflow-hidden border-y border-white/5 bg-black/40 py-6 mb-12">
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent"></div>
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent"></div>
          <div className="flex w-max animate-marquee whitespace-nowrap text-sm text-white/40">
            {[...Array(2)].map((_, i) => (
              <div key={i} aria-hidden={i !== 0} className="flex items-center">
                {[
                  "Explainable AI",
                  "Traceable Evidence",
                  "Deep Source Analysis",
                  "Calibrated Uncertainty",
                  "Media Literacy Engine",
                  "Honest by Construction"
                ].map((text) => (
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
                  The Verith product thesis
                </span>
                <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-balance">
                  Verification should create informed people, <span className="text-white/40">not dependent users.</span>
                </h2>
              </div>
            </MotionReveal>

            <div className="grid gap-6 md:grid-cols-2">
              {productPillars.map(({ icon: Icon, text, title }, index) => (
                <MotionReveal delay={index * 0.1} depth={30} key={title}>
                  <article className="group h-full rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.04] hover:border-white/20 hover:shadow-[0_0_40px_rgba(139,92,246,0.15)] relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="relative grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-indigo-500/10 border border-white/10 text-violet-300 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-inner shadow-white/5">
                      <Icon size={24} />
                    </span>
                    <h3 className="relative mt-8 text-xl font-medium text-white group-hover:text-violet-200 transition-colors duration-300">{title}</h3>
                    <p className="relative mt-3 text-sm leading-relaxed text-white/50 group-hover:text-white/70 transition-colors duration-300">
                      {text}
                    </p>
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
                <h2 className="text-3xl md:text-4xl font-medium tracking-tight">Powerful enough for investigation.<br /><span className="text-white/40">Clear enough for everyone.</span></h2>
                <p className="mt-4 text-base text-white/50 leading-relaxed">
                  Verith brings evidence retrieval, source comparison, and media literacy into one coherent experience—without asking people to become professional fact-checkers.
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
                      <h3 className="text-xl font-medium text-white">Claim-level intelligence</h3>
                      <p className="mt-2 text-sm text-white/50 max-w-md leading-relaxed group-hover:text-white/70 transition-colors">
                        Verith decomposes complex media into verifiable claims, separating fact, opinion, framing, and rhetoric before analysis begins.
                      </p>
                    </div>
                    <div className="absolute right-0 bottom-0 w-2/3 h-2/3 bg-gradient-to-tl from-violet-500/10 to-transparent blur-2xl group-hover:bg-violet-500/30 transition-colors duration-500" />
                </SpotlightCard>
              </MotionReveal>
              
              {/* Card 2 - Vertical */}
              <MotionReveal delay={0.2} className="h-full">
                <SpotlightCard className="h-full p-8 md:p-10 flex flex-col group">
                    <div className="relative z-10">
                      <div className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6 group-hover:text-indigo-300 group-hover:bg-indigo-500/20 transition-colors">
                        <Search size={20} />
                      </div>
                      <h3 className="text-xl font-medium text-white">Traceable evidence</h3>
                      <p className="mt-2 text-sm text-white/50 leading-relaxed group-hover:text-white/70 transition-colors">
                        Every conclusion remains connected to the source material that supports, challenges, or contextualises it.
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
                      <h3 className="text-xl font-medium text-white">Calibrated uncertainty</h3>
                      <p className="mt-2 text-sm text-white/50 leading-relaxed group-hover:text-white/70 transition-colors">
                        Verith exposes evidence gaps and missing context instead of manufacturing certainty where none exists.
                      </p>
                    </div>
                </SpotlightCard>
              </MotionReveal>

              {/* Card 4 - Wide Feature */}
              <MotionReveal delay={0.4} className="md:col-span-2 h-full">
                <SpotlightCard className="h-full p-8 md:p-10 flex flex-col group">
                    <div className="relative z-10 h-full flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-medium text-white group-hover:text-violet-300 transition-colors">Verification that builds lasting media literacy.</h3>
                        <p className="mt-2 text-sm text-white/50 max-w-md leading-relaxed group-hover:text-white/70 transition-colors">
                          Lessons, quizzes, and evidence challenges turn each investigation into practical skills people can reuse across platforms and communities.
                        </p>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex items-center gap-2 text-xs font-medium text-white/40 group-hover:text-white/70 transition-colors"><Check size={14} className="text-emerald-500" /> No invented citations</div>
                        <div className="flex items-center gap-2 text-xs font-medium text-white/40 group-hover:text-white/70 transition-colors"><Check size={14} className="text-emerald-500" /> No hidden uncertainty</div>
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
                <h2 className="text-3xl md:text-4xl font-medium tracking-tight">One input.<br /><span className="text-white/40">A complete chain of reasoning.</span></h2>
                <p className="mt-6 text-base text-white/50 leading-relaxed max-w-md">
                  The product turns an ambiguous piece of content into a structured investigation: claims, evidence relationships, source quality, context, limitations, and practical next steps.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-12">
              <div className="flex gap-6 group cursor-default">
                <div className="flex flex-col items-center">
                  <div className="size-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-sm font-bold text-white group-hover:bg-violet-600 group-hover:border-violet-500 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all">1</div>
                  <div className="w-px h-full bg-white/10 my-4 group-hover:bg-violet-500/50 transition-colors" />
                </div>
                <div className="pb-8">
                  <h3 className="text-xl font-medium text-white">Capture the source</h3>
                  <p className="mt-2 text-sm text-white/50 leading-relaxed">Submit text, a link, image, screenshot, voice note, or short video while preserving the original material and its context.</p>
                </div>
              </div>
              
              <div className="flex gap-6 group cursor-default">
                <div className="flex flex-col items-center">
                  <div className="size-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-sm font-bold text-white group-hover:bg-violet-600 group-hover:border-violet-500 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all">2</div>
                  <div className="w-px h-full bg-white/10 my-4 group-hover:bg-violet-500/50 transition-colors" />
                </div>
                <div className="pb-8">
                  <h3 className="text-xl font-medium text-white">Build the evidence map</h3>
                  <p className="mt-2 text-sm text-white/50 leading-relaxed">Verith extracts factual claims, retrieves relevant sources, compares competing evidence, and surfaces missing context.</p>
                </div>
              </div>

              <div className="flex gap-6 group cursor-default">
                <div className="flex flex-col items-center">
                  <div className="size-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-sm font-bold text-white group-hover:bg-violet-600 group-hover:border-violet-500 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all">3</div>
                </div>
                <div className="pb-8">
                  <h3 className="text-xl font-medium text-white">Act with confidence</h3>
                  <p className="mt-2 text-sm text-white/50 leading-relaxed">Explore an explainable report, inspect every source, understand uncertainty, and make a more informed sharing decision.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section className="py-24 px-6 relative z-10" id="testimonials">
          <div className="mx-auto max-w-6xl">
            <MotionReveal>
              <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-medium tracking-tight">Don't just take our word for it.</h2>
                <p className="mt-4 text-base text-white/50 leading-relaxed">
                  Join thousands of journalists, researchers, and everyday people building a healthier information ecosystem.
                </p>
              </div>
            </MotionReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { quote: "Verith has completely transformed how our newsroom verifies breaking information on social media. The traceable evidence maps save us hours.", author: "Sarah Jenkins", role: "Investigative Journalist" },
                { quote: "Finally, a tool that treats people like adults. Instead of just telling me what's fake, it actually shows me the underlying sources and bias.", author: "David Chen", role: "Independent Researcher" },
                { quote: "The media literacy engine is brilliant. I started using it to check WhatsApp rumors, and now I actually understand how to spot missing context.", author: "Elena Rodriguez", role: "Community Educator" }
              ].map((testimonial, i) => (
                <MotionReveal delay={i * 0.1} key={i}>
                  <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 relative hover:border-white/20 transition-all duration-300">
                    <Quote className="text-violet-500/20 w-12 h-12 absolute top-6 right-6" />
                    <p className="text-white/70 leading-relaxed relative z-10">"{testimonial.quote}"</p>
                    <div className="mt-8 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-violet-500 to-indigo-500 flex items-center justify-center text-white font-medium text-sm">
                        {testimonial.author.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white/90">{testimonial.author}</div>
                        <div className="text-xs text-white/40">{testimonial.role}</div>
                      </div>
                    </div>
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
                { q: "How does Verith verify claims?", a: "Verith uses advanced AI to extract factual claims from your input, then actively searches across the web for credible primary sources, news reports, and academic journals to cross-reference the claims. It builds an evidence map that you can inspect." },
                { q: "Is Verith always right?", a: "No AI is always right, which is why Verith is designed to be explainable. We never manufacture certainty. If evidence is missing, contradictory, or inconclusive, the platform will explicitly tell you so." },
                { q: "What types of media can I verify?", a: "You can submit text claims, links to articles, screenshots, images, and even voice notes or short video clips. Verith extracts the relevant claims from the media before beginning the analysis." },
                { q: "Do I need to be a fact-checker to use it?", a: "Not at all. Verith is built for everyone. While powerful enough for journalists, the interface is designed to be clear and accessible, helping everyday people build media literacy skills along the way." }
              ].map((faq, i) => (
                <MotionReveal delay={i * 0.1} key={i}>
                  <details className="group rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 text-base font-medium text-white transition-colors hover:text-violet-300">
                      {faq.q}
                      <ChevronDown className="h-5 w-5 text-white/40 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="px-6 pb-6 text-sm leading-relaxed text-white/60">
                      {faq.a}
                    </div>
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
                Verification should create informed people,<br /><span className="text-white/40">not dependent users.</span>
              </h2>
              <p className="mt-6 text-base md:text-lg text-white/50 leading-relaxed mx-auto max-w-2xl text-balance">
                Verith combines explainable AI, inspectable evidence, accessible distribution, and practical media literacy into one continuous intervention against misinformation.
              </p>
              <div className="mt-10 flex items-center justify-center gap-6">
                <Link
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-violet-500/20 bg-gradient-to-r from-violet-600 to-indigo-600 px-10 text-base font-bold text-white transition-transform hover:scale-105 active:scale-95 shadow-[0_4px_24px_rgba(139,92,246,0.3)]"
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
            <div className="lg:col-span-5">
              <Brand />
              <p className="mt-6 max-w-sm text-sm text-white/50 leading-relaxed">
                Explainable verification and media literacy infrastructure for healthier digital communities. Stop guessing, start investigating.
              </p>
              <div className="mt-8 flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-violet-500 hover:bg-violet-500/10 transition-all"><Globe2 size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-violet-500 hover:bg-violet-500/10 transition-all"><MessageCircle size={18} /></a>
              </div>
            </div>
            
            <div className="lg:col-span-2 lg:col-start-7 flex flex-col gap-4">
              <span className="text-sm font-semibold text-white tracking-wider uppercase mb-2">Product</span>
              <Link className="text-sm text-white/50 hover:text-violet-300 transition-colors" href="/how-it-works">How it works</Link>
              <Link className="text-sm text-white/50 hover:text-violet-300 transition-colors" href="/whatsapp">WhatsApp Bot</Link>
              <Link className="text-sm text-white/50 hover:text-violet-300 transition-colors" href="/pricing">Pricing</Link>
            </div>

            <div className="lg:col-span-2 flex flex-col gap-4">
              <span className="text-sm font-semibold text-white tracking-wider uppercase mb-2">Company</span>
              <Link className="text-sm text-white/50 hover:text-violet-300 transition-colors" href="/about">About Us</Link>
              <Link className="text-sm text-white/50 hover:text-violet-300 transition-colors" href="/blog">Blog</Link>
              <Link className="text-sm text-white/50 hover:text-violet-300 transition-colors" href="/careers">Careers</Link>
            </div>

            <div className="lg:col-span-3 flex flex-col gap-4">
              <span className="text-sm font-semibold text-white tracking-wider uppercase mb-2">Legal & Support</span>
              <Link className="text-sm text-white/50 hover:text-violet-300 transition-colors" href="/privacy">Privacy Policy</Link>
              <Link className="text-sm text-white/50 hover:text-violet-300 transition-colors" href="/terms">Terms of Service</Link>
              <Link className="text-sm text-white/50 hover:text-violet-300 transition-colors" href="/contact">Contact Support</Link>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/40 font-medium">
              © {new Date().getFullYear()} Verith Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-xs font-medium text-white/30">
              <span>Made with ❤️ for the truth.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
