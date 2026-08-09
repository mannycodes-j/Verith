"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { gamificationService } from "@/services/gamification";
import AchievementIcon from "./AchievementIcon";
import { clampAchievementPercentage } from "@/utils/achievement-display";

export default function CurrentRankCard({
  compact = false,
  className = "",
}: {
  compact?: boolean;
  className?: string;
}) {
  const profile = useQuery({
    queryFn: gamificationService.profile,
    queryKey: ["gamification-profile"],
  });
  if (profile.isPending)
    return (
      <div
        aria-busy="true"
        className="min-h-32 animate-pulse rounded-3xl border border-white/[.05] bg-white/[.025]"
      />
    );
  if (profile.isError || !profile.data) return null;
  const rank = profile.data.rank;
  const progress = clampAchievementPercentage(rank.progressPercentage);
  return (
    <section
      className={`relative overflow-hidden rounded-3xl border border-violet-300/10 bg-[radial-gradient(circle_at_0%_0%,rgba(139,92,246,.18),transparent_18rem),rgba(255,255,255,.02)] ${compact ? "p-5" : "p-6"} ${className}`}
      aria-label="Current achievement rank"
    >
      <div className="flex items-center gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-violet-400/10 text-violet-200">
          <AchievementIcon iconKey={rank.currentRankIconKey} size={21} />
        </span>
        <div className="min-w-0">
          <small className="text-[9px] font-semibold tracking-[.12em] text-violet-300 uppercase">
            Current rank
          </small>
          <h2 className="m-0 truncate text-xl font-semibold">
            {rank.currentRankLabel}
          </h2>
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-1.5 text-[10px] text-white/40 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <span>{profile.data.xp.toLocaleString()} XP</span>
        <span>
          {rank.nextRank
            ? `${rank.xpUntilNextRank.toLocaleString()} more XP to reach ${rank.nextRankLabel}`
            : "Highest rank"}
        </span>
      </div>
      <div
        aria-label={`${progress}% progress through the ${rank.currentRankLabel} rank`}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={progress}
        className="mt-2 h-2 overflow-hidden rounded-full bg-white/[.06]"
        role="progressbar"
      >
        <span
          className="block h-full rounded-full bg-gradient-to-r from-violet-300 to-indigo-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <Link
        className="mt-5 inline-flex text-xs font-medium text-violet-300 hover:text-violet-200"
        href="/app/achievements"
      >
        Explore achievements →
      </Link>
    </section>
  );
}
