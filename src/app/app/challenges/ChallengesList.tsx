"use client";

import { useInfiniteQuery, useQueries } from "@tanstack/react-query";
import Link from "next/link";
import { useDeferredValue, useState } from "react";
import { DIFFICULTY_FILTERS } from "@/data/catalog-filters";
import {
	type ChallengePage,
	challengesService,
} from "@/services/challenges";
import { challengeStyles as styles } from "./challenges.styles";

function formatDate(value: string) {
	const date = new Date(value);
	return Number.isNaN(date.valueOf()) ? "Unavailable" : new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(date);
}

export default function ChallengesList() {
	const [search, setSearch] = useState("");
	const [difficulty, setDifficulty] = useState("");
	const [tag, setTag] = useState("");
	const deferredSearch = useDeferredValue(search.trim());
	const challenges = useInfiniteQuery<ChallengePage>({
		getNextPageParam: (page) => page.pagination.nextCursor ?? undefined,
		initialPageParam: undefined as string | undefined,
		queryFn: ({ pageParam }) => challengesService.list({
			cursor: typeof pageParam === "string" ? pageParam : undefined,
			difficulty: difficulty || undefined,
			search: deferredSearch || undefined,
			tag: tag.trim() || undefined,
		}),
		queryKey: ["challenges", deferredSearch, difficulty, tag.trim()],
	});
	const records = challenges.data?.pages.flatMap((page) => page.items) ?? [];
	const attemptQueries = useQueries({
		queries: records.map((challenge) => {
			const id = challenge.id ?? challenge._id;
			return {
				enabled: Boolean(id),
				queryFn: () => challengesService.attempts(id!),
				queryKey: ["challenge-attempts", id],
				staleTime: 30_000,
			};
		}),
	});

	return (
		<div className={styles.page}>
			<header className={styles.header}>
				<span>Daily evidence practice</span>
				<h1>Train your instincts against real-world misinformation patterns.</h1>
				<p>Time-bound evidence scenarios transform media literacy from passive reading into repeatable decision-making practice. Every score and reward reflects persisted performance.</p>
			</header>
			<section className={styles.filters} aria-label="Filter daily practice">
				<label><span>Search</span><input onChange={(event) => setSearch(event.target.value)} placeholder="Search scenarios or skills" type="search" value={search} /></label>
				<label><span>Level</span><select onChange={(event) => setDifficulty(event.target.value)} value={difficulty}>{DIFFICULTY_FILTERS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
				<label><span>Topic</span><input onChange={(event) => setTag(event.target.value)} placeholder="e.g. evidence" value={tag} /></label>
			</section>
			{challenges.isPending && (
				<div className={styles.loading} aria-busy="true">
					<span>Loading available challenges</span>
					<div />
					<div />
				</div>
			)}
			{challenges.isError && (
				<section className={styles.error} role="alert">
					<span>Challenges unavailable</span>
					<h2>Published challenges could not be loaded.</h2>
					<p>{challenges.error.message}</p>
					<button type="button" onClick={() => void challenges.refetch()}>
						Retry
					</button>
				</section>
			)}
			{challenges.data && records.length === 0 && (
				<section className={styles.empty}>
					<span>No active challenge</span>
					<h2>There are no published challenges in the current window.</h2>
					<p>Expired or scheduled challenges are not presented as available.</p>
				</section>
			)}
			{records.length > 0 && (
				<ol className={styles.list}>
					{records.map((challenge, index) => {
						const completed = (attemptQueries[index]?.data ?? []).some((attempt) => attempt.passed);
						return (
							<li data-completed={completed} key={challenge.id ?? challenge._id ?? challenge.slug}>
								<Link href={`/app/challenges/${challenge.slug}`}>
									<span>{String(index + 1).padStart(2, "0")}</span>
									<div>
										<small className="mr-4">
											{challenge.difficulty} · {challenge.questions.length} questions
										</small>
										{completed && <span className={styles.completedBadge}>Completed</span>}
										<h2>{challenge.title}</h2>
										<p>{challenge.scenario}</p>
									</div>
									<dl>
										<div>
											<dt>Passing score</dt>
											<dd>{challenge.passingScore}%</dd>
										</div>
										<div>
											<dt>Attempts</dt>
											<dd>{challenge.maxAttempts}</dd>
										</div>
										<div>
											<dt>Available until</dt>
											<dd>{formatDate(challenge.expiresAt)}</dd>
										</div>
									</dl>
									<strong aria-hidden="true">↗</strong>
								</Link>
							</li>
						);
					})}
				</ol>
			)}
			{challenges.hasNextPage && <button className={styles.loadMore} disabled={challenges.isFetchingNextPage} onClick={() => void challenges.fetchNextPage()} type="button">{challenges.isFetchingNextPage ? "Loading more…" : "Load more practice"}</button>}
		</div>
	);
}
