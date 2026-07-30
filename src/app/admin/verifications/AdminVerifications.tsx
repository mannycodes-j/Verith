"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { adminService, type AdminVerification } from "@/services/admin";
import { adminStyles as styles } from "../admin.styles";

const statuses = [
  "DRAFT",
  "QUEUED",
  "PROCESSING",
  "PARTIALLY_COMPLETED",
  "COMPLETED",
  "FAILED",
  "CANCEL_REQUESTED",
  "CANCELLED",
  "DELETED",
] as const;

const objectIdPattern = /^[a-f\d]{24}$/i;

export default function AdminVerifications() {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState("");
  const [draftUserId, setDraftUserId] = useState("");
  const [userId, setUserId] = useState("");
  const [cursors, setCursors] = useState<string[]>([]);
  const [retryRecord, setRetryRecord] = useState<AdminVerification>();
  const [reason, setReason] = useState("");
  const cursor = cursors.at(-1);
  const records = useQuery({
    queryFn: () =>
      adminService.verifications({
        cursor,
        status: status || undefined,
        userId: userId || undefined,
      }),
    queryKey: ["admin", "verifications", cursor, status, userId],
    retry: false,
  });
  const retry = useMutation({
    mutationFn: () =>
      adminService.retryVerification(retryRecord!.id, reason.trim()),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["admin", "verifications"],
      });
      setRetryRecord(undefined);
      setReason("");
    },
  });
  const invalidUserId =
    draftUserId.trim().length > 0 &&
    !objectIdPattern.test(draftUserId.trim());

  return (
    <div className={styles.page}>
      <header className={styles.listHero}>
        <span>Operations / Verification lifecycle</span>
        <h1>Inspect processing state without opening private input.</h1>
        <p>
          The administrative projection excludes submitted content. Retry is
          available only for failed or cancelled records and requires an audit
          reason.
        </p>
      </header>

      <form
        className={styles.filters}
        onSubmit={(event) => {
          event.preventDefault();
          if (invalidUserId) return;
          setUserId(draftUserId.trim());
          setCursors([]);
        }}
      >
        <label>
          Lifecycle status
          <select
            onChange={(event) => {
              setStatus(event.target.value);
              setCursors([]);
            }}
            value={status}
          >
            <option value="">All statuses</option>
            {statuses.map((item) => (
              <option key={item} value={item}>
                {item.replaceAll("_", " ")}
              </option>
            ))}
          </select>
        </label>
        <label>
          Exact user ID
          <input
            aria-invalid={invalidUserId}
            onChange={(event) => setDraftUserId(event.target.value)}
            placeholder="24-character MongoDB identifier"
            value={draftUserId}
          />
          {invalidUserId && <small>Enter a valid 24-character user ID.</small>}
        </label>
        <button disabled={invalidUserId} type="submit">
          Apply user filter
        </button>
      </form>

      {records.isPending ? (
        <div className={styles.tableLoading} aria-busy="true">
          Loading lifecycle records…
        </div>
      ) : records.isError ? (
        <section className={styles.inlineError} role="alert">
          <div>
            <span>Verification operations unavailable</span>
            <p>{records.error.message}</p>
          </div>
          <button type="button" onClick={() => void records.refetch()}>
            Retry
          </button>
        </section>
      ) : records.data.items.length === 0 ? (
        <section className={styles.listEmpty}>
          <span>No matching records</span>
          <h2>The current server-side filters returned no verifications.</h2>
        </section>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Verification</th>
                <th>Status / stage</th>
                <th>Evidence</th>
                <th>Retry state</th>
                <th>Created</th>
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {records.data.items.map((record) => (
                <tr key={record.id}>
                  <td>
                    <strong>{record.sourceType.replaceAll("_", " ")}</strong>
                    <small>ID / {record.id}</small>
                    <small>User / {record.userId}</small>
                  </td>
                  <td>
                    <span data-status={record.status}>{record.status}</span>
                    <small>{record.currentStage.replaceAll("_", " ")}</small>
                    <small>
                      {Number.isFinite(record.progress)
                        ? `${record.progress}% reported`
                        : "Progress unavailable"}
                    </small>
                  </td>
                  <td>
                    {record.claimsCount} claims
                    <small>{record.evidenceCount} evidence records</small>
                  </td>
                  <td>
                    {record.retryCount} retries
                    <small>{record.failureCode || "No failure code"}</small>
                  </td>
                  <td>{new Date(record.createdAt).toLocaleString()}</td>
                  <td>
                    <Link href={`/admin/verifications/${record.id}`}>
                      Inspect
                    </Link>
                    <button
                      disabled={
                        record.status !== "FAILED" &&
                        record.status !== "CANCELLED"
                      }
                      onClick={() => {
                        retry.reset();
                        setRetryRecord(record);
                      }}
                      type="button"
                    >
                      Retry
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {records.data &&
        (cursors.length > 0 || records.data.pagination.hasNextPage) && (
          <nav
            className={styles.pagination}
            aria-label="Verification result pages"
          >
            <button
              disabled={cursors.length === 0}
              onClick={() => setCursors((current) => current.slice(0, -1))}
              type="button"
            >
              Previous
            </button>
            <span>Cursor page {cursors.length + 1}</span>
            <button
              disabled={!records.data.pagination.nextCursor}
              onClick={() =>
                setCursors((current) => [
                  ...current,
                  records.data!.pagination.nextCursor!,
                ])
              }
              type="button"
            >
              Next
            </button>
          </nav>
        )}

      {retryRecord && (
        <div className={styles.dialogBackdrop}>
          <section
            aria-labelledby="retry-title"
            aria-modal="true"
            className={styles.retryDialog}
            onKeyDown={(event) => {
              if (event.key === "Escape" && !retry.isPending) {
                setRetryRecord(undefined);
                setReason("");
                retry.reset();
              }
            }}
            role="dialog"
          >
            <span>Pipeline intervention / Audited retry</span>
            <h2 id="retry-title">
              Requeue verification {retryRecord.id}?
            </h2>
            <dl>
              <div>
                <dt>Current status</dt>
                <dd>{retryRecord.status}</dd>
              </div>
              <div>
                <dt>Failure code</dt>
                <dd>{retryRecord.failureCode || "Unavailable"}</dd>
              </div>
              <div>
                <dt>Prior retries</dt>
                <dd>{retryRecord.retryCount}</dd>
              </div>
            </dl>
            <p>
              Verith will enqueue a new processing attempt. The existing record
              remains the source of truth and the intervention is audit logged.
            </p>
            <label>
              Operational reason
              <textarea
                autoFocus
                minLength={10}
                onChange={(event) => setReason(event.target.value)}
                placeholder="Explain why retrying is appropriate"
                value={reason}
              />
            </label>
            {retry.isError && <p role="alert">{retry.error.message}</p>}
            <footer>
              <button
                disabled={retry.isPending}
                onClick={() => {
                  setRetryRecord(undefined);
                  setReason("");
                  retry.reset();
                }}
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
