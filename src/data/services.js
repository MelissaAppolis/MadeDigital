/**
 * What Made Digital does. Services lists website work; the apps and products
 * live in products.js. Keep every line short: a title, one sentence, three
 * points.
 */

export const services = [
  {
    id: 'new-websites',
    title: 'New websites',
    short: 'A custom website for your business, built for phones first.',
    includes: ['Designed around your customers', 'WhatsApp and enquiry forms', 'Set up on your own domain'],
  },
  {
    id: 'website-revamps',
    title: 'Website refresh',
    short: 'Bring an old website up to date without starting over.',
    includes: ['Keep your domain and content', 'Modern design that works on phones', 'Faster loading'],
  },
  {
    id: 'whatsapp-enquiries',
    title: 'WhatsApp and enquiries',
    short: 'Make it easy for customers to get in touch.',
    includes: ['One-tap WhatsApp and calls', 'Quote forms built for your trade', 'Enquiries straight to your inbox'],
  },
  {
    id: 'seo-foundation',
    title: 'Found on Google',
    short: 'The groundwork that helps people nearby find you.',
    includes: ['Page titles and structure done properly', 'Google Business Profile set up', 'Search Console connected'],
  },
  {
    id: 'website-care',
    title: 'Website care',
    short: 'Optional monthly hosting, updates and backups.',
    includes: ['Hosting, SSL and backups', 'Content and price updates', 'A person to email when you need a change'],
  },
]

/** Applies to websites and apps alike, so keep the wording general. */
export const process = [
  { number: '01', title: 'Talk', body: 'We learn how your business works and what you need.' },
  { number: '02', title: 'Design', body: 'You see the design and give feedback before we build.' },
  { number: '03', title: 'Build', body: 'We build it and test it on every screen size.' },
  { number: '04', title: 'Launch', body: 'It goes live, and we stay on hand afterwards.' },
]

/**
 * The four things Made Digital sells, as the homepage shows them: one line
 * each, so websites and the products get equal weight. Keep `meta` short.
 */
export const offerings = [
  {
    id: 'websites',
    title: 'Websites',
    body: 'Built for phones, made to bring in enquiries.',
    meta: 'From R4,500',
    link: 'See websites',
    to: '/services',
  },
  {
    id: 'invitations',
    title: 'Digital invitations',
    body: 'Guests reply on WhatsApp. Venues get the final numbers.',
    meta: 'Free trial',
    link: 'See invitations',
    to: '/products#invitations',
  },
  {
    id: 'spadework',
    title: 'Spadework',
    body: 'Construction management, from first quote to final invoice.',
    meta: 'Launching soon',
    link: 'See Spadework',
    to: '/products#spadework',
  },
  {
    id: 'custom-apps',
    title: 'Custom apps',
    body: 'Quotes, leads and admin, shaped around how you work.',
    meta: 'Built for you',
    link: 'See custom apps',
    to: '/products#custom-apps',
  },
]
