// 2026–27 season (October 2026 to April 2027).
// Dates, venues and results to be filled in as the associations announce them.
// Keep dates as dd-mm-yyyy strings for display.

export type Fixture = {
  tournament: string;
  dates: string;   // e.g. "12-01-2027 to 20-01-2027", or "" if not announced
  venue: string;
  result: string;
};

export const season = {
  label: '2026–27',
  fixtures: [
    { tournament: 'DGAR Men & Women Polo Championship', dates: '', venue: '', result: '' },
    { tournament: 'Dr Ksh Chourjit Singh Inter-District Polo Tournament', dates: '', venue: '', result: '' },
    { tournament: 'Governor’s Cup Invitation Polo Tournament', dates: '', venue: '', result: '' },
    { tournament: 'District Level Polo Tournament', dates: '', venue: '', result: '' },
    { tournament: 'N. Hazari & Dr N. Tombi State Polo Tournament', dates: '', venue: '', result: '' },
    { tournament: 'Yaingpokpi Polo Tournament', dates: '', venue: '', result: '' },
  ] as Fixture[],
};
