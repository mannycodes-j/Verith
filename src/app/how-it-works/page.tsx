import type { Metadata } from "next";
import PublicEditorial from "@/components/public/PublicEditorial";

export const metadata: Metadata = {
  title: "How verification works | Verith",
};

export default function HowItWorksPage() {
  return (
    <PublicEditorial
      eyebrow="Verification workflow"
      introduction="Verith processes submitted material through persisted stages. A stage describes completed work; it is not converted into a fabricated percentage when the backend supplies no finer measurement."
      sections={[
        {
          label: "Receive",
          title: "Preserve the submitted material.",
          content: (
            <p>
              Text, links, supported images, screenshots, and audio are
              validated before processing. Media uses owner-bound signed uploads
              and is confirmed against the provider before attachment.
            </p>
          ),
        },
        {
          label: "Extract",
          title: "Identify claims and searchable questions.",
          content: (
            <p>
              Verith prepares content, detects language where available,
              transcribes or extracts visible text when applicable, then creates
              claim records and evidence-search queries.
            </p>
          ),
        },
        {
          label: "Compare",
          title: "Retrieve and relate evidence.",
          content: (
            <p>
              Retrieved sources are normalized and mapped as supporting,
              contradicting, or contextual evidence. Unavailable sources and
              unknown credibility remain explicit limitations.
            </p>
          ),
        },
        {
          label: "Explain",
          title: "Assemble an inspectable report.",
          content: (
            <p>
              The report separates evidence, inference, confidence,
              manipulation indicators, missing context, source assessment, and
              limitations. AI-generation indicators are never presented as
              proof.
            </p>
          ),
        },
      ]}
      title="From source material to inspectable evidence."
    />
  );
}
