"use client";

/*
  LegacyHero.tsx
  Legacy Link Studio hero, a sibling of DewHero: the illustration with an
  animated SVG layer on top, and the headline, subline and button on the left.

  The artwork and the SVG layer share one "stage" box sized like
  object-fit: cover, anchored right. The SVG's viewBox is the artwork's own
  coordinate space (see legacyHeroConfig.ts), so everything lines up and
  scales together.

  Animations wait for the image to load, then start together (data-play).
*/

import { useEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
import PillButton from "@/components/ui/PillButton";
import { type Project } from "@/content/projects";
import DottedPaths from "./DottedPaths";
import DriftingCloud from "./DriftingCloud";
import LoveHeart from "./LoveHeart";
import PaperPlane from "./PaperPlane";
import { ARTWORK, CLOUDS, HEART, PATHS, SUN, VIEW } from "./legacyHeroConfig";
import styles from "./LegacyHero.module.css";

type Props = {
  project: Project;
  headline?: string;
  subline?: string;
  ctaLabel?: string;
};

export default function LegacyHero({
  project,
  headline = "Your love story, made into a film",
  subline = "From how you met to where you are now, told in 60 seconds.",
  ctaLabel = "Start your story",
}: Props) {
  const heroRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const svg = svgRef.current;
    if (!hero || !svg) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Start everything at once, after the artwork has loaded
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      hero.dataset.play = "true";
      if (reduced) return; // the CSS already shows the finished state
      svg
        .querySelectorAll<SVGAnimationElement>("[data-start]")
        .forEach((el) => el.beginElementAt(Number(el.getAttribute("data-start"))));
    };

    const img = hero.querySelector("img");
    if (!img || img.complete) start();
    else {
      img.addEventListener("load", start, { once: true });
      img.addEventListener("error", start, { once: true });
    }

    // Pause the CSS loops and the SVG animations while the hero is off screen
    const observer =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(([entry]) => {
            hero.dataset.paused = entry.isIntersecting ? "false" : "true";
            if (entry.isIntersecting) svg.unpauseAnimations();
            else svg.pauseAnimations();
          });
    observer?.observe(hero);

    return () => {
      img?.removeEventListener("load", start);
      img?.removeEventListener("error", start);
      observer?.disconnect();
    };
  }, []);

  const timing = {
    "--draw": `${PATHS.drawSeconds}s`,
    "--pop-delay": `${PATHS.drawSeconds}s`,
    "--pop": `${HEART.popSeconds}s`,
    "--beat-delay": `${PATHS.drawSeconds + HEART.popSeconds}s`,
    "--beat": `${HEART.beatEvery}s`,
    "--beat-scale": HEART.beatScale,
    "--pulse": `${SUN.pulseSeconds}s`,
  } as CSSProperties;

  return (
    <section ref={heroRef} className={styles.hero} style={timing} aria-labelledby="legacy-hero-title">
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
            ref={svgRef}
            className={styles.layer}
            viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <radialGradient id="legacy-sun-glow">
                <stop offset="0" stopColor="#FFF0B8" stopOpacity="0.65" />
                <stop offset="0.6" stopColor="#FFE08A" stopOpacity="0.25" />
                <stop offset="1" stopColor="#FFE08A" stopOpacity="0" />
              </radialGradient>
              <clipPath id="legacy-sun-clip">
                <path d={SUN.clip} />
              </clipPath>
            </defs>

            <g clipPath="url(#legacy-sun-clip)">
              <circle className={styles.sun} cx={SUN.x} cy={SUN.y} r={SUN.r * 1.05} fill="url(#legacy-sun-glow)" />
            </g>

            {CLOUDS.map((cloud) => (
              <DriftingCloud key={`${cloud.x}-${cloud.y}`} {...cloud} travel={cloud.travel / cloud.scale} />
            ))}

            <DottedPaths />
            <LoveHeart />
            <PaperPlane />
          </svg>
        </div>
        <div className={styles.scrim} />
      </div>

      <div className={`container ${styles.copy}`}>
        <p className="eyebrow">
          Project {project.number} · {project.title}
        </p>
        <h1 id="legacy-hero-title">{headline}</h1>
        <p className={styles.subline}>{subline}</p>
        <PillButton href={project.links[0].href}>{ctaLabel}</PillButton>
      </div>
    </section>
  );
}
