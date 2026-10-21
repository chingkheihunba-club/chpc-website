// Tournament fixtures and results.
// Shared by the public page (/hazari26/), the update form (/hazari26/update/)
// and the results function (netlify/functions/results.mts).
//
// The fixture (teams, draw, dates, grounds) lives in src/data/tournaments/<slug>.json.
// Scores entered through the update form are stored in Netlify Blobs and fetched by
// the page from /api/results, so results go live without a new build.

// 'live' = Ongoing: the match is being played; scores may be level and nobody advances yet.
// 'played' = Full time (final score): needs a winner.
export type Status = 'scheduled' | 'live' | 'played' | 'walkover' | 'postponed';
export type Slot = { team?: string; from?: number };
export type Match = {
  id: number;
  date: string;              // yyyy-mm-dd (display is dd-mm-yyyy)
  was?: string;              // the date on the original fixture, when the organisers have moved it
  stale?: { date?: string[]; note?: string[] }; // saved values known to be out of date; the fixture's value is used instead
  ground: string | null;     // '1st' | '2nd' | '3rd' | null
  place: string | null;      // label when there is no ground, e.g. 'Opening match', 'Final'
  round: string;
  a: Slot;
  b: Slot;
  status: Status;
  sa: number | null;
  sb: number | null;
  w: 'a' | 'b' | null;       // walkover winner
  note: string;
};
export type Tournament = {
  slug: string;
  name: string;
  short: string;
  titleLines: string[];
  year: string;
  edition: string;
  organiser: string;
  venue: string;
  report: string;
  start: string;
  end: string;
  club: string;
  times: Record<string, string>;
  off?: Record<string, string>; // days inside the tournament with no play, and why (e.g. postponed)
  updated: string;
  notes: string[];
  matches: Match[];
};
/** What the update form saves: the editable fields of every match. */
export type Edit = Pick<Match, 'status' | 'sa' | 'sb' | 'w' | 'date' | 'ground' | 'note'>;
export type Live = { updated: string | null; matches: Record<string, Edit> };

export const EDIT_FIELDS = ['status', 'sa', 'sb', 'w', 'date', 'ground', 'note'] as const;
export const STATUSES: Status[] = ['scheduled', 'live', 'played', 'walkover', 'postponed'];
export const GROUNDS = ['1st', '2nd', '3rd'];
export const TZ = 'Asia/Kolkata';

/* ---------- merge and validate ---------- */

export function merge(fx: Tournament, live: Live | null | undefined): Tournament {
  const matches = fx.matches.map((m) => {
    const o = live?.matches?.[String(m.id)];
    if (!o) return { ...m };
    const e = pickEdit(o);
    // A save made before the organisers moved this match still carries the old date.
    // The rescheduled date in the fixture wins over it.
    if (m.was && e.date === m.was) e.date = m.date;
    if (m.stale?.date?.includes(e.date)) e.date = m.date;
    if (m.stale?.note?.includes(e.note)) e.note = m.note;
    return { ...m, ...e };
  });
  return { ...fx, matches, updated: live?.updated || fx.updated };
}

export function pickEdit(o: any): Edit {
  return { status: o.status, sa: o.sa ?? null, sb: o.sb ?? null, w: o.w ?? null, date: o.date, ground: o.ground ?? null, note: o.note ?? '' };
}

const fin = (n: unknown): n is number => typeof n === 'number' && Number.isFinite(n);
/** Scores are shown for finished matches and for matches in play. */
const shows = (m: Match) => m.status === 'played' || m.status === 'live';

