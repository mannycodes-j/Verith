"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { ApiClientError } from "@/services/apiClient";
import { learningService } from "@/services/learning";
import { quizzesService } from "@/services/quizzes";
import { LessonReader } from "./CourseReader";
import { learningStyles as styles } from "./learning.styles";

export default function StandaloneLesson({
  authenticated = false,
  slug,
}: {
  authenticated?: boolean;
  slug: string;
}) {
  const lesson = useQuery({
    queryFn: () => learningService.lesson(slug),
    queryKey: ["learning-lesson", slug],
    retry: false,
  });
  const progress = useQuery({
    enabled: authenticated && Boolean(lesson.data?.course._id),
    queryFn: () => learningService.progress(lesson.data!.course._id),
    queryKey: ["learning-progress", lesson.data?.course._id],
  });
  const quiz = useQuery({
    enabled: authenticated && Boolean(lesson.data?._id),
    queryFn: () => quizzesService.forLesson(lesson.data!._id),
    queryKey: ["lesson-quiz", lesson.data?._id],
    retry: false,
  });

  if (lesson.isPending) {
    return (
      <div className={styles.courseLoading} aria-busy="true">
        <span>Published lesson</span>
        <h1>Opening the lesson record…</h1>
      </div>
    );
  }
  if (lesson.isError) {
    return (
      <section className={styles.error} role="alert">
        <span>Lesson unavailable</span>
        <h2>The published lesson could not be opened.</h2>
        <p>{lesson.error.message}</p>
        <button type="button" onClick={() => void lesson.refetch()}>
          Retry
        </button>
      </section>
    );
  }

  const record = lesson.data;
  const lessonProgress = progress.data?.find(
    (item) => String(item.lessonId) === record._id,
  );
  return (
    <div className={styles.course}>
      <header className={styles.courseHeader}>
        <div>
          <span>Course / {record.course.slug}</span>
          <h1>{record.course.title}</h1>
          <p>{record.course.description}</p>
        </div>
        <dl>
          <div>
            <dt>Difficulty</dt>
            <dd>{record.course.difficulty}</dd>
          </div>
          <div>
            <dt>Lesson</dt>
            <dd>{String(record.sequence).padStart(2, "0")}</dd>
          </div>
          <div>
            <dt>Duration</dt>
            <dd>{record.estimatedDuration} min</dd>
          </div>
        </dl>
      </header>
      <div className={styles.standaloneLesson}>
        <Link
          href={
            authenticated
              ? `/app/learning/${record.course.slug}`
              : `/learning/${record.course.slug}`
          }
        >
          Open full course
        </Link>
        <LessonReader
          authenticated={authenticated}
          courseId={record.course._id}
          lesson={record}
          progress={lessonProgress}
          progressUnavailable={progress.isError || progress.isPending}
          quiz={quiz.data}
          quizPending={quiz.isPending}
          quizUnavailable={
            quiz.isError &&
            !(
              quiz.error instanceof ApiClientError &&
              quiz.error.status === 404
            )
          }
          retryQuiz={() => void quiz.refetch()}
        />
      </div>
    </div>
  );
}
