'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { gamificationService, LeaderboardEntry } from '@/services/gamificationService';

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await gamificationService.getLeaderboard();
        setLeaderboard(data);
      } catch (error) {
        console.error('Failed to load leaderboard', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Global Leaderboard</h2>
        <p className={styles.subtitle}>Top truth seekers fighting misinformation this week.</p>
      </div>

      <div className={`${styles.leaderboardCard} animate-fade-in`}>
        {loading ? (
          <div className={styles.emptyState}>
            <svg className="animate-spin" width="24" height="24" viewBox="0 0 24 24" fill="none" style={{animation: 'spin 1s linear infinite', margin: '0 auto 1rem', display: 'block'}}>
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeDasharray="32" strokeDashoffset="0" opacity="0.2"></circle>
              <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor"></path>
            </svg>
            Loading rankings...
          </div>
        ) : leaderboard && leaderboard.length > 0 ? (
          <div className={styles.list}>
            {leaderboard.map((user) => (
              <div 
                key={user.userId} 
                className={`${styles.item} ${user.rank <= 3 ? styles.topThree : ''}`}
              >
                <div className={`${styles.rank} ${user.rank === 1 ? styles.rank1 : user.rank === 2 ? styles.rank2 : user.rank === 3 ? styles.rank3 : ''}`}>
                  #{user.rank}
                </div>
                
                <div className={styles.userInfo}>
                  <div className={styles.avatar}>
                    {user.name.charAt(0)}
                  </div>
                  <div className={styles.name}>{user.name}</div>
                </div>

                <div className={styles.points}>
                  {user.points} TP
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1} style={{ margin: '0 auto 1rem', display: 'block', opacity: 0.5 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            Leaderboard is currently unavailable.
          </div>
        )}
      </div>
    </div>
  );
}
