"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState, useRef } from "react";
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
import { requestAchievementCelebrationCheck } from "@/utils/achievement-celebrations";
import LanguageSelector from "@/components/LanguageSelector";
import type { SupportedLanguage } from "@/data/supported-languages";
import { REPORT_LANGUAGE_COPY } from "@/data/report-language-copy";
import { useReportLanguage } from "./useReportLanguage";
import {
  buildSpokenReportSummary,
  selectSpeechVoice,
  speechLocaleFor,
} from "@/utils/spoken-report-summary";

function humanize(value: string | undefined) {
  return friendlyLabel(value);
}

function EvidenceDetail({
  evidence,
  onOpen,
  language = "en",
}: {
  evidence?: ReportEvidence;
  onOpen?: () => void;
  language?: SupportedLanguage;
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
        <div>
          <small>
            {REPORT_LANGUAGE_COPY[language].originalExcerpt}{evidence.language ? ` · ${evidence.language}` : ""}
          </small>
          <blockquote lang={evidence.language}>{evidence.originalExcerpt ?? evidence.relevantExcerpt}</blockquote>
        </div>
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
  const cardRef = useRef<HTMLElement>(null);
  const download = useMutation({
    mutationFn: async () => {
      if (!cardRef.current) throw new Error("Card not ready");
      const { toPng } = await import("html-to-image");
      return toPng(cardRef.current, {
        pixelRatio: 2,
        backgroundColor: "#070708",
        cacheBust: true,
      });
    },
    onSuccess: (dataUrl) => {
      const anchor = document.createElement("a");
      anchor.href = dataUrl;
      anchor.download = "verith-check-card.png";
      anchor.click();
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
      <article className={styles.checkCardCanvas} ref={cardRef}>
        <div aria-hidden="true" className={styles.checkCardAura} />
        <header className={styles.checkCardHeader}>
          <div className={styles.checkCardBrand}>
            <span aria-hidden="true">V</span>
            <div>
              <strong>Verith</strong>
              <small>Evidence brief</small>
            </div>
          </div>
          <div className={styles.checkCardMeta}>
            <span>{formatDate(card.data.reportDate)}</span>
            <small>Report v{card.data.reportVersion}</small>
          </div>
        </header>

        <div className={styles.checkCardVerdict}>
          <span>Evidence-led finding</span>
          <strong>{friendlyVerdict(card.data.finding)}</strong>
          <p>{friendlyReportText(card.data.summary)}</p>
        </div>

        <section className={styles.checkCardClaim}>
          <span>The claim checked</span>
          <blockquote>{card.data.claim}</blockquote>
        </section>

        {card.data.keyEvidence.length > 0 && (
          <section className={styles.checkCardEvidence}>
            <span>Evidence considered</span>
            <div>
              {card.data.keyEvidence.slice(0, 2).map((evidence) => (
                <article key={`${evidence.sourceUrl}-${evidence.title}`}>
                  <small>{humanize(evidence.relationship)}</small>
                  <strong>{evidence.title}</strong>
                  <p>{evidence.publisher || "Publisher not identified"}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        <div className={styles.checkCardGuidance}>
          <section>
            <span>Best next check</span>
            <p>{card.data.recommendedCheck}</p>
          </section>
          <section>
            <span>Keep in mind</span>
            <p>{card.data.limitation}</p>
          </section>
        </div>

        <footer className={styles.checkCardFooter}>
          <span>Evidence before confidence.</span>
          <small>
            {card.data.shareState === "READY"
              ? "Public report link available"
              : "Private report · share only when you are ready"}
          </small>
        </footer>
      </article>
    </section>
  );
}

function SpokenReportSummary({ report }: { report: VerificationReport }) {
  const [speakingLanguage, setSpeakingLanguage] =
    useState<SupportedLanguage>();
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const language = report.presentationLanguage ?? report.requestedLanguage;
  const speaking = speakingLanguage === language;
  const supported =
    typeof window !== "undefined" &&
    "speechSynthesis" in window &&
    "SpeechSynthesisUtterance" in window;
  const voice = useMemo(
    () => selectSpeechVoice(voices, language),
    [language, voices],
  );

  useEffect(() => {
    if (!supported) return;
    const synthesis = window.speechSynthesis;
    const refreshVoices = () => setVoices(synthesis.getVoices());
    refreshVoices();
    synthesis.addEventListener("voiceschanged", refreshVoices);
    return () =>
      synthesis.removeEventListener("voiceschanged", refreshVoices);
  }, [supported]);

  useEffect(
    () => () => {
      if (supported) window.speechSynthesis.cancel();
    },
    [supported],
  );

  useEffect(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
  }, [language, supported]);

  const play = () => {
    if (!supported || !voice) return;
    window.speechSynthesis.cancel();
    const text = buildSpokenReportSummary(report, language);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    utterance.lang = voice.lang || speechLocaleFor(language);
    utterance.rate = 0.92;
    utterance.onend = () => setSpeakingLanguage(undefined);
    utterance.onerror = () => setSpeakingLanguage(undefined);
    setSpeakingLanguage(language);
    window.speechSynthesis.speak(utterance);
    if (report.id) {
      void analyticsService
        .record("AUDIO_SUMMARY_USED", {
          reportId: report.id,
          verificationId: report.verificationId,
          mode: language,
          feature: `BROWSER_VOICE_${utterance.lang}`,
        })
        .catch(() => undefined);
    }
  };
  const stop = () => {
    window.speechSynthesis.cancel();
    setSpeakingLanguage(undefined);
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
        voice ? (
          <button
            aria-label={`Play spoken summary in ${language}`}
            aria-pressed={speaking}
            onClick={speaking ? stop : play}
            type="button"
          >
            {speaking ? "Stop summary" : "Play spoken summary"}
          </button>
        ) : voices.length === 0 ? (
          <small>Loading the voices available on this device…</small>
        ) : (
          <small>
            This device does not have a {language.toUpperCase()} voice. The
            written summary remains available.
          </small>
        )
      ) : (
        <small>Spoken summaries are not supported by this browser.</small>
      )}
    </section>
  );
}

export function ClaimWorkspace({ report }: { report: VerificationReport }) {
  const queryClient = useQueryClient();
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
    void reportService
      .inspectEvidence(report.id, selectedEvidence.evidenceId)
      .then((result) => {
        if (!result.recorded) return;
        void queryClient.invalidateQueries({
          queryKey: ["gamification-profile"],
        });
        void queryClient.invalidateQueries({
          queryKey: ["gamification-badges"],
        });
        void queryClient.invalidateQueries({
          queryKey: ["gamification-transactions"],
        });
        requestAchievementCelebrationCheck();
      })
      .catch(() => undefined);
    void analyticsService
      .record("EVIDENCE_SOURCE_OPENED", {
        reportId: report.id,
        verificationId: report.verificationId,
      })
      .catch(() => undefined);
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
              <h3>{claim.displayText ?? claim.text}</h3>
              {claim.displayText && claim.displayText !== claim.originalText && (
                <details className={styles.claimDetails}>
                  <summary>{REPORT_LANGUAGE_COPY[report.presentationLanguage ?? "en"].originalClaim}</summary>
                  <p lang={claim.originalLanguage}>{claim.originalText ?? claim.text}</p>
                </details>
              )}
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
        <EvidenceDetail evidence={selectedEvidence} onOpen={openEvidence} language={report.presentationLanguage} />
      </aside>
    </div>
  );
}

export function ReportClaimWorkspace({
  verificationId,
}: {
  verificationId: string;
}) {
  const [language] = useReportLanguage();
  const [mode, setMode] = useReportMode();
  const report = useQuery({
    queryFn: () => reportService.latest(verificationId, language),
    queryKey: ["report", verificationId, "latest", language ?? "default"],
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
  language = report.presentationLanguage ?? report.requestedLanguage ?? "en",
  onLanguageChange,
}: {
  report: VerificationReport;
  showActions?: boolean;
  showClaimWorkspace?: boolean;
  mode?: ReportMode;
  language?: SupportedLanguage;
  onLanguageChange?: (language: SupportedLanguage) => void;
}) {
  const reportCopy = REPORT_LANGUAGE_COPY[language];
  const queryClient = useQueryClient();
  const retryLocalization = useMutation({
    mutationFn: () => reportService.retryLocalization(report.id!, language),
    onSuccess: (localizedReport) => {
      queryClient.setQueriesData<VerificationReport>(
        {
          predicate: (query) => {
            if (query.queryKey[0] !== "report") return false;
            const cachedReport = query.state.data;
            return (
              !Array.isArray(cachedReport) &&
              typeof cachedReport === "object" &&
              cachedReport !== null &&
              "id" in cachedReport &&
              cachedReport.id === localizedReport.id
            );
          },
        },
        localizedReport,
      );

      if (report.verificationId) {
        void queryClient.invalidateQueries({
          queryKey: ["report", report.verificationId],
        });
      }
    },
  });
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
          <div>
            <dt>Source language</dt>
            <dd>{report.sourceLanguage || "Not detected"}</dd>
          </div>
          <div>
            <dt>Report language</dt>
            <dd>{report.presentationLanguage || report.requestedLanguage}</dd>
          </div>
        </dl>
        <div className={styles.simpleLanguage}>
          <div>
            <span>Report language</span>
            <strong>
              Switch the explanation without rerunning the investigation. Original claims and evidence stay unchanged.
            </strong>
          </div>
          <LanguageSelector
            value={language}
            variant="input"
            syncInterface={false}
            onChange={(nextLanguage) => {
              onLanguageChange?.(nextLanguage);
              if (showActions && report.id) {
                void analyticsService.record("REPORT_LANGUAGE_CHANGED", {
                  reportId: report.id,
                  verificationId: report.verificationId,
                  feature: nextLanguage,
                }).catch(() => undefined);
              }
            }}
          />
        </div>
        {report.localizationStatus === "PENDING" && (
          <section className={styles.sourceWarning} role="status">
            <span>Translation in progress</span>
            <div>
              <h2>The original report is ready.</h2>
              <p>
                Verith is preparing the requested translation. Canonical English
                is shown until the translated report passes validation.
              </p>
            </div>
          </section>
        )}
        {report.localizationStatus === "FALLBACK" && (
          <section className={styles.sourceWarning} role="status">
            <span>Translation unavailable</span>
            <div>
              <h2>Canonical English is shown safely.</h2>
              <p>
                The requested translation did not pass validation, so Verith
                kept the original analysis instead of showing an unreliable
                translation.
              </p>
              {showActions && report.id && (
                <button
                  type="button"
                  disabled={retryLocalization.isPending}
                  onClick={() => retryLocalization.mutate()}
                >
                  {retryLocalization.isPending
                    ? "Retrying translation…"
                    : report.localizationRetryable
                      ? "Retry translation"
                      : "Try translation again"}
                </button>
              )}
              {retryLocalization.isError && (
                <p role="alert">{retryLocalization.error.message}</p>
              )}
            </div>
          </section>
        )}
        {showActions && report.id && report.verificationId && (
          <ReportActions
            report={report}
            verificationId={report.verificationId}
            language={language}
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
          <section className={styles.simpleSummary}>
            <article>
              <span>{reportCopy.mainFinding}</span>
              <h3>{friendlyVerdict(report.overallVerdict)}</h3>
              <p>{friendlyReportText(report.summary)}</p>
            </article>
            <article>
              <span>{reportCopy.missingContext}</span>
              <h3>
                {report.missingContext[0]?.omittedContext ||
                  reportCopy.noMissingContext}
              </h3>
              <p>
                {report.missingContext[0]?.whyItMatters ||
                  reportCopy.keepLimitations}
              </p>
            </article>
            <article>
              <span>{reportCopy.strongestSources}</span>
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
                        {source.publisher || reportCopy.publisherUnknown} ·{" "}
                        {humanize(source.relationship)}
                      </small>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>
                  {reportCopy.noReadableSources}
                </p>
              )}
            </article>
            <article>
              <span>{reportCopy.mainLimitation}</span>
              <h3>
                {report.limitations[0] ||
                  reportCopy.noLimitation}
              </h3>
              <p>{reportCopy.evidenceReminder}</p>
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
                    <div className="!grid-cols-1 !gap-2">
                      <strong className="!text-left block text-xs font-semibold uppercase tracking-[0.12em] text-white/40">Extracted text</strong>
                      <p className="!text-left max-h-48 overflow-y-auto rounded-xl border border-white/[0.06] bg-black/30 p-3 font-mono text-xs leading-relaxed text-white/60 whitespace-pre-wrap break-words scrollbar-thin">{report.mediaAnalysis.fullText}</p>
                    </div>
                  )}
                {report.mediaAnalysis.mediaKind === "VIDEO" &&
                  report.mediaAnalysis.spokenText && (
                    <div className="!grid-cols-1 !gap-2">
                      <strong className="!text-left block text-xs font-semibold uppercase tracking-[0.12em] text-white/40">Spoken transcript</strong>
                      <p className="!text-left max-h-48 overflow-y-auto rounded-xl border border-white/[0.06] bg-black/30 p-3 font-mono text-xs leading-relaxed text-white/60 whitespace-pre-wrap break-words scrollbar-thin">{report.mediaAnalysis.spokenText}</p>
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
                    <div className="!grid-cols-1 !gap-2">
                      <strong className="!text-left block text-xs font-semibold uppercase tracking-[0.12em] text-white/40">Extracted video content</strong>
                      <p className="!text-left max-h-48 overflow-y-auto rounded-xl border border-white/[0.06] bg-black/30 p-3 font-mono text-xs leading-relaxed text-white/60 whitespace-pre-wrap break-words scrollbar-thin">{report.mediaAnalysis.fullText}</p>
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
  const [language, setLanguage] = useReportLanguage();
  const report = useQuery({
    queryFn: () => reportService.latest(verificationId, language),
    queryKey: ["report", verificationId, "latest", language ?? "default"],
    retry: 1,
  });
  const versions = useQuery({
    queryFn: () => reportService.versions(verificationId),
    queryKey: ["report", verificationId, "versions"],
    retry: 1,
  });
  const selectedReport = useQuery({
    enabled: Boolean(selectedReportId),
    queryFn: () => reportService.get(selectedReportId!, language),
    queryKey: ["report", verificationId, selectedReportId, language ?? "default"],
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
  const activeLanguage =
    language ?? displayed?.presentationLanguage ?? displayed?.requestedLanguage ?? "en";
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
          language={activeLanguage}
          onLanguageChange={setLanguage}
        />
      )}
    </>
  );
}
