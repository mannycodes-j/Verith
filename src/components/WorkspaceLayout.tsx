'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import styles from './WorkspaceLayout.module.css';
import { gamificationService, GamificationStats } from '../services/gamificationService';

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [stats, setStats] = useState<GamificationStats | null>(null);

  useEffect(() => {
    // Fetch user stats if not on auth page
    gamificationService.getStats().then(data => {
      if (data) setStats(data);
    }).catch(() => {
      // API unavailable, ignore silently for layout
    });
  }, []);

  const getPageTitle = () => {
    if (pathname.startsWith('/dashboard')) return 'Dashboard';
    if (pathname.startsWith('/verify')) return 'Investigation Workspace';
    if (pathname.startsWith('/learn')) return 'Learning Hub';
    if (pathname.startsWith('/leaderboard')) return 'Leaderboard';
    return 'Workspace';
  };

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.mainContent}>
        <header className={styles.header}>
          <h1 className={styles.headerTitle}>{getPageTitle()}</h1>
          <div className={styles.headerActions}>
            <div className={styles.truthPoints}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              {stats ? stats.truthPoints : 0} TP
            </div>
          </div>
        </header>
        <main className={styles.pageContent}>
          {children}
        </main>
      </div>
    </div>
  );
}