/** Returns an error message, or '' when the edit is valid. Used by the form and the function. */
export function checkEdit(id: number, e: any): string {
  if (!e || typeof e !== 'object') return `Match ${id}: missing.`;
  if (!STATUSES.includes(e.status)) return `Match ${id}: unknown status.`;
  for (const k of ['sa', 'sb'] as const) {
    if (e[k] !== null && !(Number.isInteger(e[k]) && e[k] >= 0 && e[k] <= 99)) return `Match ${id}: scores must be whole numbers from 0 to 99.`;
  }
  if (e.w !== null && e.w !== 'a' && e.w !== 'b') return `Match ${id}: walkover winner must be the first or second team.`;
  if (typeof e.date !== 'string' || !/^20\d\d-\d\d-\d\d$/.test(e.date)) return `Match ${id}: the date is not valid.`;
  if (e.ground !== null && !GROUNDS.includes(e.ground)) return `Match ${id}: unknown ground.`;
  if (typeof e.note !== 'string' || e.note.length > 160) return `Match ${id}: the note must be 160 characters or fewer.`;
  if (e.status === 'live' && (!fin(e.sa) || !fin(e.sb))) return `Match ${id}: an ongoing match needs both scores (0 is fine), or set it back to Upcoming.`;
  if (e.status === 'played') {
    if (!fin(e.sa) || !fin(e.sb)) return `Match ${id}: enter both scores, or set the status back to Upcoming.`;
    if (e.sa === e.sb) return `Match ${id}: the scores are level, ${e.sa}–${e.sb}. A final score needs a winner. If the match is still going on, mark it Ongoing.`;
  }
  if (e.status === 'walkover' && e.w !== 'a' && e.w !== 'b') return `Match ${id}: choose which team gets the walkover.`;
  return '';
}

/* ---------- dates ---------- */

const WD = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const WDL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const pad = (n: number) => String(n).padStart(2, '0');
function dp(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  return { y, m, d, wd: new Date(Date.UTC(y, m - 1, d)).getUTCDay() };
}
export const fmt = (iso: string) => { const p = dp(iso); return `${pad(p.d)}-${pad(p.m)}-${p.y}`; };
export const wd = (iso: string) => WD[dp(iso).wd];
export const wdl = (iso: string) => WDL[dp(iso).wd];
export const dayNum = (iso: string) => pad(dp(iso).d);
export function addDays(iso: string, n: number) {
  const p = dp(iso);
  return new Date(Date.UTC(p.y, p.m - 1, p.d + n)).toISOString().slice(0, 10);
}
export function todayIST(now = new Date()) {
  try {
    return new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
  } catch { return now.toISOString().slice(0, 10); }
}
export function stamp(isoTime: string) {
  try {
    const s = new Intl.DateTimeFormat('en-GB', { timeZone: TZ, day: '2-digit', month: '2-digit', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true }).format(new Date(isoTime));
    return s.replace(/\//g, '-').replace(/\s?(am|pm)$/i, (m) => ' ' + m.trim().toUpperCase());
  } catch { return isoTime; }
}
export function allDates(t: Tournament) {
  const out: string[] = [];
  let d = t.start;
  const last = t.matches.reduce((x, m) => (m.date > x ? m.date : x), t.end);
  while (d <= last) { out.push(d); d = addDays(d, 1); }
  return out;
}

/* ---------- the draw ---------- */

export class Draw {
  t: Tournament;
  by = new Map<number, Match>();
  next = new Map<number, Match>();
  constructor(t: Tournament) {
    this.t = t;
    t.matches.forEach((m) => this.by.set(m.id, m));
    t.matches.forEach((m) => [m.a, m.b].forEach((s) => { if (s.from) this.next.set(s.from, m); }));
  }
  win(m: Match): 'a' | 'b' | null {
    if (m.status === 'played' && fin(m.sa) && fin(m.sb) && m.sa !== m.sb) return m.sa > m.sb ? 'a' : 'b';
    if (m.status === 'walkover' && (m.w === 'a' || m.w === 'b')) return m.w;
    return null;
  }
  name(s: Slot): string | null {
    if (s.team) return s.team;
    const src = s.from ? this.by.get(s.from) : undefined;
    const w = src && this.win(src);
    return src && w ? this.name(src[w]) : null;
  }
  contenders(s: Slot): string[] {
    const n = this.name(s);
    if (n) return [n];
    const src = s.from ? this.by.get(s.from) : undefined;
    return src ? [...this.contenders(src.a), ...this.contenders(src.b)] : [];
  }
  contText(s: Slot) {
    const c = this.contenders(s);
    return c.length <= 4 ? c.join(' / ') : `One of ${c.length} teams`;
  }
  label(s: Slot) { return this.name(s) || `Winner of Match ${s.from}`; }
  ground(m: Match) { return m.ground ? `${m.ground} Ground` : (m.place || 'Ground to be announced'); }
  time(m: Match) { return (m.ground && this.t.times[m.ground]) || ''; }
  on(date: string) {
    return this.t.matches.filter((m) => m.date === date)
      .sort((a, b) => (a.ground || '0').localeCompare(b.ground || '0') || a.id - b.id);
  }
  involves(m: Match, team: string) { return this.name(m.a) === team || this.name(m.b) === team; }
  teams() {
    const s = new Set<string>();
    this.t.matches.forEach((m) => { if (m.a.team) s.add(m.a.team); if (m.b.team) s.add(m.b.team); });
    return [...s].sort((a, b) => a.localeCompare(b));
  }
  /** A team's matches: played, the next one, then the ones it plays only if it keeps winning. */
  path(team: string): { m: Match; kind: 'won' | 'lost' | 'next' | 'ifwin' }[] {
    let m = this.t.matches.find((x) => x.a.team === team || x.b.team === team);
    const out: { m: Match; kind: 'won' | 'lost' | 'next' | 'ifwin' }[] = [];
    let sure = true;
    while (m) {
      const w = this.win(m);
      if (w) {
        const won = this.name(m[w]) === team;
        out.push({ m, kind: won ? 'won' : 'lost' });
        if (!won) break;
      } else { out.push({ m, kind: sure ? 'next' : 'ifwin' }); sure = false; }
      m = this.next.get(m.id);
    }
    return out;
  }
}

/* ---------- rendering (HTML strings, used at build time and in the browser) ---------- */

export const esc = (s: unknown) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));

