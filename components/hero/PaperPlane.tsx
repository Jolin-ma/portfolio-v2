/*
  PaperPlane.tsx
  A paper plane that lifts off the little heart and flies laps of a big heart
  outline around the picture. It never fades out. It uses SVG animateMotion so
  it turns to follow the curve.

  A dotted curve draws along behind it on the first lap and stays, so after
  one lap the whole heart is drawn in dots.

  The animations wait (begin="indefinite") and carry data-start, the seconds
  after page start to begin. LegacyHero starts them together, so the lift-off
  lines up with the heart pop.
*/

import { PATHS, PLANE } from "./legacyHeroConfig";
import styles from "./LegacyHero.module.css";

const lap = `${PLANE.lapSeconds}s`;

export default function PaperPlane() {
  return (
    <g className={styles.plane}>
      <defs>
        {/* Draws the dotted heart over one lap, at the same pace as the plane, then stays */}
        <mask id="legacy-trail-mask" maskUnits="userSpaceOnUse" x={0} y={-100} width={2000} height={1331}>
          <path
            d={PLANE.heart}
            pathLength={1}
            fill="none"
            stroke="#fff"
            strokeWidth={PATHS.dotSize * 3}
            strokeLinecap="round"
            strokeDasharray={1}
            strokeDashoffset={1}
          >
            <animate
              data-start={PLANE.firstAt}
              attributeName="stroke-dashoffset"
              from="1"
              to="0"
              dur={lap}
              begin="indefinite"
              fill="freeze"
            />
          </path>
        </mask>
      </defs>

      {/* The dotted heart, cream, revealed behind the plane */}
      <path
        d={PLANE.heart}
        fill="none"
        stroke={PLANE.color}
        strokeWidth={PATHS.dotSize * 0.8}
        strokeLinecap="round"
        strokeDasharray={`0.1 ${PATHS.dotGap}`}
        mask="url(#legacy-trail-mask)"
        opacity={0.7}
      />

      {/* The plane. Drawn pointing right around 0,0, so rotate="auto" lines it up with the curve */}
      <g opacity={0}>
        <g stroke="rgba(110,12,24,0.35)" strokeWidth={1.5} strokeLinejoin="round">
          <path d="M24 0L-20 -14L-7 0Z" fill={PLANE.color} />
          <path d="M24 0L-7 0L-13 12Z" fill={PLANE.shade} />
        </g>
        <animateMotion
          data-start={PLANE.firstAt}
          path={PLANE.heart}
          rotate="auto"
          dur={lap}
          begin="indefinite"
          repeatCount="indefinite"
          calcMode="linear"
        />
        {/* Appears as it lifts off the heart, and stays */}
        <animate data-start={PLANE.firstAt} attributeName="opacity" from="0" to="1" dur="0.6s" begin="indefinite" fill="freeze" />
      </g>
    </g>
  );
}
