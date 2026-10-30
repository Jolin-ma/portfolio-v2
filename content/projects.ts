/*
  projects.ts
  Every project on the site, typed. The homepage cards, the menu overlay
  and the case study pages all read from this one list.

  Lines marked TODO(Jolin) are drafts written from the project summaries.
  Swap them for the real story before launch.
*/

import type { ColorToken } from "./site";
import type { IllustrationVariant } from "@/components/ui/Illustration";

export type ProjectImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type ProjectLink = {
  label: string;
  href: string;
  note?: string;
};

export type Project = {
  slug: string;
  number: string;
  title: string;
  /** ISO date, formatted for display in the components */
  date: string;
  /** Section color, and the text color that reads well on it */
  color: ColorToken;
  ink: ColorToken;
  illustration: IllustrationVariant;
  summary: string;
  /** A few more sentences, shown under the summary on the homepage band */
  details: string;
  /** Short, playful link label used on the homepage feature bands */
  teaser: string;
  tags: string[];
  /** Real screenshot. Null for projects that have none yet. */
  image: ProjectImage | null;
  /** 2:3 portrait image (533 x 800) shown on the front of the gallery card */
  cardImage?: string;
  /** 3:4 illustration (660 x 876), the second image on the gallery card */
  cardArt?: string;
  /** Artwork for the homepage feature band (public/images/bands/).
      Wide images fill the whole band; 4:5 ones sit in a tile's art box. */
  bandArt?: { src: string; width: number; height: number };
  /** Wide picture (3168 x 1344) shown as the "Next project" band on the page before this one.
      The band keeps its text and falls back to the illustration when this is missing. */
  bannerArt?: string;
  /** Full-screen 16:9 picture on the page curtain (public/images/curtain/).
      `bg` only when the picture's flat background isn't exactly `color`. */
  curtainArt?: { src: string; bg?: string };
  /** Full-screen 16:9 picture behind the menu while this project is hovered (public/images/menu/) */
  menuArt?: string;
  /** Shown as one of the 4 cards in "Selected work" */
  featured: boolean;
  idea: string;
  /** Optional "From the store side" chapter: how the shop itself is set up */
  store?: {
    intro: string;
    points: { title: string; text: string }[];
  };
  designed: string[];
  built: {
    intro: string;
    stack: string[];
    /** Steps of the "how the pieces connect" diagram, in order */
    diagram: string[];
  };
  /** One real problem, told in four steps. Null renders a placeholder.
      Wrap code in backticks (`addToCart()`) to show it as code. */
  challenge: {
    title: string;
    broke: string;
    tried: string;
    fixed: string;
    learned: string;
  } | null;
  links: ProjectLink[];
};

