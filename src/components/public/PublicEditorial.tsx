import Link from "next/link";
import type { ReactNode } from "react";

export interface EditorialSection {
  label: string;
  title: string;
  content: ReactNode;
}

export default function PublicEditorial({
  eyebrow,
  title,
  introduction,
  sections,
}: {
  eyebrow: string;
  title: string;
  introduction: string;
  sections: EditorialSection[];
}) {
  const simplifyLabel = (value: string) =>
    value
      .replace(/^\d+\s*\/\s*/, "")
      .replaceAll("/", "")
      .trim();

  return (
    <main className="mx-auto max-w-[1400px] px-4 py-4 md:px-6">
      <header className="sticky top-4 z-40 grid min-h-16 grid-cols-[1fr_auto_1fr] items-center gap-8 rounded-2xl border border-white/[0.07] bg-surface/85 px-5 shadow-[0_18px_60px_rgba(0,0,0,0.24)] backdrop-blur-xl max-[800px]:grid-cols-[1fr_auto]">
        <Link
          className="flex items-center gap-2.5 text-[17px] font-semibold tracking-normal"
          href="/"
        >
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-400 to-indigo-600 text-sm font-bold text-white shadow-[0_12px_28px_-14px_rgba(139,92,246,0.95)]">
            V
          </span>
          <span>Verith</span>
        </Link>
        <nav
          aria-label="Public navigation"
          className="flex gap-7 text-sm text-muted-foreground max-[800px]:hidden [&_a]:transition-colors [&_a:hover]:text-foreground"
        >
          <Link href="/how-it-works">How it works</Link>
          <Link href="/learning">Learning</Link>
          <Link href="/whatsapp">WhatsApp</Link>
        </nav>
        <Link
          className="justify-self-end rounded-full bg-white/[0.055] px-4 py-2 text-sm font-medium transition-colors hover:bg-white/[0.09]"
          href="/login"
        >
          Log in
        </Link>
      </header>
      <section className="relative grid grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.5fr)] gap-[clamp(3rem,8vw,8rem)] overflow-hidden px-2 py-[clamp(6rem,10vw,10rem)] before:pointer-events-none before:absolute before:-top-24 before:left-1/4 before:size-[28rem] before:rounded-full before:bg-violet-500/[0.12] before:blur-[120px] max-[800px]:grid-cols-1">
        <div>
          <span className="relative inline-flex rounded-full bg-violet-400/10 px-3 py-1.5 text-xs font-semibold text-violet-300">
            {simplifyLabel(eyebrow)}
          </span>
          <h1 className="relative mt-7 max-w-[12ch] text-[clamp(3.8rem,7vw,7rem)] leading-[0.96] font-semibold tracking-normal">
            {title}
          </h1>
        </div>
        <p className="relative m-0 self-end text-base leading-7 text-muted-foreground">
          {introduction}
        </p>
      </section>
      <div className="grid gap-5">
        {sections.map((section) => (
          <section
            className="group grid grid-cols-[minmax(16rem,0.65fr)_minmax(18rem,1fr)] gap-[clamp(2rem,7vw,7rem)] rounded-3xl bg-surface/70 p-[clamp(2rem,5vw,4.5rem)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-surface max-[800px]:grid-cols-1"
            key={section.label}
          >
            <div>
              <span className="inline-flex rounded-full bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold text-cyan-300">
                {simplifyLabel(section.label)}
              </span>
              <h2 className="mt-5 text-[clamp(2rem,3.5vw,3.8rem)] leading-[1] font-semibold tracking-normal">
                {section.title}
              </h2>
            </div>
            <div className="leading-7 text-muted-foreground [&_a]:text-foreground [&_a]:underline [&_a]:decoration-white/20 [&_a]:underline-offset-4 [&_li]:py-1 [&_p:first-child]:mt-0">
              {section.content}
            </div>
          </section>
        ))}
      </div>
      <footer className="flex justify-between px-2 py-10 text-xs text-muted">
        <span>Verith helps you follow the evidence</span>
        <nav className="flex gap-4">
          <Link href="/about">About</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </nav>
      </footer>
    </main>
  );
}
