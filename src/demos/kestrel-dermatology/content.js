/**
 * Kestrel Dermatology — page copy.
 *
 * Written for a patient deciding whether to book, not for another doctor:
 * plain words, what happens at the visit, and nothing that promises a result.
 * Clinical descriptions are deliberately general. A real practice should have
 * its dermatologist approve every line before launch.
 */

export const navLinks = [
  { label: 'Conditions', href: '#conditions' },
  { label: 'Skin checks', href: '#skin-checks' },
  { label: 'Your visit', href: '#visit' },
  { label: 'Fees', href: '#fees' },
  { label: 'About', href: '#doctor' },
]

/** The four facts a new patient asks reception about most. */
export const quickFacts = [
  { title: 'New patients welcome', text: 'No waiting list to join. Request a time online.' },
  { title: 'Referral optional', text: 'Some medical aids need one. We check for you.' },
  { title: 'Medical aid & private', text: 'We submit claims directly to your scheme.' },
  { title: 'Adults & children', text: 'Including teenagers with acne or eczema.' },
]

/**
 * The appointment reasons offered in the form. Each condition below points at
 * one of these ids, so "Ask about this" can preselect the form.
 */
export const reasonOptions = [
  { id: 'skin-check', label: 'Skin or mole check' },
  { id: 'acne', label: 'Acne' },
  { id: 'eczema', label: 'Eczema or psoriasis' },
  { id: 'hair-nails', label: 'Hair or nails' },
  { id: 'procedure', label: 'Procedure' },
  { id: 'other', label: 'Something else' },
]

export const conditionGroups = ['All', 'Medical', 'Skin cancer', 'Procedures']

export const conditions = [
  {
    id: 'acne',
    name: 'Acne',
    group: 'Medical',
    reason: 'acne',
    summary:
      'Blocked pores, spots and cysts, most often on the face, chest and back. Common in teenagers, and in adults too.',
    visit:
      'We look at your skin, ask what you have tried, and agree a treatment plan that suits your skin type.',
    followUp: 'Usually a review after 8 to 12 weeks.',
  },
  {
    id: 'eczema',
    name: 'Eczema',
    group: 'Medical',
    reason: 'eczema',
    summary:
      'Dry, itchy, inflamed skin that flares and settles. It often starts in childhood.',
    visit:
      'We look for triggers, explain how to care for the skin barrier, and prescribe treatment for flares.',
    followUp: 'Reviews as needed, often every few months.',
  },
  {
    id: 'psoriasis',
    name: 'Psoriasis',
    group: 'Medical',
    reason: 'eczema',
    summary:
      'Raised, scaly patches, often on the elbows, knees and scalp. It is not contagious.',
    visit:
      'We confirm the diagnosis and talk through treatment options, from creams to other therapies.',
    followUp: 'Regular reviews to check how treatment is working.',
  },
  {
    id: 'rosacea',
    name: 'Rosacea',
    group: 'Medical',
    reason: 'other',
    summary:
      'Redness across the cheeks and nose, sometimes with bumps or visible blood vessels.',
    visit: 'We identify your triggers and recommend treatment and skin care.',
    followUp: 'Usually a review after 6 to 8 weeks.',
  },
  {
    id: 'pigmentation',
    name: 'Pigmentation & melasma',
    group: 'Medical',
    reason: 'other',
    summary:
      'Dark patches or uneven skin tone, often linked to sun, hormones or skin injury.',
    visit:
      'We find the likely cause and plan treatment suited to your skin tone, including sun protection.',
    followUp: 'Progress is checked over several months.',
  },
  {
    id: 'hair-loss',
    name: 'Hair loss',
    group: 'Medical',
    reason: 'hair-nails',
    summary: 'Thinning hair, bald patches or sudden shedding.',
    visit:
      'We examine the scalp, may request blood tests, and explain the likely cause before any treatment.',
    followUp: 'A review once test results are back.',
  },
  {
    id: 'nails',
    name: 'Nail conditions',
    group: 'Medical',
    reason: 'hair-nails',
    summary: 'Discoloured, thickened, painful or brittle nails.',
    visit: 'We examine the nails and may take a sample to confirm the cause.',
    followUp: 'Depends on the cause; we explain at the visit.',
  },
  {
    id: 'hives',
    name: 'Hives & rashes',
    group: 'Medical',
    reason: 'other',
    summary: 'Itchy welts or rashes that come and go, sometimes without an obvious cause.',
    visit: 'We take a careful history and may arrange tests to find a trigger.',
    followUp: 'A review once we have results.',
  },
  {
    id: 'mole-check',
    name: 'Mole & skin checks',
    group: 'Skin cancer',
    reason: 'skin-check',
    summary:
      'A head-to-toe examination of your skin, with magnified images of any spots that need a closer look.',
    visit:
      'Allow about 30 minutes. Anything that needs attention is explained before you leave.',
    followUp: 'We recommend how often to come back for your skin type.',
  },
  {
    id: 'sun-damage',
    name: 'Sun damage',
    group: 'Skin cancer',
    reason: 'skin-check',
    summary:
      'Rough, scaly patches on sun-exposed skin, which can sometimes develop into skin cancer.',
    visit: 'We examine the areas and treat patches in the rooms where appropriate.',
    followUp: 'Periodic skin checks.',
  },
  {
    id: 'skin-cancer',
    name: 'Skin cancer',
    group: 'Skin cancer',
    reason: 'skin-check',
    summary:
      'Diagnosis and treatment of spots confirmed or suspected to be skin cancer.',
    visit:
      'We explain the findings and the options, and plan removal or referral where needed.',
    followUp: 'Follow-up checks after treatment.',
  },
  {
    id: 'biopsy',
    name: 'Skin biopsy',
    group: 'Procedures',
    reason: 'procedure',
    summary:
      'A small sample of skin taken under local anaesthetic, to confirm a diagnosis.',
    visit: 'Done in the rooms and takes a few minutes. Results usually take about a week.',
    followUp: 'We phone you with the result.',
  },
  {
    id: 'excision',
    name: 'Mole & lesion removal',
    group: 'Procedures',
    reason: 'procedure',
    summary: 'Surgical removal of moles, cysts or lesions under local anaesthetic.',
    visit: 'Booked as a separate procedure appointment after a consultation.',
    followUp: 'Stitches are usually removed after 7 to 14 days.',
  },
  {
    id: 'cryotherapy',
    name: 'Cryotherapy',
    group: 'Procedures',
    reason: 'procedure',
    summary: 'Freezing treatment for warts, sun spots and some other growths.',
    visit: 'Quick, and often done at the same visit as your consultation.',
    followUp: 'Sometimes repeated after a few weeks.',
  },
  {
    id: 'patch-testing',
    name: 'Patch testing',
    group: 'Procedures',
    reason: 'procedure',
    summary:
      'Tests to find out whether a rash is caused by an allergy to something your skin touches.',
    visit: 'Patches are applied and read over three visits in one week.',
    followUp: 'We explain what to avoid once results are in.',
  },
]

