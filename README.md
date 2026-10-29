# portfolio-v2

Jolin Ma's portfolio. Next.js 16 (App Router), React 19, TypeScript and CSS Modules,
built as a static export so it can be hosted anywhere.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # writes plain HTML/CSS/JS to /out
npm start        # serves /out locally
```

Contact form: copy your Formspree (or similar) endpoint into `.env.local`:

```
NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xxxxxxx
```

Without it, the form still validates but says it isn't connected yet.

## Folders

| Folder | What's in it |
|---|---|
| `app/` | Routes. `layout.tsx` wraps every page (fonts, header, footer, page curtain, hero color script). `page.tsx` is the homepage. `work/[slug]/page.tsx` is the one case study template. `globals.css` holds the design tokens. |
| `components/layout/` | Pieces on every page: `Header`, `MenuOverlay`, `Footer`, `PageCurtain` (the route transition). |
| `components/sections/` | Homepage sections, top to bottom: `Hero`, `WorkGrid`, `HowIWork`, `About`, `Playground`, `Contact`, plus the footer `Marquee`. |
| `components/case/` | Case study parts: `CaseHeader`, `CaseSection`, `ChallengePlaceholder`, `NextProject`. |
| `components/ui/` | Small reusable pieces: `ProjectCard`, `RollLink`, `PillButton`, `PillInput`, `Reveal`, `Illustration`, `TransitionLink`. |
| `content/` | All the words. `site.ts` (bio, skills, links, hero colors) and `projects.ts` (every project). Edit these, not the components. |
| `public/images/` | Screenshots and photos. Real illustrations go here later. |

## How the main pieces work

- **Page curtain:** `TransitionLink` asks `PageCurtain` to play the cover sweep, *then* navigates, then the
  curtain lifts once the new path renders. Same-page links (like `/#about` on the homepage) skip it.
- **Hero colors:** a tiny inline script in `layout.tsx` picks a random pair from `heroPairs` and sets CSS
  variables before the first paint, so there's no flash of the default colors.
- **Illustrations:** `Illustration.tsx` draws each placeholder motif twice: a fill copy (shifted, with paper
  grain) and an outline copy on top. The offset gives the riso misregistration. Pass `src` to swap in real art.
- **Hover only on desktop:** hover effects sit inside `@media (min-width: 1025px) and (hover: hover)`.
- **Reduced motion:** a block in `globals.css` stops all CSS animation, and the curtain and reveals check
  `prefers-reduced-motion` in JS.

## Still to do

- Real "challenge" write-ups (`challenge` in `content/projects.ts`) and the lines marked `TODO(Jolin)`
- Stack details for Message in a bottle, Busy Season and Legacy Link Studio
- Real illustrations and loops to replace the placeholders
- Contact form endpoint
- Lighthouse scores for the "This portfolio" case study
- Repo and deploy (Vercel)
