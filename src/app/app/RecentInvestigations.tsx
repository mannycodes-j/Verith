"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { verificationService } from "@/services/verification";
import { workspaceStyles as styles } from "./workspace.styles";

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.valueOf())
    ? "Date unavailable"
    : new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(date);
}

export default function RecentInvestigations() {
  const recent = useQuery({
    queryFn: () => verificationService.list({ limit: 5 }),
    queryKey: ["verifications", { limit: 5 }],
  });

  if (recent.isPending) {
    return (
      <div className={styles.recentLoading} aria-busy="true">
        <span>Loading recent cases</span>
        {[0, 1, 2].map((item) => (
          <div key={item} />
        ))}
      </div>
    );
  }

  if (recent.isError) {
    return (
      <div className={styles.recentError} role="alert">
        <span>Recent cases unavailable</span>
        <p>{recent.error.message}</p>
        <button type="button" onClick={() => void recent.refetch()}>
          Retry
        </button>
      </div>
    );
  }

  if (recent.data.items.length === 0) {
    return (
      <div className={styles.emptyState}>
        <span>No investigations yet</span>
        <h2>Your evidence record starts here.</h2>
        <p>
          Create an investigation to begin a real case history. Verith does not
          seed this workspace with demonstration reports.
        </p>
      </div>
    );
  }

  return (
    <ol className={styles.recentList}>
      {recent.data.items.map((record) => (
        <li key={record.id}>
          <Link href={`/app/verifications/${record.id}`}>
            <div>
              <span>Case: {record.id}</span>
              <strong>{record.title || "Untitled investigation"}</strong>
            </div>
            <dl>
              <div>
                <dt>Source</dt>
                <dd>{record.sourceType}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd data-status={record.status}>
                  {record.status.replaceAll("_", " ")}
                </dd>
              </div>
              <div>
                <dt>Evidence</dt>
                <dd>{record.evidenceCount}</dd>
              </div>
              <div>
                <dt>Updated</dt>
                <dd>{formatDate(record.updatedAt)}</dd>
              </div>
            </dl>
          </Link>
        </li>
      ))}
    </ol>
  );
}
