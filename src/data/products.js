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
  body: 'Add an event in minutes. Guests reply on their phones, with no app to download. You see the final numbers, dietary needs included.',
  features: [
    'Shared on WhatsApp, opened on any phone',
    'Live guest count and dietary needs',
    'Your venue’s name on every invitation',
    '15 occasions and 12 themes',
    'Download the guest list any time',
  ],
  note: 'A working demo. We are looking for our first venues.',
  // Outside the React app, so it must be a plain <a>, never a <Link>.
  demoHref: '/invites/',
  // The plan cards on /packages#invitations. /products sums them up in one line.
  pricing: [
    {
      label: 'Free trial',
      price: 'Free',
      badge: 'Start here',
      tagline: 'Try it on real events first.',
      features: [
        'Your first 3 events',
        'Any number of guests',
        'Use them within 6 months',
        'No card, no contract',
      ],
      cta: 'Start a free trial',
    },
    {
      label: 'Per event',
      price: 'R650',
      tagline: 'Pay only for the events you run.',
      features: [
        'One event, any number of guests',
        '15 occasions and 12 themes',
        'Live guest count and dietary needs',
        'Download the guest list',
      ],
      cta: 'Ask about per event',
    },
    {
      label: 'Monthly',
      price: 'R1,650',
      period: '/month',
      tagline: 'For venues with events every week.',
      features: [
        'Unlimited events',
        'Everything in per event',
        'Three months minimum',
        'Then month to month',
      ],
      cta: 'Ask about monthly',
    },
  ],
  faqs: [
    {
      q: 'Do guests need an app?',
      a: 'No. The host shares a link on WhatsApp and guests open it on any phone.',
    },
    {
      q: 'Will it carry our venue’s name?',
      a: 'Yes, on every invitation.',
    },
    {
      q: 'Can we see it first?',
      a: 'Yes. Try the demo, or ask us to walk you through it.',
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
  body: 'Built for South African builders. Quotes become projects, site work is logged on the day, and you see what each job costs against what it earns.',
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
  note: 'Finished and getting ready for launch. Book a walkthrough to see it first.',
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
