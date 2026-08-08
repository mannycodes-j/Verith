"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { analyticsService } from "@/services/analytics";
import {
  type AchievementCelebration,
  gamificationService,
} from "@/services/gamification";
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

export default function AchievementCelebrationCenter() {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const queryClient = useQueryClient();
  const closeButton = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLElement>(null);
  const [dismissed, setDismissed] = useState<string[]>([]);
  const criticalInteraction =
    pathname.includes("/app/quizzes/") ||
    pathname.includes("/app/challenges/") ||
    pathname === "/app/verify";
  const claim = useQuery({
    enabled: !criticalInteraction,
    queryFn: gamificationService.claimCelebrations,
    queryKey: ["achievement-celebrations", pathname],
    refetchInterval: 2 * 60_000,
    refetchOnWindowFocus: true,
    retry: 1,
  });
  const current = claim.data?.celebrations.find(
    (event) => !dismissed.includes(event._id),
  );

  const claimedRecords = claim.data?.celebrations;
  const refetchClaims = claim.refetch;
  const claimsFetching = claim.isFetching;
  useEffect(() => {
    const records = claimedRecords ?? [];
    if (
      records.length > 0 &&
      records.every((event) => dismissed.includes(event._id)) &&
      !claimsFetching
    ) {
      void refetchClaims();
    }
  }, [claimedRecords, claimsFetching, dismissed, refetchClaims]);
  const acknowledge = useMutation({
    mutationFn: ({
      event,
      token,
    }: {
      event: AchievementCelebration;
      token: string;
    }) => gamificationService.acknowledgeCelebration(event._id, token),
    onSettled: () => {
      void queryClient.invalidateQueries({
        queryKey: ["gamification-profile"],
      });
      void queryClient.invalidateQueries({ queryKey: ["gamification-badges"] });
      void queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  useEffect(() => {
    if (!current) return;
    closeButton.current?.focus();
    document.body.style.overflow = "hidden";
    void analyticsService
      .record(
        current.type === "BADGE_EARNED"
          ? "BADGE_CELEBRATION_VIEWED"
          : "RANK_CELEBRATION_VIEWED",
      )
      .catch(() => undefined);
    const channel =
      typeof BroadcastChannel === "undefined"
        ? undefined
        : new BroadcastChannel("verith-achievement-celebrations");
    channel?.postMessage({ id: current._id, state: "showing" });
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeButton.current?.click();
      if (event.key !== "Tab" || !dialog.current) return;
      const controls = Array.from(
        dialog.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
        ),
      );
      const first = controls[0];
      const last = controls.at(-1);
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", escape);
    return () => {
      document.body.style.overflow = "";
      channel?.close();
      window.removeEventListener("keydown", escape);
    };
  }, [current]);

  const dismiss = () => {
    if (!current || !claim.data) return;
    setDismissed((records) => [...records, current._id]);
    acknowledge.mutate({ event: current, token: claim.data.claimToken });
  };
  const title =
    current?.type === "BADGE_EARNED"
      ? (current.badgeName ?? label(current.badgeCode))
      : label(current?.toRank);

  return (
    <AnimatePresence>
      {current && (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[1000] grid place-items-center overflow-y-auto bg-black/80 p-4 backdrop-blur-xl"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
        >
          {!reducedMotion && <CelebrationCanvas />}
          <motion.section
            animate={{ opacity: 1, scale: 1, y: 0 }}
            aria-describedby="achievement-celebration-description"
            aria-labelledby="achievement-celebration-title"
            aria-modal="true"
            className="relative z-[1002] w-full max-w-xl overflow-hidden rounded-[2rem] border border-violet-300/20 bg-[#101014] p-[clamp(1.5rem,5vw,3rem)] text-center shadow-[0_40px_120px_rgba(76,29,149,0.45)] before:pointer-events-none before:absolute before:-top-48 before:left-1/2 before:size-96 before:-translate-x-1/2 before:rounded-full before:bg-violet-500/25 before:blur-3xl"
            initial={reducedMotion ? false : { opacity: 0, scale: 0.88, y: 24 }}
            role="dialog"
            ref={dialog}
            transition={{
              damping: 18,
              delay: 0.1,
              stiffness: 180,
              type: "spring",
            }}
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
                    (current.type === "RANK_UP" ? "crown" : "spark"),
                )}
                size={42}
              />
            </div>
            <span className="relative mt-7 block text-[10px] font-semibold tracking-[0.2em] text-violet-300 uppercase">
              Congratulations
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
                    ? `Your persisted activity moved you from ${label(current.fromRank)} to ${title}.`
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
