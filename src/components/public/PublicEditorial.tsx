import Link from "next/link";
import type { ReactNode } from "react";
import PublicNavbar from "@/components/public/PublicNavbar";

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
      <PublicNavbar />
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
