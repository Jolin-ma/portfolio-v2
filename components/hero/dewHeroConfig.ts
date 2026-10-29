/*
  dewHeroConfig.ts
  Fixed positions and timings for the DewHero animation layer. Written out by
  hand (no Math.random) so the server and the browser render the same markup.

  Every position is a percentage of the artwork, not of the screen, so the
  pieces stay lined up with the illustration at any size.
*/

export type DropConfig = {
  /** Horizontal position, % of the artwork width */
  x: number;
  /** Where the drop rests when motion is reduced, % of the artwork height */
  y: number;
  /** Drop width as % of the artwork width. Small = far away, big = close */
  size: number;
  /** Seconds to fall from above the top edge to below the bottom edge */
  dur: number;
  /** Seconds. Negative so the drops are already mid-fall on page load */
  delay: number;
  /** Seconds for one full left-right-left sway */
  swayDur: number;
  /** Sway distance each way, as % of the artwork width */
  sway: number;
  /** 0 to 1. Small drops are fainter, which sells the depth */
  opacity: number;
};

/*
  Three depth layers:
    far    size 0.9-1.4   dur 26-34   opacity ~0.45
    middle size 1.8-2.5   dur 19-24   opacity ~0.7
    near   size 3.0-3.8   dur 14-17   opacity ~0.92
  Drops with x under 44 sit behind the headline on desktop. They are all
  small and get an extra fade in the CSS (--quiet in DewHero.module.css).
*/
export const DROPS: DropConfig[] = [
  // ---- left, behind the text: far and small only ----
  { x: 4, y: 18, size: 1.0, dur: 30, delay: -6, swayDur: 7, sway: 0.5, opacity: 0.45 },
  { x: 11, y: 62, size: 1.2, dur: 33, delay: -21, swayDur: 9, sway: 0.6, opacity: 0.5 },
  { x: 19, y: 36, size: 0.9, dur: 28, delay: -14, swayDur: 8, sway: 0.4, opacity: 0.4 },
  { x: 26, y: 84, size: 1.3, dur: 34, delay: -2, swayDur: 10, sway: 0.5, opacity: 0.5 },
  { x: 33, y: 8, size: 1.1, dur: 29, delay: -25, swayDur: 7.5, sway: 0.6, opacity: 0.45 },
  { x: 38, y: 52, size: 1.4, dur: 31, delay: -11, swayDur: 9.5, sway: 0.5, opacity: 0.5 },
  { x: 8, y: 92, size: 1.0, dur: 27, delay: -18, swayDur: 8.5, sway: 0.4, opacity: 0.4 },
  { x: 42, y: 28, size: 1.2, dur: 32, delay: -29, swayDur: 11, sway: 0.5, opacity: 0.45 },

  // ---- middle: scattered across the open cream and the sun ----
  { x: 47, y: 70, size: 2.0, dur: 22, delay: -9, swayDur: 8, sway: 0.8, opacity: 0.7 },
  { x: 53, y: 14, size: 2.4, dur: 24, delay: -17, swayDur: 9, sway: 0.9, opacity: 0.72 },
  { x: 58, y: 46, size: 1.8, dur: 19, delay: -4, swayDur: 7, sway: 0.7, opacity: 0.68 },
  { x: 63, y: 88, size: 2.2, dur: 23, delay: -13, swayDur: 10, sway: 0.8, opacity: 0.7 },
  { x: 78, y: 24, size: 2.5, dur: 21, delay: -20, swayDur: 8.5, sway: 0.9, opacity: 0.72 },
  { x: 83, y: 66, size: 1.9, dur: 20, delay: -7, swayDur: 9, sway: 0.7, opacity: 0.68 },
  { x: 90, y: 40, size: 2.3, dur: 22, delay: -15, swayDur: 7.5, sway: 0.8, opacity: 0.7 },
  { x: 96, y: 78, size: 2.0, dur: 24, delay: -23, swayDur: 10, sway: 0.8, opacity: 0.7 },

  // ---- near: big and a little faster, kept to the right half ----
  { x: 50, y: 40, size: 3.2, dur: 16, delay: -3, swayDur: 9, sway: 1.1, opacity: 0.92 },
  { x: 67, y: 6, size: 3.8, dur: 17, delay: -12, swayDur: 11, sway: 1.2, opacity: 0.92 },
  { x: 76, y: 82, size: 3.0, dur: 15, delay: -8, swayDur: 8, sway: 1.0, opacity: 0.9 },
  { x: 94, y: 10, size: 3.6, dur: 16, delay: -1, swayDur: 10, sway: 1.1, opacity: 0.92 },
  { x: 87, y: 58, size: 3.1, dur: 14, delay: -10, swayDur: 9.5, sway: 1.0, opacity: 0.9 },
  { x: 60, y: 62, size: 3.4, dur: 17, delay: -5, swayDur: 10.5, sway: 1.1, opacity: 0.92 },
];

export type SparkleConfig = {
  /** Centre of the sparkle, % of the artwork width and height */
  x: number;
  y: number;
  /** Width as % of the artwork width */
  size: number;
  /** Seconds for one twinkle (2 to 4 is the sweet spot) */
  dur: number;
  /** Seconds. Negative so they start at different points in the cycle */
  delay: number;
};

export const SPARKLES: SparkleConfig[] = [
  { x: 11, y: 20, size: 2.4, dur: 3.2, delay: -0.8 },
  { x: 48, y: 37, size: 2.8, dur: 2.6, delay: -2.1 },
  { x: 39, y: 66, size: 2.6, dur: 3.8, delay: -1.4 },
  { x: 9, y: 66, size: 2.4, dur: 2.9, delay: -0.3 },
  { x: 89, y: 14, size: 2.8, dur: 3.4, delay: -2.6 },
  { x: 93, y: 31, size: 2.6, dur: 2.4, delay: -1.1 },
  { x: 82, y: 40, size: 3.6, dur: 3.9, delay: -3.2 },
  { x: 62, y: 58, size: 3.0, dur: 3.0, delay: -1.8 },
];

/*
  The tube drip. x and the start/end rows are measured off the artwork:
  x is the middle of the tube body, y runs from just under the lid seam to
  near the base.
*/
export const DRIP = {
  x: 72.2,
  startY: 37,
  /** How far it slides, % of the artwork height */
  travel: 46,
  /** Drop width, % of the artwork width */
  size: 2.6,
  /** Seconds for the whole cycle (slide, fade, rest). Keep it at 5 to 6 */
  cycle: 5.5,
};

/* Sun glow, measured off the artwork. Centre and diameter in %. */
export const SUN = { x: 71.4, y: 36.2, diameter: 38.2 };
