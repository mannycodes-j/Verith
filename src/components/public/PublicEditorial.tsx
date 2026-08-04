import Link from "next/link";
import type { ReactNode } from "react";
import PublicNavbar from "@/components/public/PublicNavbar";
import PremiumBackground from "@/components/public/PremiumBackground";
import ScrollProgress from "@/components/public/ScrollProgress";
import MotionReveal from "@/components/public/MotionReveal";

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
      className="min-h-screen bg-[#0a0a0a] relative selection:bg-white/10 selection:text-white"
      id="main-content"
      tabIndex={-1}
    >
      <ScrollProgress />
      <PremiumBackground />
      <PublicNavbar />
      
      {/* Elegant Centered Hero */}
      <section className="relative z-10 mx-auto flex flex-col items-center text-center max-w-[800px] px-6 pt-[clamp(6rem,12vw,10rem)] pb-16">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-white/70 mb-8 backdrop-blur-md">
          <span className="size-1.5 rounded-full bg-white/70"></span>
          {simplifyLabel(eyebrow)}
        </span>
        <h1 className="text-balance text-4xl md:text-[3.5rem] leading-[1.1] font-bold tracking-tight mb-6 animate-text-shimmer bg-[linear-gradient(110deg,#a78bfa,45%,#fff,55%,#a78bfa)] bg-[length:200%_100%] bg-clip-text text-transparent">
          {title}
        </h1>
        <p className="max-w-2xl text-balance text-lg md:text-xl font-medium leading-relaxed text-white/60">
          {introduction}
        </p>
      </section>

      {/* Refined Content Sections */}
      <div className="relative z-10 mx-auto max-w-[1000px] px-6 pb-32">
        <div className="flex flex-col gap-0">
          {sections.map((section, index) => (
            <MotionReveal key={section.label}>
              <div 
                className="group grid grid-cols-1 md:grid-cols-[200px_1fr] gap-x-12 gap-y-6 border-t border-white/5 py-16"
              >
                {/* Left Column Label */}
                <div className="self-start pt-2">
                  <span className="text-xs font-bold uppercase tracking-[0.15em] text-white/60">
                    {String(index + 1).padStart(2, "0")} — {simplifyLabel(section.label)}
                  </span>
                </div>
                
                {/* Right Column Content */}
                <div className="max-w-2xl">
                  <h2 className="text-2xl md:text-3xl leading-[1.2] font-bold tracking-tight text-white mb-6">
                    {section.title}
                  </h2>
                  <div className="text-lg font-medium leading-relaxed text-white/70 [&_a]:text-white [&_a]:font-bold [&_a]:underline [&_a]:decoration-white/20 [&_a]:underline-offset-4 [&_li]:py-2 [&_p:first-child]:mt-0 [&_p]:mb-6">
                    {section.content}
                  </div>
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>

      <footer className="relative z-10 border-t border-white/5 bg-[#0e0e0e]/50 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1000px] flex-wrap justify-between gap-6 px-6 py-12 text-xs font-medium uppercase tracking-wider text-white/40 max-[520px]:flex-col">
          <span>Verith helps you follow the evidence</span>
          <nav className="flex gap-6">
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
