import { apiClient } from "./apiClient";

export interface Quiz {
  id: string;
  courseId: string;
  lessonId: string;
  title: string;
  description: string;
  passingScore: number;
  maxAttempts: number;
  questions: Array<{
    id: string;
    type: string;
    prompt: string;
    options: Array<{ id: string; text: string }>;
  }>;
}

export interface QuizAttempt {
  id: string;
  attemptNumber: number;
  score: number;
  passed: boolean;
  passingScore: number;
  results: Array<{
    questionId: string;
    correct: boolean;
    explanation: string;
  }>;
  rewardState: string;
}

export interface QuizAttemptHistory {
  _id: string;
  attemptNumber: number;
  score: number;
  passed: boolean;
  rewardState: string;
  createdAt?: string;
}

export const quizzesService = {
  get: (id: string) =>
    apiClient.get<Quiz>(`/quizzes/${id}`, { retryAuthentication: false }),
  forLesson: (lessonId: string) =>
    apiClient.get<Quiz>(`/quizzes/lesson/${lessonId}`, {
      retryAuthentication: false,
    }),
  attempts: (id: string) =>
    apiClient.get<QuizAttemptHistory[]>(`/quizzes/${id}/attempts`),
  submit: (
    id: string,
    answers: Array<{ questionId: string; selectedOptionIds: string[] }>,
  ) => apiClient.post<QuizAttempt>(`/quizzes/${id}/attempts`, { answers }),
};
