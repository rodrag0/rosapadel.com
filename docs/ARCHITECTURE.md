# Website architecture and handoff

## What this repository owns

This is a client-rendered Vite/React marketing site, deployed as static files on Vercel. It owns the public product story, product detail pages, legal pages, demo/contact flow, and a visual preview of the player experience. It does not implement live court scoring or tournament operations. Product mockups and external demo links should not be mistaken for live integrations.

On this concept branch, the homepage tells this story: Vision with direct desktop/mobile app captures, the two hardware products and subscriptions, three-step match flow, the player app, actual event applications, real match footage, partners, and contact. `/events` explains how the pad score feed relates to tournament and club operations. The ROI calculator, 3D court and some legacy homepage components remain for comparison; the retired product carousel and catalog pages were removed. See `CONCEPT-2026-09.md` for reference analysis and media decisions.

## Runtime map

```text
index.html
  -> src/main.tsx
  -> src/App.tsx (providers and React Router)
      -> src/pages/Index.tsx (homepage sections)
      -> src/pages/Product.tsx (Vision / Portable)
      -> src/pages/Subscriptions.tsx (club / player)
      -> src/pages/{ForClubs,Investors}.tsx
      -> src/pages/Events.tsx
      -> src/pages/MatchSessionMatchi.tsx
      -> src/pages/{Imprint,PrivacyPolicy,CookiePolicy}Page.tsx
      -> src/pages/NotFound.tsx

src/lib/siteCopy.ts + src/lib/experienceCopy.ts (en/es/de)
  -> LanguageProvider
  -> page and section components through useLanguage()
```

`App.tsx` installs React Query, theme, language, tooltip, and toast providers. React Query is present as scaffolding; the marketing pages do not currently depend on a site API. Routes are client-side. `vercel.json` serves existing files first, then falls back to `index.html`; this keeps `public/sitemap.xml`, images, and other static assets from being rewritten as HTML.

`Index.tsx` composes the active homepage from `ExperienceHero.tsx` and the named sections in `HomeSections.tsx`. They read `experienceCopy.ts` and `productScreens.ts` using the existing language provider. `AppScreenshot.tsx` displays direct screenshots and opens a Radix dialog for enlargement, preserving keyboard focus and Escape behavior. Desktop/mobile captures are separate. `MatchProof` loads the real match video only after a visitor presses play and handles media failure. Video URLs live in `experienceMedia.ts`.

`Events.tsx` uses `EventApplications.tsx` for three real application views in Radix tabs and a Radix accordion for FAQs. The screenshots show current local apps with demonstration data; the website is not an event-management engine. `ContactCTA` retains the existing lead processor and accepts optional `editorial` styling and `defaultObjective` props; the events page preselects tournaments. `experience.css` scopes the new layout to `.experience-page` using the existing theme tokens. Screenshot provenance lives in `public/product-screens/README.md`.

## Content, brand, and product claims

`src/lib/siteCopy.ts` contains shared navigation, contact, legal, and legacy homepage text in English (`en`), Spanish (`es`), and German (`de`). `experienceCopy.ts` contains the alternative homepage and event content, with one shared TypeScript shape across all languages. Components use the existing `useLanguage()` provider. The choice is saved as `rosa-language`; browser language is the initial fallback. Keep language blocks aligned and check each language in the browser.

Product and subscription pages use `productCatalog.ts` in all three languages. `/for-clubs`, `/investors`, and the Matchi session page still contain English text directly in their page components. The language switcher does not fully translate those routes. `BrandText.tsx` renders lowercase `rosa` in the brand accent where used.

Write the brand as lowercase `rosa` in new copy. The hardware catalog is only `rosa Vision` and `rosa Portable`. Club and `rosa Player` subscriptions are separate offers, not extra hardware tiers. Vision combines connected scoring and video; Portable is the offline LED scoring product without tournament management. See `PRODUCT-CATALOG.md` for the KB sources and current boundaries. Do not reuse historical prices or infer final subscription entitlements. Keep mock data visibly separate from claims of live operation.

