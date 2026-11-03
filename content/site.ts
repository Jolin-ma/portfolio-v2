/*
  site.ts
  Site-wide content: name, bio, skills, links and marquee text.
  Edit words here, never inside components.
*/

import type { CurtainTarget } from "@/components/layout/PageCurtain";

/** Names of the palette tokens in globals.css. Used to color sections and cards. */
export type ColorToken =
  | "plum"
  | "cream"
  | "tomato"
  | "marigold"
  | "pistachio"
  | "cobalt"
  | "indigo"
  | "teal"
  | "sapphire"
  | "paper"
  | "pool"
  | "blush";

/** Turns a token name into a CSS value, e.g. "pool" -> "var(--pool)". */
export const cssColor = (token: ColorToken) => `var(--${token})`;

/** What the page curtain shows on the way to the About page */
export const aboutCurtain = {
  title: "About",
  color: "pistachio",
  ink: "plum",
  illustration: "gardener",
  art: { src: "/images/curtain/curtain-about.webp" },
} satisfies CurtainTarget;

/** What the page curtain shows on the way home (the default for any link) */
export const homeCurtain = {
  title: "Home",
  color: "cream",
  ink: "plum",
  illustration: "gardener",
  // the art's cream is a little warmer than --cream
  art: { src: "/images/curtain/curtain-home.webp", bg: "#f2e8d1" },
} satisfies CurtainTarget;

/** Full-screen picture behind the menu before any project is hovered.
    `bg` matches the picture's flat background so the overlay doesn't flash. */
export const menuArt = {
  src: "/images/curtain/curtain-home.webp",
  bg: "#f2e8d1",
};

export const site = {
  name: "Jolin Ma",
  heroName: "JOLIN",
  role: "Web designer",
  focus: "UI Design, Front-End Development and Digital Marketing",
  location: "Oshawa, ON",
  status: "Open to web design opportunities",
  tagline: "I design and build websites and online stores",
  about:
    "I'm a web designer in Oshawa. I design websites in Figma, then build them myself so they work on a phone as well as a desktop.",
  aboutMore: [
    "I start in Figma, sketching layouts and testing ideas until the page feels right. Then I build it myself, so the design decisions survive all the way to the browser.",
    "I care about the small stuff: how a button feels, whether a menu works with a keyboard, and how fast the first screen shows up.",
  ],
  skills: ["Web Design", "UI / UX", "Responsive", "Front-End"],
  contactLine:
    "Got a site to design or a store to set up? Send me a note and tell me what you're making.",
  github: "https://github.com/Jolin-ma",
  marquee: [
    "Design in Figma",
    "Build in code",
    "Ship and test",
    "Open to web design opportunities",
  ],
};

/** Hero headline (two lines) and the accent line under it */
export const hero = {
  title: "I design and build websites and online stores.",
  subline: "Web designer in Oshawa, ON.",
};

/*
  Homepage bands, top to bottom. Each one is a FeatureBand
  (components/ui/FeatureBand.tsx): a title, a short text and one
  punchy link.
*/
export const bands = {
  openToWork: {
    title: "Open to new work!",
    text: "I'm open to roles in web design, e-commerce and digital marketing. If you have a project or a role in mind, I'd love to hear about it.",
    link: { label: "Say hello.", href: "/#contact" },
  },
  howIWork: {
    title: "How I work.",
    text: "Design in Figma, build in code, then ship and test on real screens. One person from the first sketch to the live site, so nothing gets lost in the handoff.",
    link: { label: "Start a project.", href: "/#contact" },
  },
  contact: {
    title: "Contact.",
    text: "Got a site to design or a store to set up? Send me a note and tell me what you're making.",
  },
  about: {
    title: "So who is Jolin?",
    text: "A web designer in Oshawa who designs in Figma, builds the site too and has spent seven years behind a retail counter.",
    link: { label: "Tell me more.", href: "/about/", curtain: aboutCurtain },
  },
  skills: {
    title: "Skills.",
    text: "Web Design, UI / UX, Responsive layouts and Front-End development, all in one pair of hands.",
    link: { label: "See the code.", href: "https://github.com/Jolin-ma" },
  },
  playground: {
    title: "Playground.",
    text: "Illustration and motion experiments, kept apart from my main projects.",
  },
};

/*
  "What I do" band on the homepage: two lanes side by side.
  Build is the web side, Work the store is the shop side (from the
  Royal Distributing counter and the Dewstick store).
*/
export const whatIDo = {
  title: "What I do.",
  lanes: [
    {
      title: "Build",
      text: "I design the site in Figma, then build it myself, by hand or on a platform.",
      items: ["Figma", "React / Next.js", "WordPress"],
      link: { label: "See the work.", href: "/#work" },
    },
    {
      title: "Work the store",
      text: "Seven years behind a retail counter, the last two handling online orders in the Shopify admin.",
      items: ["Shopify admin", "Pickup orders", "Customer records", "Order flow"],
      link: {
        label: "Behind the counter.",
        href: "/about/#counter",
        curtain: aboutCurtain,
      },
    },
  ],
};

/** "Elsewhere" cards near the bottom of the homepage */
export const elsewhere: {
  title: string;
  href: string;
  /** 3:4 art in public/images/bands/ */
  image: string;
  /** The art's own background color, so the card and picture blend */
  bg: string;
  ink: ColorToken;
}[] = [
  {
    title: "Code on GitHub",
    href: "https://github.com/Jolin-ma",
    image: "/images/bands/elsewhere-github.webp",
    bg: "#092450",
    ink: "cream",
  },
  {
    title: "Dewstick in Figma",
    href: "https://www.figma.com/design/mfxVRomQVdHUxF2tK3JzB4/dewstick-%E2%80%94-homepage?node-id=0-1",
    image: "/images/bands/elsewhere-dewstick-figma.webp",
    bg: "#dcd4f8",
    ink: "plum",
  },
  {
    title: "Dewstick source code",
    href: "https://github.com/Jolin-ma/dewstick",
    image: "/images/bands/elsewhere-dewstick-code.webp",
    bg: "#1acfd2",
    ink: "plum",
  },
  {
    title: "Portfolio, version one",
    href: "https://jolin-ma.github.io/Portfolio/",
    image: "/images/bands/elsewhere-portfolio-v1.webp",
    bg: "#f3bc2c",
    ink: "plum",
  },
];

/** Main page links, shown on the left of the menu overlay. */
export const navLinks: {
  label: string;
  href: string;
  curtain?: CurtainTarget;
}[] = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/#work" },
  { label: "About", href: "/about/", curtain: aboutCurtain },
  { label: "Contact", href: "/#contact" },
];

/**
 * Hero color pairs. One is picked at random on each visit (see app/layout.tsx).
 * Right now there's only one, so the hero is always indigo.
 * bg = background, accent = the big name, ink = all other text,
 * subject = main fill of the hero illustration.
 * Every accent/bg pair passes WCAG AA for large text, every ink/bg pair
 * passes AA for body text.
 */
export const heroPairs: {
  bg: ColorToken;
  accent: ColorToken;
  ink: ColorToken;
  subject: ColorToken;
}[] = [{ bg: "indigo", accent: "teal", ink: "cream", subject: "cream" }];

/** Steps in the "How I work" band. */
export const process = [
  {
    title: "Design in Figma",
    text: "Layouts, type and colour worked out first, with real content, at desktop and phone sizes.",
  },
  {
    title: "Build in code",
    text: "Hand-built components with clean, readable code that matches the design closely.",
  },
  {
    title: "Ship and test",
    text: "Checked with a keyboard, a screen reader, slow networks and real phones before launch.",
  },
];
