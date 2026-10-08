import type { Metadata } from "next";

import { servicePathways } from "@/data/solutions";
import { site } from "@/data/site";

/**
 * SEO helpers — Build 08.
 *
 * One place decides what absolute URLs may be published. A production
 * build with no configured public origin must never emit
 * `http://localhost:3000` into metadata, so canonical and Open Graph URLs
 * are omitted rather than guessed. The origin itself is resolved in
 * src/data/site.ts (NEXT_PUBLIC_SITE_URL → Vercel's provided URLs →
 * local development), so no domain is ever invented here.
 */
const canPublishAbsoluteUrls =
  site.urlIsConfigured || process.env.NODE_ENV !== "production";

/**
 * `metadataBase` for Next.js. Omitted in a production build without a
 * configured origin so relative asset URLs are resolved by the crawler
 * against the fetched page instead of against localhost.
 */
export const metadataBaseUrl: URL | undefined = canPublishAbsoluteUrls
  ? new URL(site.url)
  : undefined;

/** Absolute URL for a route, or undefined when no public origin is known. */
export function absoluteUrl(path = "/"): string | undefined {
  if (!canPublishAbsoluteUrls) return undefined;
  const origin = site.url.replace(/\/+$/, "");
  const route = path === "/" ? "/" : path.startsWith("/") ? path : `/${path}`;
  return `${origin}${route}`;
}

/**
 * Absolute URL of the social share image, or undefined when no public
 * origin is known. Next.js resolves relative image paths against
 * `metadataBase` and falls back to http://localhost:3000 when it is
 * missing, so the share image is omitted entirely rather than published
 * as a localhost URL.
 */
export const shareImageUrl: string | undefined = absoluteUrl("/og.jpg");

interface PageMetadataOptions {
  /** Page title, without the site-name suffix (the root template adds it). */
  title: string;
  description: string;
  /** Route path, e.g. "/work". */
  path: string;
  /** Bypass the root title template — used by the homepage. */
  absoluteTitle?: boolean;
}

/**
 * Route metadata with consistent canonical, Open Graph and Twitter/X data,
 * all generated from the configured production origin. Descriptions are
 * written per route to describe that page's actual content.
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: PageMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  const shareImage = shareImageUrl;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: url ? { canonical: url } : undefined,
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: site.name,
      title: fullTitle,
      description,
      images: shareImage
        ? [
            {
              url: shareImage,
              width: 1200,
              height: 630,
              alt: `${site.name} — ${site.positioning}`,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: shareImage ? [shareImage] : undefined,
    },
  };
}

/**
 * JSON-LD for the site: a Person for Nnamdi and a ProfessionalService for
 * the work, with the two service pathways as the offer catalogue.
 *
 * Only established facts are represented — no ratings, reviews, client
 * counts, prices, awards, years in business, locations or organization
 * relationships are invented. Absolute `@id`/`url` values are included
 * only when a public origin is configured.
 */
export function structuredData(): Record<string, unknown> {
  const origin = absoluteUrl("/");
  const identityProfiles = site.social
    .filter((profile) => profile.label !== "WhatsApp")
    .map((profile) => profile.href);

  const person: Record<string, unknown> = {
    "@type": "Person",
    "@id": origin ? `${origin}#person` : undefined,
    name: site.name,
    jobTitle: site.positioning,
    description: site.about.summary,
    url: origin ? `${origin}/about` : undefined,
    sameAs: identityProfiles,
    knowsAbout: [
      "Web development",
      "Frontend development",
      "Responsive websites",
      "Website improvement",
      "Digital assistance",
      "Technical support",
      "Computer and device support",
      "Learning systems",
      "Documentation",
    ],
  };

  const service: Record<string, unknown> = {
    "@type": "ProfessionalService",
    "@id": origin ? `${origin}#service` : undefined,
    name: `${site.shortName} — ${site.positioning}`,
    description: site.description,
    url: origin,
    sameAs: identityProfiles,
    founder: origin
      ? { "@id": `${origin}#person` }
      : { "@type": "Person", name: site.name },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Service pathways",
      itemListElement: servicePathways.map((pathway) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: pathway.title,
          serviceType: pathway.title,
          description: pathway.summary,
        },
      })),
    },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [person, service],
  };
}
