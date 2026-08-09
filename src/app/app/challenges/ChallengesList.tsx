"use client";

import { useQuery } from "@tanstack/react-query";
import { CalendarDays, CheckCircle2, Clock3, Sparkles } from "lucide-react";
import Link from "next/link";
import { challengesService } from "@/services/challenges";
import { challengeStyles as styles } from "./challenges.styles";

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.valueOf())
    ? "Unavailable"
    : new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(date);
}

export default function ChallengesList() {
  const challenge = useQuery({
    queryFn: challengesService.today,
    queryKey: ["daily-challenge", "today"],
  });
  const id = challenge.data?.id ?? challenge.data?._id;
  const attempts = useQuery({
    enabled: Boolean(id),
    queryFn: () => challengesService.attempts(id!),
    queryKey: ["challenge-attempts", id],
  });
  const completed = attempts.data?.some((attempt) => attempt.passed) ?? false;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <span>Today’s media-literacy workout</span>
        <h1>Ten fresh decisions. One focused skill for today.</h1>
        <p>
          Each day brings a different topic and a new set of questions. Past
          practice is retired, so the experience stays focused on what you can
          learn and apply today.
        </p>
      </header>

      {challenge.isPending && (
        <div className={styles.loading} aria-busy="true">
          <span>Preparing today’s practice</span>
          <div />
          <div />
        </div>
      )}
      {challenge.isError && (
        <section className={styles.error} role="alert">
          <span>Daily practice unavailable</span>
          <h2>Today’s ten questions could not be loaded.</h2>
          <p>{challenge.error.message}</p>
          <button onClick={() => void challenge.refetch()} type="button">
            Retry
          </button>
        </section>
      )}
      {challenge.data && (
        <section className="relative overflow-hidden rounded-[2rem] border border-violet-300/15 bg-[radial-gradient(circle_at_12%_5%,rgba(139,92,246,.24),transparent_28rem),rgba(14,14,18,.92)] p-[clamp(1.4rem,5vw,3.25rem)]">
          <div className="pointer-events-none absolute -top-20 right-0 size-72 rounded-full bg-cyan-300/[.06] blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-violet-300/15 bg-violet-400/[.08] px-3 py-1.5 text-[10px] font-semibold tracking-[.13em] text-violet-200 uppercase">
                  <Sparkles size={12} /> Today only
                </span>
                {completed && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1.5 text-xs text-emerald-200">
                    <CheckCircle2 size={14} /> Completed
                  </span>
                )}
              </div>
              <h2 className="mt-6 mb-3 max-w-3xl text-[clamp(2rem,5vw,4.5rem)] leading-[.95] font-semibold tracking-[-.055em]">
                {challenge.data.title}
              </h2>
              <p className="m-0 max-w-2xl text-sm leading-7 text-white/55">
                {challenge.data.scenario}
              </p>
              <dl className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/[.06] bg-white/[.025] p-4">
                  <dt className="flex items-center gap-2 text-[10px] text-white/35 uppercase"><CalendarDays size={13} /> Questions</dt>
                  <dd className="mt-2 ml-0 font-semibold">{challenge.data.questions.length} unique today</dd>
                </div>
                <div className="rounded-2xl border border-white/[.06] bg-white/[.025] p-4">
                  <dt className="text-[10px] text-white/35 uppercase">Passing score</dt>
                  <dd className="mt-2 ml-0 font-semibold">{challenge.data.passingScore}%</dd>
                </div>
                <div className="rounded-2xl border border-white/[.06] bg-white/[.025] p-4">
                  <dt className="flex items-center gap-2 text-[10px] text-white/35 uppercase"><Clock3 size={13} /> Retires</dt>
                  <dd className="mt-2 ml-0 text-sm font-semibold">{formatDate(challenge.data.expiresAt)}</dd>
                </div>
              </dl>
            </div>
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-r from-violet-400 to-indigo-500 px-7 text-sm font-semibold text-white shadow-[0_18px_50px_-18px_rgba(139,92,246,.8)] transition hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet-400/20"
              href={`/app/challenges/${challenge.data.slug}`}
            >
              {completed ? "Review today’s practice" : "Start today’s practice"}
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
