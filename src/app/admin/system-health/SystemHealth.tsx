"use client";

import { useQueries } from "@tanstack/react-query";
import { adminService, type ProviderHealth } from "@/services/admin";
import { adminStyles as styles } from "../admin.styles";

function ProviderList({
  records,
  title,
}: {
  records: ProviderHealth[];
  title: string;
}) {
  return (
    <section className={styles.healthRegion}>
      <header>
        <span>{title}</span>
        <small>{records.length} configured adapters inspected</small>
      </header>
      {records.length === 0 ? (
        <p>No provider adapters were returned by the backend.</p>
      ) : (
        <ol>
          {records.map((record) => (
            <li key={record.provider}>
              <strong>{record.provider}</strong>
              <span data-health={record.state}>{record.state}</span>
              <small>{record.latencyMs} ms</small>
              <time dateTime={record.checkedAt}>
                {new Date(record.checkedAt).toLocaleString()}
              </time>
              <small>{record.safeCode || "No provider code"}</small>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

export default function SystemHealth() {
  const [dependencies, ai, search] = useQueries({
    queries: [
      {
        queryFn: adminService.dependencyHealth,
        queryKey: ["admin", "health", "dependencies"],
        retry: false,
      },
      {
        queryFn: adminService.aiHealth,
        queryKey: ["admin", "health", "ai"],
        retry: false,
      },
      {
        queryFn: adminService.searchHealth,
        queryKey: ["admin", "health", "search"],
        retry: false,
      },
    ],
  });
  const pending = dependencies.isPending || ai.isPending || search.isPending;
  const errors = [dependencies.error, ai.error, search.error].filter(
    (error): error is Error => error instanceof Error,
  );

  return (
    <div className={styles.page}>
      <header className={styles.listHero}>
        <div className="admin-heading">
          <span>Service and provider health</span>
          <h1>Configuration is not the same as availability.</h1>
        </div>
        <p>
          These are live backend health projections. A missing configuration
          remains distinct from degraded, rate-limited, timed-out, and
          unavailable provider states.
        </p>
      </header>

      {pending && (
        <div className={styles.tableLoading} aria-busy="true">
          Inspecting current dependency states…
        </div>
      )}
      {errors.length > 0 && (
        <section className={styles.inlineError} role="alert">
          <div>
            <span>Partial health result</span>
            <p>
              {errors.map((error) => error.message).join(" ")}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              void dependencies.refetch();
              void ai.refetch();
              void search.refetch();
            }}
          >
            Retry unavailable checks
          </button>
        </section>
      )}

      {dependencies.data && (
        <section className={styles.dependencyRegion}>
          <header>
            <span>Core readiness</span>
            <strong data-health={dependencies.data.status}>
              {dependencies.data.status}
            </strong>
          </header>
          <dl>
            {Object.entries(dependencies.data.details ?? {}).map(
              ([name, state]) => (
                <div key={name}>
                  <dt>{name}</dt>
                  <dd>{state.status}</dd>
                  <small>
                    {Object.entries(state)
                      .filter(([key]) => key !== "status")
                      .map(([key, value]) => `${key}: ${String(value)}`)
                      .join(" · ") || "No additional detail"}
                  </small>
                </div>
              ),
            )}
          </dl>
        </section>
      )}
      {ai.data && <ProviderList records={ai.data} title="AI providers" />}
      {search.data && (
        <ProviderList records={search.data} title="Evidence search providers" />
      )}

      <footer className={styles.healthNotice}>
        <span>Check behavior</span>
        <p>
          This page uses the backend&apos;s cached default health checks. It
          does not force paid search checks or expose provider credentials.
        </p>
      </footer>
    </div>
  );
}
