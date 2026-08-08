"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { learningService } from "@/services/learning";
import {
  reportService,
  type ReportEvidence,
  type VerificationReport,
} from "@/services/reports";
import ReportActions from "./ReportActions";
import { reportStyles as styles } from "./report.styles";
import {
  formatReportDate as formatDate,
  friendlyConfidence,
  friendlyLabel,
  friendlyReportText,
  friendlyVerdict,
  reportPercentage as percentage,
} from "@/utils/report-presentation";
import { useReportMode, type ReportMode } from "./useReportMode";
import { analyticsService } from "@/services/analytics";

function humanize(value: string | undefined) {
  return friendlyLabel(value);
}

function EvidenceDetail({
  evidence,
  onOpen,
}: {
  evidence?: ReportEvidence;
  onOpen?: () => void;
}) {
  if (!evidence) {
    return (
      <div className={styles.noSelection}>
        <span>Evidence inspector</span>
        <h3>Select a source record.</h3>
        <p>
          Open evidence from a claim to inspect its relationship, excerpt, and
          source destination.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.evidenceDetail}>
      <div className={styles.inspectorLabel}>
        <span>Evidence source {evidence.evidenceId}</span>
        <span data-relationship={evidence.relationship}>
          {humanize(evidence.relationship)}
        </span>
      </div>
      <h3>{evidence.title}</h3>
      <dl>
        <div>
          <dt>Publisher</dt>
          <dd>{evidence.publisher || "Unknown"}</dd>
        </div>
        <div>
          <dt>Published</dt>
          <dd>{formatDate(evidence.publishedAt)}</dd>
        </div>
        <div>
          <dt>Access</dt>
          <dd>{humanize(evidence.accessStatus)}</dd>
        </div>
        <div>
          <dt>Lineage</dt>
          <dd>{humanize(evidence.lineageType)}</dd>
        </div>
      </dl>
      {evidence.relevantExcerpt ? (
        <blockquote>{evidence.relevantExcerpt}</blockquote>
      ) : (
        <p className={styles.unavailable}>
          No relevant excerpt was retained for this source.
        </p>
      )}
      <a
        href={evidence.sourceUrl}
        onClick={onOpen}
        rel="noreferrer"
        target="_blank"
      >
        Open original source
        <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}

function ClaimEvidence({
  evidence,
  ids,
  label,
  onSelect,
}: {
  evidence: Map<string, ReportEvidence>;
  ids: string[];
  label: string;
  onSelect: (id: string) => void;
}) {
  if (!ids.length) return null;

  return (
    <div className={styles.evidenceGroup}>
      <span>{label}</span>
      {ids.map((id) => {
        const item = evidence.get(String(id));
        return item ? (
          <button key={id} onClick={() => onSelect(String(id))} type="button">
            <strong>{item.title}</strong>
            <small>
              {item.publisher || "Publisher unknown"} ·{" "}
              {humanize(item.relationship)}
            </small>
          </button>
        ) : (
          <p key={id}>Referenced evidence is unavailable.</p>
        );
      })}
    </div>
  );
}

function ReportModeNavigation({
  mode,
  onChange,
}: {
  mode: ReportMode;
  onChange: (mode: ReportMode) => void;
}) {
  return (
    <nav className={styles.modeNavigation} aria-label="Report view">
      <div>
        <span>Choose your view</span>
        <strong>
          {mode === "simple"
            ? "The essentials in plain language"
            : mode === "learn"
              ? "Understand the investigation method"
              : "Inspect every evidence relationship"}
        </strong>
      </div>
      <div role="tablist">
        {(["simple", "evidence", "learn"] as const).map((item) => (
          <button
            aria-selected={mode === item}
            data-active={mode === item}
            key={item}
            onClick={() => onChange(item)}
            role="tab"
            type="button"
          >
            {item === "simple"
              ? "Simple"
              : item === "evidence"
                ? "Evidence"
                : "Learn"}
          </button>
        ))}
      </div>
    </nav>
  );
}

function CheckCard({ reportId }: { reportId: string }) {
  const card = useQuery({
    queryFn: () => reportService.checkCard(reportId),
    queryKey: ["check-card", reportId],
    retry: false,
  });
  const download = useMutation({
    mutationFn: () => reportService.downloadCheckCard(reportId),
    onSuccess: ({ blob, filename }) => {
      const objectUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = objectUrl;
      anchor.download = filename ?? "verith-check-card.svg";
      anchor.click();
      URL.revokeObjectURL(objectUrl);
    },
  });

  if (card.isPending)
    return (
      <section className={styles.checkCard}>
        <p>Preparing your evidence-first Check Card…</p>
      </section>
    );
  if (card.isError)
    return (
      <section className={styles.checkCard}>
        <div>
          <span>Verith Check Card</span>
          <h2>The card could not be prepared.</h2>
          <button onClick={() => void card.refetch()} type="button">
            Retry
          </button>
        </div>
      </section>
    );
  return (
    <section className={styles.checkCard}>
      <div>
        <span>Verith Check Card</span>
        <h2>A clear finding you can take into the conversation.</h2>
        <p>
          This concise card is generated only from this completed report. It
          keeps the evidence, next check, and main limitation visible.
        </p>
        <button
          disabled={download.isPending}
          onClick={() => download.mutate()}
          type="button"
        >
          {download.isPending ? "Preparing…" : "Download card"}
        </button>
        {download.isError && (
          <small role="alert">{download.error.message}</small>
        )}
      </div>
      <article>
        <header>
          <strong>Verith</strong>
          <span>{friendlyVerdict(card.data.finding)}</span>
        </header>
        <dl>
          <div>
            <dt>Claim</dt>
            <dd>{card.data.claim}</dd>
          </div>
          <div>
            <dt>What we found</dt>
            <dd>{friendlyReportText(card.data.summary)}</dd>
          </div>
          <div>
            <dt>Check next</dt>
            <dd>{card.data.recommendedCheck}</dd>
          </div>
          <div>
            <dt>Important limitation</dt>
            <dd>{card.data.limitation}</dd>
          </div>
        </dl>
        <footer>
          {card.data.shareState === "READY"
            ? "Public report link included in the download"
            : "Private card · make the report unlisted or public before sharing"}
        </footer>
      </article>
    </section>
  );
}

function SpokenReportSummary({ report }: { report: VerificationReport }) {
  const [speaking, setSpeaking] = useState(false);
  const supported =
    typeof window !== "undefined" &&
    "speechSynthesis" in window &&
    "SpeechSynthesisUtterance" in window;
  useEffect(
    () => () => {
      if (supported) window.speechSynthesis.cancel();
    },
    [supported],
  );
  const play = () => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    const text = [
      `Main finding: ${friendlyVerdict(report.overallVerdict)}.`,
      `Why: ${friendlyReportText(report.summary)}`,
      `Important limitation: ${report.limitations[0] ?? "Open the complete report for context."}`,
      `Recommended action: ${report.recommendedActions[0] ?? "Inspect the evidence before sharing."}`,
    ].join(" ");
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-NG";
    utterance.rate = 0.92;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
    if (report.id) {
      void analyticsService
        .record("AUDIO_SUMMARY_USED", {
          reportId: report.id,
          verificationId: report.verificationId,
        })
        .catch(() => undefined);
    }
  };
  const stop = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };
  return (
    <section className={styles.spokenSummary}>
      <div>
        <span>Listen to the essentials</span>
        <strong>
          Uses your browser voice. No audio is uploaded or stored.
        </strong>
      </div>
      {supported ? (
        <button
          aria-pressed={speaking}
          onClick={speaking ? stop : play}
          type="button"
        >
          {speaking ? "Stop summary" : "Play spoken summary"}
        </button>
      ) : (
        <small>Spoken summaries are not supported by this browser.</small>
      )}
    </section>
  );
}

