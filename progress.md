# Progress

Session log for portfolio-v2. The full plan and decisions live in `PORTFOLIO_HANDOFF.md`; this file is what happened and where to pick up.

## Oct 28, 2026

### Done
- **Scaffold:** Next.js 16.4.3 + React 19 + TypeScript + CSS Modules, static export to `out/`. Fonts via npm (Fraunces full axes, Hanken Grotesk)
- **First build:** header, menu overlay (focus trap, Esc, scroll lock), page curtain transition, text-roll links, reveal-on-scroll, marquee, contact form with validation, case study template for all 5 projects, 404, README
- **Homepage rebuilt to mirror Handsome Frank section by section** (structure only). Most bands use the shared `FeatureBand` component
- **About page** (`/about/`): hero with overlapping portrait, story chapters, tools list, FAQ, bands, gallery
- **Art direction locked** (in the handoff)
- Message in a bottle alt text fixed, `msg.png` converted to `msg.webp`

## Oct 28 to 29, 2026 (evening session): landing page finished

Jolin supplied the final artwork and videos; all homepage slots now use them.

### Hero
- Background **#15047D** (indigo, taken from Handsome Frank's hero at Jolin's request), headline cream, accent line **#27D5B4** (teal). New tokens `--indigo`, `--teal` in `app/globals.css`
- Fills the whole screen (`100svh`). The random color pairs are down to one (`heroPairs` in `content/site.ts`)
- No illustration. Jolin wants **some kind of hero animation later, not decided yet**. The pair's `subject` color is unused until then

### Header and cursor
- **Logo:** `components/ui/Logo.tsx`, a "Jolin Ma" signature in Mrs Saint Delafield (via `next/font/google`, self-hosted at build). No background, 4.8rem on desktop (3rem on phones), nudged 14px down. `--header-h` raised to `clamp(84px, 7.5vw, 108px)`
- The logo turns cream or plum to match the band under it (`toneAt()` in `components/layout/Header.tsx`, checks on scroll, resize and DOM changes)
- **Cursor:** `components/layout/CursorTrail.tsx`. The paper plane (`public/images/cursor-64.png`) is the pointer, tip as the click point, with 6 tomato dots trailing from its tail. Grows over links, hides over text fields. Off for touch and reduced motion; native cursor only hidden while it runs
- Fixed a bug where the plane flew off screen over links (scale was multiplying its position; it now uses the `translate` property)

### Sections
- **Gallery cards:** 2 layers only, `cardArt` (shown on load) then `cardImage`. Placeholder illustrations and `altColor` removed
- **Project bands:** new `cover` layout in `FeatureBand`, art fills the whole band with plum text over its empty red side. Dewstick, Legacy Link Studio and This portfolio use wide art. Message in a bottle and Busy Season keep the tile layout with 4:5 art in the corner box (a half-screen full-bleed version was tried and undone). Art lives in `public/images/bands/`, set as `bandArt` in `content/projects.ts`
- **How I work** (video left) and **Playground** (video left): looping videos via the new `components/ui/LoopVideo.tsx` (muted, no controls, poster still for reduced motion)
- **Contact:** mailbox art. How I work, Playground and Contact use the new `fitMedia` option so the art runs the band's full height
- **About tiles:** illustrated portrait on `--paper` (#FDFDFD) and pegboard on `--sapphire` (#0341BC, cream text). Each tile matches its art's background; the arch frame is gone
- **Elsewhere:** each card takes its art's background color, art fills the bottom (no circle). GitHub card has cream text
- **Footer marquee:** the four round footer images, one per phrase
- Removed the stale "Placeholder loops for now" line from the Playground copy; deleted the unused `Playground.module.css`
- **Favicon:** made from `public/images/favicon.png` (paper plane on a blue circle): `app/favicon.ico` (16/32/48), `app/icon.png` (192, see-through corners), `app/apple-icon.png` (180, on cream). Next.js adds the `<link>` tags itself

### Current state
- `npm run build` passes (homepage, about, 5 case studies, 404), type check clean
- Dev server running at http://localhost:3000 (started this session with `npm run dev`)
- Checked in a browser at 1440px only. **Phone widths not checked** for any of today's changes (the test browser wouldn't shrink)
- Not a git repo, nothing pushed or deployed

## Start here tomorrow: the other pages

1. **About page** (`/about/`): the hero still uses the real photo `me.webp` (the illustrated portrait is only on the homepage tile). Story chapters still use placeholder illustrations and `home-office.webp`. Bands at the bottom still have placeholders
2. **Case study pages** (`/work/[slug]/`): the header band still shows the placeholder illustration. The new band and card art could go here
3. **Menu overlay and page curtain:** still the placeholder gardener and project drawings
4. **404 page:** placeholder bottle
5. **Update `PORTFOLIO_HANDOFF.md`:** it's behind on most of the above (hero colors, logo, cursor, new layouts, tokens). Only the GalleryCard note was kept current
6. **Clean up `public/images/`:** Jolin's original PNGs and MP4s (~30 MB, names with spaces) are no longer used but get copied into the build, which makes `out/` 35 MB. Move them out of `public/` (ask first)

### Still open
- Hero animation (Jolin to decide)
- Phone and tablet check of the whole homepage
- Copy in Jolin's own voice: `TODO(Jolin)` drafts and band copy in `content/site.ts`
- Real technical challenge write-up for each project, stack details for Message in a bottle, Busy Season, Legacy Link Studio
- Contact form endpoint (`NEXT_PUBLIC_FORM_ENDPOINT` in `.env.local`)
- Not yet tested: curtain sweep by eye, reduced motion in a real browser, full keyboard pass, Lighthouse
- Two Elsewhere cards (Dewstick in Figma, Dewstick source code) show a faint seam where the art's textured top meets the flat card color
- `PillButton` is unused; `AGENTS.md` is managed by Next.js (keep it)
- Repo and deploy, only with Jolin's OK
