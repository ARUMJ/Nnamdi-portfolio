import type { MetadataRoute } from "next";

import { site } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    // Point crawlers at the sitemap only when a real origin is configured;
    // otherwise site.url is the local development fallback.
    ...(site.urlIsConfigured ? { sitemap: `${site.url}/sitemap.xml` } : {}),
  };
}
