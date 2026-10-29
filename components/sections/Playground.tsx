/*
  Playground.tsx
  Full band: a looping video on the left (the projects' objects playing
  in a playground), text on the right. Kept apart from the client work.
*/

import FeatureBand from "@/components/ui/FeatureBand";
import LoopVideo from "@/components/ui/LoopVideo";
import { bands } from "@/content/site";

export default function Playground() {
  return (
    <FeatureBand
      id="playground"
      layout="split"
      fitMedia
      bg="marigold"
      ink="plum"
      {...bands.playground}
      media={
        <LoopVideo
          src="/images/bands/playground.mp4"
          poster="/images/bands/playground-poster.webp"
          width={860}
          height={1076}
        />
      }
    />
  );
}
