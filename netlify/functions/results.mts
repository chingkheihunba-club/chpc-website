// Tournament results, stored in Netlify Blobs so they go live without a new build.
//
//   GET  /api/results?t=hazari-2026   → the saved results (public; cached on Netlify's CDN)
//   POST /api/results                 → save results from /hazari26/update/ (needs the update key);
//                                       {action: 'undo'} goes back to the previous save
//
// The update key is the RESULTS_ADMIN_KEY environment variable, set in the Netlify UI
// (Project configuration → Environment variables). It is never stored in this repo.

import { getStore } from '@netlify/blobs';
import { purgeCache, type Config } from '@netlify/functions';
import { createHash, timingSafeEqual } from 'node:crypto';
import hazari2026 from '../../src/data/tournaments/hazari-2026.json';
import { checkEdit, pickEdit, type Live, type Tournament } from '../../src/lib/tournament';

// Every tournament that can take results. Add the next one here.
const TOURNAMENTS: Record<string, Tournament> = {
  'hazari-2026': hazari2026 as Tournament,
};

const store = () => getStore({ name: 'tournament-results', consistency: 'strong' });
const tag = (t: string) => `results-${t}`;

const json = (body: unknown, status = 200, extra: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...extra },
  });

function env(name: string) {
  const g = globalThis as any;
  return (g.Netlify?.env?.get?.(name) as string | undefined) ?? process.env[name];
}

function keyOk(given: string) {
  const want = env('RESULTS_ADMIN_KEY');
  if (!want || want.length < 12) return null; // not set up
  const h = (s: string) => createHash('sha256').update(s).digest();
  return timingSafeEqual(h(given), h(want));
}

export default async (req: Request) => {
  const url = new URL(req.url);

  if (req.method === 'GET') {
    const t = url.searchParams.get('t') || '';
    if (!TOURNAMENTS[t]) return json({ error: 'Unknown tournament.' }, 404);
    const saved = ((await store().get(t, { type: 'json' })) as Live | null) ?? { updated: null, matches: {} };
    return json(saved, 200, {
      // Browsers always check back; Netlify's CDN keeps a copy for up to 5 minutes,
      // and a save clears that copy straight away (purgeCache below).
      'cache-control': 'public, max-age=0, must-revalidate',
      'netlify-cdn-cache-control': 'public, durable, max-age=300, stale-while-revalidate=60',
      'netlify-cache-tag': tag(t),
    });
  }

  if (req.method !== 'POST') return json({ error: 'Method not allowed.' }, 405, { allow: 'GET, POST' });

  const auth = (req.headers.get('authorization') || '').replace(/^Bearer\s+/i, '');
  const ok = keyOk(auth);
  if (ok === null) return json({ error: 'The update key has not been set up on Netlify yet (RESULTS_ADMIN_KEY).' }, 503);
  if (!ok) return json({ error: 'That update key is not right.' }, 401);

  const raw = await req.text();
  if (raw.length > 100_000) return json({ error: 'Too much data.' }, 413);
  let body: any;
  try { body = JSON.parse(raw); } catch { return json({ error: 'The data could not be read.' }, 400); }

  const t = String(body?.t || '');
  const fx = TOURNAMENTS[t];
  if (!fx) return json({ error: 'Unknown tournament.' }, 404);
  const s = store();
  const prev = ((await s.get(t, { type: 'json' })) as Live | null) ?? { updated: null, matches: {} };
  // Refuse to overwrite a save made after this form was opened.
  if ((body.baseUpdated ?? null) !== (prev.updated ?? null)) {
    return json({ error: 'Someone saved results after you opened this page. Reload it to see them, then make your change again.', updated: prev.updated }, 409);
  }

  // Undo: go back to the save before the current one.
  if (body.action === 'undo') {
    if (!prev.updated) return json({ error: 'Nothing has been saved yet, so there is nothing to undo.' }, 400);
    const { blobs } = await s.list({ prefix: `history/${t}/` });
    const lastKey = blobs.map((b) => b.key).sort().pop();
    let restoredFrom: string | null = null;
    let updated: string | null = null;
    if (lastKey) {
      const older = (await s.get(lastKey, { type: 'json' })) as Live;
      updated = new Date().toISOString();
      restoredFrom = older.updated;
      await s.setJSON(t, { updated, matches: older.matches });
      await s.delete(lastKey);
    } else {
      // Undoing the first save: go back to the results built into the site.
      await s.delete(t);
    }
    try { await purgeCache({ tags: [tag(t)] }); } catch (e) { console.warn('purgeCache failed', e); }
    return json({ ok: true, updated, restoredFrom });
  }

  if (!body.matches || typeof body.matches !== 'object') return json({ error: 'No results sent.' }, 400);

  const matches: Live['matches'] = {};
  for (const m of fx.matches) {
    const e = body.matches[String(m.id)];
    if (!e) continue;
    const clean = pickEdit(e);
    const err = checkEdit(m.id, clean);
    if (err) return json({ error: err }, 400);
    if (clean.status !== 'walkover') clean.w = null;
    if (clean.status === 'scheduled' || clean.status === 'postponed') { clean.sa = null; clean.sb = null; }
    matches[String(m.id)] = clean;
  }

  const next: Live = { updated: new Date().toISOString(), matches };
  if (prev.updated) await s.setJSON(`history/${t}/${prev.updated}`, prev); // keep the previous version
  await s.setJSON(t, next);
  try { await purgeCache({ tags: [tag(t)] }); } catch (e) { console.warn('purgeCache failed', e); }
  return json({ ok: true, updated: next.updated });
};

export const config: Config = { path: '/api/results' };
