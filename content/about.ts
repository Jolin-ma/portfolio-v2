/*
  about.ts
  Words for the About page (app/about/page.tsx).

  TODO(Jolin): the story chapters and FAQ answers only use facts already
  on the site. Add your own background, how you got into web design,
  and anything a hiring manager usually asks you.
*/

import type { ColorToken } from "./site";

export const aboutHero = {
  title: "Who is Jolin Ma?",
  subline: "A web designer and front-end developer in Oshawa, ON.",
  intro:
    "I design websites in Figma and then build them myself, so the design decisions survive all the way to the browser. I care about the small stuff: how a button feels, whether a menu works with a keyboard, and how fast the first screen shows up.",
};

/** "My story so far": short chapters, each with one wide image */
export const story: {
  text: string;
  image: { src: string; width: number; height: number; alt: string } | null;
  /** Used when there's no photo: a placeholder illustration on this color */
  color: ColorToken;
}[] = [
  {
    text: "I work from a small home office in Oshawa, Ontario. Most days start in Figma, sketching layouts and testing ideas with real content until the page feels right.",
    image: {
      src: "/images/home-office.webp",
      width: 1014,
      height: 764,
      alt: "Jolin's home office: a white desk with a laptop and a monitor showing code, plants on the shelves",
    },
    color: "pool",
  },
  {
    text: "Then I build it. So far that has meant a digital diary where words fall into a pile, video ad sites for agencies and love story films, and a lip balm store built five different ways.",
    image: null,
    color: "blush",
  },
  {
    text: "Now I'm open to web design opportunities: projects or roles where thoughtful design and clean code come together to make websites people actually enjoy using.",
    image: null,
    color: "pistachio",
  },
];

/*
  Tools list, shown as one big centered run of names.
  Names with a `slug` are highlighted and link to a case study that used them.
*/
export const tools: { name: string; slug?: string }[] = [
  { name: "Figma", slug: "dewstick" },
  { name: "HTML" },
  { name: "CSS" },
  { name: "JavaScript" },
  { name: "TypeScript", slug: "this-portfolio" },
  { name: "React", slug: "this-portfolio" },
  { name: "Next.js", slug: "this-portfolio" },
  { name: "CSS Modules", slug: "this-portfolio" },
  { name: "Shopify", slug: "dewstick" },
  { name: "WordPress", slug: "dewstick" },
  { name: "Elementor", slug: "dewstick" },
  { name: "Kadence", slug: "dewstick" },
  { name: "Vercel", slug: "dewstick" },
  { name: "Responsive design" },
  { name: "Accessibility", slug: "this-portfolio" },
  { name: "UI / UX" },
];

export const faq: { question: string; answer: string[] }[] = [
  {
    question: "What kind of work are you looking for?",
    answer: [
      "Web design opportunities. I'm happiest when a project needs both the design and the build, but I'm glad to do either one.",
    ],
  },
  {
    question: "Do you design and build, or just one?",
    answer: [
      "Both. I design in Figma, then build the site myself. Nothing gets lost in a handoff, because the handoff is to me.",
    ],
  },
  {
    question: "Which platforms can you build on?",
    answer: [
      "Hand-built sites in Next.js and React, and stores or sites on Shopify and WordPress (with Elementor or Kadence). Dewstick was built on all of them from one Figma design, if you'd like to compare.",
    ],
  },
  {
    question: "Do you think about accessibility?",
    answer: [
      "Yes, from the start. On this site, the menu works with a keyboard and traps focus, every image has alt text, color pairs are checked for contrast, and all the motion switches off if your device asks for reduced motion.",
    ],
  },
  {
    question: "Where are you based?",
    answer: ["Oshawa, Ontario, Canada."],
  },
  {
    question: "One last thing, why all the little illustrations?",
    answer: ["Because a portfolio should look like a person made it."],
  },
];
