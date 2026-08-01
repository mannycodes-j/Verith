"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { adminService, type AdminRecord, type CursorPage } from "@/services/admin";
import { ADMIN_COLLECTION_COPY } from "@/data/admin-content";
import type { AdminCollectionKind as Kind } from "@/types/admin-content";
import { adminStyles as styles } from "./admin.styles";
import AdminContentCreateDialog, { type CreatableContent } from "./AdminContentCreateDialog";

function getRecords(kind: Kind): Promise<CursorPage<AdminRecord>> {
	if (kind === "publishers") return adminService.publishers();
	if (kind === "feedback") return adminService.feedback();
	if (kind === "prompts") return adminService.prompts();
	if (kind === "badges")
		return adminService.badges().then((items) => ({
			items,
			pagination: {
				hasNextPage: false,
				limit: items.length,
				nextCursor: null,
				previousCursor: null,
			},
		}));
	return adminService.contentRecords(kind);
}

function label(record: AdminRecord) {
	return record.title ?? record.name ?? record.domain ?? record.key ?? record.slug ?? record.id ?? record._id;
}

function recordPath(kind: Kind, id: string): string {
	const base = kind === "prompts" ? "/admin/ai/prompts" : `/admin/${kind}`;
	return `${base}/${id}`;
}

export default function AdminCollection({ kind }: { kind: Kind }) {
	const query = useQuery({
		queryFn: () => getRecords(kind),
		queryKey: ["admin", kind],
		retry: false,
	});
	const content = ADMIN_COLLECTION_COPY[kind];

	return (
		<div className={styles.page}>
			<header className={styles.listHero}>
				<div className="admin-heading">
					<span>{content.eyebrow}</span>
					<h1>{content.title}</h1>
					<p className="pt-6">{content.description}</p>
				</div>
				{(["courses", "lessons", "quizzes", "challenges", "badges", "prompts"] as string[]).includes(kind) && <AdminContentCreateDialog kind={kind as CreatableContent} />}
			</header>
			{query.isPending && (
				<div className={styles.tableLoading} aria-busy="true">
					Loading persisted records…
				</div>
			)}
			{query.isError && (
				<section className={styles.inlineError} role="alert">
					<span>Collection unavailable</span>
					<p>{query.error.message}</p>
					<button type="button" onClick={() => void query.refetch()}>
						Retry
					</button>
				</section>
			)}
			{query.data && query.data.items.length === 0 && (
				<section className={styles.listEmpty}>
					<span>Empty state</span>
					<h2>No records have been persisted.</h2>
				</section>
			)}
			{query.data && query.data.items.length > 0 && (
				<div className={styles.tableWrap}>
					<table className={styles.table}>
						<thead>
							<tr>
								<th>Record</th>
								<th>Status</th>
								<th>Reference</th>
								<th>Updated</th>
								<th>Inspect</th>
							</tr>
						</thead>
						<tbody>
							{query.data.items.map((record) => {
								const id = String(record._id ?? record.id);
								return (
									<tr key={id}>
										<td>
											<strong>{String(label(record))}</strong>
											<small>{String(record.slug ?? record.domain ?? record.key ?? "No public identifier")}</small>
										</td>
										<td>
											<span>{String(record.status ?? record.reviewStatus ?? "UNCLASSIFIED").replaceAll("_", " ")}</span>
										</td>
										<td>
											<small>{id}</small>
										</td>
										<td>
											<small>{record.updatedAt ? new Date(record.updatedAt).toLocaleString() : "Unavailable"}</small>
										</td>
										<td>
											<Link href={recordPath(kind, id)}>Open record</Link>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}
