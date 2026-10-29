/*
  Illustration.tsx
  Placeholder artwork until the real illustrations exist.

  Each motif is drawn once as plain shapes, then rendered twice:
    1. a fill copy, shifted a few units and given paper grain (the riso ink)
    2. an outline copy on top, in plum, slightly wobbly
  The small offset between the two is the "misregistered print" look.

  To swap in real artwork later, pass `src` and the SVG is skipped.
*/

import { useId, type CSSProperties, type ReactNode } from "react";
import { cssColor, type ColorToken } from "@/content/site";
import styles from "./Illustration.module.css";

export type IllustrationVariant =
  | "bottle"
  | "clapper"
  | "balm"
  | "reel"
  | "window"
  | "gardener";

type Props = {
  variant: IllustrationVariant;
  /** Background field. "none" lets the parent's background show through. */
  background: ColorToken | "none";
  /** Outline color. Plum by default, cream on dark backgrounds. */
  line?: ColorToken;
  /** Turns on the small looping movements */
  animated?: boolean;
  /** Real artwork. When set, the SVG placeholder is not drawn. */
  src?: string;
  alt?: string;
  className?: string;
};

/** Shorthand for a token fill, so the motifs below stay readable */
const f = (token: ColorToken | "subject"): CSSProperties => ({
  fill: token === "subject" ? "var(--illo-subject, var(--cream))" : cssColor(token),
});

/*
  Motifs. viewBox is 400 x 500 (a tall card).
  backdrop = background shapes, no outline (rule: no outline on background)
  shapes   = the subject, filled AND outlined
  details  = plum marks drawn once: eyes, arms, stems, ladder rungs
*/
type Motif = { backdrop?: ReactNode; shapes: ReactNode; details?: ReactNode };

const motifs: Record<IllustrationVariant, Motif> = {
  // Message in a bottle: a tipped bottle, letters drifting down into a pile
  bottle: {
    backdrop: (
      <g style={f("cream")}>
        <rect className={styles.fall} x="70" y="300" width="18" height="18" rx="5" />
        <rect className={`${styles.fall} ${styles.delay1}`} x="110" y="250" width="14" height="14" rx="4" />
        <rect className={`${styles.fall} ${styles.delay2}`} x="300" y="330" width="16" height="16" rx="5" />
        <rect x="40" y="440" width="22" height="22" rx="6" />
        <rect x="66" y="446" width="18" height="18" rx="5" />
        <rect x="88" y="438" width="24" height="24" rx="6" />
        <rect x="116" y="448" width="16" height="16" rx="5" />
        <rect x="54" y="420" width="18" height="18" rx="5" />
        <rect x="78" y="424" width="16" height="16" rx="5" />
        <rect x="136" y="444" width="20" height="20" rx="6" />
      </g>
    ),
    shapes: (
      <g transform="rotate(-24 240 250)">
        <rect x="170" y="160" width="140" height="230" rx="54" style={f("cream")} />
        <rect x="210" y="104" width="60" height="76" rx="16" style={f("cream")} />
        <rect x="214" y="76" width="52" height="36" rx="10" style={f("tomato")} />
        <rect x="200" y="225" width="80" height="110" rx="14" style={f("marigold")} />
      </g>
    ),
    details: (
      <g transform="rotate(-24 240 250)" className={styles.ink}>
        <path d="M216 255 h48 M216 278 h36 M216 301 h44" />
      </g>
    ),
  },

  // Busy Season: a phone far too big for the tiny person pressing play
  clapper: {
    shapes: (
      <>
        <rect x="150" y="90" width="200" height="340" rx="36" style={f("cream")} />
        <rect x="172" y="122" width="156" height="270" rx="14" style={f("tomato")} />
        <path d="M232 214 L290 256 L232 298 Z" style={f("cream")} />
        <rect x="62" y="372" width="26" height="50" rx="12" style={f("pool")} />
        <circle cx="75" cy="358" r="9" style={f("cream")} />
      </>
    ),
    details: (
      <g className={styles.ink}>
        <path className={styles.wave} d="M86 384 C110 370 128 352 146 336" />
        <circle className={styles.wave} cx="148" cy="334" r="6" />
        <path d="M70 422 v26 M82 422 v26" />
        <circle cx="72" cy="356" r="1.8" className={styles.dot} />
        <circle cx="79" cy="356" r="1.8" className={styles.dot} />
      </g>
    ),
  },

  // Dewstick: one giant balm with a leaf growing beside it
  balm: {
    shapes: (
      <g transform="rotate(10 230 270)">
        <rect x="170" y="230" width="120" height="210" rx="28" style={f("cream")} />
        <rect x="186" y="110" width="88" height="140" rx="40" style={f("tomato")} />
        <rect x="170" y="226" width="120" height="30" rx="8" style={f("cream")} />
      </g>
    ),
    details: (
      <>
        <g className={styles.sway}>
          <path d="M110 430 C80 370 92 316 132 280 C150 330 146 390 110 430 Z" style={f("pistachio")} className={styles.leaf} />
          <path d="M110 430 C112 380 120 330 132 290" className={styles.inkLine} />
        </g>
      </>
    ),
  },

  // Legacy Link Studio: a huge film reel and a small floating heart
  reel: {
    shapes: (
      <>
        <path d="M150 360 H330 V404 H150 Z" style={f("cream")} />
        <circle className={styles.spin} cx="250" cy="250" r="118" style={f("cream")} />
        <path
          className={styles.bob}
          d="M100 176 C80 150 104 124 124 146 C144 124 168 150 148 176 L124 202 Z"
          style={f("tomato")}
        />
      </>
    ),
    details: (
      <g className={styles.spin} style={{ transformOrigin: "250px 250px" }}>
        <circle cx="250" cy="180" r="24" style={f("pistachio")} />
        <circle cx="317" cy="228" r="24" style={f("pistachio")} />
        <circle cx="291" cy="307" r="24" style={f("pistachio")} />
        <circle cx="209" cy="307" r="24" style={f("pistachio")} />
        <circle cx="183" cy="228" r="24" style={f("pistachio")} />
        <circle cx="250" cy="250" r="12" className={styles.dot} />
      </g>
    ),
  },

  // This portfolio: a browser window and a cursor much too big for it
  window: {
    shapes: (
      <>
        <rect x="60" y="130" width="270" height="210" rx="22" style={f("cream")} />
        <path d="M130 340 A70 70 0 0 1 270 340 Z" style={f("marigold")} />
        <path
          className={styles.bob}
          d="M240 250 L240 450 L284 410 L312 468 L342 454 L314 398 L370 392 Z"
          style={f("tomato")}
        />
      </>
    ),
    details: (
      <g className={styles.ink}>
        <path d="M60 176 H330" />
        <circle cx="88" cy="153" r="6" className={styles.dot} />
        <circle cx="108" cy="153" r="6" className={styles.dot} />
        <circle cx="128" cy="153" r="6" className={styles.dot} />
      </g>
    ),
  },

  // Hero: a tiny gardener on a ladder, watering a giant cursor sprouting leaves
  gardener: {
    shapes: (
      <>
        <path
          d="M210 150 L210 420 L268 366 L304 448 L340 432 L304 352 L380 346 Z"
          style={f("subject")}
        />
        <g className={styles.sway} style={{ transformOrigin: "214px 150px" }}>
          <path d="M214 96 C180 80 160 100 168 122 C192 128 210 116 214 96 Z" style={f("pistachio")} />
          <path d="M218 70 C250 46 276 62 270 88 C244 96 222 88 218 70 Z" style={f("pistachio")} />
        </g>
        <rect x="104" y="226" width="26" height="46" rx="12" style={f("tomato")} />
        <circle cx="117" cy="212" r="10" style={f("cream")} />
        <rect x="144" y="196" width="34" height="24" rx="7" style={f("marigold")} />
      </>
    ),
    details: (
      <g className={styles.ink}>
        <path className={styles.sway} style={{ transformOrigin: "214px 150px" }} d="M212 150 C210 128 214 108 216 80" />
        <path d="M88 470 L118 286 M140 470 L162 300" />
        <path d="M95 430 H146 M101 390 H151 M107 350 H156 M113 310 H160" />
        <path d="M128 240 C138 230 142 220 148 210" />
        <path d="M110 272 v24 M122 272 v24" />
        <path d="M178 202 L196 190" />
        <circle cx="113" cy="210" r="1.8" className={styles.dot} />
        <circle cx="120" cy="210" r="1.8" className={styles.dot} />
        <g className={styles.drip} style={f("pool")}>
          <circle cx="198" cy="196" r="4" />
          <circle cx="204" cy="214" r="3.5" />
          <circle cx="200" cy="232" r="3" />
        </g>
      </g>
    ),
  },
};

