"use client";

/*
  Reveal.tsx
  Fades and slides its children in once 15% of them is visible.

  Content is visible by default (server HTML, no JS, reduced motion).
  Only after mount, and only for elements still below the fold, do we
  hide them and wait for the IntersectionObserver. So nothing can get
  stuck invisible, and nothing on the first screen flickers.
*/

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./Reveal.module.css";

type State = "static" | "waiting" | "shown";

export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  /** Stagger in ms, for a row of items */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<State>("static");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Already on screen at load: leave it alone
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    setState("waiting");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("shown");
          observer.disconnect(); // run once
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${className}`}
      data-state={state}
      style={{ transitionDelay: state === "shown" ? `${delay}ms` : undefined }}
    >
      {children}
    </div>
  );
}
