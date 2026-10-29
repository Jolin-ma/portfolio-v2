# Portfolio v2 Handoff

Everything decided and built so far for Jolin's new portfolio site. Read this first when picking the work back up.

- **Owner:** Jolin Ma, web designer and front-end developer, Oshawa, ON
- **Current site (stays untouched):** https://jolin-ma.github.io/Portfolio/
- **New site:** this folder, `portfolio-v2`. Not a git repo yet, not deployed
- **Design reference:** https://www.handsomefrank.com/ (layout and interaction reference)
- **Status (Oct 28, 2026):** homepage, About page, 5 case study pages and 404 are built, mirroring the Handsome Frank structure, and the static build passes. Art direction locked. Artwork in progress; the site still shows placeholder SVGs

---

## 1. Goal

A portfolio that shows **both** creative visual thinking **and** practical frontend skills.

- Artwork leads, color separates sections, motion is small and purposeful
- Update (Oct 28): Jolin chose to mirror the Handsome Frank page structure section by section. Layout can follow it, but all branding, artwork, fonts and copy are Jolin's own
- Each project gets enough room to tell its story: what was designed, what was built, which tools, and one real technical challenge
- The site itself should prove skills through the experience (accessibility, performance, motion done properly)

### Working rules
- Keep the code simple and readable. Jolin will study it later and needs to explain it in interviews
- Comment the purpose of each file and anything non-obvious
- Always ask Jolin before pushing to GitHub, deploying, or spending Higgsfield credits
- Never use Handsome Frank's branding, artwork, logo, fonts or copy
- Don't invent facts about Jolin (background, clients, employers, experience). Draft from what's known and mark it `TODO(Jolin)`

---

## 2. What the reference actually does (verified in a browser and with Firecrawl)

These were inspected live, not guessed.

| Interaction | How it works | Timing |
|---|---|---|
| Card hover | 4 images stacked per card. On hover a different image moves to the top, image scales to 1.03, a small arrow slides in before the name | 0.8s, `cubic-bezier(0.17, 0.84, 0.44, 1)` |
| Hover only on desktop | All hover effects wrapped in `@media (min-width: 1025px)` | |
| Text-roll links | Two copies of the text inside a box with `overflow: hidden`. On hover, both translate up 100%, first fades out | 0.36s, `cubic-bezier(0.77, 0, 0.18, 1)` |
| Menu | Full-screen pale overlay. Big page links left (current page faded with arrow), one large illustration center, faded list of names right. Hovering a name swaps the center image **and** the overlay background color | |
| Page transition | A panel 200% wide, rotated 15deg, sweeps up over the screen. Next page name slides up in big white type, an illustration pops in, then it clears | |
| Hero color | Random pick from fixed background + accent text pairs on each load | |
| Marquee | Infinite horizontal loop, round images between phrases | about 63s, linear |
| Mobile grid | Grid becomes a horizontal scroll row, cards about 40% wide, next card peeking | |

### Homepage structure (top to bottom, at 1440px)
1. Solid color hero, about 900px tall, centered two-line serif headline plus an accent subline
2. Centered intro statement in heavy serif
3. **Gallery:** 4 columns, tall 2:3 portrait images, square corners, 40px gaps, 6vw side margins, bold name centered below, then a centered "View all" link with a round icon
4. Tall announcement band, text anchored bottom-left
5. Feature bands: full width with image filling the left half and text on the right (720px tall = 50vw), and 2-up square tiles (text top-left, link bottom-left, art bottom-right). Each ends in a short punchy link word
6. Text-left, art-right band, then a newsletter band with stacked pill inputs
7. Two square tiles, then a full band with text on the right
8. "Read": 4 tall colored cards, title at top, circular image below
9. Marquee on white, copyright, then a bottom bar with one centered link

### About page structure
1. Dark hero with centered title and subline, a large portrait overlapping into the next band
2. Centered story paragraphs with wide images
3. A huge centered comma-separated list, linked items in an accent color
4. FAQ accordion with round + buttons
5. A split band and two square tiles
6. "Explore the work" statement plus the same 4-up gallery and a view-all link

---

## 3. Art direction (locked, v1)

Tested over 3 rounds in Higgsfield (Oct 28, 2026). Round 1 tried a risograph line style, round 2 moved to bold flat color, which Jolin approved. Inspired by the broad qualities of the reference work Jolin likes: bold saturated color fields, one hero object, scale as the joke, shadows drawn as flat color shapes, warm against cool. Not a copy of any one artist.

### Palette
| Token | Hex | Use |
|---|---|---|
| `--tomato` | #E8472E | bold background fields, hero objects |
| `--cobalt` | #2F55D4 | **all shadows**, cool background fields |
| `--marigold` | #F2B33D | warm hero objects, figure tops |
| `--pistachio` | #A9C97F | leaves, figure tops, calm fields |
| `--cream` | #F5EDE0 | light objects, page background |
| `--plum` | #2A1B3D | thin figure lines, shadows on cobalt fields |
| `--blush` | #F2A39B | optional soft accent |

