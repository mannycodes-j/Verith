"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { adminService, type AdminRecord } from "@/services/admin";
import { adminStyles as styles } from "./admin.styles";

type Kind =
  | "publishers"
  | "feedback"
  | "courses"
  | "lessons"
  | "quizzes"
  | "challenges"
  | "badges"
  | "prompts";

function collectionPath(kind: Kind): string {
  return kind === "prompts" ? "/admin/ai/prompts" : `/admin/${kind}`;
}

function getRecord(kind: Kind, id: string): Promise<AdminRecord> {
  if (kind === "publishers") return adminService.publisher(id);
  if (kind === "feedback") return adminService.feedbackRecord(id);
  if (kind === "prompts") return adminService.prompt(id);
  if (kind === "badges") return adminService.badge(id);
  return adminService.contentRecord(kind, id);
}

export default function AdminRecordDetail({
  id,
  kind,
}: {
  id: string;
  kind: Kind;
}) {
  const client = useQueryClient();
  const [reason, setReason] = useState("");
  const [resolution, setResolution] = useState("");
  const query = useQuery({
    queryFn: () => getRecord(kind, id),
    queryKey: ["admin", kind, id],
    retry: false,
  });
  const action = useMutation({
    mutationFn: async (operation: string) => {
      if (reason.trim().length < 10)
        throw new Error("Enter an audit reason of at least 10 characters.");
      if (kind === "publishers") {
        return adminService.overridePublisher(id, {
          credibilityLevel: "UNKNOWN",
          reason,
          reviewStatus: "REVIEWED",
        });
      }
      if (kind === "feedback") {
        if (resolution.trim().length < 10)
          throw new Error("Enter a resolution of at least 10 characters.");
        return adminService.resolveFeedback(id, {
          reason,
          resolution,
          status: operation,
        });
      }
      if (kind === "prompts") {
        return adminService.promptAction(
          id,
          operation as "publish" | "rollback",
          reason,
        );
      }
      if (kind === "badges") return adminService.archiveBadge(id, reason);
      if (operation === "ARCHIVED")
        return adminService.archiveContent(kind, id, reason);
      return adminService.updateContentStatus(kind, id, operation);
    },
    onSuccess: async () => {
      setReason("");
      setResolution("");
      await client.invalidateQueries({ queryKey: ["admin", kind] });
      await query.refetch();
    },
  });

  if (query.isPending)
    return <div className={styles.loading}>Loading administrative record…</div>;
  if (query.isError)
    return (
      <section className={styles.error} role="alert">
        <span>Record unavailable</span>
        <h1>The record could not be opened.</h1>
        <p>{query.error.message}</p>
        <button type="button" onClick={() => void query.refetch()}>
          Retry
        </button>
      </section>
    );

  const record = query.data;
  const heading = String(
    record.title ??
      record.name ??
      record.domain ??
      record.key ??
      "Administrative record",
  );
  const entries = Object.entries(record).filter(
    ([key]) =>
      !["questions", "systemPrompt", "userPromptTemplate"].includes(key),
  );

  return (
    <div className={styles.page}>
      <header className={styles.detailHero}>
        <div>
          <span>{kind.replaceAll("_", " ")}: Detail</span>
          <h1>{heading}</h1>
        </div>
        <Link href={collectionPath(kind)}>Back to records</Link>
      </header>
      <dl className={styles.dossier}>
        {entries.map(([key, value]) => (
          <div key={key}>
            <dt>{key.replaceAll(/([A-Z])/g, " $1")}</dt>
            <dd>
              {typeof value === "object"
                ? JSON.stringify(value)
                : String(value ?? "Unavailable")}
            </dd>
          </div>
        ))}
      </dl>
      <section className={styles.actionSection}>
        <span>Audited action</span>
        <h2>Record an explicit operational decision.</h2>
        {kind === "feedback" && (
          <label>
            Resolution
            <textarea
              value={resolution}
              onChange={(event) => setResolution(event.target.value)}
            />
          </label>
        )}
        <label>
          Audit reason
          <textarea
            value={reason}
            onChange={(event) => setReason(event.target.value)}
          />
        </label>
        {action.isError && <p role="alert">{action.error.message}</p>}
        <div className={styles.actionRow}>
          {kind === "publishers" && (
            <button
              disabled={action.isPending}
              onClick={() => action.mutate("REVIEWED")}
              type="button"
            >
              Mark reviewed: unknown
            </button>
          )}
          {kind === "feedback" &&
            ["IN_REVIEW", "RESOLVED", "DISMISSED"].map((status) => (
              <button
                disabled={action.isPending}
                key={status}
                onClick={() => action.mutate(status)}
                type="button"
              >
                {status.replaceAll("_", " ")}
              </button>
            ))}
          {kind === "prompts" &&
            ["publish", "rollback"].map((operation) => (
              <button
                disabled={action.isPending}
                key={operation}
                onClick={() => action.mutate(operation)}
                type="button"
              >
                {operation}
              </button>
            ))}
          {kind === "badges" && (
            <button
              disabled={action.isPending}
              onClick={() => action.mutate("ARCHIVED")}
              type="button"
            >
              Archive badge
            </button>
          )}
          {["courses", "lessons", "quizzes", "challenges"].includes(kind) &&
            (kind === "courses" || kind === "lessons"
              ? ["DRAFT", "IN_REVIEW", "PUBLISHED", "ARCHIVED"]
              : kind === "challenges"
                ? ["DRAFT", "SCHEDULED", "PUBLISHED", "EXPIRED", "ARCHIVED"]
                : ["DRAFT", "PUBLISHED", "ARCHIVED"]
            ).map((status) => (
              <button
                disabled={action.isPending}
                key={status}
                onClick={() => action.mutate(status)}
                type="button"
              >
                {status}
              </button>
            ))}
        </div>
      </section>
    </div>
  );
}
