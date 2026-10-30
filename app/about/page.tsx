/*
  about/page.tsx
  The About page. Top to bottom: hero with portrait, story, behind the
  counter (the retail job), tools, two tiles, then the gallery
  again to lead back into the work. Words live in content/about.ts and content/site.ts.
*/

import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import Story from "@/components/about/Story";
import BehindTheCounter from "@/components/about/BehindTheCounter";
import ToolList from "@/components/about/ToolList";
import Gallery from "@/components/sections/Gallery";
import FeatureBand, { BandPair } from "@/components/ui/FeatureBand";
import LoopVideo from "@/components/ui/LoopVideo";
import { bands } from "@/content/site";
import styles from "@/components/sections/About.module.css";

export const metadata: Metadata = {
  title: "About",
  description: "Jolin Ma is a web designer, front-end developer and digital marketer in Oshawa, ON, designing in Figma, building in code and marketing the result.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Story />
      <BehindTheCounter />
      <ToolList />

      <BandPair>
        {/* Same art as the homepage Skills tile and Playground band */}
        <FeatureBand
          layout="tile"
          bg="sapphire" /* same blue as the pegboard art's background */
          ink="cream"
          {...bands.skills}
          media={
            <img className={styles.photo} src="/images/bands/skills.webp" width={720} height={900} alt="A pegboard of design and code tools: pencil, ruler, paintbrush, laptop, code brackets, gear, clapperboard, shopping bag, chat bubble and paper plane" loading="lazy" decoding="async" />
          }
        />
        <FeatureBand
          layout="tile"
          bg="plum"
          ink="cream"
          accent="marigold"
          title="Playground."
          text="Illustration and motion experiments, kept apart from the client work."
          link={{ label: "Have a play.", href: "/#playground" }}
          media={
            <LoopVideo
              className={styles.photo}
              src="/images/bands/playground.mp4"
              poster="/images/bands/playground-poster.webp"
              width={860}
              height={1076}
            />
          }
        />
      </BandPair>

      <Gallery id="explore" intro="Explore the work. Pick an image below to dive into a case study." />
    </>
  );
}
