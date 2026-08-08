import { apiClient } from "./apiClient";
import type { MissionAssessment, MissionRecord } from "@/types/missions";

export const missionService = {
  list: () => apiClient.get<MissionRecord[]>("/missions"),
  get: (slug: string) => apiClient.get<MissionRecord>(`/missions/${slug}`),
  join: (slug: string, consent: boolean) => apiClient.post(`/missions/${slug}/join`, { consent }),
  assessment: (slug: string, phase: "BASELINE" | "FOLLOW_UP") => apiClient.get<MissionAssessment>(`/missions/${slug}/assessments/${phase}`),
  submitAssessment: (slug: string, phase: "BASELINE" | "FOLLOW_UP", answers: Array<{ questionId: string; selectedOptionIds: string[] }>) => apiClient.post(`/missions/${slug}/assessments/${phase}/attempts`, { answers }),
  completeScenario: (slug: string, scenarioId: string, reflection: string) => apiClient.post(`/missions/${slug}/scenarios/complete`, { scenarioId, reflection }),
  impact: (slug: string) => apiClient.get<{ baselineScore: number | null; followUpScore: number | null; change: number | null; completedScenarios: number; status: string; limitation: string }>(`/missions/${slug}/impact`),
};

