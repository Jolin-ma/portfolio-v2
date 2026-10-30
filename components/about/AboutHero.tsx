/*
  AboutHero.tsx
  Title and subline centered on the art's paper cream, the wide
  illustration (Jolin sitting on a laptop) under them, then the intro
  paragraph on the same paper, in the subline's type.
*/

import { aboutHero } from "@/content/about";
import styles from "./AboutHero.module.css";

export default function AboutHero() {
  return (
    <header className={styles.wrap}>
      <div className={styles.top}>
        <div className={styles.text}>
          <h1 className={styles.title}>{aboutHero.title}</h1>
          <p className={styles.subline}>{aboutHero.subline}</p>
        </div>
        <img
          className={styles.art}
          src="/images/about/about-hero.webp"
          width={2560}
          height={1448}
          alt="Illustration of Jolin Ma in a yellow sweater, sitting cross-legged on an open laptop, with a sketchbook, a phone, a lip balm, a film strip and a speech bubble arching overhead"
          fetchPriority="high"
        />
      </div>
      <div className={styles.bottom}>
        <p className={styles.intro}>{aboutHero.intro}</p>
      </div>
    </header>
  );
}
