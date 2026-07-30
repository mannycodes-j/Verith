import Link from "next/link";
import { landingStyles as styles } from "./page.styles";

const workflow = [
  ["01", "Receive", "Accept the material and preserve its original context."],
  ["02", "Extract", "Separate checkable claims from opinion and rhetoric."],
  ["03", "Retrieve", "Find relevant sources and evidence for each claim."],
  ["04", "Compare", "Map support, contradiction, and missing context."],
  ["05", "Explain", "Present findings, uncertainty, and useful next steps."],
] as const;

const systemSteps = [
  "Claim extraction",
  "Evidence search",
  "Source retrieval",
  "Claim comparison",
  "Context review",
  "Report synthesis",
] as const;

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 18 18">
      <path d="M3 9h11M10 4l5 5-5 5" />
    </svg>
  );
}

function SiteHeader() {
  return (
    <header className={styles.header}>
      <Link className={styles.wordmark} href="/" aria-label="Verith home">
        Verith
      </Link>
      <nav className={styles.desktopNav} aria-label="Primary navigation">
        <a href="#investigation">Product</a>
        <a href="#workflow">How it works</a>
        <Link href="/learning">Learning</Link>
        <a href="#whatsapp">WhatsApp</a>
        <a href="#evidence-policy">Evidence policy</a>
      </nav>
      <div className={styles.headerActions}>
        <Link className={styles.textAction} href="/login">
          Log in
        </Link>
        <Link className={styles.primaryAction} href="/verify">
          Start an investigation
          <ArrowIcon />
        </Link>
        <details className={styles.mobileMenu}>
          <summary>Menu</summary>
          <nav aria-label="Mobile navigation">
            <a href="#investigation">Product</a>
            <a href="#workflow">How it works</a>
            <Link href="/learning">Learning</Link>
            <a href="#whatsapp">WhatsApp</a>
            <a href="#evidence-policy">Evidence policy</a>
            <Link href="/login">Log in</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}

function InvestigationPreview() {
  return (
    <div className={styles.preview} aria-label="Illustration of the Verith investigation workflow">
      <div className={styles.previewTopbar}>
        <div>
          <span className={styles.eyebrow}>Workflow preview</span>
          <strong>Evidence investigation</strong>
        </div>
        <span className={styles.previewState}>Ready for review</span>
      </div>
      <div className={styles.previewBody}>
        <div className={styles.previewRail} aria-hidden="true">
          <span className={styles.railBrand}>V</span>
          <span>01</span>
          <span className={styles.railActive}>02</span>
          <span>03</span>
        </div>
        <div className={styles.previewContent}>
          <div className={styles.caseMeta}>
            <span>New investigation</span>
            <span>Text · English</span>
          </div>
          <p className={styles.sampleClaim}>
            Paste a claim, headline, article excerpt, or link to begin an
            evidence-led review.
          </p>
          <div className={styles.stageLine}>
            <span>Extract claims</span>
            <span>Retrieve evidence</span>
            <span>Compare sources</span>
          </div>
        </div>
        <aside className={styles.previewInspector}>
          <span className={styles.eyebrow}>Evidence behavior</span>
          <p>Every conclusion stays connected to inspectable sources.</p>
          <dl>
            <div>
              <dt>Unsupported</dt>
              <dd>Remains unsupported</dd>
            </div>
            <div>
              <dt>Uncertainty</dt>
              <dd>Shown explicitly</dd>
            </div>
            <div>
              <dt>AI indicators</dt>
              <dd>Never treated as proof</dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className={styles.page}>
      <a
        className="fixed top-4 left-4 z-1000 -translate-y-[160%] bg-foreground px-4 py-3 text-background transition-transform duration-150 focus:translate-y-0"
        href="#main-content"
      >
        Skip to content
      </a>
      <SiteHeader />

      <main id="main-content">
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Evidence before certainty</p>
            <h1>See what the evidence actually says.</h1>
            <p className={styles.heroDescription}>
              Submit a claim, article, screenshot, image, or voice note. Verith
              identifies factual claims, retrieves relevant evidence, exposes
              missing context, and keeps conclusions tied to inspectable
              sources.
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryAction} href="/verify">
                Start an investigation
                <ArrowIcon />
              </Link>
              <a className={styles.secondaryAction} href="#investigation">
                Explore Verith
              </a>
            </div>
          </div>
          <InvestigationPreview />
          <div className={styles.statusStrip} aria-label="Verith principles">
            <span>Real sources</span>
            <span>Claim-level analysis</span>
            <span>Explained uncertainty</span>
          </div>
        </section>

        <section className={styles.editorialSection} id="investigation">
          <div className={styles.sectionMarker}>
            <span>01</span>
            <span>Investigation</span>
          </div>
          <div className={styles.sectionLead}>
            <h2>Evidence-locked verification.</h2>
            <p>
              Verith turns submitted media into a structured investigation.
              Claims, evidence, context, source details, and limitations remain
              distinct so you can inspect how a conclusion was reached.
            </p>
          </div>
          <div className={styles.investigationGrid}>
            <article className={styles.documentPanel}>
              <div className={styles.panelLabel}>
                <span>Submitted material</span>
                <span>Original preserved</span>
              </div>
              <blockquote>
                “A circulating post makes several checkable claims but provides
                no publication date or primary source.”
              </blockquote>
              <div className={styles.annotation}>
                <span>Claim 01</span>
                <p>Checkable statement isolated for evidence retrieval.</p>
              </div>
              <div className={styles.annotation}>
                <span>Context flag</span>
                <p>Publication timing and source attribution are missing.</p>
              </div>
            </article>
            <aside className={styles.evidencePanel}>
              <div className={styles.panelLabel}>
                <span>Evidence inspector</span>
                <span>Source relationship</span>
              </div>
              <div className={styles.evidenceRecord}>
                <span className={styles.evidenceIndex}>E—01</span>
                <div>
                  <strong>Primary and reputable sources</strong>
                  <p>
                    Relevant excerpts are mapped to the exact claim they
                    support, contradict, or contextualize.
                  </p>
                </div>
              </div>
              <div className={styles.evidenceRecord}>
                <span className={styles.evidenceIndex}>E—02</span>
                <div>
                  <strong>Uncertainty remains visible</strong>
                  <p>
                    Incomplete evidence is reported as a limitation, not turned
                    into false confidence.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className={styles.editorialSection} id="workflow">
          <div className={styles.sectionMarker}>
            <span>02</span>
            <span>Workflow</span>
          </div>
          <div className={styles.sectionLead}>
            <h2>From submission to an inspectable report.</h2>
          </div>
          <ol className={styles.workflowList}>
            {workflow.map(([number, title, description]) => (
              <li key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section
          className={`${styles.editorialSection} ${styles.darkSection}`}
          id="evidence-policy"
        >
          <div className={styles.sectionMarker}>
            <span>03</span>
            <span>Evidence policy</span>
          </div>
          <div className={styles.policyLayout}>
            <h2>What Verith does not pretend to know.</h2>
            <div className={styles.policyList}>
              <p>No fabricated citations.</p>
              <p>Unsupported claims remain unsupported.</p>
              <p>Unknown source credibility remains unknown.</p>
              <p>Unavailable analysis remains unavailable.</p>
              <p>AI-generation indicators are not proof.</p>
              <p>Evidence and inference are labelled separately.</p>
            </div>
          </div>
        </section>

        <section className={styles.editorialSection}>
          <div className={styles.sectionMarker}>
            <span>04</span>
            <span>System</span>
          </div>
          <div className={styles.systemGrid}>
            <div>
              <h2>A connected investigation pipeline.</h2>
              <p className={styles.sectionDescription}>
                Each stage contributes a specific kind of analysis. Provider or
                evidence gaps stay visible rather than being silently filled.
              </p>
            </div>
            <ol className={styles.systemList}>
              {systemSteps.map((step, index) => (
                <li key={step}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{step}</strong>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.splitSection}>
          <article>
            <div className={styles.sectionMarker}>
              <span>05</span>
              <span>Learning</span>
            </div>
            <h2>Build durable media literacy.</h2>
            <p>
              Follow structured lessons, test your reasoning with quizzes, and
              practise evidence assessment through daily challenges.
            </p>
            <Link className={styles.inlineLink} href="/learning">
              Explore learning <ArrowIcon />
            </Link>
          </article>
          <article id="whatsapp">
            <div className={styles.sectionMarker}>
              <span>06</span>
              <span>WhatsApp</span>
            </div>
            <h2>Investigate where information finds you.</h2>
            <p>
              Forward supported text, links, screenshots, images, and voice
              notes to Verith, then inspect the resulting evidence report.
            </p>
            <Link className={styles.inlineLink} href="/whatsapp">
              See how WhatsApp works <ArrowIcon />
            </Link>
          </article>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerIdentity}>
          <Link className={styles.wordmark} href="/">
            Verith
          </Link>
          <p>Understand what is true before you share.</p>
        </div>
        <div className={styles.footerLinks}>
          <div>
            <span>Product</span>
            <Link href="/verify">Investigate</Link>
            <Link href="/how-it-works">How it works</Link>
            <Link href="/learning">Learning</Link>
          </div>
          <div>
            <span>Principles</span>
            <a href="#evidence-policy">Evidence policy</a>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
          <div>
            <span>Access</span>
            <Link href="/login">Log in</Link>
            <Link href="/register">Create account</Link>
            <Link href="/whatsapp">WhatsApp</Link>
          </div>
        </div>
        <div className={styles.footerBase}>
          <span>© {new Date().getFullYear()} Verith</span>
          <span>Evidence-led media verification</span>
        </div>
      </footer>
    </div>
  );
}
