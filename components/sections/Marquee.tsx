/*
  Marquee.tsx
  Infinite horizontal loop of big phrases, each followed by a small
  round image. The items are rendered twice in one track; the track
  slides left by exactly half its width, then starts again, so the loop
  has no visible seam. The second copy is hidden from screen readers.
  Pauses on hover, stops with reduced motion.
*/

import { site } from "@/content/site";
import styles from "./Marquee.module.css";

// One round image per phrase, in the same order as site.marquee:
// pen tool, code blocks, paper plane + check, open door
const dots = [1, 2, 3, 4].map((n) => `/images/bands/footer-${n}.webp`);

export default function Marquee() {
  const items = site.marquee.map((text, i) => {
    const dot = dots[i % dots.length];
    return (
      <li key={text} className={styles.item}>
        {text}
        {/* Decorative: the phrase next to it carries the meaning */}
        <img className={styles.dot} src={dot} width={320} height={320} alt="" loading="lazy" decoding="async" />
      </li>
    );
  });

  return (
    <div className={styles.marquee}>
      <div className={styles.track}>
        <ul role="list" className={styles.group}>
          {items}
        </ul>
        <ul role="list" className={styles.group} aria-hidden="true">
          {items}
        </ul>
      </div>
    </div>
  );
}
