import type { SupportedLanguage } from "@/data/supported-languages";

type SpokenSummaryReport = {
  overallVerdict?: string;
  summary?: string;
  limitations?: string[];
  recommendedActions?: string[];
};

type VoiceLike = {
  default?: boolean;
  lang: string;
};

const SPEECH_LOCALES: Record<SupportedLanguage, readonly string[]> = {
  en: ["en-NG", "en-GB", "en-US"],
  fr: ["fr-FR", "fr-CA"],
  es: ["es-ES", "es-MX", "es-US"],
  yo: ["yo-NG", "yo"],
};

const SPOKEN_COPY: Record<
  SupportedLanguage,
  {
    finding: string;
    why: string;
    limitation: string;
    action: string;
    missingFinding: string;
    missingSummary: string;
    missingLimitation: string;
    missingAction: string;
  }
> = {
  en: {
    finding: "Main finding",
    why: "Why",
    limitation: "Important limitation",
    action: "Recommended action",
    missingFinding: "Result unavailable",
    missingSummary: "Open the complete report for the explanation",
    missingLimitation: "Open the complete report for context",
    missingAction: "Inspect the evidence before sharing",
  },
  fr: {
    finding: "Conclusion principale",
    why: "Pourquoi",
    limitation: "Limite importante",
    action: "Action recommandée",
    missingFinding: "Résultat indisponible",
    missingSummary: "Ouvrez le rapport complet pour consulter l’explication",
    missingLimitation: "Ouvrez le rapport complet pour comprendre le contexte",
    missingAction: "Examinez les preuves avant de partager",
  },
  es: {
    finding: "Conclusión principal",
    why: "Por qué",
    limitation: "Limitación importante",
    action: "Acción recomendada",
    missingFinding: "Resultado no disponible",
    missingSummary: "Abra el informe completo para consultar la explicación",
    missingLimitation: "Abra el informe completo para comprender el contexto",
    missingAction: "Revise las pruebas antes de compartir",
  },
  yo: {
    finding: "Àbájáde pàtàkì",
    why: "Ìdí",
    limitation: "Ààlà pàtàkì",
    action: "Ìgbésẹ̀ tí a dábàá",
    missingFinding: "Àbájáde kò sí",
    missingSummary: "Ṣí ẹ̀kúnrẹ́rẹ́ ìròyìn láti gbọ́ àlàyé",
    missingLimitation: "Ṣí ẹ̀kúnrẹ́rẹ́ ìròyìn láti lóye àyíká ọ̀rọ̀",
    missingAction: "Ṣàyẹ̀wò ẹ̀rí kí o tó pín in",
  },
};

const SPOKEN_VERDICTS: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    SUPPORTED: "The evidence supports this",
    CONTRADICTED: "The evidence does not support this",
    MIXED: "The evidence is mixed",
    MISLEADING: "This may be misleading",
    INSUFFICIENT_EVIDENCE: "We need better evidence",
    UNVERIFIABLE: "We could not verify this",
    OUTDATED: "This information appears outdated",
  },
  fr: {
    SUPPORTED: "Les preuves confirment cette affirmation",
    CONTRADICTED: "Les preuves ne confirment pas cette affirmation",
    MIXED: "Les preuves sont partagées",
    MISLEADING: "Cette affirmation peut être trompeuse",
    INSUFFICIENT_EVIDENCE: "Des preuves plus solides sont nécessaires",
    UNVERIFIABLE: "Nous n’avons pas pu vérifier cette affirmation",
    OUTDATED: "Ces informations semblent dépassées",
  },
  es: {
    SUPPORTED: "Las pruebas respaldan esta afirmación",
    CONTRADICTED: "Las pruebas no respaldan esta afirmación",
    MIXED: "Las pruebas son contradictorias",
    MISLEADING: "Esta afirmación puede ser engañosa",
    INSUFFICIENT_EVIDENCE: "Se necesitan pruebas más sólidas",
    UNVERIFIABLE: "No pudimos verificar esta afirmación",
    OUTDATED: "Esta información parece desactualizada",
  },
  yo: {
    SUPPORTED: "Ẹ̀rí náà ti àbá yìí lẹ́yìn",
    CONTRADICTED: "Ẹ̀rí náà kò ti àbá yìí lẹ́yìn",
    MIXED: "Ẹ̀rí náà kò fara mọ́ ara rẹ̀",
    MISLEADING: "Àbá yìí lè ṣi ènìyàn lọ́nà",
    INSUFFICIENT_EVIDENCE: "A nílò ẹ̀rí tó dára sí i",
    UNVERIFIABLE: "A kò lè jẹ́rìí sí àbá yìí",
    OUTDATED: "Ó dàbí ẹni pé ìwífún yìí ti kọjá àsìkò",
  },
};

export function speechLocaleFor(language: SupportedLanguage) {
  return SPEECH_LOCALES[language][0];
}

export function selectSpeechVoice<T extends VoiceLike>(
  voices: readonly T[],
  language: SupportedLanguage,
): T | undefined {
  const preferred = SPEECH_LOCALES[language].map((locale) =>
    locale.toLowerCase(),
  );
  const exact = preferred
    .map((locale) =>
      voices.find((voice) => voice.lang.toLowerCase() === locale),
    )
    .find(Boolean);
  if (exact) return exact;

  const prefix = `${language.toLowerCase()}-`;
  const matches = voices.filter((voice) => {
    const locale = voice.lang.toLowerCase();
    return locale === language || locale.startsWith(prefix);
  });
  return matches.find((voice) => voice.default) ?? matches[0];
}

export function buildSpokenReportSummary(
  report: SpokenSummaryReport,
  language: SupportedLanguage,
) {
  const copy = SPOKEN_COPY[language];
  const verdict = report.overallVerdict
    ? SPOKEN_VERDICTS[language][report.overallVerdict] ??
      report.overallVerdict.replaceAll("_", " ").toLowerCase()
    : copy.missingFinding;

  return [
    `${copy.finding}: ${verdict}.`,
    `${copy.why}: ${report.summary || copy.missingSummary}.`,
    `${copy.limitation}: ${report.limitations?.[0] || copy.missingLimitation}.`,
    `${copy.action}: ${report.recommendedActions?.[0] || copy.missingAction}.`,
  ].join(" ");
}
