/*
  TubeDrip.tsx
  The signature moment: one drop slides down the front of the tube, then
  fades out near the base. Position and travel come from DRIP in the config.
*/

import type { CSSProperties } from "react";
import { DRIP } from "./dewHeroConfig";
import styles from "./DewHero.module.css";

export default function TubeDrip() {
  const style = {
    "--x": `${DRIP.x}%`,
    "--y": `${DRIP.startY}%`,
    "--size": `${DRIP.size}cqw`,
    "--travel": `${DRIP.travel}cqh`,
    "--cycle": `${DRIP.cycle}s`,
  } as CSSProperties;

  return (
    <span className={styles.drip} style={style}>
      <svg viewBox="0 0 40 56" aria-hidden="true" focusable="false">
        <path d="M20 2C20 2 4 26 4 38a16 16 0 0 0 32 0C36 26 20 2 20 2Z" fill="#7CCBE0" />
        <path d="M12 38c0-4 1.5-8 4-11" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" fill="none" opacity="0.9" />
      </svg>
    </span>
  );
}
