import Link from "next/link";
import MotionReveal from "@/components/public/MotionReveal";
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
    <svg
      aria-hidden="true"
      viewBox="0 0 18 18"
      className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    >
      <path d="M3 9h11M10 4l5 5-5 5" />
    </svg>
  );
}

function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between">
        <Link className={styles.wordmark} href="/" aria-label="Verith home">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-foreground font-bold font-sans text-lg shadow-[0_0_15px_-3px_rgba(255,196,56,0.5)]">
            V
          </div>
          <span className="font-semibold text-[17px] tracking-tight">Verith</span>
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-400">
            Engine
          </span>
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
            <summary className="cursor-pointer font-mono text-[11px] uppercase tracking-wider text-zinc-400">Menu</summary>
            <nav className="absolute top-full right-0 mt-2 grid w-48 rounded-lg border border-white/10 bg-zinc-950/90 p-2 backdrop-blur-md" aria-label="Mobile navigation">
              <a href="#investigation">Product</a>
              <a href="#workflow">How it works</a>
              <Link href="/learning">Learning</Link>
              <a href="#whatsapp">WhatsApp</a>
              <a href="#evidence-policy">Evidence policy</a>
              <Link href="/login">Log in</Link>
              <Link href="/verify" className="text-accent hover:text-accent/80">Start investigation</Link>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}

