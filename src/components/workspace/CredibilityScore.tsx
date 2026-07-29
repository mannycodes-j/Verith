import React from 'react';

interface Props {
  score: number;
}

export default function CredibilityScore({ score }: Props) {
  let color = '#EF4444'; // Danger red
  let label = 'Low Credibility';
  
  if (score >= 40) {
    color = '#F59E0B'; // Warning yellow/orange
    label = 'Mixed / Unverified';
  }
  if (score >= 70) {
    color = '#10B981'; // Success green
    label = 'Highly Credible';
  }

  return (
    <div style={{
      background: '#050505',
      border: '1px solid rgba(255,255,255,0.05)',
      borderRadius: '1rem',
      padding: '2.5rem 2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        height: '100%',
        background: `radial-gradient(circle, ${color}33 0%, transparent 60%)`,
        filter: 'blur(40px)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <h3 style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '0.1em', zIndex: 1 }}>Credibility Score</h3>
      
      <div style={{ position: 'relative', width: '180px', height: '180px', zIndex: 1 }}>
        <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%' }}>
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1.5"
          />
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke={color}
            strokeWidth="1.5"
            strokeDasharray={`${score}, 100`}
            style={{ transition: 'stroke-dasharray 2s cubic-bezier(0.16, 1, 0.3, 1)', strokeLinecap: 'square' }}
          />
        </svg>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '3.5rem',
          fontWeight: '800',
          color: '#FFF',
          letterSpacing: '-0.05em'
        }}>
          {score}
        </div>
      </div>
      
      <div style={{ marginTop: '2rem', fontWeight: '600', color: color, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.9rem', zIndex: 1 }}>
        {label}
      </div>
    </div>
  );
}
