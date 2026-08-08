import Link from "next/link";
import type { ReactNode } from "react";
import { authStyles as styles } from "./auth.styles";
import VerithLogo from "@/components/brand/VerithLogo";
import PremiumBackground from "@/components/public/PremiumBackground";

export default function AuthShell({ children }: { children: ReactNode }) {
  return (
    <main className={styles.shell}>
      <PremiumBackground />

      <a
        className="fixed top-4 left-4 z-[1000] -translate-y-[160%] bg-white px-4 py-3 text-black font-medium transition-transform duration-150 focus:translate-y-0"
        href="#auth-form"
      >
        Skip to form
      </a>
      
      <section className={styles.formRegion} id="auth-form" tabIndex={-1}>
        <div className="mb-8 flex justify-center">
          <Link href="/">
            <VerithLogo />
          </Link>
        </div>
        
        <div className={styles.formContainer}>
          {children}
        </div>
      </section>
    </main>
  );
}
