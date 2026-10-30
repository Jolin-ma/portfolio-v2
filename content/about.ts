/*
  about.ts
  Words for the About page (app/about/page.tsx).

  TODO(Jolin): the story chapters only use facts already on the site. Add your own background, how you got into web design,
  and anything a hiring manager usually asks you.
*/

import type { ColorToken } from "./site";

export const aboutHero = {
  title: "Who is Jolin Ma?",
  subline: "A web designer, front-end developer and digital marketer in Oshawa, ON.",
  intro:
    "I design in Figma and build it myself, so nothing gets lost on the way to the browser. Then I help it sell, with short-form video ads and signup funnels.",
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
      src: "/images/about/story-1-desk.webp",
      width: 1760,
      height: 1314,
      alt: "Illustration of Jolin Ma at a desk, designing a page layout on a monitor, with wireframe sketches pinned to the wall and autumn trees outside the window",
    },
    color: "pool",
  },
  {
    text: "Then I build it, and help it sell. So far that has meant a digital diary where words fall into a pile, short-form video ads for marketing agencies, love story films, and a lip balm store with real products, shades and checkout, built five different ways.",
    image: {
      src: "/images/about/story-2-projects.webp",
      width: 1760,
      height: 1314,
      alt: "Illustration of Jolin Ma holding a giant pencil beside a shop page of lip balm shades, with an open diary spilling letters, a phone playing a video and a film strip with a heart",
    },
    color: "blush",
  },
  {
    text: "Now I'm open to roles in web design, e-commerce and digital marketing: anywhere thoughtful design, clean code and a well-run store come together to make websites people actually enjoy using.",
    image: {
      src: "/images/about/story-3-doorway.webp",
      width: 1760,
      height: 1314,
      alt: "Illustration of Jolin Ma waving while stepping out of an open door shaped like a browser window, with color swatches, code brackets, a shopping bag and a cart around the doorway",
    },
    color: "pistachio",
  },
];

/*
  "Behind the counter": the retail job, short. Facts come from Jolin's
  Shopify developer resume and cover letter (Royal Distributing, Whitby,
  Oct 2019 to now). No numbers on purpose.
  TODO(Jolin): the third point is your view in my words. Make sure it
  sounds like something you'd say in an interview, and add a real example.
*/
export const counter = {
  title: "Behind the counter.",
  intro:
    "For seven years I've worked as an e-commerce and customer service clerk at Royal Distributing in Whitby. It's where I learned how an online store works from the other side.",
  points: [
    {
      title: "Online orders",
      text: "For the last two years I've worked in the store's Shopify admin every day: fulfilling orders, keeping customer records tidy and merging duplicate customer profiles. I also worked through the move from the old system to Shopify, so I saw where it got easier and where it got harder for staff and customers.",
    },
    {
      title: "Buy online, pick up in store",
      text: "BOPIS orders are part of my day: getting the order ready in Shopify, then handing it to the customer at the counter. It's the moment the website and the store have to agree.",
    },
    {
      title: "What the counter taught me",
      text: "Customers bring the website to the counter with them. When a product page leaves a question open, I'm the one who hears it. So I design product pages to answer the questions first: what it is, which option you're getting, what it costs.",
    },
  ],
};

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
