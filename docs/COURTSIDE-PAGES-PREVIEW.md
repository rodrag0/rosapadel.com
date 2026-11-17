# Courtside detail pages preview

17 November 2026. Preview branch: `codex/courtside-pages-preview-20261117`. Production baseline: `75f2e49`. No production publication is authorized by this preview.

## Scope

- Vision, Portable, Clubs, Investors and Tournaments adopt the published homepage's photography-led Courtside visual language. The homepage itself is unchanged.
- Vision uses four media chapters with the actual scoring, VAR, match-review and current player-app captures. All eight feature anchors, qualification text and the public Final Expo replay remain available.
- Portable keeps its actual hardware photograph and its offline-scoring scope. Vision remains the principal system.
- Clubs retains the hardware-payback assumptions, exclusions, currency calculator and separate demo/referral contact modes.
- Investors retains the founder portraits, partner assets and working contact dialog. No funding, financial or traction claims were added.
- Tournaments keeps the three working demo links, actual app screenshots, QR confirmation rules and the organizer's role in Americanos.
- Legal and editorial pages use the same paper/ink typography without decorative containers. Their wording, dates, drafts, indexing policy and links are not promoted or revised.

## Implementation

`CourtsidePage.tsx` shares the navigation, origin/3D strip, photographic header, media/caption controls and footer. Detail-page styles are scoped in `courtside-pages.css` so the approved homepage remains unchanged. The primary image is visible at first paint; the reveal respects reduced motion. Video remains native and on demand.

All images and clips already belong to the production asset set. No new generated media, customer history, engineering pose recordings, private court data, prices or live-system actions were introduced.

## Verification

- All 83 unit tests pass. TypeScript, targeted lint, the client/SSR/prerender build and SEO checks pass for all 14 public routes.
- Browser checks pass for the five marketing pages at 1440, 820, 390 and 320 pixels, covering English, Spanish and German, light and dark themes, image decoding, heading bounds, contact anchors, investor dialog and all three event tabs.
- Five legal/editorial routes pass the narrow-screen reading-layout checks. No form was submitted during testing.
- Desktop and mobile canvas screenshots confirm that the reused 3D court is visible, moves and pauses correctly.
- The approved homepage source and styles are unchanged. Production release still requires Rodrigo's approval.
