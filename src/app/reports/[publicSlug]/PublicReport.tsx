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
    <main className="mx-auto max-w-[1500px] px-(--page-gutter) pb-16">
      <header className="grid min-h-18 grid-cols-[1fr_auto_1fr] items-center gap-4 border-b border-border max-[650px]:grid-cols-[1fr_auto]">
        <Link href="/" className="font-editorial text-2xl tracking-[-0.04em]">
          Verith
        </Link>
        <span className="font-mono text-[0.58rem] tracking-[0.07em] text-muted uppercase max-[650px]:hidden">Shared evidence report</span>
        <Link className="justify-self-end font-mono text-[0.58rem] tracking-[0.07em] uppercase" href="/verify">Start an investigation</Link>
      </header>

      {report.isPending && (
        <section className="flex min-h-[calc(100svh-72px)] flex-col items-start justify-center [&>span]:font-mono [&>span]:text-[0.58rem] [&>span]:tracking-[0.07em] [&>span]:text-muted [&>span]:uppercase [&_h1]:max-w-[12ch] [&_h1]:font-editorial [&_h1]:text-[clamp(3rem,7vw,7rem)] [&_h1]:leading-[0.9] [&_h1]:font-normal [&_h1]:tracking-[-0.06em] [&_div]:mt-3 [&_div]:h-2.5 [&_div]:w-full [&_div]:max-w-152 [&_div]:animate-pulse [&_div]:bg-surface-muted" aria-busy="true">
          <span>Public report</span><h1>Retrieving the evidence record…</h1><div /><div />
        </section>
      )}

      {report.isError && (
        <section className="flex min-h-[calc(100svh-72px)] flex-col items-start justify-center [&>span]:font-mono [&>span]:text-[0.58rem] [&>span]:tracking-[0.07em] [&>span]:text-muted [&>span]:uppercase [&_h1]:max-w-[12ch] [&_h1]:font-editorial [&_h1]:text-[clamp(3rem,7vw,7rem)] [&_h1]:leading-[0.9] [&_h1]:font-normal [&_h1]:tracking-[-0.06em] [&_p]:text-muted-foreground [&_button]:mt-2 [&_button]:border [&_button]:border-border [&_button]:bg-transparent [&_button]:p-3 [&_button]:font-mono [&_button]:text-[0.58rem] [&_button]:uppercase [&>a]:mt-2 [&>a]:border [&>a]:border-border [&>a]:p-3 [&>a]:font-mono [&>a]:text-[0.58rem] [&>a]:uppercase" role="alert">
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
          <section className="grid grid-cols-[1fr_2fr] items-center gap-8 border-b border-border-strong py-4 max-[650px]:grid-cols-1">
            <span className="font-mono text-[0.58rem] tracking-[0.07em] text-muted uppercase">Public report</span>
            <p className="m-0 text-[0.72rem] leading-normal text-muted-foreground">
              This is a sanitized shared evidence report. Conclusions are
              evidence-derived assessments, not declarations of absolute truth.
            </p>
          </section>
          <ReportReader report={report.data} showActions={false} />
        </>
      )}
    </main>
  );
}
