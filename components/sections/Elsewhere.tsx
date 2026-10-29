/*
  Elsewhere.tsx
  Four tall cards linking out (GitHub, Figma, the old portfolio): title
  at the top, the artwork filling the bottom. Each card takes its art's
  background color, so there's no visible edge around the picture.
*/

import { cssColor, elsewhere } from "@/content/site";
import styles from "./Elsewhere.module.css";

export default function Elsewhere() {
  return (
    <section className={styles.elsewhere} aria-labelledby="elsewhere-title">
      <h2 id="elsewhere-title" className={styles.title}>
        Elsewhere.
      </h2>
      <ul role="list" className={styles.grid}>
        {elsewhere.map((item) => (
          <li key={item.href}>
            <a
              className={styles.card}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ background: item.bg, color: cssColor(item.ink) }}
            >
              <span className={styles.cardTitle}>
                {item.title}
                <span className="sr-only"> (opens in a new tab)</span>
              </span>
              {/* Decorative: the card title says where the link goes */}
              <img className={styles.art} src={item.image} width={540} height={717} alt="" loading="lazy" decoding="async" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
