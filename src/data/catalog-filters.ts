export const DIFFICULTY_FILTERS = [
  { label: "All levels", value: "" },
  { label: "Beginner", value: "BEGINNER" },
  { label: "Intermediate", value: "INTERMEDIATE" },
  { label: "Advanced", value: "ADVANCED" },
] as const;

export const BADGE_EARNED_FILTERS = [
  { label: "All badges", value: "ALL" },
  { label: "Earned", value: "EARNED" },
  { label: "Locked", value: "LOCKED" },
] as const;

export const CONTENT_STATUS_FILTERS = {
  courses: ["DRAFT", "IN_REVIEW", "PUBLISHED", "ARCHIVED"],
  lessons: ["DRAFT", "IN_REVIEW", "PUBLISHED", "ARCHIVED"],
  quizzes: ["DRAFT", "PUBLISHED", "ARCHIVED"],
  challenges: ["DRAFT", "SCHEDULED", "PUBLISHED", "EXPIRED", "ARCHIVED"],
  badges: ["ACTIVE", "INACTIVE"],
} as const;
