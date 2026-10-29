/*
  busySeasonHeroConfig.ts
  Every position and timing for the BusySeasonHero animation layer, in one place.

  Coordinates are in the artwork's own space: VIEW is 2688 x 1152, the same as
  the picture, so a spot you see in the picture has the same numbers here.
  (On the 2000-wide preview, multiply by 1.344.) Seconds are written next to
  each timing. To nudge anything, change its number and look again.
*/

export const ARTWORK = {
  // webp copy of busy-season-hero-base.png (4.5 MB png -> ~220 KB)
  src: "/images/busy-season-hero-base.webp",
  width: 2688,
  height: 1152,
  alt: "A yellow rotary phone with its handset lifted, ringing on the ridge of a red roof against a coral pink sky",
};

export const VIEW = { w: 2688, h: 1152 };

export const NAVY = "#1F3A7A";
export const CREAM = "#FFF4E2";

/* ---------- Ringing marks ---------- */

/*
  "Ring ring": two quick bursts, a short gap, then a pause, then again.
  The whole cycle is  burst + gap + burst + pause  (about 3 seconds).
*/
export const RING = {
  /** Middle of the handset. All the marks below are measured from here. */
  x: 1802,
  y: 391,
  /** Seconds each burst lasts (the shake and pop) */
  burst: 0.4,
  /** Seconds between the two bursts */
  gap: 0.15,
  /** Seconds of quiet before the next "ring ring" */
  pause: 2,
  strokeWidth: 12,
  /*
    Each mark is a curve or line, drawn relative to the handset centre.
    delay staggers the marks a touch so they pop out one after another.
  */
  marks: [
    // two arcs on the left
    { d: "M-196 -56Q-232 0 -196 56", color: NAVY, delay: 0 },
    { d: "M-250 -92Q-302 0 -250 92", color: CREAM, delay: 0.04 },
    // two arcs on the right
    { d: "M212 -56Q248 0 212 56", color: NAVY, delay: 0 },
    { d: "M262 -92Q314 0 262 92", color: CREAM, delay: 0.04 },
    // short dashes above
    { d: "M-70 -190L-98 -228", color: CREAM, delay: 0.02 },
    { d: "M0 -206L0 -252", color: NAVY, delay: 0.04 },
    { d: "M70 -190L98 -228", color: CREAM, delay: 0.02 },
  ],
};

/* ---------- Lead bubbles ---------- */

export const BUBBLES = {
  /** Where the tip of each bubble's tail starts, just above the handset */
  x: 1840,
  y: 320,
  /** Seconds between one bubble and the next (4 to 5). Each bubble starts this much after the last. */
  every: 4.5,
  /** Seconds before the first bubble */
  firstAt: 1.2,
  /** Seconds each bubble stays on screen. A bit longer than `every`, so 1 or 2 show at once. */
  visible: 5.4,
  /** How far it floats while visible: up and slightly left */
  floatX: -90,
  floatY: -130,
  /** Look of the bubble */
  height: 96,
  tail: 34,
  fontSize: 44,
  /** Rough width of one letter at that font size. Raise it if text pokes out of a bubble. */
  charWidth: 25,
  padding: 70,
  /** The text, in order. Change, add or remove lines freely. */
  texts: ["New lead!", "Can you come Tuesday?", "Booked ✓", "Quote request", "Is this still available?"],
};

/* ---------- Chimney smoke ---------- */

export const SMOKE = {
  /** Top of the chimney */
  x: 2172,
  y: 598,
  /** How far a puff rises before it is gone */
  rise: 300,
  puffs: [
    // dx = how far it drifts sideways while rising, r = size, dur = seconds to rise, delay is negative so
    // the smoke is already going on load. Stagger the delays so the puffs never line up.
    { dx: 50, r: 30, dur: 8, delay: -0.5, rest: { x: 6, y: -40, scale: 0.9 } },
    { dx: -30, r: 34, dur: 8.5, delay: -2.8, rest: { x: 26, y: -120, scale: 1.2 } },
    { dx: 60, r: 28, dur: 7.5, delay: -4.6, rest: { x: -4, y: -200, scale: 1.5 } },
    { dx: -10, r: 32, dur: 9, delay: -6.4, rest: { x: 30, y: -270, scale: 1.7 } },
  ],
};

/* ---------- Clouds ---------- */

export type CloudConfig = {
  x: number;
  y: number;
  /** 1 = 160 wide */
  scale: number;
  /** How far it drifts right before it fades out and starts again */
  travel: number;
  /** Seconds per drift (40 to 60 = very slow) */
  dur: number;
  delay: number;
};

// In the clear sky just left of the phone (the picture's own clouds stay still)
export const CLOUDS: CloudConfig[] = [
  { x: 1230, y: 190, scale: 1.2, travel: 260, dur: 52, delay: -8 },
  { x: 1380, y: 70, scale: 0.8, travel: 220, dur: 44, delay: -26 },
];
export const CLOUD_COLOR = "#F1E3C8";

/* ---------- Sun ---------- */

export const SUN = {
  x: 2278,
  y: 172,
  r: 66,
  /** Seconds per glow pulse (6 to 8) */
  pulseSeconds: 7,
};
