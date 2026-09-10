/**
 * Cape Town Plumbing Co. — a Made Digital website concept.
 *
 * FICTIONAL BUSINESS. There is no such company; this site exists to show
 * plumbing businesses what Made Digital would build for them.
 *
 * Every phone number, address and link the concept uses lives in this one
 * object. To repoint the concept at a real business, change these values and
 * nothing else — no component contains a hard-coded number.
 */
export const businessConfig = {
  name: 'Cape Town Plumbing Co.',
  shortName: 'CTP Co.',
  tagline: 'Reliable plumbing. Done right.',
  supporting:
    'Professional plumbing services across Cape Town, when you need them.',

  // Demo placeholders — deliberately not dialable.
  phoneDisplay: '+27 00 000 0000',
  phoneHref: 'tel:+270000000000',
  email: 'hello@capetownplumbing.example',

  // wa.me expects digits only, no plus sign or spaces.
  whatsappNumber: '270000000000',
  whatsappDisplay: '+27 00 000 0000',
  whatsappMessage:
    'Hi Cape Town Plumbing Co., I would like a quote for some plumbing work.',

  hours: [
    { days: 'Monday – Friday', time: '07:00 – 17:00' },
    { days: 'Saturday', time: '08:00 – 13:00' },
    { days: 'Emergencies', time: 'Contact us any time' },
  ],

  base: 'Cape Town, Western Cape',

  /**
   * Hero imagery. Swap these paths for real photographs when they are
   * available — the layout expects a portrait crop for the hero and does not
   * care what the file is.
   */
  /**
   * Photographs, licensed from Pexels (free for commercial use, no attribution
   * required). Swap any of them for the business's own photos of its work —
   * that is always better than stock. The crop each slot expects is noted.
   *
   * The hero runs full-bleed and needs two crops: a wide one for tablet and
   * desktop and a portrait one for phones, because a 16:9 crop zooms to
   * nothing in a tall phone viewport.
   */
  heroImage: '/assets/demos/cape-town-plumbing/hero-portrait.jpg', // 3:4, phones
  heroImageWide: '/assets/demos/cape-town-plumbing/hero.jpg', // 16:9, 760px up
  heroImageAlt:
    'A finished modern bathroom in dark marble, lit warm along the vanity',
  aboutImage: '/assets/demos/cape-town-plumbing/detail.jpg', // 3:2
  aboutImageAlt:
    'A plumber fitting a compression joint onto pipework on a workbench',
  workImage: '/assets/demos/cape-town-plumbing/basin.jpg', // 3:2
  workImageAlt:
    'A newly fitted chrome mixer tap on a clean white basin',
  bandImage: '/assets/demos/cape-town-plumbing/band.jpg', // wide, decorative
}

/** The WhatsApp deep link, built once from the config above. */
export const whatsappHref = `https://wa.me/${businessConfig.whatsappNumber}?text=${encodeURIComponent(
  businessConfig.whatsappMessage
)}`

/** Where this concept lives inside the Made Digital site. */
export const conceptMeta = {
  studio: 'Made Digital',
  studioHref: '/',
  caseStudyHref: '/work/cape-town-plumbing-co',
  label: 'Website concept by Made Digital',
}
