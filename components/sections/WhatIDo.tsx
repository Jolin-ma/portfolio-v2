/*
  WhatIDo.tsx
  "What I do": one cream band with two lanes side by side, Build and
  Run the store. Each lane has a line of text, its tools as pills and
  one big link. Stacks on phones. Words live in content/site.ts.
*/

import RollLink from "@/components/ui/RollLink";
import Reveal from "@/components/ui/Reveal";
import { whatIDo } from "@/content/site";
import styles from "./WhatIDo.module.css";

export default function WhatIDo() {
  return (
    <section id="what-i-do" className={styles.band} aria-labelledby="what-i-do-title">
      <h2 id="what-i-do-title" className={styles.title}>
        {whatIDo.title}
      </h2>
      <div className={styles.lanes}>
        {whatIDo.lanes.map((lane) => (
          <Reveal key={lane.title} className={styles.lane}>
            <h3 className={styles.laneTitle}>{lane.title}</h3>
            <p className={styles.text}>{lane.text}</p>
            <ul role="list" className={styles.items} aria-label={`${lane.title}: tools and tasks`}>
              {lane.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className={styles.link}>
              <RollLink href={lane.link.href} curtain={"curtain" in lane.link ? lane.link.curtain : undefined}>
                {lane.link.label}
              </RollLink>
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
