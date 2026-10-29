/*
  portfolioHeroConfig.ts
  Every position, size and timing for the PortfolioHero, in one place.

  Positions are percentages of the banner (the artwork), so they scale with
  it: x is % of the width, y is % of the height, measured from the top left.
  Floating objects are placed by their CENTER. Seconds are written next to each
  timing. To nudge anything, change its number and look again.
*/

export const ARTWORK = {
  // webp copy of portfolio-hero-base.png (2.8 MB png -> ~130 KB)
  src: "/images/portfolio-hero-base.webp",
  width: 2880,
  height: 760,
  alt: "An open laptop with a glowing cream screen on a mustard desk, with a potted plant and a navy coffee mug, in front of a big soft sun on a coral sky",
};

/** The banner's own coordinate space, used by the small SVG layer (dashes and steam) */
export const VIEW = { w: 2880, h: 760 };

/** Where things come out of: the middle of the laptop screen, in % */
export const SCREEN = {
  x: 79,
  y: 59.5,
  /** The four corners of the screen, in %, for the light sweep */
  corners: [
    [72.3, 38.3],
    [88.3, 42.6],
    [86.6, 81.8],
    [69.8, 73.5],
  ] as const,
  /** Seconds between light sweeps across the screen */
  sweepEvery: 8,
};

/** The big soft glow behind the laptop (the circle is painted in the artwork) */
export const GLOW = {
  x: 77.8,
  y: 37.4,
  /** Width of the glow in % of the banner. A bit bigger than the painted circle (24%) */
  size: 28,
  /** The painted circle's width in % of the banner, and its color. The circle is cut off by the
      picture's top edge, so a matching disc is drawn behind the picture to finish it. */
  discSize: 24.4,
  discColor: "#FCE3B2",
  /** Seconds per pulse (6 to 8) */
  pulseSeconds: 7,
};

/* ---------- Intro ---------- */

export const INTRO = {
  /** Seconds before the first object leaves the screen */
  start: 0.4,
  /** Seconds between one object and the next */
  stagger: 0.35,
  /** Seconds each object takes to fly out and settle (with a little overshoot) */
  duration: 1.1,
};

/* ---------- Floating projects ---------- */

export type FloatConfig = {
  /** The project's slug in content/projects.ts. The link and page curtain come from it. */
  slug: string;
  /** Shown in the label pill and the screen reader name */
  label: string;
  src: string;
  /** The image's own size, so it keeps its shape */
  width: number;
  height: number;
  /** Resting spot: the center of the object, in % of the banner */
  x: number;
  y: number;
  /** The same spot's height on phones, where the picture is cropped and there is no sky above it */
  mobileY: number;
  /** Width in % of the banner (7 to 9 is about right; the bottle is tall, so it is a bit narrower) */
  size: number;
  /** Tilt in degrees when it comes to rest */
  rot: number;
  /** Idle float: how many px it bobs up, how many degrees it tilts each way, and seconds per bob (3 to 5) */
  bob: number;
  tilt: number;
  bobSeconds: number;
  /** Extra sideways glide in px each way (the plane glides more than the rest) */
  drift: number;
};

/*
  The order here is the order they pop out of the laptop.
  Spots are chosen so nothing covers the screen, the headline (left), the cloud
  (top right) or each other. Move x and y to change them. A negative y puts the
  object ABOVE the picture, in the sky (desktop only: on phones the picture is
  cropped, so mobileY keeps them inside it).
*/
export const FLOATS: FloatConfig[] = [
  {
    slug: "dewstick",
    label: "DewStick",
    src: "/images/floats/float-balm.webp",
    width: 612,
    height: 675,
    x: 58,
    y: 6,
    mobileY: 22,
    size: 7.5,
    rot: -8,
    bob: 8,
    tilt: 3,
    bobSeconds: 4,
    drift: 0,
  },
  {
    slug: "legacy-link-studio",
    label: "Legacy Link Studio",
    src: "/images/floats/float-plane.webp",
    width: 678,
    height: 528,
    x: 94,
    y: -10,
    mobileY: 31,
    size: 8,
    rot: 6,
    bob: 7,
    tilt: 4,
    bobSeconds: 4.6,
    drift: 14,
  },
  {
    slug: "message-in-a-bottle",
    label: "Message in a Bottle",
    src: "/images/floats/float-bottle.webp",
    width: 537,
    height: 823,
    x: 68.5,
    y: -12,
    mobileY: 21,
    size: 6.5,
    rot: 9,
    bob: 9,
    tilt: 3,
    bobSeconds: 3.6,
    drift: 0,
  },
  {
    slug: "busy-season",
    label: "Busy Season",
    src: "/images/floats/float-phone.webp",
    width: 745,
    height: 653,
    x: 84,
    y: -8,
    mobileY: 22,
    size: 8.5,
    rot: -5,
    bob: 6,
    tilt: 4,
    bobSeconds: 5,
    drift: 0,
  },
];

/* ---------- Dash marks (cartoon motion lines) ---------- */

/*
  Eight short navy dashes pop around the screen edge once, as the objects come
  out, then fade. x and y are where each dash starts (artwork units, see VIEW),
  and angle points it away from the screen's center.
*/
export const DASHES = {
  color: "#1F3A7A",
  length: 64,
  width: 11,
  /** Seconds after the intro starts for the first dash, and between dashes */
  at: 0.1,
  every: 0.05,
  marks: [
    { x: 2605, y: 454, angle: 0 },
    { x: 2508, y: 599, angle: 45 },
    { x: 2275, y: 659, angle: 90 },
    { x: 2042, y: 599, angle: 135 },
    { x: 1945, y: 454, angle: 180 },
    { x: 2042, y: 309, angle: 225 },
    { x: 2275, y: 249, angle: 270 },
    { x: 2508, y: 309, angle: 315 },
  ],
};

/* ---------- Steam from the mug ---------- */

export const STEAM = {
  /** Just above the coffee, in artwork units */
  x: 2606,
  y: 552,
  /** How far a wisp rises, and seconds per wisp */
  rise: 110,
  seconds: 5,
  /** Negative delays so the two wisps are never in step */
  delays: [-0.5, -3],
};
