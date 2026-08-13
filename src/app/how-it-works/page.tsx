import {
	BadgeCheck,
	BookOpen,
	Brain,
	FileSearch,
	GraduationCap,
	History,
	Languages,
	ScanSearch,
	ShieldCheck,
	Sparkles,
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import PublicEditorial from "@/components/public/PublicEditorial";

export const metadata: Metadata = {
	title: "How to use Verith | Verith",
	description:
		"Learn how to investigate uncertain content, understand evidence, and build practical media-literacy skills with Verith.",
};

const investigationSteps = [
	{
		icon: FileSearch,
		title: "Bring the content you are unsure about",
		text: "Paste a message or claim, or upload a clear image, screenshot, voice note, or short video. Keep names, dates, captions, and surrounding details visible whenever possible.",
	},
	{
		icon: Brain,
		title: "Tell Verith what you need to know",
		text: "Ask one clear question, such as “Did this happen this week?” or “Is this health advice supported by reliable sources?” A focused question produces a more useful investigation.",
	},
	{
		icon: ScanSearch,
		title: "Follow the investigation",
		text: "Verith identifies the claims that can be checked, looks for relevant sources, compares what those sources say, and shows the progress while the work is happening.",
	},
	{
		icon: ShieldCheck,
		title: "Read the reasons before you decide",
		text: "Start with the simple finding, then open the evidence. See what supports the claim, what challenges it, what adds context, and what Verith could not confirm before you share or act.",
	},
] as const;

const learningTools = [
	{
		icon: GraduationCap,
		title: "Courses and lessons",
		text: "Follow organised learning paths or take a short lesson when you want to understand one skill, such as checking a source or spotting missing context.",
	},
	{
		icon: BookOpen,
		title: "Quizzes and daily practice",
		text: "Check what you understood, read the explanation for each answer, and practise with a fresh set of questions that strengthens everyday verification habits.",
	},
	{
		icon: Sparkles,
		title: "Community missions",
		text: "Apply your skills to realistic situations, reflect on your decision, and complete follow-up activities that show how your judgement is improving.",
	},
	{
		icon: BadgeCheck,
		title: "Progress and achievements",
		text: "See completed learning, investigation milestones, streaks, XP, ranks, and badges. These rewards recognise consistent practice; they do not replace evidence or careful judgement.",
	},
	{
		icon: History,
		title: "Your investigation history",
		text: "Return to earlier reports, compare what you learned, and revisit a decision when better information becomes available.",
	},
	{
		icon: Languages,
		title: "Four supported languages",
		text: "Use Verith in English, French, Spanish, or Yorùbá. The original content stays available while the report can be presented in your selected supported language.",
	},
] as const;

export default function HowItWorksPage() {
	return (
		<PublicEditorial
			eyebrow="How to use Verith"
			introduction="Verith helps you slow down, check uncertain information, understand the evidence, and practise skills you can use long after one investigation is finished."
			sections={[
				{
					label: "Start well",
					title: "A clear question gives you a clearer result.",
					content: (
						<div>
							<p>
								Use the most complete version of the content you have. An uncropped screenshot is better than a small fragment, a clear recording is better than a noisy one,
								and a full message is better than one sentence without context.
							</p>
							<div className="mt-8 rounded-3xl border border-violet-300/15 bg-violet-400/[0.06] p-6">
								<p className="!mb-2 text-sm font-bold uppercase tracking-[0.14em] text-violet-200">A useful question</p>
								<p className="!mb-0 text-base text-white/65">“This message says all Nigerian bank accounts must be verified by Friday. Was this announced by the bank or government?”</p>
							</div>
						</div>
					),
				},
				{
					label: "Investigate",
					title: "From uncertain content to a decision you can explain.",
					content: (
						<div className="grid gap-5 sm:grid-cols-2">
							{investigationSteps.map(({ icon: Icon, text, title }, index) => (
								<article className="rounded-3xl border border-white/10 bg-white/[0.035] p-6" key={title}>
									<div className="flex items-center justify-between gap-4">
										<span className="grid size-11 place-items-center rounded-2xl bg-violet-400/10 text-violet-200"><Icon aria-hidden="true" size={20} /></span>
										<span className="text-xs font-bold text-white/35">0{index + 1}</span>
									</div>
									<h3 className="mt-5 text-lg font-bold text-white">{title}</h3>
									<p className="!mb-0 mt-3 !text-sm !leading-6 text-white/55">{text}</p>
								</article>
							))}
						</div>
					),
				},
				{
					label: "Understand",
					title: "Choose the report view that feels right for you.",
					content: (
						<div>
							<p><strong className="text-white">Simple</strong> gives you the main finding, the most important reason, what is missing, and a sensible next step.</p>
							<p><strong className="text-white">Evidence</strong> lets you inspect each claim and open the sources that support, challenge, or add context to it.</p>
							<p><strong className="text-white">Learn</strong> explains the habits and warning signs behind the investigation so you can recognise them elsewhere.</p>
							<p className="!mb-0">A result is not an order about what to believe. Check the sources and limitations, then make your own informed decision.</p>
						</div>
					),
				},
				{
					label: "Build your skills",
					title: "Do more than check one message.",
					content: (
						<div className="grid gap-5 sm:grid-cols-2">
							{learningTools.map(({ icon: Icon, text, title }) => (
								<article className="rounded-3xl border border-white/10 bg-[#0e0e0e] p-6" key={title}>
									<span className="grid size-11 place-items-center rounded-2xl bg-white/[0.05] text-violet-200"><Icon aria-hidden="true" size={20} /></span>
									<h3 className="mt-5 text-lg font-bold text-white">{title}</h3>
									<p className="!mb-0 mt-3 !text-sm !leading-6 text-white/55">{text}</p>
								</article>
							))}
						</div>
					),
				},
				{
					label: "Use it wisely",
					title: "Five habits for effective investigations.",
					content: (
						<ol className="list-decimal pl-6">
							<li>Check one main claim at a time.</li>
							<li>Keep the original source, date, account name, and surrounding context.</li>
							<li>Use Guided Investigation when you want to think through the content before seeing the final report.</li>
							<li>Open the strongest sources and read the limitations—not only the verdict.</li>
							<li>If the evidence is weak or unavailable, pause before sharing and check again later.</li>
						</ol>
					),
				},
				{
					label: "Get started",
					title: "Bring one uncertain claim. Leave with a better question.",
					content: (
						<div>
							<p>Your account keeps investigations, learning progress, privacy choices, and achievements together in one workspace.</p>
							<div className="flex flex-wrap gap-3">
								<Link className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-bold !text-black !no-underline transition-transform hover:scale-105" href="/login">Start an investigation</Link>
								<Link className="inline-flex rounded-full border border-white/15 px-6 py-3 text-sm font-bold !no-underline transition-colors hover:bg-white/5" href="/learning">Explore learning</Link>
							</div>
						</div>
					),
				},
			]}
			title="Check information carefully. Build skills that stay with you."
		/>
	);
}
