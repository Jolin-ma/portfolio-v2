/*
  Logo.tsx
  "Jolin Ma" as a handwritten signature, linking home.

  Mrs Saint Delafield comes through next/font, which downloads it at
  build time and serves it with the site, so visitors' browsers never
  call Google. Uses TransitionLink so the page curtain still plays.
*/

import { Mrs_Saint_Delafield } from "next/font/google";
import TransitionLink from "./TransitionLink";

const signature = Mrs_Saint_Delafield({
  weight: "400", // this font only comes in one weight
  subsets: ["latin"],
  display: "swap",
});

type LogoProps = {
  color?: string; // any CSS color, defaults to cream
  size?: string; // font size, e.g. "2.75rem"
  className?: string; // extra styling from the parent (e.g. the header pill)
};

export default function Logo({ color = "#F6EEDC", size = "2.75rem", className = "" }: LogoProps) {
  return (
    <TransitionLink
      href="/"
      aria-label="Jolin Ma, home"
      className={`${signature.className} ${className}`}
      style={{
        color,
        fontSize: size,
        lineHeight: 1,
        textDecoration: "none",
        display: "inline-block",
        // script fonts have long tails that can get clipped, this gives them room
        padding: "0.15em 0.25em",
        whiteSpace: "nowrap",
      }}
    >
      Jolin Ma
    </TransitionLink>
  );
}
