const VERDICT_COPY: Record<string, string> = {
  SUPPORTED: "The evidence supports this",
  CONTRADICTED: "The evidence does not support this",
  MIXED: "The evidence is mixed",
  MISLEADING: "This may be misleading",
  INSUFFICIENT_EVIDENCE: "We need better evidence",
  UNVERIFIABLE: "We could not verify this",
  OUTDATED: "This information appears outdated",
};

export function friendlyVerdict(value: string | undefined) {
  return value ? VERDICT_COPY[value] ?? friendlyLabel(value) : "Result unavailable";
}

export function friendlyLabel(value: string | undefined) {
  if (!value) return "Unavailable";
  const words = value.replaceAll("_", " ").toLowerCase();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

export function friendlyReportText(value: string | undefined) {
  if (!value) return "Verith did not receive enough information to explain this result.";
  if (/all retrieved evidence sources failed to fetch/i.test(value)) {
    return "We found possible sources, but could not open enough of them to check this claim fairly. Verith will not guess—try again later or open the listed sources yourself.";
  }
  if (/making it impossible to verify/i.test(value)) {
    return "We could not open enough reliable source material to verify this claim. This is not a true-or-false decision.";
  }
  return value;
}

export function friendlyConfidence(value: number | undefined) {
  if (typeof value !== "number" || !Number.isFinite(value)) return "Not available";
  const percentage = Math.round(value * 100);
  if (percentage < 35) return `Low confidence (${percentage}%)`;
  if (percentage < 70) return `Moderate confidence (${percentage}%)`;
  return `High confidence (${percentage}%)`;
}

export function reportPercentage(value: number | undefined) {
  return typeof value === "number" && Number.isFinite(value) ? `${Math.round(value * 100)}%` : "Unavailable";
}

export function formatReportDate(value: string | undefined) {
  if (!value) return "Unavailable";
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? "Unavailable" : new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(date);
}
