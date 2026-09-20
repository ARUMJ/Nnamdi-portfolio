import type { Solution } from "@/lib/types";

/**
 * Solution areas.
 *
 * Copy is deliberately positioned at the *business problem* level — what kind
 * of need each solution answers — without inventing client names, results,
 * statistics or guarantees.
 */
export const solutions: Solution[] = [
  {
    id: "sol-01",
    slug: "business-websites",
    icon: "website",
    title: "Business Websites",
    shortDescription:
      "For businesses that need a clear, professional web presence that represents the company and helps visitors take the next step.",
    description:
      "A business website should say the right things, to the right people, and guide them to an action. I start with the business need — what the company offers, who it serves, and what a visitor should do next — then design and build a website that presents it clearly.",
    fits: [
      "Company websites",
      "Service business websites",
      "Company profiles & online presence",
    ],
  },
  {
    id: "sol-02",
    slug: "web-products",
    icon: "product",
    title: "Web Products & Digital Experiences",
    shortDescription:
      "For ideas that need more than a website — web products and digital experiences people can actually use.",
    description:
      "Some needs are better served by a product than a page: a service flow, a booking or ordering experience, a tool for a specific job. I help shape the idea, plan the scope, and build a web product that is practical to use and straightforward to maintain.",
    fits: [
      "Web applications",
      "Service & booking experiences",
      "Tools for specific jobs",
    ],
  },
  {
    id: "sol-03",
    slug: "website-improvement",
    icon: "improve",
    title: "Website Improvement",
    shortDescription:
      "For websites that exist but underperform — clarity, usability and technical issues, addressed.",
    description:
      "A website can exist and still miss the mark: unclear messaging, confusing navigation, slow loading, or technical gaps. I review what is already there, identify what is holding it back, and improve the site so it works better for its audience and its owner.",
    fits: [
      "Clarity & usability",
      "Performance & responsiveness",
      "Technical fixes & upkeep",
    ],
  },
  {
    id: "sol-04",
    slug: "digital-support",
    icon: "support",
    title: "Digital & Technical Support",
    shortDescription:
      "For teams and organizations that need dependable digital and technical assistance without the overhead.",
    description:
      "Businesses often need technical help that doesn't justify a full team: setup, troubleshooting, configuration, and day-to-day digital support. I provide practical, dependable assistance so the technology keeps working and the business keeps moving.",
    fits: [
      "Digital assistance",
      "Technical troubleshooting",
      "Ongoing support",
    ],
  },
  {
    id: "sol-05",
    slug: "education-tech",
    icon: "education",
    title: "Education & Organizational Technology",
    shortDescription:
      "For schools and organizations that need practical technology for teaching, learning and administration.",
    description:
      "Educational and organizational technology should serve the people who use it. I help schools and organizations define what they need — from a web presence to a working system — and build or adapt practical technology that fits how they actually work.",
    fits: [
      "School & institutional websites",
      "Learning & information portals",
      "Practical internal tools",
    ],
  },
];
