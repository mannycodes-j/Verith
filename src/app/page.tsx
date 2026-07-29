'use client';

import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import styles from './page.module.css';
import { authService } from '../services/authService';

export default function LandingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const heroRef = useRef(null);
  
  // Advanced Parallax Setup
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  // Parallax Values
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  const handleGuestLogin = async () => {
    setLoading(true);
    try {
      await authService.loginAsGuest();
      setTimeout(() => {
        router.push('/dashboard');
      }, 500);
    } catch (e) {
      router.push('/dashboard');
    }
  };

  const textVariants: Variants = {
    hidden: { y: "120%", opacity: 0 },
    visible: (custom: number) => ({
      y: 0,
      opacity: 1,
      transition: { duration: 1, delay: custom * 0.15, ease: [0.16, 1, 0.3, 1] }
    })
  };

  const bentoContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15, delayChildren: 0.2 } 
    }
  };

  const bentoVariants: Variants = {
    hidden: { y: 60, opacity: 0, scale: 0.95 },
    visible: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <div className={styles.landingContainer}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>Verith</div>
        <div className={styles.navLinks}>
          <a href="#features" className={styles.navLink}>Platform</a>
          <a href="#intelligence" className={styles.navLink}>Intelligence</a>
          <a href="#mission" className={styles.navLink}>Mission</a>
        </div>
        <div className={styles.authButtons}>
          <button className={styles.loginBtn} onClick={handleGuestLogin}>Login</button>
          <button className={styles.signupBtn} onClick={handleGuestLogin}>Enter Workspace</button>
        </div>
      </nav>

      <section ref={heroRef} className={styles.hero}>
        <motion.div style={{ y: bgY }} className={styles.heroGlow}></motion.div>
        <motion.div 
          style={{ opacity: heroOpacity, y: heroY, scale: heroScale }} 
          className={styles.heroContent}
        >
          <div className={styles.heroTitleWrapper}>
            <motion.h1 
              className={styles.heroTitle}
              initial="hidden" animate="visible"
            >
              <motion.span variants={textVariants} custom={0}>The </motion.span>
              <motion.span variants={textVariants} custom={1}>Truth </motion.span>
              <motion.span variants={textVariants} custom={2}>Engine.</motion.span>
            </motion.h1>
          </div>
          
          <div className={styles.heroSubtitleWrapper}>
            <motion.p 
              className={styles.heroSubtitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
            >
              Verith decodes emotional manipulation, verifies facts, and uncovers AI-generated content in seconds. A digital investigation workspace for the modern internet.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
            >
              <button className={styles.signupBtn} onClick={handleGuestLogin} style={{ padding: '1.25rem 3rem', fontSize: '1rem' }}>
                {loading ? 'Initializing...' : 'Launch App'}
              </button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section id="features" className={styles.features}>
        <motion.h2 
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          Unveil the unseen.
        </motion.h2>

        <motion.div 
          className={styles.bentoGrid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={bentoContainerVariants}
        >
          <motion.div variants={bentoVariants} className={`${styles.bentoItem} ${styles.bentoLarge}`}>
            <div className={styles.bentoHeader}>
              <div className={styles.bentoNumber}>01</div>
              <h3 className={styles.bentoTitle}>Deep AI Verification</h3>
              <p className={styles.bentoDesc}>Cross-references claims from any text, image, or audio against credible global sources in real-time.</p>
            </div>
            <div className={styles.bentoShape}></div>
          </motion.div>

          <motion.div variants={bentoVariants} className={styles.bentoItem}>
            <div className={styles.bentoHeader}>
              <div className={styles.bentoNumber}>02</div>
              <h3 className={styles.bentoTitle}>Emotion Detection</h3>
              <p className={styles.bentoDesc}>Identifies rage-bait and sensationalism.</p>
            </div>
          </motion.div>

          <motion.div variants={bentoVariants} className={styles.bentoItem}>
            <div className={styles.bentoHeader}>
              <div className={styles.bentoNumber}>03</div>
              <h3 className={styles.bentoTitle}>Synthetic Content</h3>
              <p className={styles.bentoDesc}>Spots AI-generated artifacts in media.</p>
            </div>
          </motion.div>

          <motion.div variants={bentoVariants} className={`${styles.bentoItem} ${styles.bentoWide}`}>
            <div className={styles.bentoHeader}>
              <div className={styles.bentoNumber}>04</div>
              <h3 className={styles.bentoTitle}>WhatsApp Integration</h3>
              <p className={styles.bentoDesc}>No app needed. Forward voice notes, claims, and screenshots directly to the Verith Bot for instant transcription and analysis.</p>
            </div>
          </motion.div>

          <motion.div variants={bentoVariants} className={`${styles.bentoItem} ${styles.bentoWide}`}>
            <div className={styles.bentoHeader}>
              <div className={styles.bentoNumber}>05</div>
              <h3 className={styles.bentoTitle}>Interactive Learning</h3>
              <p className={styles.bentoDesc}>Earn Truth Points (TP), climb the leaderboards, and master media literacy through daily challenges.</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section className={styles.footer}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className={styles.footerTitle}>Seek Truth.</h2>
          <button className={styles.startBtn} onClick={handleGuestLogin}>
            Enter Workspace
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </motion.div>
        
        <div className={styles.copyright}>
          <span>Verith © {new Date().getFullYear()}</span>
          <span>UNESCO 2026 Initiative</span>
        </div>
      </section>
    </div>
  );
}
