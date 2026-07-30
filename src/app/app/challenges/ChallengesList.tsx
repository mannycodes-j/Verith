"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { challengesService } from "@/services/challenges";
import { challengeStyles as styles } from "./challenges.styles";

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.valueOf())
    ? "Unavailable"
    : new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(date);
}

export default function ChallengesList() {
  const challenges = useQuery({
    queryFn: challengesService.list,
    queryKey: ["challenges"],
  });

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <span>Daily evidence practice</span>
        <h1>Train your instincts against real-world misinformation patterns.</h1>
        <p>
          Time-bound evidence scenarios transform media literacy from passive
          reading into repeatable decision-making practice. Every score and
          reward reflects persisted performance.
        </p>
      </header>
      {challenges.isPending && (
        <div className={styles.loading} aria-busy="true">
          <span>Loading available challenges</span>
          <div />
          <div />
        </div>
      )}
      {challenges.isError && (
        <section className={styles.error} role="alert">
          <span>Challenges unavailable</span>
          <h2>Published challenges could not be loaded.</h2>
          <p>{challenges.error.message}</p>
          <button type="button" onClick={() => void challenges.refetch()}>
            Retry
          </button>
        </section>
      )}
      {challenges.data?.length === 0 && (
        <section className={styles.empty}>
          <span>No active challenge</span>
          <h2>There are no published challenges in the current window.</h2>
          <p>Expired or scheduled challenges are not presented as available.</p>
        </section>
      )}
      {challenges.data && challenges.data.length > 0 && (
        <ol className={styles.list}>
          {challenges.data.map((challenge, index) => (
            <li key={challenge.id ?? challenge._id ?? challenge.slug}>
              <Link href={`/app/challenges/${challenge.slug}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <small>
                    {challenge.difficulty} · {challenge.questions.length}{" "}
                    questions
                  </small>
                  <h2>{challenge.title}</h2>
                  <p>{challenge.scenario}</p>
                </div>
                <dl>
                  <div>
                    <dt>Passing score</dt>
                    <dd>{challenge.passingScore}%</dd>
                  </div>
                  <div>
                    <dt>Attempts</dt>
                    <dd>{challenge.maxAttempts}</dd>
                  </div>
                  <div>
                    <dt>Available until</dt>
                    <dd>{formatDate(challenge.expiresAt)}</dd>
                  </div>
                </dl>
                <strong aria-hidden="true">↗</strong>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
