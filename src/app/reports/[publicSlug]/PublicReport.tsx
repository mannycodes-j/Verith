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
    <main className="mx-auto max-w-[1400px] px-5 pb-16">
      <header className="mt-4 grid min-h-16 grid-cols-[1fr_auto_1fr] items-center gap-4 rounded-2xl bg-surface/85 px-5 backdrop-blur-xl max-[650px]:grid-cols-[1fr_auto]">
        <Link href="/" className="text-lg font-semibold">
          Verith
        </Link>
        <span className="font-sans text-[0.58rem] tracking-normal text-muted normal-case max-[650px]:hidden">Shared evidence report</span>
        <Link className="justify-self-end rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 px-4 py-2 text-xs font-semibold text-white" href="/verify">Try now</Link>
      </header>

      {report.isPending && (
        <section className="flex min-h-[calc(100svh-72px)] flex-col items-start justify-center [&>span]:font-sans [&>span]:text-[0.58rem] [&>span]:tracking-normal [&>span]:text-muted [&>span]:normal-case [&_h1]:max-w-[12ch] [&_h1]:font-editorial [&_h1]:text-[clamp(3rem,7vw,7rem)] [&_h1]:leading-[0.9] [&_h1]:font-normal [&_h1]:tracking-normal [&_div]:mt-3 [&_div]:h-2.5 [&_div]:w-full [&_div]:max-w-152 [&_div]:animate-pulse [&_div]:bg-surface-muted" aria-busy="true">
          <span>Public report</span><h1>Retrieving the evidence record…</h1><div /><div />
        </section>
      )}

      {report.isError && (
        <section className="flex min-h-[calc(100svh-72px)] flex-col items-start justify-center [&>span]:font-sans [&>span]:text-[0.58rem] [&>span]:tracking-normal [&>span]:text-muted [&>span]:normal-case [&_h1]:max-w-[12ch] [&_h1]:font-editorial [&_h1]:text-[clamp(3rem,7vw,7rem)] [&_h1]:leading-[0.9] [&_h1]:font-normal [&_h1]:tracking-normal [&_p]:text-muted-foreground [&_button]:mt-2 [&_button]:border [&_button]:border-border [&_button]:bg-transparent [&_button]:p-3 [&_button]:font-sans [&_button]:text-[0.58rem] [&_button]:normal-case [&>a]:mt-2 [&>a]:border [&>a]:border-border [&>a]:p-3 [&>a]:font-sans [&>a]:text-[0.58rem] [&>a]:normal-case" role="alert">
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
          <section className="my-5 grid grid-cols-[1fr_2fr] items-center gap-8 rounded-2xl bg-cyan-400/[0.06] p-5 max-[650px]:grid-cols-1">
            <span className="text-xs font-semibold text-cyan-300">Shared report</span>
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
