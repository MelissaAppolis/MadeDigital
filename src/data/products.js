/**
 * Made Digital's own products. They drive the Products page and the homepage
 * teaser. Keep `status` honest: the invitations are a working demo looking for
 * their first venues, and Spadework is finished but not yet launched.
 *
 * The invitations pricing mirrors outreach/venue-invites/PITCH-AND-PRICING.md.
 * Change both together.
 */

export const invitations = {
  id: 'invitations',
  name: 'Digital invitations',
  audience: 'For venues and event companies',
  status: 'Live demo',
  headline: 'An invitation guests remember. Final numbers without the chasing.',
  body: 'Your team adds an event in a few minutes. The host shares the link on WhatsApp, and guests reply on their phones, with no app to download. You see the confirmed number for every function in one place, dietary needs included.',
  features: [
    'Add an event in three short steps',
    'Shared on WhatsApp, opened on any phone',
    'Live guest count, with adults, children and dietary needs',
    'Your venue’s name on every invitation',
    '15 occasions and 12 themes, from weddings to year-end functions',
    'A small game for guests, and a reward for replying',
    'Download the guest list whenever you need it',
  ],
  note: 'This is a working demo. We are looking for our first venues to use it on real events.',
  // Outside the React app, so it must be a plain <a>, never a <Link>.
  demoHref: '/invites/',
  pricing: [
    {
      label: 'Free trial',
      price: 'Free',
      note: 'Your first 3 events, any number of guests. Use them within 6 months. No card and no contract.',
    },
    {
      label: 'Per event',
      price: 'R650',
      note: 'Pay only for the events you run.',
    },
    {
      label: 'Monthly',
      price: 'R1,650',
      period: '/month',
      note: 'Unlimited events. Three months minimum, then month to month.',
    },
  ],
  images: {
    desktop: '/assets/products/invites-host.jpg',
    mobile: '/assets/products/invites-phone.jpg',
    alt: 'The host’s guest count for a sample wedding, and the invitation guests open on their phones',
    url: 'madedigital.co.za/invites',
  },
  short:
    'Invitations guests open on their phones, and the final numbers for every event in one place.',
  linkLabel: 'See the invitations',
  to: '/products#invitations',
  contact: '/contact?need=invitations',
}

export const spadework = {
  id: 'spadework',
  name: 'Spadework',
  audience: 'For builders and construction companies',
  status: 'Launching soon',
  headline: 'Run every job from the first quote to the final invoice.',
  body: 'Spadework is construction management built for South African builders. A quote becomes a project, site work is recorded on the day, and you can see what each job is costing against what it is earning.',
  groups: [
    {
      title: 'Quotes and variations',
      body: 'Branded quotes from your own rates, revisions, and variation orders your client approves.',
    },
    {
      title: 'Planning',
      body: 'Milestones, tasks and a schedule that moves when the work does, public holidays included.',
    },
    {
      title: 'On site',
      body: 'Site diary, inspections, defects and photos, recorded on the day.',
    },
    {
      title: 'Money',
      body: 'Invoices, payment schedules and payments, with each job’s costs set against its income.',
    },
    {
      title: 'Buying and equipment',
      body: 'Suppliers, materials, purchase orders and deliveries, and where every piece of equipment is.',
    },
    {
      title: 'Team and clients',
      body: 'Your staff and subcontractors on each job, and a portal where clients follow progress.',
    },
  ],
  note: 'Spadework is finished and being prepared for launch. Book a walkthrough to see it working first.',
  short:
    'Construction management for builders: quotes, planning, site records and invoices in one place.',
  linkLabel: 'See Spadework',
  to: '/products#spadework',
  contact: '/contact?need=spadework',
}

export const products = [invitations, spadework]

/** What a tailor-made app can do. Used on the Products page. */
export const appExamples = [
  {
    title: 'Quote faster',
    body: 'Pick from your own prices and send a branded quote before you leave the site.',
  },
  {
    title: 'Keep every lead',
    body: 'Enquiries from your website, WhatsApp and phone land in one list, with a reminder to follow up.',
  },
  {
    title: 'Cut the paperwork',
    body: 'Job cards, checklists and sign-offs on a phone instead of a clipboard.',
  },
  {
    title: 'See how it’s going',
    body: 'The numbers that matter to you on one screen, without building a spreadsheet.',
  },
]
