"use client";

/*
  TransitionLink.tsx
  A normal Next.js <Link> that plays the page curtain when it goes to
  a different page. Links within the same page (like /#about from the
  homepage) skip the curtain and just scroll.
*/

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";
import { normalizePath, useCurtain, type CurtainTarget } from "@/components/layout/PageCurtain";
import { homeCurtain } from "@/content/site";

type Props = ComponentProps<typeof Link> & {
  href: string;
  /** What the curtain shows. Defaults to the homepage look. */
  curtain?: CurtainTarget;
};

export default function TransitionLink({ href, curtain = homeCurtain, onClick, ...rest }: Props) {
  const pathname = usePathname();
  const curtainApi = useCurtain();

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);
    // Let the browser handle new tabs, modifier clicks, and already-handled events
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    const targetPath = normalizePath(new URL(href, window.location.href).pathname);
    if (!curtainApi || targetPath === normalizePath(pathname)) return; // same page: normal Link behavior

    e.preventDefault(); // Next's Link skips its own navigation when this is set
    curtainApi.go(href, curtain);
  }

  return <Link href={href} onClick={handleClick} {...rest} />;
}
