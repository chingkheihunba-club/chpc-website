// Competitive record. Every row must be tied to a named, dated published report
// (label: Verified) or confirmed by the club in writing (label: Club-stated).
// Source: 01_Context_and_Background/2026-09-08_CHPC_Source_Referenced_Profile.pdf
// Club-stated rows come from 04_Club_Information/2018-12-10_CHPC_History_Letter_Transcript.md.

export type Honour = {
  sport: 'polo' | 'equestrian';
  when: string;          // display date, e.g. "Feb 2026"
  sortKey: string;       // yyyy-mm for ordering
  event: string;
  result: string;
  detail: string;
  basis: 'verified' | 'club';   // 'club' = the club's own record (e.g. its 2018 history letter)
  source?: { label: string; url?: string };
};

export const honours: Honour[] = [
  {
    sport: 'polo', when: 'Feb 2026', sortKey: '2026-02',
    event: '32nd Governor’s Cup Invitation Polo Tournament',
    result: 'Champions',
    detail: 'Beat X-Polo Club, Wangkhei 7–6 at Mapal Kangjeibung.',
    basis: 'verified',
    source: { label: 'The Sangai Express, 28-02-2026', url: 'https://www.thesangaiexpress.com/Encyc/2026/3/1/by-our-staff-reporter-imphal-feb-28-chingkheihunba-polo-club-emerged-as-the-champions-of-both-the-32nd-governo.html' },
  },
  {
    sport: 'polo', when: 'Feb 2026', sortKey: '2026-02',
    event: '21st Governor’s Cup Women’s Polo Tournament',
    result: 'Champions',
    detail: 'Beat Assam Rifles Women’s Polo Team 6–2.',
    basis: 'verified',
    source: { label: 'The Sangai Express, 28-02-2026', url: 'https://www.thesangaiexpress.com/Encyc/2026/3/1/by-our-staff-reporter-imphal-feb-28-chingkheihunba-polo-club-emerged-as-the-champions-of-both-the-32nd-governo.html' },
  },
  {
    sport: 'polo', when: 'Feb 2026', sortKey: '2026-02',
    event: '2nd Dr Ksh Chourjit Singh Inter-District Polo Tournament',
    result: 'Runners-up',
    detail: 'Lost the final 6–4 to X-Polo Club after leading 3–0 in the first chukker.',
    basis: 'verified',
    source: { label: 'The Sangai Express, 14-02-2026', url: 'https://www.thesangaiexpress.com/Encyc/2026/2/15/osrdipr-imphal-feb-14-chief-minister-yumnam-khemchand-singh-has-announced-that-the-government-is-committed-to-.html' },
  },
  {
    sport: 'equestrian', when: 'Jan–Feb 2024', sortKey: '2024-01',
    event: '17th Ningthoukhongjam Tombi State Equestrian Championships',
    result: 'Overall team champions',
    detail: '14 clubs, 23 teams and 137 riders, at the Manipuri Pony Breeding Farm, Lamphelpat.',
    basis: 'verified',
    source: { label: 'Eastern Mirror, Feb 2024', url: 'https://www.easternmirrornagaland.com/chingkhei-hunba-polo-club-wins-17th-state-equestrian-championships' },
  },
  {
    sport: 'polo', when: 'Mar 2023', sortKey: '2023-03',
    event: '2nd State Women’s Polo Tournament',
    result: 'Semi-finalists',
    detail: 'Five-team event.',
    basis: 'verified',
    source: { label: 'ANI, 18-03-2023', url: 'https://theprint.in/sport/the-2nd-state-womens-polo-tournament-2023-is-officially-underway/1453462/' },
  },
  {
    sport: 'polo', when: 'Feb 2022', sortKey: '2022-02',
    event: '17th Women’s State Level Polo Tournament',
    result: 'Joint winners',
    detail: 'Declared joint champions with Linthoingambi Kangjei Lup after rain made the ground unplayable.',
    basis: 'verified',
    source: { label: 'The Sangai Express, 02-02-2022', url: 'https://www.thesangaiexpress.com/Encyc/2022/2/3/By-Our-Staff-ReporterIMPHAL-Feb-2-The-17th-Women-s-State-Level-Polo-Tournament-and-the-5th-U16.html' },
  },
  {
    sport: 'polo', when: 'Jan 2022', sortKey: '2022-01',
    event: '2nd Imphal East District Polo Tournament',
    result: 'Finalists',
    detail: 'CHPC-A reached the final; CHPC-B reached the other semi-final.',
    basis: 'verified',
    source: { label: 'The Sangai Express, 17-01-2022', url: 'https://www.thesangaiexpress.com/Encyc/2022/1/18/By-Our-Staff-ReporterIMPHAL-Jan-17-X-Polo-Club-will-lock-horns-with-Chingkheihunba-Polo-Club-C.html' },
  },
  {
    sport: 'polo', when: 'Nov 2021', sortKey: '2021-11',
    event: '34th N. Hazari & Dr N. Tombi State Polo Tournament',
    result: 'Runners-up',
    detail: 'Lost the final 5–3 to X-Polo Club at Mapal Kangjeibung; 31 clubs competed.',
    basis: 'verified',
    source: { label: 'Northeast Now, Nov 2021', url: 'https://www.nenow.in/north-east-news/x-polo-club-wangkhei-emerges-champion-polo-tournament.html' },
  },
  {
    sport: 'polo', when: 'Apr 2021', sortKey: '2021-04',
    event: '1st Imphal East District Polo Tournament',
    result: 'Semi-finalists (A and B)',
    detail: 'The club entered three sides; CHPC-A won its quarter-final 12–1.',
    basis: 'verified',
    source: { label: 'The Sangai Express, 07-04-2021', url: 'https://www.thesangaiexpress.com/Encyc/2021/4/8/By-Our-Sports-ReporterIMPHAL-Apr-7-Paradise-Polo-Club-Wangkhei-edged-out-Eastern-Students-Club-ESC-B-Nongmeibung-and-Chingkheihunba-Polo-Club-CHPC-A-hammered-12-1-past-Ibudhou-Marjing-Kh-K.amp.html' },
  },
  {
    sport: 'polo', when: '2018', sortKey: '2018-00',
    event: 'Governor’s Cup Invitation Polo Tournament',
    result: 'Champions',
    detail: 'Edition number not given in the source.',
    basis: 'verified',
    source: { label: 'Imphal Times, 19-11-2018', url: 'https://www.imphaltimes.com/articles/countdown-to-12th-manipur-polo-international-leishemba-takhellambam-a-profile/' },
  },
  {
    sport: 'polo', when: '2018', sortKey: '2018-00',
    event: 'N. Hazari & Dr N. Tombi State Polo Tournament',
    result: 'Runners-up',
    detail: 'Edition number not given in the source.',
    basis: 'verified',
    source: { label: 'Imphal Times, 19-11-2018', url: 'https://www.imphaltimes.com/articles/countdown-to-12th-manipur-polo-international-leishemba-takhellambam-a-profile/' },
  },
  {
    sport: 'polo', when: '2016', sortKey: '2016-00',
    event: 'State Level Polo Tournament (All Manipur Polo Association)',
    result: 'Champions',
    detail: '',
    basis: 'club',
    source: { label: 'Club history, 10-12-2018' },
  },
  {
    sport: 'polo', when: '2006', sortKey: '2006-00',
    event: 'Governor’s Cup Polo Tournament',
    result: 'Champions',
    detail: '',
    basis: 'club',
    source: { label: 'Club history, 10-12-2018' },
  },
  {
    sport: 'equestrian', when: '2018', sortKey: '2018-00',
    event: 'State equestrian championship (name to confirm)',
    result: 'Overall champions',
    detail: 'Club riders also won junior titles in 2011, 2013, 2014, 2015, 2017 and 2018, and senior titles in 2011, 2014, 2015, 2016, 2017 and 2018.',
    basis: 'club',
    source: { label: 'Club history, 10-12-2018' },
  },
];