type Opts = { today: string; team: string };

function miniItem(D: Draw, m: Match) {
  const w = D.win(m), A = D.label(m.a), B = D.label(m.b), club = D.t.club;
  const where = `${esc(D.ground(m))}${D.time(m) ? ' · ' + esc(D.time(m)) : ''} · Match ${m.id}${m.status === 'postponed' ? ' · Postponed' : ''}${m.status === 'live' ? ' · <span class="tn-live-tag">Ongoing</span>' : ''}`;
  const ln = (side: 'a' | 'b', nm: string) => {
    const cls = [w && w !== side ? 'lose' : '', nm === club ? 'club' : ''].join(' ');
    let sc = '';
    const v = side === 'a' ? m.sa : m.sb;
    if (shows(m) && fin(v)) sc = `<span class="tn-mini-sc${w && w !== side ? ' lose' : ''}">${v}</span>`;
    else if (m.status === 'walkover' && w === side) sc = '<span class="tn-mini-vs">W/O</span>';
    return `<div class="tn-mini-line"><span class="tn-mini-nm ${cls}">${esc(nm)}</span>${sc}</div>`;
  };
  if (!w && m.status !== 'live') return `<li><span class="tn-mini-where">${where}</span>${ln('a', A)}<span class="tn-mini-vs">vs</span>${ln('b', B)}</li>`;
  return `<li><span class="tn-mini-where">${where}</span>${ln('a', A)}${ln('b', B)}</li>`;
}

function nextLine(D: Draw, m: Match) {
  const n = D.next.get(m.id);
  if (!n) return '';
  const other = n.a.from === m.id ? n.b : n.a;
  const on = D.name(other);
  const opp = on ? `<b>${esc(on)}</b>` : `the winner of Match ${other.from}`;
  const w = D.win(m);
  const who = w ? `<b>${esc(D.name(m[w]))}</b> play` : 'Winner plays';
  return `<p class="tn-next">${who} ${opp} next · ${wd(n.date)} ${fmt(n.date)}, ${esc(D.ground(n))}</p>`;
}

function slot(D: Draw, m: Match, side: 'a' | 'b', kind: string, team: string) {
  const s = m[side], w = D.win(m);
  let nm = D.name(s), ifw = false;
  if (!nm && kind === 'ifwin' && team && D.contenders(s).includes(team)) { nm = team; ifw = true; }
  const cls = ['tn-team'];
  if (w) cls.push(w === side ? 'win' : 'lose');
  if (nm === D.t.club) cls.push('club');
  const v = side === 'a' ? m.sa : m.sb;
  let sc = '';
  if (shows(m) && fin(v)) sc = `<span class="tn-score">${v}</span>`;
  else if (m.status === 'walkover' && w === side) sc = '<span class="tn-score wo">W/O</span>';
  const l = ifw
    ? `<span class="tn-name">${esc(nm)}</span><span class="tn-sub">If they win Match ${s.from}</span>`
    : nm ? `<span class="tn-name">${esc(nm)}</span>`
      : `<span class="tn-name tbd">Winner of Match ${s.from}</span><span class="tn-sub">${esc(D.contText(s))}</span>`;
  return `<div class="${cls.join(' ')}"><div class="tn-tl">${l}</div>${sc}</div>`;
}

