/*
  Fish.tsx
  A small navy fish silhouette that swims across the picture. Nested groups
  so each animates its own transform: swim across, drift up and down, and a
  static flip so it faces the way it is swimming.
*/

import type { CSSProperties } from "react";
import { FISH_COLOR, FISH_MARGIN, VIEW, type FishConfig } from "./bottleHeroConfig";
import styles from "./BottleHero.module.css";

export default function Fish({ dir, y, restX, scale, dur, delay, bob, bobDur, opacity, still }: FishConfig) {
  // Start and end just past the edges, measured from the resting spot
  const left = -FISH_MARGIN - restX;
  const right = VIEW.w + FISH_MARGIN - restX;

  const style = {
    "--from": `${dir === 1 ? left : right}px`,
    "--to": `${dir === 1 ? right : left}px`,
    "--dur": `${dur}s`,
    "--delay": `${delay}s`,
    "--bob": `${bob}px`,
    "--bob-dur": `${bobDur}s`,
    "--o": opacity,
  } as CSSProperties;

  return (
    <g transform={`translate(${restX} ${y})`}>
      <g className={`${dir === 1 ? styles.swimRight : styles.swimLeft}${still ? ` ${styles.still}` : ""}`} style={style}>
        <g className={styles.bob}>
          {/* drawn facing right; dir -1 flips it */}
          <g transform={`scale(${dir * scale} ${scale})`}>
            <path d="M-34 0C-16 -20 22 -20 44 0C22 20 -16 20 -34 0Z" fill={FISH_COLOR} />
            <path d="M-30 0L-62 -20L-62 20Z" fill={FISH_COLOR} />
            <path d="M-4 -14C2 -28 14 -30 20 -24C14 -20 8 -16 -4 -14Z" fill={FISH_COLOR} />
            <circle cx="28" cy="-4" r="3.2" fill="#8FC7EE" />
          </g>
        </g>
      </g>
    </g>
  );
}
