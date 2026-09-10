/**
 * All copy for the Clean & Co. concept.
 *
 * No years of trading, no staff numbers, no certifications, no awards, no
 * client counts, no guarantees. The business is fictional, and everything here
 * stays inside what a real cleaning company could honestly say on day one.
 */
import { images } from './config.js'

export const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Before & After', href: '#before-after' },
  { label: 'About', href: '#about' },
  { label: 'FAQs', href: '#faqs' },
]

/* ---- Hero ---------------------------------------------------------------- */

/** Sits inside the floating card that overlaps the hero photograph. */
export const heroCard = {
  location: 'Serving Cape Town',
  body: 'Homes, offices, rentals and everything in between.',
  chips: ['Residential', 'Commercial', 'Once-off', 'Recurring'],
}

/* ---- Quick service selector ---------------------------------------------- */

/**
 * The "What needs cleaning?" chooser. Each option reveals its own panel with a
 * static photograph and its own call to action.
 */
export const selectorOptions = [
  {
    id: 'home',
    label: 'Home',
    hint: 'Houses & apartments',
    body: 'Regular or one-off cleaning for your home, worked around your week rather than ours.',
    cta: 'Get a Home Cleaning Quote',
    subject: 'home cleaning',
    points: [
      'Weekly, fortnightly or monthly',
      'Kitchens and bathrooms included',
      'Once-off cleans welcome',
    ],
    image: images.selector.home,
  },
  {
    id: 'office',
    label: 'Office',
    hint: 'Workplaces & studios',
    body: 'Cleaning for workplaces, scheduled outside your working hours so nothing gets interrupted.',
    cta: 'Get an Office Cleaning Quote',
    subject: 'office cleaning',
    points: [
      'Before or after hours',
      'Desks, kitchens and bathrooms',
      'Ongoing or once-off',
    ],
    image: images.selector.office,
  },
  {
    id: 'move',
    label: 'Move',
    hint: 'Moving in or out',
    body: 'A full clean for an empty property, so it is handed over ready for whoever comes next.',
    cta: 'Get a Move Cleaning Quote',
    subject: 'move-in or move-out cleaning',
    points: [
      'Inside cupboards and appliances',
      'Walls, skirtings and windows',
      'Booked around your handover date',
    ],
    image: images.selector.move,
  },
  {
    id: 'airbnb',
    label: 'Airbnb',
    hint: 'Short-term rentals',
    body: 'Fast, consistent turnover cleaning between guests, done the same way every time.',
    cta: 'Get a Turnover Cleaning Quote',
    subject: 'Airbnb turnover cleaning',
    points: [
      'Same-day turnarounds',
      'Linen changed and beds made',
      'A checklist you help set',
    ],
    image: images.selector.airbnb,
  },
  {
    id: 'building',
    label: 'After Building',
    hint: 'Post-renovation',
    body: 'Dust and building residue removed after renovations, so the space is usable again.',
    cta: 'Get a Post-Build Quote',
    subject: 'post-renovation cleaning',
    points: [
      'Fine construction dust',
      'Paint, adhesive and residue',
      'Room by room, top to bottom',
    ],
    image: images.selector.building,
  },
]

/* ---- Value proposition --------------------------------------------------- */

export const benefits = [
  {
    id: 'reliable',
    title: 'Reliable',
    body: 'A professional service you can schedule around your life.',
  },
  {
    id: 'thorough',
    title: 'Thorough',
    body: 'Attention to the details that make a space feel genuinely clean.',
  },
  {
    id: 'simple',
    title: 'Simple',
    body: 'Easy booking, clear communication and straightforward service.',
  },
]

/* ---- Services ------------------------------------------------------------ */

/**
 * `price` is a placeholder band, not a quote. Every row also offers a real
 * quote, because a cleaning price depends on the space.
 */
export const services = [
  {
    id: 'residential',
    number: '01',
    title: 'Residential Cleaning',
    body: 'For homes that need regular or one-off cleaning.',
    price: 'From R000',
    subject: 'residential cleaning',
    image: images.services.residential,
  },
  {
    id: 'deep',
    number: '02',
    title: 'Deep Cleaning',
    body: 'A more thorough clean for spaces that need extra attention.',
    price: 'From R000',
    subject: 'a deep clean',
    image: images.services.deep,
  },
  {
    id: 'move',
    number: '03',
    title: 'Move-In / Move-Out',
    body: 'Get a property ready for its next chapter.',
    price: 'Request quote',
    subject: 'move-in or move-out cleaning',
    image: images.services.move,
  },
  {
    id: 'office',
    number: '04',
    title: 'Office Cleaning',
    body: 'Professional cleaning for workplaces and commercial spaces.',
    price: 'Request quote',
    subject: 'office cleaning',
    image: images.services.office,
  },
  {
    id: 'airbnb',
    number: '05',
    title: 'Airbnb Cleaning',
    body: 'Fast, consistent turnover cleaning for short-term rentals.',
    price: 'From R000',
    subject: 'Airbnb turnover cleaning',
    image: images.services.airbnb,
  },
  {
    id: 'renovation',
    number: '06',
    title: 'Post-Renovation Cleaning',
    body: 'Remove dust and building residue after renovations and construction.',
    price: 'Request quote',
    subject: 'post-renovation cleaning',
    image: images.services.renovation,
  },
]

