"use client";

import { useInfiniteQuery, useQueries } from "@tanstack/react-query";
import Link from "next/link";
import { useDeferredValue, useState } from "react";
import { DIFFICULTY_FILTERS } from "@/data/catalog-filters";
import {
	type CursorPage,
	type LearningCourse,
	learningService,
} from "@/services/learning";
import { learningStyles as styles } from "./learning.styles";

export default function LearningCatalog({ authenticated = false }: { authenticated?: boolean }) {
	const [search, setSearch] = useState("");
	const [difficulty, setDifficulty] = useState("");
	const [tag, setTag] = useState("");
	const deferredSearch = useDeferredValue(search.trim());
	const catalog = useInfiniteQuery<CursorPage<LearningCourse>>({
		getNextPageParam: (page) => page.pagination.nextCursor ?? undefined,
		initialPageParam: undefined as string | undefined,
		queryFn: ({ pageParam }) => learningService.courses({
			cursor: typeof pageParam === "string" ? pageParam : undefined,
			difficulty: difficulty || undefined,
			search: deferredSearch || undefined,
			tag: tag.trim() || undefined,
		}),
		queryKey: ["learning-courses", deferredSearch, difficulty, tag.trim()],
	});
	const courses = catalog.data?.pages.flatMap((page) => page.items) ?? [];
	const progressQueries = useQueries({
		queries: courses.map((course) => ({
			enabled: authenticated,
			queryFn: () => learningService.progress(course._id),
			queryKey: ["learning-progress", course._id],
			staleTime: 60_000,
		})),
	});
	const base = authenticated ? "/app/learning" : "/learning";

	return (
		<div className={styles.catalog}>
			<header className={styles.hero}>
				<span>Grow your media literacy</span>
				<h1>Build the judgement misinformation is designed to bypass.</h1>
				<p>Progress from recognising persuasive tactics to evaluating claims, interrogating sources, recovering missing context, and making confident evidence-based decisions.</p>
			</header>
			<section className={styles.filters} aria-label="Filter learning catalog">
				<label>
					<span>Search</span>
					<input onChange={(event) => setSearch(event.target.value)} placeholder="Search titles, topics, or skills" type="search" value={search} />
				</label>
				<label>
					<span>Level</span>
					<select onChange={(event) => setDifficulty(event.target.value)} value={difficulty}>
						{DIFFICULTY_FILTERS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
					</select>
				</label>
				<label>
					<span>Topic</span>
					<input onChange={(event) => setTag(event.target.value)} placeholder="e.g. source checking" value={tag} />
				</label>
			</section>

			{catalog.isPending && (
				<div className={styles.loading} aria-busy="true">
					<span>Loading published courses</span>
					{[0, 1, 2].map((item) => (
						<div key={item} />
					))}
				</div>
			)}
			{catalog.isError && (
				<section className={styles.error} role="alert">
					<span>Catalog unavailable</span>
					<h2>Published courses could not be loaded.</h2>
					<p>{catalog.error.message}</p>
					<button type="button" onClick={() => void catalog.refetch()}>
						Retry
					</button>
				</section>
			)}
			{catalog.data && courses.length === 0 && (
				<section className={styles.empty}>
					<span>No published courses</span>
					<h2>The learning catalog is currently empty.</h2>
					<p>Verith will show courses here only after an authorized editor publishes them.</p>
				</section>
			)}
			{courses.length > 0 && (
				<ol className={styles.courseList}>
					{courses.map((course, index) => {
						const completedLessons = new Set((progressQueries[index]?.data ?? []).filter((item) => item.status === "COMPLETED").map((item) => String(item.lessonId)));
						const completed = authenticated && course.lessonIds.length > 0 && course.lessonIds.every((id) => completedLessons.has(String(id)));
						return (
							<li data-completed={completed} key={course._id}>
								<Link href={`${base}/${course.slug}`}>
									<span>{String(index + 1).padStart(2, "0")}</span>
									<div>
										<small className="mr-4">
											{course.difficulty} · {course.estimatedDuration} min
										</small>
										{completed && <span className={styles.completedBadge}>Completed</span>}
										<h2>{course.title}</h2>
										<p>{course.description}</p>
									</div>
									<dl>
										<div>
											<dt>Lessons</dt>
											<dd>{course.lessonIds.length}</dd>
										</div>
										<div>
											<dt>Topics</dt>
											<dd>{course.tags.slice(0, 3).join(", ") || "General"}</dd>
										</div>
									</dl>
									<strong aria-hidden="true">↗</strong>
								</Link>
							</li>
						);
					})}
				</ol>
			)}
			{catalog.hasNextPage && (
				<button className={styles.loadMore} disabled={catalog.isFetchingNextPage} onClick={() => void catalog.fetchNextPage()} type="button">
					{catalog.isFetchingNextPage ? "Loading more…" : "Load more courses"}
				</button>
			)}
		</div>
	);
}
