import Link from "next/link";
import { Check } from "lucide-react";
import RecentInvestigations from "./RecentInvestigations";
import { workspaceStyles as styles } from "./workspace.styles";

export default function WorkspaceOverviewPage() {
  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <span>Investigation desk</span>
        <h1>Turn a questionable claim into an evidence-backed decision.</h1>
        <p>
          Start with the content in front of you. Verith preserves the original
          material, identifies its factual claims, and builds an inspectable
          evidence trail around every conclusion.
        </p>
      </header>
      <section className={styles.composerEntry}>
        <div>
          <span>New investigation</span>
          <h2>Launch a multimodal investigation.</h2>
        </div>
        <Link href="/app/verify">
          Try now <span aria-hidden="true">→</span>
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
            <span>Trust architecture</span>
          </div>
          <ul className={styles.principles}>
            <li>
              <Check aria-hidden="true" size={17} />
              Evidence and inference remain separate.
            </li>
            <li>
              <Check aria-hidden="true" size={17} />
              Missing evidence remains a limitation.
            </li>
            <li>
              <Check aria-hidden="true" size={17} />
              Unknown credibility is never shown as low credibility.
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
