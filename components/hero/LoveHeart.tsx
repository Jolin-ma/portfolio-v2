/*
  LoveHeart.tsx
  The heart, redrawn on top of the one in the artwork. The outer group does
  the one soft pop when the paths arrive; the inner group does the slow
  heartbeat after that.
*/

import { HEART } from "./legacyHeroConfig";
import styles from "./LegacyHero.module.css";

export default function LoveHeart() {
  return (
    // The origin of this group is the heart's bottom tip
    <g transform={`translate(${HEART.x} ${HEART.y})`}>
      <g className={styles.heartPop}>
        <g className={styles.heartBeat}>
          {/* A 100 x 88 heart, moved so its tip sits at 0,0 and scaled to the artwork's heart */}
          <path
            transform="scale(0.95 0.82) translate(-50 -88)"
            d="M50 88C20 62 2 46 2 26C2 11 13 2 27 2C37 2 45 8 50 16C55 8 63 2 73 2C87 2 98 11 98 26C98 46 80 62 50 88Z"
            fill={HEART.color}
          />
        </g>
      </g>
    </g>
  );
}
