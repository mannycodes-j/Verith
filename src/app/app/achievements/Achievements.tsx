"use client";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  gamificationService,
  type RewardTransactionPage,
} from "@/services/gamification";
import { achievementStyles as styles } from "./achievements.styles";

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.valueOf())
    ? "Date unavailable"
    : new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(date);
}

export default function Achievements() {
  const profile = useQuery({
    queryFn: gamificationService.profile,
    queryKey: ["gamification-profile"],
  });
  const transactions = useInfiniteQuery<RewardTransactionPage>({
    getNextPageParam: (lastPage) =>
      lastPage.pagination.nextCursor ?? undefined,
    initialPageParam: undefined as string | undefined,
    queryFn: ({ pageParam }) =>
      gamificationService.transactions(
        typeof pageParam === "string" ? pageParam : undefined,
      ),
    queryKey: ["gamification-transactions"],
  });
  const transactionRecords =
    transactions.data?.pages.flatMap((page) => page.items) ?? [];
  const badges = useQuery({
    queryFn: gamificationService.badges,
    queryKey: ["gamification-badges"],
  });
  const error = profile.error ?? transactions.error ?? badges.error;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <span>Knowledge record</span>
        <h1>Achievements.</h1>
        <p>
          A factual ledger of learning and investigation rewards issued by the
          backend. Progress is never estimated from frontend activity.
        </p>
      </header>
      {(profile.isPending || transactions.isPending || badges.isPending) && (
        <div className={styles.loading} aria-busy="true">
          <span>Loading reward record</span>
          <div />
          <div />
        </div>
      )}
      {error && (
        <section className={styles.error} role="alert">
          <span>Reward record unavailable</span>
          <h2>Your achievement record could not be loaded.</h2>
          <p>{error.message}</p>
          <button
            type="button"
            onClick={() => {
              void profile.refetch();
              void transactions.refetch();
              void badges.refetch();
            }}
          >
            Retry
          </button>
        </section>
      )}
      {profile.data && (
        <section className={styles.profile}>
          <div>
            <span>Level</span>
            <strong>{profile.data.level}</strong>
          </div>
          <dl>
            <div>
              <dt>Experience</dt>
              <dd>{profile.data.xp} XP</dd>
            </div>
            <div>
              <dt>Truth points</dt>
              <dd>{profile.data.truthPoints}</dd>
            </div>
            <div>
              <dt>Current streak</dt>
              <dd>{profile.data.currentStreak} days</dd>
            </div>
            <div>
              <dt>Longest streak</dt>
              <dd>{profile.data.longestStreak} days</dd>
            </div>
            <div>
              <dt>Badges issued</dt>
              <dd>{profile.data.badgesCount}</dd>
            </div>
            <div>
              <dt>Leaderboard</dt>
              <dd>
                {profile.data.leaderboardEligible ? "Eligible" : "Private"}
              </dd>
            </div>
          </dl>
        </section>
      )}
      {badges.data && (
        <section className={styles.badges}>
          <div className={styles.sectionHeader}>
            <span>Badge catalog</span>
            <span>{badges.data.length} active badges</span>
          </div>
          {badges.data.length === 0 ? (
            <p>No active badges are configured.</p>
          ) : (
            <ol>
              {badges.data.map((badge, index) => {
                const earned = badge.earned === true;
                return (
                  <li data-earned={earned} key={badge._id}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <small>
                        {badge.category} · {badge.rarity}
                      </small>
                      <h2>{badge.name}</h2>
                      <p>{badge.description}</p>
                    </div>
                    <strong>{earned ? "Issued" : "Issuance unknown"}</strong>
                  </li>
                );
              })}
            </ol>
          )}
        </section>
      )}
      {transactions.data && (
        <section className={styles.transactions}>
          <div className={styles.sectionHeader}>
            <span>Reward ledger</span>
            <span>{transactionRecords.length} loaded records</span>
          </div>
          {transactionRecords.length === 0 ? (
            <p>No reward transactions have been issued.</p>
          ) : (
            <ol>
              {transactionRecords.map((transaction) => (
                <li key={transaction._id}>
                  <span>{transaction.type.replaceAll("_", " ")}</span>
                  <strong>
                    {transaction.xp >= 0 ? "+" : ""}
                    {transaction.xp} XP
                  </strong>
                  <strong>
                    {transaction.truthPoints >= 0 ? "+" : ""}
                    {transaction.truthPoints} points
                  </strong>
                  <small>{formatDate(transaction.createdAt)}</small>
                </li>
              ))}
            </ol>
          )}
          {transactions.hasNextPage && (
            <button
              className={styles.loadMore}
              disabled={transactions.isFetchingNextPage}
              onClick={() => void transactions.fetchNextPage()}
              type="button"
            >
              {transactions.isFetchingNextPage
                ? "Loading more…"
                : "Load older transactions"}
            </button>
          )}
        </section>
      )}
    </div>
  );
}
