"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { VERIFICATION_STAGE_GROUPS as displayStages, TERMINAL_VERIFICATION_STATUSES as terminalStatuses } from "@/data/verification";
import {
  verificationService,
  type VerificationRecord,
} from "@/services/verification";
import { verificationDetailStyles as styles } from "./detail.styles";
import ReportDocument from "./ReportDocument";
import { currentVerificationStageIndex as currentStageIndex, formatVerificationTimestamp as formatTimestamp } from "@/utils/verification";

export default function VerificationDetail({ id }: { id: string }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [actionDialog, setActionDialog] = useState<
    "cancel" | "retry" | "reprocess" | "delete" | null
  >(null);
  const [streamState, setStreamState] = useState<
    "connecting" | "live" | "fallback"
  >("connecting");
  const verification = useQuery({
    queryFn: () => verificationService.get(id),
    queryKey: ["verification", id],
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      return status && terminalStatuses.includes(status)
        ? false
        : streamState === "live"
          ? 15_000
          : 3_000;
    },
  });
  const events = useQuery({
    enabled: Boolean(verification.data),
    queryFn: () => verificationService.listEvents(id),
    queryKey: ["verification-events", id],
    refetchInterval: verification.data
      ? terminalStatuses.includes(verification.data.status)
        ? false
        : 4_000
      : false,
  });
  const cancel = useMutation({
    mutationFn: () => verificationService.cancel(id),
    onSuccess: (record) => {
      queryClient.setQueryData(["verification", id], record);
    },
  });
  const retry = useMutation({
    mutationFn: () => verificationService.retry(id),
    onSuccess: (record) => {
      queryClient.setQueryData(["verification", id], record);
      void queryClient.invalidateQueries({
        queryKey: ["verification-events", id],
      });
    },
  });
  const reprocess = useMutation({
    mutationFn: () => verificationService.reprocess(id),
    onSuccess: (record) => {
      queryClient.setQueryData(["verification", id], record);
      void queryClient.invalidateQueries({
        queryKey: ["verification-events", id],
      });
      void queryClient.invalidateQueries({ queryKey: ["report", id] });
    },
  });
  const remove = useMutation({
    mutationFn: () => verificationService.remove(id),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["verification", id] });
      queryClient.removeQueries({ queryKey: ["verification-events", id] });
      void queryClient.invalidateQueries({ queryKey: ["verifications"] });
      router.replace("/app/verifications");
    },
  });
  const verificationStatus = verification.data?.status;

  useEffect(() => {
    if (!verificationStatus || terminalStatuses.includes(verificationStatus))
      return;

    const controller = new AbortController();
    const existingEvents =
      queryClient.getQueryData<
        Awaited<ReturnType<typeof verificationService.listEvents>>
      >(["verification-events", id]) ?? [];
    const after = existingEvents.at(-1)?.sequence ?? 0;

    void verificationService
      .streamEvents({
        after,
        id,
        onEvent: (event) => {
          queryClient.setQueryData(
            ["verification-events", id],
            (
              current:
                | Awaited<ReturnType<typeof verificationService.listEvents>>
                | undefined,
            ) => {
              const events = current ?? [];
              return events.some((item) => item.sequence === event.sequence)
                ? events
                : [...events, event].sort((a, b) => a.sequence - b.sequence);
            },
          );
          queryClient.setQueryData(
            ["verification", id],
            (current: VerificationRecord | undefined) =>
              current
                ? {
                    ...current,
                    currentStage: event.stage,
                    progress: event.progress,
                    updatedAt: event.occurredAt,
                  }
                : current,
          );
          if (event.stage === "COMPLETED") {
            void queryClient.invalidateQueries({
              queryKey: ["verification", id],
            });
          }
        },
        onOpen: () => setStreamState("live"),
        signal: controller.signal,
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setStreamState("fallback");
      });

    return () => controller.abort();
  }, [id, queryClient, verificationStatus]);

  if (verification.isPending) {
    return (
      <div className={styles.loading} aria-busy="true">
        <span>Case: {id}</span>
        <h1>Opening investigation…</h1>
        <div />
        <div />
        <div />
      </div>
    );
  }

  if (verification.isError) {
    return (
      <div className={styles.error} role="alert">
        <span>Case unavailable</span>
        <h1>The investigation could not be opened.</h1>
        <p>{verification.error.message}</p>
        <button type="button" onClick={() => void verification.refetch()}>
          Retry
        </button>
        <Link href="/app/verifications">Return to history</Link>
      </div>
    );
  }

  const record = verification.data;
  const activeStage = currentStageIndex(record);
  const canCancel = ["QUEUED", "PROCESSING"].includes(record.status);
  const canRetry = ["FAILED", "CANCELLED"].includes(record.status);
  const canReprocess = ["COMPLETED", "PARTIALLY_COMPLETED"].includes(
    record.status,
  );
  const canDelete = ![
    "QUEUED",
    "PROCESSING",
    "CANCEL_REQUESTED",
    "DELETED",
  ].includes(record.status);
  const processing = !terminalStatuses.includes(record.status);
  const actionPending =
    cancel.isPending ||
    retry.isPending ||
    reprocess.isPending ||
    remove.isPending;
  const actionError =
    cancel.error ?? retry.error ?? reprocess.error ?? remove.error;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.caseIdentity}>
          <span>Investigation</span>
          <strong>Case: {record.id}</strong>
        </div>
        <div className={styles.status} data-status={record.status}>
          <span>{record.status}</span>
          <strong>{record.currentStage.replaceAll("_", " ")}</strong>
        </div>
        <div className={styles.actions}>
          {canCancel && (
            <button
              data-variant="danger"
              type="button"
              disabled={cancel.isPending}
              onClick={() => setActionDialog("cancel")}
            >
              {cancel.isPending ? "Requesting…" : "Cancel"}
            </button>
          )}
          {canRetry && (
            <button
              data-variant="primary"
              type="button"
              disabled={retry.isPending}
              onClick={() => setActionDialog("retry")}
            >
              {retry.isPending ? "Re-queuing…" : "Retry"}
            </button>
          )}
          {canReprocess && (
            <button
              data-variant="primary"
              disabled={reprocess.isPending}
              onClick={() => setActionDialog("reprocess")}
              type="button"
            >
              {reprocess.isPending ? "Re-queuing…" : "Reprocess"}
            </button>
          )}
          {canDelete && (
            <button
              data-variant="danger"
              type="button"
              onClick={() => setActionDialog("delete")}
            >
              Delete
            </button>
          )}
          <Link href="/app/verifications">History</Link>
        </div>
      </header>

      <section className={styles.summary}>
        <div>
          <span>{record.sourceType}</span>
          <h1>{record.title || "Untitled investigation"}</h1>
          {record.question && <p>{record.question}</p>}
        </div>
        <dl>
          <div>
            <dt>Created</dt>
            <dd>{formatTimestamp(record.createdAt)}</dd>
          </div>
          <div>
            <dt>Visibility</dt>
            <dd>{record.visibility}</dd>
          </div>
          <div>
            <dt>Claims</dt>
            <dd>{record.claimsCount}</dd>
          </div>
          <div>
            <dt>Evidence records</dt>
            <dd>{record.evidenceCount}</dd>
          </div>
        </dl>
      </section>

      {["COMPLETED", "PARTIALLY_COMPLETED"].includes(record.status) && (
        <ReportDocument verificationId={record.id} />
      )}

      <div className={styles.processingGrid}>
        <section className={styles.stagePanel}>
          <div className={styles.panelHeader}>
            <span>Processing rail</span>
            <span>
              {processing
                ? streamState === "live"
                  ? "Live updates"
                  : streamState === "connecting"
                    ? "Connecting"
                    : "Polling fallback"
                : record.status}
            </span>
          </div>
          <div
            className={styles.progress}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={record.progress}
            aria-label="Investigation progress"
          >
            <span style={{ width: `${record.progress}%` }} />
          </div>
          <ol className={styles.stageRail}>
            {displayStages.map((stage, index) => {
              const stageState =
                index < activeStage
                  ? "complete"
                  : index === activeStage
                    ? "active"
                    : "pending";
              return (
                <li data-state={stageState} key={stage.label}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{stage.label}</strong>
                  <small>{stageState}</small>
                </li>
              );
            })}
          </ol>
        </section>

        <aside className={styles.eventPanel}>
          <div className={styles.panelHeader}>
            <span>Operational events</span>
            <span>{events.data?.length ?? 0} records</span>
          </div>
          {events.isPending && <p>Loading persisted events…</p>}
          {events.isError && (
            <div className={styles.eventError}>
              <p>Events are temporarily unavailable.</p>
              <button type="button" onClick={() => void events.refetch()}>
                Retry
              </button>
            </div>
          )}
          {events.data?.length === 0 && (
            <p>No persisted processing events are available yet.</p>
          )}
          {events.data && events.data.length > 0 && (
            <ol className={styles.events}>
              {[...events.data].reverse().map((event) => (
                <li key={`${event.sequence}-${event.occurredAt}`}>
                  <span>{String(event.sequence).padStart(2, "0")}</span>
                  <div>
                    <strong>{event.stage.replaceAll("_", " ")}</strong>
                    <p>{event.safeMessage || event.status}</p>
                    <small>{formatTimestamp(event.occurredAt)}</small>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </aside>
      </div>

      {record.status === "FAILED" && (
        <section className={styles.failure} role="alert">
          <span>{record.failureCode || "PROCESSING_FAILED"}</span>
          <h2>The investigation did not complete.</h2>
          <p>
            {record.failureSummary ||
              "No safe failure summary was returned by the service."}
          </p>
        </section>
      )}

      {actionDialog && (
        <div
          aria-labelledby="verification-action-title"
          aria-modal="true"
          className={styles.dialogBackdrop}
          role="dialog"
        >
          <section className={styles.dialog}>
            <header>
              <span>Case: {record.id}</span>
              <button
                aria-label="Close dialog"
                disabled={actionPending}
                onClick={() => setActionDialog(null)}
                type="button"
              >
                ×
              </button>
            </header>
            <h2 id="verification-action-title">
              {actionDialog === "cancel"
                ? "Cancel this investigation?"
                : actionDialog === "retry"
                  ? "Run this investigation again?"
                  : actionDialog === "reprocess"
                    ? "Create a new report version?"
                  : "Delete this investigation?"}
            </h2>
            <p>
              {actionDialog === "cancel"
                ? "Processing will stop and the case will remain in your archive. You can retry it later."
                : actionDialog === "retry"
                  ? "The backend will enqueue a new processing attempt and preserve the case history."
                  : actionDialog === "reprocess"
                    ? "The completed case will run through the evidence pipeline again. Existing report versions remain inspectable while the new version is assembled."
                  : "This removes the case from your active archive. The backend records it as deleted and it cannot be opened afterward."}
            </p>
            {actionError && (
              <p className={styles.dialogError} role="alert">
                {actionError.message}
              </p>
            )}
            <footer>
              <button
                disabled={actionPending}
                onClick={() => setActionDialog(null)}
                type="button"
              >
                Keep case
              </button>
              <button
                data-danger={actionDialog !== "retry"}
                disabled={actionPending}
                onClick={() => {
                  if (actionDialog === "cancel") {
                    cancel.mutate(undefined, {
                      onSuccess: () => setActionDialog(null),
                    });
                  } else if (actionDialog === "retry") {
                    retry.mutate(undefined, {
                      onSuccess: () => setActionDialog(null),
                    });
                  } else if (actionDialog === "reprocess") {
                    reprocess.mutate(undefined, {
                      onSuccess: () => setActionDialog(null),
                    });
                  } else {
                    remove.mutate();
                  }
                }}
                type="button"
              >
                {actionPending
                  ? "Working…"
                  : actionDialog === "cancel"
                    ? "Cancel investigation"
                    : actionDialog === "retry"
                      ? "Retry investigation"
                      : actionDialog === "reprocess"
                        ? "Reprocess investigation"
                      : "Delete investigation"}
              </button>
            </footer>
          </section>
        </div>
      )}
    </div>
  );
}
