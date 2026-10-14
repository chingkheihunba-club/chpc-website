# Chingkhei Hunba Polo Club — website

Static site built with [Astro](https://astro.build), hosted on Netlify. Push to `main` → Netlify builds and deploys.

## Run it locally (Windows)

Needs Node.js 22.12 or newer (`node -v` to check).

```
npm install
npm run dev        # http://localhost:4321, reloads as you edit
npm run build      # what Netlify runs; output goes to dist/
npm run preview    # serve the built site locally
```

## Where things are

| What | File |
|---|---|
| Club name, address, contact, social links, **launch switch** | `src/config.ts` |
| Menu, header, footer (partner logos and links) | `src/layouts/Base.astro` |
| Colours (kit red, royal blue, crest navy) and fonts | `src/styles/site.css` (top of file) |
| Club crest and partner logos | `src/assets/logos/` |
| Players (jerseys on Home and Team, one page each) | `src/data/players.ts`; photos in `src/assets/players/<id>.jpg` (appear automatically) |
| Honours (on The Club page) | `src/data/honours.ts` |
| Press coverage (News page and Home) | `src/data/media.ts` |
| Season calendar | `src/data/season.ts` |
| Tournament fixtures and results (`/tournament/`) | `src/data/tournaments/<slug>.json`, `src/lib/tournament.ts`; header button in `src/config.ts` (`tournament`) |
| Gallery photos | `src/data/gallery.ts`; files in `src/assets/photos/` |
| Club news and stories (one Markdown file per post) | `src/content/news/` |
| Pages | `src/pages/` |
| Old page addresses redirected to new ones | `public/_redirects` |

The current design replaced the first one on 03-10-2026. The first design's source is in
`07_Digital_Setup/_Archive/2026-10-03_chpc-website-classic/`.

## House rules for content

- **Nothing about the club goes live without the club's approval.** A news post is built only when its front matter says `approved: true`.
- **Players appear only with their own consent** — name, photo, profile, story.
- **Every fact has a basis.** Honours rows carry a published source or are marked as club-stated. Founding year, founders, name meaning and office bearers are as the club gave them on its information form (03-10-2026).
- Missing player details are simply not shown; nothing on the site is a placeholder.
- Dates on the site are dd-mm-yyyy. The club name is always "Chingkhei Hunba Polo Club", or "CHPC".
- The site carries the club's own identity; Eartheners and Unibrow Studio appear as partners in the footer and on the Partners page only.

## Going live

`launched: false` in `src/config.ts` adds `noindex` to every page and makes `robots.txt` block crawlers, so the Netlify preview can be shared with the club safely. At launch:

1. Set `launched: true`.
2. Set `site:` in `astro.config.mjs` to the real domain.
3. Commit and push.

## Accounts

The GitHub repo, Netlify site and domain belong to the club, registered under the club's own email. Unibrow Studio manages them and hands over all credentials if the association ends. Keep the account inventory in `07_Digital_Setup/`.

## Tournament results (no rebuild needed)

`/tournament/` shows the current tournament day by day: who plays whom, where, and the scores.
The fixture (teams, draw, dates, grounds) is in `src/data/tournaments/hazari-2026.json` and is built into the page.
**Scores do not need a rebuild.** They are entered at `/tournament/update/` (not linked anywhere, kept out of
search), saved by the function `netlify/functions/results.mts` into Netlify Blobs, and the page picks them up
from `/api/results` when it opens and every two minutes while it is open.

- **Entering scores:** open `chingkheihunba.club/tournament/update/` on a phone, enter the update key once,
  type the two scores, Save. Winners move into their next match on their own. Date, ground, walkover,
  postponement and a short note can also be changed there.
- **The update key** is the Netlify environment variable `RESULTS_ADMIN_KEY` (Project configuration →
  Environment variables; mark it secret). Never put it in this repo. Change it there to lock out an old key.
- **Cost:** saving scores triggers no deploy. Each page view makes one small request to `/api/results`, cached
  on Netlify's CDN for up to five minutes and cleared on every save.
- **Each save keeps the previous version** in the Blobs store under `history/<slug>/<time>`.
- **During a tournament, change dates and grounds through the form, not the JSON file.** Saved values take
  priority over the file.
- **Next tournament:** add `src/data/tournaments/<new-slug>.json` in the same shape, register it in
  `TOURNAMENTS` in `netlify/functions/results.mts`, point the two pages' imports at it, and update `tournament`
  in `src/config.ts`. Set `tournament.active` to `false` when nothing is on, to hide the header button.

## Committing

The repo is **public** (made public 01-10-2026). Netlify's free plan builds a private repo only from pushes by the account that owns the Netlify project, and DK pushes from the Eartheners login as a collaborator. Keep secrets, bank details and personal contact details out of this repo. Commits are authored as the club (local Git config: `Chingkhei Hunba Polo Club`, `chingkheihunbapoloclub@gmail.com`). Work on `preview` (free branch deploys); `main` is production.
