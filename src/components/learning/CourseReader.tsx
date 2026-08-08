"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useDeferredValue, useState } from "react";
import {
  learningService,
  type LearningLesson,
  type LessonProgress,
} from "@/services/learning";
import { ApiClientError } from "@/services/apiClient";
import { quizzesService, type Quiz } from "@/services/quizzes";
import { learningStyles as styles } from "./learning.styles";

export function LessonReader({
  authenticated,
  courseId,
  lesson,
  progress,
  progressUnavailable,
  quiz,
  quizPending,
  quizUnavailable,
  retryQuiz,
}: {
  authenticated: boolean;
  courseId: string;
  lesson: LearningLesson;
  progress?: LessonProgress;
  progressUnavailable?: boolean;
  quiz?: Quiz;
  quizPending?: boolean;
  quizUnavailable?: boolean;
  retryQuiz: () => void;
}) {
  const queryClient = useQueryClient();
  const completion = useMutation({
    mutationFn: () =>
      learningService.updateProgress(lesson._id, { progress: 100 }),
    onSuccess: (next) => {
      queryClient.setQueryData<LessonProgress[]>(
        ["learning-progress", courseId],
        (current = []) => [
          ...current.filter((item) => item.lessonId !== lesson._id),
          next,
        ],
      );
    },
  });

  return (
    <article className={styles.lesson}>
      <header>
        <span>Lesson {String(lesson.sequence).padStart(2, "0")}</span>
        <span>{lesson.estimatedDuration} min</span>
      </header>
      <h2>{lesson.title}</h2>
      <p className={styles.lessonSummary}>{lesson.summary}</p>
      <div
        className={styles.lessonBody}
        dangerouslySetInnerHTML={{ __html: lesson.sanitizedHtml }}
      />
      {authenticated && (
        <>
          <footer>
            <span>
              {progressUnavailable
                ? "PROGRESS UNAVAILABLE"
                : progress?.status
                  ? progress.status.replaceAll("_", " ")
                  : "NOT STARTED"}
            </span>
            <button
              disabled={
                completion.isPending || progress?.status === "COMPLETED"
              }
              onClick={() => completion.mutate()}
              type="button"
            >
              {progress?.status === "COMPLETED"
                ? "Completed"
                : completion.isPending
                  ? "Saving…"
                  : "Mark lesson complete"}
            </button>
            {completion.isError && (
              <p role="alert">{completion.error.message}</p>
            )}
          </footer>
          <section className={styles.lessonQuiz} aria-busy={quizPending}>
            <span>Lesson assessment</span>
            {quizPending ? (
              <p>Checking for a published quiz…</p>
            ) : quiz ? (
              <>
                <div>
                  <h3>{quiz.title}</h3>
                  <p>
                    {quiz.questions.length} questions · Pass at{" "}
                    {quiz.passingScore}%
                  </p>
                </div>
                <Link href={`/app/quizzes/${quiz.id}`}>Open quiz</Link>
              </>
            ) : quizUnavailable ? (
              <>
                <p role="alert">Quiz availability could not be checked.</p>
                <button type="button" onClick={retryQuiz}>
                  Retry
                </button>
              </>
            ) : (
              <p>No published assessment is assigned to this lesson.</p>
            )}
          </section>
        </>
      )}
    </article>
  );
}

