# rosa padel website

This repository contains the public `www.rosapadel.com` marketing website. It explains the modular court-scoring products, introduces the planned Vision experience, and collects demo requests. It is not the scoring, tournament-management, or analytics backend.

Start with [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the page map, content flow, integrations, and change guidelines.

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
| Product, clubs, investor, or Matchi page copy | The relevant file in `src/pages/` (currently mostly English) |
| Homepage section order | `src/pages/Index.tsx` |
| Routes and app-wide providers | `src/App.tsx` |
| Homepage visuals and interactions | `src/components/rosa/` |
| Court animation | `src/components/rosa/Hero3DScene.tsx` |
| Theme tokens and shared styles | `src/index.css`, `tailwind.config.ts` |
| Static files | `public/` |
| Contact form | `src/components/rosa/ContactCTA.tsx` |
| Matchi session video | `src/pages/MatchSessionMatchi.tsx` (video hosted outside this repo) |
| Sitemap and crawler rules | `public/sitemap.xml`, `public/robots.txt`, `vercel.json` |

`src/components/ui/` contains shared shadcn/Radix primitives. Prefer composing those in `src/components/rosa/` over editing every primitive for a page-specific change.

## Working on the site

1. Check which Git branch Vercel tracks for Production before merging. At this handoff it is `rosa-web-live`, even though GitHub's default branch is `main`; the two must be kept in sync until Vercel is switched to `main`.
2. Create a feature branch from that production branch. Open a pull request and review its Vercel preview on desktop and mobile before merging.
3. Update all three languages when changing `siteCopy.ts`. The product and audience pages have separate English copy; do not assume the language switcher translates them. Check product claims with Rodrigo, especially prototype and roadmap features.
4. For navigation, use `getSectionHref()` in `src/lib/siteLinks.ts` so links back to homepage sections work from subpages.
5. Review privacy/legal copy whenever changing analytics, form processing, or browser storage. The contact form currently uses FormSubmit; `index.html` loads Microsoft Clarity.

The production branch is configured in Vercel, not in this repository. A merge or push to that branch may publish immediately. No Vercel, GitHub, or VPS credentials should be committed here.
