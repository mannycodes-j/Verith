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

export interface ChallengePage {
  items: Challenge[];
  pagination: {
    nextCursor: string | null;
    previousCursor: null;
    hasNextPage: boolean;
    limit: number;
  };
}

export const challengesService = {
  attempts: (id: string) =>
    apiClient.get<ChallengeAttempt[]>(`/challenges/${id}/attempts`),
  get: (slug: string) =>
    apiClient.get<Challenge>(`/challenges/${slug}`, {
      retryAuthentication: false,
    }),
  list: ({
    cursor,
    difficulty,
    limit = 12,
    search,
    tag,
  }: {
    cursor?: string;
    difficulty?: string;
    limit?: number;
    search?: string;
    tag?: string;
  } = {}) => {
    const query = new URLSearchParams({ limit: String(limit) });
    if (cursor) query.set("cursor", cursor);
    if (difficulty) query.set("difficulty", difficulty);
    if (search) query.set("search", search);
    if (tag) query.set("tag", tag);
    return apiClient.get<ChallengePage>(`/challenges?${query}`, {
      retryAuthentication: false,
    });
  },
  submit: (
    id: string,
    answers: Array<{ questionId: string; selectedOptionIds: string[] }>,
  ) =>
    apiClient.post<ChallengeAttempt>(`/challenges/${id}/attempts`, {
      answers,
    }),
};