function card(D: Draw, m: Match, kind: string, o: Opts) {
  const w = D.win(m);
  const tags: string[] = [];
  if (kind === 'ifwin') tags.push('<span class="tn-pill">If they win</span>');
  if (m.status === 'postponed') tags.push('<span class="tn-pill navy">Postponed</span>');
  else if (m.status === 'live') tags.push('<span class="tn-pill red live">Ongoing</span>');
  else if (w) tags.push(`<span class="tn-pill">${m.status === 'walkover' ? 'Walkover' : 'Full time'}</span>`);
  else if (m.date === o.today) tags.push('<span class="tn-pill red">Today</span>');
  const club = D.involves(m, D.t.club) || (kind === 'ifwin' && o.team === D.t.club);
  const vs = w || shows(m) ? '' : '<span class="tn-vs">vs</span>';
  const moved = m.was && m.was !== m.date ? `<p class="tn-moved">Moved from ${wd(m.was)} ${fmt(m.was)}</p>` : '';
  return `<article class="tn-match${club ? ' is-club' : ''}${kind === 'ifwin' ? ' ifwin' : ''}${m.status === 'live' ? ' is-live' : ''}" id="m-${m.id}">` +
    `<div class="tn-meta"><span><span class="tn-where">${esc(D.ground(m))}</span>${D.time(m) ? ' · ' + esc(D.time(m)) : ''}</span>` +
    `<span class="tn-tags"><span>Match ${m.id} · ${esc(m.round)}</span>${tags.join('')}</span></div>` +
    `<div class="tn-teams">${slot(D, m, 'a', kind, o.team)}${vs}${slot(D, m, 'b', kind, o.team)}</div>` +
    (m.status === 'live' ? '<p class="tn-note">Score so far. The final score is added at full time.</p>' : '') +
    (m.note ? `<p class="tn-note">${esc(m.note)}</p>` : '') + moved +
    nextLine(D, m) + '</article>';
}

function dayBlock(D: Draw, d: string, cards: string, ms: Match[], o: Opts) {
  const rounds = [...new Set(ms.map((m) => m.round))].join(' · ');
  return `<section class="tn-day" id="d-${d}"><div class="tn-day-head"><div class="tn-day-title"><h2>${wdl(d)}</h2>` +
    `<span class="tn-date">${fmt(d)}</span><span class="tn-pill">${esc(rounds)}</span>${d === o.today ? '<span class="tn-pill red">Today</span>' : ''}</div>` +
    `<div class="tn-day-tools"><span class="tn-copied" id="cp-${d}" aria-live="polite"></span><button type="button" class="tn-btn line" data-copy="${d}">Copy as text</button></div></div>` +
    `<div class="tn-cards">${cards}</div></section>`;
}

