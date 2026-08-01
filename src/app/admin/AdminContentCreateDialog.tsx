"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, X } from "lucide-react";
import { useState, type FormEvent } from "react";
import QuestionBuilder from "@/components/admin/QuestionBuilder";
import { ADMIN_CONTENT_COPY, createBlankQuestion } from "@/data/admin-content";
import { adminService } from "@/services/admin";
import type { CreatableContent, EditorialQuestion } from "@/types/admin-content";
import { createAdminContentPayload } from "@/utils/admin-content";
import { adminStyles as styles } from "./admin.styles";

export type { CreatableContent } from "@/types/admin-content";

export default function AdminContentCreateDialog({ kind }: { kind: CreatableContent }) {
  const [open, setOpen] = useState(false);
  const [clientError, setClientError] = useState<string>();
  const [questions, setQuestions] = useState<EditorialQuestion[]>([createBlankQuestion()]);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payload: Record<string, unknown>) =>
      kind === "badges" ? adminService.createBadge(payload) : kind === "prompts" ? adminService.createPrompt(payload) : adminService.createContent(kind, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin", kind] });
      setOpen(false);
      setClientError(undefined);
      setQuestions([createBlankQuestion()]);
    },
  });
  const copy = ADMIN_CONTENT_COPY[kind];

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setClientError(undefined);
    try { mutation.mutate(createAdminContentPayload(kind, new FormData(event.currentTarget), questions)); }
    catch (error) { setClientError(error instanceof Error ? error.message : "The record could not be prepared."); }
  };

  return (
    <>
      <button className={styles.createButton} onClick={() => setOpen(true)} type="button"><Plus size={16} /> Create {copy.singular}</button>
      {open && (
        <div className={styles.dialogBackdrop} role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setOpen(false)}>
          <section aria-labelledby="create-content-title" aria-modal="true" className={styles.editorDialog} role="dialog">
            <button aria-label="Close creation form" className={styles.dialogClose} onClick={() => setOpen(false)} type="button"><X size={18} /></button>
            <span>New editorial record</span>
            <h2 id="create-content-title">Create {copy.singular}.</h2>
            <p>{copy.description}</p>
            <form onSubmit={submit}>
              {(kind === "lessons" || kind === "quizzes") && <label>Course ID<input name="courseId" pattern="[a-fA-F0-9]{24}" required /></label>}
              {kind === "quizzes" && <label>Lesson ID<input name="lessonId" pattern="[a-fA-F0-9]{24}" required /></label>}
              {!["badges", "prompts"].includes(kind) && <label>Title<input maxLength={200} minLength={3} name="title" required /></label>}
              {(kind === "courses" || kind === "lessons" || kind === "challenges") && <label>Slug<input name="slug" pattern="[a-z0-9]+(?:-[a-z0-9]+)*" placeholder="evidence-basics" required /></label>}
              {kind === "courses" && <><label className="full">Description<textarea maxLength={3000} minLength={10} name="description" required /></label><label>Difficulty<select name="difficulty"><option value="BEGINNER">Beginner</option><option value="INTERMEDIATE">Intermediate</option><option value="ADVANCED">Advanced</option></select></label><label>Duration in minutes<input max={10000} min={1} name="estimatedDuration" required type="number" /></label><label className="full">Learning objectives<textarea name="learningObjectives" placeholder="One objective per line" required /></label><label>Tags<input name="tags" placeholder="evidence, sources" /></label><label>Prerequisite course IDs<input name="prerequisiteCourseIds" placeholder="Comma separated IDs" /></label></>}
              {kind === "lessons" && <><label className="full">Summary<textarea maxLength={1000} minLength={10} name="summary" required /></label><label>Duration in minutes<input max={1000} min={1} name="estimatedDuration" required type="number" /></label><label>Sequence<input max={10000} min={1} name="sequence" required type="number" /></label><label className="full">Lesson HTML<textarea className="code" maxLength={100000} name="contentHtml" required /></label><label className="full">Tags<input name="tags" placeholder="verification, context" /></label></>}
              {kind === "quizzes" && <><label className="full">Description<textarea maxLength={2000} minLength={3} name="description" required /></label><label>Passing score<input defaultValue={70} max={100} min={0} name="passingScore" required type="number" /></label><label>Maximum attempts<input defaultValue={3} max={100} min={1} name="maxAttempts" required type="number" /></label><label>XP awarded<input defaultValue={25} min={0} name="xp" required type="number" /><small>Experience points earned after passing.</small></label><label>Truth points awarded<input defaultValue={10} min={0} name="truthPoints" required type="number" /><small>Points added to the learner’s Verith record.</small></label></>}
              {kind === "challenges" && <><label className="full">Scenario<textarea maxLength={3000} minLength={3} name="scenario" required /></label><label className="full">Challenge content<textarea maxLength={10000} minLength={3} name="content" required /></label><label>Difficulty<select name="difficulty"><option value="BEGINNER">Beginner</option><option value="INTERMEDIATE">Intermediate</option><option value="ADVANCED">Advanced</option></select></label><label>Media asset ID<input name="mediaAssetId" pattern="[a-fA-F0-9]{24}" /></label><label>Passing score<input defaultValue={70} max={100} min={0} name="passingScore" required type="number" /></label><label>Maximum attempts<input defaultValue={3} max={100} min={1} name="maxAttempts" required type="number" /></label><label>XP reward<input defaultValue={25} min={0} name="xp" required type="number" /></label><label>Truth points<input defaultValue={10} min={0} name="truthPoints" required type="number" /></label><label>Publish at<input name="publishAt" required type="datetime-local" /></label><label>Expires at<input name="expiresAt" required type="datetime-local" /></label></>}
              {(kind === "quizzes" || kind === "challenges") && <QuestionBuilder onChange={setQuestions} questions={questions} />}
              {kind === "badges" && <><label>Name<input maxLength={100} minLength={2} name="name" required /></label><label>Slug<input maxLength={100} minLength={2} name="slug" required /></label><label className="full">Description<textarea maxLength={1000} minLength={3} name="description" required /></label><label>Category<input maxLength={100} minLength={2} name="category" required /></label><label>Criteria type<select name="criteriaType"><option value="VERIFICATION_COUNT">Verification count</option><option value="LESSON_COUNT">Lesson count</option><option value="QUIZ_SCORE">Quiz score</option><option value="CHALLENGE_STREAK">Challenge streak</option><option value="DAILY_STREAK">Daily streak</option><option value="REPORT_FEEDBACK">Report feedback</option><option value="SPECIAL_EVENT">Special event</option></select></label><label>Rarity<input maxLength={50} minLength={2} name="rarity" required /></label><label className="full">Criteria JSON<textarea className="code" defaultValue={'{"threshold": 100}'} name="criteria" required /></label><label className="full">Reward JSON<textarea className="code" defaultValue={'{"xp": 25, "truthPoints": 10}'} name="reward" required /></label></>}
              {kind === "prompts" && <><label>Registry key<input maxLength={120} minLength={2} name="key" required /></label><label>Task<input maxLength={120} minLength={2} name="task" required /></label><label className="full">System prompt<textarea className="code tall" maxLength={50000} minLength={10} name="systemPrompt" required /></label><label className="full">User prompt template<textarea className="code" maxLength={50000} minLength={3} name="userPromptTemplate" required /></label><label>Supported providers<input name="supportedProviders" placeholder="GEMINI, GROQ, OPENROUTER" required /></label><label>Supported models<input name="supportedModels" placeholder="One model per line" required /></label><label>Output schema version<input maxLength={120} minLength={2} name="outputSchemaVersion" required /></label><label className="full">Change summary<textarea maxLength={1000} minLength={10} name="changeSummary" required /></label><label className="full">Audit reason<textarea maxLength={1000} minLength={10} name="reason" required /></label></>}
              {(clientError || mutation.isError) && <p className="full error" role="alert">{clientError ?? mutation.error?.message ?? "The record could not be created."}</p>}
              <footer className="full"><button onClick={() => setOpen(false)} type="button">Cancel</button><button disabled={mutation.isPending} type="submit">{mutation.isPending ? "Creating…" : `Create ${copy.singular}`}</button></footer>
            </form>
          </section>
        </div>
      )}
    </>
  );
}
