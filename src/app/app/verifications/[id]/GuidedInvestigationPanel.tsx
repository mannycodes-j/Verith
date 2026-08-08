"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { verificationService, type GuidedInvestigation } from "@/services/verification";
import { guidedInvestigationStyles as styles } from "./guided-investigation.styles";

export default function GuidedInvestigationPanel({
	verificationId,
	enabled,
	onStatus,
}: {
	verificationId: string;
	enabled: boolean;
	onStatus: (status: GuidedInvestigation["status"] | "LOADING") => void;
}) {
	const queryClient = useQueryClient();
	const [answers, setAnswers] = useState<Record<string, string[]>>({});
	const [writtenAnswers, setWrittenAnswers] = useState<Record<string, string>>({});
	const [formError, setFormError] = useState<string | null>(null);
	const guidance = useQuery({
		enabled,
		queryKey: ["guided-investigation", verificationId],
		queryFn: () => verificationService.guidance(verificationId),
		retry: false,
		refetchInterval: (query) => query.state.data ? false : 5_000,
	});
	const submit = useMutation({
		mutationFn: () => {
			const session = guidance.data;
			if (!session) throw new Error("The guided exercise is not ready yet.");
			const responses = session.questions.map((question) => ({
				questionId: question.id,
				...(question.type === "SHORT_TEXT"
					? { text: writtenAnswers[question.id]?.trim() }
					: { selectedOptionIds: answers[question.id] ?? [] }),
			}));
			const incomplete = responses.some((response) =>
				"text" in response ? !response.text : !response.selectedOptionIds?.length,
			);
			if (incomplete) throw new Error("Answer every question before comparing your reasoning.");
			return verificationService.submitGuidance(verificationId, responses);
		},
		onSuccess: (session) => {
			setFormError(null);
			queryClient.setQueryData(["guided-investigation", verificationId], session);
		},
		onError: (error) => setFormError(error.message),
	});

	useEffect(() => {
		onStatus(guidance.data?.status ?? "LOADING");
	}, [guidance.data?.status, onStatus]);

	if (!enabled || guidance.isPending) {
		return (
			<section className={styles.loading} aria-busy="true">
				<span>Guided investigation</span>
				<h2>Preparing your evidence-thinking exercise…</h2>
				<p>Verith is identifying the statements worth checking. No finding is shown before you record your own observations.</p>
			</section>
		);
	}

	if (guidance.isError) {
		return (
			<section className={styles.error} role="status">
				<span>Guided investigation</span>
				<h2>Your questions are still being prepared.</h2>
				<p>{guidance.error.message}</p>
				<button type="button" onClick={() => void guidance.refetch()}>Check again</button>
			</section>
		);
	}

	const session = guidance.data;
	const submitted = session.status !== "READY";
	return (
		<section className={styles.panel}>
			<header>
				<div><span>Guided investigation · Question set {session.questionSetVersion}</span><h2>{submitted ? "See how your reasoning developed." : "Think first. Then inspect the evidence."}</h2></div>
				<p>{submitted ? "Your original answers are preserved. Feedback compares your process with the completed report without changing its finding." : "These questions do not contain Verith’s verdict. Record what you notice before opening the completed evidence report."}</p>
			</header>

			{submitted ? (
				<div className={styles.feedbackGrid}>
					{session.feedback.length ? session.feedback.map((feedback) => (
						<article key={feedback.questionId}><span>{feedback.competency.replaceAll("_", " ")}</span><h3>{feedback.heading}</h3><p>{feedback.message}</p></article>
					)) : <p>Comparison feedback will appear when the report is ready.</p>}
				</div>
			) : (
				<form className={styles.questions} onSubmit={(event) => { event.preventDefault(); setFormError(null); submit.mutate(); }}>
					{session.questions.map((question, index) => (
						<fieldset key={question.id}>
							<legend><span>{String(index + 1).padStart(2, "0")} · {question.competency.replaceAll("_", " ")}</span>{question.prompt}</legend>
							{question.type === "SHORT_TEXT" ? (
								<textarea maxLength={2000} placeholder="Write what you notice in your own words…" value={writtenAnswers[question.id] ?? ""} onChange={(event) => setWrittenAnswers((current) => ({ ...current, [question.id]: event.target.value }))} />
							) : (
								<div>{question.options.map((option) => {
									const multiple = question.type === "MULTIPLE_SELECT";
									const checked = answers[question.id]?.includes(option.id) ?? false;
									return <label key={option.id}><input checked={checked} name={question.id} type={multiple ? "checkbox" : "radio"} value={option.id} onChange={() => setAnswers((current) => {
										const existing = current[question.id] ?? [];
										return { ...current, [question.id]: multiple ? (checked ? existing.filter((id) => id !== option.id) : [...existing, option.id]) : [option.id] };
									})} /><span>{option.label}</span></label>;
								})}</div>
							)}
						</fieldset>
					))}
					{(formError || submit.error) && <p className={styles.formError} role="alert">{formError || submit.error?.message}</p>}
					<button disabled={submit.isPending} type="submit">{submit.isPending ? "Saving your reasoning…" : "Save answers and compare"}</button>
				</form>
			)}
		</section>
	);
}

