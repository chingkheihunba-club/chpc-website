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
  launched: false,

  // Club's official contact details. Phone still to be provided by the club.
  email: 'chingkheihunbapoloclub@gmail.com',
  phone: '',
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