function InvestigationPreview() {
  return (
    <div className={`${styles.preview} animate-entrance animation-delay-300`} aria-label="Illustration of the Verith investigation workflow">
      {/* Top Header / Bar */}
      <div className={styles.previewTopbar}>
        <div className="flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded-md bg-accent text-accent-foreground font-bold font-sans text-xs">
            V
          </div>
          <strong>Verification Feed</strong>
        </div>
        <span className={styles.previewState}>Interface preview</span>
      </div>

      {/* Main Body Grid */}
      <div className={styles.previewBody}>
        {/* Left Rail (Sidebar tabs) */}
        <div className={styles.previewRail}>
          <span className={styles.railBrand}>Verith Engine</span>
          <div className="flex flex-col gap-2 w-full px-3">
            <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-[12px] bg-white/[0.06] text-foreground font-medium transition-colors">
              <span>Overview</span>
            </button>
            <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-[12px] text-zinc-400 hover:bg-white/[0.04] hover:text-foreground transition-colors">
              <span>Factual Claims</span>
            </button>
            <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-[12px] text-zinc-400 hover:bg-white/[0.04] hover:text-foreground transition-colors">
              <span>Source Map</span>
            </button>
            <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-[12px] text-zinc-400 hover:bg-white/[0.04] hover:text-foreground transition-colors">
              <span>Reports</span>
            </button>
          </div>

          <div className="mt-auto px-4 py-3 border-t border-white/[0.05] w-full">
            <div className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5 rounded-full bg-emerald-400">
                <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-60"></span>
              </span>
              <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider">engine online</span>
            </div>
          </div>
        </div>

        {/* Middle: Investigation Feed */}
        <div className="flex flex-col bg-[#0B0C0E]">
          <div className="flex h-14 items-center justify-between border-b border-white/[0.05] px-5 shrink-0">
            <span className="text-[12px] font-medium text-foreground/80">Active claims</span>
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">Real-time</span>
          </div>
          <ul className="flex-1 overflow-hidden list-none p-0 m-0">
            <li className="flex flex-col gap-1 border-b border-white/[0.05] p-4 border-l-2 border-l-accent bg-[#16181D]">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-[10px] text-accent font-semibold">CLAIM INPUT</span>
                <span className="h-1 w-1 rounded-full bg-zinc-600"></span>
                <span className="text-[10px] text-zinc-400">English</span>
              </div>
              <span className="text-[13px] leading-snug font-medium text-foreground">Paste a claim, headline, article excerpt...</span>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-[10px] text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded border border-emerald-400/20 uppercase tracking-wider font-mono font-medium">Ready</span>
                <span className="ml-auto flex h-4 w-4 items-center justify-center rounded-full border border-white/10 bg-zinc-900 font-mono text-[8px] text-zinc-400">01</span>
              </div>
            </li>
            <li className="flex flex-col gap-1 border-b border-white/[0.05] p-4 hover:bg-[#131416]/50 transition-colors">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-[10px] text-zinc-500 font-semibold">SOURCE REVIEW</span>
                <span className="h-1 w-1 rounded-full bg-zinc-600"></span>
                <span className="text-[10px] text-zinc-400">English</span>
              </div>
              <span className="text-[13px] leading-snug text-zinc-400">CIRCULATING: circulation post makes claims...</span>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-[10px] text-accent bg-accent/10 px-1.5 py-0.5 rounded border border-accent/20 uppercase tracking-wider font-mono font-medium">Analyzing</span>
                <span className="ml-auto flex h-4 w-4 items-center justify-center rounded-full border border-white/10 bg-zinc-800 font-mono text-[8px] text-zinc-500">02</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Right: Details / Code panel */}
        <div className="relative flex flex-col bg-[#0B0C0E] h-full">
          <div className="flex h-14 items-center justify-between border-b border-white/[0.05] px-6 shrink-0">
            <div className="flex items-center gap-2 text-zinc-400">
              <span className="font-mono text-[10px]">Verith</span>
              <span className="text-[10px]">/</span>
              <span className="font-mono text-[10px] text-foreground/80">inspector</span>
            </div>
            <div className="text-[10px] text-zinc-500 font-mono">active</div>
          </div>
          <div className="overflow-y-auto p-6 flex-1 flex flex-col justify-between">
            <div>
              <h2 className="mb-4 text-lg font-medium tracking-tight text-foreground">Factual Claim Inspector</h2>
              <div className="mb-6 flex items-center gap-4 border-b border-white/[0.05] pb-4">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-zinc-500">Verified by</span>
                  <span className="text-[11px] text-accent font-semibold">Verith Engine</span>
                </div>
                <span className="text-zinc-600">·</span>
                <span className="text-[11px] text-zinc-400">Factual context mapped</span>
              </div>
              <div className="space-y-4 text-[13px] leading-relaxed text-zinc-400">
                <p>Every conclusion stays connected to inspectable, primary sources so you can review evidence relationships directly.</p>

                {/* Code Block */}
                <div className="my-4 overflow-hidden rounded-lg border border-white/10 bg-[#090A0B] shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/[0.05] bg-[#131416] px-4 py-2">
                    <span className="font-mono text-[10px] text-zinc-400">verith-pipeline.ts</span>
                    <span className="font-mono text-[9px] text-zinc-500">TypeScript</span>
                  </div>
                  <div className="overflow-x-auto p-4 font-mono text-[11px] leading-relaxed text-left">
                    <div className="text-zinc-500">{"// extract and compare claims"}</div>
                    <div className="mt-1 flex flex-wrap gap-x-1">
                      <span className="text-purple-400">const</span>
                      <span className="text-blue-300">sources</span>
                      <span className="text-foreground/60">=</span>
                      <span className="text-yellow-300">await</span>
                      <span className="text-blue-400">engine.retrieve</span>
                      <span className="text-zinc-500">(claimId)</span>
                    </div>
                    <div className="mt-1 flex flex-wrap gap-x-1">
                      <span className="text-purple-400">const</span>
                      <span className="text-blue-300">report</span>
                      <span className="text-foreground/60">=</span>
                      <span className="text-blue-400">compare</span>
                      <span className="text-zinc-500">(claim, sources)</span>
                    </div>
                    <div className="mt-2 text-emerald-400/80">✓ evidence relationships remain inspectable</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Inspector logs */}
            <div className="mt-6 border-t border-white/[0.05] pt-4">
              <div className="flex gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-amber-500/20 bg-amber-500/10 font-mono text-[9px] font-medium text-accent">
                  EV
                </div>
                <div className="flex-1">
                  <div className="mb-0.5 flex items-center gap-1.5">
                    <span className="font-mono text-[12px] font-medium text-foreground">verith.agent</span>
                    <span className="text-[9px] text-zinc-500">just now</span>
                  </div>
                  <p className="text-[12px] leading-normal text-zinc-400">Claims isolated for retrieval. 3 references mapped to sources.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CapabilityMarquee() {
  const capabilities = [
    "Claim-level analysis",
    "Inspectable sources",
    "Explicit uncertainty",
    "Missing-context review",
    "Evidence relationships",
    "Visible limitations",
  ];
  const items = [...capabilities, ...capabilities];

  return (
    <div className="group relative mt-16 overflow-hidden border-y border-white/[0.06] bg-black/40 py-3.5 backdrop-blur-sm">
      <div className="flex w-max gap-12 whitespace-nowrap font-mono text-[11px] animate-marquee group-hover:[animation-play-state:paused]">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 text-zinc-400">
            <span className="h-1.5 w-1.5 rounded-full bg-accent"></span>
            <span className="uppercase tracking-[0.14em] text-foreground/75">{item}</span>
          </div>
        ))}
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
          {/* Ambient light glow backdrop */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px] overflow-hidden" style={{ maskImage: 'linear-gradient(180deg, transparent 0%, black 0%, black 80%, transparent 100%)', WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, black 0%, black 80%, transparent 100%)' }}>
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-amber-500/20 to-amber-600/5 rounded-full blur-[120px]"></div>
          </div>

          <div className={`${styles.heroCopy} animate-entrance`}>
            <p className={styles.eyebrow}>
              <span className="relative inline-flex h-1.5 w-1.5 bg-accent rounded-full animate-pulse mr-1"></span>
              Evidence before certainty
            </p>
            <h1 className="mt-7 text-left text-5xl font-semibold leading-[1.05] tracking-[-0.045em] text-foreground md:text-[72px]">
              See what the evidence actually says.<br />
              <span className="bg-gradient-to-b from-foreground to-foreground/40 bg-clip-text text-transparent">Investigate without guesswork.</span>
            </h1>
            <p className={styles.heroDescription}>
              Submit a claim, article, screenshot, image, or voice note. Verith
              identifies factual claims, retrieves relevant evidence, exposes
              missing context, and keeps conclusions tied to inspectable
              sources.
            </p>
            <div className={styles.heroActions}>
              <span className="relative inline-flex group">
                <span aria-hidden="true" className="pointer-events-none absolute -inset-1 rounded-full bg-gradient-to-b from-amber-400 to-amber-600 opacity-40 blur transition duration-500 group-hover:opacity-75 group-hover:blur-md"></span>
                <Link className="relative inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#FFEBB1] to-[#FFC438] px-7 py-3.5 text-sm font-medium text-[#18130a] shadow-[rgba(255,162,42,0.55)_0px_12px_28px_-10px] transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]" href="/verify">
                  Start an investigation
                  <ArrowIcon />
                </Link>
              </span>
              <a className={styles.secondaryAction} href="#investigation">
                Explore Verith
              </a>
            </div>

            {/* Product principles, not usage statistics. */}
            <div className="mt-16 flex flex-wrap items-center gap-8 font-mono text-[11px] text-zinc-400">
              <div>
                <div className="text-base font-medium text-foreground">Sources</div>
                <div className="mt-0.5 uppercase tracking-[0.14em]">Remain inspectable</div>
              </div>
              <div>
                <div className="text-base font-medium text-foreground">Uncertainty</div>
                <div className="mt-0.5 uppercase tracking-[0.14em]">Stays explicit</div>
              </div>
              <div>
                <div className="text-base font-medium text-foreground">Multimodal</div>
                <div className="mt-0.5 uppercase tracking-[0.14em]">Supported inputs</div>
              </div>
              <div>
                <div className="text-base font-medium text-foreground">Evidence first</div>
                <div className="mt-0.5 uppercase tracking-[0.14em]">No absolute truth claims</div>
              </div>
            </div>
          </div>

          <InvestigationPreview />
          <CapabilityMarquee />
        </section>

        <section className={styles.editorialSection} id="investigation">
          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>

          <MotionReveal>
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
          </MotionReveal>
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
          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/3 rounded-full blur-[100px] pointer-events-none"></div>

          <MotionReveal>
            <div className={styles.sectionMarker}>
              <span>02</span>
              <span>Workflow</span>
            </div>
            <div className={styles.sectionLead}>
              <h2>From submission to an inspectable report.</h2>
            </div>
          </MotionReveal>
          <ol className={styles.workflowList}>
            {workflow.map(([number, title, description]) => (
              <li key={number} className="relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] p-6 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300">
                <span className="font-mono text-xs text-accent">{number}</span>
                <h3 className="text-lg font-medium text-foreground mt-4 mb-2">{title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section
          className={`${styles.editorialSection} ${styles.darkSection}`}
          id="evidence-policy"
        >
          {/* Ambient Glow */}
          <div className="absolute right-10 bottom-10 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[80px] pointer-events-none"></div>

          <div className={styles.sectionMarker}>
            <span>03</span>
            <span>Evidence policy</span>
          </div>
          <div className={styles.policyLayout}>
            <h2>What Verith does not pretend to know.</h2>
            <div className={styles.policyList}>
              <p><span className="text-red-400 mr-2">✗</span> No fabricated citations.</p>
              <p><span className="text-red-400 mr-2">✗</span> Unsupported claims remain unsupported.</p>
              <p><span className="text-red-400 mr-2">✗</span> Unknown source credibility remains unknown.</p>
              <p><span className="text-red-400 mr-2">✗</span> Unavailable analysis remains unavailable.</p>
              <p><span className="text-red-400 mr-2">✗</span> AI-generation indicators are not proof.</p>
              <p><span className="text-emerald-400 mr-2">✓</span> Evidence and inference are labelled separately.</p>
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
                <li key={step} className="hover:bg-white/[0.02] transition-colors px-2.5 py-1 rounded-md">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{step}</strong>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.splitSection}>
          <article className="relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <div className={styles.sectionMarker}>
              <span>05</span>
              <span>Learning</span>
            </div>
            <h2>Build durable media literacy.</h2>
            <p>
              Follow structured lessons, test your reasoning with quizzes, and
              practise evidence assessment through daily challenges.
            </p>
            <Link className={`${styles.inlineLink} group`} href="/learning">
              Explore learning <ArrowIcon />
            </Link>
          </article>
          <article id="whatsapp" className="relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <div className={styles.sectionMarker}>
              <span>06</span>
              <span>WhatsApp</span>
            </div>
            <h2>Investigate where information finds you.</h2>
            <p>
              Forward supported text, links, screenshots, images, and voice
              notes to Verith, then inspect the resulting evidence report.
            </p>
            <Link className={`${styles.inlineLink} group`} href="/whatsapp">
              See how WhatsApp works <ArrowIcon />
            </Link>
          </article>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-12 max-w-5xl mx-auto items-start">
          <div className={styles.footerIdentity}>
            <Link className="font-sans text-[20px] font-semibold text-foreground flex items-center gap-2 mb-4 hover:opacity-90 transition-opacity" href="/">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-accent-foreground font-bold font-sans text-sm">
                V
              </div>
              Verith
            </Link>
            <p className="text-zinc-500">Understand what is true before you share.</p>
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
        </div>
        <div className={styles.footerBase}>
          <span>© {new Date().getFullYear()} Verith</span>
          <span>Evidence-led media verification</span>
        </div>
      </footer>
    </div>
  );
}
