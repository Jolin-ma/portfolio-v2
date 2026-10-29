/*
  FeatureBand.tsx
  One full-color homepage band. Most of the homepage is built from these.

  Layouts:
    "split"        artwork fills the left half, text sits on the right
    "splitReverse" text on the left, artwork on the right
    "tile"         a square half-width block: text top-left, link
                   bottom-left, artwork tucked into the bottom-right
                   (put two tiles inside <BandPair> to sit side by side)
    "statement"    a tall band with only text, anchored bottom-left
    "cover"        a wide picture fills the whole band, text sits over
                   its empty left side (on phones: text, then picture)

  On phones every layout stacks: text first, then the artwork.

  `fitMedia` (split layouts): the 4:5 artwork runs the full height of the
  band, top edge to bottom edge, instead of standing in a padded column.
*/

import type { ReactNode } from "react";
import RollLink from "./RollLink";
import type { CurtainTarget } from "@/components/layout/PageCurtain";
import { cssColor, type ColorToken } from "@/content/site";
import styles from "./FeatureBand.module.css";

export type BandLink = {
  label: string;
  href: string;
  curtain?: CurtainTarget;
};

type Props = {
  layout: "split" | "splitReverse" | "tile" | "statement" | "cover";
  bg: ColorToken;
  ink: ColorToken;
  /** Color of the big link word. Defaults to the ink color. */
  accent?: ColorToken;
  title: string;
  text: string;
  /** Optional second paragraph under the text, for a longer description */
  more?: string;
  link?: BandLink;
  media?: ReactNode;
  /** Split layouts only: artwork is exactly as tall as the band */
  fitMedia?: boolean;
  /** Extra content under the text, e.g. the contact form */
  children?: ReactNode;
  id?: string;
};

export default function FeatureBand({ layout, bg, ink, accent = ink, title, text, more, link, media, fitMedia, children, id }: Props) {
  const titleId = id ? `${id}-title` : undefined;
  const external = link?.href.startsWith("http");

  return (
    <section
      id={id}
      className={`${styles.band} ${styles[layout]} ${fitMedia ? styles.fit : ""}`}
      style={{ background: cssColor(bg), color: cssColor(ink) }}
      aria-labelledby={titleId}
    >
      <div className={styles.text}>
        <h2 id={titleId} className={styles.title}>
          {title}
        </h2>
        <p className={styles.body}>{text}</p>
        {more && <p className={`${styles.body} ${styles.more}`}>{more}</p>}
        {children}
        {link && (
          <p className={styles.link} style={{ color: cssColor(accent) }}>
            <RollLink href={link.href} curtain={link.curtain} external={external}>
              {link.label}
            </RollLink>
          </p>
        )}
      </div>

      {media && (
        // Illustrations hide themselves from screen readers; photos keep their alt text
        <div className={styles.media}>
          {media}
        </div>
      )}
    </section>
  );
}

/** Two tiles side by side on desktop, stacked on phones */
export function BandPair({ children }: { children: ReactNode }) {
  return <div className={styles.pair}>{children}</div>;
}
