// 2026–27 season (October 2026 to April 2027).
// Dates, venues and results to be filled in as the associations announce them.
// Keep dates as dd-mm-yyyy strings for display.

export type Fixture = {
  tournament: string;
  dates: string;   // e.g. "12-01-2027 to 20-01-2027", or "" if not announced
  venue: string;
  result: string;
  firstMatch?: string;   // dd-mm-yyyy, the club's first match in this tournament
  link?: string;         // page with this tournament's fixtures and results
  linkLabel?: string;    // button text for the link (default: "Day-by-day fixtures and results")
};

export const season = {
  label: '2026–27',
  fixtures: [
    { tournament: 'DGAR Men & Women Polo Championship', dates: '', venue: '', result: '' },
    { tournament: '3rd Dr. Ksh. Chourjit Singh Inter District Polo Tournament', dates: '08-11-2026 to 17-11-2026', venue: 'Imphal Polo Ground (Mapal Kangjeibung)', result: '', firstMatch: '08-11-2026', link: '/interdistrict26/' },
    { tournament: 'Governor’s Cup Invitation Polo Tournament', dates: '', venue: '', result: '' },
    { tournament: 'District Level Polo Tournament', dates: '', venue: '', result: '' },
    { tournament: '39th N. Hazari & Dr N. Tombi State Polo Tournament', dates: '12-10-2026 to 03-11-2026', venue: 'Imphal Polo Ground (Mapal Kangjeibung)', result: 'Club reached the quarter-finals. Won by Assam Rifles – A', firstMatch: '27-10-2026', link: '/hazari26/', linkLabel: 'Tournament report and results' },
    { tournament: 'Yairipok Polo Tournament', dates: '', venue: '', result: '' },
  ] as Fixture[],
};
