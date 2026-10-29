/*
  about/page.tsx
  The About page. Top to bottom: hero with portrait, story, tools,
  FAQ, a band and two tiles, then the gallery again to lead back
  into the work. Words live in content/about.ts and content/site.ts.
*/

import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import Story from "@/components/about/Story";
import ToolList from "@/components/about/ToolList";
import Faq from "@/components/about/Faq";
import Gallery from "@/components/sections/Gallery";
import FeatureBand, { BandPair } from "@/components/ui/FeatureBand";
import Illustration from "@/components/ui/Illustration";
import { bands } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: "Jolin Ma is a web designer and front-end developer in Oshawa, ON, who designs in Figma and builds in code.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Story />
      <ToolList />
      <Faq />

      <FeatureBand
        layout="split"
        bg="marigold"
        ink="plum"
        {...bands.openToWork}
        media={<Illustration variant="bottle" background="none" animated />}
      />
      <BandPair>
        <FeatureBand
          layout="tile"
          bg="blush"
          ink="plum"
          {...bands.skills}
          media={<Illustration variant="window" background="none" animated />}
        />
        <FeatureBand
          layout="tile"
          bg="plum"
          ink="cream"
          accent="marigold"
          title="Playground."
          text="Illustration and motion experiments, kept apart from the client work."
          link={{ label: "Have a play.", href: "/#playground" }}
          media={<Illustration variant="reel" background="none" line="cream" animated />}
        />
      </BandPair>

      <Gallery id="explore" intro="Explore the work. Pick an image below to dive into a case study." />
    </>
  );
}
