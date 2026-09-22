/**
 * The portfolio.
 *
 * Everything the Work grid, the homepage showcase and the project detail pages
 * render comes from this one array. To add a project, append an object. To
 * swap a placeholder for a real screenshot, change `desktop` / `mobile` to the
 * new file path — no component needs editing.
 *
 * Fields
 * ------
 * slug         URL segment: /work/<slug>. Must be unique.
 * title        Business or brand name.
 * category     Industry label, used for the filter chips on /work.
 * type         'Concept' | 'Client'  — drives the badge. Be honest here:
 *              'Concept' means Made Digital designed it as a demo, not for a
 *              paying client. Only use 'Client' for real, permitted work.
 * typeLabel    Optional override for the badge text.
 * description  One line, shown on the card.
 * summary      Longer paragraph, shown on the detail page.
 * desktop      Path to the desktop screenshot (public/ is the web root).
 * mobile       Path to the mobile screenshot. Optional.
 * accent       Hex colour pulled from the mockup, used for subtle card accents.
 * goals        Bullet list shown on the detail page.
 * features     What the concept includes.
 * tags         Short labels for the card, e.g. ['Plumbing', 'Lead Generation'].
 * demoPath     Internal route to a browsable build of the concept, e.g.
 *              '/work/<slug>/live'. Omitted = the "open live" buttons are
 *              hidden and the project is presented from screenshots alone.
 *              Add the matching route in src/App.jsx when you add one.
 * liveUrl      External link to a live build, if it is hosted elsewhere.
 * shots        Optional extra screenshots for the detail page:
 *              [{ src, alt, label }]
 * featured     Shown in the homepage showcase.
 */

