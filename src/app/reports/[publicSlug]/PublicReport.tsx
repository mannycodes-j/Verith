"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { ReportReader } from "@/app/app/verifications/[id]/ReportDocument";
import PublicNavbar from "@/components/public/PublicNavbar";
import PremiumBackground from "@/components/public/PremiumBackground";
import ScrollProgress from "@/components/public/ScrollProgress";
import { reportService } from "@/services/reports";

export default function PublicReport({ slug }: { slug: string }) {
  const report = useQuery({
    queryFn: () => reportService.public(slug),
    queryKey: ["public-report", slug],
    retry: 1,
  });

  return (
    <main
      className="min-h-screen bg-[#08090A] pb-16 relative selection:bg-white/10 selection:text-white"
      id="main-content"
      tabIndex={-1}
    >
      <ScrollProgress />
      <PremiumBackground />
      <PublicNavbar />

      <div className="relative z-10 mx-auto max-w-[1300px] px-6 pt-20">
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
