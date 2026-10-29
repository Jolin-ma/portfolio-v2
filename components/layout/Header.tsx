"use client";

/*
  Header.tsx
  Fixed bar: signature logo (in a cream pill) on the left, one round
  menu button on the right.
  Owns the open/closed state of the menu overlay, and puts focus back
  on the menu button when the overlay closes.

  The logo has no background, so on scroll the header checks the color
  of whatever is under the logo and sets data-tone="dark" or "light";
  the CSS turns the logo cream or plum to match.
*/

import { useCallback, useEffect, useRef, useState } from "react";
import Logo from "@/components/ui/Logo";
import MenuOverlay from "./MenuOverlay";
import styles from "./Header.module.css";

/** Relative luminance (0 dark to 1 light) of a computed rgb()/rgba() color */
function luminance(color: string) {
  const [r, g, b] = (color.match(/[\d.]+/g) ?? []).slice(0, 3).map((v) => {
    const c = Number(v) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** "dark" or "light": the background under a point on screen, ignoring the header */
function toneAt(x: number, y: number): "dark" | "light" {
  for (const el of document.elementsFromPoint(x, y)) {
    if (el.closest("header")) continue;
    // Pictures and videos: the band art is light (sky, fields) behind the logo
    if (el instanceof HTMLImageElement || el instanceof HTMLVideoElement) return "light";
    const bg = getComputedStyle(el).backgroundColor;
    const alpha = bg.startsWith("rgba") ? Number(bg.split(",")[3]) : 1;
    if (alpha > 0.5) return luminance(bg) < 0.18 ? "dark" : "light";
  }
  return "light";
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Re-check the logo's tone on scroll, resize and route changes
  useEffect(() => {
    let frame = 0;
    const check = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const header = headerRef.current;
        const logo = header?.querySelector("a");
        if (!header || !logo) return;
        const r = logo.getBoundingClientRect();
        header.dataset.tone = toneAt(r.left + r.width / 2, r.top + r.height / 2);
      });
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    // New page content (route change, menu opening) without a scroll
    const observer = new MutationObserver(check);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      observer.disconnect();
    };
  }, []);

  // Stable function, so the overlay's keyboard effect doesn't re-run each render
  const close = useCallback(() => {
    setOpen(false);
    buttonRef.current?.focus();
  }, []);

  return (
    <header ref={headerRef} className={styles.header}>
      <Logo className={styles.logo} color="var(--logo-ink)" size="clamp(3rem, 5vw, 4.8rem)" />

      <button
        ref={buttonRef}
        type="button"
        className={styles.menuButton}
        aria-expanded={open}
        aria-controls="menu-overlay"
        onClick={() => setOpen(true)}
      >
        <span className="sr-only">Open menu</span>
        <span className={styles.bars} aria-hidden="true" />
      </button>

      {open && <MenuOverlay onClose={close} />}
    </header>
  );
}
