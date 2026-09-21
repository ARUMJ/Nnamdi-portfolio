import type { Project } from "@/lib/types";
import { projectFilms, projectStills } from "./project-media";

/** Verified project content only; unfinished projects retain Build 03 placeholders. */
export const projects: Project[] = [
  {
    id: "proj-04",
    slug: "prince-m-furnishing-concept",
    title: "Prince M Furnishing Concept",
    category: "Furnishing",
    featured: true,
    shortDescription: "A black-and-gold website for plywood, furniture and interior design. Website imagery uses illustrative renders.",
    heroMedia: projectFilms.princeM,
    featuredMedia: projectFilms.princeM,
    gallery: projectStills(
      "prince-m-furnishing-concept",
      "Prince M desktop homepage with black-and-gold typography and an illustrative living-room render.",
      "Prince M homepage at a 390px mobile viewport, with stacked headings and service links.",
    ),
    githubUrl: "https://github.com/ARUMJ/prince-m-furnishing-concept",
  },
  {
    id: "proj-02",
    slug: "d-connect-delivery-services",
    title: "D-Connect Delivery Services",
    category: "Delivery Services",
    shortDescription: "Foodstuff discovery, category browsing and product enquiries via WhatsApp. Prototype catalogue.",
    heroMedia: projectFilms.dConnect,
    featuredMedia: projectFilms.dConnect,
    gallery: projectStills(
      "d-connect-delivery-services",
      "D-Connect desktop homepage with foodstuff imagery and Browse Products and WhatsApp links.",
      "D-Connect mobile Rice and Grains and Garri and Cassava category cards.",
    ),
    githubUrl: "https://github.com/ARUMJ/d-connect-delivery-services",
  },
  {
    id: "proj-03",
    slug: "purenest-cleaning-co",
    title: "PureNest Cleaning Co.",
    category: "Cleaning Services",
    shortDescription: "Fictional concept project — not client work.",
    heroMedia: projectFilms.pureNest,
    featuredMedia: projectFilms.pureNest,
    gallery: projectStills(
      "purenest-cleaning-co",
      "PureNest fictional cleaning-company concept homepage with service navigation and a living-room image.",
      "PureNest fictional concept mobile FAQ with the recurring-cleaning answer expanded.",
    ),
    githubUrl: "https://github.com/ARUMJ/purenest-cleaning-website",
  },
  {
    id: "proj-01",
    slug: "stayora",
    title: "Stayora",
  },
  {
    id: "proj-05",
    slug: "pnk-clarean-peekan",
    title: "PNK / Clarean Peekan",
  },
];

export function getProjects(): Project[] {
  return [...projects];
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
