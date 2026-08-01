import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  description:
    "Connect WhatsApp securely to submit forwarded content to Verith.",
  title: "WhatsApp verification | Verith",
};

export default function WhatsAppPage() {
  return (
    <main
      className="min-h-screen bg-[#08090A] pb-20"
      id="main-content"
      tabIndex={-1}
    >
      <a
        className="fixed top-4 left-4 z-1000 -translate-y-[160%] rounded-full bg-white px-4 py-3 text-sm font-medium text-black transition-transform focus:translate-y-0"
        href="#main-content"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b border-white/[0.05] bg-black/70 backdrop-blur-md">
        <div className="mx-auto grid min-h-16 max-w-[1400px] grid-cols-[1fr_auto_1fr] items-center gap-8 px-6 max-[700px]:grid-cols-[1fr_auto]">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-[15px] font-medium tracking-tight"
          >
            <span className="inline-flex size-8 items-center justify-center rounded-lg bg-[#24183f] text-sm font-semibold text-violet-300">
              V
            </span>
            <span>Verith</span>
          </Link>
          <span className="text-xs text-white/40 max-[700px]:hidden">
            WhatsApp verification
          </span>
          <Link
            className="justify-self-end rounded-full bg-foreground px-4 py-2 text-sm font-medium text-black transition-all duration-200 hover:scale-[1.02] hover:bg-foreground/90 active:scale-[0.98]"
            href="/login"
          >
            Log in
          </Link>
        </div>
      </header>
      <section className="relative mx-auto grid max-w-[1300px] grid-cols-[1.2fr_0.5fr] gap-16 overflow-hidden px-6 py-[clamp(6rem,10vw,9rem)] before:pointer-events-none before:absolute before:-top-24 before:left-1/4 before:size-[30rem] before:rounded-full before:bg-emerald-500/10 before:blur-[120px] after:pointer-events-none after:absolute after:right-0 after:bottom-0 after:size-80 after:rounded-full after:bg-violet-500/10 after:blur-[120px] max-[700px]:grid-cols-1">
        <div>
          <span className="relative inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-400 before:inline-flex before:size-1.5 before:rounded-full before:bg-emerald-400 before:shadow-[0_0_18px_rgba(16,185,129,0.8)]">
            Verification at the point of sharing
          </span>
          <h1 className="relative mt-7 max-w-[14ch] text-5xl leading-[1.05] font-semibold tracking-tighter md:text-7xl">
            Bring evidence into the conversations where misinformation moves.
          </h1>
        </div>
        <p className="relative self-end text-base leading-7 text-muted-foreground">
          Connect your account securely, forward supported content, and turn a
          fast-moving message into an explainable investigation without leaving
          the channel your community already uses.
        </p>
      </section>
      <section className="mx-auto grid max-w-[1300px] grid-cols-3 gap-5 px-6 max-[700px]:grid-cols-1">
        <div className="group min-h-62.5 rounded-3xl border border-white/[0.06] [background:radial-gradient(circle_at_20%_0%,rgba(139,92,246,0.16),transparent_18rem),rgba(7,7,8,0.72)] p-8 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1 hover:border-white/15">
          <span className="grid size-10 place-items-center rounded-xl bg-violet-500/15 text-sm font-semibold text-violet-300">1</span>
          <h2 className="mt-7 text-xl font-semibold tracking-tight">Create a secure connection</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">Generate a short-lived, single-use link code from your private Verith settings.</p>
        </div>
        <div className="group min-h-62.5 rounded-3xl border border-white/[0.06] [background:radial-gradient(circle_at_20%_0%,rgba(6,182,212,0.14),transparent_18rem),rgba(7,7,8,0.72)] p-8 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1 hover:border-white/15">
          <span className="grid size-10 place-items-center rounded-xl bg-cyan-500/15 text-sm font-semibold text-cyan-300">2</span>
          <h2 className="mt-7 text-xl font-semibold tracking-tight">Connect your conversation channel</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">Complete the signed linking flow before the code expires.</p>
        </div>
        <div className="group min-h-62.5 rounded-3xl border border-white/[0.06] [background:radial-gradient(circle_at_20%_0%,rgba(16,185,129,0.14),transparent_18rem),rgba(7,7,8,0.72)] p-8 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1 hover:border-white/15">
          <span className="grid size-10 place-items-center rounded-xl bg-emerald-500/15 text-sm font-semibold text-emerald-300">3</span>
          <h2 className="mt-7 text-xl font-semibold tracking-tight">Investigate in context</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">Forward supported content and let Verith begin an evidence-led investigation from the conversation.</p>
        </div>
      </section>
      <section className="mx-auto mt-20 grid w-[calc(100%_-_3rem)] max-w-[1300px] grid-cols-[1fr_0.7fr] gap-16 rounded-3xl border border-white/[0.06] bg-card/70 p-[clamp(2rem,6vw,5rem)] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] max-[700px]:grid-cols-1">
        <div>
          <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-400 before:inline-flex before:size-1.5 before:rounded-full before:bg-emerald-400">Your privacy</span>
          <h2 className="mt-5 text-[clamp(2rem,4vw,3.75rem)] leading-[1.05] font-semibold tracking-tighter">Your number is not displayed in Verith.</h2>
        </div>
        <p className="self-end text-sm leading-7 text-muted-foreground">
          The backend encrypts the linked number, stores a separate keyed hash
          for lookup, verifies Meta webhook signatures, records consent, and
          removes the encrypted number when you unlink.
        </p>
        <Link
          className="col-start-2 justify-self-start rounded-full bg-gradient-to-r from-[#C084FC] to-[#6366F1] px-5 py-3 text-sm font-medium text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_12px_28px_-10px_rgba(139,92,246,0.4)] active:scale-[0.98] max-[700px]:col-start-1"
          href="/login"
        >
          Log in to connect WhatsApp
        </Link>
      </section>
    </main>
  );
}
