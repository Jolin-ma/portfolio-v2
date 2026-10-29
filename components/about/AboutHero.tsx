/*
  AboutHero.tsx
  Dark band with a centered title and subline, and a portrait standing
  across the seam into the next band, where the intro paragraph sits.
*/

import { aboutHero } from "@/content/about";
import styles from "./AboutHero.module.css";

export default function AboutHero() {
  return (
    <header className={styles.wrap}>
      <div className={styles.top}>
        <h1 className={styles.title}>{aboutHero.title}</h1>
        <p className={styles.subline}>{aboutHero.subline}</p>
        <img
          className={styles.portrait}
          src="/images/me.webp"
          width={822}
          height={765}
          alt="Jolin Ma smiling outdoors in front of a wooden fence and trees"
          fetchPriority="high"
        />
      </div>
      <div className={styles.bottom}>
        <p className={styles.intro}>{aboutHero.intro}</p>
      </div>
    </header>
  );
}
