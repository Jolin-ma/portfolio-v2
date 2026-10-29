/*
  IntroBurst.tsx
  Eight short navy dashes that pop out around the laptop screen once, as the
  projects come out, then fade (the cartoon "motion lines"). Plays one time.
*/

import type { CSSProperties } from "react";
import { DASHES, INTRO } from "./portfolioHeroConfig";
import styles from "./PortfolioHero.module.css";

export default function IntroBurst() {
  return (
    <g>
      {DASHES.marks.map((mark, i) => {
        const style = {
          "--delay": `${INTRO.start + DASHES.at + i * DASHES.every}s`,
        } as CSSProperties;

        return (
          <g key={mark.angle} transform={`translate(${mark.x} ${mark.y}) rotate(${mark.angle})`}>
            <g className={styles.dash} style={style}>
              <line x1={0} y1={0} x2={DASHES.length} y2={0} stroke={DASHES.color} strokeWidth={DASHES.width} strokeLinecap="round" />
            </g>
          </g>
        );
      })}
    </g>
  );
}
