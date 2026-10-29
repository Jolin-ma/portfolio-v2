/*
  RollLink.tsx
  Text-roll hover: two copies of the label stacked in a clipped box.
  On hover both slide up by 100%, so the second copy rolls into place.
  The second copy is aria-hidden so screen readers read the label once.

  Works for internal links (with the page curtain) and external links.
*/

import type { ReactNode } from "react";
import TransitionLink from "./TransitionLink";
import type { CurtainTarget } from "@/components/layout/PageCurtain";
import styles from "./RollLink.module.css";

type Props = {
  href: string;
  children: string;
  external?: boolean;
  curtain?: CurtainTarget;
  className?: string;
  /** Shown before the label, e.g. an arrow */
  icon?: ReactNode;
  onClick?: () => void;
  "aria-current"?: "page";
};

export default function RollLink({ href, children, external, curtain, className = "", icon, ...rest }: Props) {
  const inner = (
    <>
      {icon}
      <span className={styles.box}>
        <span className={styles.text}>{children}</span>
        <span className={styles.text} aria-hidden="true">
          {children}
        </span>
      </span>
    </>
  );

  if (external) {
    return (
      <a className={`${styles.link} ${className}`} href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {inner}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  return (
    <TransitionLink className={`${styles.link} ${className}`} href={href} curtain={curtain} {...rest}>
      {inner}
    </TransitionLink>
  );
}
