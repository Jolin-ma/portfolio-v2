/*
  Sparkle.tsx
  A four point star that twinkles in place (fade + scale, see .sparkle).
*/

import type { CSSProperties } from "react";
import type { SparkleConfig } from "./dewHeroConfig";
import styles from "./DewHero.module.css";

export default function Sparkle({ x, y, size, dur, delay }: SparkleConfig) {
  const style = {
    "--x": `${x}%`,
    "--y": `${y}%`,
    "--size": `${size}cqw`,
    "--dur": `${dur}s`,
    "--delay": `${delay}s`,
  } as CSSProperties;

  return (
    <span className={styles.sparkle} style={style}>
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 0C13 7 17 11 24 12 17 13 13 17 12 24 11 17 7 13 0 12 7 11 11 7 12 0Z" fill="#F5B841" />
      </svg>
    </span>
  );
}
