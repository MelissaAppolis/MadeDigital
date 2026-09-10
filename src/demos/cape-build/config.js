/**
 * Cape Build Co. — a Made Digital website concept.
 *
 * FICTIONAL BUSINESS. There is no such company; this site exists to show
 * residential builders what Made Digital would build for them.
 *
 * Every phone number, address and image path the concept uses lives in this
 * one object. To repoint the concept at a real business, change these values
 * and nothing else — no component contains a hard-coded number or file path.
 */
export const businessConfig = {
  name: 'Cape Build Co.',
  shortName: 'Cape Build',
  tagline: 'Built for the way you live.',
  supporting:
    'Residential construction and renovations across Cape Town, from thoughtful alterations to complete transformations.',

  // Demo placeholders — deliberately not dialable.
  phoneDisplay: '+27 00 000 0000',
  phoneHref: 'tel:+270000000000',
  email: 'projects@capebuild.example',

  // wa.me expects digits only, no plus sign or spaces.
  whatsappNumber: '270000000000',
  whatsappDisplay: '+27 00 000 0000',
  whatsappMessage:
    'Hi Cape Build Co., I would like to talk about a project.',

  area: 'Cape Town',
  locationNote: 'Cape Town and surrounding areas',

  hours: [
    { days: 'Monday – Friday', time: '07:30 – 17:00' },
    { days: 'Saturday', time: 'By arrangement' },
  ],
}

/**
 * Every photograph on the concept, in one place — §18 of the brief.
 *
 * Photographs licensed from Pexels (free for commercial use, no attribution
 * required). Replace any of them with the builder's own site photography; that
 * is always better than stock. The crop each slot expects is noted against it.
 *
 * All imagery on this site is static. Nothing pans, zooms or parallaxes.
 */
const base = '/assets/demos/cape-build'

export const images = {
  hero: {
    src: `${base}/hero.jpg`, // 16:9
    alt: 'A contemporary single-storey home opening onto a pool and covered terrace',
  },
  cta: {
    src: `${base}/cta.jpg`, // 2:1
    alt: '',
  },
  projects: {
    seaPoint: {
      src: `${base}/project-sea-point.jpg`, // 8:5
      alt: 'A renovated coastal home with a long pool and mountain backdrop',
    },
    constantia: {
      src: `${base}/project-constantia.jpg`, // 8:5
      alt: 'A modern extension opening onto a lawn and swimming pool',
    },
    claremont: {
      src: `${base}/project-claremont.jpg`, // 8:5
      alt: 'A renovated kitchen in pale timber, opening into a dining area',
    },
  },
  services: {
    'new-homes': {
      src: `${base}/svc-new-homes.jpg`, // 4:5
      alt: 'A sculptural white house form seen against a dark sky',
    },
    renovations: {
      src: `${base}/svc-renovations.jpg`,
      alt: 'A sunlit room mid-renovation, stripped back and ready for work',
    },
    extensions: {
      src: `${base}/svc-extensions.jpg`,
      alt: 'A contemporary house with timber-clad balconies added to the rear',
    },
    kitchens: {
      src: `${base}/svc-kitchens.jpg`,
      alt: 'A finished kitchen in warm timber with tall windows',
    },
    bathrooms: {
      src: `${base}/svc-bathrooms.jpg`,
      alt: 'A finished bathroom in large-format grey tile with a walk-in shower',
    },
    alterations: {
      src: `${base}/svc-alterations.jpg`,
      alt: 'An interior opened up to the studwork during structural alterations',
    },
  },
  capeTown: [
    { src: `${base}/ct-1.jpg`, alt: 'A residential facade framed by planting' }, // 4:5
    { src: `${base}/ct-2.jpg`, alt: 'A terrace of contemporary townhouses' },
    { src: `${base}/ct-3.jpg`, alt: 'New roof trusses set out against an open sky' },
    { src: `${base}/ct-4.jpg`, alt: 'A whitewashed house with deep window reveals' },
    { src: `${base}/ct-5.jpg`, alt: 'Brick and timber cladding meeting at a corner' },
  ],
  details: {
    beams: {
      src: `${base}/detail-beams.jpg`, // 3:4
      alt: 'Board-marked concrete beams meeting overhead',
    },
    timber: {
      src: `${base}/detail-timber.jpg`, // 1:1
      alt: 'Close grain and weathering on a timber surface',
    },
    concrete: {
      src: `${base}/detail-concrete.jpg`, // 3:2
      alt: 'The worked surface of a poured concrete wall',
    },
    fixture: {
      src: `${base}/detail-fixture.jpg`, // 1:1
      alt: 'A brushed steel sink and mixer set into a stone worktop',
    },
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
  caseStudyHref: '/work/cape-build-co',
  label: 'Website concept by Made Digital',
}

/**
 * Display typeface for this concept only, loaded on mount by the page.
 * Archivo's width axis is what gives the headings their monumental,
 * architectural set — nothing else on any concept uses it.
 */
export const fontHref =
  'https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@75..125,400..800&display=swap'
