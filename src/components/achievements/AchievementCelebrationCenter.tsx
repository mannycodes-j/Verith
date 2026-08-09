"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { analyticsService } from "@/services/analytics";
import { ApiClientError } from "@/services/apiClient";
import { gamificationService } from "@/services/gamification";
import {
  achievementCheckAllowsCriticalInteraction,
  ACHIEVEMENT_CHECK_EVENT,
  acquireAchievementPresentationLease,
  achievementPresentationLeaseKey,
  isAchievementCriticalRoute,
  type PendingCelebrationAcknowledgement,
  queueCelebrationAcknowledgement,
  readPendingCelebrationAcknowledgements,
  releaseAchievementPresentationLease,
  removeCelebrationAcknowledgement,
} from "@/utils/achievement-celebrations";
import { achievementRankIcon } from "@/utils/achievement-display";
import AchievementIcon from "./AchievementIcon";
import CelebrationCanvas from "./CelebrationCanvas";

function label(value?: string) {
  return (
    value
      ?.replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (letter) => letter.toUpperCase()) ?? "New milestone"
  );
}

function browserStorage() {
  try {
    return window.localStorage;
  } catch {
    return undefined;
  }
}

function createOwnerId() {
  const randomId = globalThis.crypto?.randomUUID?.();
  return randomId ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export default function AchievementCelebrationCenter({
  userId,
}: {
  userId: string;
}) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const motionAllowed = reducedMotion === false;
  const queryClient = useQueryClient();
  const closeButton = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const hasClaimedCelebrations = useRef(false);
  const acknowledgementsInFlight = useRef(new Set<string>());
  const acknowledgementsBlockedUntilReclaim = useRef(new Set<string>());
  const drainedClaimToken = useRef("");
  const [ownerId] = useState(createOwnerId);

  const [dismissed, setDismissed] = useState<string[]>([]);
  const [interactionCompletedPath, setInteractionCompletedPath] = useState("");
  const [leaseOwned, setLeaseOwned] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [acknowledgementCount, setAcknowledgementCount] = useState(0);

  const criticalInteraction = isAchievementCriticalRoute(pathname);
  const safeToPresent =
    !criticalInteraction || interactionCompletedPath === pathname;
  const canClaim = pageVisible && leaseOwned && safeToPresent;

  useEffect(() => {
    const storage = browserStorage();
    if (!storage) {
      const frame = window.requestAnimationFrame(() => setLeaseOwned(true));
      return () => window.cancelAnimationFrame(frame);
    }
    const synchronizeLease = () => {
      const visible = document.visibilityState === "visible";
      setPageVisible(visible);
      if (!visible) {
        releaseAchievementPresentationLease(storage, ownerId, userId);
        setLeaseOwned(false);
        return;
      }
      try {
        setLeaseOwned(
          acquireAchievementPresentationLease(
            storage,
            ownerId,
            Date.now(),
            userId,
          ),
        );
      } catch {
        // Server-side claiming still prevents the same event being delivered
        // twice when storage is disabled by the browser.
        setLeaseOwned(true);
      }
    };
    const handleStorage = (event: StorageEvent) => {
      if (event.key === achievementPresentationLeaseKey(userId)) {
        synchronizeLease();
      }
    };
    const initialFrame = window.requestAnimationFrame(synchronizeLease);
    const heartbeat = window.setInterval(synchronizeLease, 5_000);
    document.addEventListener("visibilitychange", synchronizeLease);
    window.addEventListener("storage", handleStorage);
    return () => {
      window.clearInterval(heartbeat);
      window.cancelAnimationFrame(initialFrame);
      document.removeEventListener("visibilitychange", synchronizeLease);
      window.removeEventListener("storage", handleStorage);
      releaseAchievementPresentationLease(storage, ownerId, userId);
    };
  }, [ownerId, userId]);

  const claim = useQuery({
    enabled: canClaim,
    queryFn: gamificationService.claimCelebrations,
    queryKey: ["achievement-celebrations", userId],
    refetchInterval: (query) =>
      query.state.data?.celebrations.length ? false : 2 * 60_000,
    refetchOnWindowFocus: (query) =>
      !query.state.data?.celebrations.length,
    retry: 1,
  });
  const claimedRecords = claim.data?.celebrations;
  const claimToken = claim.data?.claimToken;
  const current = canClaim
    ? claimedRecords?.find((event) => !dismissed.includes(event._id))
    : undefined;

  useEffect(() => {
    hasClaimedCelebrations.current = (claimedRecords?.length ?? 0) > 0;
  }, [claimedRecords]);

  const refreshAchievementData = useCallback(() => {
    void queryClient.invalidateQueries({ queryKey: ["gamification-profile"] });
    void queryClient.invalidateQueries({ queryKey: ["gamification-badges"] });
    void queryClient.invalidateQueries({
      queryKey: ["gamification-transactions"],
    });
    void queryClient.invalidateQueries({ queryKey: ["notifications"] });
  }, [queryClient]);

  const acknowledgeRecord = useCallback(
    async (
      record: PendingCelebrationAcknowledgement,
      reclaimed = false,
    ) => {
      if (
        acknowledgementsInFlight.current.has(record.celebrationId) ||
        (!reclaimed &&
          acknowledgementsBlockedUntilReclaim.current.has(
            record.celebrationId,
          ))
      ) {
        return;
      }
      if (reclaimed) {
        acknowledgementsBlockedUntilReclaim.current.delete(
          record.celebrationId,
        );
      }
      acknowledgementsInFlight.current.add(record.celebrationId);
      setAcknowledgementCount(acknowledgementsInFlight.current.size);
      try {
        await gamificationService.acknowledgeCelebration(
          record.celebrationId,
          record.claimToken,
        );
        const storage = browserStorage();
        if (storage) {
          removeCelebrationAcknowledgement(
            storage,
            record.celebrationId,
            userId,
          );
        }
        acknowledgementsBlockedUntilReclaim.current.delete(
          record.celebrationId,
        );
        refreshAchievementData();
      } catch (error) {
        // A 404 usually means the five-minute claim was replaced. Keep the
        // locally dismissed ID and acknowledge it with the next claim token,
        // instead of replaying a celebration the user already closed.
        if (error instanceof ApiClientError && error.status === 404) {
          acknowledgementsBlockedUntilReclaim.current.add(
            record.celebrationId,
          );
        }
      } finally {
        acknowledgementsInFlight.current.delete(record.celebrationId);
        setAcknowledgementCount(acknowledgementsInFlight.current.size);
      }
    },
    [refreshAchievementData, userId],
  );

  useEffect(() => {
    const storage = browserStorage();
    if (!storage) return;
    const retryPending = () => {
      const pending = readPendingCelebrationAcknowledgements(
        storage,
        Date.now(),
        userId,
      );
      setDismissed((currentDismissed) => [
        ...new Set([
          ...currentDismissed,
          ...pending.map((item) => item.celebrationId),
        ]),
      ]);
      pending.forEach((record) => void acknowledgeRecord(record));
    };
    retryPending();
    const retryTimer = window.setInterval(retryPending, 20_000);
    window.addEventListener("online", retryPending);
    return () => {
      window.clearInterval(retryTimer);
      window.removeEventListener("online", retryPending);
    };
  }, [acknowledgeRecord, userId]);

  useEffect(() => {
    if (!claimToken || !claimedRecords?.length) return;
    const storage = browserStorage();
    for (const event of claimedRecords) {
      if (!dismissed.includes(event._id)) continue;
      const record = {
        celebrationId: event._id,
        claimToken,
        queuedAt: Date.now(),
      } satisfies PendingCelebrationAcknowledgement;
      if (storage) queueCelebrationAcknowledgement(storage, record, userId);
      void acknowledgeRecord(record, true);
    }
  }, [acknowledgeRecord, claimToken, claimedRecords, dismissed, userId]);

  const refetchClaims = claim.refetch;
  useEffect(() => {
    const timers = new Set<ReturnType<typeof setTimeout>>();
    const refresh = (event: Event) => {
      const allowDuringCriticalInteraction =
        achievementCheckAllowsCriticalInteraction(event);
      if (criticalInteraction && !allowDuringCriticalInteraction) return;
      if (allowDuringCriticalInteraction) {
        setInteractionCompletedPath(pathname);
      }
      if (!leaseOwned || hasClaimedCelebrations.current) return;
      void refetchClaims();
      // Durable activity can commit shortly before its outbox award handler.
      // Retry only across that short delivery window.
      for (const delay of [6_000, 12_000]) {
        const timer = setTimeout(() => {
          timers.delete(timer);
          if (!hasClaimedCelebrations.current) void refetchClaims();
        }, delay);
        timers.add(timer);
      }
    };
    window.addEventListener(ACHIEVEMENT_CHECK_EVENT, refresh);
    return () => {
      window.removeEventListener(ACHIEVEMENT_CHECK_EVENT, refresh);
      timers.forEach(clearTimeout);
    };
  }, [criticalInteraction, leaseOwned, pathname, refetchClaims]);

  useEffect(() => {
    const records = claimedRecords ?? [];
    if (
      records.length > 0 &&
      records.every((event) => dismissed.includes(event._id)) &&
      acknowledgementCount === 0 &&
      !claim.isFetching &&
      claimToken &&
      drainedClaimToken.current !== claimToken
    ) {
      drainedClaimToken.current = claimToken;
      void refetchClaims();
    }
  }, [
    acknowledgementCount,
    claim.isFetching,
    claimToken,
    claimedRecords,
    dismissed,
    refetchClaims,
  ]);

  const modalOpen = Boolean(current);
  useEffect(() => {
    if (!modalOpen) return;
    returnFocus.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      const target = returnFocus.current;
      returnFocus.current = null;
      if (target?.isConnected) target.focus();
    };
  }, [modalOpen]);

  useEffect(() => {
    if (!current) return;
    closeButton.current?.focus();
    void analyticsService
      .record(
        current.type === "BADGE_EARNED"
          ? "BADGE_CELEBRATION_VIEWED"
          : "RANK_CELEBRATION_VIEWED",
      )
      .catch(() => undefined);
    const handleKeyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeButton.current?.click();
        return;
      }
      if (event.key !== "Tab" || !dialog.current) return;
      const controls = Array.from(
        dialog.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
        ),
      );
      const first = controls[0];
      const last = controls.at(-1);
      if (!first || !last) {
        event.preventDefault();
        dialog.current.focus();
      } else if (!dialog.current.contains(document.activeElement)) {
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
    return () => window.removeEventListener("keydown", handleKeyboard);
  }, [current]);

  const dismiss = () => {
    if (!current || !claimToken) return;
    setDismissed((records) =>
      records.includes(current._id) ? records : [...records, current._id],
    );
    const acknowledgement = {
      celebrationId: current._id,
      claimToken,
      queuedAt: Date.now(),
    } satisfies PendingCelebrationAcknowledgement;
    const storage = browserStorage();
    if (storage) {
      queueCelebrationAcknowledgement(storage, acknowledgement, userId);
    }
    void acknowledgeRecord(acknowledgement);
  };

  const title =
    current?.type === "BADGE_EARNED"
      ? (current.badgeName ?? label(current.badgeCode))
      : (current?.metadata.currentRankLabel ?? label(current?.toRank));
  const currentRank = current
    ? label(
        String(
          current.metadata.currentRankLabel ??
            current.metadata.currentRank ??
            current.toRank ??
            "Rank available in achievements",
        ),
      )
    : "";
  const announcement =
    current?.type === "RANK_UP"
      ? "Rank up. You reached a new rank."
      : "Congratulations. You earned a new badge.";

  return (
    <AnimatePresence>
      {current && (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[1000] grid place-items-center overflow-y-auto bg-black/80 p-4 [padding-bottom:max(1rem,env(safe-area-inset-bottom))] [padding-left:max(1rem,env(safe-area-inset-left))] [padding-right:max(1rem,env(safe-area-inset-right))] [padding-top:max(1rem,env(safe-area-inset-top))] backdrop-blur-xl"
          exit={{ opacity: 0 }}
          initial={motionAllowed ? { opacity: 0 } : false}
          key={current._id}
        >
          {motionAllowed && <CelebrationCanvas seed={current._id} />}
          <motion.section
            animate={{ opacity: 1, scale: 1, y: 0 }}
            aria-describedby="achievement-celebration-description"
            aria-labelledby="achievement-celebration-announcement achievement-celebration-title"
            aria-modal="true"
            className="relative z-[1002] my-auto w-full max-w-xl overflow-hidden rounded-[2rem] border border-violet-300/20 bg-[#101014] p-[clamp(1.5rem,5vw,3rem)] text-center shadow-[0_40px_120px_rgba(76,29,149,0.45)] before:pointer-events-none before:absolute before:-top-48 before:left-1/2 before:size-96 before:-translate-x-1/2 before:rounded-full before:bg-violet-500/25 before:blur-3xl"
            initial={
              motionAllowed ? { opacity: 0, scale: 0.88, y: 24 } : false
            }
            role="dialog"
            ref={dialog}
            tabIndex={-1}
            transition={
              motionAllowed
                ? {
                    damping: 18,
                    delay: 0.1,
                    stiffness: 180,
                    type: "spring",
                  }
                : { duration: 0.12 }
            }
          >
            <button
              aria-label="Close achievement celebration"
              className="absolute top-4 right-4 z-10 grid size-10 place-items-center rounded-full border border-white/10 bg-white/[0.05] text-white/60 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet-400/20"
              onClick={dismiss}
              ref={closeButton}
              type="button"
            >
              <X aria-hidden="true" size={18} />
            </button>
            <div className="relative mx-auto grid size-24 place-items-center rounded-[1.8rem] border border-violet-300/25 bg-gradient-to-br from-violet-400/25 to-indigo-500/10 text-violet-100 shadow-[0_0_60px_rgba(139,92,246,0.35)]">
              <AchievementIcon
                iconKey={String(
                  current.metadata.iconKey ??
                    (current.type === "RANK_UP"
                      ? achievementRankIcon(current.toRank)
                      : "spark"),
                )}
                size={42}
              />
            </div>
            <span
              className="relative mt-7 block text-[10px] font-semibold tracking-[0.2em] text-violet-300 uppercase"
              id="achievement-celebration-announcement"
            >
              {announcement}
            </span>
            <h2
              className="relative mt-3 mb-0 text-[clamp(2.2rem,8vw,4rem)] leading-none font-semibold tracking-[-0.055em]"
              id="achievement-celebration-title"
            >
              {title}
            </h2>
            <p
              className="relative mx-auto mt-5 max-w-md text-sm leading-6 text-white/55"
              id="achievement-celebration-description"
            >
              {String(
                current.metadata.description ??
                  (current.type === "RANK_UP"
                    ? `Your Verith activity moved you from ${label(current.fromRank)} to ${title}.`
                    : "Your real Verith activity unlocked a new achievement."),
              )}
            </p>
            {current.metadata.whyItMatters && (
              <p className="relative mx-auto mt-3 max-w-md text-xs leading-5 text-white/35">
                {String(current.metadata.whyItMatters)}
              </p>
            )}
            {(Number(current.metadata.xp ?? 0) > 0 ||
              Number(current.metadata.truthPoints ?? 0) > 0) && (
              <div className="relative mx-auto mt-6 flex w-fit flex-wrap justify-center gap-2">
                {Number(current.metadata.xp ?? 0) > 0 && (
                  <span className="rounded-full bg-violet-400/10 px-4 py-2 text-xs font-semibold text-violet-200">
                    +{Number(current.metadata.xp)} XP
                  </span>
                )}
                {Number(current.metadata.truthPoints ?? 0) > 0 && (
                  <span className="rounded-full bg-cyan-400/10 px-4 py-2 text-xs font-semibold text-cyan-200">
                    +{Number(current.metadata.truthPoints)} Truth Points
                  </span>
                )}
              </div>
            )}
            <dl className="relative mx-auto mt-6 grid max-w-md gap-2 text-left sm:grid-cols-2">
              <div className="rounded-2xl border border-white/[.05] bg-white/[.025] p-3.5">
                <dt className="text-[9px] tracking-[.1em] text-white/35 uppercase">
                  Current rank
                </dt>
                <dd className="mt-1.5 ml-0 text-sm font-semibold text-white/80">
                  {currentRank}
                </dd>
              </div>
              <div className="rounded-2xl border border-white/[.05] bg-white/[.025] p-3.5">
                <dt className="text-[9px] tracking-[.1em] text-white/35 uppercase">
                  Continue with
                </dt>
                <dd className="mt-1.5 ml-0 text-sm font-semibold text-white/80">
                  Another careful check or learning activity
                </dd>
              </div>
            </dl>
            <footer className="relative mt-8 flex flex-col-reverse justify-center gap-2 sm:flex-row">
              <button
                className="min-h-11 rounded-full border border-white/10 bg-white/[0.04] px-5 text-sm font-medium text-white/70 transition hover:bg-white/[0.08]"
                onClick={dismiss}
                type="button"
              >
                Continue
              </button>
              <Link
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-400 to-indigo-500 px-5 text-sm font-medium text-white"
                href="/app/achievements"
                onClick={dismiss}
              >
                View achievements <ArrowRight aria-hidden="true" size={15} />
              </Link>
            </footer>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
