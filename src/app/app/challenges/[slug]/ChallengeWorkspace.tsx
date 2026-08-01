"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import {
  challengesService,
  type ChallengeAttempt,
} from "@/services/challenges";
import { challengeStyles as styles } from "../challenges.styles";

export default function ChallengeWorkspace({ slug }: { slug: string }) {
  const queryClient = useQueryClient();
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [result, setResult] = useState<ChallengeAttempt>();
  const challenge = useQuery({
    queryFn: () => challengesService.get(slug),
    queryKey: ["challenge", slug],
  });
  const challengeId = challenge.data?.id ?? challenge.data?._id;
  const attempts = useQuery({
    enabled: Boolean(challengeId),
    queryFn: () => challengesService.attempts(challengeId!),
    queryKey: ["challenge-attempts", challengeId],
  });
  const submit = useMutation({
    mutationFn: () => {
      if (!challengeId || !challenge.data) {
        throw new Error("The challenge identifier is unavailable.");
      }
      return challengesService.submit(
        challengeId,
        challenge.data.questions.map((question) => ({
          questionId: question.id,
          selectedOptionIds: answers[question.id] ?? [],
        })),
      );
    },
    onSuccess: (next) => {
      setResult(next);
      void queryClient.invalidateQueries({
        queryKey: ["challenge-attempts", challengeId],
      });
      void queryClient.invalidateQueries({ queryKey: ["gamification-profile"] });
      void queryClient.invalidateQueries({
        queryKey: ["gamification-transactions"],
      });
    },
  });

  if (challenge.isPending) {
    return <div className={styles.workspaceState}>Opening challenge…</div>;
  }
  if (challenge.isError) {
    return (
      <section className={styles.error} role="alert">
        <span>Challenge unavailable</span>
        <h2>This challenge could not be opened.</h2>
        <p>{challenge.error.message}</p>
        <button type="button" onClick={() => void challenge.refetch()}>
          Retry
        </button>
      </section>
    );
  }

  const record = challenge.data;
  const answered = record.questions.every(
    (question) => (answers[question.id]?.length ?? 0) > 0,
  );
  const remainingAttempts = Math.max(
    0,
    record.maxAttempts - (attempts.data?.length ?? 0),
  );
  const previouslyCompleted = (attempts.data ?? []).some(
    (attempt) => attempt.passed,
  );

  return (
    <div className={styles.workspace}>
      <header>
        <span>
          {previouslyCompleted ? "Completed" : `Challenge: ${record.slug}`}
        </span>
        <h1>{record.title}</h1>
        <p>{record.scenario}</p>
        <dl>
          <div>
            <dt>Difficulty</dt>
            <dd>{record.difficulty}</dd>
          </div>
          <div>
            <dt>Passing score</dt>
            <dd>{record.passingScore}%</dd>
          </div>
          <div>
            <dt>Attempts remaining</dt>
            <dd>
              {attempts.isPending
                ? "Loading"
                : attempts.isError
                  ? "Unavailable"
                  : remainingAttempts}
            </dd>
          </div>
        </dl>
      </header>
      <section className={styles.context}>
        <span>Investigation context</span>
        <p>{record.content}</p>
      </section>
      <form
        className={styles.questions}
        onSubmit={(event) => {
          event.preventDefault();
          submit.mutate();
        }}
      >
        {record.questions.map((question, index) => {
          const multiple = question.type === "MULTIPLE_CHOICE";
          const finding = result?.results.find(
            (item) => item.questionId === question.id,
          );
          return (
            <fieldset key={question.id}>
              <legend>
                <span>Question {String(index + 1).padStart(2, "0")}</span>
                {question.prompt}
              </legend>
              {question.options.map((option) => (
                <label key={option.id}>
                  <input
                    checked={(answers[question.id] ?? []).includes(option.id)}
                    disabled={Boolean(result)}
                    name={question.id}
                    onChange={(event) => {
                      setAnswers((current) => ({
                        ...current,
                        [question.id]: multiple
                          ? event.target.checked
                            ? [...(current[question.id] ?? []), option.id]
                            : (current[question.id] ?? []).filter(
                                (id) => id !== option.id,
                              )
                          : [option.id],
                      }));
                    }}
                    type={multiple ? "checkbox" : "radio"}
                    value={option.id}
                  />
                  <span>{option.text}</span>
                </label>
              ))}
              {finding && (
                <div
                  className={styles.explanation}
                  data-correct={finding.correct}
                >
                  <strong>{finding.correct ? "Correct" : "Review"}</strong>
                  <p>{finding.explanation}</p>
                </div>
              )}
            </fieldset>
          );
        })}
        {attempts.isError && (
          <p className={styles.submitError} role="alert">
            Attempt history is unavailable. Submission remains controlled by
            the backend attempt limit.
          </p>
        )}
        {submit.isError && (
          <p className={styles.submitError} role="alert">
            {submit.error.message}
          </p>
        )}
        {result ? (
          <section className={styles.result} role="status">
            <span>{result.passed ? "Challenge passed" : "Challenge reviewed"}</span>
            <strong>{result.score}%</strong>
            <p>
              Reward state: {result.rewardState.replaceAll("_", " ").toLowerCase()}.
            </p>
            <Link href="/app/challenges">Return to challenges</Link>
          </section>
        ) : (
          <button
            className={styles.submit}
            disabled={
              !answered ||
              submit.isPending ||
              attempts.isPending ||
              remainingAttempts === 0
            }
            type="submit"
          >
            {submit.isPending ? "Scoring attempt…" : "Submit evidence review"}
          </button>
        )}
      </form>
    </div>
  );
}