/** The ABCDE warning signs — standard public skin-cancer guidance. */
export const abcde = [
  { letter: 'A', title: 'Asymmetry', text: 'One half does not match the other.' },
  { letter: 'B', title: 'Border', text: 'Edges that are ragged, notched or blurred.' },
  { letter: 'C', title: 'Colour', text: 'Several shades, or a colour that is uneven.' },
  { letter: 'D', title: 'Diameter', text: 'Larger than about 6 mm, a pencil eraser.' },
  { letter: 'E', title: 'Evolving', text: 'Any change in size, shape, colour or feel.' },
]

export const visitSteps = [
  {
    title: 'Before',
    text: 'Request a time online or call the rooms. We confirm your appointment and the consultation fee, and check whether your medical aid needs a referral.',
  },
  {
    title: 'On the day',
    text: 'Arrive ten minutes early to complete a short form. The consultation is unhurried, and you can ask as many questions as you need to.',
  },
  {
    title: 'After',
    text: 'You leave with a clear plan and any prescriptions. Biopsy results are phoned through, and your GP receives a report if you were referred.',
  },
]

export const bringList = [
  'Your ID and medical aid card',
  'A referral letter, if you have one',
  'A list of medicines and creams you use',
  'For skin checks: no make-up or nail polish',
]

export const fees = [
  {
    title: 'Consultation fee',
    text: 'Charged at the practice rate. Reception tells you the fee when you book, so there are no surprises.',
  },
  {
    title: 'Medical aid',
    text: 'We submit your claim directly. Depending on your plan, a co-payment may apply; we can check this beforehand.',
  },
  {
    title: 'Private patients',
    text: 'Pay by card or EFT on the day. We give you an itemised invoice with the codes you need to claim.',
  },
  {
    title: 'Procedures',
    text: 'Quoted in writing before the procedure date, so you can get authorisation from your scheme if needed.',
  },
  {
    title: 'Cancellations',
    text: 'Please give us 24 hours’ notice so another patient can have the time.',
  },
]

export const doctorInterests = [
  'Skin cancer screening',
  'Skin of colour',
  'Acne & eczema in teenagers',
  'Hair & scalp conditions',
]

export const doctorLanguages = ['English', 'isiXhosa', 'Afrikaans']

export const faqs = [
  {
    q: 'Do I need a referral from my GP?',
    a: 'Not to see us. Some medical aid plans only pay specialist claims with a referral, so reception checks your plan when you book.',
  },
  {
    q: 'How long is a first consultation?',
    a: 'About 20 to 30 minutes. A full-body skin check is booked as a 30-minute appointment.',
  },
  {
    q: 'Do you see children?',
    a: 'Yes. A parent or guardian must attend with anyone under 18.',
  },
  {
    q: 'Can I send photos before my appointment?',
    a: 'Please do not email photographs of your skin. We examine everything properly in the rooms, where your information is kept confidential.',
  },
  {
    q: 'What if I need an urgent appointment?',
    a: 'Call the rooms and we will do our best to see you. For a medical emergency, go to your nearest emergency unit.',
  },
]
