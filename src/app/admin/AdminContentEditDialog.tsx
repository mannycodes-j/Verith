"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pencil, X } from "lucide-react";
import { useState, type FormEvent } from "react";
import AdminContentFields from "@/components/admin/AdminContentFields";
import { createBlankQuestion } from "@/data/admin-content";
import { adminService, type AdminRecord } from "@/services/admin";
import type { EditableContent, EditorialQuestion } from "@/types/admin-content";
import {
  createAdminContentUpdatePayload,
  editableQuestions,
} from "@/utils/admin-content";
import { adminStyles as styles } from "./admin.styles";

export default function AdminContentEditDialog({
  kind,
  record,
}: {
  kind: EditableContent;
  record: AdminRecord;
}) {
  const id = String(record._id ?? record.id);
  const singular = kind === "quizzes" ? "quiz" : kind.slice(0, -1);
  const client = useQueryClient();
  const [open, setOpen] = useState(false);
  const [clientError, setClientError] = useState<string>();
  const [questions, setQuestions] = useState<EditorialQuestion[]>(() => {
    const existing = editableQuestions(record.questions);
    return existing.length ? existing : [createBlankQuestion()];
  });
  const mutation = useMutation({
    mutationFn: (payload: Record<string, unknown>) =>
      adminService.updateContent(kind, id, payload),
    onSuccess: async (updated) => {
      client.setQueryData(["admin", kind, id], updated);
      await client.invalidateQueries({ queryKey: ["admin", kind] });
      setClientError(undefined);
      setOpen(false);
    },
  });

  const show = () => {
    const existing = editableQuestions(record.questions);
    setQuestions(existing.length ? existing : [createBlankQuestion()]);
    setClientError(undefined);
    mutation.reset();
    setOpen(true);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setClientError(undefined);
    try {
      mutation.mutate(
        createAdminContentUpdatePayload(
          kind,
          new FormData(event.currentTarget),
          questions,
        ),
      );
    } catch (error) {
      setClientError(
        error instanceof Error
          ? error.message
          : "The changes could not be prepared.",
      );
    }
  };

  return (
    <>
      <button className={styles.createButton} onClick={show} type="button">
        <Pencil size={15} /> Edit {singular}
      </button>
      {open && (
        <div
          className={styles.dialogBackdrop}
          onMouseDown={(event) =>
            event.target === event.currentTarget && setOpen(false)
          }
          role="presentation"
        >
          <section
            aria-labelledby="edit-content-title"
            aria-modal="true"
            className={styles.editorDialog}
            role="dialog"
          >
            <button
              aria-label="Close editing form"
              className={styles.dialogClose}
              onClick={() => setOpen(false)}
              type="button"
            >
              <X size={18} />
            </button>
            <span>Editorial workspace</span>
            <h2 id="edit-content-title">Edit {singular}.</h2>
            <p>Review the complete record before saving these changes.</p>
            <form onSubmit={submit}>
              <AdminContentFields
                kind={kind}
                onQuestionsChange={setQuestions}
                questions={questions}
                record={record}
              />
              {(clientError || mutation.isError) && (
                <p className="full error" role="alert">
                  {clientError ??
                    mutation.error?.message ??
                    "The record could not be updated."}
                </p>
              )}
              <footer className="full">
                <button onClick={() => setOpen(false)} type="button">
                  Cancel
                </button>
                <button disabled={mutation.isPending} type="submit">
                  {mutation.isPending ? "Saving…" : "Save changes"}
                </button>
              </footer>
            </form>
          </section>
        </div>
      )}
    </>
  );
}
