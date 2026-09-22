/**
 * Kestrel Dermatology — a Made Digital website concept.
 *
 * FICTIONAL PRACTICE. There is no such practice and no Dr Anele Fourie; this
 * site exists to show Cape Town specialists what Made Digital would build for
 * a private practice.
 *
 * Every number, address and image path lives in this one object. To repoint
 * the concept at a real practice, change these values and nothing else — no
 * component contains a hard-coded number or file path.
 *
 * Medical practices advertise under the HPCSA's ethical rules, so the copy on
 * this concept never compares the practice to others, never promises an
 * outcome, and carries no testimonials or patient before-and-after images.
 * Keep it that way when adapting it for a real practice.
 */
export const businessConfig = {
  name: 'Kestrel Dermatology',
  logoLead: 'Kestrel',
  logoTail: 'Dermatology',

  doctor: 'Dr Anele Fourie',
  doctorRole: 'Specialist Dermatologist',
  qualifications: 'MBChB, FC Derm (SA)',

  // Demo placeholders — deliberately not dialable.
  phoneDisplay: '+27 00 000 0000',
  phoneHref: 'tel:+270000000000',
  email: 'rooms@kestrelderm.example',
  referralEmail: 'referrals@kestrelderm.example',
  practiceNumber: '000 0000 0',

  // wa.me expects digits only, no plus sign or spaces.
  whatsappNumber: '270000000000',
  whatsappMessage: 'Hi Kestrel Dermatology, I would like to ask about an appointment.',

  // No invented street address or hospital — the area only.
  address: 'Consulting rooms, Southern Suburbs, Cape Town',
  region: 'Southern Suburbs · Cape Town',

  hours: [
    { label: 'Mon – Thu', value: '08:00 – 16:30' },
    { label: 'Friday', value: '08:00 – 13:00' },
    { label: 'Weekends', value: 'Closed' },
  ],
}

export const whatsappHref = `https://wa.me/${businessConfig.whatsappNumber}?text=${encodeURIComponent(
  businessConfig.whatsappMessage
)}`

/** Where this concept sits inside the Made Digital site. */
export const conceptMeta = {
  studioHref: '/',
  caseStudyHref: '/work/kestrel-dermatology',
}

/**
 * Instrument Sans carries everything; Instrument Serif appears only as the
 * italic accent word in headings. Loaded from the concept rather than
 * index.html so only visitors who open Kestrel pay for them.
 */
export const fontHref =
  'https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Instrument+Serif:ital@1&display=swap'

/**
 * Every photograph on the concept, in one place.
 *
 * Photographs licensed from Pexels (free for commercial use, no attribution
 * required). A real practice should replace them with its own photography of
 * its rooms and doctor — never with patient photographs. The crop each slot
 * expects is noted against it. Most are shown inside a circular "lens".
 */
const base = '/assets/demos/kestrel-dermatology'

export const images = {
  hero: {
    src: `${base}/hero-exam.jpg`, // 1:1, shown as a circle
    alt: 'A dermatologist examining a patient’s skin with a handheld dermatoscope',
  },
  lens: {
    src: `${base}/lens-skin.jpg`, // 1:1 macro, shown as a small circle
    alt: 'A close-up of healthy skin texture',
  },
  skinCheck: {
    src: `${base}/skin-check.jpg`, // 1:1, shown as a circle
    alt: 'A magnified image of a mole on a tablet screen during a skin check',
  },
  skinCheckDetail: {
    src: `${base}/skin-check-detail.jpg`, // 1:1
    alt: 'A dermatologist looking through a dermatoscope attached to a tablet',
  },
  doctor: {
    src: `${base}/doctor.jpg`, // 1:1 portrait, shown as a circle
    alt: 'Portrait of the dermatologist in a white coat, smiling',
  },
  consult: {
    src: `${base}/consult.jpg`, // 7:5
    alt: 'The dermatologist talking a patient through their results across a desk',
  },
  results: {
    src: `${base}/results.jpg`, // 5:4
    alt: 'A patient looking at images of her skin on a tablet with the clinician',
  },
  rooms: {
    src: `${base}/rooms.jpg`, // 14:9
    alt: 'A bright, quiet waiting room with upholstered chairs',
  },
}
