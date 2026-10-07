// Site-wide settings. Edit here, not in individual pages.

export const site = {
  name: 'Chingkhei Hunba Polo Club',
  short: 'CHPC',
  tagline: 'Polo and horsemanship from Kongpal, Imphal East',
  place: 'Kongpal · Imphal East · Manipur',
  address: 'Kongpal Kshetri Leikai, Imphal East, Manipur 795005',

  // Keep false until the club has approved the content and DK gives the go-ahead.
  // While false, every page carries "noindex" and robots.txt blocks crawlers,
  // so the Netlify preview can be shared with the club without appearing in search.
  launched: true,

  // Club's public contact details, as given on the club's information form (03-10-2026).
  // The club Gmail used for account registration stays private.
  email: 'thoudamthoinu8@gmail.com',
  phone: '+91 96122 70197',
  social: {
    instagram: 'https://www.instagram.com/chingkheihunba.club/',
    facebook: 'https://www.facebook.com/chingkheihunba.club',
    youtube: '', // channel not created yet
  },
};

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/about/', label: 'The Club' },
  { href: '/team/', label: 'Team' },
  { href: '/ponies/', label: 'Ponies' },
  { href: '/honours/', label: 'Honours' },
  { href: '/season/', label: 'Season' },
  { href: '/news/', label: 'News' },
  { href: '/gallery/', label: 'Gallery' },
  { href: '/partners/', label: 'Partners' },
  { href: '/contact/', label: 'Contact' },
];
