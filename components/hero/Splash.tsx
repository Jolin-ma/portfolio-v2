/*
  Splash.tsx
  Every few seconds, 2 or 3 small droplets pop up where the bottle neck meets
  the water, arc out and fall back. The outer group moves sideways at a steady
  pace; the inner group does the up and down, so together they trace an arc.
  The splash is the first ~13% of each cycle; the rest is quiet.
*/

import type { CSSProperties } from "react";
import { SPLASH } from "./bottleHeroConfig";
import styles from "./BottleHero.module.css";

export default function Splash() {
  return (
    <g transform={`translate(${SPLASH.x} ${SPLASH.y})`} className={styles.splash}>
      {SPLASH.drops.map((d) => {
        const style = {
          "--dx": `${d.dx}px`,
          "--up": `${-d.up}px`,
          "--cycle": `${SPLASH.every}s`,
          "--delay": `${SPLASH.firstAt + d.at}s`,
        } as CSSProperties;

        return (
          <g key={d.dx} className={styles.splashX} style={style}>
            <g className={styles.splashY}>
              {/* a round drop with a pointed top */}
              <path d={`M0 ${-d.r * 1.8}C${d.r * 0.5} ${-d.r * 0.8} ${d.r} ${-d.r * 0.4} ${d.r} 0A${d.r} ${d.r} 0 0 1 ${-d.r} 0C${-d.r} ${-d.r * 0.4} ${-d.r * 0.5} ${-d.r * 0.8} 0 ${-d.r * 1.8}Z`} fill="#FFFFFF" fillOpacity={0.95} />
            </g>
          </g>
        );
      })}
    </g>
  );
}
