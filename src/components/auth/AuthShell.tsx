import Link from "next/link";
import type { ReactNode } from "react";
import { authStyles as styles } from "./auth.styles";

export default function AuthShell({ children }: { children: ReactNode }) {
  return (
    <main className={styles.shell}>
      <a
        className="fixed top-4 left-4 z-1000 -translate-y-[160%] bg-foreground px-4 py-3 text-background transition-transform duration-150 focus:translate-y-0"
        href="#auth-form"
      >
        Skip to form
      </a>
      <section className={styles.context} aria-labelledby="auth-context-title">
        <Link className={styles.wordmark} href="/">
          <span className="inline-flex size-8 items-center justify-center rounded-lg bg-accent text-sm font-bold text-accent-foreground">
            V
          </span>
          <span className="ml-2">Verith</span>
        </Link>
        <div className={`${styles.contextBody} animate-entrance`}>
          <p className={styles.eyebrow}>A private space to check what you see</p>
          <h1 id="auth-context-title">
            Investigate the claim. Inspect the evidence.
          </h1>
          <p className={styles.contextCopy}>
            Verith keeps factual claims, retrieved evidence, inference, and
            uncertainty visibly separate throughout every investigation.
          </p>
        </div>
        <ol className={styles.workflow}>
          <li>
            <span>1</span>
            Submit source material
          </li>
          <li>
            <span>2</span>
            Review claim-level evidence
          </li>
          <li>
            <span>3</span>
            Understand limits before sharing
          </li>
        </ol>
      </section>
      <section className={styles.formRegion} id="auth-form">
        <div className={styles.formTopbar}>
          <Link href="/">Return home</Link>
          <span>Encrypted session</span>
        </div>
        <div className={`${styles.formContainer} animate-entrance animation-delay-150`}>
          {children}
        </div>
        <p className={styles.formFooter}>
          Verith presents evidence-led analysis, not absolute truth.
        </p>
      </section>
    </main>
  );
}
