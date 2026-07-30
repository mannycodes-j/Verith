"use client";

import { useQuery } from "@tanstack/react-query";
import { adminService } from "@/services/admin";
import { adminStyles as styles } from "./admin.styles";

const number = new Intl.NumberFormat();
const percent = new Intl.NumberFormat(undefined, {
  maximumFractionDigits: 1,
  style: "percent",
});

function duration(milliseconds: number | null) {
  if (milliseconds === null) return "Unavailable";
  if (milliseconds < 1_000) return `${Math.round(milliseconds)} ms`;
  return `${(milliseconds / 1_000).toFixed(1)} sec`;
}

export default function AdminOverview() {
  const overview = useQuery({
    queryFn: adminService.overview,
    queryKey: ["admin", "analytics", "overview"],
    retry: false,
  });

  if (overview.isPending) {
    return (
      <div className={styles.loading} aria-busy="true">
        <span>Operational record / 30 days</span>
        <h1>Loading verified aggregates…</h1>
        <div />
        <div />
        <div />
      </div>
    );
  }

  if (overview.isError) {
    return (
      <section className={styles.error} role="alert">
        <span>Operations unavailable</span>
        <h1>The administrative overview could not be opened.</h1>
        <p>{overview.error.message}</p>
        <button type="button" onClick={() => void overview.refetch()}>
          Retry
        </button>
      </section>
    );
  }

  const record = overview.data;
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div>
          <span>Operations / Last {record.period.days} days</span>
          <h1>System evidence, not decorative metrics.</h1>
        </div>
        <p>
          This view contains persisted operational aggregates from Verith.
          Provider cost remains explicitly unavailable because the backend does
          not store it.
        </p>
      </header>

      <section className={styles.summary} aria-label="Operational summary">
        <div>
          <span>Registered users</span>
          <strong>{number.format(record.users.total)}</strong>
          <small>{number.format(record.users.active)} active in period</small>
        </div>
        <div>
          <span>Verification volume</span>
          <strong>{number.format(record.verifications.volume)}</strong>
          <small>
            {percent.format(record.verifications.completionRate)} completed
          </small>
        </div>
        <div>
          <span>Failed verifications</span>
          <strong>{number.format(record.verifications.failed)}</strong>
          <small>
            {percent.format(record.verifications.failureRate)} of volume
          </small>
        </div>
        <div>
          <span>WhatsApp messages</span>
          <strong>{number.format(record.whatsapp.messages)}</strong>
          <small>Persisted during period</small>
        </div>
      </section>

      <div className={styles.grid}>
        <section className={styles.record}>
          <header>
            <span>01 Verification lifecycle</span>
            <small>Persisted status groups</small>
          </header>
          {record.verifications.byStatus.length === 0 ? (
            <p className={styles.empty}>
              No verification lifecycle records exist for this period.
            </p>
          ) : (
            <ol>
              {record.verifications.byStatus.map((status) => (
                <li key={status.status}>
                  <span>{status.status.replaceAll("_", " ")}</span>
                  <strong>{number.format(status.count)}</strong>
                  <small>
                    Average duration {duration(status.averageDurationMs)}
                  </small>
                </li>
              ))}
            </ol>
          )}
        </section>

        <section className={styles.record}>
          <header>
            <span>02 Provider execution</span>
            <small>Persisted provider runs</small>
          </header>
          {record.providers.length === 0 ? (
            <p className={styles.empty}>
              No provider executions were persisted for this period.
            </p>
          ) : (
            <ol>
              {record.providers.map((provider) => (
                <li key={provider.provider}>
                  <span>{provider.provider}</span>
                  <strong>{number.format(provider.executions)}</strong>
                  <small>
                    {percent.format(provider.successRate)} successful ·{" "}
                    {duration(provider.averageLatencyMs)}
                  </small>
                  <em title={provider.cost.reason}>Cost unavailable</em>
                </li>
              ))}
            </ol>
          )}
        </section>
      </div>

      <footer className={styles.period}>
        <span>Aggregation window begins</span>
        <time dateTime={record.period.since}>
          {new Date(record.period.since).toLocaleString()}
        </time>
      </footer>
    </div>
  );
}
