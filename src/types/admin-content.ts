export type CreatableContent =
  | "courses"
  | "lessons"
  | "quizzes"
  | "challenges"
  | "badges"
  | "prompts";

export type AdminCollectionKind =
  | "publishers"
  | "feedback"
  | "courses"
  | "lessons"
  | "quizzes"
  | "challenges"
  | "badges"
  | "prompts";

export type QuestionType = "SINGLE_CHOICE" | "MULTIPLE_CHOICE";

export type SupportedBadgeCriteriaType =
  | "VERIFICATION_COUNT"
  | "LESSON_COUNT"
  | "CHALLENGE_STREAK"
  | "DAILY_STREAK"
  | "EVIDENCE_INSPECTION_COUNT"
  | "TAGGED_ACTIVITY_COUNT"
  | "GUIDED_INVESTIGATION_COUNT"
  | "MISSION_COUNT";

export interface EditorialOption {
  id: string;
  text: string;
}

export interface EditorialQuestion {
  id: string;
  type: QuestionType;
  prompt: string;
  options: EditorialOption[];
  correctOptionIds: string[];
  explanation: string;
}
