/**
 * Clean & Co. — a Made Digital website concept.
 *
 * FICTIONAL BUSINESS. There is no such company; this site exists to show
 * cleaning companies what Made Digital would build for them.
 *
 * Every phone number, handle and image path the concept uses lives in this one
 * object. To repoint the concept at a real business, change these values and
 * nothing else — no component contains a hard-coded number or file path.
 */
export const businessConfig = {
  name: 'Clean & Co.',
  shortName: 'Clean & Co.',
  logo: 'CLEAN & CO.',
  tagline: 'A cleaner space. A better day.',
  supporting:
    'Professional residential and commercial cleaning services for homes, offices and spaces across Cape Town.',

  // Demo placeholders — deliberately not dialable.
  phoneDisplay: '+27 00 000 0000',
  phoneHref: 'tel:+270000000000',
  email: 'hello@cleanandco.example',

  // wa.me expects digits only, no plus sign or spaces.
  whatsappNumber: '270000000000',
  whatsappDisplay: '+27 00 000 0000',
  whatsappMessage: 'Hi Clean & Co., I would like a cleaning quote.',

  // Fictional, so it is shown as a handle rather than linked anywhere.
  instagram: '@cleanandco.demo',

  area: 'Cape Town',
  locationNote: 'Cape Town and surrounding areas',

  hours: [
    { days: 'Monday – Friday', time: '07:00 – 17:00' },
    { days: 'Saturday', time: '08:00 – 13:00' },
  ],
}

/**
 * Every photograph on the concept, in one place.
 *
 * Photographs licensed from Pexels (free for commercial use, no attribution
 * required). Replace any of them with the company's own photography; that is
 * always better than stock. The crop each slot expects is noted against it.
 *
 * EVERY IMAGE ON THIS SITE IS STATIC. Nothing zooms, pans, parallaxes or
 * cross-fades. Hover changes an overlay or an opacity — never a photograph.
 */
const base = '/assets/demos/clean-and-co'

export const images = {
  hero: {
    src: `${base}/hero.jpg`, // 4:3
    alt: 'A bright, freshly cleaned open-plan living and dining room with plants and natural light',
  },
  heroDetail: {
    src: `${base}/hero-detail.jpg`, // 1:1
    alt: 'Hands washing plates at a kitchen sink',
  },
  residential: {
    src: `${base}/residential.jpg`, // 4:5
    alt: 'A cream sofa and side table in a calm, tidy living room with sheer curtains',
  },
  business: {
    src: `${base}/business.jpg`, // 16:9
    alt: 'A bright open-plan office with pale desks, timber posts and planting, freshly cleaned',
  },
  capeTown: {
    src: `${base}/capetown.jpg`, // 3:2
    alt: 'Homes set into a green Cape Town hillside below a rocky peak',
  },
  quote: {
    src: `${base}/quote.jpg`, // 4:3
    alt: 'A made bed beside a plant and a sunlit sheer curtain',
  },
  linen: {
    src: `${base}/detail-linen.jpg`, // 1:1
    alt: 'Freshly laundered white bed linen and pillows',
  },

  /** The quick service selector, keyed by option id. */
  selector: {
    home: {
      src: `${base}/sel-home.jpg`, // 4:3
      alt: 'A tidy apartment living room looking through to a kitchen',
    },
    office: {
      src: `${base}/sel-office.jpg`,
      alt: 'A long shared office desk with chairs, laptops and natural light',
    },
    move: {
      src: `${base}/sel-move.jpg`,
      alt: 'Packing boxes stacked by a window in an empty room',
    },
    airbnb: {
      src: `${base}/sel-airbnb.jpg`,
      alt: 'A guest bedroom with fresh linen, folded towels and a bedside lamp',
    },
    building: {
      src: `${base}/sel-build.jpg`,
      alt: 'A room under renovation with dust sheets and building residue',
    },
  },

  /** The service menu, keyed by service id. */
  services: {
    residential: {
      src: `${base}/svc-residential.jpg`, // 4:3
      alt: 'A cleaner mopping a kitchen floor beside a bucket',
    },
    deep: {
      src: `${base}/svc-deep.jpg`,
      alt: 'A gloved hand wiping down a white tiled wall with a sponge',
    },
    move: {
      src: `${base}/svc-move.jpg`,
      alt: 'Cardboard boxes stacked against a door in an empty hallway',
    },
    office: {
      src: `${base}/svc-office.jpg`,
      alt: 'A hand dusting a wooden office desk',
    },
    airbnb: {
      src: `${base}/svc-airbnb.jpg`,
      alt: 'Rolled towels set out on a freshly made guest bed',
    },
    renovation: {
      src: `${base}/svc-renovation.jpg`,
      alt: 'An industrial vacuum standing in a room after building work',
    },
  },

  /**
   * Before and after examples. Two static photographs side by side — there is
   * no slider, no handle and no motion of any kind.
   */
  comparisons: {
    kitchen: {
      before: {
        src: `${base}/ba-kitchen-before.jpg`, // 4:3
        alt: 'A kitchen counter crowded with bottles, jars and unwashed dishes',
      },
      after: {
        src: `${base}/ba-kitchen-after.jpg`,
        alt: 'The same style of kitchen counter cleared, wiped down and empty',
      },
    },
    bathroom: {
      before: {
        src: `${base}/ba-bathroom-before.jpg`,
        alt: 'A neglected bathroom basin with staining around the taps and drain',
      },
      after: {
        src: `${base}/ba-bathroom-after.jpg`,
        alt: 'A clean stone-tiled bathroom with a spotless basin and shower',
      },
    },
    living: {
      before: {
        src: `${base}/ba-living-before.jpg`,
        alt: 'A sofa buried under a pile of clothes and laundry',
      },
      after: {
        src: `${base}/ba-living-after.jpg`,
        alt: 'A clear, tidy living room with the sofa made up and surfaces empty',
      },
    },
    office: {
      before: {
        src: `${base}/ba-office-before.jpg`,
        alt: 'A desk covered in paper, stationery and crumpled notes',
      },
      after: {
        src: `${base}/ba-office-after.jpg`,
        alt: 'A cleared office desk with a laptop, glass and a plant by the window',
      },
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
    `Hi Clean & Co., I would like a quote for ${subject}.`
  )}`

/** Where this concept lives inside the Made Digital site. */
export const conceptMeta = {
  studio: 'Made Digital',
  studioHref: '/',
  caseStudyHref: '/work/clean-and-co',
  label: 'Website concept by Made Digital',
}

/**
 * Display typeface for this concept only, loaded on mount by the page.
 *
 * Bricolage Grotesque is a variable grotesque with flared, slightly humanist
 * terminals — confident set large, friendly rather than corporate, and nothing
 * like Inter, Fraunces or Archivo, so the four concepts never read as one
 * studio template.
 */
export const fontHref =
  'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,400..800&display=swap'
