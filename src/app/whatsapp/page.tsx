import type { Metadata } from "next";
import WhatsAppComingSoon from "@/components/whatsapp/WhatsAppComingSoon";
import PublicNavbar from "@/components/public/PublicNavbar";
import PremiumBackground from "@/components/public/PremiumBackground";
import ScrollProgress from "@/components/public/ScrollProgress";
import SpotlightCard from "@/components/public/SpotlightCard";
import MotionReveal from "@/components/public/MotionReveal";

export const metadata: Metadata = {
  description:
    "Connect WhatsApp securely to submit forwarded content to Verith.",
  title: "WhatsApp verification | Verith",
};

export default function WhatsAppPage() {
  return (
    <main
      className="min-h-screen bg-[#0a0a0a] pb-24 relative selection:bg-white/10 selection:text-white"
      id="main-content"
      tabIndex={-1}
    >
      <ScrollProgress />
      <PremiumBackground />
      <PublicNavbar />
      
      {/* Refined Centered Hero */}
      <section className="relative z-10 mx-auto flex flex-col items-center text-center max-w-[900px] px-6 pt-[clamp(6rem,12vw,10rem)] pb-16">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-white/70 mb-8 backdrop-blur-md">
          <span className="size-1.5 rounded-full bg-white/70"></span>
          Verification at the point of sharing
        </span>
        <h1 className="text-balance text-4xl md:text-6xl lg:text-[4rem] leading-[1.1] font-semibold tracking-tight mb-6 animate-text-shimmer bg-[linear-gradient(110deg,#a78bfa,45%,#fff,55%,#a78bfa)] bg-[length:200%_100%] bg-clip-text text-transparent">
          Bring evidence into the conversations where misinformation moves.
        </h1>
        <p className="max-w-2xl text-balance text-base md:text-lg leading-relaxed text-white/50">
          Connect your account securely, forward supported content, and turn a
          fast-moving message into an explainable investigation without leaving
          the channel your community already uses.
        </p>
      </section>

      <div className="relative z-10 pb-24">
        <WhatsAppComingSoon />
      </div>

      {/* Elegant Grid for Steps */}
      <section className="relative z-10 mx-auto max-w-[1200px] px-6">
        <MotionReveal>
          <div className="mb-12 text-center">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-white/40">How it works</h2>
          </div>
        </MotionReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MotionReveal delay={0.1} className="h-full">
            <SpotlightCard className="h-full p-8 flex flex-col group">
              <div className="relative z-10 flex items-center justify-between mb-8">
                <span className="flex size-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-lg font-bold text-white group-hover:text-violet-300 group-hover:bg-violet-500/20 transition-colors">
                  1
                </span>
              </div>
              <h3 className="relative z-10 text-2xl font-bold tracking-tight text-white mb-3">Create a secure connection</h3>
              <p className="relative z-10 text-base font-medium leading-relaxed text-white/60 group-hover:text-white/70 transition-colors">Generate a short-lived, single-use link code from your private Verith settings.</p>
            </SpotlightCard>
          </MotionReveal>

          <MotionReveal delay={0.2} className="h-full">
            <SpotlightCard className="h-full p-8 flex flex-col group">
              <div className="relative z-10 flex items-center justify-between mb-8">
                <span className="flex size-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-lg font-bold text-white group-hover:text-violet-300 group-hover:bg-violet-500/20 transition-colors">
                  2
                </span>
              </div>
              <h3 className="relative z-10 text-2xl font-bold tracking-tight text-white mb-3">Connect your channel</h3>
              <p className="relative z-10 text-base font-medium leading-relaxed text-white/60 group-hover:text-white/70 transition-colors">Complete the signed linking flow on your device before the code expires.</p>
            </SpotlightCard>
          </MotionReveal>

          <MotionReveal delay={0.3} className="h-full">
            <SpotlightCard className="h-full p-8 flex flex-col group">
              <div className="relative z-10 flex items-center justify-between mb-8">
                <span className="flex size-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-lg font-bold text-white group-hover:text-violet-300 group-hover:bg-violet-500/20 transition-colors">
                  3
                </span>
              </div>
              <h3 className="relative z-10 text-2xl font-bold tracking-tight text-white mb-3">Investigate in context</h3>
              <p className="relative z-10 text-base font-medium leading-relaxed text-white/60 group-hover:text-white/70 transition-colors">Forward supported content and let Verith begin an investigation from the conversation.</p>
            </SpotlightCard>
          </MotionReveal>
        </div>
      </section>

      {/* Refined Privacy Section */}
      <section className="relative z-10 mx-auto mt-24 max-w-[1000px] px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 rounded-3xl border border-white/5 bg-[#0e0e0e] p-8 md:p-12 text-center md:text-left">
          <div className="max-w-md">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-white/60 mb-4">
              <span className="size-1.5 rounded-full bg-white/50"></span>
              Your privacy
            </span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-4">
              Your number is not displayed in Verith.
            </h2>
            <p className="text-base font-medium leading-relaxed text-white/60">
              The backend encrypts the linked number, stores a separate keyed hash
              for lookup, verifies Meta webhook signatures, records consent, and
              removes the encrypted number when you unlink.
            </p>
          </div>
          <div className="shrink-0">
            <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-white/70 backdrop-blur-sm">
              Locked during rollout
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
