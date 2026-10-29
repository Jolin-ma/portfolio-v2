"use client";

/*
  MenuOverlay.tsx
  Full-screen menu that doubles as a mini showcase.
    Left:   page links (current page faded, with an arrow)
    Center: one large illustration
    Right:  project names. Hover or focus one to swap the illustration
            and the overlay background to that project's color.

  Accessibility: it's a modal dialog. Focus moves in on open, Tab is
  trapped inside, Esc closes it, page scroll is locked while open.
*/

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import RollLink from "@/components/ui/RollLink";
import Illustration from "@/components/ui/Illustration";
import { navLinks, cssColor } from "@/content/site";
import { projects, caseHref, curtainFor, type Project } from "@/content/projects";
import { normalizePath } from "./PageCurtain";
import styles from "./MenuOverlay.module.css";

export default function MenuOverlay({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = normalizePath(usePathname());
  const [active, setActive] = useState<Project | null>(null);

  // Which page link counts as "current"
  const currentHref = pathname.startsWith("/work")
    ? "/#work"
    : pathname === "/about"
      ? "/about/"
      : pathname === "/"
        ? "/"
        : "";

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    // Lock page scroll
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Move focus into the menu
    dialog.querySelector<HTMLElement>("a, button")?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialog) return;
      // Focus trap: wrap from last to first and back
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>("a[href], button"));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  const bg = active ? cssColor(active.color) : "var(--white)";
  const ink = active ? cssColor(active.ink) : "var(--plum)";

  return (
    <div
      ref={ref}
      id="menu-overlay"
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      style={{ background: bg, color: ink }}
    >
      <button type="button" className={styles.close} onClick={onClose}>
        <span className="sr-only">Close menu</span>
        <span aria-hidden="true" className={styles.cross} />
      </button>

      <nav className={styles.pages} aria-label="Pages">
        <ul role="list">
          {navLinks.map((link) => {
            const isCurrent = link.href === currentHref;
            return (
              <li key={link.href}>
                <RollLink
                  href={link.href}
                  curtain={link.curtain}
                  className={`${styles.pageLink} ${isCurrent ? styles.current : ""}`}
                  aria-current={isCurrent ? "page" : undefined}
                  icon={isCurrent ? <span aria-hidden="true">→</span> : undefined}
                  onClick={onClose}
                >
                  {link.label}
                </RollLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className={styles.showcase} aria-hidden="true">
        {/* key forces a re-mount so the pop-in animation replays on each swap */}
        <div key={active?.slug ?? "home"} className={styles.art}>
          <Illustration
            variant={active?.illustration ?? "gardener"}
            background="none"
            line={active?.ink === "cream" ? "cream" : "plum"}
            animated
          />
        </div>
      </div>

      <nav className={styles.projects} aria-label="Projects">
        <p className={styles.label}>Projects</p>
        <ul role="list">
          {projects.map((p) => (
            // Hover or keyboard focus both preview the project (focus bubbles in React)
            <li key={p.slug} onMouseEnter={() => setActive(p)} onFocus={() => setActive(p)}>
              <RollLink
                href={caseHref(p)}
                curtain={curtainFor(p)}
                className={`${styles.projectLink} ${active?.slug === p.slug ? styles.on : ""}`}
                onClick={onClose}
              >
                {p.title}
              </RollLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
