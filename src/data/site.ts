/**
 * Single source of truth for site-wide identity, navigation and about copy.
 * Header, footer, sitemap and pages all read from here so the architecture
 * stays in sync when routes or positioning change.
 */

export const site = {
  name: "Arum Jonathan Nnamdi",
  shortName: "Arum Nnamdi",
  positioning: "Digital Assistant and Web Developer",
  description:
    "Building practical digital solutions for businesses and organizations including websites, web products, website improvements and dependable digital and technical support.",

  /**
   * Production origin. Set NEXT_PUBLIC_SITE_URL on Vercel once the domain is
   * live; the local fallback keeps builds working before that happens.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  nav: [
    { label: "Home", href: "/" },
    { label: "Solutions", href: "/solutions" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],

  primaryCta: {
    label: "Start a Project",
    href: "/contact",
  },

  /**
   * Real contact channels. The WhatsApp display number keeps the local
   * Nigerian format; the wa.me link uses the international code (234) with
   * the leading 0 dropped, as WhatsApp requires.
   */
  contact: {
    whatsappNumber: "08102505135",
    whatsappUrl: "https://wa.me/2348102505135",
  },

  about: {
    summary:
      "I am Arum Jonathan Nnamdi, a web developer and digital assistant with a background in Computer Engineering. I work with businesses and organizations on the practical side of technology building websites and web products, improving what already exists and providing the digital and technical support that keeps things running.",
    details:
      "The common thread is the same on every engagement. I start by understanding the need, then design and build the solution that fits. The result is clear, practical and built to last.",
    focusAreas: [
      "Computer Engineering background",
      "Web development",
      "Digital assistance",
      "Technical support",
      "Business and project work",
    ],
  },
} as const;

export type SiteNavItem = (typeof site.nav)[number];
