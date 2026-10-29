/*
  LightRays.tsx
  A few soft white rays slanting down through the water beside the bottle,
  each fading in and out on its own timing, like sunlight shimmering.
*/

import type { CSSProperties } from "react";
import { RAYS, RAYS_ORIGIN } from "./bottleHeroConfig";
import styles from "./BottleHero.module.css";

export default function LightRays() {
  return (
    <g transform={`translate(${RAYS_ORIGIN.x} ${RAYS_ORIGIN.y})`}>
      <defs>
        {/* brightest at the top of a ray, gone by the bottom */}
        <linearGradient id="bottle-ray" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>
      {RAYS.map((ray) => {
        const style = {
          "--dur": `${ray.dur}s`,
          "--delay": `${ray.delay}s`,
          "--peak": ray.peak,
        } as CSSProperties;
        const half = ray.width / 2;

        return (
          <g key={ray.angle} transform={`rotate(${ray.angle})`}>
            <path className={styles.ray} style={style} d={`M-20 0L20 0L${half} ${ray.length}L${-half} ${ray.length}Z`} fill="url(#bottle-ray)" />
          </g>
        );
      })}
    </g>
  );
}
