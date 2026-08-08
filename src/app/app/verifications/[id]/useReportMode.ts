"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type ReportMode = "simple" | "evidence" | "learn";

export function useReportMode(): [ReportMode, (mode: ReportMode) => void] {
	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();
	const raw = searchParams.get("report");
	const mode: ReportMode = raw === "simple" || raw === "learn" ? raw : "evidence";
	return [mode, (next) => {
		const query = new URLSearchParams(searchParams.toString());
		query.set("report", next);
		router.replace(`${pathname}?${query}`, { scroll: false });
	}];
}

