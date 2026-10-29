/*
  bottleHeroConfig.ts
  Every position and timing for the BottleHero animation layer, in one place.

  Coordinates are in the artwork's own space: VIEW is 2688 x 1520, the same as
  the picture, so a spot you see in the picture has the same numbers here.
  (On the 2000-wide preview, multiply by 1.344.) Seconds are written next to
  each timing. To nudge anything, change its number and look again.
*/

export const ARTWORK = {
  // webp copy of "msg in a bittle page.png" (6 MB png -> ~430 KB)
  src: "/images/msg-in-a-bottle-page.webp",
  width: 2688,
  height: 1520,
  alt: "A glass bottle with a cork floats half under the waves at sunset, holding a rolled scroll tied with a red bow",
};

export const VIEW = { w: 2688, h: 1520 };

/* ---------- Bubbles ---------- */

/** Bubbles start just below the bottom edge and fade out before the wave line */
export const BUBBLE_RISE = { startY: 1570, endY: 700 };

export type BubbleConfig = {
  /** Resting position (also where it sits with reduced motion) */
  x: number;
  y: number;
  /** Radius */
  r: number;
  /** Seconds to rise the whole way. Bigger = slower. Small bubbles are slower. */
  dur: number;
  /** Negative seconds, so bubbles are already part-way up on load */
  delay: number;
  /** Sideways wobble each way, and seconds per wobble */
  sway: number;
  swayDur: number;
  /** 0 to 1 */
  opacity: number;
  /** Kept (frozen in place) when motion is reduced */
  still?: boolean;
};

/*
  The first 7 sit over the headline (x under 1250), so they are small and faint.
  The other 13 are spread over the right, where the bottle is.
*/
export const BUBBLES: BubbleConfig[] = [
  // ---- left, behind the text: small and faint ----
  { x: 90, y: 1300, r: 10, dur: 30, delay: -4, sway: 10, swayDur: 6, opacity: 0.28 },
  { x: 260, y: 900, r: 13, dur: 26, delay: -18, sway: 12, swayDur: 7, opacity: 0.3, still: true },
  { x: 420, y: 1450, r: 9, dur: 32, delay: -9, sway: 8, swayDur: 8, opacity: 0.25 },
  { x: 610, y: 780, r: 12, dur: 28, delay: -22, sway: 10, swayDur: 6.5, opacity: 0.3 },
  { x: 760, y: 1200, r: 14, dur: 24, delay: -12, sway: 12, swayDur: 7.5, opacity: 0.32, still: true },
  { x: 950, y: 1050, r: 9, dur: 31, delay: -27, sway: 9, swayDur: 8, opacity: 0.26 },
  { x: 1130, y: 1400, r: 11, dur: 27, delay: -6, sway: 10, swayDur: 7, opacity: 0.3 },

  // ---- right: the clearer ones ----
  { x: 1290, y: 820, r: 14, dur: 25, delay: -15, sway: 12, swayDur: 6, opacity: 0.55 },
  { x: 1400, y: 1350, r: 20, dur: 18, delay: -3, sway: 16, swayDur: 7, opacity: 0.7, still: true },
  { x: 1500, y: 950, r: 10, dur: 29, delay: -20, sway: 10, swayDur: 8, opacity: 0.5 },
  { x: 1650, y: 1480, r: 24, dur: 16, delay: -8, sway: 18, swayDur: 6.5, opacity: 0.75 },
  { x: 1760, y: 1150, r: 12, dur: 26, delay: -24, sway: 12, swayDur: 7, opacity: 0.55, still: true },
  { x: 1900, y: 760, r: 16, dur: 22, delay: -11, sway: 14, swayDur: 6, opacity: 0.6 },
  { x: 2050, y: 1300, r: 18, dur: 19, delay: -1, sway: 15, swayDur: 7.5, opacity: 0.7 },
  { x: 2150, y: 900, r: 11, dur: 28, delay: -17, sway: 10, swayDur: 8, opacity: 0.5, still: true },
  { x: 2300, y: 1420, r: 22, dur: 17, delay: -13, sway: 16, swayDur: 6, opacity: 0.72 },
  { x: 2380, y: 1000, r: 14, dur: 23, delay: -26, sway: 12, swayDur: 7, opacity: 0.58 },
  { x: 2480, y: 1250, r: 20, dur: 18, delay: -5, sway: 16, swayDur: 7, opacity: 0.7, still: true },
  { x: 2570, y: 800, r: 10, dur: 30, delay: -9, sway: 9, swayDur: 8.5, opacity: 0.5 },
  { x: 2620, y: 1450, r: 16, dur: 21, delay: -19, sway: 13, swayDur: 6.5, opacity: 0.62 },
];