/** The live part of the page: panels, day strip and the day-by-day list. */
export function render(t: Tournament, o: Opts) {
  const D = new Draw(t);
  const club = t.club;
  const decided = (m: Match) => !!D.win(m);

  // panels
  const tm = D.on(o.today);
  let todayBody: string;
  if (tm.length) todayBody = `<ul class="tn-mini">${tm.map((m) => miniItem(D, m)).join('')}</ul>`;
  else {
    const nx = t.matches.filter((m) => m.date > o.today && !decided(m)).map((m) => m.date).sort()[0];
    const offToday = t.off?.[o.today];
    todayBody = `<p class="tn-empty">No matches today${offToday ? `: ${esc(offToday.charAt(0).toLowerCase() + offToday.slice(1))}` : ''}.${nx ? ` Next match day: ${wd(nx)} ${fmt(nx)} (${D.on(nx).length} ${D.on(nx).length === 1 ? 'match' : 'matches'}).` : ' The tournament is complete.'}</p>`;
  }
  // Latest results: the most recent day with results, other than today when the Today panel already shows them.
  const played = t.matches.filter(decided).map((m) => m.date).filter((d) => !(tm.length && d === o.today)).sort();
  const lastD = played[played.length - 1];
  const resBody = lastD ? `<ul class="tn-mini">${D.on(lastD).filter(decided).map((m) => miniItem(D, m)).join('')}</ul>` : '<p class="tn-empty">No results yet.</p>';

  const p = D.path(club);
  const entry = p[0]?.m;
  let clubBody = '';
  const nextC = p.find((x) => x.kind === 'next');
  const lost = p.find((x) => x.kind === 'lost');
  const wonN = p.filter((x) => x.kind === 'won').length;
  if (nextC) {
    const m = nextC.m;
    const opp = D.name(m.a) === club ? m.b : m.a;
    const on = D.name(opp);
    clubBody = `<div class="tn-big">${wd(m.date).toUpperCase()} ${dayNum(m.date)}<small>${fmt(m.date)} · ${esc(D.ground(m))}${D.time(m) ? ', ' + esc(D.time(m)) : ''}</small></div>` +
      `<p>${wonN ? 'Next' : 'First'} match, ${esc(m.round)}, against ${on ? `<b>${esc(on)}</b>` : `the winner of Match ${opp.from} (${esc(D.contText(opp))})`}.</p>` +
      (m.status === 'live' ? `<p class="tn-club-live"><span class="tn-live-tag">Ongoing</span> ${esc(D.label(m.a))} <b>${m.sa}–${m.sb}</b> ${esc(D.label(m.b))}</p>` : '');
  } else if (lost) {
    const lm = lost.m, lw = D.win(lm)!;
    const score = lm.status === 'walkover' ? 'by walkover' : `${lw === 'a' ? lm.sa : lm.sb}–${lw === 'a' ? lm.sb : lm.sa}`;
    clubBody = `<p>Out in Match ${lm.id} (${esc(lm.round)}), ${score} to <b>${esc(D.name(lm[lw]))}</b>. Thank you for the support this tournament.</p>`;
  } else if (p.length && p[p.length - 1].kind === 'won') {
    clubBody = `<p><b>Champions.</b> ${esc(club)} won the final.</p>`;
  }

  const panels = `<section class="tn-live"><div class="wrap"><div class="tn-panels">` +
    `<div class="tn-panel tn-today"><div><h2>Today</h2><p class="tn-psub">${wdl(o.today)} ${fmt(o.today)}</p></div>${todayBody}` +
    (tm.length ? `<div class="tn-pact"><button type="button" class="tn-btn ghost" data-jump="${o.today}">See today’s matches</button></div>` : '') + '</div>' +
    `<div class="tn-panel tn-latest"><div><h2>Latest results</h2><p class="tn-psub">${lastD ? `${wdl(lastD)} ${fmt(lastD)}` : '&nbsp;'}</p></div>${resBody}</div>` +
    `<div class="tn-panel tn-club"><div><p class="tn-ceyebrow">${nextC ? (wonN ? 'The club’s next match' : 'The club’s first match') : 'The club'}</p><h2>${esc(club)}</h2><p class="tn-psub">${entry ? `Enters in ${esc(entry.round)}, Match ${entry.id}` : ''}</p></div>${clubBody}` +
    `<div class="tn-pact"><button type="button" class="tn-btn white" data-follow="${esc(club)}">Follow the club’s path</button></div></div>` +
    `</div></div></section>`;

  // day strip
  const pathDates = o.team ? new Set(D.path(o.team).map((x) => x.m.date)) : null;
  const chips = allDates(t).map((d) => {
    const ms = D.on(d), n = ms.length;
    const isFinal = ms.some((m) => m.round === 'Final');
    const cls = ['tn-chip'];
    if (d < o.today) cls.push('past');
    if (d === o.today) cls.push('today');
    if (!n) cls.push('rest');
    if (isFinal) cls.push('final');
    const c = !n ? (t.off?.[d] ? 'Postponed' : 'Rest') : isFinal ? 'Final' : ms.every((m) => m.round === 'Semi-final') ? 'Semis' : `${n} ${n === 1 ? 'match' : 'matches'}`;
    const dis = !n || (pathDates && !pathDates.has(d)) ? ' disabled' : '';
    return `<button type="button" class="${cls.join(' ')}" data-jump="${d}"${dis} aria-label="${wdl(d)} ${fmt(d)}, ${c}"><span class="w">${wd(d)}</span><span class="d">${dayNum(d)}</span><span class="c">${c}</span></button>`;
  }).join('');
  // Follow a team: a text box that narrows the team list as people type (wired up in the page script).
  const strip = `<nav class="tn-strip" aria-label="Match days"><div class="wrap"><div class="tn-days" id="tn-days">${chips}</div>` +
    `<div class="tn-follow"><label for="tn-team-q">Follow</label><div class="tn-combo">` +
    `<input id="tn-team-q" type="text" role="combobox" aria-expanded="false" aria-controls="tn-team-list" aria-autocomplete="list" autocomplete="off" spellcheck="false" placeholder="Type a team name" value="${esc(o.team)}" />` +
    (o.team ? `<button type="button" class="tn-clear" data-follow="" aria-label="Show all teams">×</button>` : '') +
    `<ul id="tn-team-list" class="tn-options" role="listbox" aria-label="Teams" hidden></ul></div></div></div></nav>`;

  // days
  let days = '';
  if (o.team) {
    const pth = D.path(o.team), last = pth[pth.length - 1];
    const st = !pth.length ? '' : last.kind === 'lost' ? `Out in Match ${last.m.id}.` : last.kind === 'won' ? 'Champions.' : 'Still in the tournament.';
    days += `<div class="tn-filter"><p>Showing <b>${esc(o.team)}</b>: ${pth.length} ${pth.length === 1 ? 'match' : 'matches'} on their path. ${st} Dashed cards are matches they play only if they keep winning.</p><button type="button" class="tn-btn line" data-follow="">Show all teams</button></div>`;
    const byDate: Record<string, typeof pth> = {};
    pth.forEach((x) => { (byDate[x.m.date] ||= []).push(x); });
    Object.keys(byDate).sort().forEach((d) => {
      days += dayBlock(D, d, byDate[d].map((x) => card(D, x.m, x.kind, o)).join(''), byDate[d].map((x) => x.m), o);
    });
  } else {
    allDates(t).forEach((d) => {
      const ms = D.on(d);
      if (!ms.length) { days += `<div class="tn-rest${t.off?.[d] ? ' off' : ''}" id="d-${d}"><b>${wd(d)} ${dayNum(d)}</b><span>${fmt(d)} · No matches${t.off?.[d] ? `. ${esc(t.off[d])}` : ''}</span></div>`; return; }
      days += dayBlock(D, d, ms.map((m) => card(D, m, '', o)).join(''), ms, o);
    });
  }
  const notes = `<div class="tn-notes">${t.notes.map((n) => `<p>${esc(n)}</p>`).join('')}<p class="tn-updated">Results updated ${esc(stamp(t.updated))} IST.</p></div>`;
  return panels + strip + `<section class="tn-list"><div class="wrap">${days}${notes}</div></section>`;
}