export const projects = [
  {
    slug: 'cape-town-plumbing-co',
    title: 'Cape Town Plumbing Co.',
    category: 'Plumbing',
    type: 'Concept',
    description:
      'A conversion-focused website concept designed for a Cape Town plumbing business, with a strong emphasis on trust, mobile usability and WhatsApp enquiries.',
    summary:
      'Most plumbing enquiries start with someone standing over a leak, phone in hand. This concept puts the call and WhatsApp buttons within thumb reach on every screen, states the service areas plainly, and answers the two questions people actually ask first: do you cover my suburb, and how quickly can you come out.',
    desktop: '/assets/projects/cape-town-plumbing-co/desktop.jpg',
    mobile: '/assets/projects/cape-town-plumbing-co/mobile.jpg',
    accent: '#11565C',
    tags: ['Plumbing', 'Local Business', 'Lead Generation'],
    demoPath: '/work/cape-town-plumbing-co/live',
    featured: true,
    goals: [
      'Turn an urgent search into a phone call within seconds',
      'Make service areas and call-out times obvious',
      'Build trust for a trade where reputation is everything',
    ],
    features: [
      'WhatsApp on the nav, the hero, the emergency band and the form',
      'Floating WhatsApp button on phones',
      'Six services, each answering a real search',
      'Emergency section with call and WhatsApp side by side',
      'Quote form asking only what is needed to price a job',
      'Service areas described honestly, without overclaiming',
    ],
    shots: [
      {
        src: '/assets/projects/cape-town-plumbing-co/shot-services.jpg',
        alt: 'The services grid from the Cape Town Plumbing Co. concept, showing six plumbing services with icons',
        label: 'Services',
      },
      {
        src: '/assets/projects/cape-town-plumbing-co/shot-emergency.jpg',
        alt: 'The emergency call-to-action band, with WhatsApp and call buttons side by side',
        label: 'Emergency CTA',
      },
      {
        src: '/assets/projects/cape-town-plumbing-co/shot-contact.jpg',
        alt: 'The contact section, with business details beside a quote request form',
        label: 'Quote form',
      },
    ],
  },
  {
    slug: 'clean-and-co',
    title: 'Clean & Co.',
    category: 'Cleaning',
    type: 'Concept',
    description:
      'A fresh, conversion-focused website concept designed to make booking professional cleaning services simple.',
    summary:
      'Cleaning is bought on trust and convenience, so this concept removes every reason to hesitate. A selector at the top of the page asks one question — what needs cleaning? — and everything after it answers that choice: a ruled service menu instead of a card grid, before and after photographs set side by side rather than behind a slider, and a quote form built from taps rather than dropdowns. Deep eucalyptus on warm cream, generous rounding and large friendly headlines keep it premium without ever looking like a template.',
    desktop: '/assets/projects/clean-and-co/desktop.jpg',
    mobile: '/assets/projects/clean-and-co/mobile.jpg',
    accent: '#1D3C33',
    tags: ['Cleaning', 'Local Business', 'Lead Generation'],
    demoPath: '/work/clean-and-co/live',
    featured: true,
    goals: [
      'Turn a vague "we need a cleaner" into a specific enquiry',
      'Show the standard of work before anyone has to ask',
      'Serve homeowners and business customers from one page',
    ],
    features: [
      'Quick service selector — home, office, move, Airbnb or after building',
      'Six services as a ruled menu, each preselecting the quote form',
      'Before and after examples as static pairs, never a slider',
      'Four-step booking journey shown as a stepped progression',
      'Quote form with property type and frequency as tappable chips',
      'WhatsApp on the nav, the hero, the form, the footer and a phone button',
    ],
    shots: [
      {
        src: '/assets/projects/clean-and-co/shot-selector.jpg',
        alt: 'The quick service selector from the Clean & Co. concept, with five options and a photograph of the selected one',
        label: 'Service selector',
      },
      {
        src: '/assets/projects/clean-and-co/shot-before-after.jpg',
        alt: 'The before and after section, showing paired photographs of a kitchen, bathroom, living room and office',
        label: 'Before & after',
      },
      {
        src: '/assets/projects/clean-and-co/shot-quote.jpg',
        alt: 'The quote section, with contact details beside a form using chips for property type and frequency',
        label: 'Quote form',
      },
    ],
  },
  {
    slug: 'studio-olive-beauty',
    title: 'Studio Olive Beauty',
    category: 'Beauty & Wellness',
    type: 'Concept',
    description:
      'A premium, editorial-inspired website concept for a Cape Town beauty studio focused on bookings and customer experience.',
    summary:
      'A beauty studio sells an atmosphere before it sells a treatment. This concept leans on generous whitespace, serif typography and arch-topped imagery to set the tone, then keeps the practical things — the treatment menu, the prices, the booking button — one tap away rather than buried. Every route through the page ends at the same place: a booking.',
    desktop: '/assets/projects/studio-olive-beauty/desktop.jpg',
    mobile: '/assets/projects/studio-olive-beauty/mobile.jpg',
    accent: '#66754F',
    tags: ['Beauty & Wellness', 'Bookings', 'Editorial'],
    demoPath: '/work/studio-olive-beauty/live',
    featured: true,
    goals: [
      'Communicate a premium, calm studio atmosphere in seconds',
      'Make the treatment menu, durations and prices easy to scan',
      'Turn browsing into a booking, not a phone call during working hours',
    ],
    features: [
      'Editorial treatment menu with durations, prices and tabs',
      'Book straight from any treatment, prefilled into the form',
      'Masonry gallery with a keyboard-accessible lightbox',
      'Sticky booking bar on phones',
      'WhatsApp on the nav, the band, the form and the footer',
      'Booking form with date and time preferences',
    ],
    shots: [
      {
        src: '/assets/projects/studio-olive-beauty/shot-treatments.jpg',
        alt: 'The treatment menu from the Studio Olive concept, showing durations and prices against leader dots',
        label: 'Treatment menu',
      },
      {
        src: '/assets/projects/studio-olive-beauty/shot-gallery.jpg',
        alt: 'The studio gallery laid out as a masonry grid of images',
        label: 'Gallery',
      },
      {
        src: '/assets/projects/studio-olive-beauty/shot-contact.jpg',
        alt: 'The booking section, with studio details beside an appointment request form',
        label: 'Booking',
      },
    ],
  },
  {
    slug: 'cape-build-co',
    title: 'Cape Build Co.',
    category: 'Construction & Renovation',
    type: 'Concept',
    description:
      'Bold architectural website concept designed to showcase residential projects, communicate services and generate project enquiries.',
    summary:
      'Building work is bought on evidence, so this concept is built around the photographs. The showcase gives each project a full screen and a different composition — one overlaid on the image, two set against a dark panel that runs past the picture edge — and the services are a full-height list rather than a grid of cards. Square corners, hairline rules and headings set wide on Archivo’s width axis do the rest: it reads as an architecture practice, not a trade directory.',
    desktop: '/assets/projects/cape-build-co/desktop.jpg',
    mobile: '/assets/projects/cape-build-co/mobile.jpg',
    accent: '#4F5540',
    tags: ['Construction', 'Renovation', 'Lead Generation'],
    demoPath: '/work/cape-build-co/live',
    featured: true,
    goals: [
      'Let the photography carry the credibility',
      'Make the scale and type of work obvious in seconds',
      'Turn a homeowner with a vague plan into a detailed enquiry',
    ],
    features: [
      'Full-screen static hero with the content on the bottom edge',
      'Three projects, three different compositions',
      'Service list with a static image plate, an accordion on phones',
      'Ruled horizontal process timeline that stacks on mobile',
      'Enquiry form asking for project type, location and scope',
      'Oversized numerals and hairline rules as the structural language',
    ],
    shots: [
      {
        src: '/assets/projects/cape-build-co/shot-projects.jpg',
        alt: 'The project showcase from the Cape Build Co. concept, with information laid over a full-width photograph',
        label: 'Selected work',
      },
      {
        src: '/assets/projects/cape-build-co/shot-services.jpg',
        alt: 'The services list beside its static image plate',
        label: 'What we build',
      },
      {
        src: '/assets/projects/cape-build-co/shot-contact.jpg',
        alt: 'The enquiry section, with a dark details panel beside the project enquiry form',
        label: 'Enquiry',
      },
    ],
  },
  {
    slug: 'autohaus-cape-town',
    title: 'AutoHaus Cape Town',
    category: 'Automotive',
    type: 'Concept',
    description:
      'A technical, conversion-focused website concept designed to make automotive services easier to understand and book.',
    summary:
      'People bring a car in because something is wrong and nobody has explained it to them. This concept is built around that: a service directory laid out like a workshop index, and a job card that answers the three questions a driver actually has — what gets checked, what is included, and is this the right service for me. It is the only concept in the portfolio that is dark by default, squared off at 4px, and set with a monospace carrying every index and readout, so it reads as an instrument rather than a brochure.',
    desktop: '/assets/projects/autohaus-cape-town/desktop.jpg',
    mobile: '/assets/projects/autohaus-cape-town/mobile.jpg',
    accent: '#2C5F8C',
    tags: ['Automotive', 'Local Business', 'Lead Generation'],
    demoPath: '/work/autohaus-cape-town/live',
    featured: true,
    goals: [
      'Turn a vague symptom into a specific, bookable service',
      'Explain the work before the customer has to ask',
      'Sell the high-value services, not just list them',
    ],
    features: [
      'Split hero — charcoal panel against a full-height workshop photograph',
      'Six-cell quick access strip that reveals a photograph on hover',
      'Ten services as a ruled index, with a job card for the selected one',
      'Diagnostics feature with a technical readout panel',
      'Pre-purchase inspection sold as its own service, with an inspection sheet',
      'Booking console with vehicle details, date and time preferences',
    ],
    shots: [
      {
        src: '/assets/projects/autohaus-cape-town/shot-services.jpg',
        alt: 'The service directory from the AutoHaus concept, showing ten services as a ruled index above a job card',
        label: 'Service directory',
      },
      {
        src: '/assets/projects/autohaus-cape-town/shot-diagnostics.jpg',
        alt: 'The diagnostics section, with two static photographs either side of a technical readout panel',
        label: 'Diagnostics',
      },
      {
        src: '/assets/projects/autohaus-cape-town/shot-booking.jpg',
        alt: 'The booking console, with the request form above a bar of contact details',
        label: 'Booking',
      },
    ],
  },
  {
    slug: 'harbour-house',
    title: 'Harbour House',
    category: 'Hospitality',
    type: 'Concept',
    description:
      'A refined boutique hospitality website concept for a Cape Town guesthouse, built around direct enquiries rather than platform commission.',
    summary:
      'Guests book a guesthouse on photography, location and the feeling that someone is expecting them. This concept is built around all three: the hero photograph is inset into the page rather than run full bleed, the three rooms are three different compositions instead of three cards, and the enquiry carries the dates the visitor picked in the hero all the way down the page. It is the only concept in the portfolio set in a serif, and the only one where the ground is warm ivory throughout.',
    desktop: '/assets/projects/harbour-house/desktop.jpg',
    mobile: '/assets/projects/harbour-house/mobile.jpg',
    accent: '#4D7268',
    tags: ['Hospitality', 'Direct Bookings', 'Photography'],
    demoPath: '/work/harbour-house/live',
    featured: true,
    goals: [
      'Let photography carry the booking decision',
      'Turn a browse into a dated enquiry, not a dead end',
      'Reduce reliance on booking platform commission',
    ],
    features: [
      'Inset hero photograph with a booking panel across its lower edge',
      'Three rooms, each given its own composition rather than a shared card',
      'Room detail in an accessible dialog, with focus handling and Escape',
      'A scroll rail of five Cape Town experiences, driven by the guest',
      'A stylised neighbourhood plan instead of an embedded map',
      'Dates chosen in the hero arrive prefilled in the enquiry form',
    ],
    shots: [
      {
        src: '/assets/projects/harbour-house/shot-rooms.jpg',
        alt: 'The rooms section of the Harbour House concept, showing three rooms in three different compositions',
        label: 'Rooms',
      },
      {
        src: '/assets/projects/harbour-house/shot-experience.jpg',
        alt: 'The experience rail, with tall static photographs of Cape Town mountain, ocean and city',
        label: 'Experience',
      },
      {
        src: '/assets/projects/harbour-house/shot-contact.jpg',
        alt: 'The enquiry section, with contact details beside a dated enquiry form',
        label: 'Enquiry',
      },
    ],
  },
  {
    slug: 'kestrel-dermatology',
    title: 'Kestrel Dermatology',
    category: 'Medical',
    type: 'Concept',
    description:
      'A calm, clear website concept for a specialist dermatology practice, built to answer patients’ questions before they phone the rooms.',
    summary:
      'Patients choose a specialist carefully, and most of what they want to know is practical: can you help with my problem, do I need a referral, what will it cost and what happens at the visit. This concept answers each of those on the page — a condition finder that starts with a search box, a first-visit timeline, fees and medical aid in plain language, and an appointment request that asks nothing clinical. The photographs are framed as circles with a fine ring, like a view through a dermatoscope. The copy follows the HPCSA’s rules for medical advertising: no testimonials, no comparisons, no promised results.',
    desktop: '/assets/projects/kestrel-dermatology/desktop.jpg',
    mobile: '/assets/projects/kestrel-dermatology/mobile.jpg',
    accent: '#1B2238',
    tags: ['Medical', 'Specialist Practice', 'Appointments'],
    demoPath: '/work/kestrel-dermatology/live',
    featured: true,
    goals: [
      'Answer the questions reception hears every day, before the call',
      'Help a worried patient find their condition in seconds',
      'Stay within the HPCSA’s rules for medical advertising',
    ],
    features: [
      'Condition finder with search, type filters and a note card for each condition',
      '“Book about this” preselects the reason in the appointment form',
      'Skin check section with the ABCDE warning signs',
      'First-visit timeline and a “please bring” checklist',
      'Fees, medical aid and cancellations explained in plain language',
      'Appointment request that asks for no medical details, with POPIA consent',
    ],
    shots: [
      {
        src: '/assets/projects/kestrel-dermatology/shot-conditions.jpg',
        alt: 'The condition finder from the Kestrel Dermatology concept, with a search box, a list of conditions and a note card',
        label: 'Condition finder',
      },
      {
        src: '/assets/projects/kestrel-dermatology/shot-skin-checks.jpg',
        alt: 'The skin checks section, with circular photographs beside the ABCDE warning signs',
        label: 'Skin checks',
      },
      {
        src: '/assets/projects/kestrel-dermatology/shot-appointment.jpg',
        alt: 'The appointment section, with consulting hours beside the appointment request form',
        label: 'Appointments',
      },
    ],
  },
]

export const projectBySlug = (slug) => projects.find((p) => p.slug === slug)

export const featuredProjects = projects.filter((p) => p.featured)

/** Industry filter options for /work, derived from the data above. */
export const categories = ['All', ...new Set(projects.map((p) => p.category))]

/**
 * Before / after placeholders for the revamp section. Replace these two paths
 * with screenshots of a real redesign once you have permission to show one.
 */
export const revamp = {
  before: {
    src: '/assets/revamp/before.svg',
    alt: 'Illustration of a dated, desktop-only website layout',
    label: 'Before',
    caption: 'Dated layout, hard to read on a phone, no clear next step.',
  },
  after: {
    src: '/assets/revamp/after.svg',
    mobile: '/assets/revamp/after-mobile.svg',
    alt: 'Illustration of the same website rebuilt with a modern layout',
    label: 'After',
    caption: 'Clear message, strong call-to-action, built mobile-first.',
  },
  placeholder: true,
}
