"use client";

import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, LockKeyhole, Sparkles, X } from "lucide-react";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import AchievementIcon from "@/components/achievements/AchievementIcon";
import { BADGE_EARNED_FILTERS } from "@/data/catalog-filters";
import {
  type Badge,
  type BadgePage,
  gamificationService,
  type RewardTransactionPage,
} from "@/services/gamification";
import {
  badgeUnlockCriterion,
  clampAchievementPercentage,
} from "@/utils/achievement-display";
import { achievementStyles as styles } from "./achievements.styles";

function formatDate(value?: string | null) {
  if (!value) return "Not earned yet";
  const date = new Date(value);
  return Number.isNaN(date.valueOf())
    ? "Date unavailable"
    : new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(date);
}

function readable(value: string) {
  return value
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function Achievements() {
  const reducedMotion = useReducedMotion();
  const motionAllowed = reducedMotion === false;
  const badgeDialogClose = useRef<HTMLButtonElement>(null);
  const badgeDialog = useRef<HTMLElement>(null);
  const badgeDialogReturnFocus = useRef<HTMLElement | null>(null);
  const [selectedBadge, setSelectedBadge] = useState<Badge>();
  const [badgeSearch, setBadgeSearch] = useState("");
  const [badgeCategory, setBadgeCategory] = useState("");
  const [badgeEarned, setBadgeEarned] = useState<"ALL" | "EARNED" | "LOCKED">(
    "ALL",
  );
  const [transactionCursor, setTransactionCursor] = useState<string>();
  const [transactionCursorHistory, setTransactionCursorHistory] = useState<
    Array<string | undefined>
  >([]);
  const deferredBadgeSearch = useDeferredValue(badgeSearch.trim());
  const profile = useQuery({
    queryFn: gamificationService.profile,
    queryKey: ["gamification-profile"],
  });
  const transactions = useQuery<RewardTransactionPage>({
    placeholderData: keepPreviousData,
    queryFn: () => gamificationService.transactions(transactionCursor, 10),
    queryKey: ["gamification-transactions", transactionCursor ?? "first"],
  });
  const badges = useInfiniteQuery<BadgePage>({
    getNextPageParam: (page) => page.pagination.nextCursor ?? undefined,
    initialPageParam: undefined as string | undefined,
    queryFn: ({ pageParam }) =>
      gamificationService.badges({
        category: badgeCategory || undefined,
        cursor: typeof pageParam === "string" ? pageParam : undefined,
        earned: badgeEarned,
        limit: 20,
        search: deferredBadgeSearch || undefined,
      }),
    queryKey: [
      "gamification-badges",
      deferredBadgeSearch,
      badgeCategory,
      badgeEarned,
    ],
  });
  const badgeRecords = useMemo(
    () =>
      [...(badges.data?.pages.flatMap((page) => page.items) ?? [])].sort(
        (left, right) => (left.sortOrder ?? 100) - (right.sortOrder ?? 100),
      ),
    [badges.data],
  );
  const transactionRecords = transactions.data?.items ?? [];
  const closest = useMemo(
    () =>
      badgeRecords
        .filter((badge) => !badge.earned && badge.progress?.measurable)
        .sort(
          (left, right) =>
            (right.progress?.percentage ?? 0) -
            (left.progress?.percentage ?? 0),
        )[0],
    [badgeRecords],
  );
  const visibleClosest =
    !deferredBadgeSearch && !badgeCategory && badgeEarned === "ALL"
      ? closest
      : undefined;
  const error =
    (profile.isError && !profile.data ? profile.error : undefined) ??
    (badges.isError && !badges.data ? badges.error : undefined) ??
    (transactions.isError && !transactions.data
      ? transactions.error
      : undefined);

  useEffect(() => {
    if (!selectedBadge) return;
    badgeDialogReturnFocus.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    badgeDialogClose.current?.focus();
    const handleKeyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setSelectedBadge(undefined);
        return;
      }
      if (event.key !== "Tab" || !badgeDialog.current) return;
      const controls = Array.from(
        badgeDialog.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      const first = controls[0];
      const last = controls.at(-1);
      if (!first || !last) {
        event.preventDefault();
        badgeDialog.current.focus();
        return;
      }
      if (!badgeDialog.current.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleKeyboard);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyboard);
      const returnTarget = badgeDialogReturnFocus.current;
      badgeDialogReturnFocus.current = null;
      if (returnTarget?.isConnected) returnTarget.focus();
    };
  }, [selectedBadge]);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <span>Achievements and rank</span>
        <h1>Every careful check moves your practice forward.</h1>
        <p>
          Rank reflects XP. Badges recognize specific, measurable
          actions. Your separate Media Literacy Growth profile measures
          demonstrated competencies.
        </p>
      </header>

      {(profile.isPending || badges.isPending || transactions.isPending) && (
        <div aria-busy="true" className={styles.loading}>
          <span>Building your achievement record</span>
          <div />
          <div />
        </div>
      )}
      {error && (
        <section className={styles.error} role="alert">
          <span>Achievement record unavailable</span>
          <h2>Your progress could not be loaded.</h2>
          <p>{error.message}</p>
          <button
            onClick={() => {
              void profile.refetch();
              void badges.refetch();
              void transactions.refetch();
            }}
            type="button"
          >
            Retry
          </button>
        </section>
      )}

      {profile.data && (
        <motion.section
          className="relative overflow-hidden rounded-[2rem] border border-violet-300/15 bg-[radial-gradient(circle_at_12%_0%,rgba(139,92,246,0.3),transparent_34rem),radial-gradient(circle_at_92%_100%,rgba(34,211,238,0.09),transparent_26rem),rgba(14,14,18,0.9)] p-[clamp(1.5rem,5vw,3.25rem)] shadow-[0_40px_100px_-50px_rgba(109,40,217,0.8)]"
          initial={motionAllowed ? { opacity: 0, y: 18 } : false}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,.85fr)] lg:items-end">
            <div>
              <span className="text-[10px] font-semibold tracking-[.18em] text-violet-300 uppercase">
                Current rank
              </span>
              <div className="mt-5 flex items-center gap-5">
                <span className="grid size-20 shrink-0 place-items-center rounded-[1.5rem] border border-violet-300/20 bg-violet-400/10 text-violet-100 shadow-[0_0_45px_rgba(139,92,246,.25)]">
                  <AchievementIcon
                    iconKey={profile.data.rank.currentRankIconKey}
                    size={34}
                  />
                </span>
                <div>
                  <h2 className="m-0 text-[clamp(2.5rem,7vw,5rem)] leading-none font-semibold tracking-[-.06em]">
                    {profile.data.rank.currentRankLabel}
                  </h2>
                  <p className="mt-2 mb-0 text-sm text-white/45">
                    {profile.data.xp.toLocaleString()} XP
                  </p>
                </div>
              </div>
              <div className="mt-8">
                <div className="mb-2 flex flex-col gap-1.5 text-xs text-white/45 sm:flex-row sm:justify-between sm:gap-4">
                  <span>
                    {profile.data.rank.currentRankLabel} begins at {profile.data.rank.currentRankMinXp.toLocaleString()} XP
                  </span>
                  <span>
                    {profile.data.rank.nextRank
                      ? `${profile.data.rank.xpUntilNextRank.toLocaleString()} more XP to reach ${profile.data.rank.nextRankLabel} at ${profile.data.rank.nextRankMinXp?.toLocaleString()} XP`
                      : "Highest rank achieved"}
                  </span>
                </div>
                <div
                  aria-label={`${clampAchievementPercentage(profile.data.rank.progressPercentage)}% progress through the ${profile.data.rank.currentRankLabel} rank`}
                  aria-valuemax={100}
                  aria-valuemin={0}
                  aria-valuenow={clampAchievementPercentage(
                    profile.data.rank.progressPercentage,
                  )}
                  className="h-3 overflow-hidden rounded-full border border-white/[.04] bg-black/30 p-0.5"
                  role="progressbar"
                >
                  <motion.span
                    className="block h-full rounded-full bg-gradient-to-r from-violet-300 via-violet-500 to-indigo-500 shadow-[0_0_24px_rgba(139,92,246,.65)]"
                    initial={motionAllowed ? { width: 0 } : false}
                    animate={{
                      width: `${clampAchievementPercentage(profile.data.rank.progressPercentage)}%`,
                    }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
                {profile.data.badgeSummary.latest && (
                  <p className="mt-4 mb-0 text-xs text-white/45">
                    Latest badge: {profile.data.badgeSummary.latest.badge.name}
                    {" · "}
                    {formatDate(profile.data.badgeSummary.latest.earnedAt)}
                  </p>
                )}
              </div>
            </div>
            <dl className="m-0 grid grid-cols-2 gap-2">
              {[
                {
                  label: "Truth Points",
                  value: profile.data.truthPoints.toLocaleString(),
                },
                {
                  label: "Current streak",
                  value: `${profile.data.currentStreak} days`,
                },
                {
                  label: "Badges earned",
                  value: `${profile.data.badgeSummary.earned} of ${profile.data.badgeSummary.total}`,
                },
                {
                  label: "Longest streak",
                  value: `${profile.data.longestStreak} days`,
                },
              ].map((item) => (
                <div
                  className="rounded-2xl border border-white/[.05] bg-white/[.025] p-4"
                  key={item.label}
                >
                  <dt className="text-[10px] text-white/35">{item.label}</dt>
                  <dd className="mt-2 ml-0 text-lg font-semibold text-white/85">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </motion.section>
      )}

      {badges.data && (
        <section className="mt-6 rounded-[2rem] border border-white/[.06] bg-[#101114]/85 p-[clamp(1.25rem,4vw,2.5rem)]">
          <header className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-semibold tracking-[.16em] text-violet-300 uppercase">
                Badge collection
              </span>
              <h2 className="mt-3 mb-0 text-3xl font-semibold tracking-tight">
                Milestones made visible
              </h2>
            </div>
            {visibleClosest && (
              <p className="m-0 max-w-xs text-xs leading-5 text-white/40">
                Closest measurable badge:{" "}
                <strong className="text-white/70">
                  {visibleClosest.name}
                </strong>{" "}
                · {visibleClosest.progress?.label}
              </p>
            )}
          </header>
          <div className="my-6 grid gap-3 md:grid-cols-3">
            <label className="grid gap-2 text-[10px] font-semibold tracking-[.1em] text-white/35 uppercase">
              <span>Search badges</span>
              <input
                className="min-h-11 rounded-2xl border border-white/10 bg-black/20 px-4 text-sm font-normal tracking-normal text-white normal-case outline-none focus:border-violet-400/40"
                onChange={(event) => setBadgeSearch(event.target.value)}
                placeholder="Name or purpose"
                type="search"
                value={badgeSearch}
              />
            </label>
            <label className="grid gap-2 text-[10px] font-semibold tracking-[.1em] text-white/35 uppercase">
              <span>Achievement state</span>
              <select
                className="min-h-11 rounded-2xl border border-white/10 bg-[#111216] px-4 text-sm font-normal tracking-normal text-white normal-case outline-none focus:border-violet-400/40"
                onChange={(event) =>
                  setBadgeEarned(event.target.value as typeof badgeEarned)
                }
                value={badgeEarned}
              >
                {BADGE_EARNED_FILTERS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-[10px] font-semibold tracking-[.1em] text-white/35 uppercase">
              <span>Category</span>
              <select
                className="min-h-11 rounded-2xl border border-white/10 bg-[#111216] px-4 text-sm font-normal tracking-normal text-white normal-case outline-none focus:border-violet-400/40"
                onChange={(event) => setBadgeCategory(event.target.value)}
                value={badgeCategory}
              >
                <option value="">Every category</option>
                {[
                  "INVESTIGATION",
                  "EVIDENCE",
                  "LEARNING",
                  "GUIDED",
                  "COMMUNITY",
                  "STREAK",
                ].map((category) => (
                  <option key={category} value={category}>
                    {readable(category)}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {badgeRecords.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-white/10 p-10 text-center">
              <Sparkles className="mx-auto text-violet-300" />
              <h3 className="mt-4 mb-2">No badges match these filters.</h3>
              <p className="m-0 text-sm text-white/40">
                Clear a filter to see the fixed Verith badge catalog.
              </p>
            </div>
          ) : (
            <ul className="m-0 grid list-none gap-3 p-0 md:grid-cols-2 xl:grid-cols-3">
              {badgeRecords.map((badge) => {
                const comingSoon = badge.availability === "COMING_SOON";
                const progress = clampAchievementPercentage(
                  badge.progress?.percentage ?? 0,
                );
                const stateLabel = badge.earned
                  ? `Earned ${formatDate(badge.earnedAt)}`
                  : comingSoon
                    ? "Coming soon"
                    : (badge.progress?.label ?? "Locked");
                return (
                  <li key={badge._id}>
                  <motion.button
                    aria-label={`${badge.name}. ${stateLabel}. Open badge details.`}
                    className="group relative flex h-full min-h-72 w-full flex-col items-start overflow-hidden rounded-3xl border border-white/[.06] bg-white/[.025] p-5 text-left transition-colors hover:border-violet-300/20 hover:bg-violet-400/[.055] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet-400/15 disabled:cursor-not-allowed"
                    data-availability={badge.availability ?? "AVAILABLE"}
                    data-earned={badge.earned}
                    onClick={() => setSelectedBadge(badge)}
                    type="button"
                    whileHover={motionAllowed ? { y: -4 } : undefined}
                  >
                    <span
                      className={`grid size-14 place-items-center rounded-2xl border ${badge.earned ? "border-violet-300/20 bg-violet-400/12 text-violet-200 shadow-[0_0_35px_rgba(139,92,246,.2)]" : "border-white/[.06] bg-white/[.035] text-white/35"}`}
                    >
                      <AchievementIcon iconKey={badge.iconKey} size={25} />
                    </span>
                    <small className="mt-5 text-[9px] font-semibold tracking-[.13em] text-white/35 uppercase">
                      {readable(badge.category)} · {readable(badge.rarity)}
                    </small>
                    <h3 className="mt-2 mb-0 text-xl font-semibold tracking-tight">
                      {badge.name}
                    </h3>
                    <p className="mt-3 mb-5 text-xs leading-5 text-white/45">
                      {badge.description}
                    </p>
                    <div className="mt-auto w-full">
                      {badge.progress?.measurable && !badge.earned && (
                        <>
                          <div className="mb-2 flex justify-between text-[10px] text-white/35">
                            <span>{badge.progress.label}</span>
                            <span>{progress}%</span>
                          </div>
                          <div
                            aria-label={`${progress}% progress toward ${badge.name}`}
                            aria-valuemax={100}
                            aria-valuemin={0}
                            aria-valuenow={progress}
                            className="h-1.5 overflow-hidden rounded-full bg-white/[.06]"
                            role="progressbar"
                          >
                            <span
                              className="block h-full rounded-full bg-violet-400"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </>
                      )}
                      <span
                        className={`mt-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-semibold ${badge.earned ? "bg-emerald-400/10 text-emerald-200" : "bg-white/[.045] text-white/40"}`}
                      >
                        {badge.earned ? (
                          <Sparkles size={11} />
                        ) : (
                          <LockKeyhole size={11} />
                        )}
                        {stateLabel}
                      </span>
                    </div>
                  </motion.button>
                </li>
                );
              })}
            </ul>
          )}
          {badges.hasNextPage && (
            <button
              className={styles.loadMore}
              disabled={badges.isFetchingNextPage}
              onClick={() => void badges.fetchNextPage()}
              type="button"
            >
              {badges.isFetchingNextPage ? "Loading more…" : "Load more badges"}
            </button>
          )}
        </section>
      )}

      {transactions.data && (
        <section
          aria-busy={transactions.isFetching}
          className={styles.transactions}
        >
          <div className={styles.sectionHeader}>
            <span>Reward ledger</span>
            <span aria-live="polite">
              {transactions.isPlaceholderData
                ? `Loading page ${transactionCursorHistory.length + 1}`
                : `Page ${transactionCursorHistory.length + 1} · ${transactionRecords.length} records`}
            </span>
          </div>
          {transactionRecords.length === 0 ? (
            <p>
              No reward transactions have been issued yet. Complete an
              investigation or learning activity to begin.
            </p>
          ) : (
            <ol>
              {transactionRecords.map((transaction) => (
                <li key={transaction._id}>
                  <span>{readable(transaction.type)}</span>
                  <strong>
                    {transaction.xp === 0
                      ? "No XP issued"
                      : `${transaction.xp > 0 ? "+" : ""}${transaction.xp} XP`}
                  </strong>
                  <strong>
                    {transaction.truthPoints === 0
                      ? "No Truth Points issued"
                      : `${transaction.truthPoints > 0 ? "+" : ""}${transaction.truthPoints} Truth Points`}
                  </strong>
                  <small>{formatDate(transaction.createdAt)}</small>
                </li>
              ))}
            </ol>
          )}
          {(transactionCursorHistory.length > 0 ||
            transactions.data.pagination.hasNextPage) && (
            <nav
              aria-label="Reward ledger pages"
              className="mt-5 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2"
            >
              <button
                className={`${styles.paginationButton} justify-self-start`}
                disabled={
                  transactions.isFetching ||
                  transactionCursorHistory.length === 0
                }
                onClick={() => {
                  const history = [...transactionCursorHistory];
                  const previousCursor = history.pop();
                  setTransactionCursorHistory(history);
                  setTransactionCursor(previousCursor);
                }}
                type="button"
              >
                Previous
              </button>
              <span aria-live="polite" className="text-xs text-white/40">
                Page {transactionCursorHistory.length + 1}
              </span>
              <button
                className={`${styles.paginationButton} justify-self-end`}
                disabled={
                  transactions.isFetching ||
                  !transactions.data.pagination.nextCursor
                }
                onClick={() => {
                  const nextCursor = transactions.data.pagination.nextCursor;
                  if (!nextCursor) return;
                  setTransactionCursorHistory((history) => [
                    ...history,
                    transactionCursor,
                  ]);
                  setTransactionCursor(nextCursor);
                }}
                type="button"
              >
                Next
              </button>
            </nav>
          )}
        </section>
      )}

      <AnimatePresence>
        {selectedBadge && (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[900] grid place-items-center overflow-y-auto bg-black/75 p-4 backdrop-blur-lg"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.currentTarget === event.target)
                setSelectedBadge(undefined);
            }}
          >
            <motion.section
              animate={{ scale: 1, y: 0 }}
              aria-describedby="badge-detail-description"
              aria-labelledby="badge-detail-title"
              aria-modal="true"
              className="relative w-full max-w-2xl rounded-[2rem] border border-white/10 bg-[#111216] p-[clamp(1.5rem,5vw,3rem)] shadow-2xl"
              initial={motionAllowed ? { scale: 0.94, y: 18 } : false}
              ref={badgeDialog}
              role="dialog"
              tabIndex={-1}
            >
              <button
                aria-label="Close badge details"
                className="absolute top-4 right-4 grid size-10 place-items-center rounded-full border border-white/10 bg-white/[.04] text-white/60"
                onClick={() => setSelectedBadge(undefined)}
                ref={badgeDialogClose}
                type="button"
              >
                <X size={17} />
              </button>
              <span className="grid size-20 place-items-center rounded-[1.5rem] border border-violet-300/20 bg-violet-400/10 text-violet-200">
                <AchievementIcon iconKey={selectedBadge.iconKey} size={34} />
              </span>
              <small className="mt-6 block text-[10px] font-semibold tracking-[.15em] text-violet-300 uppercase">
                {readable(selectedBadge.category)} achievement
              </small>
              <h2
                className="mt-3 mb-0 text-4xl font-semibold tracking-tight"
                id="badge-detail-title"
              >
                {selectedBadge.name}
              </h2>
              <p
                className="mt-4 text-sm leading-6 text-white/55"
                id="badge-detail-description"
              >
                {selectedBadge.description}
              </p>
              {selectedBadge.whyItMatters && (
                <div className="mt-5 rounded-2xl border border-white/[.05] bg-white/[.025] p-4">
                  <span className="text-[10px] font-semibold tracking-[.12em] text-white/35 uppercase">
                    Why it matters
                  </span>
                  <p className="mt-2 mb-0 text-sm leading-6 text-white/55">
                    {selectedBadge.whyItMatters}
                  </p>
                </div>
              )}
              <dl className="mt-5 grid gap-2 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/[.025] p-4">
                  <dt className="text-[10px] text-white/35">Status</dt>
                  <dd className="mt-2 ml-0 text-sm font-semibold">
                    {selectedBadge.earned
                      ? `Earned ${formatDate(selectedBadge.earnedAt)}`
                      : selectedBadge.availability === "COMING_SOON"
                        ? "Coming soon"
                        : "Locked"}
                  </dd>
                </div>
                <div className="rounded-2xl bg-white/[.025] p-4">
                  <dt className="text-[10px] text-white/35">Progress</dt>
                  <dd className="mt-2 ml-0 text-sm font-semibold">
                    {selectedBadge.progress?.measurable
                      ? selectedBadge.progress.label
                      : selectedBadge.earned
                        ? "Complete"
                        : "No numeric progress available"}
                  </dd>
                </div>
              </dl>
              <div className="mt-2 rounded-2xl border border-white/[.05] bg-white/[.025] p-4">
                <span className="text-[10px] font-semibold tracking-[.12em] text-white/35 uppercase">
                  How to unlock
                </span>
                <p className="mt-2 mb-0 text-sm leading-6 text-white/55">
                  {badgeUnlockCriterion(selectedBadge)}
                </p>
              </div>
              <footer className="mt-7 flex justify-end">
                <button
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-400 to-indigo-500 px-5 text-sm font-medium text-white"
                  onClick={() => setSelectedBadge(undefined)}
                  type="button"
                >
                  Return to collection <ArrowUpRight size={14} />
                </button>
              </footer>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
