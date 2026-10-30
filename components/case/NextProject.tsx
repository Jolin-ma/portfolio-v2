/*
  NextProject.tsx
  Big band at the end of a case study linking to the next project,
  in that project's color.
*/

import Image from "next/image";
import TransitionLink from "@/components/ui/TransitionLink";
import Illustration from "@/components/ui/Illustration";
import { cssColor } from "@/content/site";
import { caseHref, curtainFor, type Project } from "@/content/projects";
import styles from "./NextProject.module.css";

export default function NextProject({ project }: { project: Project }) {
  // With a banner picture the band fills with it and keeps the text (in cream, with a soft shadow)
  const banner = project.bannerArt;

  return (
    <TransitionLink
      href={caseHref(project)}
      curtain={curtainFor(project)}
      className={banner ? `${styles.band} ${styles.withBanner}` : styles.band}
      style={{ background: cssColor(project.color), color: banner ? "#fff4e2" : cssColor(project.ink) }}
    >
      {banner && (
        <Image src={banner} alt="" fill sizes="100vw" className={styles.banner} />
      )}
      <div className={`container ${styles.inner}`}>
        <div>
          <p className="eyebrow">Next project</p>
          <p className={styles.title}>
            {project.title} <span aria-hidden="true">→</span>
          </p>
        </div>
        {!banner && (
          <div className={styles.art}>
            <Illustration variant={project.illustration} background="none" line={project.ink === "cream" ? "cream" : "plum"} />
          </div>
        )}
      </div>
    </TransitionLink>
  );
}