/* A few bubbles that rise from the bottom of the bottle, as if it just shifted */
export const BOTTLE_BUBBLES = {
  /** Bottom of the bottle */
  x: 1815,
  y: 1340,
  /** Seconds between bursts (6 to 8 feels natural) */
  every: 6.5,
  /** Seconds before the first burst */
  firstAt: 2,
  bubbles: [
    // dx sideways from the origin, r radius, at seconds into the burst, rise distance
    { dx: -40, r: 12, at: 0, rise: 520 },
    { dx: 10, r: 9, at: 0.3, rise: 600 },
    { dx: 55, r: 14, at: 0.55, rise: 480 },
    { dx: -15, r: 8, at: 0.85, rise: 640 },
    { dx: 35, r: 10, at: 1.1, rise: 560 },
  ],
};

/* ---------- Fish ---------- */

export type FishConfig = {
  /** 1 swims left to right, -1 swims right to left (the fish is flipped to face the right way) */
  dir: 1 | -1;
  /** Depth. The water runs from about y 700 (just under the waves) to 1500 */
  y: number;
  /** Resting x, used when motion is reduced (kept clear of the bottle) */
  restX: number;
  /** 1 = about 100 wide */
  scale: number;
  /** Seconds to cross the whole picture (20 to 40) */
  dur: number;
  /** Negative seconds, so the fish are already mid-swim on load */
  delay: number;
  /** Up and down drift, how far each way and seconds per drift */
  bob: number;
  bobDur: number;
  opacity: number;
  still?: boolean;
};

/*
  Fish fade out while they pass the bottle (x about 1550 to 2230), so they swim
  "behind" it without drawing over it. The fade points are in the keyframes in
  BottleHero.module.css (swimRight / swimLeft). Move the bottle and they need
  nudging too.
*/
export const FISH: FishConfig[] = [
  { dir: 1, y: 770, restX: 760, scale: 0.9, dur: 34, delay: -6, bob: 14, bobDur: 6, opacity: 0.6, still: true },
  { dir: -1, y: 1010, restX: 1180, scale: 1.1, dur: 28, delay: -14, bob: 18, bobDur: 7, opacity: 0.65 },
  { dir: 1, y: 1190, restX: 430, scale: 0.8, dur: 40, delay: -22, bob: 12, bobDur: 8, opacity: 0.55, still: true },
  { dir: -1, y: 870, restX: 2480, scale: 0.7, dur: 36, delay: -3, bob: 10, bobDur: 5.5, opacity: 0.6 },
  { dir: 1, y: 1340, restX: 2420, scale: 1.0, dur: 24, delay: -18, bob: 16, bobDur: 6.5, opacity: 0.6 },
];

export const FISH_COLOR = "#1F3A7A";
/** How far past each edge a fish starts and ends, so it is fully off screen */
export const FISH_MARGIN = 150;

/* ---------- Light rays ---------- */

export type RayConfig = {
  /** Angle from straight down, in degrees. Negative leans left. */
  angle: number;
  /** How far the ray reaches down, and how wide it is at the bottom */
  length: number;
  width: number;
  /** Seconds per fade in and out (7 to 11), and the brightest it gets (0.05 to 0.15) */
  dur: number;
  delay: number;
  peak: number;
};

/* All fan out from just under the waterline beside the bottle neck */
export const RAYS_ORIGIN = { x: 1980, y: 660 };
export const RAYS: RayConfig[] = [
  { angle: -38, length: 1000, width: 200, dur: 9, delay: -2, peak: 0.12 },
  { angle: -20, length: 1000, width: 160, dur: 11, delay: -6, peak: 0.1 },
  { angle: 22, length: 1000, width: 180, dur: 8, delay: -4, peak: 0.13 },
  { angle: 40, length: 1000, width: 220, dur: 10, delay: -9, peak: 0.1 },
];

/* ---------- Splash ---------- */

export const SPLASH = {
  /** Where the bottle neck meets the water */
  x: 1982,
  y: 560,
  /** Seconds between splashes (6 to 8). The splash itself lasts about 13% of this. */
  every: 7,
  firstAt: 3,
  drops: [
    // dx sideways, up = how high it pops, r radius, at seconds after the splash starts
    { dx: -70, up: 80, r: 8, at: 0 },
    { dx: 30, up: 105, r: 10, at: 0.12 },
    { dx: 95, up: 70, r: 7, at: 0.24 },
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

// In the clear sky between the sun and the bottle (the picture's own clouds stay still)
export const CLOUDS: CloudConfig[] = [
  { x: 980, y: 100, scale: 1.3, travel: 340, dur: 54, delay: -10 },
  { x: 1180, y: 250, scale: 0.9, travel: 280, dur: 46, delay: -30 },
  { x: 1450, y: 130, scale: 1.05, travel: 320, dur: 58, delay: -20 },
];
export const CLOUD_COLOR = "#FCDDBC";

/* ---------- Sun ---------- */

export const SUN = {
  x: 809,
  y: 208,
  r: 117,
  /** Seconds per glow pulse (6 to 8) */
  pulseSeconds: 7,
};
