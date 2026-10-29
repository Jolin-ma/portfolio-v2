"use client";

/*
  FloatingProject.tsx
  One project object that pops out of the laptop, settles in its resting spot,
  then bobs gently. It is a real link to the project's page (so it is NOT
  hidden from screen readers). On hover or keyboard focus it lifts, stops
  bobbing and shows a small label pill with the project's name.

  Three nested elements so each animates its own transform:
    link  (intro: fly out of the screen, settle)
    bob   (idle: bob and tilt)
    lift  (hover: rise and grow)
*/

import type { CSSProperties } from "react";
import Image from "next/image";
import TransitionLink from "@/components/ui/TransitionLink";
import { caseHref, curtainFor, getProject } from "@/content/projects";
import { INTRO, SCREEN, type FloatConfig } from "./portfolioHeroConfig";
import styles from "./PortfolioHero.module.css";

export default function FloatingProject({ config, index }: { config: FloatConfig; index: number }) {
  const project = getProject(config.slug);
  if (!project) return null;

  const introDelay = INTRO.start + index * INTRO.stagger;

  const style = {
    "--x": `${config.x}%`,
    "--y": `${config.y}%`,
    "--y-m": `${config.mobileY}%`,
    "--size": `${config.size}%`,
    "--rot": `${config.rot}deg`,
    // The laptop screen's center, as an offset from this object's resting spot
    "--from-x": `${SCREEN.x - config.x}cqw`,
    "--from-y": `${SCREEN.y - config.y}cqh`,
    "--from-y-m": `${SCREEN.y - config.mobileY}cqh`,
    "--intro-delay": `${introDelay}s`,
    "--intro": `${INTRO.duration}s`,
    // The bob starts once it has landed
    "--bob-delay": `${introDelay + INTRO.duration}s`,
    "--bob": `${config.bob}px`,
    "--tilt": `${config.tilt}deg`,
    "--bob-dur": `${config.bobSeconds}s`,
    "--drift": `${config.drift}px`,
  } as CSSProperties;

  return (
    <TransitionLink
      href={caseHref(project)}
      curtain={curtainFor(project)}
      className={styles.float}
      style={style}
      aria-label={`View ${config.label} project`}
    >
      <span className={styles.bob}>
        <span className={styles.lift}>
          <Image
            src={config.src}
            alt=""
            width={config.width}
            height={config.height}
            sizes="10vw"
            className={styles.floatImage}
            draggable={false}
          />
          {/* The visible name. The link's aria-label already says it, so this is hidden from screen readers. */}
          <span className={styles.label} aria-hidden="true">
            {config.label}
          </span>
        </span>
      </span>
    </TransitionLink>
  );
}
