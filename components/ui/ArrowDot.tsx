/*
  ArrowDot.tsx
  Small round tomato icon with an arrow, placed before a big link.
  Drawn as SVG so it doesn't depend on the font having an arrow glyph.
  Sized in em, so it scales with the text next to it.
*/

export default function ArrowDot() {
  return (
    <svg width="1.1em" height="1.1em" viewBox="0 0 24 24" aria-hidden="true" focusable="false" style={{ flex: "none" }}>
      <circle cx="12" cy="12" r="12" fill="var(--tomato)" />
      <path
        d="M6.5 12h10M12.5 7.5 17 12l-4.5 4.5"
        fill="none"
        stroke="var(--plum)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
