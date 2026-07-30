import { apiClient } from "./apiClient";

export interface ChallengeQuestion {
  id: string;
  type: string;
  prompt: string;
  options: Array<{ id: string; text: string }>;
}

export interface Challenge {
  id?: string;
  _id?: string;
  title: string;
  slug: string;
  scenario: string;
  content: string;
  difficulty: string;
  passingScore: number;
  maxAttempts: number;
  publishAt: string;
  expiresAt: string;
  questions: ChallengeQuestion[];
}

export interface ChallengeAttempt {
  id?: string;
  _id?: string;
  attemptNumber: number;
  score: number;
  passed: boolean;
  results: Array<{
    questionId: string;
    correct: boolean;
    explanation: string;
  }>;
  rewardState: string;
  createdAt?: string;
}

export const challengesService = {
  attempts: (id: string) =>
    apiClient.get<ChallengeAttempt[]>(`/challenges/${id}/attempts`),
  get: (slug: string) =>
    apiClient.get<Challenge>(`/challenges/${slug}`, {
      retryAuthentication: false,
    }),
  list: () =>
    apiClient.get<Challenge[]>("/challenges", {
      retryAuthentication: false,
    }),
  submit: (
    id: string,
    answers: Array<{ questionId: string; selectedOptionIds: string[] }>,
  ) =>
    apiClient.post<ChallengeAttempt>(`/challenges/${id}/attempts`, {
      answers,
    }),
};
