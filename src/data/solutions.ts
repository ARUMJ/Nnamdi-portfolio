import type { ServicePathway, Solution } from "@/lib/types";

/**
 * Solution areas.
 *
 * Copy is direct and human, focused on the business need each solution answers.
 * No invented clients, results or marketing language.
 */
const businessWebsites: Solution = {
  id: "sol-01",
  slug: "business-websites",
  icon: "website",
  title: "Business Websites",
  shortDescription:
    "Need a credible online presence. I build professional responsive websites that clearly present your business and services.",
  description:
    "A business website should say the right things to the right people and guide them to an action. I start with the business need, what the company offers, who it serves and what a visitor should do next, then design and build a website that presents it clearly.",
  fits: [
    "Company websites",
    "Service business websites",
    "Company profiles and online presence",
  ],
};

const webProducts: Solution = {
  id: "sol-02",
  slug: "web-products",
  icon: "product",
  title: "Web Products and Digital Experiences",
  shortDescription:
    "Have an idea that needs more than a website. I build interactive web experiences and practical products around real user needs.",
  description:
    "Some needs are better served by a product than a page. It could be a service flow, a catalogue or a tool for a specific job. I help shape the idea, plan the scope and build a web product that is practical to use and straightforward to maintain.",
  fits: [
    "Web applications",
    "Catalogue and service experiences",
    "Tools for specific jobs",
  ],
};

const websiteImprovement: Solution = {
  id: "sol-03",
  slug: "website-improvement",
  icon: "improve",
  title: "Website Improvement",
  shortDescription:
    "Is your website getting in the way? I fix issues, refine the structure, and improve usability and responsiveness.",
  description:
    "A website can exist and still miss the mark with unclear messaging, confusing navigation, slow loading or technical gaps. I review what is already there, identify what is holding it back and improve the site so it works better for its audience and its owner.",
  fits: [
    "Clarity and usability",
    "Performance and responsiveness",
    "Technical fixes and upkeep",
  ],
};

const digitalSupport: Solution = {
  id: "sol-04",
  slug: "digital-support",
  icon: "support",
  title: "Digital and Technical Support",
  shortDescription:
    "Need help with everyday technology. I provide setup, troubleshooting, maintenance and digital assistance for your team.",
  description:
    "Businesses often need technical help that does not justify a full team. That includes setup, troubleshooting, configuration and day to day digital support. I provide practical dependable assistance so the technology keeps working and the business keeps moving.",
  fits: [
    "Digital assistance",
    "Technical troubleshooting",
    "Ongoing support",
  ],
};

const educationTech: Solution = {
  id: "sol-05",
  slug: "education-tech",
  icon: "education",
  title: "Education and Organizational Technology",
  shortDescription:
    "Need technology that fits your school or organization. I help with websites, learning systems, digital tools and technical support.",
  description:
    "Educational and organizational technology should serve the people who use it. I help schools and organizations define what they need, from a web presence to a working system, and build or adapt practical technology that fits how they actually work.",
  fits: [
    "School and institutional websites",
    "Learning and information portals",
    "Practical internal tools",
  ],
};

/**
 * The two primary service pathways — Build 08.
 *
 * The existing five solution areas are grouped beneath the pathway they
 * belong to, so a visitor can choose the route that describes their need
 * first, then read the specific area. Both the homepage and /solutions
 * read from this one structure.
 */
export const servicePathways: ServicePathway[] = [
  {
    id: "web-development",
    number: "01",
    icon: "website",
    tone: "default",
    title: "Web & Digital Development",
    summary:
      "Websites, web interfaces and improvements — designed, built and deployed with React, Next.js, TypeScript and Tailwind CSS.",
    detail:
      "I build and improve the web side of a business or organization: a credible site that presents what you offer, an interface that carries a product idea, or fixes and additions to something that already exists. I work in the stack this portfolio is built with — React, Next.js, TypeScript and Tailwind CSS — and take the work through to deployment, including the metadata and structured data that help a site be found and understood.",
    capabilities: [
      "Responsive websites",
      "Business websites",
      "Frontend development",
      "Web interfaces",
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "API integration",
      "Deployment",
      "Website improvements",
      "SEO metadata",
      "Structured data",
      "Responsive UI implementation",
    ],
    areas: [businessWebsites, webProducts, websiteImprovement],
  },
  {
    id: "digital-assistance",
    number: "02",
    icon: "support",
    tone: "inverse",
    title: "Digital Assistance & Technical Support",
    summary:
      "Digital administration, technical support and the everyday help that keeps people and their tools working.",
    detail:
      "Not every need is a build. Often the work is keeping a website's content current, supporting the computers and devices a team depends on, organising digital files and documents, preparing presentations and graphics, or helping staff and students use the technology in front of them. This pathway is that practical, dependable support — the same care as a build, applied to the day-to-day.",
    capabilities: [
      "Digital administration",
      "Technical support",
      "Computer and device support",
      "Website content updates",
      "School and office technology support",
      "Digital organization",
      "Documentation",
      "Presentation and visual support",
      "Canva graphics",
      "Day-to-day digital assistance",
    ],
    areas: [digitalSupport, educationTech],
  },
];

/**
 * Flat list of the five solution areas, in editorial order. Kept as the
 * single import for the homepage index and the /solutions rows.
 */
export const solutions: Solution[] = servicePathways.flatMap(
  (pathway) => pathway.areas,
);
