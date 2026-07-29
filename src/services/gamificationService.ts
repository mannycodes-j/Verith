import { apiClient, ApiClientError } from './apiClient';

export interface GamificationStats {
  truthPoints: number;
  currentStreak: number;
  badges: Array<{ id: string; name: string; iconUrl: string }>;
}

export interface LeaderboardEntry {
  userId: string;
  name: string;
  points: number;
  rank: number;
}

export const gamificationService = {
  getStats: async (): Promise<GamificationStats | null> => {
    try {
      return await apiClient.get<GamificationStats>('/gamification/stats');
    } catch (error) {
      if (error instanceof ApiClientError && error.isUnavailable) return null;
      throw error;
    }
  },

  getLeaderboard: async (): Promise<LeaderboardEntry[] | null> => {
    try {
      return await apiClient.get<LeaderboardEntry[]>('/gamification/leaderboard');
    } catch (error) {
      if (error instanceof ApiClientError && error.isUnavailable) return null;
      throw error;
    }
  }
};
