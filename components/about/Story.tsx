/*
  Story.tsx
  "My story so far": short chapters, each a large centered illustration
  followed by one paragraph, on a full-width band in the art's own
  paper color, with the words set like the hero's subline.
*/

import Illustration, { type IllustrationVariant } from "@/components/ui/Illustration";
import Reveal from "@/components/ui/Reveal";
import { story } from "@/content/about";
import styles from "./Story.module.css";

// Placeholder art for chapters without a photo, in order
const placeholders: IllustrationVariant[] = ["clapper", "window", "gardener"];

export default function Story() {
  return (
    <section className={styles.story} aria-labelledby="story-title">
      <h2 id="story-title" className={styles.title}>
        My story so far.
      </h2>
      <ol role="list" className={styles.chapters}>
        {story.map((chapter, i) => (
          <li key={i}>
            <Reveal>
              <div className={styles.media}>
                {chapter.image ? (
                  <img
                    src={chapter.image.src}
                    width={chapter.image.width}
                    height={chapter.image.height}
                    alt={chapter.image.alt}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <Illustration variant={placeholders[i % placeholders.length]} background={chapter.color} />
                )}
              </div>
              <p className={styles.text}>{chapter.text}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
