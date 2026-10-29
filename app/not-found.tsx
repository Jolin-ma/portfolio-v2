/*
  not-found.tsx
  The 404 page. The static export writes it to out/404.html.
*/

import Illustration from "@/components/ui/Illustration";
import RollLink from "@/components/ui/RollLink";

export default function NotFound() {
  return (
    <section
      className="section"
      style={{ background: "var(--pool)", minHeight: "80vh", paddingTop: "calc(var(--header-h) + 4rem)" }}
    >
      <div className="container" style={{ display: "grid", gap: "1.5rem", justifyItems: "start" }}>
        <div style={{ width: 200, aspectRatio: "4 / 5" }}>
          <Illustration variant="bottle" background="none" animated />
        </div>
        <h1>This page floated away.</h1>
        <p className="lead">The link might be old, or the address has a typo.</p>
        <RollLink href="/">Back to the homepage →</RollLink>
      </div>
    </section>
  );
}
