'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { learningService, Lesson, DailyChallenge } from '@/services/learningService';

export default function LearnPage() {
  const [lessons, setLessons] = useState<Lesson[] | null>(null);
  const [challenge, setChallenge] = useState<DailyChallenge | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedLessons, fetchedChallenge] = await Promise.all([
          learningService.getLessons(),
          learningService.getDailyChallenge()
        ]);
        setLessons(fetchedLessons);
        setChallenge(fetchedChallenge);
      } catch (error) {
        console.error('Failed to load learning data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Learning Hub</h2>
        <p className={styles.subtitle}>Master media literacy skills and earn Truth Points through interactive lessons.</p>
      </div>

      {loading ? (
        <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
          <svg className="animate-spin" width="24" height="24" viewBox="0 0 24 24" fill="none" style={{animation: 'spin 1s linear infinite', margin: '0 auto 1rem', display: 'block'}}>
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeDasharray="32" strokeDashoffset="0" opacity="0.2"></circle>
            <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor"></path>
          </svg>
          Loading your curriculum...
        </div>
      ) : (
        <>
          {challenge ? (
            <div className={`${styles.challengeSection} animate-fade-in`}>
              <div className={styles.challengeInfo}>
                <h3>
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Daily Challenge: {challenge.title}
                </h3>
                <p>Complete today's challenge to earn +{challenge.points} TP</p>
              </div>
              {challenge.completed ? (
                <div className={styles.completedBadge}>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Completed
                </div>
              ) : (
                <button className={styles.challengeAction}>Start Challenge</button>
              )}
            </div>
          ) : (
            <div className={styles.challengeSection} style={{ background: 'var(--surface-main)', border: '1px solid var(--surface-border)' }}>
              <div className={styles.challengeInfo}>
                <h3 style={{ color: 'var(--text-secondary)' }}>Daily Challenge Unavailable</h3>
                <p>We couldn't load today's challenge from the server.</p>
              </div>
            </div>
          )}

          <div className={`${styles.grid} animate-fade-in`}>
            {lessons && lessons.length > 0 ? (
              lessons.map((lesson) => (
                <div key={lesson.id} className={styles.card}>
                  <div className={styles.cardCategory}>{lesson.category}</div>
                  <div className={styles.cardTitle}>{lesson.title}</div>
                  <div className={styles.cardDesc}>{lesson.description}</div>
                  
                  <div className={styles.cardFooter}>
                    {lesson.isCompleted ? (
                      <div className={styles.completedBadge}>
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        Mastered
                      </div>
                    ) : (
                      <button className={styles.startBtn}>Start Lesson</button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.emptyState} style={{ gridColumn: '1 / -1' }}>
                <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1} style={{ margin: '0 auto 1rem', display: 'block', opacity: 0.5 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <p>Curriculum is currently unavailable.</p>
                <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>The learning API endpoint could not be reached.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
