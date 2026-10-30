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
- (Oct 29: now a git repo, pushed to GitHub, still not deployed)

## Oct 29, 2026 (session 3): banners, copy, hover, cleanup, GitHub

### Done
- **"Next project" banners** (`components/case/NextProject.tsx`): all five projects now have `bannerArt` in `content/projects.ts`. The band under a page shows the *next* project's banner (so the Busy Season banner sits under Message in a bottle, and so on). `msg-banner.webp` was Jolin's; the other four (`busy-season-`, `dewstick-`, `legacy-link-studio-`, `portfolio-banner.webp`, all 3168 x 1344) were built from existing art with sharp, not newly drawn: Busy Season resized from its hero base, Dewstick and Portfolio extended on the flat red left side, Legacy scaled up and trimmed from the top sky (mirroring doubled the houses, so it was dropped)
- **Banner height:** `aspect-ratio` in `NextProject.module.css` changed from 3168 / 1344 to 3168 / 1000 (about 25% shorter, a thin strip cropped top and bottom). Lower the 1000 for shorter, 1344 is the old height
- **Message in a bottle hero copy** (`BottleHero.tsx` defaults) rewritten to match the idea: "Let your thoughts fall away" / "A quiet diary where every word breaks into letters and settles into a pile that grows with you." / button "Start writing". The old copy described a send-to-the-future app
- **Gallery card hover:** the roll-up reveal only worked once per card, because a returning image was already fully revealed and a CSS transition had nothing to animate. Now a keyframe animation (`rollUp`) replays on every hover, switched on by `data-rolling` after the first hover so nothing animates on load, and off for reduced motion
- **Longer homepage descriptions:** new required `details` field on `Project`, shown as a second paragraph under the summary in each project band (`more` prop on `FeatureBand`). In the two tiles it is held to the left 46% so it stays clear of the art. Written from existing content only, so reword in `content/projects.ts`
- **Cleanup:** 35 unused images and videos (about 57 MB, the original PNGs and MP4s) moved out of `public/` to `C:\Users\jolin\Documents\portfolio-v2-unused-images\` (outside the project, nothing deleted). `public/` is now 4.8 MB. Delete that folder when sure. The four `bands/footer-N.webp` are used by `Marquee.tsx` through a template string
- **GitHub:** project is now a git repo, one commit pushed to https://github.com/Jolin-ma/portfolio-v2 (public, branch `main`). `.idea/` added to `.gitignore`. Nothing is deployed

### Not checked
- Type check passes, but none of today's changes were looked at in a browser: banner crop and text contrast (Legacy's pink hills behind the title are the lightest), the longer band text at tablet widths (about 770 to 1100px, tiles most at risk), the card roll-up by eye
- Legacy banner is scaled about 2.4x, so check it for softness on a large screen

## Oct 30, 2026 (session 4): browser check of session 3

### Done
- Rebuilt after the cleanup: `out/` is now 7.0 MB (was 35 MB)
- **Checked in a browser:** the Busy Season and Legacy "next project" banners read well and Legacy isn't visibly soft at 1440. Phone and tablet widths were checked by loading the page in a fixed-width iframe (the browser window still won't shrink)
- **Longer descriptions didn't fit in the two tiles:** at 1440 both paragraphs ran over the corner art, and below about 1024 the text was cut off at the tile's bottom. Jolin chose to show **only the summary in the tiles** (`more={undefined}` in `Features.tsx`), so the `details` field is no longer shown for Message in a bottle and Busy Season
- **Same for the Legacy cover band:** its art has no empty left side, so the second paragraph ran over the house and dotted path. Now summary only. Dewstick and This portfolio keep both paragraphs (checked at 1024 and 1440)
- Tile corner art slightly smaller so the summary clears it: 52% to 46% of the tile on desktop, 46% to 40% at 1024 and under. Measured: no overlap or clipping from 1100 to 1920px

### Still slightly off
- Around 800 and 1024px the last line of the Message in a bottle summary touches the top corner of the bottle art (10 to 16px)
- At 1024px Legacy's "Press play." link sits right beside the little house on the left. Fine at 1440
- Card roll-up hover still not looked at by eye

### Making the e-commerce side visible (same session)
Jolin felt v2 read as pure web dev. Four changes, look unchanged:
- **Hero line:** "I design and build engaging websites and online stores." (Jolin's final wording, after trying a longer sentence that was too heavy). `site.tagline` (meta description) is "I design and build websites and online stores"
- **"What I do" band** (`components/sections/WhatIDo.tsx`, words in `whatIDo` in `content/site.ts`), cream, right after "Open to new work!": two lanes, **Build** (Figma, React / Next.js, WordPress) and **Run the store** (Shopify admin, product data, listings, order flow). Run the store links to `/about/#counter`
- **Dewstick, "From the store side":** new optional `store` field on `Project`, rendered as a case chapter after "The idea". Five points: products and variants, why the shades are laid out that way, cart and checkout, bilingual product pages, honest where proof is missing. All facts from the Dewstick repo (`PRODUCT.md`, README, `shopify-theme/sections/main-product.liquid`, locales). Dewstick's homepage `details` rewritten to lead with the store side
- **"Behind the counter"** on the About page (`components/about/BehindTheCounter.tsx`, words in `counter` in `content/about.ts`), plum band after the story: online orders, BOPIS, what the counter taught me. Facts only from the Shopify developer resume and cover letter (7 years, Whitby, last two years in the Shopify admin, BOPIS, customer records and merging duplicates, the move to Shopify). **No numbers on purpose** (the master resume's order and SKU figures were left out). The third point is a `TODO(Jolin)`: my wording of her view, needs her voice and a real example
- Checked at 1440 and 390 (What I do), Dewstick and About at 1440. Build passes

### Dewstick hero image fix (same session)
- The Oct 29 cleanup moved `dewstick page.png` out of `public/`, but `DewHero.tsx` used it (written as `dewstick%20page.png`, so the unused-file check missed it). The case study hero showed a broken image. Now a webp copy, `public/images/dewstick-page.webp` (40 KB), like the other two hero bases. The original stays in the unused folder
- Checked all 48 image paths in `app/`, `components/` and `content/`: every one exists now

### "Next project" banners: blue wash removed (same session)
- Jolin didn't want the navy gradient (`.wash`) tinting the bottom left of the banners. Removed from `NextProject.tsx` and `.module.css`; the cream title now has a soft plum text shadow instead. Checked all five banners at 1440: true colors, titles readable. Faintest spot is the small "NEXT PROJECT" label on Legacy's pink hills

### Page curtain: Jolin's full-screen art (same session)
- Jolin drew six full-screen 16:9 curtain pictures (flat background in the project color, subject in the lower middle). Converted to webp in `public/images/curtain/` (2560 x 1440, 24 to 49 KB each). PNG originals moved to `C:\Users\jolin\Documents\portfolio-v2-unused-images\curtain-originals\`
- `CurtainTarget` has an optional `art` (`{ src, bg? }`); projects set `curtainArt` in `content/projects.ts`, About sets it on `aboutCurtain`. Message in a bottle uses `bg: "#62a1d9"` because its art is a little deeper than `--pool`; the others match their tokens exactly
- The picture is pinned to the bottom of the screen and the title sits in the empty sky above it. Portrait screens scale the picture to 180vw wide so the subject isn't cropped (panel color fills above). All six are preloaded after the first page load
- Checked at 1440 x 800, 2133 x 1012 and 390 x 844. On phones the Dewstick balm comes out small, because it's small in its frame
- **Home curtain** added too: `homeCurtain` (moved from `TransitionLink.tsx` to `content/site.ts`) now uses `curtain-home.webp` (open book of the projects) on cream, `bg: "#f2e8d1"`. It's the default for any link without its own curtain
- The old drawings are still used in the **menu overlay** only

### About page: illustrated portrait (same session)
- **Later replaced by Jolin's About hero art** (`about/about-hero.webp`, 2560 x 1448: Jolin on a laptop, project icons arching overhead, on paper cream). `AboutHero` rebuilt: title and subline centered on the art's paper color `#faf3e5` (subline in tomato for contrast), the picture under them at most 70vh tall and shrunk to fit (never cropped) on wide screens, 6:5 side crop on phones. The arch portrait and its overlap are gone; the intro stays on the blue band below. Checked at 1440, 900 and 390
- The About hero now uses the illustrated portrait `bands/me-illustration.webp` (720 x 900, same 4:5 as the frame) instead of the photo `me.webp`. `me.webp` is no longer used anywhere but still sits in `public/images/`
- Digital marketing added to the About hero: subline "A web designer, front-end developer and digital marketer in Oshawa, ON." and one sentence in the intro (short-form video ads for agencies, signup funnels that track where visitors came from; from Busy Season and Dewstick). The About page's meta description (`app/about/page.tsx`) now includes digital marketing too
- Homepage meta description too: `site.focus` is now "UI Design, Front-End Development and Digital Marketing" (only used in `app/layout.tsx`)
- **Story chapter 1** now uses Jolin's illustrated office, `public/images/about/home-office.webp` (1760 x 1169; replaced once with Jolin's second version, the autumn one; PNG originals, both versions, in `portfolio-v2-unused-images\about-originals\`). The old photo `public/images/home-office.webp` is now unused, like `me.webp`
- **Story chapters 2 and 3 reworded** for the e-commerce and marketing side ("Then I build it, and help it sell…", "Now I'm open to roles in web design, e-commerce and digital marketing…"). Both now use Jolin's art too: `about/story-projects.webp` and `about/story-open-to-work.webp` (PNGs in `about-originals`). Chapter 3 later swapped for the red puzzle-piece browser window (the open shop moved to the "Open to new work!" band). All three story pictures are 3:2, so the story frame (`Story.module.css`) changed from 2:1 (4:3 on phones) to 3:2 everywhere and nothing is trimmed
- **"Open to new work!" text** (`bands.openToWork`, used on the homepage and About page): "I'm open to roles in web design, e-commerce and digital marketing. If you have a project or a role in mind, I'd love to hear about it." The footer marquee still says "Open to web design opportunities" (`site.marquee`); `site.status` says the same but isn't used anywhere
- **About story, final art:** Jolin's hand-drawn set (same style as the About hero, Jolin in each): `about/story-1-desk.webp`, `story-2-projects.webp`, `story-3-doorway.webp` (1760 x 1314, 4:3). New file names on purpose: reusing the old names made browsers show cached old pictures. Story section restyled like the hero: full-width band on the art's paper `#faf3e5` (was pool blue), each 4:3 picture centered with no frame, up to 1100px wide and at most 70vh tall (840 x 630 at 1440 x 900), edges feathered 4% with a CSS mask so no seam shows. Story paragraphs set like the hero subline (Fraunces 800, tomato, 19 to 25px); tomato on that cream is 3.54:1, which passes only as large text, so keep it at least 19px bold. (A blue strip behind each paragraph was tried and undone.) The hero's intro band went the same way: blue to the paper cream, subline type, and shortened to "I design in Figma and build it myself, so nothing gets lost on the way to the browser. Then I help it sell, with short-form video ads and signup funnels." (the "small stuff" sentence about buttons, keyboard menus and fast first screens was dropped) Earlier versions and all PNGs are in `portfolio-v2-unused-images\about-originals\`
- **"Open to new work!" band removed from the About page** (the homepage one stays). The `fitBand` option and hex `bg` added to `FeatureBand` for it were removed again; `FeatureBand.tsx` matches the commit
- Homepage tab title: "Jolin Ma · Web designer & digital marketer" (`app/layout.tsx`). Other pages keep "<page> · Jolin Ma"

## Oct 30, 2026 (session 5): challenges, commit, live on Vercel

### Done
- **"The challenge" written for all five projects.** `challenge` in `content/projects.ts` is now an object: `title`, `broke`, `tried`, `fixed`, `learned`. The case page shows the title, then the four steps as a list styled like "From the store side". Backticks in the text show as code (`withCode()` in `app/work/[slug]/page.tsx`)
  - Message in a bottle, Busy Season, Legacy Link Studio: Jolin's own text, headings in sentence case. Busy Season's "What fixed it" reworded so the ads are for agencies' home service clients, not home service businesses directly
  - Dewstick: "Telling shades apart in the cart", redrafted from the real code (`Dewstick/shop/site.js`, `dewstick-next/src/lib/cart-actions.ts`): each shade is a variant with its own ID, and `addToCart()` matches lines on it. "What broke" is written as the risk avoided, since it isn't known whether shades ever actually merged. If they did, rewrite it as a real bug
  - This portfolio: "A hover effect that only worked once", the gallery card roll-up bug from session 3. Its last sentence ("I now hover in and out a few times…") is a drafted habit, **keep only if true**
- **Committed and pushed:** `114a713` on `main`
- **Live on Vercel: https://jolinma.vercel.app** (project `portfolio-v2`, team "Jolin's projects", Next.js preset, defaults). Every push to `main` redeploys. The first domain, `portfolio-v2-sooty-xi.vercel.app`, now 307-redirects to the new one. Team and deployment URLs (`…-legacylinkstudio.vercel.app`) ask for a Vercel login, so don't share them. The Vercel MCP can't create projects (403), so dashboard steps go through Chrome
- Checked live without a login: home, About, all case pages, curtain art and the 404 page
- **Unused images:** `me.webp` and `home-office.webp` moved to `portfolio-v2-unused-images\`. Every other file in `public/` is used (the four `bands/footer-N.webp` through a template string in `Marquee.tsx`). `public/` is now 6.1 MB

## Start here tomorrow: the other pages

1. **About page** (`/about/`): hero portrait and all three story pictures done Oct 30. FAQ section removed Oct 30 (component, styles and questions deleted; in the first commit if wanted back). Skills and Playground tiles now reuse the homepage art (pegboard on sapphire, playground video on plum). "Open to new work!" on the About page now uses Jolin's open shop art (`about/open-to-work.webp`, 1200 x 1500), on the art's own background `#f2ad30` (`FeatureBand` `bg` now also takes a hex color), and the new `fitBand` option makes the band exactly as tall as the picture (612px at 1440). No placeholder drawings left on the About page
2. **Case study pages** (`/work/[slug]/`): the header band still shows the placeholder illustration. The new band and card art could go here
3. **Menu overlay:** still the placeholder gardener and project drawings (every page curtain, Home included, now uses Jolin's art, Oct 30)
4. **404 page:** placeholder bottle
5. **Update `PORTFOLIO_HANDOFF.md`:** it's behind on most of the above (hero colors, logo, cursor, new layouts, tokens). Only the GalleryCard note was kept current
6. ~~Clean up `public/images/`~~ done Oct 29, `out/` confirmed 7 MB on Oct 30
7. ~~Look at session 3's changes in a browser~~ done Oct 30 (see session 4). Not committed yet

### Still open
- Hero animation (Jolin to decide)
- Phone and tablet check of the whole homepage
- Copy in Jolin's own voice: `TODO(Jolin)` drafts and band copy in `content/site.ts`
- Stack details for Message in a bottle, Busy Season, Legacy Link Studio
- Contact form endpoint (`NEXT_PUBLIC_FORM_ENDPOINT` in `.env.local`)
- Not yet tested: curtain sweep by eye, reduced motion in a real browser, full keyboard pass, Lighthouse
- Two Elsewhere cards (Dewstick in Figma, Dewstick source code) show a faint seam where the art's textured top meets the flat card color
- `PillButton` is unused; `AGENTS.md` is managed by Next.js (keep it)
- Decide whether the repo should stay public while `TODO(Jolin)` drafts and the handoff and progress notes are in it
