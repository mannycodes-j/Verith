import Link from "next/link";
import RecentInvestigations from "./RecentInvestigations";
import { workspaceStyles as styles } from "./workspace.styles";

export default function WorkspaceOverviewPage() {
  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <span>Investigation desk</span>
        <h1>What would you like to verify?</h1>
        <p>
          Begin with a claim, article, link, image, screenshot, or voice note.
          Verith will preserve the source material and keep conclusions tied to
          inspectable evidence.
        </p>
      </header>
      <section className={styles.composerEntry}>
        <div>
          <span>New investigation</span>
          <h2>Start with the source material.</h2>
        </div>
        <Link href="/app/verify">
          Open investigation desk <span aria-hidden="true">→</span>
        </Link>
      </section>
      <div className={styles.overviewGrid}>
        <section>
          <div className={styles.sectionHeader}>
            <span>Recent investigations</span>
            <Link href="/app/verifications">View history</Link>
          </div>
          <RecentInvestigations />
        </section>
        <aside>
          <div className={styles.sectionHeader}>
            <span>Investigation principles</span>
          </div>
          <ol className={styles.principles}>
            <li>
              <span>01</span>
              Evidence and inference remain separate.
            </li>
            <li>
              <span>02</span>
              Missing evidence remains a limitation.
            </li>
            <li>
              <span>03</span>
              Unknown credibility is never shown as low credibility.
            </li>
          </ol>
        </aside>
      </div>
    </div>
  );
}
