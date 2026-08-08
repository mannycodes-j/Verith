"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  gamificationService,
  type LeaderboardPeriod,
} from "@/services/gamification";
import { leaderboardStyles as styles } from "./leaderboards.styles";
import Link from "next/link";
import { missionService } from "@/services/missions";

const periods: LeaderboardPeriod[] = ["WEEKLY", "MONTHLY", "ALL_TIME"];

export default function Leaderboards() {
  const [period, setPeriod] = useState<LeaderboardPeriod>("ALL_TIME");
  const leaderboard = useQuery({
    queryFn: () => gamificationService.leaderboard(period),
    queryKey: ["leaderboard", period],
  });
  const missions = useQuery({ queryKey: ["community-missions"], queryFn: missionService.list });

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <span>Public ranking</span>
        <h1>Celebrate the people building stronger information communities.</h1>
        <p>
          A privacy-respecting view of sustained media-literacy practice,
          featuring only participants who choose to be visible and scores
          backed by persisted learning activity.
        </p>
      </header>
      <section className={styles.missions}>
        <div><span>Community verification missions</span><h2>Build a skill, then use it where information actually travels.</h2><p>Missions combine a baseline, realistic synthetic scenarios, approved learning, practice, and a follow-up. Your individual answers remain private.</p></div>
        {missions.isPending ? <p>Loading active missions…</p> : missions.isError ? <button type="button" onClick={() => void missions.refetch()}>Retry missions</button> : missions.data.length ? <div>{missions.data.map((mission) => <article key={mission.id}><span>{mission.difficulty} · {mission.topic}</span><h3>{mission.title}</h3><p>{mission.summary}</p><small>{mission.participation ? mission.participation.status.replaceAll("_", " ") : "Open for participation"}</small><Link href={`/app/missions/${mission.slug}`}>{mission.participation ? "Continue mission" : "Explore mission"}</Link></article>)}</div> : <p>No published community mission is active right now.</p>}
      </section>
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
