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
| Marketing, navigation, legal, or CTA copy | `src/lib/siteCopy.ts` (English, Spanish, German) |
| Homepage section order | `src/pages/Index.tsx` |
| Routes and app-wide providers | `src/App.tsx` |
| Homepage visuals and interactions | `src/components/rosa/` |
| Court animation | `src/components/rosa/Hero3DScene.tsx` |
| Theme tokens and shared styles | `src/index.css`, `tailwind.config.ts` |
| Static files | `public/` |
| Contact form | `src/components/rosa/ContactCTA.tsx` |

`src/components/ui/` contains shared shadcn/Radix primitives. Prefer composing those in `src/components/rosa/` over editing every primitive for a page-specific change.

## Working on the site

1. Check which Git branch Vercel currently tracks for the Production environment. Do not assume it is `main`; this repo has had multiple active branches.
2. Create a feature branch from that production branch. Open a pull request and review its Vercel preview on desktop and mobile before merging.
3. Update all three languages when changing copy. Check product claims with Rodrigo: the site must distinguish available scoring/HD capabilities from planned Vision features and demonstrations.
4. For navigation, use `getSectionHref()` in `src/lib/siteLinks.ts` so links back to homepage sections work from subpages.
5. Review privacy/legal copy whenever changing analytics, form processing, or browser storage. The contact form currently uses FormSubmit; `index.html` loads Microsoft Clarity.

The production branch is configured in Vercel, not in this repository. A merge or push to that branch may publish immediately. No Vercel, GitHub, or VPS credentials should be committed here.
