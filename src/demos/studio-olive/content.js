/**
 * All copy for the Studio Olive Beauty concept.
 *
 * No qualifications, certifications, staff, awards or medical claims — the
 * business is fictional, and everything here stays inside what a real studio
 * could honestly say about itself.
 */

export const navLinks = [
  { label: 'Treatments', href: '#treatments' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'FAQs', href: '#faqs' },
  { label: 'Contact', href: '#contact' },
]

/**
 * The treatment catalogue.
 *
 * This is the data a real client would edit most often, so it is deliberately
 * flat and obvious: add a row, change a price, reorder a category. The menu
 * component builds its tabs from `categories` and needs no other changes.
 */
export const categories = ['Facials', 'Nails', 'Beauty']

export const treatments = [
  {
    name: 'Signature Facial',
    category: 'Facials',
    duration: '60 min',
    price: 'R650',
    description:
      'A personalised facial designed to refresh, nourish and restore the skin. We start by looking at your skin on the day and choose the products to suit it.',
  },
  {
    name: 'Glow Facial',
    category: 'Facials',
    duration: '45 min',
    price: 'R550',
    description:
      'A brightening treatment focused on leaving skin looking fresh and radiant. A good choice before an event, or when your skin needs a lift.',
  },
  {
    name: 'Deep Cleanse Facial',
    category: 'Facials',
    duration: '75 min',
    price: 'R780',
    description:
      'A cleansing and clarifying treatment for congested or tired skin, taken slowly and finished with something calming.',
  },
  {
    name: 'Classic Manicure',
    category: 'Nails',
    duration: '45 min',
    price: 'R320',
    description:
      'A clean, polished manicure with attention to detail — shaping, cuticle care and a colour of your choosing.',
  },
  {
    name: 'Gel Manicure',
    category: 'Nails',
    duration: '60 min',
    price: 'R420',
    description:
      'Long-lasting colour and a beautifully finished look, for when you would rather not think about your nails for a few weeks.',
  },
  {
    name: 'Pedicure',
    category: 'Nails',
    duration: '60 min',
    price: 'R450',
    description:
      'A relaxing foot treatment with professional finishing. Add a gel colour if you would like it to last.',
  },
  {
    name: 'Brow Shape',
    category: 'Beauty',
    duration: '30 min',
    price: 'R220',
    description:
      'Professional brow shaping tailored to your features, rather than to a trend.',
  },
  {
    name: 'Lash Lift',
    category: 'Beauty',
    duration: '60 min',
    price: 'R550',
    description:
      'A natural-looking lift designed to enhance your lashes, with no extensions and nothing to maintain.',
  },
  {
    name: 'Brow & Lash',
    category: 'Beauty',
    duration: '75 min',
    price: 'R700',
    description:
      'A convenient combination for a polished everyday look, booked as one appointment.',
  },
]

export const benefits = [
  {
    title: 'Personal',
    body: 'Treatments selected around your needs and preferences.',
  },
  {
    title: 'Unhurried',
    body: 'A calm environment where you can take a moment for yourself.',
  },
  {
    title: 'Thoughtful',
    body: 'Careful attention to the small details that make an appointment feel special.',
  },
  {
    title: 'Professional',
    body: 'A polished beauty experience from booking to treatment.',
  },
]

/**
 * Gallery. `span` drives the masonry layout: 'tall' takes two rows, 'wide'
 * takes two columns. Replace `src` with photographs and keep the spans.
 */
export const gallery = [
  {
    src: '/assets/demos/studio-olive/room-window.jpg',
    alt: 'The treatment room, with daylight from a tall window',
    span: 'tall',
  },
  {
    src: '/assets/demos/studio-olive/shelf-skincare.jpg',
    alt: 'Skincare bottles arranged on a stone shelf',
  },
  {
    src: '/assets/demos/studio-olive/nails-burgundy.jpg',
    alt: 'A finished manicure in a deep burgundy',
  },
  {
    src: '/assets/demos/studio-olive/oils-texture.jpg',
    alt: 'Treatment oils and natural textures laid out on a table',
    span: 'wide',
  },
  {
    src: '/assets/demos/studio-olive/skincare-soft.jpg',
    alt: 'Skincare bottles in soft afternoon light',
  },
  {
    src: '/assets/demos/studio-olive/compact-gold.jpg',
    alt: 'A gold compact beside dried flowers on a dark surface',
    span: 'tall',
  },
  {
    src: '/assets/demos/studio-olive/cosmetics-minimal.jpg',
    alt: 'A small group of cosmetics on a pale surface',
  },
  {
    src: '/assets/demos/studio-olive/bottles-cloth.jpg',
    alt: 'Two glass bottles resting on folded cloth',
  },
]

