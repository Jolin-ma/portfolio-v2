"use client";

/*
  BusySeasonHero.tsx
  Busy Season hero, a sibling of DewHero, LegacyHero and BottleHero: the
  illustration with an animated SVG layer on top, and a compact headline,
  subline and button on the left. The idea: "your phone won't stop ringing".

  The artwork and the SVG layer share one "stage" box sized like
  object-fit: cover, anchored right. The SVG's viewBox is the artwork's own
  coordinate space (see busySeasonHeroConfig.ts), so everything lines up and
  scales together.
*/

import { useEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
import PillButton from "@/components/ui/PillButton";
import { type Project } from "@/content/projects";
import BusyCloud from "./BusyCloud";
import LeadBubble from "./LeadBubble";
import RingMarks from "./RingMarks";
import Smoke from "./Smoke";
import { ARTWORK, BUBBLES, CLOUDS, SUN, VIEW } from "./busySeasonHeroConfig";
import { bubble, keyframesCss, ring } from "./busySeasonKeyframes";
import styles from "./BusySeasonHero.module.css";

type Props = {
  project: Project;
  headline?: string;
  subline?: string;
  ctaLabel?: string;
};

export default function BusySeasonHero({
  project,
  headline = "Keep your phone ringing all year",
  subline = "Scroll-stopping video ads for home service businesses.",
  ctaLabel = "Book a call",
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

  // The generated keyframes have global names; passing them through variables keeps CSS Modules from renaming them
  const timing = {
    "--pulse": `${SUN.pulseSeconds}s`,
    "--ring-name": ring.name,
    "--bubble-name": bubble.name,
  } as CSSProperties;

  return (
    <section ref={heroRef} className={styles.hero} style={timing} aria-labelledby="busy-hero-title">
      {/* The ring rhythm and the bubble timing are written from the config (busySeasonKeyframes.ts) */}
      <style>{keyframesCss}</style>

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

          {/* Decorative layer: hidden from screen readers (the bubble text too) */}
          <svg
            className={styles.layer}
            viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <radialGradient id="busy-sun-glow">
                <stop offset="0" stopColor="#FFF0B8" stopOpacity="0.65" />
                <stop offset="0.5" stopColor="#FFE08A" stopOpacity="0.3" />
                <stop offset="1" stopColor="#FFE08A" stopOpacity="0" />
              </radialGradient>
            </defs>

            <circle className={styles.sun} cx={SUN.x} cy={SUN.y} r={SUN.r * 1.9} fill="url(#busy-sun-glow)" />

            {CLOUDS.map((cloud) => (
              <BusyCloud key={`${cloud.x}-${cloud.y}`} {...cloud} />
            ))}

            <Smoke />
            <RingMarks />
            {BUBBLES.texts.map((text, index) => (
              <LeadBubble key={text} text={text} index={index} />
            ))}
          </svg>

          {/* Inside the stage so it lines up with the sky, whatever the crop */}
          <div className={styles.scrim} />
        </div>
      </div>

      <div className={`container ${styles.copy}`}>
        <p className="eyebrow">
          Project {project.number} · {project.title}
        </p>
        <h1 id="busy-hero-title">{headline}</h1>
        <p className={styles.subline}>{subline}</p>
        <PillButton href={project.links[0].href} className={styles.cta}>
          {ctaLabel}
        </PillButton>
      </div>
    </section>
  );
}
