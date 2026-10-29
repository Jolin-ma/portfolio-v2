/*
  LeadBubble.tsx
  A small cream speech bubble that pops out near the phone, floats up and a
  little left, and fades out before it reaches the top. One bubble per line of
  text in BUBBLES.texts. They take turns: bubble 2 starts `every` seconds after
  bubble 1, and so on, so one or two are on screen at a time. The text is
  decorative (the whole layer is aria-hidden).
*/

import type { CSSProperties } from "react";
import { BUBBLES, CREAM, NAVY } from "./busySeasonHeroConfig";
import { bubble } from "./busySeasonKeyframes";
import styles from "./BusySeasonHero.module.css";

export default function LeadBubble({ text, index }: { text: string; index: number }) {
  const { height: h, tail, fontSize, charWidth, padding } = BUBBLES;
  // Width from the length of the text; no measuring, so the server and browser agree
  const w = Math.round([...text].length * charWidth + padding);
  const top = -(h + tail);

  const style = {
    "--cycle": `${bubble.total}s`,
    "--delay": `${BUBBLES.firstAt + index * BUBBLES.every}s`,
  } as CSSProperties;

  return (
    // The origin is the tip of the tail; the bubble sits above it
    <g transform={`translate(${BUBBLES.x} ${BUBBLES.y})`}>
      <g className={`${styles.lead}${index === 0 ? ` ${styles.still}` : ""}`} style={style}>
        {/* a soft shadow */}
        <g transform="translate(6 8)" fill={NAVY} fillOpacity={0.18}>
          <rect x={-w / 2} y={top} width={w} height={h} rx={h / 2.4} />
          <path d={`M-30 ${-tail}L30 ${-tail}L0 0Z`} />
        </g>
        <g fill={CREAM}>
          <rect x={-w / 2} y={top} width={w} height={h} rx={h / 2.4} />
          <path d={`M-30 ${-tail - 2}L30 ${-tail - 2}L0 0Z`} />
        </g>
        <text
          x={0}
          y={top + h / 2 + fontSize * 0.34}
          textAnchor="middle"
          fill={NAVY}
          fontSize={fontSize}
          fontWeight={800}
          style={{ fontFamily: "var(--font-body)" }}
        >
          {text}
        </text>
      </g>
    </g>
  );
}
