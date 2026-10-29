"use client";

/*
  CursorTrail.tsx
  Custom pointer: the paper plane sits on the mouse (its tip is the
  pointer), and a few little dots trail behind it, like the dotted
  flight paths in the artwork.

  How it works:
    - The plane moves to the mouse position on every pointer move.
    - Each animation frame, the first dot eases toward the plane's tail
      and every other dot eases toward the dot in front of it, which makes
      the trail come out from behind the plane.
    - Over links and buttons the plane grows a little; over text fields it
      hides and the normal text cursor comes back.

  Only for a real mouse (hover + fine pointer). With reduced motion, or
  on touch screens, nothing renders and the normal cursor stays. The
  native cursor is hidden by the .custom-cursor class on <html>, which
  is only added here, so without JS nothing changes.
*/

import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./CursorTrail.module.css";

const DOTS = 6;
const EASE = 0.35; // how quickly each dot catches up, per frame
// Where the tail is, measured from the tip, in the 32px image
const TAIL = { x: 22, y: 28 };
const LINK_SCALE = 1.4; // matches .plane[data-state="link"] in the CSS

export default function CursorTrail() {
  const [enabled, setEnabled] = useState(false);
  const planeRef = useRef<HTMLImageElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Turn on only for a mouse, and not for reduced motion
  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const sync = () => setEnabled(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add("custom-cursor");

    const mouse = { x: -100, y: -100 };
    const tail = { x: -100, y: -100 }; // where the trail starts
    const dots = Array.from({ length: DOTS }, () => ({ x: -100, y: -100 }));
    let visible = false;
    let frame = 0;

    function onMove(e: PointerEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      const plane = planeRef.current;
      if (!plane) return;

      const target = e.target as Element | null;
      const overText = target?.closest("input, textarea, select, [contenteditable]");
      const overLink = target?.closest("a, button, summary, label");
      plane.dataset.state = overText ? "hidden" : overLink ? "link" : "default";
      // `translate`, not `transform`: the browser applies it after `scale`,
      // so growing over links doesn't also push the plane away from the mouse
      plane.style.translate = `${mouse.x}px ${mouse.y}px`;

      // The plane grows over links, so its tail moves further out
      const scale = overLink && !overText ? LINK_SCALE : 1;
      tail.x = mouse.x + TAIL.x * scale;
      tail.y = mouse.y + TAIL.y * scale;

      if (!visible) {
        visible = true;
        // Start the trail where the mouse is, not flying in from a corner
        dots.forEach((d) => Object.assign(d, tail));
        root.dataset.cursor = "on";
      }
    }

    function onLeave() {
      visible = false;
      delete root.dataset.cursor;
    }

    function tick() {
      dots.forEach((dot, i) => {
        const lead = i === 0 ? tail : dots[i - 1];
        dot.x += (lead.x - dot.x) * EASE;
        dot.y += (lead.y - dot.y) * EASE;
        const el = dotRefs.current[i];
        if (el) el.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0)`;
      });
      frame = requestAnimationFrame(tick);
    }

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
      root.classList.remove("custom-cursor");
      delete root.dataset.cursor;
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className={styles.cursor} aria-hidden="true">
      {Array.from({ length: DOTS }, (_, i) => (
        <span
          key={i}
          ref={(el) => {
            dotRefs.current[i] = el;
          }}
          className={styles.dot}
          // Dots shrink toward the end of the trail
          style={{ "--size": `${7 - i}px` } as CSSProperties}
        />
      ))}
      <img ref={planeRef} className={styles.plane} src="/images/cursor-64.png" width={32} height={32} alt="" />
    </div>
  );
}
