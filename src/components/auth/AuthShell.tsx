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
          <p className={styles.eyebrow}>Your private evidence workspace</p>
          <h1 id="auth-context-title">
            Move from information exposure to evidence-informed action.
          </h1>
          <p className={styles.contextCopy}>
            Verith gives every investigation a transparent chain of reasoning:
            the claims identified, the evidence retrieved, the inferences made,
            and the uncertainty that still remains.
          </p>
        </div>
        <ol className={styles.workflow}>
          <li>
            <span>1</span>
            Preserve the original source
          </li>
          <li>
            <span>2</span>
            Explore claim-level evidence
          </li>
          <li>
            <span>3</span>
            Decide with context and confidence
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
          Verith strengthens human judgement with inspectable evidence—it never
          replaces it.
        </p>
      </section>
    </main>
  );
}
