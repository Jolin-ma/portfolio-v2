/*
  About.tsx
  Two square tiles side by side: who Jolin is (with an illustrated
  portrait tucked into the corner) and the skills (with the pegboard of
  tools). Each tile uses its art's own background color, so the art
  blends in with no frame.
*/

import FeatureBand, { BandPair } from "@/components/ui/FeatureBand";
import { bands } from "@/content/site";
import styles from "./About.module.css";

export default function About() {
  return (
    <BandPair>
      <FeatureBand
        id="about"
        layout="tile"
        bg="paper" /* same white as the portrait art's background */
        ink="plum"
        {...bands.about}
        media={<img className={styles.photo} src="/images/bands/me-illustration.webp" width={720} height={900} alt="Illustrated portrait of Jolin Ma in a yellow top" loading="lazy" decoding="async" />}
      />
      <FeatureBand
        id="skills"
        layout="tile"
        bg="sapphire" /* same blue as the pegboard art's background */
        ink="cream"
        {...bands.skills}
        media={
          <img className={styles.photo} src="/images/bands/skills.webp" width={720} height={900} alt="A pegboard of design and code tools: pencil, ruler, paintbrush, laptop, code brackets, gear, clapperboard, shopping bag, chat bubble and paper plane" loading="lazy" decoding="async" />
        }
      />
    </BandPair>
  );
}
