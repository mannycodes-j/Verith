"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { learningService } from "@/services/learning";
import { learningStyles as styles } from "./learning.styles";

export default function LearningCatalog({
  authenticated = false,
}: {
  authenticated?: boolean;
}) {
  const catalog = useQuery({
    queryFn: learningService.courses,
    queryKey: ["learning-courses"],
  });
  const base = authenticated ? "/app/learning" : "/learning";

  return (
    <div className={styles.catalog}>
      <header className={styles.hero}>
        <span>Grow your media literacy</span>
        <h1>Build the judgement misinformation is designed to bypass.</h1>
        <p>
          Progress from recognising persuasive tactics to evaluating claims,
          interrogating sources, recovering missing context, and making
          confident evidence-based decisions.
        </p>
      </header>

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
      {catalog.data?.length === 0 && (
        <section className={styles.empty}>
          <span>No published courses</span>
          <h2>The learning catalog is currently empty.</h2>
          <p>
            Verith will show courses here only after an authorized editor
            publishes them.
          </p>
        </section>
      )}
      {catalog.data && catalog.data.length > 0 && (
        <ol className={styles.courseList}>
          {catalog.data.map((course, index) => (
            <li key={course._id}>
              <Link href={`${base}/${course.slug}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <small>
                    {course.difficulty} · {course.estimatedDuration} min
                  </small>
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
          ))}
        </ol>
      )}
    </div>
  );
}
