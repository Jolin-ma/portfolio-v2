/*
  RingMarks.tsx
  The cartoon "it's ringing" marks around the handset: two arcs each side and
  a few dashes above. They pop out from the handset's middle, wiggle and fade,
  twice in a row ("ring ring"), then rest. The keyframes come from the config
  (see busySeasonKeyframes.ts).
*/

import type { CSSProperties } from "react";
import { RING } from "./busySeasonHeroConfig";
import { ring } from "./busySeasonKeyframes";
import styles from "./BusySeasonHero.module.css";

export default function RingMarks() {
  return (
    <g transform={`translate(${RING.x} ${RING.y})`}>
      {RING.marks.map((mark) => {
        const style = {
          "--cycle": `${ring.total}s`,
          "--delay": `${mark.delay}s`,
        } as CSSProperties;

        return (
          <g key={mark.d} className={styles.ring} style={style}>
            <path d={mark.d} fill="none" stroke={mark.color} strokeWidth={RING.strokeWidth} strokeLinecap="round" />
          </g>
        );
      })}
    </g>
  );
}
