import type { Metadata } from "next";
import AppProviders from "@/components/providers/AppProviders";
import "./globals.css";
import AdaptiveExperience from "@/components/providers/AdaptiveExperience";

export const metadata: Metadata = {
  title: {
    default: "Verith — Evidence-led media verification",
    template: "%s — Verith",
  },
  description:
    "Investigate claims, inspect evidence, and understand uncertainty before you share.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-scroll-behavior="smooth" lang="en" className="dark" data-theme="dark" suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans antialiased selection:bg-white/10 selection:text-white" suppressHydrationWarning>
        <AdaptiveExperience />
        <AppProviders>{children}</AppProviders>
        <div id="google_translate_element" style={{ display: "none" }}></div>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              function googleTranslateElementInit() {
                new google.translate.TranslateElement({
                  pageLanguage: 'en',
                  includedLanguages: 'en,fr,yo',
                  autoDisplay: false
                }, 'google_translate_element');
              }
            `,
          }}
        />
        <script src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" async defer></script>
      </body>
    </html>
  );
}
