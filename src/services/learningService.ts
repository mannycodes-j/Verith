import { apiClient, ApiClientError } from './apiClient';

export interface Lesson {
  id: string;
  title: string;
  description: string;
  category: 'bias' | 'deepfakes' | 'clickbait' | 'manipulation' | 'statistics';
  isCompleted: boolean;
}

export interface DailyChallenge {
  id: string;
  title: string;
  points: number;
  completed: boolean;
}

export const learningService = {
  getLessons: async (): Promise<Lesson[] | null> => {
    try {
      return await apiClient.get<Lesson[]>('/learning/lessons');
    } catch (error) {
      if (error instanceof ApiClientError && error.isUnavailable) return null;
      throw error;
    }
  },
  
  getDailyChallenge: async (): Promise<DailyChallenge | null> => {
    try {
      return await apiClient.get<DailyChallenge>('/learning/daily-challenge');
    } catch (error) {
      if (error instanceof ApiClientError && error.isUnavailable) return null;
      throw error;
    }
  }
};
