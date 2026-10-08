import type { Metadata, Viewport } from "next";

// Self-hosted Merriweather for headings — Build 07 correction
// Headings: Merriweather (Fontsource) — serif display
// Body/interface: Arial Rounded MT system stack (no download, see globals.css)
import "@fontsource/merriweather/400.css";
import "@fontsource/merriweather/400-italic.css";
import "@fontsource/merriweather/700.css";
import "@fontsource/merriweather/700-italic.css";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { absoluteUrl, metadataBaseUrl, shareImageUrl, structuredData } from "@/lib/seo";
import { revealBootstrapScript } from "@/lib/reveal";
import { site } from "@/data/site";
import { themeInitScript } from "@/lib/theme";

import "./globals.css";

export const metadata: Metadata = {
  // Omitted in a production build with no configured origin, so no
  // http://localhost:3000 URL can leak into published metadata.
  metadataBase: metadataBaseUrl,
  title: {
    default: `${site.name} | ${site.positioning}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: absoluteUrl("/"),
    siteName: site.name,
    title: `${site.name} | ${site.positioning}`,
    description: site.description,
    images: shareImageUrl
      ? [
          {
            url: shareImageUrl,
            width: 1200,
            height: 630,
            alt: `${site.name} — ${site.positioning}`,
          },
        ]
      : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.positioning}`,
    description: site.description,
    images: shareImageUrl ? [shareImageUrl] : undefined,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#101214",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        {/*
          Theme bootstrap: runs during the initial HTML parse, before first
          paint, so the stored/system theme is applied with no flash of the
          wrong theme. Mirrored at runtime by src/lib/theme.ts.
        */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript() }} />
        {/*
          Reveal bootstrap: arms the scroll-reveal animation before paint and
          schedules the fail-open timer, so content is never trapped hidden by
          a controller that failed to load. See src/lib/reveal.ts.
        */}
        <script dangerouslySetInnerHTML={{ __html: revealBootstrapScript() }} />
        <noscript>
          <style>{"html .reveal{opacity:1!important;transform:none!important}html .media-reveal{clip-path:none!important}"}</style>
        </noscript>
        {/*
          Structured data: Person + ProfessionalService. Built from verified
          facts only — see src/lib/seo.ts.
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()) }}
        />
        <ScrollReveal />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