`ThemeProvider.tsx` controls the `light`/`dark` class on the document. It uses `rosa-theme` and `rosa-theme-manual` in local storage; `src/index.css` and `tailwind.config.ts` define the visual system. App captures retain the actual source app appearance in both website themes. The 3D court is not loaded on the current homepage.

## Routes and links

`src/App.tsx` defines `/`, `/events`, `/products/vision`, `/products/portable`, `/subscriptions`, `/for-clubs`, `/investors`, `/match-session/matchi-live-score`, `/imprint`, `/privacy-policy`, `/cookie-policy`, and a `*` 404 route. Retired product URLs redirect through React Router and Vercel; only current URLs appear in the sitemap. The Matchi page remains absent from the sitemap and adds a `noindex, nofollow` meta tag; the URL can still be shared directly. New routes need a route entry, navigation decision, title/description handling, and a direct-link check after deployment.

Use `getSectionHref(pathname, id)` from `src/lib/siteLinks.ts` for homepage anchors from subpages. It returns `#id` on the homepage and `/#id` elsewhere. Section IDs live in the homepage components or their wrappers.

## External services and data

| Concern | Current implementation | Change impact |
| --- | --- | --- |
| Demo/contact requests | Browser POST to `https://formsubmit.co/ajax/info@rosapadel.com` in `ContactCTA.tsx`; Zod client-side validation and toast/success state | Test without sending real leads; update privacy text if processor changes |
| Analytics | Microsoft Clarity loader in `index.html` | Review consent, cookie, and privacy statements before changing tracking |
| Legacy player preview | `PlayerExperience.tsx` is retained for reference but is not mounted on this homepage | The main interactive match demo remains unlinked |
| Real match proof | `HomeSections.tsx` uses `experienceMedia.ts` for the existing poster and VPS video | The full video is fetched only after play; handle VPS downtime without breaking the page |
| Matchi session | `MatchSessionMatchi.tsx` uses a video at `https://padelkarte.com/media/rosavstiebreak.mp4` and links to a separate management demo | Video is hosted on a separate VPS; check HTTP availability and playback if the page changes |
| Preferences | `rosa-language`, `rosa-theme`, `rosa-theme-manual` in local storage | Keep preference behavior and legal table aligned |
| Images/fonts | Bundled `src/assets/` and `public/` files; Pretendard font in `public/fonts/` | Check asset URLs and loading in production build |

There is no application database or server API in this repository. The legal pages are part of the site, but their statements should be checked against the actual services in use. In particular, Clarity is loaded in `index.html` while some cookie/legal language describes limited tracking; treat that as an open review item, not as settled compliance guidance.

## Change and release workflow

1. Run `npm ci`, then `npm run dev`; check the changed page in all three languages and at mobile and desktop widths.
2. Run `npm run build`, `npm run lint`, and `npm test`. The current automated tests do not cover meaningful page behavior, so manually verify navigation, forms, theme, and 3D rendering for affected changes.
3. Open a pull request from a feature branch. Confirm Vercel's actual Production branch under Project Settings before choosing the PR base. Review the preview deployment, then merge only after sign-off.
4. After deployment, verify the public URL and direct visits to changed routes. Roll back through Vercel or revert the merge if a production issue appears.

Keep credentials out of commits. This repo's deployment configuration is `vercel.json`; Vercel project settings and environment variables live outside Git. At this handoff, Vercel Production and GitHub's default branch both track `main`. The older `rosa-web-live` branch is synchronized to the same commit for continuity but should not be the base for new work. The separate VPS serving the Matchi video is not managed by this website repo.

This concept stays on `codex/vision-events-concept` until reviewed. Do not merge
it into production or Alfonso's branch without an explicit decision. Browser
checks can be repeated using `scripts/verify-experience.mjs`; see the README.
