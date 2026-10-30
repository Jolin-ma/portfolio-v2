/*
  page.tsx
  The homepage. Only assembles the sections, top to bottom; each one
  lives in components/sections and reads its words from content/.
*/

import Hero from "@/components/sections/Hero";
import Gallery from "@/components/sections/Gallery";
import WhatIDo from "@/components/sections/WhatIDo";
import Features from "@/components/sections/Features";
import HowIWork from "@/components/sections/HowIWork";
import Contact from "@/components/sections/Contact";
import About from "@/components/sections/About";
import Playground from "@/components/sections/Playground";
import Elsewhere from "@/components/sections/Elsewhere";
import FeatureBand from "@/components/ui/FeatureBand";
import { bands } from "@/content/site";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Gallery />
      <FeatureBand id="open" layout="statement" bg="marigold" ink="plum" {...bands.openToWork} />
      <WhatIDo />
      <Features />
      <HowIWork />
      <Contact />
      <About />
      <Playground />
      <Elsewhere />
    </>
  );
}
