# Website media inventory

Supplied assets are resized/compressed for the web without changing their content. Keep source originals outside the public bundle.

## Installed assets

| Asset | File | Location |
| --- | --- | --- |
| rosa vision full-court visualization | `public/images/products/rosa-vision-court.webp` | Homepage product card |
| rosa portable supplied product photo | `public/images/products/rosa-portable.webp` | Homepage product card and portable product page |
| German and Mexican flags | `public/images/flags/{de,mx}.svg` | Homepage hero, German technology / Mexican heart line |
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

The real match poster on the vision product page and the Matchi session video are existing media, not missing assets. The rotating court is an intentional interactive scene and should remain. Never add the private commercial proposal PDF or hardware/subscription prices to public media.
