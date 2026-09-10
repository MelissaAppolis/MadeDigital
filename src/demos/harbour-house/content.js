/**
 * All copy for the Harbour House concept.
 *
 * The guesthouse is fictional and brand new, so nothing here claims star
 * ratings, awards, years of trading, guest numbers, verified reviews or
 * partnerships. Everything stays inside what a real small guesthouse could
 * honestly say on its opening day.
 */
import { images } from './config.js'

export const navLinks = [
  { label: 'Stay', href: '#stay' },
  { label: 'Rooms', href: '#rooms' },
  { label: 'Experience', href: '#experience' },
  { label: 'Cape Town', href: '#cape-town' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

/* ---- Rooms ----------------------------------------------------------------
 * Three rooms, each rendered differently on the page — the layout variant is
 * named here so the section reads as three considered compositions rather
 * than three copies of one card.
 */
export const rooms = [
  {
    id: 'harbour',
    index: '01',
    name: 'The Harbour Room',
    short: 'A bright, comfortable room designed for relaxed city stays.',
    sleeps: 'Sleeps 2',
    layout: 'wide',
    lede: 'A calm, light-filled room with natural textures and everything you need for an easy Cape Town stay.',
    body: 'Morning light, a proper desk-free corner to sit with a coffee, and a bed made up with soft linen. It is the room to take if you plan to be out most of the day and want somewhere restful to come back to.',
    details: [
      { label: 'Bed', value: 'One queen bed' },
      { label: 'Sleeps', value: 'Two guests' },
      { label: 'Bathroom', value: 'Private en-suite with shower' },
      { label: 'Outlook', value: 'Towards the street and the mountain beyond' },
    ],
    amenities: [
      'Air conditioning',
      'Free Wi-Fi',
      'Breakfast available',
      'Fresh linen and towels',
      'Tea and coffee in the room',
      'Safe and hanging space',
    ],
    images: images.rooms.harbour,
  },
  {
    id: 'garden',
    index: '02',
    name: 'The Garden Room',
    short: 'A peaceful room opening towards the guesthouse garden.',
    sleeps: 'Sleeps 2',
    layout: 'offset',
    lede: 'A quieter room at the back of the house, with doors that open towards the garden.',
    body: 'Set away from the street, this one is for light sleepers and slow mornings. Open the doors and you get the garden — greenery, birds, and the particular quiet that comes with being one room back from everything.',
    details: [
      { label: 'Bed', value: 'One queen bed' },
      { label: 'Sleeps', value: 'Two guests' },
      { label: 'Bathroom', value: 'Private en-suite with shower' },
      { label: 'Outlook', value: 'Doors opening onto the garden' },
    ],
    amenities: [
      'Air conditioning',
      'Free Wi-Fi',
      'Breakfast available',
      'Garden access',
      'Tea and coffee in the room',
      'Fresh linen and towels',
    ],
    images: images.rooms.garden,
  },
  {
    id: 'suite',
    index: '03',
    name: 'The House Suite',
    short: 'A more spacious stay with additional living space.',
    sleeps: 'Sleeps 2–3',
    layout: 'full',
    lede: 'The largest room in the house, with a separate sitting area and room to spread out.',
    body: 'Best for longer stays, or for anyone who wants somewhere to sit that is not the end of the bed. Tall original windows, a sofa that takes a third guest at a push, and enough space to unpack properly.',
    details: [
      { label: 'Bed', value: 'One king bed, plus a sofa bed' },
      { label: 'Sleeps', value: 'Two guests, three at a squeeze' },
      { label: 'Bathroom', value: 'Private en-suite with bath and shower' },
      { label: 'Outlook', value: 'Tall windows over the neighbourhood' },
    ],
    amenities: [
      'Separate sitting area',
      'Air conditioning',
      'Free Wi-Fi',
      'Breakfast available',
      'Tea and coffee in the room',
      'Space for a longer stay',
    ],
    images: images.rooms.suite,
  },
]

export const roomById = (id) => rooms.find((room) => room.id === id)

/* ---- Experience ----------------------------------------------------------- */

export const experiences = [
  {
    id: 'mountain',
    label: 'Mountain',
    line: 'Table Mountain and the surrounding trails.',
    body: 'The cableway, Platteklip Gorge, or the gentler contour paths around the back. Start early — the mountain makes its own weather.',
    image: images.experience.mountain,
  },
  {
    id: 'ocean',
    label: 'Ocean',
    line: 'Camps Bay, Clifton and the Atlantic coast.',
    body: 'White sand, cold water and one of the better sunset drives anywhere. Chapman’s Peak if you have an afternoon to give it.',
    image: images.experience.ocean,
  },
  {
    id: 'city',
    label: 'City',
    line: 'Restaurants, galleries, markets and neighbourhoods.',
    body: 'Bo-Kaap, the East City, the Company’s Garden and the weekend markets. Most of it is walkable once you are in.',
    image: images.experience.city,
  },
  {
    id: 'wine',
    label: 'Wine',
    line: 'The Cape Winelands within easy reach.',
    body: 'Constantia is on the doorstep. Stellenbosch and Franschhoek make a comfortable day out if you would rather go further.',
    image: images.experience.wine,
  },
  {
    id: 'food',
    label: 'Food',
    line: 'From neighbourhood cafés to destination restaurants.',
    body: 'Breakfast around the corner, something more considered in the evening. Tell us what you feel like and we will point you at it.',
    image: images.experience.food,
  },
]

/* ---- Hospitality ---------------------------------------------------------- */

export const littleThings = [
  {
    id: 'morning',
    label: 'A good morning',
    body: 'Fresh breakfast and good coffee to start the day.',
    image: images.little.morning,
  },
  {
    id: 'welcome',
    label: 'A warm welcome',
    body: 'Personal service without being intrusive.',
    image: images.little.welcome,
  },
  {
    id: 'return',
    label: 'A quiet return',
    body: 'A comfortable place to unwind after exploring the city.',
    image: images.little.return,
  },
  {
    id: 'local',
    label: 'Local knowledge',
    body: 'Recommendations from people who know Cape Town.',
    image: images.little.local,
  },
]

export const breakfastItems = [
  'Fresh coffee',
  'Seasonal fruit',
  'Warm pastries',
  'Simple breakfast favourites',
  'Local ingredients where possible',
]

/* ---- Cape Town -------------------------------------------------------------
 * Distances are illustrative, and labelled as such on the page. A fictional
 * guesthouse has no address to measure from, so nothing here is presented as
 * a real travel time.
 */
export const destinations = [
  { name: 'Cape Town City Bowl', note: 'Restaurants, galleries and the CBD' },
  { name: 'Table Mountain', note: 'Cableway and the contour paths' },
  { name: 'V&A Waterfront', note: 'Harbour, shops and the island ferry' },
  { name: 'Bo-Kaap', note: 'Colour, history and a short walk' },
  { name: 'Camps Bay', note: 'Beach, sunset and the strip' },
  { name: 'Clifton', note: 'Four beaches, sheltered from the wind' },
  { name: 'Kirstenbosch', note: 'Botanical gardens under the mountain' },
  { name: 'Constantia', note: 'The closest of the wine valleys' },
]

/* ---- Guest feedback --------------------------------------------------------
 * WRITTEN EXAMPLES, not reviews. Harbour House does not exist, so it has no
 * guests and no ratings. These show the kind of feedback a guesthouse like
 * this would aim for, and the page says so in as many words. No star ratings,
 * no review-platform badges, no invented named individuals.
 */
export const feedback = [
  {
    quote:
      'Beautifully calm, incredibly comfortable and perfectly placed for exploring Cape Town.',
    who: 'A couple from London',
  },
  {
    quote: 'The kind of guesthouse where you immediately feel at home.',
    who: 'A guest from Johannesburg',
  },
  {
    quote: 'Everything felt thoughtful without ever feeling overdone.',
    who: 'A traveller from Melbourne',
  },
]

/* ---- FAQ ------------------------------------------------------------------ */

export const faqs = [
  {
    q: 'What time is check-in?',
    a: 'Check-in is from 14:00 and check-out is by 10:00. If your flight lands early or leaves late, tell us when you enquire and we will do what we can with luggage and timing.',
  },
  {
    q: 'Is breakfast available?',
    a: 'Yes. Breakfast is served in the morning and can be added to your stay when you book. Let us know about any dietary requirements and we will work around them.',
  },
  {
    q: 'Do you offer airport transfers?',
    a: 'We can arrange a transfer with a local driver on request. Send us your flight details with your enquiry and we will confirm what it costs before anything is booked.',
  },
  {
    q: 'Is parking available?',
    a: 'Yes, there is parking for guests. Mention it when you enquire so we can make sure there is space for the dates you are coming.',
  },
  {
    q: 'Can you recommend Cape Town activities?',
    a: 'Gladly — it is one of the better parts of the job. Tell us what you enjoy and roughly how long you have, and we will put together a short list rather than hand you a stack of brochures.',
  },
  {
    q: 'How do I make a booking?',
    a: 'Send an enquiry with your dates and the number of guests, or message us on WhatsApp. We will confirm availability and what it costs, and take it from there.',
  },
]

/* ---- Booking bar ---------------------------------------------------------- */

export const guestOptions = [
  { value: '1', label: '1 guest' },
  { value: '2', label: '2 guests' },
  { value: '3', label: '3 guests' },
  { value: '4', label: '4 guests' },
  { value: '5+', label: '5 or more' },
]

export const roomOptions = [
  { value: '', label: 'Any room' },
  ...rooms.map((room) => ({ value: room.id, label: room.name })),
  { value: 'unsure', label: 'Not sure yet' },
]
