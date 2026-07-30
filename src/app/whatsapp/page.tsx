import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  description:
    "Connect WhatsApp securely to submit forwarded content to Verith.",
  title: "WhatsApp verification | Verith",
};

export default function WhatsAppPage() {
  return (
    <main className="mx-auto max-w-[1500px] px-(--page-gutter) pb-20">
      <header className="grid min-h-18 grid-cols-[1fr_auto_1fr] items-center border-b border-border">
        <Link
          href="/"
          className="font-editorial text-2xl"
        >
          Verith
        </Link>
        <span className="font-mono text-[0.58rem] tracking-[0.07em] text-muted uppercase">
          WhatsApp verification
        </span>
        <Link
          className="justify-self-end font-mono text-[0.58rem] tracking-[0.07em] text-muted uppercase"
          href="/login"
        >
          Log in
        </Link>
      </header>
      <section className="grid grid-cols-[1.2fr_0.5fr] gap-16 py-[clamp(4rem,9vw,9rem)] max-[700px]:grid-cols-1">
        <div>
          <span className="font-mono text-[0.58rem] tracking-[0.07em] text-muted uppercase">
            06 / WhatsApp
          </span>
          <h1 className="mt-6 font-editorial text-[clamp(4rem,9vw,9rem)] leading-[0.85] font-normal tracking-[-0.07em]">
            Investigate forwarded content.
          </h1>
        </div>
        <p className="self-end leading-[1.65] text-muted-foreground">
          Link your account with a short-lived code, then send supported
          forwarded material to the configured Verith WhatsApp service.
        </p>
      </section>
      <section className="grid grid-cols-3 border border-border-strong max-[700px]:grid-cols-1">
        <div className="min-h-62.5 p-8">
          <span className="font-mono text-[0.58rem] tracking-[0.07em] text-muted uppercase">01</span>
          <h2 className="font-editorial text-[clamp(2rem,4vw,4rem)] font-normal tracking-[-0.05em]">Generate</h2>
          <p className="self-end leading-[1.65] text-muted-foreground">Create a one-time code from your authenticated settings.</p>
        </div>
        <div className="min-h-62.5 border-l border-border-strong p-8 max-[700px]:border-t max-[700px]:border-l-0">
          <span className="font-mono text-[0.58rem] tracking-[0.07em] text-muted uppercase">02</span>
          <h2 className="font-editorial text-[clamp(2rem,4vw,4rem)] font-normal tracking-[-0.05em]">Link</h2>
          <p className="self-end leading-[1.65] text-muted-foreground">Send the exact link instruction before the code expires.</p>
        </div>
        <div className="min-h-62.5 border-l border-border-strong p-8 max-[700px]:border-t max-[700px]:border-l-0">
          <span className="font-mono text-[0.58rem] tracking-[0.07em] text-muted uppercase">03</span>
          <h2 className="font-editorial text-[clamp(2rem,4vw,4rem)] font-normal tracking-[-0.05em]">Submit</h2>
          <p className="self-end leading-[1.65] text-muted-foreground">Forward supported content after the signed webhook links you.</p>
        </div>
      </section>
      <section className="mt-20 grid grid-cols-[1fr_0.7fr] gap-16 bg-foreground p-[clamp(2rem,6vw,6rem)] text-background max-[700px]:grid-cols-1">
        <div>
          <span className="font-mono text-[0.58rem] tracking-[0.07em] text-[color-mix(in_srgb,var(--background)_72%,transparent)] uppercase">Privacy model</span>
          <h2 className="font-editorial text-[clamp(2rem,4vw,4rem)] font-normal tracking-[-0.05em]">Your number is not displayed in Verith.</h2>
        </div>
        <p className="self-end leading-[1.65] text-[color-mix(in_srgb,var(--background)_72%,transparent)]">
          The backend encrypts the linked number, stores a separate keyed hash
          for lookup, verifies Meta webhook signatures, records consent, and
          removes the encrypted number when you unlink.
        </p>
        <Link
          className="col-start-2 justify-self-start border border-[color-mix(in_srgb,var(--background)_35%,transparent)] p-3 font-mono text-[0.58rem] uppercase max-[700px]:col-start-1"
          href="/app/settings/whatsapp"
        >
          Open WhatsApp settings
        </Link>
      </section>
    </main>
  );
}
