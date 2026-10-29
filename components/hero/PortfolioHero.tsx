"use client";

/*
  PortfolioHero.tsx
  Home page hero, a sibling of the project heroes (DewHero, LegacyHero,
  BottleHero, BusySeasonHero): the illustration with an animated layer on top,
  and a compact headline, subline and two buttons on the left.
  The idea: my projects pop out of a glowing laptop, one by one, and float
  around it. Each one is a real link to its project page.

  The artwork and the layer share one "stage" box sized like object-fit: cover,
  anchored right, so the laptop never gets cropped. The stage is also a size
  container, so the objects can be placed and sized in % of the banner and fly
  out of the screen using cqw / cqh units.

  Everything decorative (glow, shimmer, dashes, steam) is hidden from screen
  readers. The floating projects are links, so they are not.
*/

import { useEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
import PillButton from "@/components/ui/PillButton";
import FloatingProject from "./FloatingProject";
import IntroBurst from "./IntroBurst";
import MugSteam from "./MugSteam";
import { ARTWORK, FLOATS, GLOW, SCREEN, VIEW } from "./portfolioHeroConfig";
import styles from "./PortfolioHero.module.css";

type Props = {
  label?: string;
  headline?: string;
  subline?: string;
};

export default function PortfolioHero({
  label = "Jolin Ma, web designer and developer",
  headline = "I build brands people want to click on",
  subline = "Storytelling, product design and code, all in one place.",
}: Props) {
  const heroRef = useRef<HTMLElement>(null);

  // Pause the idle loops while the hero is off screen (see [data-paused] in the CSS).
  // The intro is a one-time animation, so it plays once on load and never again.
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => {
      hero.dataset.paused = entry.isIntersecting ? "false" : "true";
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const vars = {
    "--glow-x": `${GLOW.x}%`,
    "--glow-y": `${GLOW.y}%`,
    "--glow-size": `${GLOW.size}cqw`,
    "--disc-size": `${GLOW.discSize}cqw`,
    "--disc-color": GLOW.discColor,
    "--pulse": `${GLOW.pulseSeconds}s`,
    "--sweep": `${SCREEN.sweepEvery}s`,
  } as CSSProperties;

  const screenShape = `polygon(${SCREEN.corners.map(([x, y]) => `${x}% ${y}%`).join(", ")})`;

  return (
    <section ref={heroRef} className={styles.hero} style={vars} aria-labelledby="portfolio-hero-title">
      <div className={styles.art}>
        <div className={styles.stage}>
          {/* Finishes the glow circle where the picture's top edge cuts it off (the picture fades out over it) */}
          <div className={styles.disc} aria-hidden="true" />
          <Image
            src={ARTWORK.src}
            alt={ARTWORK.alt}
            width={ARTWORK.width}
            height={ARTWORK.height}
            preload
            sizes="100vw"
            className={styles.photo}
          />

          {/* Decorative: the glowing sun, the shimmer across the screen, the dashes and the steam */}
          <div className={styles.glow} aria-hidden="true" />
          <div className={styles.screen} style={{ clipPath: screenShape }} aria-hidden="true">
            <span className={styles.sweep} />
          </div>
          <svg className={styles.layer} viewBox={`0 0 ${VIEW.w} ${VIEW.h}`} preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <IntroBurst />
            <MugSteam />
          </svg>

          {/* The projects: real links, after the decorative layers so they sit on top */}
          {FLOATS.map((config, index) => (
            <FloatingProject key={config.slug} config={config} index={index} />
          ))}
        </div>

        <div className={styles.scrim} aria-hidden="true" />
      </div>

      <div className={`container ${styles.copy}`}>
        <p className="eyebrow">{label}</p>
        <h1 id="portfolio-hero-title">{headline}</h1>
        <p className={styles.subline}>{subline}</p>
        <div className={styles.actions}>
          <PillButton href="/#work" className={styles.cta}>
            See my work
          </PillButton>
          <PillButton href="/#contact" variant="outline">
            Get in touch
          </PillButton>
        </div>
      </div>
    </section>
  );
}
