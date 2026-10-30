/*
  Features.tsx
  One colored band per project, in the project's own color:
    full band, then two tiles side by side, then two full bands.
  The big link word (the project's `teaser`) opens the case study.
  The art is the project's `bandArt` when it has one, otherwise the
  placeholder illustration. Wide band art fills the whole band ("cover"
  layout, text over the empty side of the picture).
*/

import FeatureBand, { BandPair } from "@/components/ui/FeatureBand";
import Illustration from "@/components/ui/Illustration";
import { getProject, caseHref, curtainFor, type Project } from "@/content/projects";

/** Light link color on dark bands, plum on light ones */
const accentFor = (p: Project) => (p.ink === "cream" ? "marigold" : "plum");

function bandProps(p: Project) {
  // Band art has a light red field behind the text, where only plum
  // passes contrast. A dark project color (cream ink) would then fail on
  // phones, where the text sits on the band color, so swap it for blush.
  const onArt = Boolean(p.bandArt);
  const dark = p.ink === "cream";
  return {
    bg: onArt && dark ? "blush" : p.color,
    ink: onArt ? "plum" : p.ink,
    accent: onArt ? "plum" : accentFor(p),
    title: p.title,
    text: p.summary,
    more: p.details,
    link: { label: p.teaser, href: caseHref(p), curtain: curtainFor(p) },
    media: p.bandArt ? (
      // Decorative: the band title already names the project
      <img src={p.bandArt.src} width={p.bandArt.width} height={p.bandArt.height} alt="" loading="lazy" decoding="async" />
    ) : (
      <Illustration
        variant={p.illustration}
        background="none"
        line={p.ink === "cream" ? "cream" : "plum"}
        animated
      />
    ),
  } as const;
}

export default function Features() {
  const [dewstick, bottle, busy, legacy, portfolio] = [
    "dewstick",
    "message-in-a-bottle",
    "busy-season",
    "legacy-link-studio",
    "this-portfolio",
  ].map((slug) => getProject(slug)!);

  return (
    <>
      <FeatureBand layout="cover" {...bandProps(dewstick)} />
      {/* Tiles are too small for the longer description next to the corner art */}
      <BandPair>
        <FeatureBand layout="tile" {...bandProps(bottle)} more={undefined} />
        <FeatureBand layout="tile" {...bandProps(busy)} more={undefined} />
      </BandPair>
      {/* Legacy's art has no empty left side: a second paragraph runs over the house and path */}
      <FeatureBand layout="cover" {...bandProps(legacy)} more={undefined} />
      <FeatureBand layout="cover" {...bandProps(portfolio)} />
    </>
  );
}
