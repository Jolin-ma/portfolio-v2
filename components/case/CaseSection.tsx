/*
  CaseSection.tsx
  One chapter of a case study: a heading column and a content column.
  On desktop they sit side by side; on smaller screens they stack.
*/

import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import styles from "./CaseSection.module.css";

export default function CaseSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section className={styles.section} aria-labelledby={id}>
      <Reveal className={`container ${styles.split}`}>
        <h2 id={id} className={styles.title}>
          {title}
        </h2>
        <div className={styles.body}>{children}</div>
      </Reveal>
    </section>
  );
}
