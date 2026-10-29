/*
  Hero.tsx
  Full-screen solid color with a centered two-line headline and an
  accent line underneath. Nothing else: the artwork starts in the gallery.

  The colors come from CSS variables (--hero-bg, --hero-accent, ...).
  A tiny script in app/layout.tsx picks a random pair from heroPairs and
  sets those variables before the page paints, so there's no flash of
  the default colors. Without JS, the first pair is used.
*/

import { hero, site } from "@/content/site";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.inner}>
        <h1 id="hero-title" className={styles.title}>
          <span className="sr-only">{site.name}, </span>
          {hero.title}
        </h1>
        <p className={styles.subline}>{hero.subline}</p>
      </div>
    </section>
  );
}
