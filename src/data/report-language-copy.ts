import type { SupportedLanguage } from "./supported-languages";

export const REPORT_LANGUAGE_COPY: Record<
  SupportedLanguage,
  {
    mainFinding: string;
    missingContext: string;
    noMissingContext: string;
    keepLimitations: string;
    strongestSources: string;
    noReadableSources: string;
    publisherUnknown: string;
    mainLimitation: string;
    noLimitation: string;
    evidenceReminder: string;
    originalExcerpt: string;
    originalClaim: string;
  }
> = {
  en: {
    mainFinding: "Main finding",
    missingContext: "Important missing context",
    noMissingContext: "No major missing-context finding was retained.",
    keepLimitations: "Keep the report limitations in view before acting on the finding.",
    strongestSources: "Strongest sources",
    noReadableSources: "No readable supporting or contradicting source was retained.",
    publisherUnknown: "Publisher unknown",
    mainLimitation: "Main limitation",
    noLimitation: "No report-level limitation was returned.",
    evidenceReminder: "Use the Evidence view before making a high-impact decision.",
    originalExcerpt: "Original excerpt",
    originalClaim: "See the original claim",
  },
  fr: {
    mainFinding: "Conclusion principale",
    missingContext: "Contexte manquant important",
    noMissingContext: "Aucun manque de contexte majeur n’a été retenu.",
    keepLimitations: "Tenez compte des limites du rapport avant d’agir.",
    strongestSources: "Sources les plus solides",
    noReadableSources: "Aucune source lisible favorable ou contradictoire n’a été retenue.",
    publisherUnknown: "Éditeur inconnu",
    mainLimitation: "Limite principale",
    noLimitation: "Aucune limite générale n’a été renvoyée.",
    evidenceReminder: "Consultez la vue Preuves avant une décision importante.",
    originalExcerpt: "Extrait original",
    originalClaim: "Voir l’affirmation originale",
  },
  es: {
    mainFinding: "Conclusión principal",
    missingContext: "Contexto ausente importante",
    noMissingContext: "No se conservó ninguna falta de contexto importante.",
    keepLimitations: "Ten presentes las limitaciones antes de actuar.",
    strongestSources: "Fuentes más sólidas",
    noReadableSources: "No se conservó ninguna fuente legible que apoye o contradiga.",
    publisherUnknown: "Editor desconocido",
    mainLimitation: "Limitación principal",
    noLimitation: "No se devolvió ninguna limitación general.",
    evidenceReminder: "Usa la vista Pruebas antes de tomar una decisión importante.",
    originalExcerpt: "Extracto original",
    originalClaim: "Ver la afirmación original",
  },
  yo: {
    mainFinding: "Àbájáde pàtàkì",
    missingContext: "Àyíká ọ̀rọ̀ pàtàkì tó sọnù",
    noMissingContext: "Kò sí àyíká ọ̀rọ̀ pàtàkì tó sọnù tí a pa mọ́.",
    keepLimitations: "Fi àwọn ààlà ìròyìn sí ọkàn kí o tó gbé ìgbésẹ̀.",
    strongestSources: "Àwọn orísun tó lágbára jù lọ",
    noReadableSources: "Kò sí orísun tó ṣeé kà tó fara mọ́ tàbí tako ọ̀rọ̀ náà.",
    publisherUnknown: "A kò mọ olùtẹ̀jáde",
    mainLimitation: "Ààlà pàtàkì",
    noLimitation: "Kò sí ààlà gbogbogbò tí a fi hàn.",
    evidenceReminder: "Lo ojú Ẹ̀rí kí o tó ṣe ìpinnu tó ṣe pàtàkì.",
    originalExcerpt: "Àyọkà ìpilẹ̀ṣẹ̀",
    originalClaim: "Wo ọ̀rọ̀ ìpilẹ̀ṣẹ̀",
  },
};
