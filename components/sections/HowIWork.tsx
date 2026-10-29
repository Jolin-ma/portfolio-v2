/*
  HowIWork.tsx
  A short looping video on the left, text on the right (the steps from
  idea to sketch to code to launch).
*/

import FeatureBand from "@/components/ui/FeatureBand";
import LoopVideo from "@/components/ui/LoopVideo";
import { bands } from "@/content/site";

export default function HowIWork() {
  return (
    <FeatureBand
      id="process"
      layout="split"
      fitMedia
      bg="pool"
      ink="plum"
      {...bands.howIWork}
      media={
        <LoopVideo
          src="/images/bands/how-i-work.mp4"
          poster="/images/bands/how-i-work-poster.webp"
          width={860}
          height={1076}
        />
      }
    />
  );
}
