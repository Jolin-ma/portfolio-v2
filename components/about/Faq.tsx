/*
  Faq.tsx
  Frequently asked questions as an accordion.
  Built on native <details>/<summary>: keyboard and screen reader
  support come free, and it works without JavaScript.
*/

import { faq } from "@/content/about";
import styles from "./Faq.module.css";

export default function Faq() {
  return (
    <section className={styles.faq} aria-labelledby="faq-title">
      <h2 id="faq-title" className={styles.title}>
        Frequently asked questions
      </h2>
      <div className={styles.list}>
        {faq.map((item) => (
          <details key={item.question} className={styles.item}>
            <summary className={styles.question}>
              {item.question}
              <span className={styles.plus} aria-hidden="true" />
            </summary>
            <div className={styles.answer}>
              {item.answer.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
