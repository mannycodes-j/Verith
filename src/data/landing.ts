import type { LandingCapability, LandingGuideItem } from "@/types/landing";

export const INVESTIGATION_GUIDE: LandingGuideItem[] = [
	{
		iconKey: "capture",
		title: "Bring the clearest original",
		description:
			"Use the full message, uncropped screenshot, clear voice note, or short video whenever possible. Keep dates, captions, account names, and surrounding context visible.",
		tip: "Better input gives Verith more context to examine.",
	},
	{
		iconKey: "focus",
		title: "Ask one focused question",
		description:
			"Name the exact claim you need checked and why it matters. A precise question helps the investigation prioritise the evidence that supports your decision.",
		tip: "Try: “Did this event happen in Lagos this week?”",
	},
	{
		iconKey: "inspect",
		title: "Open the evidence, not just the verdict",
		description:
			"Compare supporting, contradicting, and contextual sources. Check who published each source, when it was published, and whether independent sources agree.",
		tip: "Treat confidence and limitations as part of the answer.",
	},
	{
		iconKey: "decide",
		title: "Choose the safest next action",
		description:
			"Use the report to decide whether to share, pause, ask for more context, or correct the claim. Revisit the investigation if stronger evidence appears later.",
		tip: "When evidence is weak, waiting is a valid decision.",
	},
];

export const USER_CAPABILITIES: LandingCapability[] = [
	{
		iconKey: "investigate",
		title: "Investigate everyday media",
		description: "Check text, images, screenshots, voice notes, and short videos from one private workspace.",
	},
	{
		iconKey: "evidence",
		title: "Understand the evidence",
		description: "Read claim-by-claim explanations and inspect the sources that support, challenge, or add context.",
	},
	{
		iconKey: "practice",
		title: "Think through guided checks",
		description: "Use guided investigations to practise your own reasoning before comparing it with Verith’s analysis.",
	},
	{
		iconKey: "learning",
		title: "Build practical skills",
		description: "Learn through courses, lessons, quizzes, and daily challenges designed around real verification habits.",
	},
	{
		iconKey: "achievements",
		title: "Track meaningful progress",
		description: "Earn XP, ranks, and badges for completed work while keeping media-literacy competencies separate.",
	},
	{
		iconKey: "history",
		title: "Return to your work",
		description: "Search your investigation history, reopen reports, monitor outcomes, and control your privacy preferences.",
	},
];
