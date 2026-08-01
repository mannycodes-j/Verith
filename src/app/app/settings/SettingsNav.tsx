import Link from "next/link";
import { settingsStyles as styles } from "./settings.styles";

const sections = [
  { href: "/app/settings", id: "profile", label: "Profile" },
  {
    href: "/app/settings/privacy",
    id: "privacy",
    label: "Privacy and data",
  },
  {
    href: "/app/settings/security",
    id: "security",
    label: "Password and sessions",
  },
  { href: "/app/settings/whatsapp", id: "whatsapp", label: "WhatsApp" },
] as const;

export type SettingsSection = (typeof sections)[number]["id"];

export default function SettingsNav({ active }: { active: SettingsSection }) {
  return (
    <nav className={styles.settingsNav} aria-label="Settings sections">
      {sections.map((section) => {
        const isActive = section.id === active;
        return (
          <Link
            aria-current={isActive ? "page" : undefined}
            data-active={isActive}
            href={section.href}
            key={section.id}
          >
            {section.label}
          </Link>
        );
      })}
    </nav>
  );
}
