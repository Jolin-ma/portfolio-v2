"use client";

/*
  PageCurtain.tsx
  The page transition. A tilted panel in the next page's color sweeps up,
  the page name slides in, the route changes underneath, then it clears.

  How it works:
    1. A TransitionLink calls `go(href, title, color)` instead of navigating.
    2. Phase "cover": the panel animates up over the screen.
    3. When the cover animation ends, router.push() swaps the page.
    4. usePathname() changes -> phase "reveal": the panel leaves the top.
    5. Phase "idle": the panel snaps back below the screen, unseen.
  With reduced motion turned on, go() just navigates straight away.
*/

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cssColor, aboutCurtain, homeCurtain, type ColorToken } from "@/content/site";
import { projects } from "@/content/projects";
import type { IllustrationVariant } from "@/components/ui/Illustration";
import Illustration from "@/components/ui/Illustration";
import styles from "./PageCurtain.module.css";

type Phase = "idle" | "cover" | "reveal";

export type CurtainTarget = {
  title: string;
  color: ColorToken;
  ink: ColorToken;
  /** Small drawing under the title, used when there's no `art` */
  illustration: IllustrationVariant;
  /** Full-screen 16:9 picture (public/images/curtain/). `bg` is its flat
      background color when that differs from `color`, so the panel and
      the picture meet without a seam. */
  art?: { src: string; bg?: string };
};

/** Every curtain picture, warmed up after load so none arrives late */
export function preloadCurtainArt(srcs: string[]) {
  const load = () => srcs.forEach((src) => (new Image().src = src));
  // Safari has no requestIdleCallback
  if (typeof window.requestIdleCallback === "function") window.requestIdleCallback(load);
  else setTimeout(load, 1500);
}

type CurtainApi = {
  go: (href: string, target: CurtainTarget) => void;
};

const CurtainContext = createContext<CurtainApi | null>(null);

export function useCurtain() {
  return useContext(CurtainContext);
}

/** "/work/dewstick/" and "/work/dewstick" are the same page */
export function normalizePath(path: string) {
  return path.replace(/\/+$/, "") || "/";
}

/** Matches the transition time in PageCurtain.module.css */
const SWEEP_MS = 700;

export default function PageCurtain({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const [target, setTarget] = useState<CurtainTarget | null>(null);
  // Path we're waiting for, so we know when the new page has arrived
  const pendingPath = useRef<string | null>(null);

  useEffect(() => {
    const srcs = [homeCurtain.art.src, aboutCurtain.art.src, ...projects.flatMap((p) => (p.curtainArt ? [p.curtainArt.src] : []))];
    preloadCurtainArt(srcs);
  }, []);

  const go = useCallback(
    (href: string, next: CurtainTarget) => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion || phase !== "idle") {
        router.push(href);
        return;
      }
      setTarget(next);
      setPhase("cover");
      pendingPath.current = normalizePath(new URL(href, window.location.href).pathname);

      window.setTimeout(() => {
        router.push(href);
        // Safety net: if the path never changes (same page, hash link), clear anyway
        window.setTimeout(() => {
          if (pendingPath.current) {
            pendingPath.current = null;
            setPhase("reveal");
          }
        }, 1500);
      }, SWEEP_MS + 150);
    },
    [phase, router],
  );

  // New page has rendered: lift the curtain
  useEffect(() => {
    if (pendingPath.current && normalizePath(pathname) === pendingPath.current) {
      pendingPath.current = null;
      const t = window.setTimeout(() => setPhase("reveal"), 200);
      return () => window.clearTimeout(t);
    }
  }, [pathname]);

  // After the reveal sweep finishes, reset off screen
  useEffect(() => {
    if (phase !== "reveal") return;
    const t = window.setTimeout(() => setPhase("idle"), SWEEP_MS);
    return () => window.clearTimeout(t);
  }, [phase]);

  return (
    <CurtainContext.Provider value={{ go }}>
      {children}
      <div className={styles.curtain} data-phase={phase} aria-hidden="true">
        <div
          className={styles.panel}
          style={{
            background: target?.art?.bg ?? cssColor(target?.color ?? "tomato"),
            color: cssColor(target?.ink ?? "plum"),
          }}
        >
          {/* One screen's worth of space in the middle of the oversized panel */}
          <div className={`${styles.stage} ${target?.art ? styles.withArt : ""}`}>
            {target?.art && <img src={target.art.src} alt="" className={styles.photo} decoding="async" />}
            <div className={styles.content}>
              <div className={styles.titleMask}>
                <p className={styles.title}>{target?.title}</p>
              </div>
              {target && !target.art && (
                <div className={styles.art}>
                  <Illustration
                    variant={target.illustration}
                    background="none"
                    line={target.ink === "cream" ? "cream" : "plum"}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </CurtainContext.Provider>
  );
}
