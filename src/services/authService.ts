import { apiClient, ApiClientError } from './apiClient';

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  isGuest: boolean;
  joinedAt: string;
}

export const authService = {
  loginAsGuest: async (): Promise<UserProfile | null> => {
    try {
      return await apiClient.post<UserProfile>('/auth/guest', {});
    } catch (error) {
      if (error instanceof ApiClientError && error.isUnavailable) return null;
      throw error;
    }
  },
  
  getProfile: async (): Promise<UserProfile | null> => {
    try {
      return await apiClient.get<UserProfile>('/auth/me');
    } catch (error) {
      if (error instanceof ApiClientError && error.isUnavailable) return null;
      throw error;
    }
  }
};