export default function CourseReader({
  authenticated = false,
  slug,
}: {
  authenticated?: boolean;
  slug: string;
}) {
  const [activeLesson, setActiveLesson] = useState<string>();
  const [lessonSearch, setLessonSearch] = useState("");
  const [lessonTag, setLessonTag] = useState("");
  const [lessonPage, setLessonPage] = useState(1);
  const deferredLessonSearch = useDeferredValue(lessonSearch.trim().toLowerCase());
  const course = useQuery({
    queryFn: () => learningService.course(slug),
    queryKey: ["learning-course", slug],
  });
  const progress = useQuery({
    enabled: authenticated && Boolean(course.data?._id),
    queryFn: () => learningService.progress(course.data!._id),
    queryKey: ["learning-progress", course.data?._id],
  });
  const filteredLessons = (course.data?.lessons ?? []).filter((lesson) => {
    const matchesSearch = !deferredLessonSearch || [lesson.title, lesson.summary, ...lesson.tags].some((value) => value.toLowerCase().includes(deferredLessonSearch));
    const normalizedTag = lessonTag.trim().toLowerCase();
    const matchesTag = !normalizedTag || lesson.tags.some((value) => value.toLowerCase().includes(normalizedTag));
    return matchesSearch && matchesTag;
  });
  const lessonPageSize = 8;
  const lessonPageCount = Math.max(1, Math.ceil(filteredLessons.length / lessonPageSize));
  const safeLessonPage = Math.min(lessonPage, lessonPageCount);
  const visibleLessons = filteredLessons.slice((safeLessonPage - 1) * lessonPageSize, safeLessonPage * lessonPageSize);
  const selected =
    filteredLessons.find((lesson) => lesson._id === activeLesson) ??
    visibleLessons[0];
  const lessonQuiz = useQuery({
    enabled: authenticated && Boolean(selected?._id),
    queryFn: () => quizzesService.forLesson(selected!._id),
    queryKey: ["lesson-quiz", selected?._id],
    retry: false,
  });

  if (course.isPending) {
    return (
      <div className={styles.courseLoading} aria-busy="true">
        <span>Loading course</span>
        <h1>Opening the lesson record…</h1>
      </div>
    );
  }
  if (course.isError) {
    return (
      <section className={styles.error} role="alert">
        <span>Course unavailable</span>
        <h2>The published course could not be opened.</h2>
        <p>{course.error.message}</p>
        <button type="button" onClick={() => void course.refetch()}>
          Retry
        </button>
      </section>
    );
  }

  const record = course.data;
  const progressByLesson = new Map(
    (progress.data ?? []).map((item) => [String(item.lessonId), item]),
  );

  return (
    <div className={styles.course}>
      <header className={styles.courseHeader}>
        <div>
          <span>You&apos;re learning {record.slug}</span>
          <h1>{record.title}</h1>
          <p>{record.description}</p>
        </div>
        <dl>
          <div>
            <dt>Difficulty</dt>
            <dd>{record.difficulty}</dd>
          </div>
          <div>
            <dt>Duration</dt>
            <dd>{record.estimatedDuration} min</dd>
          </div>
          <div>
            <dt>Lessons</dt>
            <dd>{record.lessons.length}</dd>
          </div>
        </dl>
      </header>
      <section className={styles.objectives}>
        <span>Learning objectives</span>
        <ol>
          {record.learningObjectives.map((objective) => (
            <li key={objective}>{objective}</li>
          ))}
        </ol>
      </section>

      {record.lessons.length === 0 ? (
        <section className={styles.empty}>
          <span>No published lessons</span>
          <h2>This course does not have accessible lessons yet.</h2>
        </section>
      ) : (
        <>
          {authenticated && progress.isError && (
            <section className={styles.progressError} role="alert">
              <div>
                <span>Progress unavailable</span>
                <p>{progress.error.message}</p>
              </div>
              <button type="button" onClick={() => void progress.refetch()}>
                Retry progress
              </button>
            </section>
          )}
          <div className={styles.readerGrid}>
          <aside>
            <span>Course outline</span>
            <div className={styles.lessonFilters}>
              <label><span>Search lessons</span><input onChange={(event) => { setLessonSearch(event.target.value); setLessonPage(1); setActiveLesson(undefined); }} placeholder="Search lesson titles or skills" type="search" value={lessonSearch} /></label>
              <label><span>Topic</span><input onChange={(event) => { setLessonTag(event.target.value); setLessonPage(1); setActiveLesson(undefined); }} placeholder="Any topic" value={lessonTag} /></label>
            </div>
            <ol>
              {visibleLessons.map((lesson) => (
                <li key={lesson._id}>
                  <button
                    data-active={selected?._id === lesson._id}
                    onClick={() => setActiveLesson(lesson._id)}
                    type="button"
                  >
                    <span>{String(lesson.sequence).padStart(2, "0")}</span>
                    <strong>{lesson.title}</strong>
                    {progressByLesson.get(lesson._id)?.status ===
                      "COMPLETED" && <small>Complete</small>}
                  </button>
                </li>
              ))}
            </ol>
            {filteredLessons.length === 0 && <p className={styles.outlineEmpty}>No lessons match these filters.</p>}
            {lessonPageCount > 1 && <div className={styles.outlinePagination}><button disabled={safeLessonPage === 1} onClick={() => { setLessonPage((page) => Math.max(1, page - 1)); setActiveLesson(undefined); }} type="button">Previous</button><span>{safeLessonPage} of {lessonPageCount}</span><button disabled={safeLessonPage === lessonPageCount} onClick={() => { setLessonPage((page) => Math.min(lessonPageCount, page + 1)); setActiveLesson(undefined); }} type="button">Next</button></div>}
            <Link href={authenticated ? "/app/learning" : "/learning"}>
              Return to catalog
            </Link>
          </aside>
          {selected && (
            <LessonReader
              authenticated={authenticated}
              courseId={record._id}
              lesson={selected}
              progress={progressByLesson.get(selected._id)}
              progressUnavailable={progress.isError || progress.isPending}
              quiz={lessonQuiz.data}
              quizPending={lessonQuiz.isPending}
              quizUnavailable={
                lessonQuiz.isError &&
                !(
                  lessonQuiz.error instanceof ApiClientError &&
                  lessonQuiz.error.status === 404
                )
              }
              retryQuiz={() => void lessonQuiz.refetch()}
            />
          )}
          </div>
        </>
      )}
    </div>
  );
}
