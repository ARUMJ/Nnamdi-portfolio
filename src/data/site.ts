/**
 * Single source of truth for site-wide identity, navigation and about copy.
 * Header, footer, structured data, sitemap and pages all read from here so
 * the architecture stays in sync when routes or positioning change.
 */

/** The published WhatsApp destination. Also used as a structured-data contact. */
const WHATSAPP_URL = "https://wa.me/2348102505135";

/**
 * The number behind the WhatsApp link, in local format. Kept here as the
 * documented source for the link only — it is never rendered as visible
 * or screen-reader text anywhere on the site.
 */
const WHATSAPP_NUMBER = "08102505135";

/** The only social profiles verified in this repository (also in the footer). */
const INSTAGRAM_URL = "https://www.instagram.com/gospel_j1?stkn=MTdsODV6dHBpY2xnag==";
const X_URL = "https://x.com/Jona_G4";

/** Local development origin, used only when nothing else is configured. */
const DEV_FALLBACK_URL = "http://localhost:3000";

/**
 * Accepts "example.com", "https://example.com" or a trailing-slash URL and
 * returns a normalised origin without a trailing slash.
 */
function normalizeOrigin(value: string | undefined): string {
  const trimmed = (value ?? "").trim().replace(/\/+$/, "");
  if (!trimmed) return "";
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

/**
 * Resolve the public origin, most explicit first:
 *
 *  1. NEXT_PUBLIC_SITE_URL — the documented way to set the live domain.
 *  2. VERCEL_PROJECT_PRODUCTION_URL — set automatically by Vercel to the
 *     project's production domain.
 *  3. VERCEL_URL — the current deployment's own URL (preview or production).
 *  4. The local development origin.
 *
 * No domain is invented: with none of the above, `configured` is false and
 * environments that must not publish a local origin (production metadata)
 * omit absolute URLs rather than emitting http://localhost:3000.
 */
function resolveSiteOrigin(): { url: string; configured: boolean } {
  const explicit = normalizeOrigin(process.env.NEXT_PUBLIC_SITE_URL);
  if (explicit) return { url: explicit, configured: true };

  const vercelProduction = normalizeOrigin(process.env.VERCEL_PROJECT_PRODUCTION_URL);
  if (vercelProduction) return { url: vercelProduction, configured: true };

  const vercelDeployment = normalizeOrigin(process.env.VERCEL_URL);
  if (vercelDeployment) return { url: vercelDeployment, configured: true };

  return { url: DEV_FALLBACK_URL, configured: false };
}

const siteOrigin = resolveSiteOrigin();

export const site = {
  name: "Arum Jonathan Nnamdi",
  shortName: "Arum Nnamdi",
  positioning: "Digital Assistant and Web Developer",
  description:
    "Building practical digital solutions for businesses and organizations including websites, web products, website improvements and dependable digital and technical support.",

  /** Production origin. See resolveSiteOrigin above for the resolution order. */
  url: siteOrigin.url,
  /**
   * True when the origin came from configuration or the hosting platform.
   * Production metadata only publishes absolute URLs when this is true.
   */
  urlIsConfigured: siteOrigin.configured,

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
   * Content revision dates, keyed by route. Updated by hand when a route's
   * content actually changes; the sitemap reads these instead of stamping
   * every URL with the current time on each request.
   */
  contentUpdated: {
    "/": "2026-10-07",
    "/solutions": "2026-10-07",
    "/work": "2026-10-07",
    "/about": "2026-10-07",
    "/contact": "2026-10-07",
  },

  /** Verified social profiles. Labels keep the footer wording (PR #11). */
  social: [
    { label: "WhatsApp", href: WHATSAPP_URL },
    { label: "Instagram", href: INSTAGRAM_URL },
    { label: "X", href: X_URL },
  ],

  contact: {
    whatsappUrl: WHATSAPP_URL,
    whatsappNumber: WHATSAPP_NUMBER,
    /**
     * The two audiences the contact page serves. Both use the one verified
     * channel above — no other contact method is invented.
     */
    audiences: [
      {
        id: "project",
        title: "Project enquiries",
        description:
          "A website, a web interface, an improvement to something that already exists, or ongoing digital and technical support.",
        detail: "Bring the problem, the context and what a good outcome looks like.",
      },
      {
        id: "opportunity",
        title: "Professional opportunities",
        description:
          "Roles, contracts and collaborations that involve web development, digital assistance or technical support.",
        detail: "Share the role or the work you have in mind, and how you see it fitting.",
      },
    ],
  },

  about: {
    summary:
      "I am Arum Jonathan Nnamdi, a web developer and digital assistant with a background in Computer Engineering. I work with businesses, schools and organizations on the practical side of technology: building websites and web interfaces, improving what already exists, developing learning and information systems, and providing the day-to-day digital and technical support that keeps things running.",
    details:
      "The combination is deliberate — technical implementation plus practical digital support. I can take a website from requirement to deployment, and I can also be the person who keeps its content current, supports the computers and devices around it, documents how it works and helps the people using it. The approach is the same on every engagement: understand the need, then design and build the solution that fits.",
    positioning: "Technical implementation + practical digital support.",
    focusAreas: [
      "Web development",
      "Frontend development",
      "Computer Engineering background",
      "Digital assistance",
      "Technical support",
      "Computer and device support",
      "Coding instruction",
      "Learning systems",
      "School and office technology",
      "Documentation",
      "Digital and visual support",
    ],
    /** What the work covers, in plain terms. No invented employers or metrics. */
    capabilities: [
      {
        title: "Web development",
        description:
          "Responsive websites and web interfaces built with React, Next.js, TypeScript and Tailwind CSS — the stack this portfolio runs on.",
      },
      {
        title: "Technical implementation",
        description:
          "Turning a requirement into a working interface: structure, layout, components, content and deployment.",
      },
      {
        title: "Learning systems",
        description:
          "Information and learning systems for schools and organizations, from structure and content to the interface people use.",
      },
      {
        title: "Coding instruction",
        description:
          "Teaching practical coding and computer skills in a way learners can apply immediately.",
      },
      {
        title: "Computer and device support",
        description:
          "Setup, troubleshooting and everyday support for the computers, devices and tools people rely on.",
      },
      {
        title: "Website content updates",
        description:
          "Keeping site content current, accurate and consistent after launch.",
      },
      {
        title: "Digital organization and documentation",
        description:
          "Organising digital files and content, and documenting how systems and processes actually work.",
      },
      {
        title: "Presentation and visual support",
        description:
          "Presentation, document and Canva graphics support for day-to-day work.",
      },
    ],
  },
} as const;

export type SiteNavItem = (typeof site.nav)[number];
