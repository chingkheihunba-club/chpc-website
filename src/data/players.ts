// The club's 2026–27 squad: one entry per player, in the standard profile format.
//
// HOW TO EDIT
// - Fill a field when the player (or the club) gives it. Leave it '' if not known:
//   empty fields are simply not shown, and the card lists what is still missing.
// - Highlights: up to four. Only results that are Verified (a named, dated
//   published report, with link) or Club-stated (the club's own written record).
//   Results a player lists that we haven't been able to check stay out until the
//   club confirms them. See 04_Club_Information/Players/Player_Register.xlsx.
// - Photo: put a photo named after the player's id in src/assets/players/
//   (e.g. kaoba.jpg). It is picked up automatically. Real, unposed photos only.
// - Social: full public profile URLs, only if the player wants them linked.
// - show: set to false to hide a player's card without deleting anything.
// - Never add phone numbers, addresses, dates of birth, family or money details.

export type Source = { label: string; url?: string };
export type Highlight = { text: string; basis: 'verified' | 'club'; source: Source };

export type Player = {
  id: string;
  name: string;            // as the player wants it on the site
  short: string;           // the name he goes by, used in short labels
  pressName: string;       // as it appears in match reports, e.g. "Th. Kaoba"
  position: string;        // jersey number for 2026–27, e.g. "1"
  withClubSince: string;   // year, or short phrase
  pony: string;            // the pony they ride most, if they want it named
  alsoRides: string;       // other disciplines, e.g. "Tent pegging, show jumping"
  inTheirWords: string;    // one line, in the player's own words
  highlights: Highlight[];
  social: { instagram?: string; facebook?: string; youtube?: string };
  photoFocus?: string;     // where the jersey card zooms in on his photo, e.g. '50% 20%' (x y)
  photoZoom?: number;      // how far the jersey card zooms in (default 1.45)
  show: boolean;
};

const SANGAI_GC_FINAL: Source = {
  label: 'The Sangai Express, 28-02-2026',
  url: 'https://www.thesangaiexpress.com/Encyc/2026/3/1/by-our-staff-reporter-imphal-feb-28-chingkheihunba-polo-club-emerged-as-the-champions-of-both-the-32nd-governo.html',
};
const UNI_GC_FINAL: Source = {
  label: 'UNI, 28-02-2026',
  url: 'https://www.uniindia.com/~/chingkheihunba-polo-club-lifts-men-women-governor-s-polo-trophies/Sports/news/3758005.html',
};
const SANGAI_CHOURJIT_QF: Source = {
  label: 'The Sangai Express, 09-02-2026',
  url: 'https://www.thesangaiexpress.com/Encyc/2026/2/10/by-our-staff-reporter-imphal-feb-9-chingkheihunba-polo-club-prevailed-10-6-over-black-watch-polo-club-to-book-.html',
};
const UNI_CHOURJIT_SF: Source = {
  label: 'UNI, 12-02-2026',
  url: 'https://www.uniindia.com/chingkheihunba-and-x-polo-club-enter-polo-final/east/news/3739123.html',
};
const SANGAI_CHOURJIT_FINAL: Source = {
  label: 'The Sangai Express, 14-02-2026',
  url: 'https://www.thesangaiexpress.com/Encyc/2026/2/15/osrdipr-imphal-feb-14-chief-minister-yumnam-khemchand-singh-has-announced-that-the-government-is-committed-to-.html',
};
const IMPHAL_TIMES_LEISHEMBA: Source = {
  label: 'Imphal Times, 19-11-2018',
  url: 'https://www.imphaltimes.com/articles/countdown-to-12th-manipur-polo-international-leishemba-takhellambam-a-profile/',
};
const IMPHAL_TIMES_MPI_SQUAD: Source = { label: 'Imphal Times, Nov 2018' };
const SANGAI_POIROU: Source = {
  label: 'The Sangai Express, 16-03-2022',
  url: 'https://www.thesangaiexpress.com/Encyc/2022/3/17/IMPHAL-Mar-16Stallion-Poirou-owned-by-Th-Kaoba-was-adjudged-the-best-Manipuri-Pony-Stallion-duri.html',
};
const SANGAI_IE_DISTRICT_2022: Source = {
  label: 'The Sangai Express, 17-01-2022',
  url: 'https://www.thesangaiexpress.com/Encyc/2022/1/18/By-Our-Staff-ReporterIMPHAL-Jan-17-X-Polo-Club-will-lock-horns-with-Chingkheihunba-Polo-Club-C.html',
};

