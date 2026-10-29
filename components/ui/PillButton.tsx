/*
  PillButton.tsx
  Rounded pill button. Renders a <button>, or an <a> when given an href.
*/

import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./PillButton.module.css";

type Props = {
  children: ReactNode;
  href?: string;
  variant?: "solid" | "outline";
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function PillButton({ children, href, variant = "solid", className = "", ...rest }: Props) {
  const classes = `${styles.pill} ${styles[variant]} ${className}`;

  if (href) {
    const external = href.startsWith("http");
    return (
      <a
        className={classes}
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
        {external && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
