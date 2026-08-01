import type { CreatableContent, EditorialQuestion } from "@/types/admin-content";

const lines = (value: FormDataEntryValue | null) =>
  String(value ?? "").split(/[,\n]/).map((item) => item.trim()).filter(Boolean);

const integer = (data: FormData, name: string) =>
  Number.parseInt(String(data.get(name)), 10);

function structuredJson(data: FormData, name: string, label: string) {
  try {
    return JSON.parse(String(data.get(name)));
  } catch {
    throw new Error(`${label} must contain valid JSON.`);
  }
}

export function validateQuestions(questions: EditorialQuestion[]) {
  if (!questions.length) throw new Error("Add at least one question.");
  questions.forEach((question, index) => {
    const number = index + 1;
    if (question.prompt.trim().length < 3) throw new Error(`Question ${number} needs a clear prompt.`);
    if (question.options.length < 2) throw new Error(`Question ${number} needs at least two answers.`);
    if (question.options.some((option) => !option.text.trim())) throw new Error(`Complete every answer in question ${number}.`);
    if (!question.correctOptionIds.length) throw new Error(`Choose the correct answer for question ${number}.`);
    const optionIds = new Set(question.options.map((option) => option.id));
    if (question.correctOptionIds.some((id) => !optionIds.has(id))) throw new Error(`Question ${number} has a correct answer that no longer exists.`);
    if (question.type === "SINGLE_CHOICE" && question.correctOptionIds.length !== 1) throw new Error(`Question ${number} allows only one correct answer.`);
    if (question.explanation.trim().length < 3) throw new Error(`Explain the answer to question ${number}.`);
  });
}

export function createAdminContentPayload(
  kind: CreatableContent,
  data: FormData,
  questions: EditorialQuestion[],
): Record<string, unknown> {
  if (kind === "courses") return { title: String(data.get("title")), slug: String(data.get("slug")), description: String(data.get("description")), difficulty: String(data.get("difficulty")), estimatedDuration: integer(data, "estimatedDuration"), learningObjectives: lines(data.get("learningObjectives")), tags: lines(data.get("tags")), prerequisiteCourseIds: lines(data.get("prerequisiteCourseIds")) };
  if (kind === "lessons") return { courseId: String(data.get("courseId")), title: String(data.get("title")), slug: String(data.get("slug")), summary: String(data.get("summary")), contentHtml: String(data.get("contentHtml")), estimatedDuration: integer(data, "estimatedDuration"), sequence: integer(data, "sequence"), tags: lines(data.get("tags")) };
  if (kind === "quizzes") {
    validateQuestions(questions);
    return { courseId: String(data.get("courseId")), lessonId: String(data.get("lessonId")), title: String(data.get("title")), description: String(data.get("description")), passingScore: integer(data, "passingScore"), maxAttempts: integer(data, "maxAttempts"), rewardPolicy: { xp: integer(data, "xp"), truthPoints: integer(data, "truthPoints") }, questions };
  }
  if (kind === "challenges") {
    validateQuestions(questions);
    return { title: String(data.get("title")), slug: String(data.get("slug")), scenario: String(data.get("scenario")), content: String(data.get("content")), difficulty: String(data.get("difficulty")), maxAttempts: integer(data, "maxAttempts"), passingScore: integer(data, "passingScore"), publishAt: new Date(String(data.get("publishAt"))).toISOString(), expiresAt: new Date(String(data.get("expiresAt"))).toISOString(), rewardPolicy: { xp: integer(data, "xp"), truthPoints: integer(data, "truthPoints") }, questions, ...(String(data.get("mediaAssetId") ?? "").trim() ? { mediaAssetId: String(data.get("mediaAssetId")) } : {}) };
  }
  if (kind === "badges") return { name: String(data.get("name")), slug: String(data.get("slug")), description: String(data.get("description")), category: String(data.get("category")), criteriaType: String(data.get("criteriaType")), rarity: String(data.get("rarity")), criteria: structuredJson(data, "criteria", "Criteria"), reward: structuredJson(data, "reward", "Reward"), active: true };
  return { key: String(data.get("key")), task: String(data.get("task")), systemPrompt: String(data.get("systemPrompt")), userPromptTemplate: String(data.get("userPromptTemplate")), supportedProviders: lines(data.get("supportedProviders")), supportedModels: lines(data.get("supportedModels")), outputSchemaVersion: String(data.get("outputSchemaVersion")), changeSummary: String(data.get("changeSummary")), reason: String(data.get("reason")) };
}
