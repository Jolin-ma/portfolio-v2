/*
  BottleBubbles.tsx
  A little burst of bubbles from the bottom of the bottle every few seconds,
  like it just shifted. Each bubble rises, wobbles and fades, then waits for
  the next burst. The burst is the first ~38% of each cycle; the rest is quiet.
*/

import type { CSSProperties } from "react";
import { BOTTLE_BUBBLES } from "./bottleHeroConfig";
import styles from "./BottleHero.module.css";

export default function BottleBubbles() {
  const { x, y, every, firstAt, bubbles } = BOTTLE_BUBBLES;

  return (
    <g transform={`translate(${x} ${y})`}>
      {bubbles.map((b) => {
        const style = {
          "--rise": `${-b.rise}px`,
          "--cycle": `${every}s`,
          "--delay": `${firstAt + b.at}s`,
          "--sway": "10px",
          "--sway-dur": "5s",
        } as CSSProperties;

        return (
          <g key={b.dx} transform={`translate(${b.dx} 0)`}>
            <g className={styles.burst} style={style}>
              <g className={styles.sway}>
                <circle r={b.r} fill="#CFEFFF" fillOpacity={0.3} stroke="#FFFFFF" strokeOpacity={0.8} strokeWidth={Math.max(2, b.r * 0.14)} />
                <circle cx={-b.r * 0.38} cy={-b.r * 0.38} r={b.r * 0.22} fill="#FFFFFF" fillOpacity={0.9} />
              </g>
            </g>
          </g>
        );
      })}
    </g>
  );
}
