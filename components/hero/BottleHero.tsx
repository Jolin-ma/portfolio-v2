"use client";

/*
  BottleHero.tsx
  Message in a bottle hero, a sibling of DewHero and LegacyHero: the
  illustration with an animated SVG layer on top, and the headline, subline
  and button on the left, over the water.

  The artwork and the SVG layer share one "stage" box sized like
  object-fit: cover, anchored right. The SVG's viewBox is the artwork's own
  coordinate space (see bottleHeroConfig.ts), so everything lines up and
  scales together.
*/

import { useEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
import PillButton from "@/components/ui/PillButton";
import { type Project } from "@/content/projects";
import Bubble from "./Bubble";
import BottleBubbles from "./BottleBubbles";
import Fish from "./Fish";
import LightRays from "./LightRays";
import SkyCloud from "./SkyCloud";
import Splash from "./Splash";
import { ARTWORK, BUBBLES, CLOUDS, FISH, SUN, VIEW } from "./bottleHeroConfig";
import styles from "./BottleHero.module.css";

type Props = {
  project: Project;
  headline?: string;
  subline?: string;
  ctaLabel?: string;
};

export default function BottleHero({
  project,
  headline = "Let your thoughts fall away",
  subline = "A quiet diary where every word breaks into letters and settles into a pile that grows with you.",
  ctaLabel = "Start writing",
}: Props) {
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

  const timing = { "--pulse": `${SUN.pulseSeconds}s` } as CSSProperties;

  return (
    <section ref={heroRef} className={styles.hero} style={timing} aria-labelledby="bottle-hero-title">
      <div className={styles.art}>
        <div className={styles.stage}>
          <Image
            src={ARTWORK.src}
            alt={ARTWORK.alt}
            width={ARTWORK.width}
            height={ARTWORK.height}
            preload
            sizes="100vw"
            className={styles.photo}
          />

          {/* Decorative layer: hidden from screen readers */}
          <svg
            className={styles.layer}
            viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <radialGradient id="bottle-sun-glow">
                <stop offset="0" stopColor="#FFF0B8" stopOpacity="0.6" />
                <stop offset="0.55" stopColor="#FFE08A" stopOpacity="0.25" />
                <stop offset="1" stopColor="#FFE08A" stopOpacity="0" />
              </radialGradient>
            </defs>

            <circle className={styles.sun} cx={SUN.x} cy={SUN.y} r={SUN.r * 1.6} fill="url(#bottle-sun-glow)" />

            {CLOUDS.map((cloud) => (
              <SkyCloud key={`${cloud.x}-${cloud.y}`} {...cloud} />
            ))}

            {/* Under the water. Order matters: fish first, so bubbles and rays sit in front of them */}
            {FISH.map((fish) => (
              <Fish key={`${fish.y}-${fish.dir}`} {...fish} />
            ))}
            <LightRays />
            {BUBBLES.map((bubble) => (
              <Bubble key={`${bubble.x}-${bubble.y}`} {...bubble} />
            ))}
            <BottleBubbles />

            <Splash />
          </svg>

          {/* Inside the stage so it lines up with the water, whatever the crop */}
          <div className={styles.scrim} />
        </div>
      </div>

      <div className={`container ${styles.copy}`}>
        <p className="eyebrow">
          Project {project.number} · {project.title}
        </p>
        <h1 id="bottle-hero-title">{headline}</h1>
        <p className={styles.subline}>{subline}</p>
        <PillButton href={project.links[0].href}>{ctaLabel}</PillButton>
      </div>
    </section>
  );
}
