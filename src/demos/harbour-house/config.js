/**
 * Harbour House — a Made Digital website concept.
 *
 * FICTIONAL BUSINESS. There is no such guesthouse; this site exists to show
 * Cape Town hospitality businesses what Made Digital would build for them.
 *
 * Every number, address and image path lives in this one object. To repoint
 * the concept at a real guesthouse, change these values and nothing else — no
 * component contains a hard-coded number or file path.
 */
export const businessConfig = {
  name: 'Harbour House',
  logo: 'HARBOUR HOUSE',
  logoShort: 'HARBOUR',
  tagline: 'Stay close to the city. Feel away from it all.',
  supporting:
    'Boutique accommodation in Cape Town for travellers who want comfort, character and a great place to come home to.',

  // Demo placeholders — deliberately not dialable.
  phoneDisplay: '+27 00 000 0000',
  phoneHref: 'tel:+270000000000',
  email: 'stay@harbourhouse.example',

  // wa.me expects digits only, no plus sign or spaces.
  whatsappNumber: '270000000000',
  whatsappDisplay: '+27 00 000 0000',
  whatsappMessage: 'Hi Harbour House, I would like to enquire about a stay.',

  // No invented street address — the area only.
  address: 'Cape Town, Western Cape',
  region: 'Cape Town · Western Cape',
  country: 'Cape Town / South Africa',

  // Reception hours rather than an operational promise about the building.
  reception: [
    { label: 'Check-in from', value: '14:00' },
    { label: 'Check-out by', value: '10:00' },
  ],
}

export const whatsappHref = `https://wa.me/${businessConfig.whatsappNumber}?text=${encodeURIComponent(
  businessConfig.whatsappMessage
)}`

/** Where this concept sits inside the Made Digital site. */
export const conceptMeta = {
  studioHref: '/',
  caseStudyHref: '/work/harbour-house',
}

/**
 * Display serif + interface sans, loaded from the concept rather than from
 * index.html so only visitors who open Harbour House pay for them.
 */
export const fontHref =
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Jost:wght@300;400;500&display=swap'

/**
 * Every photograph on the concept, in one place.
 *
 * Photographs licensed from Pexels (free for commercial use, no attribution
 * required). Replace any of them with the guesthouse's own photography; that
 * is always better than stock. The crop each slot expects is noted against it.
 *
 * EVERY IMAGE ON THIS SITE IS STATIC. Nothing zooms, pans, parallaxes,
 * cross-fades or auto-advances. Hover changes a ground colour or the opacity
 * of an overlay — never a photograph.
 */
const base = '/assets/demos/harbour-house'

export const images = {
  hero: {
    src: `${base}/hero.jpg`, // 16:10
    alt: 'A guest room with a wooden bed, linen bedding, an oak chest of drawers and a brass reading light against a white brick wall',
  },
  intro: {
    src: `${base}/intro.jpg`, // 4:5
    alt: 'A quiet guest lounge with armchairs, a bookshelf and dried grasses beside a window',
  },
  bathroom: {
    src: `${base}/bathroom.jpg`, // 4:3
    alt: 'A bathroom with a stone bath, cedar-clad wall and doors opening onto a green courtyard',
  },
  breakfast: {
    src: `${base}/breakfast.jpg`, // 3:2
    alt: 'A stovetop coffee pot, terracotta cups, a pastry and tulips on a breakfast table against a stone wall',
  },
  cta: {
    src: `${base}/cta.jpg`, // ~21:8
    alt: "Lion's Head rising above Cape Town in soft morning light",
  },

  /** One main photograph and one detail for each room. */
  rooms: {
    harbour: {
      main: {
        src: `${base}/room-harbour.jpg`, // 3:2
        alt: 'A bright room with a white iron bedstead, soft linen and a tall window',
      },
      detail: {
        src: `${base}/room-harbour-detail.jpg`, // 1:1
        alt: 'Layered linen pillows in warm neutral tones catching the morning light',
      },
    },
    garden: {
      main: {
        src: `${base}/room-garden.jpg`,
        alt: 'A warm room with a panelled headboard and a curtained door opening towards the garden',
      },
      detail: {
        src: `${base}/room-garden-detail.jpg`,
        alt: 'A neatly made bed beside a wooden nightstand holding a potted plant',
      },
    },
    suite: {
      main: {
        src: `${base}/room-suite.jpg`,
        alt: 'A bed set against tall original windows, with soft daylight across white bedding',
      },
      detail: {
        src: `${base}/room-suite-detail.jpg`,
        alt: 'The suite sitting area, with a low sofa, cushions and botanical prints',
      },
    },
  },

  /** The five experience panels, keyed by id. */
  experience: {
    mountain: {
      src: `${base}/exp-mountain.jpg`, // 2:3
      alt: 'Table Mountain above Cape Town in late afternoon light',
    },
    ocean: {
      src: `${base}/exp-ocean.jpg`,
      alt: 'The Atlantic coastline curving past Clifton and Camps Bay',
    },
    city: {
      src: `${base}/exp-city.jpg`,
      alt: 'A row of brightly painted houses on a Bo-Kaap street',
    },
    wine: {
      src: `${base}/exp-wine.jpg`,
      alt: 'Vineyards running across the hills of the Cape Winelands',
    },
    food: {
      src: `${base}/exp-food.jpg`,
      alt: 'A restaurant courtyard set for dinner beneath vines and hanging lights',
    },
  },

  /** The four hospitality details. */
  little: {
    morning: {
      src: `${base}/little-morning.jpg`, // 1:1
      alt: 'A breakfast plate and coffee on a wooden table',
    },
    welcome: {
      src: `${base}/little-welcome.jpg`,
      alt: 'A soft sofa and cushions beside tall windows in a bright sitting room',
    },
    return: {
      src: `${base}/little-return.jpg`,
      alt: 'Two soft armchairs beside a window in a quiet corner',
    },
    local: {
      src: `${base}/little-local.jpg`,
      alt: 'Books and a small vase on a side table beside a sunlit window',
    },
  },

  /** The gallery, in the order it reads down the page. */
  gallery: [
    {
      src: `${base}/gallery-1.jpg`, // 4:5
      alt: 'White bedding and a framed print in a quiet, sunlit room',
    },
    {
      src: `${base}/gallery-2.jpg`, // 3:2
      alt: 'The Sea Point shoreline at dusk, with the city behind it',
    },
    {
      src: `${base}/gallery-3.jpg`, // 4:5
      alt: 'Coffee, a croissant and flowers on a small café table',
    },
  ],
}
