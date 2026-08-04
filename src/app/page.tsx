import { ArrowRight, Check, FileSearch, Globe2, ImageIcon, Link2, MessageCircle, Mic2, Search, ShieldCheck, Video } from "lucide-react";
import Link from "next/link";
import PublicNavbar from "@/components/public/PublicNavbar";
import VerithLogo from "@/components/brand/VerithLogo";

const inputTypes = [
  { icon: MessageCircle, label: "Text" },
  { icon: Link2, label: "Link" },
  { icon: ImageIcon, label: "Image" },
  { icon: Mic2, label: "Voice note" },
  { icon: Video, label: "Video" },
] as const;

function Brand() {
  return (
    <Link className="flex items-center gap-2.5 hover:opacity-80 transition-opacity" href="/" aria-label="Verith home">
      <VerithLogo />
    </Link>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#fafafa] selection:bg-white/10 selection:text-white">
      <PublicNavbar />

      <main id="main-content" tabIndex={-1}>
        {/* HERO SECTION */}
        <section className="relative pt-40 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.03] via-[#0a0a0a] to-[#0a0a0a] pointer-events-none" />
          
          <div className="mx-auto max-w-6xl relative z-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center">
            {/* Left Copy */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 mb-8">
                <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-medium text-white/70">Evidence infrastructure for healthier information</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter leading-[1.05] text-balance">
                Turn information overload into{" "}
                <span className="text-white/40">informed action.</span>
              </h1>
              
              <p className="mt-6 text-lg text-white/50 leading-relaxed max-w-xl">
                Verith is an explainable verification platform that transforms claims, articles, screenshots, and voice notes into transparent evidence maps you can trust.
              </p>
              
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-8 text-sm font-medium text-black transition-all hover:scale-105 active:scale-95 shadow-glass"
                  href="/login"
                >
                  Start Investigating
                  <ArrowRight size={16} className="opacity-70" />
                </Link>
                <a
                  className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 text-sm font-medium text-white/80 transition-colors hover:bg-white/10"
                  href="#how-it-works"
                >
                  Explore Product
                </a>
              </div>
            </div>

            {/* Right UI Abstraction */}
            <div className="relative w-full aspect-square md:aspect-auto md:h-[600px] rounded-3xl border border-white/10 bg-[#111] shadow-2xl shadow-black/50 overflow-hidden flex flex-col">
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
              <div className="absolute -bottom-32 -right-32 size-64 bg-white/10 blur-[100px] rounded-full" />
            </div>
          </div>
        </section>

        {/* BENTO GRID SECTION (Why Verith) */}
        <section className="py-24 px-6 relative" id="why-verith">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl mb-16">
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight">Powerful enough for investigation.<br /><span className="text-white/40">Clear enough for everyone.</span></h2>
              <p className="mt-4 text-base text-white/50 leading-relaxed">
                Verith brings evidence retrieval, source comparison, and media literacy into one coherent experience—without asking people to become professional fact-checkers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[280px]">
              <div className="md:col-span-2 rounded-3xl border border-white/10 bg-[#111] p-8 flex flex-col justify-between overflow-hidden relative group">
                <div className="relative z-10">
                  <div className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6">
                    <FileSearch size={20} />
                  </div>
                  <h3 className="text-xl font-medium text-white">Claim-level intelligence</h3>
                  <p className="mt-2 text-sm text-white/50 max-w-md leading-relaxed">
                    Verith decomposes complex media into verifiable claims, separating fact, opinion, framing, and rhetoric before analysis begins.
                  </p>
                </div>
                <div className="absolute right-0 bottom-0 w-2/3 h-2/3 bg-gradient-to-tl from-white/5 to-transparent blur-2xl group-hover:bg-white/10 transition-colors duration-500" />
              </div>
              
              <div className="rounded-3xl border border-white/10 bg-[#111] p-8 flex flex-col justify-between overflow-hidden relative group">
                <div className="relative z-10">
                  <div className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6">
                    <Search size={20} />
                  </div>
                  <h3 className="text-xl font-medium text-white">Traceable evidence</h3>
                  <p className="mt-2 text-sm text-white/50 leading-relaxed">
                    Every conclusion remains connected to the source material that supports, challenges, or contextualises it.
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-[#111] p-8 flex flex-col justify-between overflow-hidden relative group">
                <div className="relative z-10">
                  <div className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6">
                    <ShieldCheck size={20} />
                  </div>
                  <h3 className="text-xl font-medium text-white">Calibrated uncertainty</h3>
                  <p className="mt-2 text-sm text-white/50 leading-relaxed">
                    Verith exposes evidence gaps and missing context instead of manufacturing certainty where none exists.
                  </p>
                </div>
              </div>

              <div className="md:col-span-2 rounded-3xl border border-white/10 bg-[#111] p-8 flex flex-col justify-between overflow-hidden relative group">
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-medium text-white">Verification that builds lasting media literacy.</h3>
                    <p className="mt-2 text-sm text-white/50 max-w-md leading-relaxed">
                      Lessons, quizzes, and evidence challenges turn each investigation into practical skills people can reuse across platforms and communities.
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2 text-xs font-medium text-white/40"><Check size={14} className="text-emerald-500" /> No invented citations</div>
                    <div className="flex items-center gap-2 text-xs font-medium text-white/40"><Check size={14} className="text-emerald-500" /> No hidden uncertainty</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS (List Layout instead of cards) */}
        <section className="py-24 px-6 border-y border-white/5 bg-white/[0.02]" id="how-it-works">
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
              <div className="flex gap-6 group">
                <div className="flex flex-col items-center">
                  <div className="size-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-xs font-medium text-white group-hover:bg-white group-hover:text-black transition-colors">1</div>
                  <div className="w-px h-full bg-white/10 my-4" />
                </div>
                <div className="pb-8">
                  <h3 className="text-xl font-medium text-white">Capture the source</h3>
                  <p className="mt-2 text-sm text-white/50 leading-relaxed">Submit text, a link, image, screenshot, voice note, or short video while preserving the original material and its context.</p>
                </div>
              </div>
              
              <div className="flex gap-6 group">
                <div className="flex flex-col items-center">
                  <div className="size-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-xs font-medium text-white group-hover:bg-white group-hover:text-black transition-colors">2</div>
                  <div className="w-px h-full bg-white/10 my-4" />
                </div>
                <div className="pb-8">
                  <h3 className="text-xl font-medium text-white">Build the evidence map</h3>
                  <p className="mt-2 text-sm text-white/50 leading-relaxed">Verith extracts factual claims, retrieves relevant sources, compares competing evidence, and surfaces missing context.</p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="flex flex-col items-center">
                  <div className="size-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-xs font-medium text-white group-hover:bg-white group-hover:text-black transition-colors">3</div>
                </div>
                <div className="pb-8">
                  <h3 className="text-xl font-medium text-white">Act with confidence</h3>
                  <p className="mt-2 text-sm text-white/50 leading-relaxed">Explore an explainable report, inspect every source, understand uncertainty, and make a more informed sharing decision.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VISION SECTION */}
        <section className="py-32 px-6" id="product-vision">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-balance leading-tight">
              Verification should create informed people,<br /><span className="text-white/40">not dependent users.</span>
            </h2>
            <p className="mt-6 text-base md:text-lg text-white/50 leading-relaxed mx-auto max-w-2xl text-balance">
              Verith combines explainable AI, inspectable evidence, accessible distribution, and practical media literacy into one continuous intervention against misinformation.
            </p>
            <div className="mt-10 flex items-center justify-center gap-6">
              <Link
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-8 text-sm font-medium text-black transition-all hover:scale-105 active:scale-95 shadow-glass"
                href="/login"
              >
                Create an Account
                <ArrowRight size={16} className="opacity-70" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-white/[0.02] px-6 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-3 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <Brand />
              <p className="mt-4 max-w-xs text-sm text-white/50 leading-relaxed">
                Explainable verification and media literacy infrastructure for healthier digital communities.
              </p>
            </div>
            
            <div className="flex flex-col gap-3">
              <span className="text-sm font-medium text-white mb-2">Explore</span>
              <Link className="text-sm text-white/50 hover:text-white transition-colors" href="/how-it-works">How it works</Link>
              <Link className="text-sm text-white/50 hover:text-white transition-colors" href="/whatsapp">WhatsApp</Link>
              <Link className="text-sm text-white/50 hover:text-white transition-colors" href="/about">About</Link>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-sm font-medium text-white mb-2">Support</span>
              <Link className="text-sm text-white/50 hover:text-white transition-colors" href="/privacy">Privacy Policy</Link>
              <Link className="text-sm text-white/50 hover:text-white transition-colors" href="/terms">Terms of Service</Link>
              <Link className="text-sm text-white/50 hover:text-white transition-colors" href="/login">Log in</Link>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} Verith. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-white/40 hover:text-white transition-colors"><Globe2 size={16} /></a>
              <a href="#" className="text-white/40 hover:text-white transition-colors"><MessageCircle size={16} /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
