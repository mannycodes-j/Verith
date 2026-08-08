export interface MissionRecord {
  id: string;
  title: string;
  slug: string;
  summary: string;
  topic: string;
  audience: string;
  difficulty: string;
  startsAt: string;
  endsAt: string;
  scenarios: Array<{ id: string; title: string; description: string; synthetic: boolean; competencies: string[] }>;
  lessonIds: string[];
  challengeIds: string[];
  learning: {
    required: boolean;
    lessons: Array<{ id: string; title: string; slug: string; summary: string; estimatedDuration: number; completed: boolean }>;
    challenges: Array<{ id: string; title: string; slug: string; scenario: string; difficulty: string; completed: boolean }>;
  };
  organization: string;
  privacyPolicy: string;
  consentRequired: boolean;
  participation: null | { status: string; baselineScore: number | null; followUpScore: number | null; completedScenarioIds: string[] };
}

export interface MissionAssessment {
  id: string;
  phase: "BASELINE" | "FOLLOW_UP";
  version: number;
  passingScore: number;
  maxAttempts: number;
  attemptsUsed: number;
  questions: Array<{ id: string; type: string; prompt: string; competency: string; options: Array<{ id: string; text: string }> }>;
}
