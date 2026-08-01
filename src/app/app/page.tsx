import Link from "next/link";
import { Check } from "lucide-react";
import NewInvestigationButton from "@/components/app/NewInvestigationButton";
import RecentInvestigations from "./RecentInvestigations";
import { workspaceStyles as styles } from "./workspace.styles";

export default function WorkspaceOverviewPage() {
  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <span>Investigation desk</span>
        <h1>Check a claim before you trust it or share it.</h1>
        <p>
          Paste the message, add a link, or upload the media. Verith shows what
          the evidence supports, what it challenges, and what still needs
          caution—in language you can act on.
        </p>
      </header>
      <section className={styles.composerEntry}>
        <div>
          <span>New investigation</span>
          <h2>Check text, links, images, screenshots, audio, or video.</h2>
        </div>
        <NewInvestigationButton />
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