export default function Illustration({
  variant,
  background,
  line = "plum",
  animated = false,
  src,
  alt = "",
  className = "",
}: Props) {
  // Filter ids must be unique per instance, and safe inside url(#...)
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const grainId = `grain-${uid}`;
  const wobbleId = `wobble-${uid}`;

  if (src) {
    return <img className={`${styles.root} ${className}`} src={src} alt={alt} />;
  }

  const motif = motifs[variant];
  const style = {
    "--illo-line": cssColor(line),
  } as CSSProperties;

  return (
    <svg
      className={`${styles.root} ${animated ? styles.animated : ""} ${className}`}
      style={style}
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* Paper grain: grey noise multiplied into the fill colors */}
        <filter id={grainId} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" result="noise" />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0.35 0 0 0 0.72  0.35 0 0 0 0.72  0.35 0 0 0 0.72  0 0 0 0 1"
            result="grey"
          />
          <feComposite in="grey" in2="SourceGraphic" operator="in" result="grain" />
          <feBlend in="SourceGraphic" in2="grain" mode="multiply" />
        </filter>
        {/* Slight hand-drawn wobble on the outlines */}
        <filter id={wobbleId}>
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="3" />
          <feDisplacementMap in="SourceGraphic" scale="3" />
        </filter>
      </defs>

      {background !== "none" && (
        <rect width="400" height="500" style={{ fill: cssColor(background) }} />
      )}

      {motif.backdrop}

      {/* 1. Fills: shifted a little, with grain */}
      <g transform="translate(4 3)" filter={`url(#${grainId})`}>
        {motif.shapes}
      </g>

      {/* 2. Outlines: same shapes, no fill */}
      <g className={styles.lines} filter={`url(#${wobbleId})`}>
        {motif.shapes}
      </g>

      {motif.details && <g filter={`url(#${wobbleId})`}>{motif.details}</g>}
    </svg>
  );
}
