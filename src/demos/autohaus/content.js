/**
 * All copy for the AutoHaus Cape Town concept.
 *
 * No years of trading, no manufacturer approvals, no qualifications, no
 * awards, no staff counts, no certifications, no guarantees, no statistics.
 * The business is fictional, and everything here stays inside what a real
 * independent workshop could honestly say on day one.
 */
import { images } from './config.js'

export const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Workshop', href: '#workshop' },
  { label: 'Why AutoHaus', href: '#why' },
  { label: 'FAQs', href: '#faqs' },
  { label: 'Contact', href: '#booking' },
]

/** The strip along the bottom edge of the hero. */
export const heroStrip = [
  { index: '01', label: 'Servicing' },
  { index: '02', label: 'Diagnostics' },
  { index: '03', label: 'Repairs' },
]

/* ---- Services -------------------------------------------------------------
 * One list drives three things: the quick-access strip, the service directory
 * and the job card. `quick` marks the six that appear in the strip.
 */

export const services = [
  {
    id: 'service',
    number: '01',
    title: 'Service & Maintenance',
    short: 'Scheduled and interim servicing to keep a vehicle in good order.',
    quick: true,
    quickLabel: 'Service',
    lede: 'Routine servicing helps identify issues before they become expensive problems.',
    checks: [
      'Oil and filter condition',
      'Fluid levels and leaks',
      'Brake wear and operation',
      'Battery condition',
      'Tyres, lights and wipers',
    ],
    includes: [
      'Oil and filter replacement',
      'Fluid top-up where needed',
      'Full visual inspection',
      'Written summary of findings',
    ],
    who: 'Drivers keeping a vehicle on a regular service schedule, and anyone who has lost track of when it was last done.',
    image: images.services.service,
  },
  {
    id: 'diagnostics',
    number: '02',
    title: 'Computer Diagnostics',
    short: 'Reading what the vehicle is actually reporting before anything is replaced.',
    quick: true,
    quickLabel: 'Diagnostics',
    lede: 'A warning light is a starting point, not an answer. Diagnostics narrow it down.',
    checks: [
      'Stored and live fault codes',
      'Sensor data while running',
      'Battery and charging output',
      'Road test where useful',
    ],
    includes: [
      'Full system scan',
      'Interpretation of the results',
      'A plain-language explanation',
      'Recommended next step and cost',
    ],
    who: 'Anyone with a warning light, an intermittent fault, or a noise nobody has been able to place.',
    image: images.services.diagnostics,
  },
  {
    id: 'brakes',
    number: '03',
    title: 'Brakes',
    short: 'Inspection, pads, discs and fluid — measured rather than guessed at.',
    quick: true,
    quickLabel: 'Brakes',
    lede: 'Braking is measured, not estimated. We check what is left before recommending anything.',
    checks: [
      'Pad and disc thickness',
      'Brake fluid condition',
      'Calipers and slides',
      'Handbrake operation',
    ],
    includes: [
      'Measured wear report',
      'Pad or disc replacement as required',
      'Fluid change where needed',
      'Post-work road test',
    ],
    who: 'Drivers noticing a change in pedal feel, noise under braking, or approaching a service interval.',
    image: images.services.brakes,
  },
  {
    id: 'battery',
    number: '04',
    title: 'Battery & Electrical',
    short: 'Starting, charging and the electrical faults that hide behind them.',
    quick: true,
    quickLabel: 'Battery',
    lede: 'A car that will not start is not always a flat battery. Testing tells you which it is.',
    checks: [
      'Battery health and voltage',
      'Alternator charging output',
      'Starter draw',
      'Terminals, earths and wiring',
    ],
    includes: [
      'Battery and charging test',
      'Replacement where required',
      'Fault tracing on electrical issues',
      'An explanation of the cause',
    ],
    who: 'Slow starts, warning lights, flat batteries after standing, or electrical faults that come and go.',
    image: images.services.battery,
  },
  {
    id: 'aircon',
    number: '05',
    title: 'Air Conditioning',
    short: 'Regas, leak checks and cabin airflow.',
    quick: true,
    quickLabel: 'Air Con',
    lede: 'Air conditioning loses performance gradually, so most people only notice it in summer.',
    checks: [
      'Cooling performance',
      'System pressures',
      'Visible leaks and damage',
      'Cabin filter and airflow',
    ],
    includes: [
      'Performance test',
      'Regas where appropriate',
      'Leak check before refilling',
      'Cabin filter replacement if needed',
    ],
    who: 'Anyone whose air conditioning is blowing warm, smells stale, or has never been looked at.',
    image: images.services.aircon,
  },
  {
    id: 'suspension',
    number: '06',
    title: 'Suspension & Steering',
    short: 'Shocks, bushes, joints and the noises that come with them.',
    quick: true,
    quickLabel: 'Suspension',
    lede: 'Worn suspension changes how a car stops and steers long before it becomes obvious.',
    checks: [
      'Shocks and struts',
      'Bushes and mountings',
      'Ball joints and track rods',
      'Ride height and body roll',
    ],
    includes: [
      'Full suspension inspection',
      'Component replacement as required',
      'Alignment check afterwards',
      'Road test to confirm',
    ],
    who: 'Knocks over bumps, uneven tyre wear, vague steering, or a car that no longer feels planted.',
    image: images.services.suspension,
  },
  {
    id: 'engine',
    number: '07',
    title: 'Engine Repairs',
    short: 'Running faults, leaks and the noises that come before a bigger bill.',
    quick: false,
    quickLabel: 'Engine',
    lede: 'Most engine work is cheaper the earlier it is looked at, and a running fault is worth investigating before it strands you.',
    checks: [
      'How the engine starts and idles',
      'Oil and coolant leaks',
      'Belts, hoses and mountings',
      'Noises under load',
    ],
    includes: [
      'Diagnosis before any strip-down',
      'A written explanation of the cause',
      'Repair options and what each costs',
      'Road test once the work is done',
    ],
    who: 'Rough running, warning lights that keep returning, oil under the car, or a noise that has changed.',
    image: images.services.engine,
  },
  {
    id: 'tyres',
    number: '08',
    title: 'Tyres & Wheel Services',
    short: 'Fitting, balancing, rotation and puncture repairs where they are safe.',
    quick: false,
    quickLabel: 'Tyres',
    lede: 'Tyres are the only part of a car touching the road, so wear and pressure matter more than most people are told.',
    checks: [
      'Tread depth across each tyre',
      'Pressures and valve condition',
      'Uneven or one-sided wear',
      'Age and sidewall damage',
    ],
    includes: [
      'Fitting and balancing',
      'Rotation where it helps wear',
      'Puncture repair where it is safe to repair',
      'Honest advice on what can still run',
    ],
    who: 'Uneven wear, a slow puncture, a vibration through the steering, or tyres due for replacement.',
    image: images.services.tyres,
  },
  {
    id: 'alignment',
    number: '09',
    title: 'Wheel Alignment',
    short: 'Geometry set back to specification, then checked on the road.',
    quick: false,
    quickLabel: 'Alignment',
    lede: 'Alignment protects tyres and steering feel, and it moves every time a kerb is hit.',
    checks: [
      'Current geometry readings',
      'Tyre wear pattern',
      'Steering wheel position',
      'Suspension condition first',
    ],
    includes: [
      'Before and after readings',
      'Adjustment to specification',
      'Steering wheel centred',
      'Short road test',
    ],
    who: 'New tyres, uneven wear, pulling to one side, or an off-centre steering wheel.',
    image: images.services.alignment,
  },
  {
    id: 'inspection',
    number: '10',
    title: 'Pre-Purchase Inspection',
    short: 'An independent look at a vehicle before you commit to buying it.',
    quick: false,
    quickLabel: 'Inspection',
    lede: 'A professional inspection can help you understand the condition of a vehicle before making a major purchase.',
    checks: [
      'Bodywork, panels and glass',
      'Engine, gearbox and leaks',
      'Brakes, suspension and tyres',
      'Electrics and interior',
    ],
    includes: [
      'Structured inspection report',
      'Photographs of anything found',
      'A conversation about what it means',
      'No interest in the sale either way',
    ],
    who: 'Private buyers, dealership buyers, and anyone buying a vehicle they have not driven before.',
    image: images.services.inspection,
  },
]

