"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useDeferredValue, useState } from "react";
import { adminService, type AdminRecord, type CursorPage } from "@/services/admin";
import { ADMIN_COLLECTION_COPY } from "@/data/admin-content";
import { CONTENT_STATUS_FILTERS, DIFFICULTY_FILTERS } from "@/data/catalog-filters";
import type { AdminCollectionKind as Kind } from "@/types/admin-content";
import { adminStyles as styles } from "./admin.styles";
import AdminContentCreateDialog, { type CreatableContent } from "./AdminContentCreateDialog";

function getRecords(kind: Kind, cursor: string | undefined, filters: { category?: string; courseId?: string; search?: string; status?: string; difficulty?: string; tag?: string }): Promise<CursorPage<AdminRecord>> {
	if (kind === "publishers") return adminService.publishers(cursor);
	if (kind === "feedback") return adminService.feedback(cursor);
	if (kind === "prompts") return adminService.prompts(cursor);
	if (kind === "badges") return adminService.badges({
		active: filters.status === "ACTIVE" ? true : filters.status === "INACTIVE" ? false : undefined,
		category: filters.category,
		cursor,
		search: filters.search,
	});
	return adminService.contentRecords(kind, { cursor, ...filters });
}

function label(record: AdminRecord) {
	return record.title ?? record.name ?? record.domain ?? record.key ?? record.slug ?? record.id ?? record._id;
}

function recordPath(kind: Kind, id: string): string {
	const base = kind === "prompts" ? "/admin/ai/prompts" : `/admin/${kind}`;
	return `${base}/${id}`;
}

export default function AdminCollection({ kind }: { kind: Kind }) {
	const [search, setSearch] = useState("");
	const [status, setStatus] = useState("");
	const [difficulty, setDifficulty] = useState("");
	const [secondary, setSecondary] = useState("");
	const deferredSearch = useDeferredValue(search.trim());
	const secondaryValue = secondary.trim();
	const filterable = (["courses", "lessons", "quizzes", "challenges", "badges"] as string[]).includes(kind);
	const query = useInfiniteQuery<CursorPage<AdminRecord>>({
		getNextPageParam: (page) => page.pagination.nextCursor ?? undefined,
		initialPageParam: undefined as string | undefined,
		queryFn: ({ pageParam }) => getRecords(kind, typeof pageParam === "string" ? pageParam : undefined, {
			category: kind === "badges" ? secondaryValue || undefined : undefined,
			courseId: kind === "lessons" || kind === "quizzes" ? (/^[a-f\d]{24}$/i.test(secondaryValue) ? secondaryValue : undefined) : undefined,
			difficulty: difficulty || undefined,
			search: deferredSearch || undefined,
			status: status || undefined,
			tag: kind === "courses" || kind === "challenges" ? secondaryValue || undefined : undefined,
		}),
		queryKey: ["admin", kind, deferredSearch, status, difficulty, secondaryValue],
		retry: false,
	});
	const records = query.data?.pages.flatMap((page) => page.items) ?? [];
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
			{filterable && <section className={styles.filters} aria-label={`Filter ${kind}`}>
				<label><span>Search</span><input onChange={(event) => setSearch(event.target.value)} placeholder={`Search ${kind}`} type="search" value={search} /></label>
				<label><span>Status</span><select onChange={(event) => setStatus(event.target.value)} value={status}><option value="">All statuses</option>{CONTENT_STATUS_FILTERS[kind as keyof typeof CONTENT_STATUS_FILTERS].map((value) => <option key={value} value={value}>{value.replaceAll("_", " ")}</option>)}</select></label>
				{(kind === "courses" || kind === "challenges") && <label><span>Level</span><select onChange={(event) => setDifficulty(event.target.value)} value={difficulty}>{DIFFICULTY_FILTERS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>}
				<label><span>{kind === "lessons" || kind === "quizzes" ? "Course ID" : kind === "badges" ? "Category" : "Topic"}</span><input onChange={(event) => setSecondary(event.target.value)} placeholder={kind === "lessons" || kind === "quizzes" ? "MongoDB course ID" : "Any"} value={secondary} /></label>
			</section>}
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
			{query.data && records.length === 0 && (
				<section className={styles.listEmpty}>
					<span>Empty state</span>
					<h2>No records have been persisted.</h2>
				</section>
			)}
			{records.length > 0 && (
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
							{records.map((record) => {
								const id = String(record._id ?? record.id);
								return (
									<tr key={id}>
										<td>
											<strong>{String(label(record))}</strong>
											<small>{String(record.slug ?? record.domain ?? record.key ?? "No public identifier")}</small>
										</td>
										<td>
											<span>{String(record.status ?? record.reviewStatus ?? (typeof record.active === "boolean" ? record.active ? "ACTIVE" : "INACTIVE" : "UNCLASSIFIED")).replaceAll("_", " ")}</span>
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
			{query.hasNextPage && <div className={styles.pagination}><span>{records.length} records loaded</span><button disabled={query.isFetchingNextPage} onClick={() => void query.fetchNextPage()} type="button">{query.isFetchingNextPage ? "Loading more…" : "Load more records"}</button></div>}
		</div>
	);
}
