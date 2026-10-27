# Comparison pages - review only

This branch extends the fixed foundations candidate2583eaa, not production. Its name remains inside the tested `codex/seo-review-*` production-build guard. The foundations preview and local4192 are unchanged.

Review routes: `/learn`, `/compare/rosa-vs-playsight`, `/learn/matchi-tv-alternatives`, `/compare/rosa-vs-padel-camera`. All four remain `noindex, nofollow` and outside the production sitemap until editorial/product approval. The three earlier general guide drafts are not presented as implemented routes. No publication date, star ratings, price or ranking is invented.

Source checks27 October2026:
- https://www.playsight.tv/products
- https://matchi.zendesk.com/hc/en-gb/articles/14786430982429-MATCHi-TV-General-information
- https://matchiplayers.zendesk.com/hc/en-gb/articles/14786639125917-MATCHi-TV
- https://www.padel.camera/

ROSA proof/limits: `ENGINEERING/COREHD/Website_SEO_Review_20261026/ROSA_COMPARISON_FACTS.md`, the existing comparison briefs and nonzero Tolito source/release receipts. The public demonstration's special retention and athlete appearance are not ordinary plan terms or an endorsement. Unknown competitor features remain questions, not absence claims. Prices and present-tense commercial availability need product review.

Hallmark pre-flight: existing Pretendard Variable font and theme/spacing tokens in `src/index.css`, official logo/navigation/footer, React/Vite/Tailwind and existing providers preserved. Editorial article layout, no new font, gradient, generated image, fake device chrome or decorative card sections. A real approved ROSA frame is the visual evidence. New pages use normal links, a native scrollable table region and stable16:9 media. No whole-site redesign.

Copy uses the supplied requirements and primary supplier descriptions; it is not a hands-on competitive test. Writing review is model-only, applying the avoid-ai-writing scope/fidelity principles to new prose before encoding it as typed data. No source-code rewrite detector or normalization tool is claimed as executed. Technical statements/URLs are preserved. Product/editorial approval remains open.

No main merge, production promotion, DNS, Cloud, Pi, service, account, media-retention or consent/form-processing change is part of this branch.

## Local acceptance

- Client/SSR build:15 routes plus404. `check:seo`, app TypeScript and changed-file ESLint passed.
- Full Vitest suite:30 tests across8 files passed.
-32 local browser/HTTP checks passed: all four draft routes, initial HTML/schema/canonicals, working internal links/anchors, sitemap exclusion, missing-route/assets404, unchanged tool HTML, production-build guard, no-JS1440/390, hydrated1440/768/390/320 with EN/ES/DE navigation preferences and light/dark themes. Article language stays explicitly English.
- Real approved match image loaded; mobile tables stay inside a keyboard-scrollable region. Hub, desktop article and mobile captures were visually inspected. Source27 October research was independently checked by MAIN with no material factual blocker for draft review, not final commercial/editorial approval.
- One local repeat build failed with Windows/OneDrive `ENOTEMPTY` while the preview was running. After stopping only this worktree's preview process, the full build completed. No production or other local server was touched. Earlier broad screenshots were taken before smooth scroll settled; corrected captures do not change the UI or media.

Evidence and exact comparison deployment receipt live outside Git at `HOME/Website/comparison-acceptance-20261027/`. The foundations receipt remains at `HOME/Website/seo-acceptance-20261026/REVIEW.md`. Remote protected-preview acceptance is recorded separately from these local checks; a Vercel login response is not the candidate HTML.
