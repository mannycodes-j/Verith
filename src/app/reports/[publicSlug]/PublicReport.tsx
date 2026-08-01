"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { ReportReader } from "@/app/app/verifications/[id]/ReportDocument";
import { reportService } from "@/services/reports";

export default function PublicReport({ slug }: { slug: string }) {
  const report = useQuery({
    queryFn: () => reportService.public(slug),
    queryKey: ["public-report", slug],
    retry: 1,
  });

  return (
    <main
      className="min-h-screen bg-[#08090A] pb-16"
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
        <div className="mx-auto grid min-h-16 max-w-[1400px] grid-cols-[1fr_auto_1fr] items-center gap-8 px-6 max-[650px]:grid-cols-[1fr_auto]">
          <Link href="/" className="flex items-center gap-2.5 text-[15px] font-medium tracking-tight">
            <span className="inline-flex size-8 items-center justify-center rounded-lg bg-[#24183f] text-sm font-semibold text-violet-300">
              V
            </span>
            <span>Verith</span>
          </Link>
          <span className="text-xs text-white/40 max-[650px]:hidden">Shared evidence report</span>
          <Link className="justify-self-end rounded-full bg-gradient-to-r from-[#C084FC] to-[#6366F1] px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]" href="/register">Try Verith</Link>
        </div>
      </header>

      <div className="mx-auto max-w-[1300px] px-6">
        {report.isPending && (
          <section className="flex min-h-[calc(100svh-80px)] flex-col items-start justify-center [&>span]:inline-flex [&>span]:items-center [&>span]:gap-2 [&>span]:text-[10px] [&>span]:font-semibold [&>span]:uppercase [&>span]:tracking-[0.18em] [&>span]:text-violet-400 [&>span]:before:inline-flex [&>span]:before:size-1.5 [&>span]:before:rounded-full [&>span]:before:bg-violet-400 [&_h1]:mt-5 [&_h1]:max-w-[14ch] [&_h1]:text-4xl [&_h1]:leading-[1.05] [&_h1]:font-semibold [&_h1]:tracking-tighter md:[&_h1]:text-6xl [&_div]:mt-3 [&_div]:h-3 [&_div]:w-full [&_div]:max-w-152 [&_div]:animate-pulse [&_div]:rounded-full [&_div]:bg-white/[0.05]" aria-busy="true">
            <span>Public report</span><h1>Retrieving the evidence record…</h1><div /><div />
          </section>
        )}

        {report.isError && (
          <section className="my-16 rounded-3xl border border-danger/20 bg-card/70 p-[clamp(2rem,6vw,5rem)] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] [&>span]:text-[10px] [&>span]:font-semibold [&>span]:uppercase [&>span]:tracking-[0.18em] [&>span]:text-red-300 [&_h1]:mt-5 [&_h1]:max-w-[14ch] [&_h1]:text-4xl [&_h1]:leading-[1.05] [&_h1]:font-semibold [&_h1]:tracking-tighter md:[&_h1]:text-6xl [&_p]:max-w-2xl [&_p]:text-sm [&_p]:leading-7 [&_p]:text-muted-foreground [&_button]:mt-4 [&_button]:rounded-full [&_button]:border [&_button]:border-white/10 [&_button]:bg-white/[0.04] [&_button]:px-5 [&_button]:py-3 [&_button]:text-sm [&_button]:font-medium [&>a]:ml-2 [&>a]:inline-flex [&>a]:rounded-full [&>a]:bg-gradient-to-r [&>a]:from-[#C084FC] [&>a]:to-[#6366F1] [&>a]:px-5 [&>a]:py-3 [&>a]:text-sm [&>a]:font-medium" role="alert">
            <span>Report unavailable</span>
            <h1>This shared report cannot be opened.</h1>
            <p>
              The link may be invalid, revoked, or no longer publicly accessible.
            </p>
            <button type="button" onClick={() => void report.refetch()}>
              Retry
            </button>
            <Link href="/">Return to Verith</Link>
          </section>
        )}

        {report.data && (
          <>
            <section className="my-6 grid grid-cols-[1fr_2fr] items-center gap-8 rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.04] p-5 max-[650px]:grid-cols-1">
              <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-300 before:inline-flex before:size-1.5 before:rounded-full before:bg-cyan-300">Shared report</span>
              <p className="m-0 text-xs leading-6 text-muted-foreground">
                This is a sanitized shared evidence report. Conclusions are
                evidence-derived assessments, not declarations of absolute truth.
              </p>
            </section>
            <ReportReader report={report.data} showActions={false} />
          </>
        )}
      </div>
    </main>
  );
}
