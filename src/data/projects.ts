import type { Project } from "@/lib/types";
import { projectFilms, projectStills } from "./project-media";

/** Five actual interface films, with factual prototype and development disclosures. */
export const projects: Project[] = [
  {
    id: "proj-04",
    slug: "prince-m-furnishing-concept",
    title: "Prince M Furnishing Concept",
    category: "Furnishing",
    featured: true,
    shortDescription:
      "A black and gold website for plywood, furniture and interior design. Website imagery uses illustrative renders.",
    heroMedia: projectFilms.princeM,
    featuredMedia: projectFilms.princeM,
    gallery: projectStills(
      "prince-m-furnishing-concept",
      "Prince M desktop homepage with black and gold typography and an illustrative living room render.",
      "Prince M homepage at a 390px mobile viewport, with stacked headings and service links.",
    ),
    githubUrl: "https://github.com/ARUMJ/prince-m-furnishing-concept",
  },
  {
    id: "proj-02",
    slug: "d-connect-delivery-services",
    title: "D Connect Delivery Services",
    category: "Delivery Services",
    shortDescription:
      "Foodstuff discovery, category browsing and product enquiries via WhatsApp. Prototype catalogue.",
    heroMedia: projectFilms.dConnect,
    featuredMedia: projectFilms.dConnect,
    gallery: projectStills(
      "d-connect-delivery-services",
      "D Connect desktop homepage with foodstuff imagery and Browse Products and WhatsApp links.",
      "D Connect mobile Rice and Grains and Garri and Cassava category cards.",
    ),
    githubUrl: "https://github.com/ARUMJ/d-connect-delivery-services",
  },
  {
    id: "proj-03",
    slug: "purenest-cleaning-co",
    title: "PureNest Cleaning Co.",
    category: "Cleaning Services",
    shortDescription: "Fictional concept project, not client work.",
    heroMedia: projectFilms.pureNest,
    featuredMedia: projectFilms.pureNest,
    gallery: projectStills(
      "purenest-cleaning-co",
      "PureNest fictional cleaning company concept homepage with service navigation and a living room image.",
      "PureNest fictional concept mobile FAQ with the recurring cleaning answer expanded.",
    ),
    githubUrl: "https://github.com/ARUMJ/purenest-cleaning-website",
  },
  {
    id: "proj-01",
    slug: "stayora",
    title: "Stayora",
    category: "Accommodation and Frontend prototype",
    shortDescription:
      "A responsive accommodation discovery demo with mock listings, prices and ratings. Not a live booking platform.",
    heroMedia: projectFilms.stayora,
    featuredMedia: projectFilms.stayora,
    gallery: projectStills(
      "stayora",
      "Stayora frontend demo homepage: featured mock property cards with sample prices and ratings.",
      "Stayora frontend demo at 390px: a mock Mountain view cabin detail page with sample host information.",
    ),
    githubUrl: "https://github.com/ARUMJ/stayora/tree/arena/019fdeda-stayora",
  },
  {
    id: "proj-05",
    slug: "pnk-clarean-peekan",
    title: "PNK and Clarean Peekan",
    category: "Household products and Development preview",
    shortDescription:
      "An implemented product category website using supplied brand and product assets. Development preview, not a production store.",
    heroMedia: projectFilms.pnk,
    featuredMedia: projectFilms.pnk,
    gallery: projectStills(
      "pnk-clarean-peekan",
      "PNK and Clarean development preview homepage, with its supplied brand mark and household product photographs.",
      "PNK and Clarean mobile Vacuum Flasks category page, with a supplied food jar photograph and enquiry link.",
    ),
    githubUrl: "https://github.com/ARUMJ/pnk-enterprises-website/tree/dev",
  },
];

export function getProjects(): Project[] {
  return [...projects];
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
