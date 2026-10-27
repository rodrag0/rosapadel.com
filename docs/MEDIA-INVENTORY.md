# Website media inventory

Supplied assets are resized/compressed for the web without changing their content. Keep source originals outside the public bundle.

## Installed assets

| Asset | File | Location |
| --- | --- | --- |
| rosa vision full-court visualization | `public/images/products/rosa-vision-court.webp` | Homepage product card |
| rosa portable supplied product photo | `public/images/products/rosa-portable.webp` | Homepage product card and portable product page |
| German and Mexican flags | `public/images/flags/{de,mx}.svg` | Homepage hero, German technology / Mexican heart line |
| Final Expo 2026 preview, 18 October 2026 | [VPS MP4](https://cloud.rosapadel.com/media/tolito-mati-expo-20261018/preview-b450dc716753.mp4) | rosa vision product page, 29.96-second 720p preview |
| Final Expo preview poster | [VPS WebP](https://cloud.rosapadel.com/media/tolito-mati-expo-20261018/poster-6cb993f3d3ea.webp) | rosa vision player, real same-clip frame with saved overlays |
| Previous Invicto preview, 25 October 2026 | [VPS MP4](https://cloud.rosapadel.com/media/invicto-20261025/preview-a2ab3377007c.mp4) | Retained previous sample; no longer the vision page preview |
| Previous Invicto poster | [VPS WebP](https://cloud.rosapadel.com/media/invicto-20261025/poster-b5238bdc7f05.webp) | Retained with the previous sample |
| emprelatam, light theme | `src/assets/emprelatam-light.png` | Backed by, beside Campus Founders |
| emprelatam, dark theme | `src/assets/emprelatam-dark.png` | Backed by, beside Campus Founders |
| Rodrigo Ponce portrait | `public/images/team/rodrigo-ponce.webp` | Investor page, team |
| Leandro Ponce portrait | `public/images/team/leandro-ponce.webp` | Investor page, team |
| Saul Ortiz de la Tejera portrait | `public/images/team/saul-ortiz-de-la-tejera.webp` | Investor page, team |

Partner logos switch with `ThemeProvider`; the tagline appears below the logo row. On narrow screens the row scrolls horizontally. Portraits retain their 4:5 composition. The court image uses its full 16:9 frame rather than a cropped product detail.

Homepage product photos occupy the top of each product card edge to edge. The portable detail page uses an unframed, full-width hardware showcase with a specification rail below the image. Both preserve the full supplied composition without generated backgrounds or visual effects.

The flag graphics are self-hosted copies from [flag-icons](https://github.com/lipis/flag-icons), version 7.3.2 (MIT). The license notice is included at `public/images/flags/LICENSE.txt`. The hero line is localized through `siteCopy.hero.origin`; it does not claim a manufacturing location or certification.

## Pending replacements

1. Tournament page, "More play. Less admin." banner: awaiting suitable wide event/court media.
2. Tournament page, connected-court video/image: awaiting the rendering video or a frame from it.
3. Tournament page hero dashboard: current UI uses illustrative sample data; replace with an approved screenshot from TournamentManager.
4. Homepage player experience: current UI uses a sample dashboard; replace with an approved screenshot from rosa app.

The vision product page now plays Tolito / Mati vs Argañaras / Pablo, Final Expo 2026, 18 October 2026 (Mexico City). The retained 29.96-second clip shows the opening point at source 09:50-10:20. The saved initial score is 0-0, with team 2/Pablo serving; the first point is logged after the sample ends. The scorecard and exact saved match-time ROSA sponsor artwork (including its original "YOUR SPONSOR HERE" demonstration text) are baked into both video and poster. Do not add duplicate HTML overlays or claim additional commercial sponsors. Full camera framing is preserved; the source has no audio.

The player references public static VPS files, not media bundled in Git or a signed storage URL. Its "Open preview" CTA opens [this match's public share page](https://cloud.rosapadel.com/watch?grant=f4cab714-f796-4a31-9e41-7dcd05a5e384), not the raw MP4. MAIN preserved a separate private full recording for this showcase; the public share grant lasts until 26 October 2036, not literally forever. Original expired grants remain expired. Source, timing, sponsor and retention receipts remain outside the public bundle in `ENGINEERING/COREHD/Website_Tolito_Preview_20261026/`.

The cloud release owner must preserve both `/media/tolito-mati-expo-20261018/` and `/media/invicto-20261025/` in future release-root replacements. Preview/poster copies do not inherit the original recording/share expiry. Use native video/image loading, not an iframe or the private playback-signing API; no website CSP/CORS change is needed. The previous Invicto files remain available for existing references.

The original `/match-session/matchi-live-score` page and its existing poster/video remain unchanged so previously shared links keep working. The rotating court is an intentional interactive scene and should remain. Never add the private commercial proposal PDF or hardware/subscription prices to public media.
