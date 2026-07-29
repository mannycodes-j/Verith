import React from 'react';
import { VerificationReport } from '@/services/verification';

interface Props {
  report: VerificationReport;
}

export default function AnalysisBreakdown({ report }: Props) {
  const sections = [
    { title: 'Fact-checked Claims', data: report.claims, color: 'var(--primary)', bg: 'var(--primary-glow)' },
    { title: 'Missing Context', data: report.missingContext, color: 'var(--warning)', bg: 'var(--warning-bg)' },
    { title: 'Emotional Manipulation', data: report.emotionalManipulation, color: 'var(--danger)', bg: 'var(--danger-bg)' },
    { title: 'Bias Detected', data: report.biasDetected, color: 'var(--accent)', bg: 'rgba(139, 92, 246, 0.1)' },
    { title: 'AI-Generated Indicators', data: report.aiGeneratedIndicators, color: 'var(--success)', bg: 'var(--success-bg)' },
  ];

  return (
    <div style={{
      background: 'var(--surface-main)',
      border: '1px solid var(--surface-border)',
      borderRadius: 'var(--radius-lg)',
      padding: '2rem',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
    }}>
      <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Investigation Breakdown</h3>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.6' }}>
        {report.summary}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {sections.map((section, idx) => (
          <div key={idx} style={{ borderLeft: `3px solid ${section.color}`, paddingLeft: '1rem' }}>
            <h4 style={{ fontSize: '1rem', color: section.color, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {section.title}
              <span style={{ 
                background: section.bg, 
                padding: '0.2rem 0.5rem', 
                borderRadius: '1rem', 
                fontSize: '0.75rem' 
              }}>
                {section.data.length} found
              </span>
            </h4>
            
            {section.data.length > 0 ? (
              <ul style={{ listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {section.data.map((item, i) => (
                  <li key={i} style={{ 
                    background: 'var(--bg-color)', 
                    padding: '0.75rem 1rem', 
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem',
                    lineHeight: '1.5'
                  }}>
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontStyle: 'italic' }}>
                No indicators detected in this category.
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