/* ---- Before & after ------------------------------------------------------ */

export const comparisons = [
  {
    id: 'kitchen',
    room: 'Kitchen',
    note: 'Counters cleared, surfaces degreased, sink and taps polished.',
    ...images.comparisons.kitchen,
  },
  {
    id: 'bathroom',
    room: 'Bathroom',
    note: 'Basin, tiles and glass descaled, grout scrubbed, fittings polished.',
    ...images.comparisons.bathroom,
  },
  {
    id: 'living',
    room: 'Living room',
    note: 'Tidied and reset, upholstery vacuumed, surfaces dusted.',
    ...images.comparisons.living,
  },
  {
    id: 'office',
    room: 'Office',
    note: 'Desks cleared and wiped, screens and keyboards cleaned, floors done.',
    ...images.comparisons.office,
  },
]

/* ---- How it works -------------------------------------------------------- */

export const steps = [
  {
    number: '01',
    title: 'Tell us what you need',
    body: 'Choose your service and tell us a little about the space.',
  },
  {
    number: '02',
    title: 'Get your quote',
    body: 'We will review the details and confirm the service.',
  },
  {
    number: '03',
    title: 'Choose your time',
    body: 'Arrange a convenient date and time.',
  },
  {
    number: '04',
    title: 'Enjoy the result',
    body: 'We handle the cleaning while you get on with your day.',
  },
]

/* ---- Why Clean & Co. ----------------------------------------------------- */

export const statements = [
  {
    title: 'Clear communication.',
    body: 'You know who is coming, when they are coming and what is included before anything is booked.',
  },
  {
    title: 'Professional service.',
    body: 'Cleaning treated as a trade, with the same care and consistency every visit.',
  },
  {
    title: 'Attention to detail.',
    body: 'The skirtings, the taps, the inside of the microwave — the parts that are easy to skip.',
  },
  {
    title: 'Easy booking.',
    body: 'A short form or a WhatsApp message. No call centre, no long back-and-forth.',
  },
]

/* ---- Residential & business --------------------------------------------- */

export const residentialPoints = [
  'Regular cleaning',
  'Deep cleaning',
  'Kitchen cleaning',
  'Bathroom cleaning',
  'General home cleaning',
]

export const businessPoints = [
  'Offices',
  'Studios',
  'Retail',
  'Short-term rentals',
  'Small commercial spaces',
]

/* ---- Social proof -------------------------------------------------------- */

/**
 * Illustrative examples written for the concept — not real reviews. The
 * section is labelled as such on the page, and no real person is named or
 * pictured.
 */
export const feedback = [
  {
    quote:
      'The house was ready before we got home, and nothing had been moved around. That is all I wanted.',
    who: 'Homeowner — Cape Town',
  },
  {
    quote:
      'Booked in a few minutes, and the office was done before anyone arrived on Monday morning.',
    who: 'Office Manager — Cape Town',
  },
  {
    quote:
      'Turnovers between guests are the part I used to dread. Now it is one message and it is handled.',
    who: 'Property Host — Cape Town',
  },
]

/* ---- Cape Town ----------------------------------------------------------- */

export const areas = [
  'Southern Suburbs',
  'Northern Suburbs',
  'Cape Town CBD',
  'Atlantic Seaboard',
  'Cape Flats',
]

/* ---- FAQ ----------------------------------------------------------------- */

export const faqs = [
  {
    q: 'Do you offer one-off cleaning?',
    a: 'Yes. The concept supports both one-off and recurring cleaning, so you can book a single clean or a standing weekly, fortnightly or monthly slot.',
  },
  {
    q: 'Do you clean homes and offices?',
    a: 'Yes — residential and commercial spaces are both covered, from apartments and houses to offices, studios and small retail spaces.',
  },
  {
    q: 'Can I book a deep clean?',
    a: 'Yes. A deep clean covers the areas a regular clean does not reach every visit, and is usually booked as a once-off.',
  },
  {
    q: 'Do you offer move-in and move-out cleaning?',
    a: 'Yes. An empty property is cleaned throughout, including inside cupboards and appliances, so it is ready to hand over.',
  },
  {
    q: 'Do you clean Airbnb properties?',
    a: 'Yes. The concept includes short-term rental turnover cleaning, with linen changed and the space reset between guests.',
  },
  {
    q: 'How do I get a quote?',
    a: 'Use the quote form on this page or send a WhatsApp message. Tell us the property type, the service and roughly when you need it.',
  },
]

/* ---- Quote form options -------------------------------------------------- */

export const propertyTypes = [
  { value: 'home', label: 'Home' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'office', label: 'Office' },
  { value: 'airbnb', label: 'Airbnb' },
  { value: 'other', label: 'Other' },
]

export const frequencies = [
  { value: 'once-off', label: 'One-off' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'fortnightly', label: 'Fortnightly' },
  { value: 'monthly', label: 'Monthly' },
]

export const serviceOptions = [
  { value: '', label: 'Select a service' },
  ...services.map((service) => ({ value: service.id, label: service.title })),
  { value: 'not-sure', label: 'Not sure yet' },
]
