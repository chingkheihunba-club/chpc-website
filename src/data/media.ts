// The club in the press: published reports that name the club, newest first.
// Add a row when a new report appears. `date` is for sorting (yyyy-mm-dd);
// `when` is what the page shows (dd-mm-yyyy, or month and year if the day isn't known).
// Briefs say only what the report itself says.

export type MediaMention = {
  date: string;
  when: string;
  outlet: string;
  title: string;
  url: string;
  brief: string;
};

export const media: MediaMention[] = [
  {
    date: '2026-02-28',
    when: '28-02-2026',
    outlet: 'The Sangai Express',
    title: 'Governor’s Cup Polo: Chingkheihunba Polo Club sweep men and women’s titles',
    url: 'https://www.thesangaiexpress.com/Encyc/2026/3/1/by-our-staff-reporter-imphal-feb-28-chingkheihunba-polo-club-emerged-as-the-champions-of-both-the-32nd-governo.html',
    brief: 'Both finals at Mapal Kangjeibung on one afternoon: the men beat X-Polo Club 7–6 for the 32nd Governor’s Cup, and the women beat the Assam Rifles Women’s Polo Team 6–2.',
  },
  {
    date: '2026-02-28',
    when: '28-02-2026',
    outlet: 'UNI',
    title: 'Chingkheihunba Polo Club lifts Men & women Governor’s Polo trophies',
    url: 'https://www.uniindia.com/~/chingkheihunba-polo-club-lifts-men-women-governor-s-polo-trophies/Sports/news/3758005.html',
    brief: 'The national wire’s report of the club’s Governor’s Cup double.',
  },
  {
    date: '2026-02-26',
    when: '26-02-2026',
    outlet: 'The Sangai Express',
    title: 'Governor’s Cup Invitation Polo: X-Polo Club vs CHPC in men’s final; AR Polo Club vs CHPC in women’s final',
    url: 'https://www.thesangaiexpress.com/Encyc/2026/2/27/by-our-staff-reporter-imphal-feb-26-chingkheihunba-polo-club-chpc-kongpal-and-x-polo-club-wangkhei-will-lock-h.html',
    brief: 'The club reaches both Governor’s Cup finals, men’s and women’s.',
  },
  {
    date: '2026-02-12',
    when: '12-02-2026',
    outlet: 'UNI',
    title: 'Chingkheihunba and X-Polo Club enter Polo final',
    url: 'https://www.uniindia.com/chingkheihunba-and-x-polo-club-enter-polo-final/east/news/3739123.html',
    brief: 'A 7–5 semi-final win over the Assam Rifles Polo Team takes the club into the Dr Ksh Chourjit Singh Inter-District final.',
  },
  {
    date: '2026-02-09',
    when: '09-02-2026',
    outlet: 'The Sangai Express',
    title: '2nd Dr Ksh Chourjit Polo Tournament: Chingkheihunba Polo Club in semis',
    url: 'https://www.thesangaiexpress.com/Encyc/2026/2/10/by-our-staff-reporter-imphal-feb-9-chingkheihunba-polo-club-prevailed-10-6-over-black-watch-polo-club-to-book-.html',
    brief: 'A 10–6 quarter-final win over Black Watch Polo Club, with five goals from Th. Kaoba.',
  },
  {
    date: '2024-04-15',
    when: 'April 2024',
    outlet: 'Imphal Times',
    title: 'HERICOUN distributes certificate to trainees',
    url: 'https://www.imphaltimes.com/news/hericoun-distributes-certificate-to-trainees/',
    brief: 'Certificates for the seven-day riding course the club ran with the Ethno Heritage Council. HERICOUN said the aim was to save the Manipuri pony and teach young people its history.',
  },
  {
    date: '2024-02-15',
    when: 'February 2024',
    outlet: 'Eastern Mirror',
    title: 'Chingkhei Hunba Polo Club wins 17th State Equestrian Championships',
    url: 'https://www.easternmirrornagaland.com/chingkhei-hunba-polo-club-wins-17th-state-equestrian-championships',
    brief: 'The club’s riders are overall champions at Lamphelpat, in a field of 14 clubs and 137 riders.',
  },
  {
    date: '2022-03-16',
    when: '16-03-2022',
    outlet: 'The Sangai Express',
    title: 'Stallion Poirou adjudged ‘best Manipuri Pony Stallion’',
    url: 'https://www.thesangaiexpress.com/Encyc/2022/3/17/IMPHAL-Mar-16Stallion-Poirou-owned-by-Th-Kaoba-was-adjudged-the-best-Manipuri-Pony-Stallion-duri.html',
    brief: 'Th. Kaoba’s stallion Poirou is judged the best Manipuri pony stallion at the state horse show.',
  },
  {
    date: '2022-02-02',
    when: '02-02-2022',
    outlet: 'The Sangai Express',
    title: 'Finalists of women and U-16 boys polo tourneys declared joint winners',
    url: 'https://www.thesangaiexpress.com/Encyc/2022/2/3/By-Our-Staff-ReporterIMPHAL-Feb-2-The-17th-Women-s-State-Level-Polo-Tournament-and-the-5th-U16.html',
    brief: 'Rain stops the 17th Women’s State Level final; the club’s women are declared joint winners.',
  },
  {
    date: '2022-01-17',
    when: '17-01-2022',
    outlet: 'The Sangai Express',
    title: 'X-Polo Club vs CHPC-A in 2nd IE District Polo tourney final',
    url: 'https://www.thesangaiexpress.com/Encyc/2022/1/18/By-Our-Staff-ReporterIMPHAL-Jan-17-X-Polo-Club-will-lock-horns-with-Chingkheihunba-Polo-Club-C.html',
    brief: 'The club’s A side reaches the 2nd Imphal East District final.',
  },
  {
    date: '2021-04-07',
    when: '07-04-2021',
    outlet: 'The Sangai Express',
    title: 'IE Dist Polo Tournament: Paradise Polo Club, Chingkheihunba PC-A win to complete last four line up',
    url: 'https://www.thesangaiexpress.com/Encyc/2021/4/8/By-Our-Sports-ReporterIMPHAL-Apr-7-Paradise-Polo-Club-Wangkhei-edged-out-Eastern-Students-Club-ESC-B-Nongmeibung-and-Chingkheihunba-Polo-Club-CHPC-A-hammered-12-1-past-Ibudhou-Marjing-Kh-K.amp.html',
    brief: 'A 12–1 quarter-final win; the club’s A and B sides both reach the semi-finals of the 1st Imphal East District tournament.',
  },
  {
    date: '2018-11-19',
    when: '19-11-2018',
    outlet: 'Imphal Times',
    title: 'Countdown to 12th Manipur Polo International: Leishemba Takhellambam — A profile',
    url: 'https://www.imphaltimes.com/articles/countdown-to-12th-manipur-polo-international-leishemba-takhellambam-a-profile/',
    brief: 'A profile of Leishemba ahead of the 12th Manipur Polo International; the paper calls his move to the club in 2017 the turning point of his career.',
  },
];
