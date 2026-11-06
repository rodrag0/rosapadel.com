# ROSA preview design system

Proposed redesign, awaiting Rodrigo's review. This is not a rebrand or a production approval.

## Direction

An immersive sports-technology experience, explicitly selected by Rodrigo after rejecting two static proposals. A clean first viewport contains the actual ROSA symbol as a beveled3D object. Native scrolling separates and rotates its two original vector shapes, resolves into the official wordmark, then moves the camera into the original connected-court model. This is authored brand motion, not a loading screen or feature demonstration. Vision is the main product. Portable is a secondary scoring alternative, not an equal flagship. Actual product photography and software captures follow, with restrained spatial depth that continues the visual language. No gradients, particle wallpaper, emoji, fake dashboards or decorative card scaffolding.

## Typography

Self-hosted Pretendard Variable remains the brand type. Product display68/42, section60/46/36, club statement80/56/48, subhead24/22, body18/16, secondary14. The wordmark is the official bitmap, never re-typeset. Use breakpoint steps, never viewport-scaled type. Letter spacing0. Text measure68ch, bold500-650 with700 reserved for principal headings. No mono costume or decorative uppercase kickers.

## Colors

Light: background#fafafa, foreground#161618, secondary#56565d, rule#dedee2. Dark: background#0b0b0d, foreground#f5f5f7, secondary#a4a4ad, rule#303035. Exact symbol pink#e4007c; accessible button pink#cc0072 with white foreground. Green is availability/pre-sale only. The opening uses the user's chosen theme as a quiet stage for the3D mark; match/software sections use black and the club invitation uses one solid pink band. Both symbol and court use matte diffuse-only Lambert materials: no specular, metal, clearcoat, environment reflections or transmission/refraction. Bevel geometry and diffuse light retain shape, not gloss. Product photographs stay unobscured.

## Layout

Maximum content width1320px with24/48px gutters, generous96/112px section separation,16/24px within groups. Product photography keeps its complete aspect ratio. Feature lists use shared rules and real hierarchy rather than framed cards. Real tool captures retain clear demo context and link to their working demo.

## Components

72px navigation, clear current-page treatment, theme/language controls and accessible product menu. Commands use restrained6px radius and48px target; icon-only tools have accessible names. Tabs use an underline, not floating pills. Contact keeps its native labels, consent, validation and existing submission behavior.

Vision uses an automatically rotating feature gallery: eight vertical text tabs on desktop, a horizontal short-label rail on phones, and a stable right-hand media/detail stage. The active function is pink with a directional cue, never a colored card. Advance every7seconds while visible, including when the pointer rests over the gallery; hover must not silently pause or reset the timer. Pause for keyboard focus, native video playback, hidden document or offscreen state. Provide persistent pause/resume, native prev/next, keyboard tabs and horizontal touch gestures. Manual selection and resumed activity receive a fresh full interval, with no catch-up. Reduced-motion starts paused but permits explicit Play; live preference changes pause again. Real footage, saved public analysis excerpts and a labelled demo change with the feature. Images open full-size; video never autoplays. Native detail anchors work without JS, and failed media falls back honestly. Portable remains secondary.

## Motion and accessibility

The logo-to-court sequence is the focal motion. It scrubs reversibly over290svh desktop/250svh mobile without wheel interception, scroll locking or a timed gate. The footer exposes the next product and a native anchor past the intro. Navigation appears on scroll and always on keyboard focus. Product controls are revealed by the narrative and immediately on focus.3D renders only while the intro is visible and the document is active, with capped DPR. Supporting media uses bounded perspective/translation, not repeated fade-in lists. Reduced-motion, unavailable WebGL/IntersectionObserver, no-JS and direct-hash entry receive a static, readable product presentation; forms never depend on completing the animation. Verify all phases, pointer response, reverse scrolling, canvas pixels/framing, keyboard and native anchors at desktop/mobile sizes. No physical-device60fps certification is implied by headless acceptance.

The intro's visual timeline advances at most0.25progress units per second: a full-range jump takes at least four seconds, forward or reverse. Logo, wordmark, camera and product copy share this paced progress rather than raw scroll. Gentle input still tracks directly when below the cap. Only the latest scroll destination is retained; no queue of wheel events, global scroll throttling, body lock or forced viewing. Stop the timeline when paused, unready, offscreen, hidden or reduced-motion; resume with fresh frame timing. Discard elapsed time beyond64ms per frame so stalls do not cause a catch-up jump. Static/direct-anchor paths stay immediate.

## Impeccable use

Reviewed documentation-only v4.8.0 at upstream4f956490. Manual new-work/layout/craft-floor/polish guidance; no engine/detector, hooks, concept server or generated-image pipeline ran. See C:/Users/Rodrigo/.codex/skill-reviews/impeccable-20261031/REVIEW.md.
