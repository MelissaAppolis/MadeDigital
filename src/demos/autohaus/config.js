/**
 * AutoHaus Cape Town — a Made Digital website concept.
 *
 * FICTIONAL BUSINESS. There is no such workshop; this site exists to show
 * independent automotive workshops what Made Digital would build for them.
 *
 * Every phone number, address and image path the concept uses lives in this
 * one object. To repoint the concept at a real business, change these values
 * and nothing else — no component contains a hard-coded number or file path.
 */
export const businessConfig = {
  name: 'AutoHaus Cape Town',
  shortName: 'AutoHaus',
  logo: 'AUTOHAUS',
  logoSuffix: 'Cape Town',
  tagline: 'Know your car. Trust the work.',
  supporting:
    'Professional vehicle servicing and repairs for drivers who want clear answers, quality workmanship and a workshop they can trust.',

  // Demo placeholders — deliberately not dialable.
  phoneDisplay: '+27 00 000 0000',
  phoneHref: 'tel:+270000000000',
  email: 'bookings@autohauscpt.example',

  // wa.me expects digits only, no plus sign or spaces.
  whatsappNumber: '270000000000',
  whatsappDisplay: '+27 00 000 0000',
  whatsappMessage: 'Hi AutoHaus, I would like to book my vehicle in.',

  // No invented street address — the area only.
  address: 'Cape Town, Western Cape',
  area: 'Cape Town',

  hours: [
    { days: 'Monday – Friday', time: '07:30 – 17:00' },
    { days: 'Saturday', time: '08:00 – 12:00' },
  ],
}

/**
 * Every photograph on the concept, in one place.
 *
 * Photographs licensed from Pexels (free for commercial use, no attribution
 * required). Replace any of them with the workshop's own photography; that is
 * always better than stock. The crop each slot expects is noted against it.
 *
 * EVERY IMAGE ON THIS SITE IS STATIC. Nothing zooms, pans, parallaxes or
 * cross-fades. Hover changes a ground colour or an opacity — never a picture.
 */
const base = '/assets/demos/autohaus'

export const images = {
  hero: {
    src: `${base}/hero.jpg`, // 4:3
    alt: 'Vehicles on the floor of a bright modern workshop, ready for servicing',
  },
  workshop: {
    src: `${base}/workshop.jpg`, // 16:9
    alt: 'A clean, well-lit workshop bay with a vehicle raised on a lift',
  },
  inspection: {
    src: `${base}/inspection.jpg`, // 4:3
    alt: 'A vehicle raised on a two-post lift while a technician inspects underneath',
  },
  ctaStrip: {
    src: `${base}/cta-strip.jpg`, // 10:3
    alt: '',
  },

  /** The diagnostics feature — two static photographs, nothing moving. */
  diagnostics: {
    tablet: {
      src: `${base}/diag-tablet.jpg`, // 3:4
      alt: 'A technician reading a handheld diagnostic unit at an open engine bay',
    },
    lights: {
      src: `${base}/diag-lights.jpg`, // 4:3
      alt: 'An instrument cluster with engine and warning lights illuminated',
    },
  },

  /** One photograph per service, keyed by service id. */
  services: {
    service: {
      src: `${base}/svc-service.jpg`, // 4:3
      alt: 'A technician working at an open engine bay during a routine service',
    },
    diagnostics: {
      src: `${base}/svc-diagnostics.jpg`,
      alt: 'Hands operating a diagnostic tablet plugged into a vehicle',
    },
    brakes: {
      src: `${base}/svc-brakes.jpg`,
      alt: 'A brake disc and hub with the wheel removed during a brake service',
    },
    battery: {
      src: `${base}/svc-battery.jpg`,
      alt: 'A vehicle battery and terminals in an engine bay',
    },
    aircon: {
      src: `${base}/svc-aircon.jpg`,
      alt: 'A dashboard air vent in a vehicle interior',
    },
    suspension: {
      src: `${base}/svc-suspension.jpg`,
      alt: 'A technician working beneath a raised vehicle on a workshop lift',
    },
    engine: {
      src: `${base}/svc-engine.jpg`,
      alt: 'A technician inspecting an engine bay under an inspection lamp',
    },
    tyres: {
      src: `${base}/svc-tyres.jpg`,
      alt: 'A technician refitting a road wheel to a vehicle on a workshop ramp',
    },
    alignment: {
      src: `${base}/svc-alignment.jpg`,
      alt: 'A technician fitting alignment equipment to a road wheel',
    },
    inspection: {
      src: `${base}/svc-inspection.jpg`,
      alt: 'A vehicle raised on a lift in a busy workshop',
    },
  },

  /** The vehicle-type band, keyed by block id. */
  vehicles: {
    cars: {
      src: `${base}/veh-cars.jpg`, // 4:5
      alt: 'A hatchback parked on a coastal road at first light',
    },
    suvs: {
      src: `${base}/veh-suvs.jpg`,
      alt: 'An SUV parked outside a brick building',
    },
    bakkies: {
      src: `${base}/veh-bakkies.jpg`,
      alt: 'A double-cab bakkie on a gravel track',
    },
    commercial: {
      src: `${base}/veh-commercial.jpg`,
      alt: 'A light commercial panel van parked on a suburban street',
    },
  },

  /** The Cape Town mosaic. */
  capeTown: {
    road: {
      src: `${base}/ct-road.jpg`, // 3:2
      alt: 'A coastal mountain road curving above the sea outside Cape Town',
    },
    detail: {
      src: `${base}/ct-detail.jpg`, // 1:1
      alt: 'A close view of an alloy wheel and tyre',
    },
    workshop: {
      src: `${base}/ct-workshop.jpg`, // 4:3
      alt: 'The length of a workshop floor with vehicles in the bays',
    },
  },
}

/** The WhatsApp deep link, built once from the config above. */
export const whatsappHref = `https://wa.me/${businessConfig.whatsappNumber}?text=${encodeURIComponent(
  businessConfig.whatsappMessage
)}`

/** A WhatsApp link that mentions the service the visitor was looking at. */
export const whatsappFor = (subject) =>
  `https://wa.me/${businessConfig.whatsappNumber}?text=${encodeURIComponent(
    `Hi AutoHaus, I would like to book ${subject}.`
  )}`

/** Where this concept lives inside the Made Digital site. */
export const conceptMeta = {
  studio: 'Made Digital',
  studioHref: '/',
  caseStudyHref: '/work/autohaus-cape-town',
  label: 'Website concept by Made Digital',
}

/**
 * Display typefaces for this concept only, loaded on mount by the page.
 *
 * DM Sans carries the headlines — geometric, even and mechanical, nothing like
 * Inter, Fraunces, Archivo or Bricolage Grotesque. IBM Plex Mono sets the
 * technical labels, indices and readouts; the mono is what makes this concept
 * read as a workshop rather than a marketing site, and no other concept in the
 * portfolio uses a monospace at all.
 */
export const fontHref =
  'https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400..900&family=IBM+Plex+Mono:wght@400;500;600&display=swap'
