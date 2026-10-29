/*
  Drop.tsx
  One falling water drop. Two nested elements so each can animate its own
  transform: the outer one falls, the inner one sways.
*/

import type { CSSProperties } from "react";
import type { DropConfig } from "./dewHeroConfig";
import styles from "./DewHero.module.css";

export default function Drop({ x, y, size, dur, delay, swayDur, sway, opacity }: DropConfig) {
  const style = {
    "--x": `${x}%`,
    "--y": `${y}cqh`,
    "--size": `${size}cqw`,
    "--dur": `${dur}s`,
    "--delay": `${delay}s`,
    "--sway-dur": `${swayDur}s`,
    "--sway": `${sway}cqw`,
    "--o": opacity,
  } as CSSProperties;

  // Quiet drops are the ones over the headline; the CSS fades them further
  const quiet = x < 44 ? ` ${styles.quiet}` : "";

  return (
    <span className={`${styles.drop}${quiet}`} style={style}>
      <svg className={styles.sway} viewBox="0 0 40 56" aria-hidden="true" focusable="false">
        <path d="M20 2C20 2 4 26 4 38a16 16 0 0 0 32 0C36 26 20 2 20 2Z" fill="#7CCBE0" />
        {/* the small white highlight */}
        <path d="M12 38c0-4 1.5-8 4-11" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" fill="none" opacity="0.85" />
      </svg>
    </span>
  );
}