export const projects: Project[] = [
  {
    slug: "message-in-a-bottle",
    number: "01",
    title: "Message in a bottle",
    date: "2026-03-19",
    color: "pool",
    ink: "plum",
    illustration: "bottle",
    summary:
      "A digital diary where typed thoughts break apart into letters that fall and pile up into a growing bed beneath you.",
    details:
      "The interface stays almost empty so the words are the only thing on screen. Share a private link and a friend can reply, adding to the same pile, reply by reply.",
    teaser: "Drop a line.",
    tags: ["Digital Diary", "Therapeutic Space"],
    image: {
      src: "/images/msg.webp",
      width: 1436,
      height: 876,
      alt: "Message in a bottle sign-in screen, with glass bottles holding rolled letters along the bottom",
    },
    cardImage: "/images/cards/msg-in-a-bottle.webp",
    cardArt: "/images/cards/msg-in-a-bottle-art.webp",
    bandArt: {
      src: "/images/bands/msg-in-a-bottle-half.webp",
      width: 720,
      height: 900,
    },
    bannerArt: "/images/msg-banner.webp",
    curtainArt: {
      src: "/images/curtain/curtain-message-in-a-bottle.webp",
      bg: "#62a1d9",
    },
    menuArt: "/images/menu/menu-message-in-a-bottle.webp",
    featured: true,
    idea: "A digital diary where typed thoughts break apart into letters that fall and pile up into a growing bed beneath you, a calm place to release your mind. Send a private link to a friend and keep the pile growing together, reply by reply.",
    // TODO(Jolin): replace with your real design decisions
    designed: [
      "A quiet, private writing space with very little interface in the way, so the words are the only thing on screen.",
      "The moment a thought breaks apart into falling letters, the one interaction the whole design is built around.",
      "The share flow: a private link that lets a friend reply and keep the same pile growing.",
    ],
    built: {
      // TODO(Jolin): add the stack and how the pieces connect
      intro:
        "Typed text is split into single letters that fall and settle on top of each other, so the pile keeps every thought that was written.",
      stack: [],
      diagram: [],
    },
    challenge: {
      title: "Balancing visual design and functionality",
      broke:
        "I wanted the website to feel like an interactive experience rather than a traditional product landing page. However, creating a visually engaging design while keeping the experience intuitive was a challenge.",
      tried:
        "I explored different visual directions, experimented with animations, and considered how users would interact with the main elements of the experience.",
      fixed:
        "I refined the visual direction around the bottle concept, using it as the central element of the experience and keeping the interactions focused on the storytelling.",
      learned:
        "I learned that animation should support the user's experience rather than simply decorate a page. Visual storytelling also requires careful consideration of usability and interaction.",
    },
    links: [{ label: "Live site", href: "https://www.msg-in-a-bottle.com/" }],
  },
  {
    slug: "busy-season",
    number: "02",
    title: "Busy Season",
    date: "2026-10-01",
    color: "marigold",
    ink: "plum",
    illustration: "clapper",
    summary:
      "Short-form video ads for marketing agencies, made behind the scenes so they can deliver more without growing the team.",
    details:
      "The site speaks to agency owners first: what they get, how it fits their workflow and why their clients never see Busy Season. Video leads the page, because the work is the pitch.",
    teaser: "Roll camera.",
    tags: ["B2B", "Video Ads"],
    image: {
      src: "/images/busy-season.webp",
      width: 1896,
      height: 910,
      alt: "Busy Season homepage: white-label video ads for agencies running home service accounts, over a photo of roofers at work",
    },
    cardImage: "/images/cards/busy-season.webp",
    cardArt: "/images/cards/busy-season-art.webp",
    bandArt: {
      src: "/images/bands/busy-season-half.webp",
      width: 720,
      height: 900,
    },
    bannerArt: "/images/busy-season-banner.webp",
    curtainArt: { src: "/images/curtain/curtain-busy-season.webp" },
    menuArt: "/images/menu/menu-busy-season.webp",
    featured: true,
    idea: "Short-form video ads for marketing agencies, helping them deliver more creative work without growing their in-house team. The agency owns the client relationship, Busy Season handles the creative production behind the scenes.",
    // TODO(Jolin): replace with your real design decisions
    designed: [
      "A site that speaks to agency owners first: what they get, how it fits their workflow, and why the client never sees Busy Season.",
      "Video front and center, since the work itself is the strongest pitch.",
    ],
    built: {
      // TODO(Jolin): add the stack and how the pieces connect
      intro:
        "A marketing site built to load video quickly and stay easy to update as new work comes in.",
      stack: [],
      diagram: [],
    },
    challenge: {
      title: "Creating a distinctive brand experience",
      broke:
        "I wanted Busy Season to stand out from typical marketing agency websites. A conventional agency layout didn't communicate the bold, creative direction I wanted for the brand.",
      tried:
        "I explored bold colours, expressive typography, visual compositions, and motion-based elements to create a stronger identity.",
      fixed:
        "I developed a more expressive art direction that reflects what the studio does: creative video ads that agencies deliver to their home service clients, with Busy Season behind the scenes.",
      learned:
        "I learned how visual identity, layout, and motion can communicate a brand's personality. I also learned that a website needs to communicate its business value, not just look visually interesting.",
    },
    links: [{ label: "Live site", href: "https://www.busyseason.ca/" }],
  },
  {
    slug: "dewstick",
    number: "03",
    title: "Dewstick",
    date: "2026-08-26",
    color: "blush",
    ink: "plum",
    illustration: "balm",
    summary:
      "A tinted lip balm brand, half color, half skincare, designed in Figma and built as a bilingual store on five platforms.",
    details:
      "Five shades set up as variants of one product, a set of five with a compare-at price, and a real Shopify checkout in test mode, in English and Chinese. Then the same store built on WordPress, Next.js, Elementor and Kadence to compare.",
    teaser: "Swipe on.",
    tags: ["E-commerce", "0 to 1"],
    image: {
      src: "/images/dewstick.webp",
      width: 2536,
      height: 1396,
      alt: "Dewstick homepage reading half lipstick, half lip balm, with a yellow tinted balm standing among soft clouds",
    },
    cardImage: "/images/cards/dewstick.webp",
    cardArt: "/images/cards/dewstick-art.webp",
    bandArt: {
      src: "/images/bands/dewstick-wide.webp",
      width: 1344,
      height: 752,
    },
    bannerArt: "/images/dewstick-banner.webp",
    curtainArt: { src: "/images/curtain/curtain-dewstick.webp" },
    menuArt: "/images/menu/menu-dewstick.webp",
    featured: true,
    idea: "A tinted lip balm brand, half color, half skincare. Designed in Figma and built as a bilingual store across Shopify, WordPress, Next.js, Elementor and Kadence.",
    // From the Dewstick repo (PRODUCT.md, README, the Shopify theme). The brand,
    // prices and shade names are made up; the store setup is real.
    store: {
      intro:
        "The product is made up, but the store is real: a Shopify store with a working checkout in test mode. Everything on it is judged by one question: does this help someone on a phone pick a shade and add it to the cart?",
      points: [
        {
          title: "Products and variants",
          text: "One product, the tinted lip balm, with the five shades set up as its variants at $22 CAD each. The set of five is its own product at $98 CAD with a $110 compare-at price, so the $12 saving shows as a struck-through price instead of a claim in the copy. Both sit in one shades collection.",
        },
        {
          title: "Why the shades are laid out this way",
          text: "The shade names are moods (nectar, poppy, peony, blush, orchid), so every option shows a color dot and the plain color next to the name: nectar / coral, orchid / berry rose. Nobody has to guess. Picking a shade swaps the photo and price at once and puts the shade in the link, so a shared link opens on the same shade. The homepage row shows three shades and the set, not all five, because most visitors arrive on a phone from a social post and have a few seconds to decide.",
        },
        {
          title: "Cart and checkout",
          text: "Shade, quantity, add to cart, cart, then Shopify's own checkout in test mode, so no real money moves. A sold-out shade disables its button instead of failing at checkout. Every shade page offers the set underneath. The public Vercel copy keeps its cart in the browser and says so at checkout, with a link to the real store.",
        },
        {
          title: "Bilingual product pages",
          text: "English and Chinese are equal, not a translation added later. The store uses Shopify's own languages with /zh-cn/ links, and every string ships in both, down to the color names (coral is 珊瑚色). The headless Next.js build pulls the Chinese product copy straight from Shopify.",
        },
        {
          title: "Honest where proof is missing",
          text: 'There are no reviews, so the page says "No reviews yet." with a note from the founder instead of made-up stars. Newsletter signups land in Shopify Customers tagged with where the visitor came from, so results can be read by traffic source later.',
        },
      ],
    },
    // TODO(Jolin): replace with your real design decisions
    designed: [
      "The brand and homepage in Figma, from the first layout to the final product sections.",
      "A layout that works in two languages, so neither version feels like a translation squeezed into the other.",
    ],
    built: {
      intro:
        "One Figma design, built five ways. Doing it on several platforms showed what each one makes easy and what each one fights.",
      stack: [
        "Figma",
        "Next.js",
        "Shopify",
        "WordPress",
        "Elementor",
        "Kadence",
      ],
      diagram: [
        "Figma design",
        "Shared content and product data",
        "Next.js, Shopify and WordPress builds",
        "Hosted on Vercel, Shopify and WordPress Playground",
      ],
    },
    challenge: {
      title: "Telling shades apart in the cart",
      broke:
        "All five shades are the same product, the tinted lip balm. If the cart identified items by product, adding nectar and then poppy would merge them into one line, and the order would carry the wrong shade.",
      tried:
        "I traced how an item travels from the shade picker to the cart: which ID the form sends, how `addToCart()` looks for an existing line, and how the cart is saved in the browser.",
      fixed:
        "Each shade is its own Shopify variant with its own ID. Picking a shade writes that variant ID into the form, and `addToCart()` matches cart lines on it. The same shade added twice raises the quantity on one line; a different shade gets a line of its own. The Next.js build sends the same variant ID to Shopify's cart.",
      learned:
        "I learned how array methods, object properties and conditional logic work together to manage cart data. I also learned that choosing what identifies an item, the product or the variant, decides what the shopper sees in their cart.",
    },
    links: [
      { label: "Live site (Next.js)", href: "https://dewstick.vercel.app/" },
      { label: "Static build", href: "https://dewstick-static.vercel.app/" },
      {
        label: "Shopify store",
        href: "https://dewstick.myshopify.com/",
        note: "password: dewstick",
      },
      {
        label: "Figma",
        href: "https://www.figma.com/design/mfxVRomQVdHUxF2tK3JzB4/dewstick-%E2%80%94-homepage?node-id=0-1",
      },
      { label: "Repo", href: "https://github.com/Jolin-ma/dewstick" },
    ],
  },
  {
    slug: "legacy-link-studio",
    number: "04",
    title: "Legacy Link Studio",
    date: "2026-09-11",
    color: "pistachio",
    ink: "plum",
    illustration: "reel",
    summary:
      "60 to 90 second cinematic love story films built from a couple's relationship and the moments that mean the most.",
    details:
      "The site has a warm, cinematic feel that matches the films without competing with them. Video loads without slowing the first screen, and there is a short path from watching a sample film to starting a booking.",
    teaser: "Press play.",
    tags: ["Love Story", "Short Film"],
    image: {
      src: "/images/legacylinkstudio.webp",
      width: 1878,
      height: 906,
      alt: "Legacy Link Studio homepage reading every love story deserves its own film, over a couple slow dancing under string lights",
    },
    cardImage: "/images/cards/legacylinkstudio.webp",
    cardArt: "/images/cards/legacylinkstudio-art.webp",
    bandArt: {
      src: "/images/bands/legacylinkstudio-wide.webp",
      width: 1344,
      height: 752,
    },
    bannerArt: "/images/legacy-link-studio-banner.webp",
    curtainArt: { src: "/images/curtain/curtain-legacy-link-studio.webp" },
    menuArt: "/images/menu/menu-legacy-link-studio.webp",
    featured: true,
    idea: "60 to 90 second cinematic love story films built from a couple's relationship, memories and the moments that mean the most.",
    // TODO(Jolin): replace with your real design decisions
    designed: [
      "A warm, cinematic feel that matches the films, without letting the site compete with them.",
      "A simple path from watching a sample film to starting a booking.",
    ],
    built: {
      // TODO(Jolin): add the stack and how the pieces connect
      intro:
        "A site built around the films, with video that loads without slowing down the first screen.",
      stack: [],
      diagram: [],
    },
    challenge: {
      title: "Creating a personalized storytelling experience",
      broke:
        "One challenge was figuring out how to turn personal memories and relationship details into a cohesive love story. Each couple has a different history, so a generic storytelling structure wouldn't create the personal experience I wanted.",
      tried:
        "I explored how to organize relationship details, important memories, and key moments into a structured storytelling process. I also experimented with AI-assisted creative tools to explore how written memories could become visual scenes.",
      fixed:
        "I developed a more structured approach to storytelling, organizing personal details into a narrative with a beginning, meaningful moments, and an emotional ending. This made it easier to guide the creative process while keeping each story personal.",
      learned:
        "I learned that AI-generated content still needs creative direction. The quality of the final result depends on how well information is organized, how the story is structured, and how visual elements support the emotional message.",
    },
    links: [{ label: "Live site", href: "https://www.legacylinkstudio.com/" }],
  },
  {
    slug: "this-portfolio",
    number: "05",
    title: "This portfolio",
    date: "2026-10-28",
    color: "plum",
    ink: "cream",
    illustration: "window",
    summary:
      "The site you're on. A case study about the page transition, the accessible menu, reduced motion and image loading.",
    details:
      "Flat color, simple rounded shapes and a risograph print look, with a strict seven-color palette whose text pairs were all checked for contrast. Motion is small and always has a job, and the whole site builds to plain HTML that can be hosted anywhere.",
    teaser: "Look under the hood.",
    tags: ["Next.js", "Accessibility"],
    image: null,
    bandArt: {
      src: "/images/bands/portfolio-wide.webp",
      width: 1344,
      height: 752,
    },
    bannerArt: "/images/portfolio-banner.webp",
    curtainArt: { src: "/images/curtain/curtain-this-portfolio.webp" },
    menuArt: "/images/menu/menu-this-portfolio.webp",
    featured: false,
    idea: "A portfolio that shows creative visual thinking and practical front-end skills at the same time. The site itself is the proof: if the motion, accessibility and speed are done properly, you can feel it while browsing.",
    designed: [
      "An original art direction: flat color, simple rounded shapes and a risograph print look, with the fills slightly out of line with the outlines.",
      "A strict palette of seven colors. Each section uses one background, plum, cream and at most two accents, and every text and background pair was checked for contrast.",
      "Motion that is small and has a job: the curtain tells you the page is changing, the card swap shows the real work behind the illustration.",
    ],
    built: {
      intro:
        "All words live in typed content files, so editing a case study never means touching a component. The site builds to plain HTML files that can be hosted anywhere.",
      stack: [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "CSS Modules",
        "Static export",
      ],
      diagram: [
        "Typed content files",
        "React components and CSS Modules",
        "Next.js static export",
        "Any static host",
      ],
    },
    // From progress.md (Oct 29) and components/ui/GalleryCard
    challenge: {
      title: "A hover effect that only worked once",
      broke:
        "Each card in Selected work has two pictures, and on hover the next one should roll up from the bottom edge. It worked the first time I hovered a card. After that, the picture just appeared with no roll at all.",
      tried:
        "I watched each layer's state as I hovered in and out. The pictures take turns being on top, and the one underneath stays fully shown so the new one can cover it. So when a picture came back to the top, it was already fully revealed. The roll was a CSS transition, and a transition only runs when a value changes. Nothing changed, so nothing moved.",
      fixed:
        "I swapped the transition for a keyframe animation, `rollUp`, which starts from hidden every time it's applied, so it replays on every hover. A `data-rolling` attribute switches it on only after the first hover, so nothing animates on page load. The animation is turned off for people who ask their system for reduced motion.",
      learned:
        "I learned that a transition animates a change, and an animation plays from the start each time it's applied. Testing an effect once isn't enough. I now hover in and out a few times before I call an interaction done.",
    },
    links: [{ label: "GitHub", href: "https://github.com/Jolin-ma" }],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

/** The project after this one, looping back to the first. */
export function getNextProject(slug: string) {
  const index = projects.findIndex((p) => p.slug === slug);
  return projects[(index + 1) % projects.length];
}

export function formatDate(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/** What the page curtain shows on the way to a case study */
export function curtainFor(p: Project) {
  return {
    title: p.title,
    color: p.color,
    ink: p.ink,
    illustration: p.illustration,
    art: p.curtainArt,
  };
}

export const caseHref = (p: Project) => `/work/${p.slug}/`;
