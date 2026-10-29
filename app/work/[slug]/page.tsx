/*
  work/[slug]/page.tsx
  The one case study template. Every project in content/projects.ts gets
  its own page at build time (generateStaticParams), so the static export
  contains /work/<slug>/index.html for each.
*/

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseHeader from "@/components/case/CaseHeader";
import CaseSection from "@/components/case/CaseSection";
import ChallengePlaceholder from "@/components/case/ChallengePlaceholder";
import NextProject from "@/components/case/NextProject";
import BottleHero from "@/components/hero/BottleHero";
import BusySeasonHero from "@/components/hero/BusySeasonHero";
import DewHero from "@/components/hero/DewHero";
import PortfolioHero from "@/components/hero/PortfolioHero";
import LegacyHero from "@/components/hero/LegacyHero";
import { projects, getProject, getNextProject } from "@/content/projects";
import styles from "./case.module.css";

type Params = { params: Promise<{ slug: string }> };

// Only the slugs listed in projects.ts exist; anything else is a 404
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const project = getProject((await params).slug);
  return project ? { title: project.title, description: project.summary } : {};
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const next = getNextProject(slug);

  return (
    <article>
      {slug === "dewstick" ? (
        <DewHero project={project} />
      ) : slug === "legacy-link-studio" ? (
        <LegacyHero project={project} />
      ) : slug === "message-in-a-bottle" ? (
        <BottleHero project={project} />
      ) : slug === "busy-season" ? (
        <BusySeasonHero project={project} />
      ) : slug === "this-portfolio" ? (
        <PortfolioHero />
      ) : (
        <CaseHeader project={project} />
      )}

      <CaseSection id="idea" title="The idea">
        <p className="lead">{project.idea}</p>
      </CaseSection>

      <CaseSection id="designed" title="What I designed">
        <ul>
          {project.designed.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        {project.image && (
          <figure className={styles.shot}>
            <img
              src={project.image.src}
              width={project.image.width}
              height={project.image.height}
              alt={project.image.alt}
              loading="lazy"
              decoding="async"
            />
            <figcaption>The finished homepage. Figma frames and before and after views coming soon.</figcaption>
          </figure>
        )}
      </CaseSection>

      <CaseSection id="built" title="What I built">
        <p>{project.built.intro}</p>

        {project.built.stack.length > 0 ? (
          <ul role="list" className={styles.stack} aria-label="Stack">
            {project.built.stack.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
        ) : (
          <p className={styles.note}>Stack details coming soon.</p>
        )}

        {/* How the pieces connect: an ordered list drawn as a flow diagram */}
        {project.built.diagram.length > 0 && (
          <ol role="list" className={styles.diagram} aria-label="How the pieces connect">
            {project.built.diagram.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        )}
      </CaseSection>

      <CaseSection id="challenge" title="The challenge">
        {project.challenge ? <p>{project.challenge}</p> : <ChallengePlaceholder />}
      </CaseSection>

      <CaseSection id="links" title="Links">
        <ul role="list" className={styles.links}>
          {project.links.map((link) => (
            <li key={link.href}>
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label} <span aria-hidden="true">↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              {link.note && <span className={styles.linkNote}> ({link.note})</span>}
            </li>
          ))}
        </ul>
      </CaseSection>

      <NextProject project={next} />
    </article>
  );
}