/** The social grid. Square crops, same replaceable pattern as the gallery. */
export const social = [
  {
    src: '/assets/demos/studio-olive/nails-french.jpg',
    alt: 'Studio detail — a French manicure finished with gold rings',
  },
  {
    src: '/assets/demos/studio-olive/serum-marble.jpg',
    alt: 'Studio detail — a serum bottle and eucalyptus on marble',
  },
  {
    src: '/assets/demos/studio-olive/nails-burgundy.jpg',
    alt: 'Studio detail — a burgundy manicure, freshly finished',
  },
  {
    src: '/assets/demos/studio-olive/room-arch.jpg',
    alt: 'Studio detail — the treatment room in warm afternoon light',
  },
  {
    src: '/assets/demos/studio-olive/bottles-cloth.jpg',
    alt: 'Studio detail — glass bottles resting on folded cloth',
  },
  {
    src: '/assets/demos/studio-olive/towel-oils.jpg',
    alt: 'Studio detail — a rolled towel and treatment oils',
  },
]

/**
 * DEMONSTRATION CONTENT — not real customers.
 *
 * The section that renders these is headed "Example client feedback" and
 * carries a note saying so. Do not present these as genuine reviews, and do
 * not add photographs or surnames to them.
 */
export const testimonials = [
  {
    quote:
      'The studio is beautiful and completely calm. It genuinely felt like an hour away from everything else.',
    name: 'Sarah',
    place: 'Cape Town',
  },
  {
    quote:
      'Every small thing had been thought about, right down to how the appointment was booked and confirmed.',
    name: 'Nadia',
    place: 'Cape Town',
  },
  {
    quote:
      'I came in for a facial and left with skin that actually looked like mine, only better. No hard selling at all.',
    name: 'Lerato',
    place: 'Cape Town',
  },
]

export const faqs = [
  {
    q: 'How do I book an appointment?',
    a: 'You can contact the studio via WhatsApp or use the booking enquiry form on this page. Let us know the treatment you would like and a day that suits you, and we will confirm a time.',
  },
  {
    q: 'How early should I arrive?',
    a: 'Arriving a few minutes before your appointment gives you time to settle in, so your treatment can start on time and finish unhurried.',
  },
  {
    q: 'Can I change my appointment?',
    a: 'Contact the studio as soon as possible if you need to change your appointment. The earlier we know, the easier it is to offer the time to someone else.',
  },
  {
    q: 'Do you offer multiple treatments in one visit?',
    a: 'Where scheduling allows, treatments can be combined. Contact the studio to discuss your requirements and we will work out what fits comfortably in one visit.',
  },
  {
    q: 'Where are you located?',
    a: 'Studio Olive is a website concept rather than a real business, so there is no address to visit. On a live site this is where the studio would give directions, parking and landmarks.',
  },
  {
    q: 'What if I am not sure which treatment to book?',
    a: 'Send a message describing what you are after and we will suggest something. There is no obligation, and no one will try to talk you into a longer treatment than you need.',
  },
]

/** Options for the booking form's treatment select. */
export const treatmentOptions = [
  { value: '', label: 'Select a treatment' },
  ...treatments.map((t) => ({
    value: t.name,
    label: `${t.name} · ${t.duration} · ${t.price}`,
  })),
  { value: 'Not sure yet', label: 'I’m not sure yet' },
]

export const timeOptions = [
  { value: '', label: 'Any time' },
  { value: 'Morning', label: 'Morning' },
  { value: 'Midday', label: 'Midday' },
  { value: 'Afternoon', label: 'Afternoon' },
  { value: 'Late afternoon', label: 'Late afternoon' },
]
