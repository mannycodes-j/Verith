import { ArrowRight } from "lucide-react";
import Link from "next/link";
import UnequalMenuBars from "@/components/UnequalMenuBars";

const publicLinks = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy" },
  { href: "/whatsapp", label: "WhatsApp" },
] as const;

export default function PublicNavbar({
  mainId = "main-content",
}: {
  mainId?: string;
}) {
  return (
    <>
      <a
        className="fixed top-4 left-4 z-1000 -translate-y-[160%] rounded-full bg-white px-4 py-3 text-sm font-medium text-black transition-transform focus:translate-y-0"
        href={`#${mainId}`}
      >
        Skip to content
      </a>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-black/70 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
          <Link
            aria-label="Verith home"
            className="flex shrink-0 items-center gap-2.5"
            href="/"
          >
            <span className="grid size-8 place-items-center rounded-lg bg-[#24183f] text-sm font-semibold text-violet-300">
              V
            </span>
            <span className="text-[15px] font-medium tracking-tight">
              Verith
            </span>
          </Link>

          <nav
            aria-label="Primary navigation"
            className="hidden items-center text-sm text-muted-foreground md:flex md:gap-8 lg:gap-24"
          >
            {publicLinks.map((link) => (
              <Link
                className="transition-colors hover:text-white"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              className="hidden rounded-full px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-white sm:block"
              href="/login"
            >
              Log in
            </Link>
            <Link
              className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-center text-sm font-medium text-black transition-all hover:bg-foreground/90 active:scale-[0.98]"
              href="/login"
            >
              Try now
              <ArrowRight aria-hidden="true" size={15} />
            </Link>
            <details className="relative md:hidden">
              <summary className="grid size-11 cursor-pointer list-none place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition-colors hover:border-white/15 hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 [&::-webkit-details-marker]:hidden">
                <span className="sr-only">Navigation menu</span>
                <UnequalMenuBars />
              </summary>
              <nav
                aria-label="Mobile navigation"
                className="absolute top-[calc(100%+0.75rem)] right-0 grid min-w-52 gap-1 rounded-2xl border border-white/10 bg-[#0F1012] p-2 shadow-2xl [&_a]:rounded-xl [&_a]:px-4 [&_a]:py-3 [&_a]:text-sm [&_a]:text-white/65 [&_a:hover]:bg-white/[0.05] [&_a:hover]:text-white"
              >
                {publicLinks.map((link) => (
                  <Link href={link.href} key={link.href}>
                    {link.label}
                  </Link>
                ))}
              </nav>
            </details>
          </div>
        </div>
      </header>
    </>
  );
}
