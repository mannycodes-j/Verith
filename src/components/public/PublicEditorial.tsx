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
  return (
    <main className="mx-auto max-w-[1400px] px-6">
      <header className="sticky top-0 z-40 grid min-h-16 grid-cols-[1fr_auto_1fr] items-center gap-8 border-b border-white/[0.07] bg-black/75 backdrop-blur-xl max-[800px]:grid-cols-[1fr_auto]">
        <Link
          className="flex items-center gap-2.5 text-[17px] font-semibold tracking-[-0.03em]"
          href="/"
        >
          <span className="inline-flex size-8 items-center justify-center rounded-lg bg-accent text-sm font-bold text-accent-foreground shadow-[0_0_20px_-8px_rgba(245,158,11,0.8)]">
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
          className="justify-self-end rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-sm transition-colors hover:border-white/20 hover:bg-white/[0.07]"
          href="/login"
        >
          Log in
        </Link>
      </header>
      <section className="relative grid grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.5fr)] gap-[clamp(3rem,8vw,8rem)] overflow-hidden py-[clamp(6rem,10vw,10rem)] before:pointer-events-none before:absolute before:-top-24 before:left-1/4 before:size-[28rem] before:rounded-full before:bg-amber-500/[0.07] before:blur-[120px] max-[800px]:grid-cols-1">
        <div>
          <span className="relative font-mono text-[0.65rem] tracking-[0.2em] text-accent uppercase">
            {eyebrow}
          </span>
          <h1 className="relative mt-7 max-w-[12ch] text-[clamp(3.8rem,7vw,7rem)] leading-[0.96] font-semibold tracking-[-0.06em]">
            {title}
          </h1>
        </div>
        <p className="relative m-0 self-end text-base leading-7 text-muted-foreground">
          {introduction}
        </p>
      </section>
      <div className="border-t border-white/10">
        {sections.map((section) => (
          <section
            className="group grid grid-cols-[0.22fr_minmax(16rem,0.65fr)_minmax(18rem,1fr)] gap-[clamp(2rem,7vw,7rem)] border-b border-white/[0.08] py-[clamp(3rem,6vw,6rem)] transition-colors duration-300 hover:bg-white/[0.018] max-[800px]:grid-cols-1"
            key={section.label}
          >
            <span className="font-mono text-[0.62rem] tracking-[0.16em] text-accent uppercase">
              {section.label}
            </span>
            <h2 className="m-0 text-[clamp(2rem,3.5vw,3.8rem)] leading-[1] font-medium tracking-[-0.05em]">
              {section.title}
            </h2>
            <div className="leading-7 text-muted-foreground [&_a]:text-foreground [&_a]:underline [&_a]:decoration-white/20 [&_a]:underline-offset-4 [&_li]:py-1 [&_p:first-child]:mt-0">
              {section.content}
            </div>
          </section>
        ))}
      </div>
      <footer className="flex justify-between py-10 font-mono text-[0.58rem] tracking-[0.12em] text-muted uppercase">
        <span>Verith / Evidence-led verification</span>
        <nav className="flex gap-4">
          <Link href="/about">About</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </nav>
      </footer>
    </main>
  );
}
