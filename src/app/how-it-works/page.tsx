import {
  BookOpen,
  Eye,
  FileSearch,
  Library,
  MessageSquareText,
  Settings2,
} from "lucide-react";
import type { Metadata } from "next";
import PublicEditorial from "@/components/public/PublicEditorial";

export const metadata: Metadata = {
  title: "How verification works | Verith",
};

const roleJourneys = [
  {
    description:
      "Explore Verith’s evidence method, published learning material, WhatsApp workflow, and reports that their owners intentionally made public. Sign in before starting private work.",
    icon: Eye,
    outcome: "Learn and inspect",
    role: "Public visitor",
  },
  {
    description:
      "Submit supported text, links, images, screenshots, or audio; follow real processing stages; inspect claims, sources, uncertainty, limitations, and recommended actions; then control personal history, sharing, learning, privacy, sessions, notifications, and WhatsApp.",
    icon: FileSearch,
    outcome: "Investigate uncertain content",
    role: "Investigator",
  },
  {
    description:
      "Keep the complete investigator workspace and add a focused queue for reviewing report feedback, recording a reasoned resolution, and closing or dismissing the case.",
    icon: MessageSquareText,
    outcome: "Resolve report feedback",
    role: "Moderator",
  },
  {
    description:
      "Keep the investigator workspace and govern the publication lifecycle for courses, lessons, quizzes, and daily challenges without gaining access to verification operations or AI infrastructure.",
    icon: BookOpen,
    outcome: "Govern learning material",
    role: "Content editor",
  },
  {
    description:
      "Add moderation and editorial access, safe user and verification operations, failed-job retries, publisher credibility review, badge governance, analytics, and system health monitoring.",
    icon: Library,
    outcome: "Operate the platform safely",
    role: "Administrator",
  },
  {
    description:
      "Add role assignment, append-only audit records, AI-provider configuration, and versioned prompt publication or rollback—the controls that can affect authorization and platform-wide verification behavior.",
    icon: Settings2,
    outcome: "Govern high-impact controls",
    role: "Super administrator",
  },
] as const;

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
        {
          label: "Role pathways",
          title: "One evidence system. Clear responsibilities.",
          content: (
            <div>
              <p>
                Every signed-in account receives a private investigation
                workspace. Elevated roles add narrowly scoped moderation,
                editorial, operational, or governance responsibilities. Every
                protected request is authorized by the backend; navigation
                visibility is never treated as permission.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {roleJourneys.map(
                  ({ description, icon: Icon, outcome, role }) => (
                    <article
                      className="rounded-2xl border border-white/[0.055] bg-white/[0.025] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-400/20 hover:bg-violet-500/[0.045]"
                      key={role}
                    >
                      <span className="grid size-10 place-items-center rounded-xl bg-violet-500/10 text-violet-300">
                        <Icon aria-hidden="true" size={18} />
                      </span>
                      <small className="mt-5 block text-[10px] font-semibold uppercase tracking-[0.13em] text-violet-300">
                        {role}
                      </small>
                      <h3 className="mt-2 mb-0 text-base font-semibold text-white">
                        {outcome}
                      </h3>
                      <p className="mt-3 mb-0 text-xs leading-6 text-white/45">
                        {description}
                      </p>
                    </article>
                  ),
                )}
              </div>
            </div>
          ),
        },
      ]}
      title="From source material to inspectable evidence."
    />
  );
}
