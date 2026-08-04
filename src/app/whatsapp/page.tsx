import type { Metadata } from "next";
import WhatsAppComingSoon from "@/components/whatsapp/WhatsAppComingSoon";
import PublicNavbar from "@/components/public/PublicNavbar";

export const metadata: Metadata = {
  description:
    "Connect WhatsApp securely to submit forwarded content to Verith.",
  title: "WhatsApp verification | Verith",
};

export default function WhatsAppPage() {
  return (
    <main
      className="min-h-screen bg-[#0a0a0a] pb-24"
      id="main-content"
      tabIndex={-1}
    >
      <PublicNavbar />
      
      {/* Refined Centered Hero */}
      <section className="mx-auto flex flex-col items-center text-center max-w-[900px] px-6 pt-[clamp(6rem,12vw,10rem)] pb-16">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-white/70 mb-8 backdrop-blur-md">
          <span className="size-1.5 rounded-full bg-white/70"></span>
          Verification at the point of sharing
        </span>
        <h1 className="text-balance text-4xl md:text-6xl lg:text-[4rem] leading-[1.1] font-semibold tracking-tight text-white mb-6">
          Bring evidence into the conversations where misinformation moves.
        </h1>
        <p className="max-w-2xl text-balance text-base md:text-lg leading-relaxed text-white/50">
          Connect your account securely, forward supported content, and turn a
          fast-moving message into an explainable investigation without leaving
          the channel your community already uses.
        </p>
      </section>

      <div className="pb-24">
        <WhatsAppComingSoon />
      </div>

      {/* Elegant Grid for Steps */}
      <section className="mx-auto max-w-[1200px] px-6">
        <div className="mb-12 text-center">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-white/40">How it works</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group relative rounded-3xl border border-white/5 bg-[#0e0e0e] p-8 transition-all hover:bg-[#111] hover:border-white/10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-medium text-white shadow-sm mb-8">
              1
            </span>
            <h3 className="relative text-xl font-semibold tracking-tight text-white mb-3">Create a secure connection</h3>
            <p className="relative text-sm leading-relaxed text-white/50">Generate a short-lived, single-use link code from your private Verith settings.</p>
          </div>

          <div className="group relative rounded-3xl border border-white/5 bg-[#0e0e0e] p-8 transition-all hover:bg-[#111] hover:border-white/10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-medium text-white shadow-sm mb-8">
              2
            </span>
            <h3 className="relative text-xl font-semibold tracking-tight text-white mb-3">Connect your channel</h3>
            <p className="relative text-sm leading-relaxed text-white/50">Complete the signed linking flow on your device before the code expires.</p>
          </div>

          <div className="group relative rounded-3xl border border-white/5 bg-[#0e0e0e] p-8 transition-all hover:bg-[#111] hover:border-white/10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-medium text-white shadow-sm mb-8">
              3
            </span>
            <h3 className="relative text-xl font-semibold tracking-tight text-white mb-3">Investigate in context</h3>
            <p className="relative text-sm leading-relaxed text-white/50">Forward supported content and let Verith begin an investigation from the conversation.</p>
          </div>
        </div>
      </section>

      {/* Refined Privacy Section */}
      <section className="mx-auto mt-24 max-w-[1000px] px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 rounded-3xl border border-white/5 bg-[#0e0e0e] p-8 md:p-12 text-center md:text-left">
          <div className="max-w-md">
            <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/50 mb-4">
              <span className="size-1.5 rounded-full bg-white/50"></span>
              Your privacy
            </span>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white mb-4">
              Your number is not displayed in Verith.
            </h2>
            <p className="text-sm leading-relaxed text-white/50">
              The backend encrypts the linked number, stores a separate keyed hash
              for lookup, verifies Meta webhook signatures, records consent, and
              removes the encrypted number when you unlink.
            </p>
          </div>
          <div className="shrink-0">
            <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.15em] text-white/60 backdrop-blur-sm">
              Locked during rollout
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
