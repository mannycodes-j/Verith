import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  description:
    "Connect WhatsApp securely to submit forwarded content to Verith.",
  title: "WhatsApp verification | Verith",
};

export default function WhatsAppPage() {
  return (
    <main className="mx-auto max-w-[1320px] px-5 pb-20">
      <header className="mt-4 grid min-h-16 grid-cols-[1fr_auto_1fr] items-center rounded-2xl bg-surface/80 px-5 backdrop-blur-xl">
        <Link
          href="/"
          className="text-lg font-semibold"
        >
          Verith
        </Link>
        <span className="text-xs text-muted">
          WhatsApp verification
        </span>
        <Link
          className="justify-self-end rounded-full bg-white/[0.05] px-4 py-2 text-xs text-muted-foreground"
          href="/login"
        >
          Log in
        </Link>
      </header>
      <section className="relative grid grid-cols-[1.2fr_0.5fr] gap-16 overflow-hidden py-[clamp(5rem,9vw,9rem)] before:pointer-events-none before:absolute before:left-0 before:top-8 before:size-80 before:rounded-full before:bg-emerald-500/10 before:blur-[110px] max-[700px]:grid-cols-1">
        <div>
          <span className="relative inline-flex rounded-full bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">
            Check messages where you receive them
          </span>
          <h1 className="relative mt-6 text-[clamp(3.5rem,8vw,7rem)] leading-[0.96] font-semibold tracking-[-0.06em]">
            Investigate forwarded content.
          </h1>
        </div>
        <p className="self-end leading-[1.65] text-muted-foreground">
          Link your account with a short-lived code, then send supported
          forwarded material to the configured Verith WhatsApp service.
        </p>
      </section>
      <section className="grid grid-cols-3 gap-5 max-[700px]:grid-cols-1">
        <div className="min-h-62.5 rounded-3xl bg-gradient-to-br from-violet-500/15 to-indigo-500/5 p-8">
          <span className="grid size-9 place-items-center rounded-full bg-violet-500 text-sm font-bold">1</span>
          <h2 className="mt-6 text-2xl font-semibold">Create a code</h2>
          <p className="self-end leading-[1.65] text-muted-foreground">Create a one-time code from your authenticated settings.</p>
        </div>
        <div className="min-h-62.5 rounded-3xl bg-gradient-to-br from-cyan-500/15 to-sky-500/5 p-8">
          <span className="grid size-9 place-items-center rounded-full bg-cyan-500 text-sm font-bold">2</span>
          <h2 className="mt-6 text-2xl font-semibold">Link WhatsApp</h2>
          <p className="self-end leading-[1.65] text-muted-foreground">Send the exact link instruction before the code expires.</p>
        </div>
        <div className="min-h-62.5 rounded-3xl bg-gradient-to-br from-emerald-500/15 to-teal-500/5 p-8">
          <span className="grid size-9 place-items-center rounded-full bg-emerald-500 text-sm font-bold">3</span>
          <h2 className="mt-6 text-2xl font-semibold">Forward the message</h2>
          <p className="self-end leading-[1.65] text-muted-foreground">Forward supported content after the signed webhook links you.</p>
        </div>
      </section>
      <section className="mt-20 grid grid-cols-[1fr_0.7fr] gap-16 rounded-[2rem] bg-surface p-[clamp(2rem,6vw,6rem)] max-[700px]:grid-cols-1">
        <div>
          <span className="inline-flex rounded-full bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">Your privacy</span>
          <h2 className="mt-5 text-[clamp(2rem,4vw,4rem)] font-semibold tracking-[-0.04em]">Your number is not displayed in Verith.</h2>
        </div>
        <p className="self-end leading-[1.65] text-muted-foreground">
          The backend encrypts the linked number, stores a separate keyed hash
          for lookup, verifies Meta webhook signatures, records consent, and
          removes the encrypted number when you unlink.
        </p>
        <Link
          className="col-start-2 justify-self-start rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 px-5 py-3 text-sm font-semibold text-white max-[700px]:col-start-1"
          href="/app/settings/whatsapp"
        >
          Open WhatsApp settings
        </Link>
      </section>
    </main>
  );
}
