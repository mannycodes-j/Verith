import type { Metadata } from "next";
import PublicEditorial from "@/components/public/PublicEditorial";

export const metadata: Metadata = { title: "Terms | Verith" };

export default function TermsPage() {
  return (
    <PublicEditorial
      eyebrow="Policy / Terms"
      introduction="These product-use principles are not a substitute for deployment-specific legal terms. The operator must add jurisdiction, effective date, contact details, and legally reviewed provisions before public production use."
      sections={[
        {
          label: "01 / Use",
          title: "Use reports as qualified analysis.",
          content: (
            <p>
              Verith reports may be incomplete, uncertain, or affected by
              unavailable evidence and providers. Review cited sources and
              limitations before acting on or redistributing a conclusion.
            </p>
          ),
        },
        {
          label: "02 / Responsibility",
          title: "Do not treat indicators as proof.",
          content: (
            <p>
              AI-generation, manipulation, bias, credibility, and risk signals
              are analytical indicators. They do not independently establish
              intent, authorship, legality, or absolute truth.
            </p>
          ),
        },
        {
          label: "03 / Content",
          title: "Submit material you may lawfully process.",
          content: (
            <p>
              Users remain responsible for submitted content, source access,
              sharing choices, and compliance with applicable rights and law.
              Public report links should be revoked when access is no longer
              intended.
            </p>
          ),
        },
        {
          label: "04 / Availability",
          title: "Providers and processing can fail.",
          content: (
            <p>
              Search, email, media, transcription, AI, queue, and messaging
              providers may be unavailable. Verith exposes supported retry and
              partial-result states rather than guaranteeing completion.
            </p>
          ),
        },
      ]}
      title="Use Verith with evidence-aware judgment."
    />
  );
}
