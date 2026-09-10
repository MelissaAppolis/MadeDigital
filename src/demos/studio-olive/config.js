/**
 * Studio Olive Beauty — a Made Digital website concept.
 *
 * FICTIONAL BUSINESS. There is no such studio; this site exists to show beauty
 * and wellness businesses what Made Digital would build for them.
 *
 * Every phone number, address and link the concept uses lives in this one
 * object. To repoint the concept at a real business, change these values and
 * nothing else — no component contains a hard-coded number.
 */
export const businessConfig = {
  name: 'Studio Olive Beauty',
  shortName: 'Studio Olive',
  tagline: 'Beauty, thoughtfully done.',
  supporting: 'A calm, considered beauty experience in the heart of Cape Town.',

  // Demo placeholders — deliberately not dialable.
  phoneDisplay: '+27 00 000 0000',
  phoneHref: 'tel:+270000000000',
  email: 'hello@studioolive.example',

  // wa.me expects digits only, no plus sign or spaces.
  whatsappNumber: '270000000000',
  whatsappDisplay: '+27 00 000 0000',
  whatsappMessage:
    'Hi Studio Olive, I would like to book an appointment.',

  // Placeholder social — no real account is implied.
  instagramHandle: '@studioolive',
  instagramUrl: '#',

  // Deliberately vague: a fictional studio gets no street address.
  area: 'Cape Town',
  locationNote: 'Studio address shared when you book.',

  hours: [
    { days: 'Tuesday – Friday', time: '09:00 – 18:00' },
    { days: 'Saturday', time: '09:00 – 15:00' },
    { days: 'Sunday & Monday', time: 'Closed' },
  ],

  /**
   * Photographs, licensed from Pexels (free for commercial use, no attribution
   * required). Replace any of them with the studio's own photography — that is
   * always better than stock. Each slot expects the crop noted against it.
   */
  images: {
    hero: '/assets/demos/studio-olive/room-arch.jpg', // arch, portrait 4:5
    introLarge: '/assets/demos/studio-olive/table-minimal.jpg', // portrait 4:5
    introSmall: '/assets/demos/studio-olive/serum-marble.jpg', // square
    about: '/assets/demos/studio-olive/towel-oils.jpg', // portrait 3:4
    band: '/assets/demos/studio-olive/interior-warm.jpg', // wide 21:9
  },
}

/** The WhatsApp deep link, built once from the config above. */
export const whatsappHref = `https://wa.me/${businessConfig.whatsappNumber}?text=${encodeURIComponent(
  businessConfig.whatsappMessage
)}`

/** Where this concept lives inside the Made Digital site. */
export const conceptMeta = {
  studio: 'Made Digital',
  studioHref: '/',
  caseStudyHref: '/work/studio-olive-beauty',
  label: 'Website concept by Made Digital',
}

/**
 * Display typeface for this concept only, loaded on mount by the page.
 * Fraunces carries the brand; Inter (already loaded site-wide) does the UI.
 */
export const fontHref =
  'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..600&display=swap'
