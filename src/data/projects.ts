import type { Project } from "@/lib/types";

/**
 * Portfolio projects.
 *
 * Only *known* fields are populated. Media (images/videos), most descriptions,
 * case-study URLs and live URLs are intentionally left empty — the media
 * system renders branded placeholders until real assets are supplied.
 *
 * Adding a project = adding an object here. The showcase, work page and
 * (future) case-study routes all read from this array.
 */
export const projects: Project[] = [
  {
    id: "proj-01",
    slug: "stayora",
    title: "Stayora",
    featured: true,
  },
  {
    id: "proj-02",
    slug: "d-connect-delivery-services",
    title: "D-Connect Delivery Services",
    category: "Delivery Services",
  },
  {
    id: "proj-03",
    slug: "purenest-cleaning-co",
    title: "PureNest Cleaning Co.",
    category: "Cleaning Services",
    shortDescription: "Fictional concept project — not client work.",
  },
  {
    id: "proj-04",
    slug: "prince-m-furnishing-concept",
    title: "Prince M Furnishing Concept",
    category: "Furnishing",
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
