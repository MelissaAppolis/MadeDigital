/**
 * All copy for the Cape Town Plumbing Co. concept.
 *
 * Nothing here claims a certification, a year of trading, a customer count or
 * a review. The business is fictional and the copy stays within what a real
 * plumbing business could say about itself on day one.
 */

export const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Service Areas', href: '#areas' },
  { label: 'FAQs', href: '#faqs' },
  { label: 'Contact', href: '#contact' },
]

export const trustPoints = [
  'Residential & commercial',
  'Fast response',
  'Professional service',
  'Upfront quotes',
]

export const services = [
  {
    id: 'emergency',
    icon: 'burst',
    title: 'Emergency Plumbing',
    body: 'Leaks, burst pipes, overflowing toilets and urgent plumbing problems.',
  },
  {
    id: 'drains',
    icon: 'drain',
    title: 'Blocked Drains',
    body: 'Kitchen sinks, showers, toilets and drainage problems.',
  },
  {
    id: 'leaks',
    icon: 'detect',
    title: 'Leak Detection & Repairs',
    body: 'Find and repair leaking pipes, fittings and fixtures.',
  },
  {
    id: 'geysers',
    icon: 'geyser',
    title: 'Geyser Services',
    body: 'Geyser repairs, replacements and related plumbing work.',
  },
  {
    id: 'bathrooms',
    icon: 'tap',
    title: 'Bathroom Plumbing',
    body: 'Toilets, basins, showers, taps and bathroom plumbing installations.',
  },
  {
    id: 'installations',
    icon: 'wrench',
    title: 'Plumbing Installations',
    body: 'New plumbing installations and renovations for homes and businesses.',
  },
]

export const reasons = [
  {
    title: 'Clear Communication',
    body: 'Know what needs to be done before work begins.',
  },
  {
    title: 'Professional Work',
    body: 'Clean, careful workmanship with attention to detail.',
  },
  {
    title: 'Practical Solutions',
    body: 'We focus on fixing the problem properly — not creating unnecessary work.',
  },
  {
    title: 'Easy to Contact',
    body: 'Get in touch quickly by phone or WhatsApp.',
  },
]

export const steps = [
  {
    number: '01',
    title: 'Get in touch',
    body: 'Tell us what plumbing problem you’re experiencing.',
  },
  {
    number: '02',
    title: 'Get a quote',
    body: 'We’ll assess the work and explain the recommended solution.',
  },
  {
    number: '03',
    title: 'Get it sorted',
    body: 'Our team completes the work professionally and efficiently.',
  },
]

/**
 * Service areas are described as broad regions rather than a suburb-by-suburb
 * guarantee, so the concept does not overstate coverage.
 */
export const areas = [
  {
    name: 'Southern Suburbs',
    note: 'From Observatory through to Tokai.',
  },
  {
    name: 'Northern Suburbs',
    note: 'Bellville, Durbanville and the surrounding areas.',
  },
  {
    name: 'Cape Town CBD',
    note: 'City Bowl homes, offices and commercial premises.',
  },
  {
    name: 'Atlantic Seaboard',
    note: 'Sea Point around to Hout Bay.',
  },
  {
    name: 'Northern Peninsula',
    note: 'Muizenberg and the surrounding coastal areas.',
  },
  {
    name: 'Cape Flats',
    note: 'Residential and commercial work across the area.',
  },
]

export const faqs = [
  {
    q: 'Do you handle plumbing emergencies?',
    a: 'Yes. Contact us by phone or WhatsApp and we’ll help determine the best next step. If it is a burst pipe or a major leak, close your main stopcock first — then get in touch.',
  },
  {
    q: 'Do you work on residential and commercial properties?',
    a: 'Yes. We take on plumbing work for private homes, rental properties, offices and commercial premises across Cape Town.',
  },
  {
    q: 'Can I request a quote?',
    a: 'Yes. Send us a message on WhatsApp, give us a call, or fill in the quote form on this page. Tell us what is happening and we will come back to you with the next step.',
  },
  {
    q: 'What areas do you cover?',
    a: 'Cape Town and the surrounding areas, including the Southern and Northern Suburbs, the CBD, the Atlantic Seaboard and the Cape Flats. If you are not sure whether you fall inside that, just ask.',
  },
  {
    q: 'Can you help with bathroom renovations?',
    a: 'Yes. We handle the plumbing side of bathroom renovations — moving and installing supply and waste lines, fitting toilets, basins, showers and taps, and making good afterwards.',
  },
  {
    q: 'How do you charge for a call-out?',
    a: 'We will explain the cost of the call-out and the expected work before anything starts, so there is no surprise at the end. Larger jobs are quoted in writing.',
  },
]

/** Options for the quote form's "service required" select. */
export const serviceOptions = [
  { value: '', label: 'Select a service' },
  ...services.map((s) => ({ value: s.title, label: s.title })),
  { value: 'Something else', label: 'Something else' },
]
