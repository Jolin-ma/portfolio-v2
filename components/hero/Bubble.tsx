/*
  Bubble.tsx
  One rising bubble. Two nested groups so each animates its own transform:
  the outer one rises, the inner one wobbles side to side.
*/

import type { CSSProperties } from "react";
import { BUBBLE_RISE, type BubbleConfig } from "./bottleHeroConfig";
import styles from "./BottleHero.module.css";

export default function Bubble({ x, y, r, dur, delay, sway, swayDur, opacity, still }: BubbleConfig) {
  const style = {
    // The rise is drawn relative to the bubble's resting spot
    "--from": `${BUBBLE_RISE.startY - y}px`,
    "--to": `${BUBBLE_RISE.endY - y}px`,
    "--dur": `${dur}s`,
    "--delay": `${delay}s`,
    "--sway": `${sway}px`,
    "--sway-dur": `${swayDur}s`,
    "--o": opacity,
  } as CSSProperties;

  return (
    <g transform={`translate(${x} ${y})`}>
      <g className={`${styles.bubble}${still ? ` ${styles.still}` : ""}`} style={style}>
        <g className={styles.sway}>
          <circle r={r} fill="#CFEFFF" fillOpacity={0.3} stroke="#FFFFFF" strokeOpacity={0.75} strokeWidth={Math.max(2, r * 0.14)} />
          {/* the small highlight */}
          <circle cx={-r * 0.38} cy={-r * 0.38} r={r * 0.22} fill="#FFFFFF" fillOpacity={0.9} />
        </g>
      </g>
    </g>
  );
}
