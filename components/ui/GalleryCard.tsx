"use client";

/*
  GalleryCard.tsx
  One artwork-led gallery item: a tall 2:3 image and the project name.

  The card's images are stacked: the 3:4 `cardArt` illustration shows
  on load, then the 2:3 `cardImage` (both in public/images/cards/). A project
  with neither shows its wide screenshot, or its placeholder illustration
  as a last resort, so a card is never empty.
  Every time the pointer enters the card, the next image wipes up over
  the current one, so each hover shows something new. The image scales
  to 1.03 and an arrow slides in before the name.

  Hover is desktop only (min-width 1025px + a real pointer). On touch
  screens the first image stays on top and a tap opens the case study.
*/

import { useState } from "react";
import Illustration from "./Illustration";
import TransitionLink from "./TransitionLink";
import { caseHref, curtainFor, type Project } from "@/content/projects";
import styles from "./GalleryCard.module.css";

type Layer =
  | { kind: "illustration" }
  | { kind: "photo"; src: string; width: number; height: number };

function layersFor(project: Project): Layer[] {
  const layers: Layer[] = [];
  if (project.cardArt) layers.push({ kind: "photo", src: project.cardArt, width: 660, height: 876 });
  if (project.cardImage) layers.push({ kind: "photo", src: project.cardImage, width: 533, height: 800 });
  if (layers.length) return layers;

  // Fallbacks for a project without card images
  if (project.image) {
    const { src, width, height } = project.image;
    return [{ kind: "photo", src, width, height }];
  }
  return [{ kind: "illustration" }];
}

export default function GalleryCard({ project }: { project: Project }) {
  const layers = layersFor(project);
  const [top, setTop] = useState(0); // the image showing
  const [under, setUnder] = useState<number | null>(null); // the one it's wiping over

  function showNext() {
    if (!window.matchMedia("(min-width: 1025px) and (hover: hover)").matches) return;
    setUnder(top);
    setTop((top + 1) % layers.length);
  }

  return (
    <TransitionLink
      href={caseHref(project)}
      curtain={curtainFor(project)}
      className={styles.card}
      onMouseEnter={showNext}
    >
      {/* data-rolling stays off until the first hover, so nothing animates on page load */}
      <div className={styles.frame} data-rolling={under !== null ? "" : undefined}>
        {layers.map((layer, i) => (
          <div
            key={i}
            className={styles.layer}
            data-state={i === top ? "top" : i === under ? "under" : "hidden"}
          >
            {layer.kind === "illustration" ? (
              <Illustration variant={project.illustration} background={project.color} />
            ) : (
              <img
                src={layer.src}
                width={layer.width}
                height={layer.height}
                alt="" /* decorative here: the link text names the project */
                loading="lazy"
                decoding="async"
              />
            )}
          </div>
        ))}
      </div>

      <h3 className={styles.name}>
        <span className={styles.arrow} aria-hidden="true">
          →
        </span>
        {project.title}
      </h3>
    </TransitionLink>
  );
}
