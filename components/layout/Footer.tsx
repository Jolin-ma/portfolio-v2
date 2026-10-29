/*
  Footer.tsx
  Marquee on white, a small copyright line, then one plum bar with a
  single centered link back to the work.
*/

import Marquee from "@/components/sections/Marquee";
import RollLink from "@/components/ui/RollLink";
import ArrowDot from "@/components/ui/ArrowDot";
import { site } from "@/content/site";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Marquee />
      <p className={styles.copyright}>
        © {new Date().getFullYear()} {site.name}. Designed and built in {site.location}.
      </p>
      <div className={styles.bar}>
        <ArrowDot />
        <RollLink href="/#work">Browse the work.</RollLink>
      </div>
    </footer>
  );
}
