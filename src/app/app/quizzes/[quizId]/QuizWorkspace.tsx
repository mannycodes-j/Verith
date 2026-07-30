"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { quizzesService, type QuizAttempt } from "@/services/quizzes";
import { quizStyles as styles } from "./quiz.styles";

export default function QuizWorkspace({ id }: { id: string }) {
  const queryClient = useQueryClient();
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [result, setResult] = useState<QuizAttempt>();
  const quiz = useQuery({
    queryFn: () => quizzesService.get(id),
    queryKey: ["quiz", id],
  });
  const attempts = useQuery({
    queryFn: () => quizzesService.attempts(id),
    queryKey: ["quiz-attempts", id],
  });
  const submit = useMutation({
    mutationFn: () =>
      quizzesService.submit(
        id,
        quiz.data!.questions.map((question) => ({
          questionId: question.id,
          selectedOptionIds: answers[question.id] ?? [],
        })),
      ),
    onSuccess: (next) => {
      setResult(next);
      void queryClient.invalidateQueries({ queryKey: ["quiz-attempts", id] });
      void queryClient.invalidateQueries({ queryKey: ["gamification-profile"] });
      void queryClient.invalidateQueries({
        queryKey: ["gamification-transactions"],
      });
      void queryClient.invalidateQueries({
        queryKey: ["learning-progress", String(quiz.data?.courseId)],
      });
    },
  });

  if (quiz.isPending) {
    return <div className={styles.state}>Opening published quiz…</div>;
  }
  if (quiz.isError) {
    return (
      <section className={styles.error} role="alert">
        <span>Quiz unavailable</span>
        <h1>This published quiz could not be opened.</h1>
        <p>{quiz.error.message}</p>
        <button type="button" onClick={() => void quiz.refetch()}>
          Retry
        </button>
      </section>
    );
  }

  const record = quiz.data;
  const attemptsUsed = attempts.data?.length;
  const attemptsRemaining =
    attemptsUsed === undefined
      ? undefined
      : Math.max(record.maxAttempts - attemptsUsed, 0);
  const answered = record.questions.every(
    (question) => (answers[question.id]?.length ?? 0) > 0,
  );

  return (
    <div className={styles.page}>
      <header>
        <span>Quiz / {record.id}</span>
        <h1>{record.title}</h1>
        <p>{record.description}</p>
        <dl>
          <div>
            <dt>Passing score</dt>
            <dd>{record.passingScore}%</dd>
          </div>
          <div>
            <dt>Attempts remaining</dt>
            <dd>
              {attempts.isPending
                ? "Checking…"
                : attemptsRemaining === undefined
                  ? `Up to ${record.maxAttempts}`
                  : `${attemptsRemaining} of ${record.maxAttempts}`}
            </dd>
          </div>
          <div>
            <dt>Questions</dt>
            <dd>{record.questions.length}</dd>
          </div>
        </dl>
      </header>
      {attempts.isError && (
        <section className={styles.attemptError} role="alert">
          <span>Attempt history unavailable</span>
          <p>{attempts.error.message}</p>
          <button type="button" onClick={() => void attempts.refetch()}>
            Retry
          </button>
        </section>
      )}
      {attempts.data && attempts.data.length > 0 && (
        <section className={styles.attemptHistory}>
          <span>Your attempt record</span>
          <ol>
            {attempts.data.map((attempt) => (
              <li key={attempt._id}>
                <span>Attempt {attempt.attemptNumber}</span>
                <strong>{attempt.score}%</strong>
                <small>{attempt.passed ? "Passed" : "Not passed"}</small>
              </li>
            ))}
          </ol>
        </section>
      )}
      <form
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
                    onChange={(event) =>
                      setAnswers((current) => ({
                        ...current,
                        [question.id]: multiple
                          ? event.target.checked
                            ? [...(current[question.id] ?? []), option.id]
                            : (current[question.id] ?? []).filter(
                                (value) => value !== option.id,
                              )
                          : [option.id],
                      }))
                    }
                    type={multiple ? "checkbox" : "radio"}
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
        {submit.isError && (
          <p className={styles.submitError} role="alert">
            {submit.error.message}
          </p>
        )}
        {result ? (
          <section className={styles.result} role="status">
            <span>{result.passed ? "Quiz passed" : "Quiz reviewed"}</span>
            <strong>{result.score}%</strong>
            <p>
              Passing score {result.passingScore}%. Reward state{" "}
              {result.rewardState.replaceAll("_", " ").toLowerCase()}.
            </p>
            <Link href="/app/learning">Return to learning</Link>
            {(attemptsRemaining === undefined || attemptsRemaining > 0) && (
              <button
                type="button"
                onClick={() => {
                  setAnswers({});
                  setResult(undefined);
                }}
              >
                Try another attempt
              </button>
            )}
          </section>
        ) : (
          <button
            disabled={
              !answered || submit.isPending || attemptsRemaining === 0
            }
            type="submit"
          >
            {attemptsRemaining === 0
              ? "Attempt limit reached"
              : submit.isPending
                ? "Scoring quiz…"
                : "Submit quiz"}
          </button>
        )}
      </form>
    </div>
  );
}
