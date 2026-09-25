# Product catalog

## Current commercial model (September 25, 2026)

- **rosa Vision**: the full connected court system, combining the former HD
  scoring platform with video, replay and review capabilities. It is not an
  add-on that requires buying a separate Core HD product.
- **rosa Portable**: the portable LED scoreboard product, controlled with pads
  and usable offline. Camera, video and tournament management are not included.
- **Club subscription**: separately sold B2B software and services for clubs.
- **rosa Player subscription**: separately sold B2C services. Padel Chess Engine
  belongs to this player layer; the former Vision Pro offer must not be silently
  bundled into it or presented as a third hardware product.

Hardware and subscription offers must not be presented as an entry/growth/advanced
hardware ladder. Final subscription tier names, prices, entitlements, exclusions
and launch status still need an approved commercial matrix. Do not copy numbers
from historical finance workbooks or invent Basic/Pro tiers. The public site
currently explains the two subscription audiences and offers a contact path.

## Evidence and precedence

1. Rodrigo's September 25 correction: only Vision and Portable are current
   hardware products; Portable corresponds to LED, Vision combines HD and Vision.
2. Company KB: `wiki/product/Product Line And Subscription Architecture.md`
   and `wiki/decisions/Product Line Taxonomy August 2026.md` (August 22).
3. KB source summary: `wiki/sources/Product Catalog And PadelCity Proposal
   August 2026.md`. This supports the modular offer, not current pricing.

These pages are in the company LLM Wiki under HOME / Rosa KB. Its general
`Product Overview.md` still carries older names; the specific taxonomy decision
and the product owner's latest correction take precedence. Internal `COREHD`
repository and firmware names can remain unchanged.

## Implementation

`src/lib/productCatalog.ts` is the single commercial catalog for the homepage,
navigation, footer, product pages and investor product list. It contains en/es/de
copy. `Product.tsx` renders `/products/vision` and `/products/portable`;
`Subscriptions.tsx` renders `/subscriptions` with club and player anchors.

Legacy routes redirect in both React Router and Vercel:

| Previous URL | Current URL |
| --- | --- |
| `/products/core-led` | `/products/portable` |
| `/products/core-hd` | `/products/vision` |
| `/products/coach` | `/subscriptions#player` |

The sitemap lists only current destinations. Retired product page components and
the unused legacy catalog/carousel data were removed to prevent accidental reuse.
This change is on the alternative concept branch, not production.
