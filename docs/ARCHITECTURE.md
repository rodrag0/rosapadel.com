# Website architecture and handoff

## What this repository owns

This is a client-rendered Vite/React marketing site, deployed as static files on Vercel. It owns the public product story, legal pages, demo/contact flow, and a visual preview of the player experience. It does not implement live court scoring or tournament operations. Product mockups and external demo links should not be mistaken for live integrations.

The homepage tells a deliberate story: problem and solution, product tiers, how they work, player experience, Vision roadmap, tournaments, club benefits, proof/partners, then contact. Reordering sections changes the sales narrative, not just the layout.

## Runtime map

```text
index.html
  -> src/main.tsx
  -> src/App.tsx (providers and React Router)
      -> src/pages/Index.tsx (homepage sections)
      -> src/pages/{Imprint,PrivacyPolicy,CookiePolicy}Page.tsx
      -> src/pages/NotFound.tsx

src/lib/siteCopy.ts (en/es/de)
  -> LanguageProvider
  -> page and section components through useLanguage()
```

`App.tsx` installs React Query, theme, language, tooltip, and toast providers. React Query is present as scaffolding; the marketing pages do not currently depend on a site API. Routes are client-side. `vercel.json` rewrites paths to `index.html`, allowing direct visits to the legal pages and 404 route. Check filesystem/static-asset handling before adding public XML or other standalone files.

`Index.tsx` composes the homepage from components in `src/components/rosa/`. Most sections render data from `siteCopy.ts` and use Framer Motion for in-view transitions. `HeroSection.tsx` lazy-loads `Hero3DScene.tsx`; the latter uses React Three Fiber, drei, and Three.js. The player dashboard in `PlayerExperience.tsx` uses sample match data and links to an external Vision Coach demo. It is a mockup, not a connected dashboard.

## Content, brand, and product claims

`src/lib/siteCopy.ts` is the source of truth for user-facing text in English (`en`), Spanish (`es`), and German (`de`), including page metadata and legal text. Components access the selected block through `useLanguage()`. The choice is saved as `rosa-language`; browser language is the initial fallback. When adding a section or field, add matching keys to all three blocks and check each language in the browser.

Write the brand as lowercase `rosa` in new copy. The product ladder is Core LED, Core HD, then the planned `rosa Vision` layer. Confirm hardware availability and individual features with Rodrigo before turning roadmap or prototype claims into present-tense promises. The tournament and player-experience sections describe capabilities and concepts, not an API contract. Keep mock data visibly separate from claims of live operation.

`ThemeProvider.tsx` controls the `light`/`dark` class on the document. It uses `rosa-theme` and `rosa-theme-manual` in local storage; `src/index.css` and `tailwind.config.ts` define the visual system. The court scene is part of the product explanation, so performance work should preserve a useful visual experience on desktop and mobile.

## Routes and links

The tracked site defines `/`, `/imprint`, `/privacy-policy`, `/cookie-policy`, and a `*` 404 route in `src/App.tsx`. New routes need a route entry, navigation decision, title/description handling, and a direct-link check after deployment. Some developer workspaces may contain routes that have not yet been committed; do not document those as live until they are merged and deployed.

Use `getSectionHref(pathname, id)` from `src/lib/siteLinks.ts` for homepage anchors from subpages. It returns `#id` on the homepage and `/#id` elsewhere. Section IDs live in the homepage components or their wrappers.

## External services and data

| Concern | Current implementation | Change impact |
| --- | --- | --- |
| Demo/contact requests | Browser POST to `https://formsubmit.co/ajax/info@rosapadel.com` in `ContactCTA.tsx`; Zod client-side validation and toast/success state | Test without sending real leads; update privacy text if processor changes |
| Analytics | Microsoft Clarity loader in `index.html` | Review consent, cookie, and privacy statements before changing tracking |
| Player demo | External URL in `PlayerExperience.tsx` | Validate link and wording if the demo changes |
| Preferences | `rosa-language`, `rosa-theme`, `rosa-theme-manual` in local storage | Keep preference behavior and legal table aligned |
| Images/fonts | Bundled `src/assets/` and `public/` files; Pretendard font in `public/fonts/` | Check asset URLs and loading in production build |

There is no application database or server API in this repository. The legal pages are part of the site, but their statements should be checked against the actual services in use. In particular, Clarity is loaded in `index.html` while some cookie/legal language describes limited tracking; treat that as an open review item, not as settled compliance guidance.

## Change and release workflow

1. Run `npm ci`, then `npm run dev`; check the changed page in all three languages and at mobile and desktop widths.
2. Run `npm run build`, `npm run lint`, and `npm test`. The current automated tests do not cover meaningful page behavior, so manually verify navigation, forms, theme, and 3D rendering for affected changes.
3. Open a pull request from a feature branch. Confirm Vercel's actual Production branch under Project Settings before choosing the PR base. Review the preview deployment, then merge only after sign-off.
4. After deployment, verify the public URL and direct visits to changed routes. Roll back through Vercel or revert the merge if a production issue appears.

Keep credentials out of commits. This repo's deployment configuration is `vercel.json`; Vercel project settings and environment variables live outside Git. A separate VPS serving media or operational demos is not managed by this website repo.
