"use client";

/*
  DewHero.tsx
  Dewstick hero: the illustration, an animated layer of drops and sparkles on
  top of it, and the headline, subline and button on the left.

  The artwork and the animation layer live in one "stage" box that is sized
  like object-fit: cover, anchored right. Because the layer is that same box,
  every percentage position stays lined up with the illustration.
*/

import { useEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
import PillButton from "@/components/ui/PillButton";
import Drop from "./Drop";
import Sparkle from "./Sparkle";
import TubeDrip from "./TubeDrip";
import { formatDate, type Project } from "@/content/projects";
import { DROPS, SPARKLES, SUN } from "./dewHeroConfig";
import styles from "./DewHero.module.css";

export default function DewHero({ project }: { project: Project }) {
  const liveLink = project.links[0];
  const heroRef = useRef<HTMLElement>(null);

  // Pause every animation while the hero is off screen (see [data-paused] in the CSS)
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => {
      hero.dataset.paused = entry.isIntersecting ? "false" : "true";
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={heroRef} className={styles.hero} aria-labelledby="dew-hero-title">
      <div className={styles.art}>
        <div className={styles.stage}>
          <Image
            src="/images/dewstick%20page.png"
            alt="A pink lip balm tube with its cap leaning beside it, in front of a big orange sun and soft pink hills"
            width={1344}
            height={752}
            preload
            sizes="100vw"
            className={styles.photo}
          />

          {/* Decorative layer: everything here is hidden from screen readers */}
          <div className={styles.layer} aria-hidden="true">
            <span
              className={styles.sun}
              style={
                {
                  "--x": `${SUN.x}%`,
                  "--y": `${SUN.y}%`,
                  "--d": `${SUN.diameter}cqw`,
                } as CSSProperties
              }
            />
            {DROPS.map((drop) => (
              <Drop key={`${drop.x}-${drop.y}`} {...drop} />
            ))}
            {SPARKLES.map((sparkle) => (
              <Sparkle key={`${sparkle.x}-${sparkle.y}`} {...sparkle} />
            ))}
            <TubeDrip />
          </div>
        </div>
      </div>

      <div className={`container ${styles.copy}`}>
        <p className="eyebrow">
          Project {project.number} · <time dateTime={project.date}>{formatDate(project.date)}</time>
        </p>
        <h1 id="dew-hero-title">{project.title}</h1>
        <p className={styles.subline}>{project.summary}</p>
        <ul role="list" className={styles.tags} aria-label="Tags">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        {liveLink && <PillButton href={liveLink.href}>{liveLink.label}</PillButton>}
      </div>
    </section>
  );
}