**Rules:** max 5 colors per image. Always pair one warm with one cool. The hero must contrast with its background by lightness.

**Site contrast notes (learned while building):** on every light background, plum is the only color that passes for body text. Tomato on cream passes for large text only (about 3.6:1). Tomato backgrounds fail with plum body text, so the site avoids them for text-heavy blocks. Cobalt is a site token now (not used by any section yet). Cream text on cobalt passes AA (about 5.4:1); plum on cobalt fails (about 2.5:1), so cobalt bands take `ink="cream"`.

### Illustration rules
- **Background:** one bold flat color field, no texture, no gradient. Or cream when the hero is the bold color (top-down still life setups)
- **Hero object:** one only, oversized or undersized for the joke, fills about two thirds of the frame, cropped by one edge, built from simple solid shapes, **no outlines**
- **One flat tone per object.** No darker inner rims, no depth on handles, nothing that reads as 3D
- **Texture:** rough dry crayon grain **on the hero object only**
- **Shadows (signature):** always one flat hard edged cobalt shape. On cobalt backgrounds, use plum
- **Figures:** small, thin clean plum line with flat fills. Round head with no face except one dot eye (or a small arc when sleeping), no hair, tube limbs, mitten hands, marigold or pistachio top
- **Composition:** off center, lots of empty background, top-down view allowed for still life subjects
- **No:** gradients, lighting, glow, highlights, 3D, crowded props, stock-vector style people, text

### Master Higgsfield style prompt
Model: GPT Image 2.5, quality medium, 2k, 2:3 for cards. Add the two approved images as style references (job ids below).
```
Bold flat editorial illustration. One solid saturated background color, perfectly flat with no texture and no gradient. One hero object built from simple solid shapes with no outlines, each object one single flat color with no darker inner tones and no depth on rims or handles. Rough dry crayon grain texture on the hero object's surface only. The hero is oversized for the joke, fills about two thirds of the frame and is cropped by one edge, with plenty of empty background. Tiny figures are drawn with a thin clean dark plum line (#2A1B3D) and flat fills: round head with no face except a single dot eye, simple tube limbs, mitten hands, marigold or pistachio top. Every shadow is one single flat hard edged deep cobalt blue shape (#2F55D4). Palette: tomato #E8472E, cream #F5EDE0, marigold #F2B33D, pistachio #A9C97F, cobalt #2F55D4, plum #2A1B3D. Max 5 colors. No gradients, no lighting, no glow, no highlights, no 3D, no text.
```
Then add the scene description.

### Approved style references (Higgsfield job ids)
- `e1604a96-1f29-4373-921e-8d718651f700` Cursor Harvest: giant cursor pulled from the ground like a carrot, tomato field
- `8e99a546-1920-4ca1-b94c-dbbe3c194430` Row, row: top-down teacup, tiny rower with a spoon oar, cream table, cobalt shadows

Known fixes from review: replace stock-looking figures with the dot-eye figure style, remove inner shading on cups and handles, make the cursor's buried end obvious.

### Animation rules (for later)
Static camera, no zoom or pan, one or two small movements, 3 to 5 seconds, seamless loop. Keep flat colors flat, crayon grain still, shadows locked to their objects, no new objects.

**Plan:** one illustration per project slot on the site, using the master prompt plus the two references. Final artwork can come in after the site is built.

### Artwork slots the site needs
The site's current placeholders (`components/ui/Illustration.tsx`) are drawn in the **old round 1 riso outline style**, so they don't match the locked direction. They're temporary.

| Placeholder | Slot | Shown on |
|---|---|---|
| `bottle` | Message in a bottle | gallery, feature tile, contact band, About bands, 404 |
| `clapper` | Busy Season | gallery, feature tile |
| `balm` | Dewstick | gallery, feature band |
| `reel` | Legacy Link Studio | gallery, feature band, About tile |
| `window` | This portfolio | feature band, case study, About tile |
| `gardener` | The site's own motif (Cursor Harvest could take this slot) | How I work, menu, page curtain |

- Gallery cards are 2:3. Feature bands and tiles show art at 4:5 with the subject standing on the bottom edge
- Gallery cards use `cardImage` + `cardArt` only (the placeholder illustrations and `altColor` were removed from the cards)
- **How to swap in real art:** put files in `public/images/`. `Illustration` takes a `src` prop; when set, the image renders instead of the SVG. A video or GIF loop would need its own still version for reduced motion

---

## 4. What's built

