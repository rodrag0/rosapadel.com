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

`npm run preview` serves a local production build. Vitest covers referral/demo submissions and investor inquiries with mocked requests. A passing suite does not verify live email delivery, page layouts, translations or the 3D scene; check those separately in the browser.

### Search foundations

`npm run build` builds the client, a temporary server renderer in `dist-ssr`, and pre-rendered HTML for the existing marketing routes. It renders the same React components as the browser. Content and per-page metadata are available without JavaScript; the normal interactive app mounts afterwards with stored language/theme preferences. The 3D canvas remains client-only. `npm run check:seo` validates the generated HTML and metadata after a build.

Route metadata lives in `src/lib/seo.ts` and updates after browser navigation through `PageMetadata`. Public pages self-canonicalize. The recorded-match showcase remains `noindex, nofollow`; missing pages return 404 and do not canonicalize to home. Vercel serves the generated `404.html` through its native static 404 behavior, without a wildcard SPA rewrite. Explicit rewrites preserve standalone tools, and permanent redirects retain old product/tournament links and query parameters. Local `npm run preview` mirrors these route/status behaviors. `npm run dev` retains Vite's development fallback.

Apex-domain DNS/certificate coverage is a separate hosting configuration; website code cannot correct an invalid certificate before TLS establishes the request.

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
| Investor inquiry dialog | `src/components/rosa/InvestorContactDialog.tsx` |
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

## Online management-tool showcases

The repository publishes four standalone routes. They are intentionally absent from the marketing-site navigation:

- `/tournament-tool` — tournament operations, including the One Point Challenge mode
- `/americano-tool` — Americano setup, rotations, live scoring, timer, and standings
- `/league-tool` — league registration, scheduling, groups, results, progression, and insights
- `/rosa-app` — the player app with recorded match replay, shot browsing, and browser-local saved highlights

These showcase routes save changes in the current browser so they remain usable on the static Vercel deployment. Shared accounts, durable invitations, QR export services, and ROSA Vision court connections remain part of the server-backed applications for the VPS deployment.

The League showcase uses the production league engine bundled for the browser. Rebuild that adapter after engine changes with `npm run build:league-showcase`.

See [docs/PLAYER-APP-PREVIEW.md](docs/PLAYER-APP-PREVIEW.md) for the player app's packaging, media, verification, and backend boundaries. It opens directly, without a marketing-site wrapper or showcase banner.
