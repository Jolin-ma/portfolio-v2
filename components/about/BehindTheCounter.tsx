/*
  BehindTheCounter.tsx
  The retail side of the story: a title, one intro paragraph and three
  short points in a row (stacked on phones). The homepage "Run the
  store" lane links here (#counter). Words live in content/about.ts.
*/

import Reveal from "@/components/ui/Reveal";
import { counter } from "@/content/about";
import styles from "./BehindTheCounter.module.css";

export default function BehindTheCounter() {
  return (
    <section id="counter" className={styles.counter} aria-labelledby="counter-title">
      <Reveal>
        <h2 id="counter-title" className={styles.title}>
          {counter.title}
        </h2>
        <p className={styles.intro}>{counter.intro}</p>
      </Reveal>
      <ul role="list" className={styles.points}>
        {counter.points.map((point) => (
          <li key={point.title}>
            <Reveal>
              <h3 className={styles.pointTitle}>{point.title}</h3>
              <p className={styles.text}>{point.text}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
