# ROSA Brand Profile (v1)

Last updated: 2026-03-12

## 1) Brand Core

### Brand name
ROSA

### Brand idea
ROSA makes padel matches feel professional, trackable, and smarter, from simple scoring to AI-powered performance insights.

### Purpose
We exist to elevate padel experiences for clubs, tournaments, and players by turning every match into clear, reliable, and actionable game intelligence.

### Positioning statement
For clubs, tournaments, and players who want modern match management and analysis, ROSA is a smart padel platform that combines real-time scoring hardware with advanced analytics. Unlike generic scoreboards or fragmented tools, ROSA offers a connected in-game and post-game system that scales from plug-and-play courts to AI-assisted performance review.

### Audience
- Club owners and operators
- Tournament organizers and referees
- Amateur and competitive players
- Coaches and performance-focused teams

## 2) Product Architecture and Messaging

Current product notes mention both `Vision` and `Insight` naming. Keep one naming system across web, sales, and product UI.

Recommended structure:
- ROSA Core LED: Entry-level portable smart scoring
- ROSA Core HD: Professional HD scoring and richer match display
- ROSA Vision (or Insight Pro): Full analytics, replay, AI insights

Messaging ladder:
- Core LED: "Simple, robust, plug-and-play scoring."
- Core HD: "Professional court display with flexible control."
- Vision/Insight Pro: "AI-driven match intelligence and post-match analysis."

## 3) Visual Identity

Source assets:
- `C:/Users/Rodrigo/Documents/rosa/MARKETING/logos/icon only`
- `C:/Users/Rodrigo/Documents/rosa/MARKETING/logos/rosa`
- `C:/Users/Rodrigo/Documents/rosa/MARKETING/logos/rosa padel`

### Logo system
- Primary wordmark: `rosa_dark_mode.png`, `rosa_light_mode.png`
- Product lockup: `rosa_padel_dark_mode.png`, `rosa_padel_light_mode.png`
- App/icon mark: `dark_mode_icon.svg`, `light_mode_icon.svg`

### Logo behavior
- Use `rosa` wordmark for brand-level communication.
- Use `rosa pádel` lockup for sport/category-facing placements.
- Use icon-only mark for app icons, favicons, social avatars, and compact UI.

### Clearspace and size
- Minimum clearspace: 1x stroke/module width of the circular `o` motif around all sides.
- Minimum digital sizes:
- Wordmark: 160 px width
- Lockup (`rosa pádel`): 220 px width
- Icon: 24 px for UI, 48 px+ for marketing

### Incorrect usage
- Do not change pink hue from `#E4007C`.
- Do not use gradients or outlines on the logo.
- Do not rotate, condense, or stretch.
- Do not swap element colors outside approved mode mappings.

## 4) Color System

### Core brand colors
- Rosa Hot Pink: `#E4007C`
- Dark Neutral (light mode text/logo): `#232325`
- Light Neutral (dark mode text/logo): `#E2E2E2`

### Mode mappings
- Dark mode logo neutral: `#E2E2E2`
- Light mode logo neutral: `#232325`
- Pink stays constant in both modes: `#E4007C`

### Suggested UI tokens
```css
:root {
  --rosa-pink: #E4007C;
  --rosa-black: #232325;
  --rosa-white: #E2E2E2;

  /* Light mode */
  --bg: #FFFFFF;
  --surface: #F7F7F9;
  --text: #232325;
  --text-muted: #5E5E66;
  --accent: #E4007C;
}

[data-theme="dark"] {
  --bg: #111114;
  --surface: #1A1A1F;
  --text: #E2E2E2;
  --text-muted: #B4B4BC;
  --accent: #E4007C;
}
```

### Usage ratio
- Neutral tones: 70%
- Pink accent: 20%
- Functional/support colors: 10%

## 5) Typography

Typeface base provided: Pretendard (`C:/Users/Rodrigo/Documents/rosa/MARKETING/font/pretendard/public/static`), with logo basis in Pretendard SemiBold.

### Type roles
- Display/H1: Pretendard Bold (700)
- Heading/H2-H4: Pretendard SemiBold (600)
- Body: Pretendard Regular (400)
- UI labels/buttons: Pretendard Medium (500)
- Data-heavy UI (tables/stats): Pretendard Medium (500) with tabular alignment if available

### Recommended scale
- H1: 56/60
- H2: 40/46
- H3: 32/38
- H4: 24/30
- Body L: 18/28
- Body: 16/24
- Caption: 14/20
- Micro: 12/16

## 6) Voice and Tone

### Voice attributes
- Precise: Clear outcomes, no fluff
- Athletic: Energetic and performance-oriented
- Practical: Operationally useful for clubs and events
- Credible: Data-backed, never exaggerated

### Tone by context
- Website hero: Bold and aspirational
- Product pages: Structured and specific
- In-app guidance: Direct and instructional
- Support docs: Calm, concise, and solution-first

### Copy principles
- Lead with value, then features.
- Prefer concrete nouns and measurable outcomes.
- Avoid overclaiming AI; describe what it actually detects or reports.

## 7) Messaging Pillars

- Reliable Match Control: Scoring that does not break game flow
- Professional Experience: Tournament-grade presentation and control
- Actionable Intelligence: From scorekeeping to post-match insights

Proof points to reuse:
- Smart touchpads designed for practical in-game interaction
- Support for game modes and court-change logic
- Referee mode for competitive environments
- Replay + analytics stack in top-tier offer

## 8) Component Direction (Website + Product)

- Hero visual: Wordmark + product-in-action screenshot/video
- Stat cards: Use neutral backgrounds with pink numeric highlights
- Match timeline/replay UI: Pink for key events, neutrals for structure
- Product comparison tables: Keep ROSA pink as highlight for premium-tier capabilities

## 9) Asset Governance

- Keep source-of-truth logos in:
- `C:/Users/Rodrigo/Documents/rosa/MARKETING/logos`
- Keep source fonts in:
- `C:/Users/Rodrigo/Documents/rosa/MARKETING/font/pretendard`
- Export set to maintain:
- SVG: icon and any vector lockups
- PNG @1x/@2x: wordmark, lockup, icon variants for light/dark use

Naming convention:
- `rosa_[variant]_[mode].[ext]`
- Example: `rosa_wordmark_dark.png`, `rosa_icon_light.svg`

## 10) Immediate Next Decisions

1. Confirm final top-tier product name: `Vision` vs `Insight Pro`.
2. Approve this token set as website and app baseline.
3. Build a one-page Brand Guidelines PDF from this profile for partners and sponsors.
