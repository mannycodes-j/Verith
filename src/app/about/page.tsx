import {
	Award,
	Bell,
	BookOpen,
	Bot,
	FileDown,
	FileSearch,
	Headphones,
	Languages,
	ListChecks,
	LockKeyhole,
	MessageSquareText,
	ScanSearch,
	ShieldCheck,
	Target,
	Users,
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import PublicEditorial from "@/components/public/PublicEditorial";

export const metadata: Metadata = {
	title: "About Verith | Verith",
	description: "Meet Verith: an evidence-led investigation and media-literacy product that helps people check uncertain information and build stronger judgement.",
};

const userFeatures = [
	{ icon: FileSearch, title: "Multimodal investigations", text: "Check text, images, screenshots, voice notes, and short videos in one workspace." },
	{ icon: ScanSearch, title: "Inspectable evidence", text: "See each checkable claim and open the sources that support, challenge, or explain it." },
	{ icon: ListChecks, title: "Three report views", text: "Use Simple for the essentials, Evidence for source details, or Learn for reusable lessons." },
	{ icon: ShieldCheck, title: "Guided Investigation", text: "Think through the source, claim, context, and possible warning signs before comparing your reasoning with the report." },
	{ icon: BookOpen, title: "Learning and practice", text: "Build your skills with courses, lessons, quizzes, daily practice, and community missions." },
	{ icon: Bot, title: "MIL Coach", text: "Turn a completed report into a focused learning moment, a useful next check, and a related lesson or challenge." },
	{ icon: Award, title: "Visible progress", text: "Track completed work, competency growth, XP, ranks, streaks, and badges earned through real activity." },
	{ icon: Languages, title: "Multilingual support", text: "Investigate and read reports in English, French, Spanish, and Yorùbá while keeping original material available." },
	{ icon: Headphones, title: "Spoken summaries", text: "Listen to the essential report points using a supported voice available in your browser." },
	{ icon: FileDown, title: "History, sharing, and exports", text: "Return to earlier investigations, download a report, and share only when you choose to." },
	{ icon: MessageSquareText, title: "Report feedback", text: "Send feedback about a report when something needs review, clarification, or improvement." },
	{ icon: Bell, title: "Useful notifications", text: "Choose alerts for completed or failed investigations, learning, daily practice, streaks, achievements, and product updates." },
	{ icon: LockKeyhole, title: "Privacy and account controls", text: "Manage profile visibility, data choices, password and sessions, and whether eligible progress appears on leaderboards." },
] as const;

export default function AboutPage() {
	return (
		<PublicEditorial
			eyebrow="About Verith"
			introduction="Verith is a digital investigation and learning companion for people who want to check uncertain information, understand the reasons behind a result, and make safer sharing decisions."
			sections={[
				{
					label: "What Verith is",
					title: "A place to pause before you believe, share, or act.",
					content: (
						<p>
							Misinformation often arrives as an urgent message, a convincing screenshot, a familiar voice, or a short clip without enough context. Verith helps you slow the moment down. It breaks the content into claims, looks for relevant sources, explains what the evidence says, and shows what remains uncertain.
						</p>
					),
				},
				{
					label: "Purpose",
					title: "Help ordinary people make evidence-informed decisions.",
					content: (
						<p>
							Verith exists because a label such as “true” or “false” is not enough. People deserve to see the claims, sources, missing context, and limitations behind a finding. The purpose is not to tell you what to think; it is to give you a clearer basis for deciding.
						</p>
					),
				},
				{
					label: "Mission",
					title: "Make careful verification understandable and useful every day.",
					content: (
						<div className="rounded-3xl border border-violet-300/15 bg-violet-400/[0.06] p-7">
							<Target aria-hidden="true" className="mb-5 text-violet-200" size={26} />
							<p className="!mb-0">Our mission is to help people examine digital content, recognise manipulation and missing context, find better sources, and practise habits that make them more confident and responsible online.</p>
						</div>
					),
				},
				{
					label: "Vision",
					title: "Digital communities where careful judgement becomes a shared habit.",
					content: (
						<p>
							We imagine a future where people do not have to choose between blindly trusting technology and facing misinformation alone. Verith aims to make evidence easier to inspect and media-literacy skills easier to build, so better decisions can spread through families, schools, workplaces, and communities.
						</p>
					),
				},
				{
					label: "What users can do",
					title: "One account for investigation, learning, and progress.",
					content: (
						<div className="grid gap-5 sm:grid-cols-2">
							{userFeatures.map(({ icon: Icon, text, title }) => (
								<article className="rounded-3xl border border-white/10 bg-white/[0.035] p-6" key={title}>
									<span className="grid size-11 place-items-center rounded-2xl bg-violet-400/10 text-violet-200"><Icon aria-hidden="true" size={20} /></span>
									<h3 className="mt-5 text-lg font-bold text-white">{title}</h3>
									<p className="!mb-0 mt-3 !text-sm !leading-6 text-white/55">{text}</p>
								</article>
							))}
						</div>
					),
				},
				{
					label: "Our promise",
					title: "AI can assist the investigation. It is not the final authority.",
					content: (
						<div>
							<p>Verith can organise claims, find and compare sources, and explain patterns quickly. It can also encounter incomplete pages, weak sources, language errors, or information that has not yet been published.</p>
							<p>That is why evidence and limitations stay visible. A careful user remains part of the process, and uncertainty is shown instead of being hidden.</p>
						</div>
					),
				},
				{
					label: "Join in",
					title: "Build a healthier relationship with information.",
					content: (
						<div>
							<Users aria-hidden="true" className="mb-5 text-violet-200" size={26} />
							<p>Start with one message you are unsure about, then keep learning through practice. Every careful check is a chance to make a better decision and strengthen a skill you can share with others.</p>
							<div className="flex flex-wrap gap-3">
								<Link className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-bold !text-black !no-underline transition-transform hover:scale-105" href="/register">Create an account</Link>
								<Link className="inline-flex rounded-full border border-white/15 px-6 py-3 text-sm font-bold !no-underline transition-colors hover:bg-white/5" href="/how-it-works">See how it works</Link>
							</div>
						</div>
					),
				},
			]}
			title="Understand the information in front of you—and strengthen the judgement behind your next decision."
		/>
	);
}
