/**
 * Website pricing. Drives the Websites tab on /packages and the homepage
 * pricing teaser. Invitation pricing lives in products.js.
 * Keep lists short: six lines a plan is the most a visitor will read.
 */

export const packages = [
  {
    id: 'start',
    name: 'Start',
    price: 'R4,500',
    prefix: '',
    tagline: 'A professional presence online.',
    features: [
      '1–5 pages',
      'Custom design',
      'Works on every phone',
      'WhatsApp button and contact form',
      'Google Maps and basic SEO',
      '1 round of changes',
    ],
    cta: 'Get Started',
    to: '/contact?package=start',
  },
  {
    id: 'grow',
    name: 'Grow',
    price: 'R7,500',
    prefix: '',
    popular: true,
    tagline: 'A website that brings in enquiries.',
    features: [
      'Up to 10 pages',
      'A page for each service',
      'Quote and enquiry forms',
      'Gallery of your work',
      'Google Business and Search Console setup',
      '2 rounds of changes',
    ],
    cta: 'Choose Grow',
    to: '/contact?package=grow',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 'R12,500',
    prefix: 'From',
    tagline: 'For bookings, content and more.',
    features: [
      '10–20 pages',
      'Fully custom design',
      'Online bookings',
      'A blog you can update',
      'Advanced SEO and integrations',
      '3 rounds of changes',
    ],
    cta: "Let's Talk",
    to: '/contact?package=pro',
  },
]

export const refresh = {
  id: 'refresh',
  name: 'Website Refresh',
  price: 'R5,500',
  prefix: 'From',
  headline: 'Already have a website?',
  tagline:
    'We modernise what you have. Your domain, content and search history stay put.',
  features: [
    'Modern redesign',
    'Built for phones',
    'Clearer services and navigation',
    'WhatsApp and quote forms',
    'Faster loading and SEO basics',
  ],
  cta: 'Get a Free Website Review',
  to: '/website-review',
}

export const carePlans = [
  {
    id: 'care',
    name: 'Care',
    price: 'R299',
    period: '/month',
    tagline: 'Kept online, safe and backed up.',
    features: ['Hosting', 'SSL', 'Backups', 'Security', 'Uptime monitoring'],
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 'R599',
    period: '/month',
    recommended: true,
    tagline: 'Plus regular updates.',
    features: [
      'Everything in Care',
      'Website and content updates',
      'Performance and SEO monitoring',
      'Monthly maintenance',
    ],
  },
  {
    id: 'growth-plus',
    name: 'Growth Plus',
    price: 'R999',
    period: '/month',
    tagline: 'Plus new pages and more enquiries.',
    features: [
      'Everything in Growth',
      'New landing pages',
      'SEO and content updates',
      'Conversion improvements',
      'Priority support',
    ],
  },
]

export const faqs = [
  {
    q: 'How long does a website take?',
    a: 'Start: two to three weeks. Grow: three to four. Pro: we agree a date before we begin.',
  },
  {
    q: 'What do you need from me?',
    a: 'Your logo, photos of your work and a short description of what you do. No photos? Tell us early and we will plan around it.',
  },
  {
    q: 'Do I have to take a monthly plan?',
    a: 'No. Care plans are optional, and never a condition of building your website.',
  },
  {
    q: 'Do I own the website?',
    a: 'Yes. The domain, the content and the finished site are yours.',
  },
  {
    q: 'What about the domain and hosting?',
    a: 'A domain is a small yearly fee. Hosting comes with a care plan, or we set it up in your own account.',
  },
  {
    q: 'What if none of these fit?',
    a: 'Tell us what you need and we will quote it properly.',
  },
]
