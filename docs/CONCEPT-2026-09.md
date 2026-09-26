# September website concept

## September 25 revision

The catalog now follows the company KB and Rodrigo's correction: only rosa Vision
and rosa Portable are hardware products. Club and rosa Player subscriptions are
separate offers. Legacy HD/LED/Coach URLs redirect; no historical prices or
unapproved tier names are published. See `PRODUCT-CATALOG.md` for provenance.

Rodrigo rejected the photo/scrim hero, decorative feature icons and generic
illustrative tables. The current version uses a centered product presentation,
flat surfaces, restrained typography and direct captures of the actual apps.
At Rodrigo's request, the original rotating 3D court is restored in the hero,
without a decorative frame or gradient. Real app captures remain in the player
and events sections. The icon value strip remains unmounted.

`public/product-screens/` contains nine direct browser captures from rosaApp,
TournamentManager, LeagueManager and AmericanoTournamentTool. Desktop and phone
views are captured separately, not recreated as marketing UI. Each capture can
be enlarged in an accessible dialog. See that directory's README for provenance.

Tournament, league and Americano data was created in isolated local stores.
Original app source and saved data were not changed. The player app's existing
demo recording was served locally, with manual shot labels. These images do not
claim that mock tracking metrics or every integration are production-ready.

`productScreens.ts` owns the asset map and concise three-language presentation
copy. `AppScreenshot.tsx` owns enlargement; `EventApplications.tsx` owns the real
application gallery shared by the homepage and events page. The old content
examples in `experienceCopy.ts` are not used as screen representations.

Branch: `codex/vision-events-concept`, based on `main` at `e278d0b`.
This is an independent review proposal alongside Alfonso's work. Production and
`alfonso/primeros-cambios` are not the destination for these commits.

## Reference analysis

The supplied night-mode board provides the narrative: Vision first, product
family, three-step match flow, clubs and players, real proof, and contact.
Its small cards, dense spacing, generated imagery, uppercase brand spelling,
and unverified product promises are not specifications to copy.

The implementation keeps the existing Pretendard type, neutral surfaces,
Mexican-pink accent, lowercase brand treatment, language provider, theme
provider, form service, and product routes. Section spacing is 80-120 px on
desktop and 64-80 px on mobile; most content sits in open columns with dividers.
Display type uses discrete breakpoints rather than viewport-based font sizing.

The Decuir reference is used for the topic of event operations, not for its
copy, photographs, interface, or branding. Events receive a dedicated route,
navigation entry, event-format examples, and an explanation of the pad score
feed. The examples are explicitly illustrative and are not a tournament engine.

## Media and claims

- The homepage uses the existing real match poster and the VPS-hosted match
  video. No AI-generated photographs or competitor assets are included.
- The existing rotating court model is the homepage hero visual. It is labelled
  as a system illustration, has a pause/play control, respects reduced motion,
  and pauses rendering outside the viewport. The real match poster is its
  loading/error/WebGL fallback.
- Media URLs are centralized in `src/lib/experienceMedia.ts`.
- Vision combines scoring, video and event connections in one product; Portable
  provides offline LED scoring, without camera/video or tournament management.
- Feature availability depends on the confirmed setup and services. VAR means
  reviewing footage; no automatic or certified line-calling is promised.
- Event-format availability is confirmed during the club demo. The marketing
  examples do not assert every possible competition format is shipping.
- The main interactive match demo remains unlinked.

## Implementation map

- `experienceCopy.ts`: new home/event content in English, Spanish, and German.
- `ExperienceHero.tsx` and `HomeSections.tsx`: homepage narrative.
- `CourtPreview.tsx` and `Hero3DScene.tsx`: original court, lazy loading,
  responsive camera, theme materials and accessible playback controls.
- `AppScreenshot.tsx`: actual application captures and accessible enlargement.
- `EventApplications.tsx`: tournament, league and Americano application gallery.
- `productScreens.ts`: screenshot asset map and revised presentation copy.
- `Events.tsx`: event formats, scoring flow, compatibility, FAQ, and contact.
- `experience.css`: scoped, responsive styling using existing theme tokens.

The old product pages and unused product carousel/ladder have been replaced by
the shared catalog. Some unrelated legacy homepage components remain for
comparison. See `ARCHITECTURE.md` for the active route map.