function simpleVerdict(value: string, language: "en" | "pcm") {
  if (language === "en") return friendlyVerdict(value);
  const labels: Record<string, string> = {
    CONTRADICTED: "Evidence no agree with this claim",
    FALSE: "Evidence no agree with this claim",
    INSUFFICIENT_EVIDENCE: "Evidence never reach to decide",
    MIXED: "Evidence dey point different ways",
    SUPPORTED: "Evidence dey support this claim",
    TRUE: "Evidence dey support this claim",
  };
  return labels[value] ?? friendlyVerdict(value);
}

export function ClaimWorkspace({ report }: { report: VerificationReport }) {
  const evidenceById = useMemo(
    () =>
      new Map(
        report.evidence.map((item) => [String(item.evidenceId), item] as const),
      ),
    [report.evidence],
  );
  const [selectedEvidenceId, setSelectedEvidenceId] = useState<string>();
  const selectedEvidence = selectedEvidenceId
    ? evidenceById.get(selectedEvidenceId)
    : undefined;
  const selectEvidence = (id: string) => {
    setSelectedEvidenceId(id);
  };
  const openEvidence = () => {
    if (!report.id || !selectedEvidence) return;
    void Promise.allSettled([
      reportService.inspectEvidence(report.id, selectedEvidence.evidenceId),
      analyticsService.record("EVIDENCE_SOURCE_OPENED", {
        reportId: report.id,
        verificationId: report.verificationId,
      }),
    ]);
  };

  return (
    <div className={styles.claimWorkspace}>
      <section className={styles.claims}>
        <div className={styles.sectionHeading}>
          <span>Claim analysis</span>
          <span>{report.claims.length} records</span>
        </div>
        {report.claims.length === 0 ? (
          <div className={styles.emptySection}>
            No verifiable claims were included in this report.
          </div>
        ) : (
          report.claims.map((claim, index) => (
            <section className={styles.claim} key={claim.claimId}>
              <header>
                <span>Claim {String(index + 1).padStart(2, "0")}</span>
                <span data-verdict={claim.verdict}>
                  {friendlyVerdict(claim.verdict)}
                </span>
              </header>
              <h3>{claim.text}</h3>
              <p>{friendlyReportText(claim.explanation)}</p>
              <details className={styles.claimDetails}>
                <summary>See confidence and technical details</summary>
                <div className={styles.claimMeta}>
                  <span>{friendlyConfidence(claim.confidence)}</span>
                  <span>{humanize(claim.importance)} importance</span>
                  <span>{humanize(claim.verifiability)}</span>
                </div>
              </details>
              <ClaimEvidence
                evidence={evidenceById}
                ids={claim.supportingEvidenceIds ?? []}
                label="Supporting evidence"
                onSelect={selectEvidence}
              />
              <ClaimEvidence
                evidence={evidenceById}
                ids={claim.contradictingEvidenceIds ?? []}
                label="Contradicting evidence"
                onSelect={selectEvidence}
              />
              <ClaimEvidence
                evidence={evidenceById}
                ids={claim.contextEvidenceIds ?? []}
                label="Context evidence"
                onSelect={selectEvidence}
              />
              {(claim.uncertainties?.length > 0 ||
                claim.limitations?.length > 0) && (
                <div className={styles.claimCaveats}>
                  <span>Uncertainty and limitations</span>
                  <ul>
                    {[
                      ...(claim.uncertainties ?? []),
                      ...(claim.limitations ?? []),
                    ].map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          ))
        )}
      </section>

      <aside className={styles.inspector}>
        <EvidenceDetail evidence={selectedEvidence} onOpen={openEvidence} />
      </aside>
    </div>
  );
}

export function ReportClaimWorkspace({
  verificationId,
}: {
  verificationId: string;
}) {
  const [mode, setMode] = useReportMode();
  const report = useQuery({
    queryFn: () => reportService.latest(verificationId),
    queryKey: ["report", verificationId, "latest"],
    retry: 1,
  });

  if (report.isPending) {
    return (
      <section className={styles.reportLoading} aria-busy="true">
        <span>Claim analysis</span>
        <h2>Opening claims and evidence…</h2>
        <div />
        <div />
      </section>
    );
  }

  if (report.isError) {
    return (
      <section className={styles.reportError} role="alert">
        <span>Claim analysis unavailable</span>
        <h2>The claims and evidence could not be loaded.</h2>
        <p>{report.error.message}</p>
        <button type="button" onClick={() => void report.refetch()}>
          Retry claim analysis
        </button>
      </section>
    );
  }

  return (
    <>
      <ReportModeNavigation mode={mode} onChange={setMode} />
      {mode === "evidence" ? (
        <ClaimWorkspace report={report.data} />
      ) : mode === "simple" ? (
        <section className={styles.modeOverview}>
          <span>Simple view</span>
          <h2>{friendlyVerdict(report.data.overallVerdict)}</h2>
          <p>{friendlyReportText(report.data.summary)}</p>
          <small>
            The concise explanation continues below the processing record.
          </small>
        </section>
      ) : (
        <section className={styles.modeOverview}>
          <span>Learn view</span>
          <h2>See how this conclusion was built.</h2>
          <p>
            Verith identified {report.data.claims.length} statements for
            analysis and retained {report.data.evidence.length} evidence
            records. The learning view explains source access, duplicates,
            uncertainty, and the skill to practise next.
          </p>
          <small>
            Your XP and achievements do not change merely because you opened
            this report.
          </small>
        </section>
      )}
    </>
  );
}

export function ReportReader({
  report,
  showActions = true,
  showClaimWorkspace = true,
  mode = "evidence",
}: {
  report: VerificationReport;
  showActions?: boolean;
  showClaimWorkspace?: boolean;
  mode?: ReportMode;
}) {
  const [simpleLanguage, setSimpleLanguage] = useState<"en" | "pcm">("en");
  const learning = useQuery({
    enabled: mode === "learn" && showActions && Boolean(report.id),
    queryFn: () => learningService.recommendationsForReport(report.id!),
    queryKey: ["learning-recommendations", report.id],
    retry: false,
  });
  const coach = useQuery({
    enabled: mode === "learn" && showActions && Boolean(report.id),
    queryFn: () => reportService.coach(report.id!),
    queryKey: ["mil-coach", report.id],
    retry: false,
  });
  const unavailableEvidence = report.evidence.filter(
    (item) => !["AVAILABLE", "PARTIALLY_AVAILABLE"].includes(item.accessStatus),
  );
  const noReadableEvidence =
    report.evidence.length > 0 &&
    unavailableEvidence.length === report.evidence.length;
  const duplicateEvidence = report.evidence.filter(
    (item) => item.lineageType === "DUPLICATE",
  );
  const opinionClaims = report.claims.filter((claim) =>
    ["OPINION", "PREDICTION", "VALUE_JUDGMENT"].includes(claim.verifiability),
  );
  const factualClaims = report.claims.length - opinionClaims.length;
  const strongestSources = report.evidence
    .filter((item) =>
      ["SUPPORTING", "CONTRADICTING"].includes(item.relationship),
    )
    .slice(0, 3);

  useEffect(() => {
    if (!showActions || !report.id || mode === "evidence") return;
    const event = mode === "simple" ? "SIMPLE_MODE_USED" : "LEARN_MODE_USED";
    void analyticsService
      .record(event, {
        mode: mode.toUpperCase(),
        reportId: report.id,
        verificationId: report.verificationId,
      })
      .catch(() => undefined);
    if (mode === "learn") {
      void analyticsService
        .record("MIL_COACH_OPENED", {
          reportId: report.id,
          verificationId: report.verificationId,
        })
        .catch(() => undefined);
    }
  }, [mode, report.id, report.verificationId, showActions]);

  return (
    <article className={styles.report}>
      <header className={styles.reportHeader}>
        <div>
          <span>Report version {report.version}</span>
          <h2>{friendlyVerdict(report.overallVerdict)}</h2>
          <p>{friendlyReportText(report.summary)}</p>
        </div>
        <dl>
          {report.id && (
            <div>
              <dt>Report ID</dt>
              <dd>{report.id}</dd>
            </div>
          )}
          <div>
            <dt>Generated</dt>
            <dd>{formatDate(report.generatedAt)}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>{humanize(report.status)}</dd>
          </div>
          {report.visibility && (
            <div>
              <dt>Visibility</dt>
              <dd>{humanize(report.visibility)}</dd>
            </div>
          )}
          <div>
            <dt>Risk</dt>
            <dd>{humanize(report.riskLevel)}</dd>
          </div>
          <div>
            <dt>Confidence</dt>
            <dd>{friendlyConfidence(report.confidence)}</dd>
          </div>
        </dl>
        {showActions && report.id && report.verificationId && (
          <ReportActions
            report={report}
            verificationId={report.verificationId}
          />
        )}
      </header>

      {noReadableEvidence && (
        <section className={styles.sourceWarning} role="status">
          <span>Evidence check incomplete</span>
          <div>
            <h2>We found sources, but could not read them.</h2>
            <p>
              This result does not mean the claim is true or false. Verith kept{" "}
              {unavailableEvidence.length} source links for inspection and
              avoided making a confident decision without readable evidence.
            </p>
          </div>
        </section>
      )}

      <section className={styles.findings}>
        <div>
          <span>What Verith found</span>
          <p>{friendlyReportText(report.summary)}</p>
        </div>
        <div>
          <span>Recommended action</span>
          {report.recommendedActions.length ? (
            <ol>
              {report.recommendedActions.map((action) => (
                <li key={action}>{action}</li>
              ))}
            </ol>
          ) : (
            <p>No recommended action was returned.</p>
          )}
        </div>
      </section>

      {mode === "learn" && showActions && report.id && (
        <section className={styles.coach}>
          <div>
            <span>Your MIL coach</span>
            <h2>
              {coach.data?.skillFocus ??
                "Turn this report into a reusable skill."}
            </h2>
            <p>
              The coach uses only findings already saved in this report. It does
              not change the verdict or invent a new diagnosis.
            </p>
          </div>
          {coach.isPending ? (
            <p>Matching this investigation to an approved learning skill…</p>
          ) : coach.isError ? (
            <button type="button" onClick={() => void coach.refetch()}>
              Retry coach
            </button>
          ) : (
            <div className={styles.coachBody}>
              <article>
                <span>What happened here</span>
                <p>{coach.data.whatHappened}</p>
              </article>
              <article>
                <span>Why it matters</span>
                <p>{coach.data.whyItMatters}</p>
              </article>
              <article>
                <span>Check next time</span>
                <p>{coach.data.nextCheck}</p>
              </article>
              <article>
                <span>Try this question</span>
                <p>{coach.data.practiceQuestion}</p>
              </article>
              <div className={styles.coachLinks}>
                {coach.data.relatedLesson ? (
                  <Link href={`/app/lessons/${coach.data.relatedLesson.slug}`}>
                    Open lesson · {coach.data.relatedLesson.title}
                  </Link>
                ) : (
                  <span>No matching published lesson yet</span>
                )}
                {coach.data.relatedChallenge ? (
                  <Link
                    href={`/app/challenges/${coach.data.relatedChallenge.slug}`}
                  >
                    Practise · {coach.data.relatedChallenge.title}
                  </Link>
                ) : (
                  <span>No matching active challenge yet</span>
                )}
              </div>
            </div>
          )}
        </section>
      )}

      {mode === "learn" && showActions && report.id && (
        <section className={styles.learningRecommendations}>
          <div>
            <span>Build the skill</span>
            <h2>Learning selected from this report.</h2>
            <p>
              Published courses appear only when their real catalog tags match
              this report’s retained learning recommendations.
            </p>
          </div>
          {learning.isPending ? (
            <p>Matching published learning…</p>
          ) : learning.isError ? (
            <button onClick={() => void learning.refetch()} type="button">
              Retry recommendations
            </button>
          ) : learning.data.length ? (
            <ul>
              {learning.data.map((course) => (
                <li key={course._id}>
                  <span>
                    {course.difficulty} · {course.estimatedDuration} min
                  </span>
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <Link href={`/app/learning/${course.slug}`}>Open course</Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No published course currently matches this report.</p>
          )}
        </section>
      )}

      {mode === "learn" && (
        <section className={styles.learnBreakdown}>
          <div>
            <span>Statements identified</span>
            <strong>{report.claims.length}</strong>
            <p>
              {factualClaims} checkable or partly checkable ·{" "}
              {opinionClaims.length} opinion, prediction, or value statement
            </p>
          </div>
          <div>
            <span>Sources retained</span>
            <strong>{report.evidence.length}</strong>
            <p>
              {duplicateEvidence.length} duplicate-lineage ·{" "}
              {unavailableEvidence.length} inaccessible or partly inaccessible
            </p>
          </div>
          <div>
            <span>Confidence discipline</span>
            <strong>{friendlyConfidence(report.confidence)}</strong>
            <p>
              {report.limitations.length} explicit limitations keep the
              conclusion from sounding more certain than the evidence.
            </p>
          </div>
        </section>
      )}

      {mode === "simple" && (
        <>
          <section className={styles.simpleLanguage}>
            <div>
              <span>Explanation language</span>
              <strong>
                Nigerian Pidgin is a limited pilot. Detailed report content
                stays in English so meaning and uncertainty are not silently
                rewritten.
              </strong>
            </div>
            <div role="group" aria-label="Simple report language">
              <button
                aria-pressed={simpleLanguage === "en"}
                data-active={simpleLanguage === "en"}
                onClick={() => setSimpleLanguage("en")}
                type="button"
              >
                English
              </button>
              <button
                aria-pressed={simpleLanguage === "pcm"}
                data-active={simpleLanguage === "pcm"}
                onClick={() => setSimpleLanguage("pcm")}
                type="button"
              >
                Pidgin pilot
              </button>
            </div>
          </section>
          <section className={styles.simpleSummary}>
            <article>
              <span>
                {simpleLanguage === "pcm"
                  ? "Wetin evidence show"
                  : "Main finding"}
              </span>
              <h3>{simpleVerdict(report.overallVerdict, simpleLanguage)}</h3>
              <p>
                {simpleLanguage === "pcm"
                  ? "Read the original English summary and evidence below before you decide or share am."
                  : friendlyReportText(report.summary)}
              </p>
            </article>
            <article>
              <span>Important missing context</span>
              <h3>
                {report.missingContext[0]?.omittedContext ||
                  "No major missing-context finding was retained."}
              </h3>
              <p>
                {report.missingContext[0]?.whyItMatters ||
                  "Keep the report limitations in view before acting on the finding."}
              </p>
            </article>
            <article>
              <span>Strongest sources</span>
              {strongestSources.length ? (
                <ul>
                  {strongestSources.map((source) => (
                    <li key={source.evidenceId}>
                      <a
                        href={source.sourceUrl}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {source.title}
                      </a>
                      <small>
                        {source.publisher || "Publisher unknown"} ·{" "}
                        {humanize(source.relationship)}
                      </small>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>
                  No readable supporting or contradicting source was retained.
                </p>
              )}
            </article>
            <article>
              <span>Main limitation</span>
              <h3>
                {report.limitations[0] ||
                  "No report-level limitation was returned."}
              </h3>
              <p>Use the Evidence view before making a high-impact decision.</p>
            </article>
          </section>
          <SpokenReportSummary report={report} />
          {showActions && report.id && <CheckCard reportId={report.id} />}
        </>
      )}

      {mode === "evidence" && showClaimWorkspace && (
        <ClaimWorkspace report={report} />
      )}

      {mode === "evidence" && (
        <section className={styles.analysisGrid}>
          <div className={styles.analysisSection}>
            <div className={styles.sectionHeading}>
              <span>Missing context</span>
              <span>{report.missingContext.length} findings</span>
            </div>
            {report.missingContext.length ? (
              report.missingContext.map((issue, index) => (
                <article key={`${issue.type}-${index}`}>
                  <header>
                    <strong>{humanize(issue.type)}</strong>
                    <span>{humanize(issue.severity)}</span>
                  </header>
                  <dl>
                    <div>
                      <dt>What was omitted</dt>
                      <dd>{issue.omittedContext}</dd>
                    </div>
                    <div>
                      <dt>Why it matters</dt>
                      <dd>{issue.whyItMatters}</dd>
                    </div>
                    <div>
                      <dt>Corrected context</dt>
                      <dd>{issue.correctedContext}</dd>
                    </div>
                  </dl>
                </article>
              ))
            ) : (
              <div className={styles.emptySection}>
                No missing-context finding was returned.
              </div>
            )}
          </div>

          <div className={styles.analysisSection}>
            <div className={styles.sectionHeading}>
              <span>Manipulation</span>
              <span>{report.manipulationAnalysis.length} findings</span>
            </div>
            {report.manipulationAnalysis.length ? (
              report.manipulationAnalysis.map((finding, index) => (
                <article key={`${finding.category}-${index}`}>
                  <header>
                    <strong>{humanize(finding.category)}</strong>
                    <span>{humanize(finding.severity)}</span>
                  </header>
                  {finding.phrase && (
                    <blockquote>“{finding.phrase}”</blockquote>
                  )}
                  <p>{finding.explanation}</p>
                </article>
              ))
            ) : (
              <div className={styles.emptySection}>
                No manipulation finding was returned.
              </div>
            )}
          </div>

          <div className={styles.analysisSection}>
            <div className={styles.sectionHeading}>
              <span>Bias signals</span>
              <span>{report.biasAnalysis.length} metrics</span>
            </div>
            {report.biasAnalysis.length ? (
              report.biasAnalysis.map((metric) => (
                <article key={metric.metric}>
                  <header>
                    <strong>{humanize(metric.metric)}</strong>
                    <span>{metric.label}</span>
                  </header>
                  <div
                    aria-label={`${humanize(metric.metric)} score ${percentage(metric.score)}`}
                    className={styles.score}
                    role="img"
                  >
                    <span style={{ width: percentage(metric.score) }} />
                  </div>
                  <p>{metric.explanation}</p>
                </article>
              ))
            ) : (
              <div className={styles.emptySection}>
                No bias metric was returned.
              </div>
            )}
          </div>

          <div className={styles.analysisSection}>
            <div className={styles.sectionHeading}>
              <span>Source transparency</span>
              <span>{report.sourceCredibility.length} sources</span>
            </div>
            {report.sourceCredibility.length ? (
              report.sourceCredibility.map((source) => (
                <article key={source.domain}>
                  <header>
                    <strong>{source.domain}</strong>
                    <span>{humanize(source.credibilityLevel)}</span>
                  </header>
                  <p>{source.explanation}</p>
                  {source.limitations?.length > 0 && (
                    <small>{source.limitations.join(" ")}</small>
                  )}
                </article>
              ))
            ) : (
              <div className={styles.emptySection}>
                Source credibility was not assessed.
              </div>
            )}
          </div>
        </section>
      )}

      {mode === "evidence" &&
        (report.mediaAnalysis ||
          report.audioAnalysis ||
          report.aiIndicators) && (
          <section className={styles.media}>
            <div className={styles.sectionHeading}>
              <span>Media inspection</span>
              <span>Indicators are not proof</span>
            </div>
            {report.mediaAnalysis && (
              <article>
                <span>
                  {report.mediaAnalysis.mediaKind === "VIDEO"
                    ? "Video inspection"
                    : "Image or screenshot"}
                </span>
                <h3>{humanize(report.mediaAnalysis.status)}</h3>
                {report.mediaAnalysis.mediaKind !== "VIDEO" &&
                  report.mediaAnalysis.fullText && (
                    <div>
                      <strong>Extracted text</strong>
                      <p>{report.mediaAnalysis.fullText}</p>
                    </div>
                  )}
                {report.mediaAnalysis.mediaKind === "VIDEO" &&
                  report.mediaAnalysis.spokenText && (
                    <div>
                      <strong>Spoken transcript</strong>
                      <p>{report.mediaAnalysis.spokenText}</p>
                    </div>
                  )}
                {report.mediaAnalysis.mediaKind === "VIDEO" &&
                report.mediaAnalysis.onScreenText?.length ? (
                  <div>
                    <strong>On-screen text</strong>
                    <p>{report.mediaAnalysis.onScreenText.join(" · ")}</p>
                  </div>
                ) : null}
                {report.mediaAnalysis.mediaKind === "VIDEO" &&
                  !report.mediaAnalysis.spokenText &&
                  !report.mediaAnalysis.onScreenText?.length &&
                  report.mediaAnalysis.fullText && (
                    <div>
                      <strong>Extracted video content</strong>
                      <p>{report.mediaAnalysis.fullText}</p>
                    </div>
                  )}
                {report.mediaAnalysis.blocks?.length ? (
                  <ol>
                    {report.mediaAnalysis.blocks.map((moment, index) => (
                      <li key={`${moment.timestamp ?? "moment"}-${index}`}>
                        <strong>
                          {moment.timestamp ?? "Time unavailable"}
                        </strong>{" "}
                        {moment.description ?? "No description returned."}
                        {moment.evidenceType
                          ? ` (${humanize(moment.evidenceType)})`
                          : ""}
                      </li>
                    ))}
                  </ol>
                ) : null}
                {report.mediaAnalysis.mediaKind !== "VIDEO" && (
                  <p>
                    Reverse-image search:{" "}
                    {humanize(report.mediaAnalysis.reverseImageStatus)}
                  </p>
                )}
              </article>
            )}
            {report.audioAnalysis && (
              <article>
                <span>Audio transcription</span>
                <h3>{humanize(report.audioAnalysis.status)}</h3>
                {report.audioAnalysis.fullText ? (
                  <div>
                    <strong>Transcript</strong>
                    <p>{report.audioAnalysis.fullText}</p>
                  </div>
                ) : (
                  <p>No transcript was returned.</p>
                )}
              </article>
            )}
            {report.aiIndicators && (
              <article>
                <span>AI-generation indicators</span>
                <h3>{humanize(report.aiIndicators.indicator)}</h3>
                <p>
                  Confidence: {percentage(report.aiIndicators.confidence)}. This
                  signal is probabilistic and is not proof of origin.
                </p>
                {report.aiIndicators.observations?.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </article>
            )}
          </section>
        )}

      <section className={styles.limitations}>
        <div>
          <span>Limitations</span>
          <h2>What this report cannot establish.</h2>
        </div>
        {report.limitations.length ? (
          <ol>
            {report.limitations.map((limitation) => (
              <li key={limitation}>{limitation}</li>
            ))}
          </ol>
        ) : (
          <p>No report-level limitation was returned.</p>
        )}
      </section>
    </article>
  );
}

export default function ReportDocument({
  verificationId,
}: {
  verificationId: string;
}) {
  const [mode] = useReportMode();
  const [selectedReportId, setSelectedReportId] = useState<string>();
  const report = useQuery({
    queryFn: () => reportService.latest(verificationId),
    queryKey: ["report", verificationId, "latest"],
    retry: 1,
  });
  const versions = useQuery({
    queryFn: () => reportService.versions(verificationId),
    queryKey: ["report", verificationId, "versions"],
    retry: 1,
  });
  const selectedReport = useQuery({
    enabled: Boolean(selectedReportId),
    queryFn: () => reportService.get(selectedReportId!),
    queryKey: ["report", verificationId, selectedReportId],
    retry: 1,
  });

  if (report.isPending) {
    return (
      <section className={styles.reportLoading} aria-busy="true">
        <span>Report reader</span>
        <h2>Opening the evidence report…</h2>
        <div />
        <div />
      </section>
    );
  }

  if (report.isError) {
    return (
      <section className={styles.reportError} role="alert">
        <span>Report unavailable</span>
        <h2>The completed record could not be loaded.</h2>
        <p>{report.error.message}</p>
        <button type="button" onClick={() => void report.refetch()}>
          Retry report
        </button>
      </section>
    );
  }

  const displayed = selectedReportId ? selectedReport.data : report.data;
  return (
    <>
      <nav className={styles.reportVersions} aria-label="Report versions">
        <span>Report history</span>
        {versions.isPending ? (
          <small>Loading versions…</small>
        ) : versions.isError ? (
          <button type="button" onClick={() => void versions.refetch()}>
            Retry history
          </button>
        ) : (
          <div>
            <button
              data-active={!selectedReportId}
              onClick={() => setSelectedReportId(undefined)}
              type="button"
            >
              Latest: V{report.data.version}
            </button>
            {versions.data
              .filter((version) => version.id !== report.data.id)
              .map((version) => (
                <button
                  data-active={selectedReportId === version.id}
                  key={version.id}
                  onClick={() => setSelectedReportId(version.id)}
                  type="button"
                >
                  V{version.version}: {humanize(version.status)}
                </button>
              ))}
          </div>
        )}
      </nav>
      {selectedReportId && selectedReport.isPending && (
        <section className={styles.reportLoading} aria-busy="true">
          <span>Historical report</span>
          <h2>Opening report version…</h2>
        </section>
      )}
      {selectedReportId && selectedReport.isError && (
        <section className={styles.reportError} role="alert">
          <span>Historical report unavailable</span>
          <p>{selectedReport.error.message}</p>
          <button type="button" onClick={() => void selectedReport.refetch()}>
            Retry version
          </button>
        </section>
      )}
      {displayed && (
        <ReportReader
          report={displayed}
          showClaimWorkspace={false}
          mode={mode}
        />
      )}
    </>
  );
}
