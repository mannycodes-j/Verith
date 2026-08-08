"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { adminService } from "@/services/admin";
import { adminStyles as styles } from "../../admin.styles";

export default function AdminVerificationDetail({ id }: { id: string }) {
  const queryClient = useQueryClient();
  const [confirmRetry, setConfirmRetry] = useState(false);
  const [reason, setReason] = useState("");
  const record = useQuery({
    queryFn: () => adminService.verification(id),
    queryKey: ["admin", "verification", id],
    retry: false,
  });
  const retry = useMutation({
    mutationFn: () => adminService.retryVerification(id, reason.trim()),
    onSuccess: (next) => {
      queryClient.setQueryData(["admin", "verification", id], next);
      void queryClient.invalidateQueries({
        queryKey: ["admin", "verifications"],
      });
      setConfirmRetry(false);
      setReason("");
    },
  });

  if (record.isPending) {
    return <div className={styles.tableLoading}>Opening lifecycle record…</div>;
  }
  if (record.isError) {
    return (
      <section className={styles.error} role="alert">
        <span>Verification record unavailable</span>
        <h1>This lifecycle record could not be inspected.</h1>
        <p>{record.error.message}</p>
        <button type="button" onClick={() => void record.refetch()}>
          Retry
        </button>
      </section>
    );
  }

  const verification = record.data;
  const retryable = verification.status === "FAILED";
  return (
    <div className={styles.page}>
      <header className={styles.detailHero}>
        <div>
          <span>Verification: {verification.id}</span>
          <h1>{verification.sourceType.replaceAll("_", " ")}</h1>
          <p>
            Safe lifecycle metadata only. Submitted text, media, and extracted
            private input are excluded by the administrative projection.
          </p>
        </div>
        <Link href="/admin/verifications">Return to operations</Link>
      </header>
      <dl className={styles.dossier}>
        <div>
          <dt>Status</dt>
          <dd>{verification.status.replaceAll("_", " ")}</dd>
        </div>
        <div>
          <dt>Current stage</dt>
          <dd>{verification.currentStage.replaceAll("_", " ")}</dd>
        </div>
        <div>
          <dt>Reported progress</dt>
          <dd>{verification.progress}%</dd>
        </div>
        <div>
          <dt>Claims</dt>
          <dd>{verification.claimsCount}</dd>
        </div>
        <div>
          <dt>Evidence records</dt>
          <dd>{verification.evidenceCount}</dd>
        </div>
        <div>
          <dt>Retries</dt>
          <dd>{verification.retryCount}</dd>
        </div>
        <div>
          <dt>User ID</dt>
          <dd>{verification.userId}</dd>
        </div>
        <div>
          <dt>Failure code</dt>
          <dd>{verification.failureCode || "None recorded"}</dd>
        </div>
        <div>
          <dt>Created</dt>
          <dd>{new Date(verification.createdAt).toLocaleString()}</dd>
        </div>
      </dl>
      <section className={styles.actionSection}>
        <header>
          <span>Pipeline intervention</span>
          <p>
            Only failed records can be retried. Every intervention
            requires an operational reason and is audit logged.
          </p>
        </header>
        {retryable && (
          <div>
            <button onClick={() => setConfirmRetry(true)} type="button">
              Retry verification
            </button>
          </div>
        )}
      </section>
      {confirmRetry && (
        <div className={styles.dialogBackdrop}>
          <section
            aria-labelledby="admin-detail-retry"
            aria-modal="true"
            className={styles.retryDialog}
            role="dialog"
          >
            <span>Audited pipeline retry</span>
            <h2 id="admin-detail-retry">
              Requeue verification {verification.id}?
            </h2>
            <p>
              The backend will create a new queue attempt and preserve the
              existing lifecycle record.
            </p>
            <label>
              Operational reason
              <textarea
                autoFocus
                minLength={10}
                onChange={(event) => setReason(event.target.value)}
                value={reason}
              />
            </label>
            {retry.isError && <p role="alert">{retry.error.message}</p>}
            <footer>
              <button
                disabled={retry.isPending}
                onClick={() => setConfirmRetry(false)}
                type="button"
              >
                Cancel
              </button>
              <button
                disabled={retry.isPending || reason.trim().length < 10}
                onClick={() => retry.mutate()}
                type="button"
              >
                {retry.isPending ? "Requeueing…" : "Confirm retry"}
              </button>
            </footer>
          </section>
        </div>
      )}
    </div>
  );
}
