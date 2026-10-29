/*
  Smoke.tsx
  Soft cream puffs rising from the chimney: each starts small and clear, grows
  as it climbs and sways sideways, and fades out. Slow and loopy.
  The staggered delays (SMOKE.puffs) keep the puffs from lining up.
*/

import type { CSSProperties } from "react";
import { CREAM, SMOKE } from "./busySeasonHeroConfig";
import styles from "./BusySeasonHero.module.css";

export default function Smoke() {
  return (
    <g transform={`translate(${SMOKE.x} ${SMOKE.y})`}>
      {SMOKE.puffs.map((puff) => {
        const style = {
          "--dx": `${puff.dx}px`,
          "--rise": `${-SMOKE.rise}px`,
          "--dur": `${puff.dur}s`,
          "--delay": `${puff.delay}s`,
          // where it rests when motion is reduced
          "--rx": `${puff.rest.x}px`,
          "--ry": `${puff.rest.y}px`,
          "--rs": puff.rest.scale,
        } as CSSProperties;

        return (
          <g key={puff.delay} className={styles.puff} style={style}>
            {/* three overlapping circles make a soft puff */}
            <g fill={CREAM}>
              <circle cx={-puff.r * 0.5} cy={puff.r * 0.2} r={puff.r * 0.8} />
              <circle cx={0} cy={-puff.r * 0.1} r={puff.r} />
              <circle cx={puff.r * 0.7} cy={puff.r * 0.25} r={puff.r * 0.7} />
            </g>
          </g>
        );
      })}
    </g>
  );
}
