"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  reportService,
  type ReportFeedbackType,
  type ReportProblemCategory,
  type ReportVisibility,
  type VerificationReport,
} from "@/services/reports";
import { reportActionStyles as styles } from "./report-actions.styles";

type Panel = "visibility" | "export" | "feedback" | "delete" | null;

const problemCategories: ReportProblemCategory[] = [
  "INCORRECT_VERDICT",
  "MISSING_CONTEXT",
  "BROKEN_SOURCE",
  "UNSAFE_CONTENT",
  "PRIVACY_CONCERN",
  "OTHER",
];

function humanize(value: string) {
  return value.replaceAll("_", " ").toLowerCase();
}

export default function ReportActions({
  report,
  verificationId,
}: {
  report: VerificationReport;
  verificationId: string;
}) {
  const queryClient = useQueryClient();
  const [panel, setPanel] = useState<Panel>(null);
  const [visibility, setVisibility] = useState<ReportVisibility>(
    report.visibility as ReportVisibility,
  );
  const [feedbackType, setFeedbackType] =
    useState<ReportFeedbackType>("HELPFUL");
  const [category, setCategory] =
    useState<ReportProblemCategory>("INCORRECT_VERDICT");
  const [comment, setComment] = useState("");
  const [notice, setNotice] = useState<string>();

  const updateCachedReport = (next: VerificationReport) => {
    queryClient.setQueryData(["report", verificationId, "latest"], next);
  };

  const visibilityMutation = useMutation({
    mutationFn: () => reportService.setVisibility(report.id!, visibility),
    onSuccess: (next) => {
      updateCachedReport(next);
      setNotice(
        next.visibility === "PRIVATE"
          ? "The report is private."
          : "The share link is active.",
      );
      setPanel(null);
    },
  });
  const revokeMutation = useMutation({
    mutationFn: () => reportService.revoke(report.id!),
    onSuccess: (next) => {
      updateCachedReport(next);
      setNotice("Public access has been revoked.");
      setPanel(null);
    },
  });
  const exportMutation = useMutation({
    mutationFn: (format: "pdf" | "json") =>
      reportService.export(report.id!, format),
    onSuccess: ({ blob, filename }, format) => {
      const objectUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = objectUrl;
      anchor.download = filename ?? `verith-report-v${report.version}.${format}`;
      anchor.click();
      URL.revokeObjectURL(objectUrl);
      setNotice(`${format.toUpperCase()} export downloaded.`);
      setPanel(null);
    },
  });
  const feedbackMutation = useMutation({
    mutationFn: () =>
      reportService.feedback(report.id!, {
        type: feedbackType,
        ...(feedbackType === "PROBLEM_REPORTED" ? { category } : {}),
        ...(comment.trim() ? { comment: comment.trim() } : {}),
      }),
    onSuccess: () => {
      setNotice("Your report feedback was saved.");
      setPanel(null);
      setComment("");
    },
  });
  const deleteMutation = useMutation({
    mutationFn: () => reportService.remove(report.id!),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["report", verificationId],
      });
      setNotice(`Report version ${report.version} was deleted.`);
      setPanel(null);
    },
  });

  const shareUrl =
    report.publicSlug && typeof window !== "undefined"
      ? `${window.location.origin}/reports/${report.publicSlug}`
      : undefined;
  const mutationError =
    visibilityMutation.error ??
    revokeMutation.error ??
    exportMutation.error ??
    feedbackMutation.error ??
    deleteMutation.error;
  const busy =
    visibilityMutation.isPending ||
    revokeMutation.isPending ||
    exportMutation.isPending ||
    feedbackMutation.isPending ||
    deleteMutation.isPending;

  return (
    <div className={styles.actionsRegion}>
      <div className={styles.actions}>
        <button
          type="button"
          onClick={() => {
            setVisibility((report.visibility ?? "PRIVATE") as ReportVisibility);
            setPanel("visibility");
          }}
        >
          {report.visibility === "PRIVATE" ? "Share" : "Manage sharing"}
        </button>
        <button type="button" onClick={() => setPanel("export")}>
          Export
        </button>
        <button type="button" onClick={() => setPanel("feedback")}>
          Feedback
        </button>
        <button type="button" onClick={() => setPanel("delete")}>
          Delete report
        </button>
      </div>
      {notice && (
        <p className={styles.notice} role="status">
          {notice}
        </p>
      )}

      {panel && (
        <div
          aria-labelledby={`${panel}-dialog-title`}
          aria-modal="true"
          className={styles.backdrop}
          role="dialog"
        >
          <section className={styles.dialog}>
            <header>
              <span>Report: {report.id}</span>
              <button
                aria-label="Close dialog"
                disabled={busy}
                onClick={() => setPanel(null)}
                type="button"
              >
                ×
              </button>
            </header>

            {panel === "visibility" && (
              <>
                <h2 id="visibility-dialog-title">Control report access.</h2>
                <p>
                  Private reports are visible only to you. Unlisted reports can
                  be opened by anyone with the link. Public reports may be
                  intentionally discoverable.
                </p>
                <fieldset>
                  <legend>Visibility</legend>
                  {(["PRIVATE", "UNLISTED", "PUBLIC"] as const).map((value) => (
                    <label key={value}>
                      <input
                        checked={visibility === value}
                        name="report-visibility"
                        onChange={() => setVisibility(value)}
                        type="radio"
                      />
                      <span>
                        <strong>{humanize(value)}</strong>
                        <small>
                          {value === "PRIVATE"
                            ? "No public link."
                            : value === "UNLISTED"
                              ? "Only people with the link."
                              : "Publicly accessible by its link."}
                        </small>
                      </span>
                    </label>
                  ))}
                </fieldset>
                {shareUrl && report.visibility !== "PRIVATE" && (
                  <div className={styles.shareLink}>
                    <span>Current share link</span>
                    <code>{shareUrl}</code>
                    <button
                      type="button"
                      onClick={() => {
                        void navigator.clipboard.writeText(shareUrl);
                        setNotice("Share link copied.");
                      }}
                    >
                      Copy link
                    </button>
                  </div>
                )}
                {mutationError && (
                  <p className={styles.error} role="alert">
                    {mutationError.message}
                  </p>
                )}
                <footer>
                  {report.visibility !== "PRIVATE" && (
                    <button
                      className={styles.danger}
                      disabled={busy}
                      onClick={() => revokeMutation.mutate()}
                      type="button"
                    >
                      {revokeMutation.isPending
                        ? "Revoking…"
                        : "Revoke existing link"}
                    </button>
                  )}
                  <button
                    disabled={busy}
                    onClick={() => visibilityMutation.mutate()}
                    type="button"
                  >
                    {visibilityMutation.isPending
                      ? "Saving…"
                      : "Apply visibility"}
                  </button>
                </footer>
              </>
            )}

            {panel === "export" && (
              <>
                <h2 id="export-dialog-title">Export this report.</h2>
                <p>
                  Exports contain the backend’s public-safe report projection.
                  Choose a readable PDF or structured JSON file.
                </p>
                {mutationError && (
                  <p className={styles.error} role="alert">
                    {mutationError.message}
                  </p>
                )}
                <div className={styles.exportChoices}>
                  <button
                    disabled={busy}
                    onClick={() => exportMutation.mutate("pdf")}
                    type="button"
                  >
                    <strong>PDF document</strong>
                    <span>Formatted evidence report</span>
                  </button>
                  <button
                    disabled={busy}
                    onClick={() => exportMutation.mutate("json")}
                    type="button"
                  >
                    <strong>JSON data</strong>
                    <span>Machine-readable report</span>
                  </button>
                </div>
              </>
            )}

            {panel === "feedback" && (
              <>
                <h2 id="feedback-dialog-title">Review this report.</h2>
                <p>
                  Feedback is attached to this report and replaces your
                  previous response if one already exists.
                </p>
                <label className={styles.field}>
                  <span>Assessment</span>
                  <select
                    value={feedbackType}
                    onChange={(event) =>
                      setFeedbackType(event.target.value as ReportFeedbackType)
                    }
                  >
                    <option value="HELPFUL">Helpful</option>
                    <option value="NOT_HELPFUL">Not helpful</option>
                    <option value="PROBLEM_REPORTED">Report a problem</option>
                  </select>
                </label>
                {feedbackType === "PROBLEM_REPORTED" && (
                  <label className={styles.field}>
                    <span>Problem category</span>
                    <select
                      value={category}
                      onChange={(event) =>
                        setCategory(
                          event.target.value as ReportProblemCategory,
                        )
                      }
                    >
                      {problemCategories.map((value) => (
                        <option key={value} value={value}>
                          {humanize(value)}
                        </option>
                      ))}
                    </select>
                  </label>
                )}
                <label className={styles.field}>
                  <span>Comment (optional)</span>
                  <textarea
                    maxLength={2000}
                    onChange={(event) => setComment(event.target.value)}
                    rows={5}
                    value={comment}
                  />
                  <small>{comment.length}: 2000</small>
                </label>
                {mutationError && (
                  <p className={styles.error} role="alert">
                    {mutationError.message}
                  </p>
                )}
                <footer>
                  <button
                    disabled={busy}
                    onClick={() => feedbackMutation.mutate()}
                    type="button"
                  >
                    {feedbackMutation.isPending
                      ? "Saving feedback…"
                      : "Submit feedback"}
                  </button>
                </footer>
              </>
            )}

            {panel === "delete" && (
              <>
                <h2 id="delete-dialog-title">
                  Delete report version {report.version}?
                </h2>
                <p>
                  This permanently removes this report version from your
                  accessible history and immediately revokes any public link.
                  The investigation and its evidence remain available.
                </p>
                {mutationError && (
                  <p className={styles.error} role="alert">
                    {mutationError.message}
                  </p>
                )}
                <footer>
                  <button
                    disabled={busy}
                    onClick={() => setPanel(null)}
                    type="button"
                  >
                    Keep report
                  </button>
                  <button
                    className={styles.danger}
                    disabled={busy}
                    onClick={() => deleteMutation.mutate()}
                    type="button"
                  >
                    {deleteMutation.isPending
                      ? "Deleting…"
                      : "Delete report version"}
                  </button>
                </footer>
              </>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
