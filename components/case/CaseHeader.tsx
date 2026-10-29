/*
  CaseHeader.tsx
  Top band of a case study, in the project's color, with its illustration.
*/

import Illustration from "@/components/ui/Illustration";
import { cssColor } from "@/content/site";
import { formatDate, type Project } from "@/content/projects";
import styles from "./CaseHeader.module.css";

export default function CaseHeader({ project }: { project: Project }) {
  return (
    <header className={styles.band} style={{ background: cssColor(project.color), color: cssColor(project.ink) }}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.text}>
          <p className="eyebrow">
            Project {project.number} · <time dateTime={project.date}>{formatDate(project.date)}</time>
          </p>
          <h1>{project.title}</h1>
          <p className="lead">{project.summary}</p>
          <ul role="list" className={styles.tags} aria-label="Tags">
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
        <div className={styles.art}>
          <Illustration
            variant={project.illustration}
            background="none"
            line={project.ink === "cream" ? "cream" : "plum"}
            animated
          />
        </div>
      </div>
    </header>
  );
}
