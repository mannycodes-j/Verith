import { apiClient } from "./apiClient";

export interface GamificationProfile {
  _id: string;
  userId: string;
  xp: number;
  truthPoints: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  lastEligibleActivityDate?: string;
  badgesCount: number;
  leaderboardEligible: boolean;
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

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  displayName: string;
  xp: number;
  truthPoints: number;
}

export type LeaderboardPeriod = "WEEKLY" | "MONTHLY" | "ALL_TIME";

export const gamificationService = {
  badges: () => apiClient.get<Badge[]>("/gamification/badges/me"),
  leaderboard: (period: LeaderboardPeriod, limit = 50) =>
    apiClient.get<LeaderboardEntry[]>(
      `/gamification/leaderboards?period=${period}&limit=${limit}`,
      { retryAuthentication: false },
    ),
  profile: () => apiClient.get<GamificationProfile>("/gamification/me"),
  transactions: (cursor?: string, limit = 20) => {
    const query = new URLSearchParams({ limit: String(limit) });
    if (cursor) query.set("cursor", cursor);
    return apiClient.get<RewardTransactionPage>(
      `/gamification/transactions?${query}`,
    );
  },
};
