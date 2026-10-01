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
| Menu | `src/config.ts` (`nav`) |
| Colours (from the club's jerseys and crest) and fonts | `src/styles/global.css` (top of file) |
| Club crest and partner logos | `src/assets/logos/` |
| Header and footer (partner logos) | `src/layouts/Base.astro` |
| Honours table | `src/data/honours.ts` |
| Season calendar | `src/data/season.ts` |
| News and stories (one Markdown file per post) | `src/content/news/` |
| Pages | `src/pages/` |
| Images, logos, favicon | `public/` |

## House rules for content

- **Nothing about the club goes live without the club's approval.** A news post is built only when its front matter says `approved: true`.
- **Players appear only with their own consent** — name, photo, profile, story.
- **Every fact has a basis.** Honours rows carry a published source or are marked as club-stated. Things the club hasn't confirmed (founding year, name meaning, office bearers) stay out.
- **`<Todo>` boxes** mark what the club still has to supply. They are visible on the preview on purpose. Before launch, search for `<Todo` and resolve every one.
- Dates on the site are dd-mm-yyyy. The club name is always "Chingkhei Hunba Polo Club", or "CHPC".
- The site carries the club's own identity; Eartheners and Unibrow Studio appear as partners in the footer and on the Partners page only.

## Going live

`launched: false` in `src/config.ts` adds `noindex` to every page and makes `robots.txt` block crawlers, so the Netlify preview can be shared with the club safely. At launch:

1. Set `launched: true`.
2. Set `site:` in `astro.config.mjs` to the real domain.
3. Commit and push.

## Accounts

The GitHub repo, Netlify site and domain belong to the club, registered under the club's own email. Unibrow Studio manages them and hands over all credentials if the association ends. Keep the account inventory in `07_Digital_Setup/`.
