"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import {
  adminService,
  type AdminRecord,
  type CursorPage,
} from "@/services/admin";
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

const copy: Record<Kind, { eyebrow: string; title: string; description: string }> =
  {
    publishers: {
      eyebrow: "Source governance",
      title: "Publisher records.",
      description:
        "Review discovered domains and record bounded, attributable credibility overrides.",
    },
    feedback: {
      eyebrow: "Report moderation",
      title: "Feedback queue.",
      description:
        "Inspect persisted report feedback and record an audited moderation outcome.",
    },
    courses: {
      eyebrow: "Learning editorial",
      title: "Course records.",
      description:
        "Draft, review, publish, and archive the structured learning catalog.",
    },
    lessons: {
      eyebrow: "Learning editorial",
      title: "Lesson records.",
      description:
        "Inspect lesson status and open the full editorial record.",
    },
    quizzes: {
      eyebrow: "Assessment editorial",
      title: "Quiz records.",
      description:
        "Manage real assessment definitions without exposing answers publicly.",
    },
    challenges: {
      eyebrow: "Challenge editorial",
      title: "Challenge records.",
      description:
        "Inspect publication windows, status, and persisted challenge definitions.",
    },
    prompts: {
      eyebrow: "AI governance",
      title: "Prompt registry.",
      description:
        "Inspect versioned prompts and control publication through super-admin audited actions.",
    },
    badges: {
      eyebrow: "Gamification governance",
      title: "Badge definitions.",
      description:
        "Inspect real issuance criteria and deactivate obsolete rewards without rewriting user history.",
    },
  };

function getRecords(kind: Kind): Promise<CursorPage<AdminRecord>> {
  if (kind === "publishers") return adminService.publishers();
  if (kind === "feedback") return adminService.feedback();
  if (kind === "prompts") return adminService.prompts();
  if (kind === "badges")
    return adminService.badges().then((items) => ({
      items,
      pagination: {
        hasNextPage: false,
        limit: items.length,
        nextCursor: null,
        previousCursor: null,
      },
    }));
  return adminService.contentRecords(kind);
}

function label(record: AdminRecord) {
  return (
    record.title ??
    record.name ??
    record.domain ??
    record.key ??
    record.slug ??
    record.id ??
    record._id
  );
}

export default function AdminCollection({ kind }: { kind: Kind }) {
  const query = useQuery({
    queryFn: () => getRecords(kind),
    queryKey: ["admin", kind],
    retry: false,
  });
  const content = copy[kind];

  return (
    <div className={styles.page}>
      <header className={styles.listHero}>
        <div>
          <span>{content.eyebrow}</span>
          <h1>{content.title}</h1>
        </div>
        <p>{content.description}</p>
      </header>
      {query.isPending && (
        <div className={styles.tableLoading} aria-busy="true">
          Loading persisted records…
        </div>
      )}
      {query.isError && (
        <section className={styles.inlineError} role="alert">
          <span>Collection unavailable</span>
          <p>{query.error.message}</p>
          <button type="button" onClick={() => void query.refetch()}>
            Retry
          </button>
        </section>
      )}
      {query.data && query.data.items.length === 0 && (
        <section className={styles.listEmpty}>
          <span>Empty state</span>
          <h2>No records have been persisted.</h2>
        </section>
      )}
      {query.data && query.data.items.length > 0 && (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Record</th>
                <th>Status</th>
                <th>Reference</th>
                <th>Updated</th>
                <th>Inspect</th>
              </tr>
            </thead>
            <tbody>
              {query.data.items.map((record) => {
                const id = String(record._id ?? record.id);
                return (
                  <tr key={id}>
                    <td>
                      <strong>{String(label(record))}</strong>
                      <small>
                        {String(
                          record.slug ??
                            record.domain ??
                            record.key ??
                            "No public identifier",
                        )}
                      </small>
                    </td>
                    <td>
                      <span>
                        {String(
                          record.status ??
                            record.reviewStatus ??
                            "UNCLASSIFIED",
                        ).replaceAll("_", " ")}
                      </span>
                    </td>
                    <td>
                      <small>{id}</small>
                    </td>
                    <td>
                      <small>
                        {record.updatedAt
                          ? new Date(record.updatedAt).toLocaleString()
                          : "Unavailable"}
                      </small>
                    </td>
                    <td>
                      <Link href={`/admin/${kind}/${id}`}>Open record</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
