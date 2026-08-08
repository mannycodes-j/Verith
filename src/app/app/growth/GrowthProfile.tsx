"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { COMPETENCY_DESCRIPTIONS, COMPETENCY_LEVEL_PROGRESS } from "@/data/mil";
import { milService } from "@/services/mil";
import { growthProfileStyles as styles } from "./growth.styles";

export default function GrowthProfile() {
  const profile = useQuery({ queryKey: ["mil-growth-profile"], queryFn: milService.profile });
  if (profile.isPending) return <section className={styles.state} aria-busy="true"><span>Media literacy growth</span><h1>Evaluating your real practice evidence…</h1><div /><div /></section>;
  if (profile.isError) return <section className={styles.state} role="alert"><span>Growth profile unavailable</span><h1>Your skill evidence could not be loaded.</h1><p>{profile.error.message}</p><button type="button" onClick={() => void profile.refetch()}>Retry</button></section>;

  const record = profile.data;
  const demonstrated = record.competencies.filter((item) => !item.notEnoughEvidence);
  const totalEvidence = record.competencies.reduce((total, item) => total + item.evidenceCount, 0);
  return <div className={styles.page}>
    <header className={styles.hero}>
      <div><span>Media literacy growth profile</span><h1>Skills you have demonstrated, not points you collected.</h1><p>This profile is separate from XP and achievements. It changes only when a scored guided investigation, assessment, quiz, or challenge provides evidence of a specific skill.</p></div>
      <dl><div><dt>Practice evidence</dt><dd>{totalEvidence}</dd></div><div><dt>Skills with enough evidence</dt><dd>{demonstrated.length} of {record.competencies.length}</dd></div><div><dt>Scoring rules</dt><dd>{record.scoringRuleVersion}</dd></div></dl>
    </header>

    <section className={styles.nextStep}><div><span>Recommended next activity</span><h2>{record.recommendedNextActivity.title}</h2><p>{record.recommendedNextActivity.description}</p></div><Link href={record.recommendedNextActivity.href}>Start guided practice</Link></section>

    <section className={styles.grid}>
      {record.competencies.map((item) => {
        const copy = COMPETENCY_DESCRIPTIONS[item.competency] ?? { label: item.competency.replaceAll("_", " "), description: "A measured media-literacy competency." };
        const progress = item.notEnoughEvidence ? Math.min(20, item.scoredEvidenceCount * 10) : COMPETENCY_LEVEL_PROGRESS[item.level];
        return <article key={item.competency}>
          <header><span>{copy.label}</span><strong>{item.notEnoughEvidence ? "Not enough evidence" : item.level.toLowerCase()}</strong></header>
          <p>{copy.description}</p>
          <div className={styles.progress} role="progressbar" aria-label={`${copy.label}: ${item.notEnoughEvidence ? "not enough evidence" : item.level}`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><span style={{ width: `${progress}%` }} /></div>
          <dl><div><dt>Evidence</dt><dd>{item.evidenceCount}</dd></div><div><dt>Scored</dt><dd>{item.scoredEvidenceCount}</dd></div><div><dt>Average</dt><dd>{item.averageScore === undefined ? "Not established" : `${Math.round(item.averageScore * 100)}%`}</dd></div></dl>
          {item.scoreHistory.length > 0 ? <details><summary>Evidence behind this level</summary><ol>{[...item.scoreHistory].reverse().map((entry) => <li key={`${entry.sourceType}-${entry.sourceActivityId}`}><span>{entry.sourceType.replaceAll("_", " ")}</span><strong>{Math.round(entry.score * 100)}%</strong><small>{new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(entry.occurredAt))}</small></li>)}</ol></details> : <small>Complete scored practice to establish a level. Simply opening reports does not count.</small>}
        </article>;
      })}
    </section>
  </div>;
}