### Homepage (`app/page.tsx`), mirrors the reference section by section
1. **Header:** logo pill left, round tomato menu button right
2. **Menu overlay:** page links left (current faded with arrow), animated illustration center, project names right. Hover or focus swaps the image and background color. Focus trap, Esc closes, scroll lock
3. **Hero:** centered "I design and build engaging digital experiences." plus accent line "Web designer in Oshawa, ON." Random color pair per visit
4. **Gallery (Selected work):** centered intro statement, 4 tall 2:3 cards with the 4-image hover cycle, "See how this site was built." link
5. **"Open to new work!"** tall statement band
6. **Project feature bands:** Dewstick (split), Message in a bottle and Busy Season (tiles), Legacy Link Studio (split), This portfolio (split). Link words: "Swipe on.", "Drop a line.", "Roll camera.", "Press play.", "Look under the hood."
7. **How I work:** text left, gardener right
8. **Contact:** plum band with pill fields (email, name, message) and the bottle illustration
9. **About tiles:** "So who is Jolin?" (portrait, links to `/about/`) and "Skills." (office photo, links to GitHub)
10. **Playground:** 2x2 grid of looping placeholders, text right
11. **Elsewhere:** 4 tall cards linking to GitHub, Dewstick Figma, Dewstick repo, Portfolio v1
12. **Footer:** marquee with round images, copyright, "Browse the work." bar

### About page (`app/about/page.tsx`)
1. Plum hero "Who is Jolin Ma?", marigold subline, arched portrait overlapping into a pool band with the intro
2. "My story so far.": 3 chapters (office photo + 2 placeholder illustrations)
3. "Tools I work with": big centered list. Tools used in a case study are tomato and link to it
4. FAQ: 6 questions on native `<details>`, works without JS
5. "Open to new work!" split band, Skills + Playground tiles
6. "Explore the work." gallery leading back to the case studies

### Case study (`app/work/[slug]/page.tsx`, one template, 5 pages)
- Header band in the project color with its illustration, date and tags
- The idea, What I designed (bullets + screenshot), What I built (stack pills + numbered flow diagram), The challenge (placeholder box), Links, Next project band

### Other
- `app/not-found.tsx`: 404 page
- Skip to content link, page curtain on route changes, reveal-on-scroll

### Projects (content in `content/projects.ts`)
| # | Project | Color / alt | Live |
|---|---|---|---|
| 01 | Message in a bottle (Mar 19, 2026) | pool / marigold | https://www.msg-in-a-bottle.com/ |
| 02 | Busy Season (Oct 1, 2026) | marigold / pool | https://www.busyseason.ca/ |
| 03 | Dewstick (Aug 26, 2026) | blush / pistachio | https://dewstick.vercel.app/ (+ static build, Shopify, Figma, repo) |
| 04 | Legacy Link Studio (Sept 11, 2026) | pistachio / blush | https://www.legacylinkstudio.com/ |
| 05 | This portfolio | plum / pool, cream text | not in the gallery, linked from it |

The Shopify link is labelled "password protected"; the password isn't on the new site.

Images in `public/images/`: `msg.webp` 1436x876, `busy-season.webp` 1896x910, `dewstick.webp` 2536x1396, `legacylinkstudio.webp` 1878x906, `me.webp` 822x765, `home-office.webp` 1014x764.

---

## 5. Tech setup

- **Next.js 16.4.3 (App Router, Turbopack) + TypeScript + React 19**
- **CSS Modules** for component styles, CSS variables for tokens in `app/globals.css`. No Tailwind
- **Static export** (`output: "export"`, `images.unoptimized`, `trailingSlash: true`), builds to `out/`
- **Fonts via npm:** Fraunces (`@fontsource-variable/fraunces/full.css`, which includes the SOFT and WONK axes) and Hanken Grotesk
- **Content** lives in typed files in `content/`, so editing words never means touching components
- **Deploy:** Vercel, later, only with Jolin's OK

### Commands
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # writes the static site to /out
npm start        # serves /out locally
```
Contact form endpoint goes in `.env.local` as `NEXT_PUBLIC_FORM_ENDPOINT=...` (Formspree or similar). Without it the form validates but says it isn't connected yet.

### Folder structure
```
app/
  layout.tsx              fonts, metadata, skip link, header, footer, page curtain, hero color script
  page.tsx                homepage, assembles the sections
  globals.css             tokens, reset, shared helpers, reduced motion block
  about/page.tsx          About page
  work/[slug]/page.tsx    case study template (+ case.module.css)
  not-found.tsx
components/
  layout/   Header, MenuOverlay, Footer, PageCurtain
  sections/ Hero, Gallery, Features, HowIWork, Contact, About (tiles), Playground, Elsewhere, Marquee
  about/    AboutHero, Story, ToolList, Faq
  case/     CaseHeader, CaseSection, ChallengePlaceholder, NextProject
  ui/       FeatureBand (+ BandPair), GalleryCard, Illustration, RollLink, TransitionLink,
            Reveal, PillInput, PillButton (currently unused), ArrowDot
