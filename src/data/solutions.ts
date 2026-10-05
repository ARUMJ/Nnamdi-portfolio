import type { Solution } from "@/lib/types";

/**
 * Solution areas.
 *
 * Copy is direct and human, focused on the business need each solution answers.
 * No invented clients, results or marketing language.
 */
export const solutions: Solution[] = [
  {
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
  },
  {
    id: "sol-02",
    slug: "web-products",
    icon: "product",
    title: "Web Products and Digital Experiences",
    shortDescription:
      "Have an idea that needs more than a website. I build interactive web experiences and practical products around real user needs.",
    description:
      "Some needs are better served by a product than a page. It could be a service flow, a booking or ordering experience or a tool for a specific job. I help shape the idea, plan the scope and build a web product that is practical to use and straightforward to maintain.",
    fits: [
      "Web applications",
      "Service and booking experiences",
      "Tools for specific jobs",
    ],
  },
  {
    id: "sol-03",
    slug: "website-improvement",
    icon: "improve",
    title: "Website Improvement",
    shortDescription:
      "Is your website getting in the way. I fix issues, refine the structure and improve usability and responsiveness.",
    description:
      "A website can exist and still miss the mark with unclear messaging, confusing navigation, slow loading or technical gaps. I review what is already there, identify what is holding it back and improve the site so it works better for its audience and its owner.",
    fits: [
      "Clarity and usability",
      "Performance and responsiveness",
      "Technical fixes and upkeep",
    ],
  },
  {
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
  },
  {
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
  },
];
