/*
  Gallery.tsx
  "Selected work" as an artwork-led gallery: an intro statement, then
  rows of four tall images with the project name centered underneath,
  then one centered link. On phones the gallery becomes a swipe row.
  Used on the homepage and again at the bottom of the About page.
*/

import GalleryCard from "@/components/ui/GalleryCard";
import RollLink from "@/components/ui/RollLink";
import Reveal from "@/components/ui/Reveal";
import ArrowDot from "@/components/ui/ArrowDot";
import { site } from "@/content/site";
import { featuredProjects, getProject, caseHref, curtainFor } from "@/content/projects";
import styles from "./Gallery.module.css";

export default function Gallery({ id = "work", intro = site.about }: { id?: string; intro?: string }) {
  const portfolio = getProject("this-portfolio");

  return (
    <section id={id} className={styles.gallery} aria-labelledby={`${id}-title`}>
      <div className={styles.intro}>
        <p>{intro}</p>
      </div>

      <h2 id={`${id}-title`} className="sr-only">
        Selected work
      </h2>
      <ul role="list" className={styles.grid}>
        {featuredProjects.map((project, i) => (
          <li key={project.slug} className={styles.item}>
            <Reveal delay={i * 90}>
              <GalleryCard project={project} />
            </Reveal>
          </li>
        ))}
      </ul>

      {portfolio && (
        <p className={styles.more}>
          <ArrowDot />
          <RollLink href={caseHref(portfolio)} curtain={curtainFor(portfolio)}>
            See how this site was built.
          </RollLink>
        </p>
      )}
    </section>
  );
}
