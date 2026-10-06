# Hosted rosa app

Production URL: `https://www.rosapadel.com/rosa-app`

This is a standalone static publication of rosaApp, following the same deployment
pattern as `/tournament-tool`, `/americano-tool`, and `/league-tool`. It is not
linked from the marketing website and has no extra wrapper or showcase banner.
It does not publish the separate website design concept or touch Alfonso's branch.

## Architecture

Vercel rewrites `/rosa-app` and `/rosa-app/` to `public/rosa-app/index.html`.
The app has its own compiled React 19 runtime, CSS, and hash navigation, independent
of the marketing site's React 18 application. All assets use `/rosa-app/` URLs.
The page is noindex and omitted from the sitemap. This is not access control:
anyone with the URL can open it, and frontend JavaScript is readable by visitors.

Only compiled assets are published. No environment files, source maps, local
databases, authentication credentials, or development server are included.

## Current Boundaries

- Replay is a 120-second, 1920x1080 excerpt starting at source second 4550, with
  33 original manual annotations shifted to its timeline. The featured highlight
  is an editorial selection, not AI output.
- Live view plays the existing bundled recording, not a real-time court feed.
  Court 02 is unavailable. Example metrics retain their demo disclosures.
- Saved highlights, profiles, and drafts stay in the visitor's browser. Storage
  keys use a `website-preview-` prefix to avoid existing app data.
- No real login, court commands, contact transmission, or cross-device sync is
  connected. MP4 export and file sharing are disabled without the export backend;
  saved references and share links work.
- The sample referral programme is disabled with zero reward, avoiding an
  unapproved cash offer. The engineering app source is unchanged.

## Updating

Source of truth: `C:\Home\OneDrive\rosa\ENGINEERING\SOFTWARE\rosaApp`.
Install that app's dependencies before packaging. Stop any local server streaming
the snapshot before replacing video files on Windows.

```powershell
node scripts/package-player-app.mjs "C:\Home\OneDrive\rosa\ENGINEERING\SOFTWARE\rosaApp"
npm run build
npm run preview -- --host 127.0.0.1 --port 4185
node scripts/verify-player-app.mjs http://127.0.0.1:4185
```

The publisher stages an allowlisted copy in the OS temporary directory, uses an
explicit demo entrypoint, and does not load environment files or start the local
media server. A TypeScript AST transform rebases assets, replaces media endpoints,
namespaces storage, and disables the sample reward. It does not edit or commit
the app's source folder, including its existing uncommitted changes.

The local annotation parser, dataset, and FFmpeg are needed to regenerate the
1080p excerpt. The full 3.7 GB recording is not uploaded. Packaging fails above
95 MiB rather than silently reducing quality. `release.json` records the source
fingerprint, excerpt scope, and generated inventory. Rebuilding removes obsolete
generated files. Commit the snapshot with the publisher; Vercel builds from the
snapshot and does not need the engineering folders.

Browser checks cover direct and trailing-slash routes, byte ranges, mobile and
desktop layout, 1080p playback, saved-reference persistence, highlight deep links,
shot counts, demo disclosures, and disabled exports. They reject runtime errors,
failed same-origin requests, and unexpected server mutations. Screenshots and
reports go to ignored `review.local/` unless an output directory is supplied.

Before merging, verify all three existing tool routes and the homepage, then
repeat the app check against Vercel production. Do not add public navigation
links or enable the cloud runtime without a separate release decision.
