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
    <main
      className="min-h-screen bg-[#08090A]"
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
        <div className="mx-auto flex min-h-16 max-w-[1400px] items-center justify-between gap-8 px-6">
          <Link
            className="flex items-center gap-2.5 text-[15px] font-medium tracking-tight"
            href="/"
          >
            <span className="inline-flex size-8 items-center justify-center rounded-lg bg-[#24183f] text-sm font-semibold text-violet-300">
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
          <div className="flex items-center gap-2">
            <details className="relative min-[801px]:hidden">
              <summary className="flex min-h-11 cursor-pointer list-none items-center rounded-full border border-white/10 bg-white/[0.04] px-4 text-xs font-medium text-white/70">
                Menu
              </summary>
              <nav
                aria-label="Mobile public navigation"
                className="absolute top-[calc(100%+0.75rem)] right-0 grid min-w-52 gap-1 rounded-2xl border border-white/10 bg-[#0F1012] p-2 shadow-2xl [&_a]:rounded-xl [&_a]:px-4 [&_a]:py-3 [&_a]:text-sm [&_a]:text-white/65 [&_a:hover]:bg-white/[0.05] [&_a:hover]:text-white"
              >
                <Link href="/how-it-works">How it works</Link>
                <Link href="/learning">Learning</Link>
                <Link href="/whatsapp">WhatsApp</Link>
              </nav>
            </details>
            <Link
              className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-foreground/90"
              href="/login"
            >
              Log in
            </Link>
          </div>
        </div>
      </header>
      <section className="relative mx-auto grid max-w-[1300px] grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.5fr)] gap-[clamp(3rem,8vw,8rem)] overflow-hidden px-6 py-[clamp(6rem,10vw,9rem)] before:pointer-events-none before:absolute before:-top-24 before:left-1/4 before:size-[28rem] before:rounded-full before:bg-violet-500/[0.14] before:blur-[120px] max-[800px]:grid-cols-1">
        <div>
          <span className="relative inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-400 before:inline-flex before:size-1.5 before:rounded-full before:bg-violet-400">
            {simplifyLabel(eyebrow)}
          </span>
          <h1 className="relative mt-7 max-w-[14ch] text-5xl leading-[1.05] font-semibold tracking-tighter md:text-7xl">
            {title}
          </h1>
        </div>
        <p className="relative m-0 self-end text-base leading-7 text-muted-foreground">
          {introduction}
        </p>
      </section>
      <div className="mx-auto grid max-w-[1300px] gap-6 px-6">
        {sections.map((section) => (
          <section
            className="group grid grid-cols-[minmax(16rem,0.65fr)_minmax(18rem,1fr)] gap-[clamp(2rem,7vw,7rem)] rounded-3xl border border-white/[0.06] bg-card/60 p-[clamp(2rem,5vw,4.5rem)] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:border-white/15 max-[800px]:grid-cols-1"
            key={section.label}
          >
            <div>
              <span className="inline-flex text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan-400">
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
      <footer className="mx-auto flex max-w-[1300px] flex-wrap justify-between gap-6 px-6 py-10 text-xs text-muted max-[520px]:flex-col">
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
