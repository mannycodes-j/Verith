import type { AdminCollectionKind, CreatableContent, EditorialQuestion } from "@/types/admin-content";

export const ADMIN_COLLECTION_COPY: Record<AdminCollectionKind, { eyebrow: string; title: string; description: string }> = {
  publishers: { eyebrow: "Source governance", title: "Publisher records.", description: "Review discovered domains and record bounded, attributable credibility overrides." },
  feedback: { eyebrow: "Report moderation", title: "Feedback queue.", description: "Inspect persisted report feedback and record an audited moderation outcome." },
  courses: { eyebrow: "Learning editorial", title: "Course records.", description: "Draft, review, publish, and archive the structured learning catalog." },
  lessons: { eyebrow: "Learning editorial", title: "Lesson records.", description: "Inspect lesson status and open the full editorial record." },
  quizzes: { eyebrow: "Assessment editorial", title: "Quiz records.", description: "Manage real assessment definitions without exposing answers publicly." },
  challenges: { eyebrow: "Challenge editorial", title: "Challenge records.", description: "Inspect publication windows, status, and persisted challenge definitions." },
  prompts: { eyebrow: "AI governance", title: "Prompt registry.", description: "Inspect versioned prompts and control publication through super-admin audited actions." },
  badges: { eyebrow: "Gamification governance", title: "Badge definitions.", description: "Inspect real issuance criteria and deactivate obsolete rewards without rewriting user history." },
};

export const ADMIN_CONTENT_COPY: Record<
  CreatableContent,
  { singular: string; description: string }
> = {
  courses: { singular: "course", description: "Create the catalog record first, then review and publish it from its editorial dossier." },
  lessons: { singular: "lesson", description: "Attach a long-form lesson to an existing course using its database identifier." },
  quizzes: { singular: "quiz", description: "Create an assessment for an existing course lesson. Correct answers remain protected by the backend." },
  challenges: { singular: "challenge", description: "Schedule a scored daily challenge with an explicit availability window and reward policy." },
  badges: { singular: "badge", description: "Define a real achievement rule and reward without rewriting anyone’s existing activity history." },
  prompts: { singular: "prompt version", description: "Register an immutable prompt version for review. Publication remains a separate audited action." },
};

export function createBlankQuestion(index = 0): EditorialQuestion {
  const id = `question-${index + 1}`;
  return {
    id,
    type: "SINGLE_CHOICE",
    prompt: "",
    options: [
      { id: `${id}-option-1`, text: "" },
      { id: `${id}-option-2`, text: "" },
    ],
    correctOptionIds: [],
    explanation: "",
  };
}
