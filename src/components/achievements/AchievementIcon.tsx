import {
  Award,
  Binoculars,
  Brain,
  Compass,
  Crown,
  Eye,
  Flame,
  HeartHandshake,
  Search,
  ShieldCheck,
  Sparkles,
  Trophy,
} from "lucide-react";

const icons = {
  compass: Compass,
  crown: Crown,
  "first-check": ShieldCheck,
  "evidence-hunter": Binoculars,
  "context-detective": Search,
  "manipulation-spotter": Eye,
  "source-sleuth": Brain,
  "guided-investigator": Compass,
  "challenge-master": Trophy,
  "community-contributor": HeartHandshake,
  "streak-7": Flame,
  "streak-30": Flame,
  search: Search,
  shield: ShieldCheck,
  spark: Sparkles,
} as const;

export default function AchievementIcon({
  iconKey,
  size = 24,
}: {
  iconKey?: string;
  size?: number;
}) {
  const Icon = icons[iconKey as keyof typeof icons] ?? Award;
  return <Icon aria-hidden="true" size={size} strokeWidth={1.7} />;
}
