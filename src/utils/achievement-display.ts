import type { Badge } from "../services/gamification";

export function clampAchievementPercentage(value: number) {
  if (!Number.isFinite(value)) return 0;
  return Math.min(100, Math.max(0, Math.round(value)));
}

function count(value: unknown, fallback = 1) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.round(parsed) : fallback;
}

function plural(value: number, singular: string, pluralValue = `${singular}s`) {
  return value === 1 ? singular : pluralValue;
}

export function badgeUnlockCriterion(
  badge: Pick<Badge, "availability" | "criteria" | "criteriaType" | "progress">,
) {
  if (badge.availability === "COMING_SOON") {
    return "This achievement is not available yet.";
  }
  const target = count(badge.criteria?.threshold, badge.progress?.target);
  switch (badge.criteriaType) {
    case "VERIFICATION_COUNT":
      return `Complete ${target} Verith ${plural(target, "investigation")}.`;
    case "EVIDENCE_INSPECTION_COUNT":
      return `Open ${target} distinct evidence ${plural(target, "source")} from completed reports.`;
    case "GUIDED_INVESTIGATION_COUNT":
      return `Complete ${target} guided ${plural(target, "investigation")}.`;
    case "CHALLENGE_STREAK":
      return `Pass ${target} distinct Verith ${plural(target, "challenge")}.`;
    case "DAILY_STREAK":
      return `Maintain eligible learning activity for ${target} consecutive ${plural(target, "day")}.`;
    case "MISSION_COUNT":
      return `Complete ${target} community verification ${plural(target, "mission")}.`;
    case "TAGGED_ACTIVITY_COUNT":
      return `Complete ${target} qualifying learning or practice ${plural(target, "activity", "activities")}.`;
    case "LESSON_COUNT":
      return `Complete ${target} published ${plural(target, "lesson")}.`;
    case "QUIZ_SCORE":
      return `Meet the required score in an eligible Verith quiz.`;
    case "REPORT_FEEDBACK":
      return `Submit the required report feedback through Verith.`;
    default:
      return "Complete the required Verith activity to unlock this achievement.";
  }
}

export function achievementRankIcon(rank?: string) {
  const icons: Record<string, string> = {
    NOVICE: "shield",
    EXPLORER: "compass",
    INVESTIGATOR: "search",
    VERIFIER: "verified-shield",
    TRUTH_CHAMPION: "crown",
  };
  return rank ? (icons[rank] ?? "crown") : "crown";
}
