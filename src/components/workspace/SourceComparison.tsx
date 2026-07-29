import React from 'react';

interface Source {
  title: string;
  url: string;
  credibility: 'high' | 'medium' | 'low';
}

interface Props {
  sources: Source[];
}

export default function SourceComparison({ sources }: Props) {
  return (
    <div style={{
      background: 'var(--surface-main)',
      border: '1px solid var(--surface-border)',
      borderRadius: 'var(--radius-lg)',
      padding: '2rem',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
    }}>
      <h3 style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Source Verification</h3>
      
      {sources.length === 0 ? (
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontStyle: 'italic' }}>
          No credible sources found to compare against.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {sources.map((source, idx) => {
            let badgeColor = 'var(--warning)';
            let badgeBg = 'var(--warning-bg)';
            if (source.credibility === 'high') {
              badgeColor = 'var(--success)';
              badgeBg = 'var(--success-bg)';
            } else if (source.credibility === 'low') {
              badgeColor = 'var(--danger)';
              badgeBg = 'var(--danger-bg)';
            }

            return (
              <a 
                key={idx} 
                href={source.url} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  background: 'var(--bg-color)',
                  border: '1px solid var(--surface-border)',
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s ease',
                }}
                onMouseOver={(e) => (e.currentTarget.style.borderColor = 'var(--primary)')}
                onMouseOut={(e) => (e.currentTarget.style.borderColor = 'var(--surface-border)')}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <div style={{ fontWeight: '600', color: 'var(--text-primary)', fontSize: '0.95rem', flex: 1, paddingRight: '1rem' }}>
                    {source.title}
                  </div>
                  <span style={{
                    background: badgeBg,
                    color: badgeColor,
                    padding: '0.2rem 0.6rem',
                    borderRadius: '1rem',
                    fontSize: '0.7rem',
                    fontWeight: 'bold',
                    textTransform: 'uppercase'
                  }}>
                    {source.credibility}
                  </span>
                </div>
                <div style={{
                  color: 'var(--primary)',
                  fontSize: '0.8rem',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {new URL(source.url).hostname}
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
