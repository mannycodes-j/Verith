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
    <main className="mx-auto max-w-[1500px] px-(--page-gutter)">
      <header className="grid min-h-18 grid-cols-[1fr_auto_1fr] items-center gap-8 border-b border-border max-[800px]:grid-cols-[1fr_auto]">
        <Link
          className="font-editorial text-2xl tracking-[-0.04em]"
          href="/"
        >
          Verith
        </Link>
        <nav
          aria-label="Public navigation"
          className="flex gap-6 font-mono text-[0.58rem] tracking-[0.07em] text-muted uppercase max-[800px]:hidden"
        >
          <Link href="/how-it-works">How it works</Link>
          <Link href="/learning">Learning</Link>
          <Link href="/whatsapp">WhatsApp</Link>
        </nav>
        <Link
          className="justify-self-end font-mono text-[0.58rem] tracking-[0.07em] uppercase"
          href="/login"
        >
          Log in
        </Link>
      </header>
      <section className="grid grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.5fr)] gap-[clamp(3rem,8vw,8rem)] py-[clamp(4rem,9vw,9rem)] max-[800px]:grid-cols-1">
        <div>
          <span className="font-mono text-[0.58rem] tracking-[0.07em] text-muted uppercase">
            {eyebrow}
          </span>
          <h1 className="mt-6 font-editorial text-[clamp(4rem,9vw,9rem)] leading-[0.85] font-normal tracking-[-0.07em]">
            {title}
          </h1>
        </div>
        <p className="m-0 self-end leading-7 text-muted-foreground">
          {introduction}
        </p>
      </section>
      <div className="border-t border-border-strong">
        {sections.map((section) => (
          <section
            className="grid grid-cols-[0.3fr_minmax(16rem,0.65fr)_minmax(18rem,1fr)] gap-[clamp(2rem,7vw,7rem)] border-b border-border-strong py-[clamp(3rem,6vw,6rem)] max-[800px]:grid-cols-1"
            key={section.label}
          >
            <span className="font-mono text-[0.58rem] tracking-[0.07em] text-muted uppercase">
              {section.label}
            </span>
            <h2 className="m-0 font-editorial text-[clamp(2.3rem,4vw,4.5rem)] leading-[0.95] font-normal tracking-[-0.05em]">
              {section.title}
            </h2>
            <div className="leading-7 text-muted-foreground [&_li]:py-1 [&_p:first-child]:mt-0">
              {section.content}
            </div>
          </section>
        ))}
      </div>
      <footer className="flex justify-between py-8 font-mono text-[0.58rem] tracking-[0.07em] text-muted uppercase">
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