export const players: Player[] = [
  {
    id: 'kaoba',
    photoFocus: '38% 14%',
    short: 'Kaoba',
    name: 'Thoudam Kaoba Singh',
    pressName: 'Th. Kaoba',
    position: '1',
    withClubSince: '1996, when he rode the club’s first pony, Nongshaba',
    pony: 'Poirou',
    alsoRides: 'Tent pegging, show jumping, arambai; teaches riding and polo to young riders',
    inTheirWords: '',
    highlights: [
      { text: 'Scored twice in the 7–6 win over X-Polo Club in the 32nd Governor’s Cup final, 2026', basis: 'verified', source: SANGAI_GC_FINAL },
      { text: 'Five goals in the 10–6 quarter-final win over Black Watch Polo Club, Dr Ksh Chourjit Singh Inter-District Tournament, 2026', basis: 'verified', source: SANGAI_CHOURJIT_QF },
      { text: 'In the Manipur squad at the 12th Manipur Polo International, 2018', basis: 'verified', source: IMPHAL_TIMES_MPI_SQUAD },
      { text: 'His stallion Poirou was judged the best Manipuri pony stallion at the state horse show, 2022', basis: 'verified', source: SANGAI_POIROU },
    ],
    social: {},
    show: true,
  },
  {
    id: 'rozer',
    short: 'Rozer',
    name: 'Okram Rozer Singh',
    pressName: 'O. Rozer',
    position: '2',
    withClubSince: '',
    pony: '',
    alsoRides: '',
    inTheirWords: '',
    highlights: [
      { text: 'Scored in the 7–6 win over X-Polo Club in the 32nd Governor’s Cup final, 2026', basis: 'verified', source: SANGAI_GC_FINAL },
      { text: 'Opened the scoring in the third minute of the Dr Ksh Chourjit Singh Inter-District final, 2026 (runners-up)', basis: 'verified', source: SANGAI_CHOURJIT_FINAL },
    ],
    social: {},
    show: true,
  },
  {
    id: 'leishemba',
    photoFocus: '47% 50%',
    photoZoom: 2.1,
    short: 'Leishemba',
    name: 'Leishemba Takhellambam',
    pressName: 'Leishemba',
    position: '3',
    withClubSince: '2017',
    pony: '',
    alsoRides: 'Tent pegging',
    inTheirWords: '',
    highlights: [
      { text: 'The club’s top scorer in the 32nd Governor’s Cup final, 2026, with three goals in the 7–6 win', basis: 'verified', source: SANGAI_GC_FINAL },
      { text: 'Scored twice in the Dr Ksh Chourjit Singh Inter-District final, 2026, and three in the quarter-final', basis: 'verified', source: SANGAI_CHOURJIT_FINAL },
      { text: 'Played for Manipur at the 12th Manipur Polo International, 2018', basis: 'verified', source: IMPHAL_TIMES_LEISHEMBA },
      { text: 'Junior tent-pegging champion at the 11th DGAR Cup State Equestrian Championship, 2014, and again at the next edition', basis: 'verified', source: IMPHAL_TIMES_LEISHEMBA },
    ],
    social: {},
    show: true,
  },
  {
    id: 'kokeshwor',
    photoFocus: '52% 18%',
    short: 'Kokeshwor',
    name: 'Laiphrakpam Kokeshwor Singh',
    pressName: '',
    position: '4',
    withClubSince: '2026 (new to the club this season)',
    pony: '',
    alsoRides: 'Show jumping',
    inTheirWords: '',
    highlights: [],
    social: {},
    show: true,
  },
  {
    id: 'manisana',
    short: 'Manisana',
    name: 'Thoudam Manisana Singh',
    pressName: 'Th. Manisana',
    position: '5',
    withClubSince: '',
    pony: '',
    alsoRides: '',
    inTheirWords: '',
    highlights: [
      { text: 'In the side that won the 32nd Governor’s Cup, 2026', basis: 'verified', source: UNI_GC_FINAL },
      { text: 'In the line-up for the 7–5 semi-final win over the Assam Rifles Polo Team, Dr Ksh Chourjit Singh Inter-District Tournament, 2026', basis: 'verified', source: UNI_CHOURJIT_SF },
      { text: 'Played in the club’s run to the 2nd Imphal East District final, 2022', basis: 'verified', source: SANGAI_IE_DISTRICT_2022 },
    ],
    social: {},
    show: true,
  },
  {
    id: 'bhupendrajit',
    photoFocus: '53% 22%',
    short: 'Bhupendrajit',
    name: 'Mutum Bhupendrajit Meitei',
    pressName: 'M. Bhupendrajit',
    position: '6',
    withClubSince: '',
    pony: '',
    alsoRides: '',
    inTheirWords: '',
    highlights: [
      { text: 'Scored in the 10–6 quarter-final win over Black Watch Polo Club, Dr Ksh Chourjit Singh Inter-District Tournament, 2026', basis: 'verified', source: SANGAI_CHOURJIT_QF },
      { text: 'In the line-up for the 7–5 semi-final win over the Assam Rifles Polo Team in the same tournament', basis: 'verified', source: UNI_CHOURJIT_SF },
    ],
    social: {},
    show: true,
  },
];

// Fields every profile should eventually have. Used to list what is still missing.
export const expected: { key: keyof Player; label: string }[] = [
  { key: 'position', label: 'jersey number' },
  { key: 'withClubSince', label: 'year joined the club' },
  { key: 'pony', label: 'pony' },
  { key: 'inTheirWords', label: 'a line in his own words' },
];
