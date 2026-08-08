"use client";

import { useQuery } from "@tanstack/react-query";
import { adminService } from "@/services/admin";
import { adminStyles as styles } from "../admin.styles";

const number = new Intl.NumberFormat();
const percent = new Intl.NumberFormat(undefined, {
  maximumFractionDigits: 1,
  style: "percent",
});

function score(value: number | null) {
  return value === null ? "Not available" : `${value.toFixed(1)}%`;
}

export default function AdminAnalyticsPage() {
  const pilots = useQuery({
    queryFn: adminService.pilots,
    queryKey: ["admin", "analytics", "pilots"],
    retry: false,
  });

  if (pilots.isPending)
    return <div className={styles.loading} aria-busy="true"><span>Pilot evidence</span><h1>Building privacy-safe aggregates…</h1><div /><div /></div>;
  if (pilots.isError)
    return <section className={styles.error} role="alert"><span>Pilot analytics unavailable</span><h1>The pilot record could not be opened.</h1><p>{pilots.error.message}</p><button onClick={() => void pilots.refetch()} type="button">Retry</button></section>;

  const record = pilots.data;
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div><span>Evidence-first pilot measurement</span><h1>Participation and learning change, with privacy built in.</h1></div>
        <p>Individual answers and private investigations never appear here. Assessment averages remain hidden until at least {record.privacy.minimumGroupSize} people have joined a mission.</p>
      </header>

      {record.missions.length === 0 ? (
        <section className={styles.listEmpty}><span>No pilot data</span><h2>Publish a mission to begin measuring participation.</h2><p>This dashboard never fills itself with sample activity.</p></section>
      ) : record.missions.map((mission) => (
        <section className={styles.record} key={mission.id}>
          <header><span>{mission.organization}</span><small>{mission.status}</small></header>
          <h2>{mission.title}</h2>
          <ol>
            <li><span>Joined</span><strong>{number.format(mission.participation.joined)}</strong><small>Persisted mission participants</small></li>
            <li><span>Completed</span><strong>{number.format(mission.participation.completed)}</strong><small>{percent.format(mission.participation.completionRate)} completion rate</small></li>
            {mission.impact.state === "AVAILABLE" ? <>
              <li><span>Baseline</span><strong>{score(mission.impact.baselineAverage)}</strong><small>Average scored assessment</small></li>
              <li><span>Follow-up</span><strong>{score(mission.impact.followUpAverage)}</strong><small>Average change {score(mission.impact.averageChange)}</small></li>
            </> : <li><span>Learning impact</span><strong>Withheld</strong><small>{mission.impact.currentGroupSize} of {mission.impact.minimumGroupSize} follow-up results needed for privacy-safe reporting</small></li>}
          </ol>
          <p className={styles.empty}>{mission.limitation}</p>
        </section>
      ))}

      <div className={styles.grid}>
        <section className={styles.record}><header><span>Product interactions</span><small>Safe categories only</small></header>{record.interactions.length ? <ol>{record.interactions.map((item) => <li key={item.event}><span>{item.event.replaceAll("_", " ")}</span><strong>{number.format(item.count)}</strong><small>No investigation text retained</small></li>)}</ol> : <p className={styles.empty}>No tracked pilot interactions have been persisted yet.</p>}</section>
        <section className={styles.record}><header><span>Report feedback</span><small>Persisted responses</small></header>{record.reportFeedback.length ? <ol>{record.reportFeedback.map((item) => <li key={item.type}><span>{item.type.replaceAll("_", " ")}</span><strong>{number.format(item.count)}</strong><small>Aggregate feedback count</small></li>)}</ol> : <p className={styles.empty}>No report feedback has been persisted yet.</p>}</section>
      </div>
    </div>
  );
}
