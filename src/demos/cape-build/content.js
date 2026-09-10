/**
 * All copy for the Cape Build Co. concept.
 *
 * No years of trading, no certifications, no awards, no project counts — the
 * business is fictional, and everything here stays inside what a real builder
 * could honestly say on day one.
 */
import { images } from './config.js'

export const navLinks = [
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

/** Runs vertically up the right edge of the hero. */
export const heroRail = ['Residential', 'Renovations', 'Extensions']

export const principles = [
  {
    number: '01',
    title: 'Plan',
    body: 'Scope, sequence and cost agreed before anything is lifted.',
  },
  {
    number: '02',
    title: 'Build',
    body: 'A managed site, a known programme, and one person to ask.',
  },
  {
    number: '03',
    title: 'Deliver',
    body: 'Finished properly, cleared down, and handed over complete.',
  },
]

/**
 * The three showcase projects.
 *
 * `layout` decides how each one is composed — the showcase deliberately does
 * not repeat a single template. See the CSS under "Selected work".
 */
export const projects = [
  {
    id: 'sea-point',
    index: 'Project 01',
    name: 'Sea Point Residence',
    kind: 'Full residential renovation',
    year: '2026',
    scope: 'Whole-house renovation, new glazing, terrace and pool surround',
    body: 'A tired coastal house taken back to structure and rebuilt around the view, with the living spaces opened to the terrace and the whole envelope brought up to standard.',
    image: images.projects.seaPoint,
    layout: 'overlay',
  },
  {
    id: 'constantia',
    index: 'Project 02',
    name: 'Constantia Extension',
    kind: 'Residential extension',
    year: '2025',
    scope: 'Ground-floor extension, structural alterations, garden reinstatement',
    body: 'A single-storey extension added to the rear of a family home, set low so the existing roofline still reads, and finished to open directly onto the lawn.',
    image: images.projects.constantia,
    layout: 'panel-left',
  },
  {
    id: 'claremont',
    index: 'Project 03',
    name: 'Claremont Home',
    kind: 'Kitchen & interior renovation',
    year: '2025',
    scope: 'Kitchen, dining and circulation; joinery, services and finishes',
    body: 'The back of the house reworked into one room — kitchen, dining and a run of joinery — with the services rerouted and the floor levelled through.',
    image: images.projects.claremont,
    layout: 'panel-right',
  },
]

export const services = [
  {
    id: 'new-homes',
    number: '01',
    title: 'New Homes',
    body: 'Ground-up residential builds, from foundations to final handover.',
    image: images.services['new-homes'],
  },
  {
    id: 'renovations',
    number: '02',
    title: 'Renovations',
    body: 'Reworking an existing home, whether one room or the whole plan.',
    image: images.services.renovations,
  },
  {
    id: 'extensions',
    number: '03',
    title: 'Extensions',
    body: 'Adding space that reads as part of the house, not bolted onto it.',
    image: images.services.extensions,
  },
  {
    id: 'kitchens',
    number: '04',
    title: 'Kitchens',
    body: 'Structure, services, joinery and finishes handled as one job.',
    image: images.services.kitchens,
  },
  {
    id: 'bathrooms',
    number: '05',
    title: 'Bathrooms',
    body: 'Waterproofing, plumbing and tiling done in the right order.',
    image: images.services.bathrooms,
  },
  {
    id: 'alterations',
    number: '06',
    title: 'Alterations',
    body: 'Structural changes to how a home works — walls, openings, levels.',
    image: images.services.alterations,
  },
]

export const process = [
  {
    number: '01',
    title: 'Conversation',
    body: 'We understand the property, your needs and what you want to achieve.',
  },
  {
    number: '02',
    title: 'Planning',
    body: 'We establish the scope, requirements and project direction.',
  },
  {
    number: '03',
    title: 'Build',
    body: 'Construction progresses with clear communication throughout.',
  },
  {
    number: '04',
    title: 'Handover',
    body: 'The finished space is completed and ready for you to enjoy.',
  },
]

export const reasons = [
  {
    title: 'Clear communication',
    body: 'No guessing where your project stands.',
  },
  {
    title: 'Quality workmanship',
    body: 'Careful attention to the details that matter.',
  },
  {
    title: 'Thoughtful planning',
    body: 'Good projects begin with good preparation.',
  },
  {
    title: 'Respect for your home',
    body: 'A professional approach from site setup to final handover.',
  },
]

export const faqs = [
  {
    q: 'What types of projects do you take on?',
    a: 'Residential construction, renovations, extensions and selected building projects. If a job is outside what we do well, we will say so rather than take it on.',
  },
  {
    q: 'Can you help with renovations?',
    a: 'Yes. Renovation work can range from individual spaces — a kitchen or a bathroom — to larger home transformations that touch the whole plan.',
  },
  {
    q: 'Do you work on extensions?',
    a: 'Yes, residential extensions can be included in the project scope. We will talk through what the existing structure allows before anything is committed.',
  },
  {
    q: 'How do I start a project?',
    a: 'Send us some information about the property and what you would like to change. A few photographs and a rough idea of scope is enough to begin the conversation.',
  },
  {
    q: 'Do you work throughout Cape Town?',
    a: 'We work across Cape Town and the surrounding areas. If you are not sure whether your property falls within that, ask and we will tell you straight.',
  },
  {
    q: 'How is a project priced?',
    a: 'Scope first, then price. We would rather spend time establishing exactly what a project involves than issue a number that changes later.',
  },
]

/** Options for the enquiry form's project-type select. */
export const projectTypes = [
  { value: '', label: 'Select a project type' },
  { value: 'New home', label: 'New home' },
  { value: 'Renovation', label: 'Renovation' },
  { value: 'Extension', label: 'Extension' },
  { value: 'Kitchen', label: 'Kitchen' },
  { value: 'Bathroom', label: 'Bathroom' },
  { value: 'Alteration', label: 'Alteration' },
  { value: 'Other', label: 'Other' },
]

export const projectScopes = [
  { value: '', label: 'Select a rough scope' },
  { value: 'Single room', label: 'A single room' },
  { value: 'Several rooms', label: 'Several rooms' },
  { value: 'Whole house', label: 'The whole house' },
  { value: 'New build', label: 'A new build' },
  { value: 'Not sure yet', label: 'Not sure yet' },
]