export const quickServices = services.filter((service) => service.quick)

/* ---- Where the workshop draws from ----------------------------------------
 * Named areas rather than a pinned address: the business is fictional, so
 * there is no premises to point at, and a driver reads "is this near me?"
 * off the area name anyway.
 */
export const serviceAreas = [
  { index: '01', name: 'Southern Suburbs' },
  { index: '02', name: 'Northern Suburbs' },
  { index: '03', name: 'Atlantic Seaboard' },
  { index: '04', name: 'City Bowl' },
  { index: '05', name: 'Cape Town surrounds' },
]

/* ---- The workshop --------------------------------------------------------- */

export const principles = [
  {
    number: '01',
    title: 'Diagnose',
    body: 'Understand the problem. Test before anything is taken apart or ordered.',
  },
  {
    number: '02',
    title: 'Explain',
    body: 'Tell the customer what is happening, in language that makes sense.',
  },
  {
    number: '03',
    title: 'Repair',
    body: 'Fix what actually needs fixing, and say what can safely wait.',
  },
]

/** The mono readout inside the diagnostics panel. */
export const diagnosticsReadout = [
  { label: 'Fault codes', value: 'Stored + live' },
  { label: 'Sensor data', value: 'Read while running' },
  { label: 'Road test', value: 'Where it helps' },
  { label: 'Result', value: 'Explained plainly' },
]

