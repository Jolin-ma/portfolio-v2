/*
  MugSteam.tsx
  A tiny wisp of steam rising from the coffee mug, fading as it goes.
  Two wisps, offset in time so they are never in step.
*/

import type { CSSProperties } from "react";
import { STEAM } from "./portfolioHeroConfig";
import styles from "./PortfolioHero.module.css";

export default function MugSteam() {
  return (
    <g transform={`translate(${STEAM.x} ${STEAM.y})`}>
      {STEAM.delays.map((delay, i) => {
        const style = {
          "--rise": `${-STEAM.rise}px`,
          "--dur": `${STEAM.seconds}s`,
          "--delay": `${delay}s`,
        } as CSSProperties;

        return (
          <g key={delay} transform={`translate(${i === 0 ? -10 : 14} 0)`}>
            <g className={styles.steam} style={style}>
              {/* a wavy wisp */}
              <path d="M0 0C14 -16 -14 -32 0 -48C12 -62 -8 -74 0 -86" fill="none" stroke="#FFF4E2" strokeWidth={7} strokeLinecap="round" />
            </g>
          </g>
        );
      })}
    </g>
  );
}
