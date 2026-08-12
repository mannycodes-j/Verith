"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, X } from "lucide-react";
import { useState, type FormEvent } from "react";
import AdminContentFields from "@/components/admin/AdminContentFields";
import {
  ADMIN_BADGE_CATEGORIES,
  ADMIN_BADGE_CRITERIA_OPTIONS,
  ADMIN_BADGE_RARITIES,
  ADMIN_CONTENT_COPY,
  createBlankQuestion,
} from "@/data/admin-content";
import { adminService } from "@/services/admin";
import type {
  CreatableContent,
  EditableContent,
  EditorialQuestion,
  SupportedBadgeCriteriaType,
} from "@/types/admin-content";
import { createAdminContentPayload } from "@/utils/admin-content";
import { adminStyles as styles } from "./admin.styles";

export type { CreatableContent } from "@/types/admin-content";

function isEditableContent(kind: CreatableContent): kind is EditableContent {
  return ["courses", "lessons", "quizzes", "challenges"].includes(kind);
}

export default function AdminContentCreateDialog({ kind }: { kind: CreatableContent }) {
  const [open, setOpen] = useState(false);
  const [clientError, setClientError] = useState<string>();
  const [questions, setQuestions] = useState<EditorialQuestion[]>([createBlankQuestion()]);
  const [badgeCriteriaType, setBadgeCriteriaType] =
    useState<SupportedBadgeCriteriaType>("VERIFICATION_COUNT");
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payload: Record<string, unknown>) =>
      kind === "badges" ? adminService.createBadge(payload) : kind === "prompts" ? adminService.createPrompt(payload) : adminService.createContent(kind, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin", kind] });
      setOpen(false);
      setClientError(undefined);
      setQuestions([createBlankQuestion()]);
      setBadgeCriteriaType("VERIFICATION_COUNT");
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
      <button className={styles.createButton} onClick={() => { setBadgeCriteriaType("VERIFICATION_COUNT"); setOpen(true); }} type="button"><Plus size={16} /> Create {copy.singular}</button>
      {open && (
        <div className={styles.dialogBackdrop} role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setOpen(false)}>
          <section aria-labelledby="create-content-title" aria-modal="true" className={styles.editorDialog} role="dialog">
            <button aria-label="Close creation form" className={styles.dialogClose} onClick={() => setOpen(false)} type="button"><X size={18} /></button>
            <span>New editorial record</span>
            <h2 id="create-content-title">Create {copy.singular}.</h2>
            <p>{copy.description}</p>
            <form onSubmit={submit}>
              {isEditableContent(kind) && (
                <AdminContentFields
                  kind={kind}
                  onQuestionsChange={setQuestions}
                  questions={questions}
                />
              )}
              {kind === "badges" && <><label>Name<input maxLength={100} minLength={2} name="name" required /></label><label>Slug<input maxLength={100} minLength={2} name="slug" pattern="[a-z0-9]+(?:-[a-z0-9]+)*" placeholder="careful-reader" required /></label><label className="full">Description<textarea maxLength={1000} minLength={3} name="description" required /><small>State exactly which recorded activity earns this badge.</small></label><label>Category<select name="category">{ADMIN_BADGE_CATEGORIES.map((category) => <option key={category} value={category}>{category.replaceAll("_", " ")}</option>)}</select></label><label>Rarity<select name="rarity">{ADMIN_BADGE_RARITIES.map((rarity) => <option key={rarity} value={rarity}>{rarity.replaceAll("_", " ")}</option>)}</select></label><label className="full">Measurable criterion<select name="criteriaType" onChange={(event) => setBadgeCriteriaType(event.target.value as SupportedBadgeCriteriaType)} value={badgeCriteriaType}>{ADMIN_BADGE_CRITERIA_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select><small>{ADMIN_BADGE_CRITERIA_OPTIONS.find((option) => option.value === badgeCriteriaType)?.description}</small></label><label>Required activity count<input defaultValue={1} max={100000} min={1} name="threshold" required type="number" /><small>The badge unlocks when this recorded count is reached.</small></label>{badgeCriteriaType === "TAGGED_ACTIVITY_COUNT" && <label>Eligible tags<input name="tags" placeholder="context, source-checking" required /><small>Comma-separated tags already used by published lessons or challenges.</small></label>}<label>XP reward<input defaultValue={25} max={100000} min={0} name="xp" required type="number" /><small>XP is issued once when the badge is first earned.</small></label><label>Truth Points reward<input defaultValue={10} max={100000} min={0} name="truthPoints" required type="number" /><small>Truth Points are issued once when the badge is first earned.</small></label><div className="full rounded-2xl border border-violet-300/10 bg-violet-400/[.04] p-4 text-xs leading-5 text-white/45">Badge awards remain server-controlled and idempotent. Fixed Verith catalog definitions cannot be edited after creation; only their active state can change.</div></>}
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