/* ---- Vehicle types --------------------------------------------------------
 * Vehicle categories, not manufacturer claims. Nothing here says the workshop
 * is approved for, or specialises in, any particular brand.
 */
export const vehicleTypes = [
  { id: 'cars', label: 'Cars', body: 'Hatchbacks, sedans and estates.', image: images.vehicles.cars },
  { id: 'suvs', label: 'SUVs', body: 'Crossovers and larger family vehicles.', image: images.vehicles.suvs },
  { id: 'bakkies', label: 'Bakkies', body: 'Single and double cab.', image: images.vehicles.bakkies },
  {
    id: 'commercial',
    label: 'Light commercial',
    body: 'Panel vans and small work vehicles.',
    image: images.vehicles.commercial,
  },
]

/* ---- Why AutoHaus --------------------------------------------------------- */

export const statements = [
  {
    number: '01',
    title: 'Clear explanations.',
    body: 'What is wrong, why it is wrong, and what happens if it waits — before any work is agreed.',
  },
  {
    number: '02',
    title: 'Straightforward advice.',
    body: 'If something can safely wait, we will say so. If it cannot, we will explain why.',
  },
  {
    number: '03',
    title: 'Professional workmanship.',
    body: 'Work done properly the first time, checked before the vehicle goes back to you.',
  },
  {
    number: '04',
    title: 'Easy communication.',
    body: 'One place to book, one number to reach, and an answer you can actually act on.',
  },
]

/* ---- Pre-purchase inspection ---------------------------------------------- */

export const inspectionPoints = [
  'Exterior',
  'Engine',
  'Brakes',
  'Suspension',
  'Tyres',
  'Electrical',
  'Interior',
  'General condition',
]

/* ---- Example feedback -----------------------------------------------------
 * Illustrative examples written for the concept — not real reviews. The
 * section is labelled as such on the page, and no real person is named or
 * pictured.
 */
export const feedback = [
  {
    quote:
      'Clear explanation, professional service and no unnecessary fuss.',
    who: 'Driver — Cape Town',
  },
  {
    quote:
      'Finally a workshop where I understood what was actually wrong with my car.',
    who: 'Vehicle Owner — Cape Town',
  },
  {
    quote: 'Easy to book and great communication throughout.',
    who: 'Customer — Cape Town',
  },
]

/* ---- FAQ ------------------------------------------------------------------ */

export const faqs = [
  {
    q: 'What services do you offer?',
    a: 'Vehicle servicing, diagnostics, repairs and a range of common automotive services — brakes, batteries and electrical work, air conditioning, suspension and steering, engine repairs, tyres and wheel services, wheel alignment and pre-purchase inspections.',
  },
  {
    q: 'Can I book a diagnostic check?',
    a: 'Yes. A diagnostic check can be booked on its own, and the results are explained before any repair work is agreed.',
  },
  {
    q: 'Do I need to know what is wrong with my car?',
    a: 'No. Describe the symptoms — a noise, a light, a smell, a change in how it drives — and the workshop can advise on the next step from there.',
  },
  {
    q: 'Do you work on all vehicle brands?',
    a: 'Contact us with your vehicle details and we will confirm whether we can assist. Rather than claim to cover everything, we would prefer to tell you honestly before you book.',
  },
  {
    q: 'Can I book a pre-purchase inspection?',
    a: 'Yes. An independent inspection before you buy covers the exterior, engine, brakes, suspension, tyres, electrical systems, interior and general condition.',
  },
  {
    q: 'How do I make a booking?',
    a: 'Through the booking form on this page, by phone, or on WhatsApp — whichever is easiest.',
  },
]

/* ---- Booking form options ------------------------------------------------- */

export const serviceOptions = [
  { value: '', label: 'Select a service' },
  ...services.map((service) => ({ value: service.id, label: service.title })),
  { value: 'other', label: 'Other / not sure' },
]

export const timeOptions = [
  { value: '', label: 'No preference' },
  { value: 'morning', label: 'Morning drop-off' },
  { value: 'midday', label: 'Around midday' },
  { value: 'afternoon', label: 'Afternoon' },
]
