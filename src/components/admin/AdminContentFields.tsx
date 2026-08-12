import QuestionBuilder from "@/components/admin/QuestionBuilder";
import type {
  EditableContent,
  EditorialQuestion,
} from "@/types/admin-content";

type RecordValue = Record<string, unknown> | undefined;

const text = (record: RecordValue, key: string, fallback = "") =>
  typeof record?.[key] === "string" ? record[key] : fallback;

const number = (record: RecordValue, key: string, fallback: number) => {
  const value = Number(record?.[key]);
  return Number.isFinite(value) ? value : fallback;
};

const list = (record: RecordValue, key: string, separator = ", ") =>
  Array.isArray(record?.[key])
    ? record[key].map(String).join(separator)
    : "";

const reward = (record: RecordValue, key: "xp" | "truthPoints", fallback: number) => {
  const policy = record?.rewardPolicy;
  if (!policy || typeof policy !== "object") return fallback;
  const value = Number((policy as Record<string, unknown>)[key]);
  return Number.isFinite(value) ? value : fallback;
};

const localDateTime = (value: unknown) => {
  if (typeof value !== "string" && !(value instanceof Date)) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
};

export default function AdminContentFields({
  kind,
  onQuestionsChange,
  questions,
  record,
}: {
  kind: EditableContent;
  onQuestionsChange: (questions: EditorialQuestion[]) => void;
  questions: EditorialQuestion[];
  record?: Record<string, unknown>;
}) {
  const editing = Boolean(record);
  return (
    <>
      {(kind === "lessons" || kind === "quizzes") && (
        <label>
          Course ID
          <input
            defaultValue={text(record, "courseId")}
            name="courseId"
            pattern="[a-fA-F0-9]{24}"
            readOnly={editing}
            required
          />
          {editing && <small>The course relationship cannot be changed.</small>}
        </label>
      )}
      {kind === "quizzes" && (
        <label>
          Lesson ID
          <input
            defaultValue={text(record, "lessonId")}
            name="lessonId"
            pattern="[a-fA-F0-9]{24}"
            readOnly={editing}
            required
          />
          {editing && <small>The lesson relationship cannot be changed.</small>}
        </label>
      )}
      <label>
        Title
        <input
          defaultValue={text(record, "title")}
          maxLength={200}
          minLength={3}
          name="title"
          required
        />
      </label>
      {(kind === "courses" || kind === "lessons" || kind === "challenges") && (
        <label>
          Slug
          <input
            defaultValue={text(record, "slug")}
            name="slug"
            pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
            placeholder="evidence-basics"
            required
          />
        </label>
      )}
      {kind === "courses" && (
        <>
          <label className="full">
            Description
            <textarea
              defaultValue={text(record, "description")}
              maxLength={3000}
              minLength={10}
              name="description"
              required
            />
          </label>
          <label>
            Difficulty
            <select defaultValue={text(record, "difficulty", "BEGINNER")} name="difficulty">
              <option value="BEGINNER">Beginner</option>
              <option value="INTERMEDIATE">Intermediate</option>
              <option value="ADVANCED">Advanced</option>
            </select>
          </label>
          <label>
            Duration in minutes
            <input defaultValue={number(record, "estimatedDuration", 30)} max={10000} min={1} name="estimatedDuration" required type="number" />
          </label>
          <label className="full">
            Learning objectives
            <textarea defaultValue={list(record, "learningObjectives", "\n")} name="learningObjectives" placeholder="One objective per line" required />
          </label>
          <label>
            Tags
            <input defaultValue={list(record, "tags")} name="tags" placeholder="evidence, sources" />
          </label>
          <label>
            Prerequisite course IDs
            <input defaultValue={list(record, "prerequisiteCourseIds")} name="prerequisiteCourseIds" placeholder="Comma separated IDs" />
          </label>
        </>
      )}
      {kind === "lessons" && (
        <>
          <label className="full">
            Summary
            <textarea defaultValue={text(record, "summary")} maxLength={1000} minLength={10} name="summary" required />
          </label>
          <label>
            Duration in minutes
            <input defaultValue={number(record, "estimatedDuration", 10)} max={1000} min={1} name="estimatedDuration" required type="number" />
          </label>
          <label>
            Sequence
            <input defaultValue={number(record, "sequence", 1)} max={10000} min={1} name="sequence" required type="number" />
          </label>
          <label className="full">
            Lesson HTML
            <textarea className="code" defaultValue={text(record, "sanitizedHtml")} maxLength={100000} name="contentHtml" required />
          </label>
          <label className="full">
            Tags
            <input defaultValue={list(record, "tags")} name="tags" placeholder="verification, context" />
          </label>
        </>
      )}
      {kind === "quizzes" && (
        <>
          <label className="full">
            Description
            <textarea defaultValue={text(record, "description")} maxLength={2000} minLength={3} name="description" required />
          </label>
          <label>
            Passing score
            <input defaultValue={number(record, "passingScore", 70)} max={100} min={0} name="passingScore" required type="number" />
          </label>
          <label>
            Maximum attempts
            <input defaultValue={number(record, "maxAttempts", 3)} max={100} min={1} name="maxAttempts" required type="number" />
          </label>
          <label>
            XP awarded
            <input defaultValue={reward(record, "xp", 25)} min={0} name="xp" required type="number" />
            <small>Experience points earned after passing.</small>
          </label>
          <label>
            Truth points awarded
            <input defaultValue={reward(record, "truthPoints", 10)} min={0} name="truthPoints" required type="number" />
            <small>Points added to the learner’s Verith record.</small>
          </label>
        </>
      )}
      {kind === "challenges" && (
        <>
          <label className="full">
            Scenario
            <textarea defaultValue={text(record, "scenario")} maxLength={3000} minLength={3} name="scenario" required />
          </label>
          <label className="full">
            Challenge content
            <textarea defaultValue={text(record, "content")} maxLength={10000} minLength={3} name="content" required />
          </label>
          <label>
            Difficulty
            <select defaultValue={text(record, "difficulty", "BEGINNER")} name="difficulty">
              <option value="BEGINNER">Beginner</option>
              <option value="INTERMEDIATE">Intermediate</option>
              <option value="ADVANCED">Advanced</option>
            </select>
          </label>
          <label>
            Media asset ID
            <input defaultValue={text(record, "mediaAssetId")} name="mediaAssetId" pattern="[a-fA-F0-9]{24}" />
          </label>
          <label>
            Tags
            <input defaultValue={list(record, "tags")} name="tags" placeholder="scams, source-checking" />
          </label>
          <label>
            Passing score
            <input defaultValue={number(record, "passingScore", 70)} max={100} min={0} name="passingScore" required type="number" />
          </label>
          <label>
            Maximum attempts
            <input defaultValue={number(record, "maxAttempts", 3)} max={100} min={1} name="maxAttempts" required type="number" />
          </label>
          <label>
            XP reward
            <input defaultValue={reward(record, "xp", 25)} min={0} name="xp" required type="number" />
          </label>
          <label>
            Truth points
            <input defaultValue={reward(record, "truthPoints", 10)} min={0} name="truthPoints" required type="number" />
          </label>
          <label>
            Publish at
            <input defaultValue={localDateTime(record?.publishAt)} name="publishAt" required type="datetime-local" />
          </label>
          <label>
            Expires at
            <input defaultValue={localDateTime(record?.expiresAt)} name="expiresAt" required type="datetime-local" />
          </label>
        </>
      )}
      {(kind === "quizzes" || kind === "challenges") && (
        <QuestionBuilder onChange={onQuestionsChange} questions={questions} />
      )}
    </>
  );
}
