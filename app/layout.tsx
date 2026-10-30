/*
  layout.tsx
  Wraps every page: fonts, metadata, skip link, header, footer and the
  page curtain. Also holds the tiny hero color picker script.
*/

import type { Metadata, Viewport } from "next";
import "@fontsource-variable/fraunces/full.css"; // full = includes the SOFT and WONK axes
import "@fontsource-variable/hanken-grotesk";
import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageCurtain from "@/components/layout/PageCurtain";
import CursorTrail from "@/components/layout/CursorTrail";
import { heroPairs, site } from "@/content/site";

export const metadata: Metadata = {
  title: {
    default: `${site.name} · ${site.role} & digital marketer`,
    template: `%s · ${site.name}`,
  },
  description: `${site.tagline}. ${site.role} focused on ${site.focus}, based in ${site.location}.`,
};

export const viewport: Viewport = {
  themeColor: "#2a1b3d",
};

/*
  Runs before the page paints. Picks one hero color pair at random and
  stores it as CSS variables on <html>, which Hero.module.css reads.
  Doing it here (not in a React effect) means no flash of the default colors.
*/
const heroPairScript = `(function(){try{
var pairs=${JSON.stringify(heroPairs)};
var p=pairs[Math.floor(Math.random()*pairs.length)];
var s=document.documentElement.style;
s.setProperty('--hero-bg','var(--'+p.bg+')');
s.setProperty('--hero-accent','var(--'+p.accent+')');
s.setProperty('--hero-ink','var(--'+p.ink+')');
s.setProperty('--hero-subject','var(--'+p.subject+')');
}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The script changes <html>'s style before React loads, so React is told not to warn about it
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: heroPairScript }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <PageCurtain>
          <Header />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </PageCurtain>
        <CursorTrail />
      </body>
    </html>
  );
}
