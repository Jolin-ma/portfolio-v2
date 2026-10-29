/*
  busySeasonKeyframes.ts
  Two animations here depend on numbers in the config (the ring rhythm and how
  long a bubble stays), so their keyframes are written out from the config
  instead of by hand. That way changing RING.pause or BUBBLES.every in
  busySeasonHeroConfig.ts just works, with no percentages to fix in the CSS.

  The result is a string of CSS that BusySeasonHero puts in a <style> tag.
  It is the same on the server and in the browser (no randomness).
*/

import { BUBBLES, RING } from "./busySeasonHeroConfig";

const pct = (seconds: number, total: number) => `${((seconds / total) * 100).toFixed(3)}%`;
const px = (n: number) => `${n.toFixed(1)}px`;

/* "Ring ring": each burst pops in, wiggles and fades out; then a long rest */
function ringKeyframes() {
  const { burst: b, gap, pause } = RING;
  const total = b + gap + b + pause;

  // One burst, as steps inside its length (0 to 1)
  const steps = [
    [0, "opacity:0;transform:scale(0.6) rotate(0deg)"],
    [0.3, "opacity:1;transform:scale(1.12) rotate(-7deg)"],
    [0.55, "opacity:1;transform:scale(1) rotate(7deg)"],
    [0.8, "opacity:1;transform:scale(1.04) rotate(-4deg)"],
    [1, "opacity:0;transform:scale(1.05) rotate(0deg)"],
  ] as const;

  const frames: string[] = [];
  for (const start of [0, b + gap]) {
    for (const [at, css] of steps) {
      frames.push(`${pct(start + at * b, total)}{${css}}`);
    }
  }
  frames.push(`100%{opacity:0;transform:scale(1) rotate(0deg)}`);
  return { name: "busy-ring", total, css: `@keyframes busy-ring{${frames.join("")}}` };
}

/* A lead bubble: pop out (a little bouncy), float up and left, fade before the top, then wait */
function bubbleKeyframes() {
  const { visible: v, floatX, floatY } = BUBBLES;
  const total = BUBBLES.every * BUBBLES.texts.length;
  const at = (s: number) => {
    const p = Math.min(s / v, 1); // how far along the float
    return `translate(${px(floatX * p)},${px(floatY * p)})`;
  };

  const frames = [
    `0%{opacity:0;transform:${at(0)} scale(0.4)}`,
    `${pct(0.25, total)}{opacity:1;transform:${at(0.25)} scale(1.12)}`,
    `${pct(0.5, total)}{opacity:1;transform:${at(0.5)} scale(1)}`,
    `${pct(v - 1.4, total)}{opacity:1;transform:${at(v - 1.4)} scale(1)}`,
    `${pct(v, total)}{opacity:0;transform:${at(v)} scale(1)}`,
    `100%{opacity:0;transform:${at(v)} scale(1)}`,
  ];
  return { name: "busy-lead-bubble", total, css: `@keyframes busy-lead-bubble{${frames.join("")}}` };
}

export const ring = ringKeyframes();
export const bubble = bubbleKeyframes();
export const keyframesCss = `${ring.css}${bubble.css}`;