content/
  site.ts                 name, hero, homepage band copy, nav, hero color pairs, Elsewhere links
  projects.ts             all 5 projects, typed
  about.ts                About page hero, story, tools, FAQ
public/images/            screenshots and photos, later the illustrations
```

### How the main pieces work
- **FeatureBand:** most homepage and About bands. Layouts `split` (art left), `splitReverse` (art right), `tile` (square, use two inside `BandPair`), `statement` (text only). On phones everything stacks, text first
- **GalleryCard:** 2 stacked layers: the 3:4 card art (`cardArt`, shown on load) and the 2:3 card image (`cardImage`), both in `public/images/cards/`. No placeholder illustrations. Each mouse enter wipes the next layer up with `clip-path`. Desktop only
- **Page curtain:** `TransitionLink` asks `PageCurtain` to sweep the panel up, navigates once it's covered, and lifts it when the new path renders. Same-page links (like `/#about` on the homepage) skip it. Paths are normalized because of trailing slashes
- **Hero colors:** an inline script in `layout.tsx` picks a pair from `heroPairs` and sets CSS variables before first paint, so there's no flash
- **Illustration placeholders:** each motif is drawn once and rendered twice, a grainy fill copy shifted a few units plus a wobbly outline copy on top
- **Reduced motion:** `globals.css` stops all CSS animation, and the curtain and reveals also check `prefers-reduced-motion` in JS

### Breakpoints
- **Desktop 1025px+:** 4 column gallery, split bands side by side, hover effects on
- **Tablet 768 to 1024px:** 2 column gallery and Elsewhere cards, menu hides the center image
- **Mobile under 768px:** gallery is a scroll-snap swipe row (cards 46% wide), bands stack text first, tiles put their art under the text

### Accessibility and performance checklist
- Visible focus rings, logical tab order, menu focus trap
- Alt text on every image, decorative SVGs `aria-hidden`
- Color contrast checked for every background and text pair
- `prefers-reduced-motion` turns off curtain, marquee, reveals and loops
- Lazy-load images below the fold, set width and height to avoid layout shift
- Run Lighthouse and record the scores for the "This portfolio" case study

---

## 6. Testing status

**Checked in a browser (Oct 28):**
- 1440px and 390px wide, no horizontal scroll at 390
- Gallery hover cycle, scale and arrow
- Menu: open, focus moves in, scroll lock, Esc closes and returns focus, project hover swaps color, About link navigates
- Contact form validation: all three errors shown, focus moves to the first
- Curtain phase timing (cover, navigate at about 850ms, reveal, idle) measured in code
- No console errors on load; `npm run build` passes (homepage, about, 5 case studies, 404)

**Not checked yet:**
- The curtain sweep by eye (the test browser drew too few frames to capture it)
- `prefers-reduced-motion` turned on in a real browser
- Tablet widths 768 to 1024px
- Keyboard-only pass through the whole site
- Lighthouse scores

**Notes:**
- Next.js generated an `AGENTS.md` file in the project root. Harmless; delete it or set `agentRules: false` in `next.config.mjs`
- If serving `out/` with Python for testing, use `python -m http.server 4173 --directory out` from the project root. Running it from inside `out/` locks the folder and breaks the next build on Windows

---

## 7. Next steps

1. **Artwork (Jolin, now):** one illustration per slot in section 3, using the master prompt and the two references
2. Use `cobalt` for a band or two if the new artwork calls for it (token is ready)
3. Swap the placeholders for real art via `Illustration`'s `src`
4. Rewrite the drafted copy in Jolin's own voice (see open items)
5. Run the unchecked tests in section 6, record Lighthouse scores
6. Set up the contact form endpoint
7. `git init`, create the repo, then deploy to Vercel, **only with Jolin's OK**

## 8. Open items

- [ ] Real technical challenge for each project (`challenge` field in `content/projects.ts`)
- [x] Style tests done and approved (Oct 28)
- [ ] One illustration per project slot (see "Artwork slots the site needs")
- [ ] Short loop animations once stills are approved
- [x] `--cobalt` added to `app/globals.css` and the `ColorToken` type (Oct 28)
- [ ] Review all `TODO(Jolin)` drafts: "What I designed" bullets, About story chapters and FAQ answers
- [ ] Review the drafted homepage band copy and link words in `content/site.ts` (also the About and How I work lines, which aren't marked TODO)
- [ ] Stack details for Message in a bottle, Busy Season and Legacy Link Studio
- [ ] Contact form service and endpoint
- [ ] Real clients or employers list for the About page, if Jolin wants one (the reference has a client list; ours shows tools instead)
- [ ] Remove `PillButton` if it stays unused
- [ ] Repo name and deploy target
- [ ] Optional: custom logo or wordmark in the art direction style
