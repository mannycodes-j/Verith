import { apiClient } from "./apiClient";

export interface GamificationProfile {
  _id?: string;
  userId: string;
  xp: number;
  truthPoints: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  lastEligibleActivityDate?: string;
  badgesCount: number;
  leaderboardEligible: boolean;
  rank: RankProgress;
  badgeSummary: {
    earned: number;
    total: number;
    latest: null | { earnedAt: string; badge: Partial<Badge> };
  };
}

export interface RankProgress {
  currentRank: string;
  currentRankLabel: string;
  currentRankIconKey: string;
  currentXp: number;
  currentRankMinXp: number;
  nextRank: string | null;
  nextRankLabel: string | null;
  nextRankMinXp: number | null;
  xpUntilNextRank: number;
  progressPercentage: number;
}

export interface RewardTransaction {
  _id: string;
  type: string;
  xp: number;
  truthPoints: number;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface Badge {
  _id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  criteriaType: string;
  criteria: Record<string, unknown>;
  rarity: string;
  reward: { xp?: number; truthPoints?: number };
  earned?: boolean;
  earnedAt?: string | null;
  whyItMatters?: string;
  iconKey?: string;
  availability?: "AVAILABLE" | "COMING_SOON";
  sortOrder?: number;
  progress?: {
    measurable: boolean;
    current: number;
    target: number;
    percentage: number;
    label: string;
  };
}

export interface AchievementCelebration {
  _id: string;
  type: "BADGE_EARNED" | "RANK_UP";
  badgeCode?: string;
  badgeName?: string;
  fromRank?: string;
  toRank?: string;
  metadata: {
    description?: string;
    whyItMatters?: string;
    iconKey?: string;
    xp?: number;
    truthPoints?: number;
    currentRank?: string;
    currentRankLabel?: string;
  };
  createdAt: string;
}

export interface CelebrationClaim {
  claimToken: string;
  celebrations: AchievementCelebration[];
}

export interface RewardTransactionPage {
  items: RewardTransaction[];
  pagination: {
    nextCursor: string | null;
    previousCursor: null;
    hasNextPage: boolean;
    limit: number;
  };
}

export interface BadgePage {
  items: Badge[];
  pagination: RewardTransactionPage["pagination"];
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  displayName: string;
  xp: number;
  truthPoints: number;
}

export type LeaderboardPeriod = "WEEKLY" | "MONTHLY" | "ALL_TIME";

export const gamificationService = {
  acknowledgeCelebration: (id: string, claimToken: string) =>
    apiClient.patch<{ acknowledged: boolean; celebrationId: string }>(
      `/gamification/celebrations/${id}/seen`,
      { claimToken },
    ),
  badges: ({
    category,
    cursor,
    earned = "ALL",
    limit = 12,
    rarity,
    search,
  }: {
    category?: string;
    cursor?: string;
    earned?: "ALL" | "EARNED" | "LOCKED";
    limit?: number;
    rarity?: string;
    search?: string;
  } = {}) => {
    const query = new URLSearchParams({ earned, limit: String(limit) });
    if (category) query.set("category", category);
    if (cursor) query.set("cursor", cursor);
    if (rarity) query.set("rarity", rarity);
    if (search) query.set("search", search);
    return apiClient.get<BadgePage>(`/gamification/badges/me?${query}`);
  },
  leaderboard: (period: LeaderboardPeriod, limit = 50) =>
    apiClient.get<LeaderboardEntry[]>(
      `/gamification/leaderboards?period=${period}&limit=${limit}`,
      { retryAuthentication: false },
    ),
  profile: () => apiClient.get<GamificationProfile>("/gamification/me"),
  claimCelebrations: () =>
    apiClient.post<CelebrationClaim>("/gamification/celebrations/claim", {}),
  transactions: (cursor?: string, limit = 20) => {
    const query = new URLSearchParams({ limit: String(limit) });
    if (cursor) query.set("cursor", cursor);
    return apiClient.get<RewardTransactionPage>(
      `/gamification/transactions?${query}`,
    );
  },
};
