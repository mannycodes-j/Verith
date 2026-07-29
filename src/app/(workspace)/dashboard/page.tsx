'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { gamificationService, GamificationStats } from '@/services/gamificationService';

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<GamificationStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await gamificationService.getStats();
        setStats(data);
      } catch (error) {
        console.error('Failed to load profile', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.greeting}>Overview</h1>
          <p className={styles.subtitle}>Welcome to your intelligence dashboard.</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.secondaryBtn}>Export Data</button>
          <button className={styles.primaryBtn} onClick={() => router.push('/verify')}>
            New Investigation
          </button>
        </div>
      </header>

      {/* Top Stats Row */}
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>Truth Points</span>
            <svg className={styles.statIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className={styles.statValue}>{loading ? '-' : (stats?.truthPoints || 0)}</div>
          <div className={styles.statFooter}>
            <span className={styles.trendUp}>+12%</span> from last week
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>Active Streak</span>
            <svg className={styles.statIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className={styles.statValue}>{loading ? '-' : `${stats?.currentStreak || 0} Days`}</div>
          <div className={styles.statFooter}>Personal best: 7 days</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>Badges Earned</span>
            <svg className={styles.statIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <div className={styles.statValue}>{loading ? '-' : (stats?.badges?.length || 0)}</div>
          <div className={styles.statFooter}>Rank: Investigator II</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>API Status</span>
            <svg className={styles.statIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className={styles.statValue}>Online</div>
          <div className={styles.statFooter}>
            <span className={styles.trendUp}>99.9%</span> uptime
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className={styles.mainGrid}>
        {/* Left Column: Data Table */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <span className={styles.panelTitle}>Recent Investigations</span>
            <button className={styles.secondaryBtn} style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>View All</button>
          </div>
          <div className={styles.panelContent}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Content Source</th>
                  <th>Type</th>
                  <th>Credibility</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {/* Empty State Implementation */}
                <tr>
                  <td colSpan={4}>
                    <div className={styles.emptyState}>
                      <svg className={styles.emptyIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                      <span className={styles.emptyTitle}>No investigations yet</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Activity / Gamification Feed */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <span className={styles.panelTitle}>System Activity</span>
          </div>
          <div className={styles.activityFeed}>
            {/* Empty state for activity feed */}
            <div className={styles.emptyState} style={{ padding: '2rem 1rem' }}>
              <span className={styles.emptyTitle} style={{ fontSize: '0.8rem' }}>Awaiting activity...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
