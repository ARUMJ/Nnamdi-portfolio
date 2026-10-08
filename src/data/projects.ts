import type { Project } from "@/lib/types";
import { projectFilms, projectStills } from "./project-media";

/**
 * Five actual interface films, with factual prototype and development
 * disclosures.
 *
 * Build 08 adds the four-part proof block (purpose, contribution,
 * delivered, honest scope) and a delivery status to every project, so a
 * concept is never read as client work and a prototype is never read as a
 * production system. The live URLs are the approved deployments — do not
 * substitute them.
 */
export const projects: Project[] = [
  {
    id: "proj-04",
    slug: "prince-m-furnishing-concept",
    title: "Prince M Furnishing Concept",
    category: "Furnishing",
    featured: true,
    status: "Concept",
    shortDescription:
      "A black and gold website for plywood, furniture and interior design. Website imagery uses illustrative renders.",
    proof: {
      purpose:
        "Present a furnishing business — plywood, furniture and interior design services — in a distinctive black and gold identity that makes each service easy to follow.",
      contributionSummary:
        "Designed and built the concept site: homepage, service panels and the interior design section.",
      contribution: [
        "Designed the visual direction: black and gold palette, typographic hierarchy and section rhythm.",
        "Built the responsive homepage, the three service panels and the interior design section.",
        "Implemented the mobile layouts, including the stacked headings and service links.",
      ],
      delivered: [
        "A complete concept website for a furnishing business, desktop and mobile.",
        "A three-part service structure covering plywood, furniture and interior design.",
      ],
      notIncluded: [
        "Concept presentation: the interior imagery is illustrative render, not completed client projects.",
      ],
    },
    heroMedia: projectFilms.princeM,
    featuredMedia: projectFilms.princeM,
    gallery: projectStills(
      "prince-m-furnishing-concept",
      "Prince M desktop homepage with black and gold typography and an illustrative living room render.",
      "Prince M homepage at a 390px mobile viewport, with stacked headings and service links.",
    ),
    liveUrl: "https://prince-m-furnishing-concept-weld.vercel.app",
    githubUrl: "https://github.com/ARUMJ/prince-m-furnishing-concept",
  },
  {
    id: "proj-02",
    slug: "d-connect-delivery-services",
    title: "D Connect Delivery Services",
    category: "Delivery Services",
    status: "Prototype",
    shortDescription:
      "Foodstuff discovery, category browsing and product enquiries via WhatsApp. Prototype catalogue.",
    proof: {
      purpose:
        "Give a foodstuff delivery business a way to present its catalogue online — categories, product detail and a direct enquiry route — without building a full commerce system first.",
      contributionSummary:
        "Planned the catalogue structure and built the responsive product discovery and enquiry interface.",
      contribution: [
        "Planned the information architecture: categories, product groupings and enquiry routes.",
        "Designed and built the responsive catalogue interface — homepage, category browsing and product detail views.",
        "Connected product enquiries to WhatsApp as the conversion point instead of building checkout.",
      ],
      delivered: [
        "A working catalogue prototype with foodstuff categories, product detail views and WhatsApp enquiry links.",
        "Mobile-first layouts for category browsing and product pages.",
      ],
      notIncluded: [
        "No payment processing, production checkout or order management.",
        "No real-time delivery tracking or logistics infrastructure.",
        "Product information is prototype catalogue content.",
      ],
    },
    caseStudy: {
      summary:
        "D Connect is the clearest example of translating a business idea into a usable product experience. The brief was a delivery business that needed to show what it sells; the result is a catalogue prototype where a customer can move from a category to a specific product and start an enquiry — deliberately scoped as a prototype rather than a production store.",
      demonstrates: [
        {
          title: "Product discovery",
          description:
            "Category-first browsing that lets a visitor start broad — rice and grains, garri and cassava — and move toward a specific product.",
        },
        {
          title: "Catalogue browsing",
          description:
            "Product listings and detail views that present what is available, with the enquiry action never more than a step away.",
        },
        {
          title: "Delivery-service information architecture",
          description:
            "Categories, product groupings and enquiry routes structured around how the business actually sells.",
        },
        {
          title: "Responsive presentation",
          description:
            "The same catalogue on desktop and mobile — the mobile layouts are built for the catalogue, not cut down from it.",
        },
        {
          title: "Mobile-friendly interface",
          description:
            "Readable product cards and reachable enquiry actions on a 390px viewport.",
        },
        {
          title: "Business-oriented product thinking",
          description:
            "Choosing an enquiry-based flow over an unbuilt checkout kept the scope realistic and the value immediate.",
        },
      ],
    },
    heroMedia: projectFilms.dConnect,
    featuredMedia: projectFilms.dConnect,
    gallery: projectStills(
      "d-connect-delivery-services",
      "D Connect desktop homepage with foodstuff imagery and Browse Products and WhatsApp links.",
      "D Connect mobile Rice and Grains and Garri and Cassava category cards.",
    ),
    liveUrl: "https://d-connect-delivery-services.vercel.app",
    githubUrl: "https://github.com/ARUMJ/d-connect-delivery-services",
  },
  {
    id: "proj-03",
    slug: "purenest-cleaning-co",
    title: "PureNest Cleaning Co.",
    category: "Cleaning Services",
    status: "Concept",
    shortDescription: "Fictional concept project, not client work.",
    proof: {
      purpose:
        "Explore how a residential cleaning company could present its services and answer the questions customers ask before they get in touch.",
      contributionSummary:
        "Designed and built the concept: homepage, service pages and an FAQ.",
      contribution: [
        "Designed and built the fictional concept site — homepage and cleaning service pages.",
        "Structured the service navigation and wrote the FAQ, including the recurring-cleaning answer.",
        "Implemented the expanding FAQ interaction on mobile.",
      ],
      delivered: [
        "A complete multi-section concept site with service navigation and an FAQ.",
        "Responsive desktop and mobile layouts, including the mobile FAQ interaction.",
      ],
      notIncluded: [
        "Fictional concept, not client work — there is no real cleaning company behind it.",
      ],
    },
    heroMedia: projectFilms.pureNest,
    featuredMedia: projectFilms.pureNest,
    gallery: projectStills(
      "purenest-cleaning-co",
      "PureNest fictional cleaning company concept homepage with service navigation and a living room image.",
      "PureNest fictional concept mobile FAQ with the recurring cleaning answer expanded.",
    ),
    liveUrl: "https://purenest-cleaning-website-sooty.vercel.app",
    githubUrl: "https://github.com/ARUMJ/purenest-cleaning-website",
  },
  {
    id: "proj-01",
    slug: "stayora",
    title: "Stayora",
    category: "Accommodation and Frontend prototype",
    status: "Deployed Demo",
    shortDescription:
      "A responsive accommodation discovery demo with mock listings, prices and ratings. Not a live booking platform.",
    proof: {
      purpose:
        "Explore how a travel accommodation discovery experience could work: browsing by destination, comparing listings and opening a property in detail.",
      contributionSummary:
        "Designed and built the responsive frontend: discovery flow, listing cards and property detail views.",
      contribution: [
        "Designed and built the frontend from scratch: layout, type scale and component structure.",
        "Implemented the discovery flow — destination browsing, listing cards with sample prices and ratings, and property detail views.",
        "Built the mobile layouts and breakpoints across the homepage and detail screens.",
      ],
      delivered: [
        "A working frontend demo with mock listings, sample prices, ratings and host details.",
        "Responsive desktop and mobile views of the homepage and property pages.",
      ],
      notIncluded: [
        "No booking, payment, accounts or live inventory — the listings are mock data, not a booking platform.",
      ],
    },
    heroMedia: projectFilms.stayora,
    featuredMedia: projectFilms.stayora,
    gallery: projectStills(
      "stayora",
      "Stayora frontend demo homepage: featured mock property cards with sample prices and ratings.",
      "Stayora frontend demo at 390px: a mock Mountain view cabin detail page with sample host information.",
    ),
    liveUrl: "https://stayora-595x3b9r7-gospelboys.vercel.app",
    githubUrl: "https://github.com/ARUMJ/stayora/tree/arena/019fdeda-stayora",
  },
  {
    id: "proj-05",
    slug: "pnk-clarean-peekan",
    title: "PNK and Clarean Peekan",
    category: "Household products and Development preview",
    status: "Deployed Demo",
    shortDescription:
      "An implemented product category website using supplied brand and product assets. Development preview, not a production store.",
    proof: {
      purpose:
        "Present a household-products brand's catalogue online using the supplied brand and product assets.",
      contributionSummary:
        "Implemented the product category structure and built the responsive category pages.",
      contribution: [
        "Implemented the product category structure from the supplied catalogue.",
        "Built the responsive homepage and category pages with the supplied brand and product assets.",
        "Built the mobile category layout, including its enquiry link.",
      ],
      delivered: [
        "A working development preview: branded homepage, product categories and category pages.",
        "Responsive desktop and mobile views, including the mobile Vacuum Flasks category page.",
      ],
      notIncluded: [
        "Development preview, not a production store.",
        "Enquiries rather than checkout — there is no production store behind the preview.",
      ],
    },
    heroMedia: projectFilms.pnk,
    featuredMedia: projectFilms.pnk,
    gallery: projectStills(
      "pnk-clarean-peekan",
      "PNK and Clarean development preview homepage, with its supplied brand mark and household product photographs.",
      "PNK and Clarean mobile Vacuum Flasks category page, with a supplied food jar photograph and enquiry link.",
    ),
    liveUrl: "https://pnk-enterprises-website-6yfgbwop6-gospelboys.vercel.app",
    githubUrl: "https://github.com/ARUMJ/pnk-enterprises-website/tree/dev",
  },
];

export function getProjects(): Project[] {
  return [...projects];
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
