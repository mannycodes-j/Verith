export type LandingIconKey =
	| "capture"
	| "focus"
	| "inspect"
	| "decide"
	| "investigate"
	| "evidence"
	| "learning"
	| "practice"
	| "achievements"
	| "history";

export interface LandingGuideItem {
	iconKey: LandingIconKey;
	title: string;
	description: string;
	tip: string;
}

export interface LandingCapability {
	iconKey: LandingIconKey;
	title: string;
	description: string;
}
