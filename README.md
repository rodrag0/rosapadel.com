# rosa padel website

This repository contains the public `www.rosapadel.com` marketing website. It explains the modular court-scoring products, introduces the planned Vision experience, and collects demo requests. It is not the scoring, tournament-management, or analytics backend.

Start with [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the page map, content flow, integrations, and change guidelines.

This branch (`codex/vision-events-concept`) contains an alternative homepage and
an `/events` page for review alongside Alfonso's work. It is not the production
branch. See [the concept notes](docs/CONCEPT-2026-09.md) for references, media,
product status, and scope. New home/event content is translated in
`src/lib/experienceCopy.ts` and `src/lib/productScreens.ts`; existing shared content stays in `siteCopy.ts`.

## Run locally

Prerequisites: Node.js and npm. Use the committed `package-lock.json` for reproducible installs.

```bash
npm ci
npm run dev
```

Vite runs on `http://localhost:8080` by default. No environment variables are required for the static site. The contact form calls an external service, so avoid sending test submissions to the real inbox.

Before opening a pull request:

```bash
npm run build
npm run lint
npm test
```

`npm run preview` serves a local production build. The existing Vitest test is only a smoke test; a passing test suite does not validate the pages, translations, contact form, or 3D scene.

At this handoff, lint has three existing errors in `src/components/ui/command.tsx`, `src/components/ui/textarea.tsx`, and `tailwind.config.ts`. Do not assume a new change caused those errors; still check for any additional lint findings.

## Where to change things

| Change | Start here |
| --- | --- |
| Shared homepage, navigation, legal, or CTA copy | `src/lib/siteCopy.ts` (English, Spanish, German) |
| Alternative homepage and event copy | `src/lib/experienceCopy.ts` (English, Spanish, German) |
| Events and tournaments | `src/pages/Events.tsx` |
| Product, clubs, investor, or Matchi page copy | The relevant file in `src/pages/` (currently mostly English) |
| Homepage section order | `src/pages/Index.tsx` |
| Routes and app-wide providers | `src/App.tsx` |
| Homepage visuals and interactions | `src/components/rosa/` |
| Retained legacy court animation (not mounted) | `src/components/rosa/Hero3DScene.tsx` |
| Real app screenshots and presentation | `public/product-screens/`, `src/lib/productScreens.ts`, `AppScreenshot.tsx` |
| Homepage media URLs | `src/lib/experienceMedia.ts` |
| Alternative layout styles | `src/experience.css` |
| Theme tokens and shared styles | `src/index.css`, `tailwind.config.ts` |
| Static files | `public/` |
| Contact form | `src/components/rosa/ContactCTA.tsx` |
| Matchi session video | `src/pages/MatchSessionMatchi.tsx` (video hosted outside this repo) |
| Sitemap and crawler rules | `public/sitemap.xml`, `public/robots.txt`, `vercel.json` |

`src/components/ui/` contains shared shadcn/Radix primitives. Prefer composing those in `src/components/rosa/` over editing every primitive for a page-specific change.

## Working on the site

1. At this handoff, GitHub's default branch and Vercel's Production branch are both `main`. Verify this setting before any future release rather than assuming it cannot change.
2. Create a feature branch from `main`. Open a pull request and review its Vercel preview on desktop and mobile before merging.
3. Update all three languages when changing `siteCopy.ts`. The product and audience pages have separate English copy; do not assume the language switcher translates them. Check product claims with Rodrigo, especially prototype and roadmap features.
4. For navigation, use `getSectionHref()` in `src/lib/siteLinks.ts` so links back to homepage sections work from subpages.
5. Review privacy/legal copy whenever changing analytics, form processing, or browser storage. The contact form currently uses FormSubmit; `index.html` loads Microsoft Clarity.

The production branch is configured in Vercel, not in this repository. A merge or push to that branch may publish immediately. No Vercel, GitHub, or VPS credentials should be committed here.

## Check this concept

With the dev server running, this browser verification checks responsive layouts
in three languages, theme variants, actual screenshot loading, image enlargement,
mobile navigation, event tabs, FAQ, video failure, and contact success/error. It intercepts
FormSubmit requests so it never sends real leads.

```bash
node scripts/verify-experience.mjs http://localhost:8080
```

Screenshots and a report are written to ignored `review.local/`. The optional
third argument changes the output directory. Install Playwright's Chromium
browser first if needed (`npx playwright install chromium`).
