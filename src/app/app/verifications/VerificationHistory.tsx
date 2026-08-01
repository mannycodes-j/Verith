"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import NewInvestigationButton from "@/components/app/NewInvestigationButton";
import { verificationService, type VerificationStatus } from "@/services/verification";
import { VERIFICATION_STATUS_OPTIONS as statusOptions } from "@/data/verification";
import { verificationHistoryStyles as styles } from "./verifications.styles";

function formatDate(value: string) {
	return new Intl.DateTimeFormat(undefined, {
		dateStyle: "medium",
		timeStyle: "short",
	}).format(new Date(value));
}

export default function VerificationHistory() {
	const [status, setStatus] = useState<VerificationStatus | "">("");
	const history = useQuery({
		queryFn: () => verificationService.list({ status: status || undefined }),
		queryKey: ["verifications", { status }],
	});

	return (
		<div className={styles.page}>
			<header className={styles.header}>
				<span>Investigation archive</span>
				<h1>Your evidence intelligence, organised over time.</h1>
				<p>Revisit every investigation, monitor live processing, and compare the evidence records that informed your previous decisions.</p>
			</header>

			<div className={styles.filters} style={{ marginBottom: 16 }}>
				<label htmlFor="history-status" className="my-auto">
					Status
				</label>
				<select id="history-status" value={status} onChange={(event) => setStatus(event.target.value as VerificationStatus | "")}>
					{statusOptions.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
				<NewInvestigationButton />
			</div>

			{history.isPending && (
				<div className={styles.loading} aria-busy="true">
					<span>Loading archive</span>
					{[0, 1, 2].map((item) => (
						<div key={item} />
					))}
				</div>
			)}

			{history.isError && (
				<div className={styles.error} role="alert">
					<span>Archive unavailable</span>
					<h2>Investigations could not be loaded.</h2>
					<p className="py-4">{history.error.message}</p>
					<button type="button" onClick={() => void history.refetch()}>
						Retry
					</button>
				</div>
			)}

			{history.data?.items.length === 0 && (
				<div className={styles.empty}>
					<span>No matching investigations</span>
					<h2>{status ? "No cases match this status." : "Your investigation archive is empty."}</h2>
					<p className="py-4">Create an investigation to begin a real evidence record. Verith does not populate this archive with demonstration reports.</p>
					<NewInvestigationButton label="Start an investigation" />
				</div>
			)}

			{history.data && history.data.items.length > 0 && (
				<div className={styles.list}>
					<div className={styles.listHeader}>
						<span>Case</span>
						<span>Source</span>
						<span>Status</span>
						<span>Evidence</span>
						<span>Updated</span>
						<span />
					</div>
					{history.data.items.map((record) => (
						<article className={styles.record} key={record.id}>
							<div>
								<span>{record.id}</span>
								<strong>{record.title || "Untitled investigation"}</strong>
							</div>
							<span>{record.sourceType}</span>
							<span data-status={record.status}>{record.status}</span>
							<span>{record.evidenceCount}</span>
							<span>{formatDate(record.updatedAt)}</span>
							<Link aria-label={`Open ${record.title || "investigation"}`} href={`/app/verifications/${record.id}`} className="ml-0!">
								<span>View</span>
								<ArrowUpRight size={14} />
							</Link>
						</article>
					))}
				</div>
			)}
		</div>
	);
}
