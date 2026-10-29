/*
  BusyCloud.tsx
  A cream cloud that drifts slowly to the right, fading in and out at the ends
  of its drift. The outer group places it; the inner group moves.
*/

import type { CSSProperties } from "react";
import { CLOUD_COLOR, type CloudConfig } from "./busySeasonHeroConfig";
import styles from "./BusySeasonHero.module.css";

export default function BusyCloud({ x, y, scale, travel, dur, delay }: CloudConfig) {
  const style = {
    // the drift is measured inside the scaled group, so undo the scale
    "--travel": `${travel / scale}px`,
    "--dur": `${dur}s`,
    "--delay": `${delay}s`,
  } as CSSProperties;

  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <g className={styles.cloud} style={style}>
        <path
          d="M0 60H160C160 48 150 40 138 40C138 24 120 14 104 20C96 4 66 2 56 22C38 16 20 28 22 42C8 42 0 50 0 60Z"
          fill={CLOUD_COLOR}
        />
      </g>
    </g>
  );
}
