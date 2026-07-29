'use client';

import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import styles from './page.module.css';
import { verificationService, VerificationReport } from '@/services/verification';
import CredibilityScore from '@/components/workspace/CredibilityScore';
import AnalysisBreakdown from '@/components/workspace/AnalysisBreakdown';
import SourceComparison from '@/components/workspace/SourceComparison';

type InputMethod = 'text' | 'image' | 'audio';

export default function VerifyPage() {
  const [activeTab, setActiveTab] = useState<InputMethod>('text');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [report, setReport] = useState<VerificationReport | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!content && activeTab === 'text') return;
    
    setIsSubmitting(true);
    setError(null);
    setReport(null);

    try {
      // Consume real API layer
      const result = await verificationService.submitForVerification({
        content: activeTab === 'text' ? content : `[${activeTab.toUpperCase()} SUBMISSION]`, 
        type: activeTab
      });
      setReport(result);
    } catch (err: any) {
      setError(err.message || 'The verification engine is currently offline. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <motion.div 
      className={styles.container}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className={styles.header} variants={itemVariants}>
        <h1 className={styles.title}>Investigation<br/>Terminal</h1>
        <p className={styles.subtitle}>Submit suspicious claims, links, screenshots, or audio for deep analysis.</p>
      </motion.div>

      <motion.div className={styles.submissionCard} variants={itemVariants}>
        <div className={styles.tabs}>
          <button 
            className={`${styles.tab} ${activeTab === 'text' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('text')}
          >
            <svg className={styles.tabIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            Text / Link
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'image' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('image')}
          >
            <svg className={styles.tabIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Screenshot / Image
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'audio' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('audio')}
          >
            <svg className={styles.tabIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            Voice Note / Audio
          </button>
        </div>

        {activeTab === 'text' ? (
          <textarea 
            className={styles.textarea}
            placeholder="Paste a news article, social media post, website link, or forwarded message here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        ) : (
          <div className={styles.fileUploadArea}>
            <svg className={styles.uploadIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <div className={styles.uploadTitle}>Drag & Drop or Click to Upload</div>
            <div className={styles.uploadSubtitle}>
              {activeTab === 'image' 
                ? 'Support for Screenshots, Social Media captures, and Images. Engine detects manipulated pixels and AI-generation.'
                : 'Support for WhatsApp Voice Notes and Audio files. Engine transcribes and analyzes tone and claims.'}
            </div>
          </div>
        )}

        {error && (
          <div className={styles.errorState}>
            <strong>API Unavailable:</strong> {error}
          </div>
        )}

        <button 
          className={styles.submitBtn} 
          onClick={handleSubmit}
          disabled={isSubmitting || (activeTab === 'text' && !content)}
        >
          {isSubmitting ? (
             <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" style={{animation: 'spin 1s linear infinite'}}>
               <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeDasharray="32" strokeDashoffset="0" opacity="0.2"></circle>
               <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor"></path>
             </svg>
          ) : 'Run Analysis'}
        </button>
      </motion.div>

      {report && (
        <motion.div className={styles.resultsContainer} initial="hidden" animate="visible" variants={containerVariants}>
          <div className={styles.mainCol}>
            <motion.div variants={itemVariants}>
              <AnalysisBreakdown report={report} />
            </motion.div>
            <motion.div variants={itemVariants}>
              <SourceComparison sources={report.sources} />
            </motion.div>
          </div>
          
          <div className={styles.sideCol}>
            <motion.div variants={itemVariants} style={{ position: 'sticky', top: '120px' }}>
              <CredibilityScore score={report.credibilityScore} />
            </motion.div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