/** Plain text for one day, for pasting into a story caption or WhatsApp. */
export function dayText(t: Tournament, d: string, team = '') {
  const D = new Draw(t);
  let ms = D.on(d);
  if (team) ms = D.path(team).map((x) => x.m).filter((m) => m.date === d);
  const lines = [t.name, `${wdl(d)} ${fmt(d)} · ${t.venue}`, ''];
  ms.forEach((m) => {
    const A = D.label(m.a), B = D.label(m.b), w = D.win(m);
    if (m.status === 'played' && w) lines.push(`${A} ${m.sa} – ${m.sb} ${B}`);
    else if (m.status === 'live') lines.push(`${A} ${m.sa} – ${m.sb} ${B} (ongoing)`);
    else if (m.status === 'walkover' && w) lines.push(`${D.name(m[w])} won by walkover (${A} vs ${B})`);
    else lines.push(`${D.ground(m)}${D.time(m) ? ', ' + D.time(m) : ''}: ${A} vs ${B}${m.status === 'postponed' ? ' (postponed)' : ''}`);
  });
  lines.push('', 'Full fixture: chingkheihunba.club/hazari26/');
  return lines.join('\n');
}

/** Teams whose name, or any word in it, starts with what was typed. The club comes first. */
export function findTeams(t: Tournament, q: string) {
  const D = new Draw(t);
  const all = [t.club, ...D.teams().filter((x) => x !== t.club)];
  const s = q.trim().toLowerCase();
  if (!s) return all;
  return all.filter((name) => {
    const n = name === t.club ? `${name.toLowerCase()} chpc chingkheihunba` : name.toLowerCase();
    return n.startsWith(s) || n.split(/[\s–&-]+/).some((w) => w && w.startsWith(s));
  });
}
