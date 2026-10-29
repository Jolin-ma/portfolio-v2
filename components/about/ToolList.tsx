/*
  ToolList.tsx
  Every tool in one big centered run of names, separated by commas.
  Tools used in a case study are highlighted and link to it.
*/

import TransitionLink from "@/components/ui/TransitionLink";
import { tools } from "@/content/about";
import { getProject, caseHref, curtainFor } from "@/content/projects";
import styles from "./ToolList.module.css";

export default function ToolList() {
  return (
    <section className={styles.tools} aria-labelledby="tools-title">
      <h2 id="tools-title" className={styles.label}>
        Tools I work with
      </h2>
      <ul role="list" className={styles.list}>
        {tools.map((tool, i) => {
          const project = tool.slug ? getProject(tool.slug) : undefined;
          const comma = i < tools.length - 1 ? "," : "";
          return (
            <li key={tool.name}>
              {project ? (
                <TransitionLink
                  href={caseHref(project)}
                  curtain={curtainFor(project)}
                  className={styles.linked}
                  title={`Used in ${project.title}`}
                >
                  {tool.name}
                  {comma}
                </TransitionLink>
              ) : (
                <>
                  {tool.name}
                  {comma}
                </>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
