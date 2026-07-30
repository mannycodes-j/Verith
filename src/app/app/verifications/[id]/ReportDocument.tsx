"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import {
  reportService,
  type ReportEvidence,
  type VerificationReport,
} from "@/services/reports";
import ReportActions from "./ReportActions";
import { reportStyles as styles } from "./report.styles";

function humanize(value: string | undefined) {
  return value?.replaceAll("_", " ").toLowerCase() ?? "Unavailable";
}

function percentage(value: number | undefined) {
  return typeof value === "number" && Number.isFinite(value)
    ? `${Math.round(value * 100)}%`
    : "Unavailable";
}

function formatDate(value: string | undefined) {
  if (!value) return "Unavailable";
  const date = new Date(value);
  return Number.isNaN(date.valueOf())
    ? "Unavailable"
    : new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(date);
}

function EvidenceDetail({ evidence }: { evidence?: ReportEvidence }) {
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
      <a href={evidence.sourceUrl} rel="noreferrer" target="_blank">
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

export function ReportReader({
  report,
  showActions = true,
}: {
  report: VerificationReport;
  showActions?: boolean;
}) {
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

  return (
    <article className={styles.report}>
      <header className={styles.reportHeader}>
        <div>
          <span>Report version {report.version}</span>
          <h2>{humanize(report.overallVerdict)}</h2>
          <p>{report.summary}</p>
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
            <dd>{percentage(report.confidence)}</dd>
          </div>
        </dl>
        {showActions && report.id && report.verificationId && (
          <ReportActions
            report={report}
            verificationId={report.verificationId}
          />
        )}
      </header>

      <section className={styles.findings}>
        <div>
          <span>What Verith found</span>
          <p>{report.summary}</p>
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
                    {humanize(claim.verdict)}
                  </span>
                </header>
                <h3>{claim.text}</h3>
                <div className={styles.claimMeta}>
                  <span>Confidence {percentage(claim.confidence)}</span>
                  <span>{humanize(claim.importance)} importance</span>
                  <span>{humanize(claim.verifiability)}</span>
                </div>
                <p>{claim.explanation}</p>
                <ClaimEvidence
                  evidence={evidenceById}
                  ids={claim.supportingEvidenceIds ?? []}
                  label="Supporting evidence"
                  onSelect={setSelectedEvidenceId}
                />
                <ClaimEvidence
                  evidence={evidenceById}
                  ids={claim.contradictingEvidenceIds ?? []}
                  label="Contradicting evidence"
                  onSelect={setSelectedEvidenceId}
                />
                <ClaimEvidence
                  evidence={evidenceById}
                  ids={claim.contextEvidenceIds ?? []}
                  label="Context evidence"
                  onSelect={setSelectedEvidenceId}
                />
                {(claim.uncertainties?.length > 0 ||
                  claim.limitations?.length > 0) && (
                  <div className={styles.claimCaveats}>
                    <span>Uncertainty and limitations</span>
                    <ul>
                      {[...(claim.uncertainties ?? []), ...(claim.limitations ?? [])].map(
                        (item) => (
                          <li key={item}>{item}</li>
                        ),
                      )}
                    </ul>
                  </div>
                )}
              </section>
            ))
          )}
        </section>

        <aside className={styles.inspector}>
          <EvidenceDetail evidence={selectedEvidence} />
        </aside>
      </div>

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
                {finding.phrase && <blockquote>“{finding.phrase}”</blockquote>}
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

      {(report.mediaAnalysis ||
        report.audioAnalysis ||
        report.aiIndicators) && (
        <section className={styles.media}>
          <div className={styles.sectionHeading}>
            <span>Media inspection</span>
            <span>Indicators are not proof</span>
          </div>
          {report.mediaAnalysis && (
            <article>
              <span>Image or screenshot</span>
              <h3>{humanize(report.mediaAnalysis.status)}</h3>
              {report.mediaAnalysis.fullText && (
                <div>
                  <strong>Extracted text</strong>
                  <p>{report.mediaAnalysis.fullText}</p>
                </div>
              )}
              <p>
                Reverse-image search:{" "}
                {humanize(report.mediaAnalysis.reverseImageStatus)}
              </p>
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
      {displayed && <ReportReader report={displayed} />}
    </>
  );
}
