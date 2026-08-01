import WhatsAppComingSoon from "@/components/whatsapp/WhatsAppComingSoon";
import { whatsappSettingsStyles as styles } from "./whatsapp-settings.styles";
import SettingsNav from "../SettingsNav";

export default function WhatsAppSettings() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <span>Account: WhatsApp</span>
        <h1>WhatsApp investigations.</h1>
        <p>The integration stays locked until its provider and privacy checks are production-ready.</p>
      </header>
      <SettingsNav active="whatsapp" />

      <WhatsAppComingSoon compact />
    </div>
  );
}
