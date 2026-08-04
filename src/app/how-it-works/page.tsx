import { BookOpen, Eye, FileSearch, Library, MessageSquareText, Settings2 } from "lucide-react";
import type { Metadata } from "next";
import PublicEditorial from "@/components/public/PublicEditorial";

export const metadata: Metadata = {
	title: "How verification works | Verith",
};

const roleJourneys = [
	{
		description: "Explore Verith’s evidence method, published learning material, WhatsApp workflow, and reports that their owners intentionally made public. Sign in before starting private work.",
		icon: Eye,
		outcome: "Learn and inspect",
		role: "Public visitor",
	},
	{
		description: "Submit supported text, links, images, screenshots, audio, or short video; follow real processing stages; inspect claims, sources, uncertainty, limitations, and recommended actions; then control personal history, sharing, learning, privacy, sessions, notifications, and WhatsApp.",
		icon: FileSearch,
		outcome: "Investigate uncertain content",
		role: "Member",
	},
	{
		description: "Keep the complete member workspace and add a focused queue for reviewing report feedback, recording a reasoned resolution, and closing or dismissing the case.",
		icon: MessageSquareText,
		outcome: "Resolve report feedback",
		role: "Moderator",
	},
	{
		description: "Keep the member workspace and govern the publication lifecycle for courses, lessons, quizzes, and daily challenges without gaining access to verification operations or AI infrastructure.",
		icon: BookOpen,
		outcome: "Govern learning material",
		role: "Content editor",
	},
	{
		description: "Add moderation and editorial access, safe user and verification operations, failed-job retries, publisher credibility review, badge governance, analytics, and system health monitoring.",
		icon: Library,
		outcome: "Operate the platform safely",
		role: "Administrator",
	},
	{
		description: "Add role assignment, append-only audit records, AI-provider configuration, and versioned prompt publication or rollback—the controls that can affect authorization and platform-wide verification behavior.",
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
					content: <p>Text, links, supported images, screenshots, audio, and short video are validated before processing. Media uses owner-bound signed uploads and is confirmed against the provider before attachment.</p>,
				},
				{
					label: "Extract",
					title: "Identify claims and searchable questions.",
					content: <p>Verith prepares content, detects language where available, transcribes or extracts visible text when applicable, then creates claim records and evidence-search queries.</p>,
				},
				{
					label: "Compare",
					title: "Retrieve and relate evidence.",
					content: <p>Retrieved sources are normalized and mapped as supporting, contradicting, or contextual evidence. Unavailable sources and unknown credibility remain explicit limitations.</p>,
				},
				{
					label: "Explain",
					title: "Assemble an inspectable report.",
					content: (
						<p>
							The report separates evidence, inference, confidence, manipulation indicators, missing context, source assessment, and limitations. AI-generation indicators are never presented as
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
								Every signed-in account receives a private investigation workspace. Elevated roles add narrowly scoped moderation, editorial, operational, or governance responsibilities.
								Every protected request is authorized by the backend; navigation visibility is never treated as permission.
							</p>
							<div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
								{roleJourneys.map(({ description, icon: Icon, outcome, role }, index) => (
									<article
										className="group relative rounded-3xl border border-white/5 bg-[#0e0e0e] p-8 transition-all hover:bg-[#111] hover:border-white/10 overflow-hidden"
										key={role}
									>
										<div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
										<div className="relative flex items-center justify-between mb-8">
											<span className="flex size-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white shadow-sm">
												<Icon aria-hidden="true" size={20} strokeWidth={2.5} />
											</span>
											<span className="text-xs font-bold uppercase tracking-[0.15em] text-white/50">
												0{index + 1}
											</span>
										</div>
										<h3 className="relative text-2xl font-bold tracking-tight text-white mb-2">{outcome}</h3>
										<span className="relative inline-block mb-3 text-sm font-bold text-white/70">{role}</span>
										<p className="relative text-base font-medium leading-relaxed text-white/60">{description}</p>
									</article>
								))}
							</div>
						</div>
					),
				},
			]}
			title="From source material to inspectable evidence."
		/>
	);
}
