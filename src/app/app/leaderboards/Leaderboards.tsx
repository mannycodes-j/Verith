"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  gamificationService,
  type LeaderboardPeriod,
} from "@/services/gamification";
import { leaderboardStyles as styles } from "./leaderboards.styles";

const periods: LeaderboardPeriod[] = ["WEEKLY", "MONTHLY", "ALL_TIME"];

export default function Leaderboards() {
  const [period, setPeriod] = useState<LeaderboardPeriod>("ALL_TIME");
  const leaderboard = useQuery({
    queryFn: () => gamificationService.leaderboard(period),
    queryKey: ["leaderboard", period],
  });

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <span>Public ranking</span>
        <h1>Leaderboards.</h1>
        <p>
          Rankings include only active users who permit leaderboard
          participation. Scores come from persisted reward transactions for the
          selected period.
        </p>
      </header>
      <div className={styles.filters}>
        <span>Period</span>
        {periods.map((value) => (
          <button
            data-active={period === value}
            key={value}
            onClick={() => setPeriod(value)}
            type="button"
          >
            {value.replaceAll("_", " ")}
          </button>
        ))}
      </div>
      {leaderboard.isPending && (
        <div className={styles.loading} aria-busy="true">
          <span>Loading rankings</span>
          {[0, 1, 2].map((item) => (
            <div key={item} />
          ))}
        </div>
      )}
      {leaderboard.isError && (
        <section className={styles.error} role="alert">
          <span>Rankings unavailable</span>
          <h2>The leaderboard could not be loaded.</h2>
          <p>{leaderboard.error.message}</p>
          <button type="button" onClick={() => void leaderboard.refetch()}>
            Retry
          </button>
        </section>
      )}
      {leaderboard.data?.length === 0 && (
        <section className={styles.empty}>
          <span>No eligible rankings</span>
          <h2>No public scores exist for this period.</h2>
          <p>
            Verith does not fabricate leaderboard positions when no eligible
            reward activity is present.
          </p>
        </section>
      )}
      {leaderboard.data && leaderboard.data.length > 0 && (
        <ol className={styles.ranking}>
          <li className={styles.rankingHeader}>
            <span>Rank</span>
            <span>Participant</span>
            <span>Experience</span>
            <span>Truth points</span>
          </li>
          {leaderboard.data.map((entry) => (
            <li key={String(entry.userId)}>
              <strong>{String(entry.rank).padStart(2, "0")}</strong>
              <span>{entry.displayName}</span>
              <span>{entry.xp} XP</span>
              <span>{entry.truthPoints}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
