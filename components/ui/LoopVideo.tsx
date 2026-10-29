"use client";

/*
  LoopVideo.tsx
  A short, silent, decorative video loop (used like an illustration).

  It autoplays muted and loops. With prefers-reduced-motion turned on it
  never plays and the poster (a still frame) shows instead. Hidden from
  screen readers, because it only decorates a band that has its own text.
*/

import { useEffect, useRef } from "react";

type Props = {
  src: string;
  /** Still frame shown before it plays, and instead of it for reduced motion */
  poster: string;
  width: number;
  height: number;
  className?: string;
};

export default function LoopVideo({ src, poster, width, height, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      if (reduce.matches) {
        video.pause();
        video.currentTime = 0;
      } else {
        // play() can be refused (e.g. data saver); the poster stays, which is fine
        video.play().catch(() => {});
      }
    };

    sync();
    reduce.addEventListener("change", sync);
    return () => reduce.removeEventListener("change", sync);
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      width={width}
      height={height}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      style={{ objectFit: "cover" }}
    />
  );
}
