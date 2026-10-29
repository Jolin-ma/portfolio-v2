/*
  DottedPaths.tsx
  Two dotted red paths that draw themselves. The dots are the visible path
  (a round-capped dash pattern); a wide solid stroke inside a mask is what
  actually animates, so the dots stay dotted while the path "grows".
*/

import { PATHS, VIEW } from "./legacyHeroConfig";
import styles from "./LegacyHero.module.css";

const ROUTES = [
  { id: "legacy-draw-left", d: PATHS.left },
  { id: "legacy-draw-right", d: PATHS.right },
];

export default function DottedPaths() {
  return (
    <g>
      <defs>
        {ROUTES.map((route) => (
          <mask key={route.id} id={route.id} maskUnits="userSpaceOnUse" x={0} y={0} width={VIEW.w} height={VIEW.h}>
            {/* pathLength=1 means the dash numbers below are fractions of the path */}
            <path
              className={styles.drawMask}
              d={route.d}
              pathLength={1}
              fill="none"
              stroke="#fff"
              strokeWidth={PATHS.dotSize * 3}
              strokeLinecap="round"
              strokeDasharray={1}
            />
          </mask>
        ))}
      </defs>
      {ROUTES.map((route) => (
        <path
          key={route.id}
          d={route.d}
          fill="none"
          stroke={PATHS.color}
          strokeWidth={PATHS.dotSize}
          strokeLinecap="round"
          strokeDasharray={`0.1 ${PATHS.dotGap}`}
          mask={`url(#${route.id})`}
        />
      ))}
    </g>
  );
}
