"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { adminService } from "@/services/admin";
import { adminStyles as styles } from "../admin.styles";

export default function AuditLogLedger() {
  const [draftAction, setDraftAction] = useState("");
  const [draftResource, setDraftResource] = useState("");
  const [action, setAction] = useState("");
  const [resourceType, setResourceType] = useState("");
  const [cursors, setCursors] = useState<string[]>([]);
  const cursor = cursors.at(-1);
  const records = useQuery({
    queryFn: () =>
      adminService.auditLogs({
        action: action || undefined,
        cursor,
        resourceType: resourceType || undefined,
      }),
    queryKey: ["admin", "audit-logs", action, cursor, resourceType],
    retry: false,
  });
  const invalidFilter =
    (draftAction.trim().length > 0 && draftAction.trim().length < 2) ||
    (draftResource.trim().length > 0 && draftResource.trim().length < 2);

  return (
    <div className={styles.page}>
      <header className={styles.listHero}>
        <span>Governance / Append-only audit record</span>
        <h1>Every privileged intervention remains inspectable.</h1>
        <p>
          This super-administrator view contains safe before-and-after
          projections, request identifiers, actors, resources, and required
          reasons. Credential and private input data are not recorded here.
        </p>
      </header>

      <form
        className={styles.filters}
        onSubmit={(event) => {
          event.preventDefault();
          if (invalidFilter) return;
          setAction(draftAction.trim());
          setResourceType(draftResource.trim());
          setCursors([]);
        }}
      >
        <label>
          Exact action
          <input
            minLength={2}
            onChange={(event) => setDraftAction(event.target.value)}
            placeholder="USER_STATUS_CHANGED"
            value={draftAction}
          />
        </label>
        <label>
          Exact resource type
          <input
            minLength={2}
            onChange={(event) => setDraftResource(event.target.value)}
            placeholder="USER"
            value={draftResource}
          />
        </label>
        <button disabled={invalidFilter} type="submit">
          Apply exact filters
        </button>
      </form>

      {records.isPending ? (
        <div className={styles.tableLoading} aria-busy="true">
          Loading append-only records…
        </div>
      ) : records.isError ? (
        <section className={styles.inlineError} role="alert">
          <div>
            <span>Audit record unavailable</span>
            <p>{records.error.message}</p>
          </div>
          <button type="button" onClick={() => void records.refetch()}>
            Retry
          </button>
        </section>
      ) : records.data.items.length === 0 ? (
        <section className={styles.listEmpty}>
          <span>No matching audit records</span>
          <h2>The exact server-side filters returned no interventions.</h2>
        </section>
      ) : (
        <ol className={styles.auditLedger}>
          {records.data.items.map((record) => (
            <li key={record.id}>
              <header>
                <div>
                  <span>{record.action.replaceAll("_", " ")}</span>
                  <strong>
                    {record.resourceType} / {record.resourceId}
                  </strong>
                </div>
                <time dateTime={record.createdAt}>
                  {new Date(record.createdAt).toLocaleString()}
                </time>
              </header>
              <dl>
                <div>
                  <dt>Actor</dt>
                  <dd>
                    {record.actorRole} / {record.actorId}
                  </dd>
                </div>
                <div>
                  <dt>Request</dt>
                  <dd>{record.requestId}</dd>
                </div>
                <div>
                  <dt>Reason</dt>
                  <dd>{record.reason}</dd>
                </div>
              </dl>
              {(record.safeBefore || record.safeAfter) && (
                <details>
                  <summary>Inspect safe state change</summary>
                  <div>
                    <section>
                      <span>Before</span>
                      <pre>
                        {JSON.stringify(record.safeBefore, null, 2) ||
                          "Unavailable"}
                      </pre>
                    </section>
                    <section>
                      <span>After</span>
                      <pre>
                        {JSON.stringify(record.safeAfter, null, 2) ||
                          "Unavailable"}
                      </pre>
                    </section>
                  </div>
                </details>
              )}
            </li>
          ))}
        </ol>
      )}

      {records.data &&
        (cursors.length > 0 || records.data.pagination.hasNextPage) && (
          <nav className={styles.pagination} aria-label="Audit result pages">
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
    </div>
  );
}
