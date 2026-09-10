/**
 * Generates the placeholder mockup screenshots used by the portfolio.
 *
 * These are stand-ins only. To use a real screenshot instead, drop your own
 * image into public/assets/projects/<slug>/ and point the project's `desktop`
 * / `mobile` path in src/data/projects.js at it. Nothing else needs to change.
 *
 *   npm run mockups
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const out = (p) => resolve(root, 'public/assets', p)

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const DISPLAY = 'Manrope, Inter, Segoe UI, Helvetica, Arial, sans-serif'
const BODY = 'Inter, Segoe UI, Helvetica, Arial, sans-serif'

/** A soft bar standing in for body copy, so the mockup reads as layout not text. */
const bar = (x, y, w, h, fill, o = 1, r = null) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r ?? h / 2}" fill="${fill}" opacity="${o}"/>`

const text = (x, y, s, opts = {}) => {
  const {
    size = 16,
    weight = 500,
    fill = '#111',
    family = BODY,
    spacing = 0,
    anchor = 'start',
  } = opts
  return `<text x="${x}" y="${y}" font-family="${family}" font-size="${size}" font-weight="${weight}" fill="${fill}" letter-spacing="${spacing}" text-anchor="${anchor}">${esc(s)}</text>`
}

/** Abstract "photography" block: flat ground plus a few geometric shapes. */
function imagery(x, y, w, h, p, seed = 1) {
  const id = `c${seed}-${x}-${y}`
  const cx = x + w * 0.5
  const cy = y + h * 0.5
  const min = Math.min(w, h)
  const variants = [
    `<circle cx="${x + w * 0.7}" cy="${y + h * 0.32}" r="${min * 0.22}" fill="${p.accent}"/>
     <rect x="${x + w * 0.08}" y="${y + h * 0.5}" width="${w * 0.44}" height="${h * 0.5}" rx="8" fill="${p.ink}" opacity="0.88"/>`,
    `<path d="M${x} ${y + h} L${cx} ${y + h * 0.3} L${x + w} ${y + h} Z" fill="${p.ink}" opacity="0.9"/>
     <circle cx="${x + w * 0.78}" cy="${y + h * 0.26}" r="${min * 0.13}" fill="${p.accent}"/>`,
    `<circle cx="${cx}" cy="${cy}" r="${min * 0.3}" fill="${p.accent}"/>
     <rect x="${x}" y="${y + h * 0.72}" width="${w}" height="${h * 0.28}" fill="${p.ink}" opacity="0.88"/>`,
  ]
  const shape = variants[seed % variants.length]
  return `<g><clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10"/></clipPath>
  <g clip-path="url(#${id})"><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${p.tint}"/>${shape}</g></g>`
}

function desktop(project) {
  const p = project.palette
  const W = 1600
  const H = 1080
  const pad = 88
  const brand = project.shortName || project.title

  const navLinks = project.nav
    .map((l, i) => text(600 + i * 128, 66, l, { size: 17, fill: p.ink, family: BODY }))
    .join('\n  ')

  const cards = project.cards
    .map((c, i) => {
      const x = pad + i * 472
      return `<g>
    <rect x="${x}" y="794" width="440" height="216" rx="14" fill="#ffffff" stroke="${p.line}"/>
    ${imagery(x + 1, 795, 438, 86, p, i + 1)}
    ${text(x + 28, 926, c.title, { size: 22, weight: 700, fill: p.ink, family: DISPLAY, spacing: -0.4 })}
    ${bar(x + 28, 946, 330, 9, p.ink, 0.16)}
    ${bar(x + 28, 966, 250, 9, p.ink, 0.16)}
  </g>`
    })
    .join('\n  ')

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(project.title)} website concept, desktop view">
  <rect width="${W}" height="${H}" fill="${p.paper}"/>

  ${text(pad, 68, brand, { size: 26, weight: 800, fill: p.ink, family: DISPLAY, spacing: -0.6 })}
  ${navLinks}
  <rect x="${W - pad - 190}" y="38" width="190" height="50" rx="25" fill="${p.ink}"/>
  ${text(W - pad - 95, 69, project.navCta, { size: 16, weight: 600, fill: p.paper, anchor: 'middle' })}
  <line x1="0" y1="112" x2="${W}" y2="112" stroke="${p.line}"/>

  ${text(pad, 228, project.eyebrow, { size: 15, weight: 600, fill: p.accent, spacing: 3.4 })}
  ${text(pad, 326, project.h1[0], { size: 76, weight: 800, fill: p.ink, family: DISPLAY, spacing: -2.6 })}
  ${text(pad, 410, project.h1[1], { size: 76, weight: 800, fill: p.ink, family: DISPLAY, spacing: -2.6 })}
  ${bar(pad, 456, 460, 12, p.ink, 0.2)}
  ${bar(pad, 484, 378, 12, p.ink, 0.2)}
  <rect x="${pad}" y="536" width="224" height="60" rx="30" fill="${p.accent}"/>
  ${text(pad + 112, 573, project.heroCta, { size: 17, weight: 600, fill: '#ffffff', anchor: 'middle' })}
  <rect x="${pad + 244}" y="536" width="196" height="60" rx="30" fill="none" stroke="${p.ink}" stroke-opacity="0.32"/>
  ${text(pad + 342, 573, 'Our services', { size: 17, weight: 600, fill: p.ink, anchor: 'middle' })}
  ${imagery(846, 176, 666, 456, p, 2)}

  <line x1="0" y1="690" x2="${W}" y2="690" stroke="${p.line}"/>
  ${text(pad, 754, project.sectionLabel, { size: 15, weight: 600, fill: p.accent, spacing: 3.4 })}
  ${cards}
</svg>
`
}

function mobile(project) {
  const p = project.palette
  const W = 390
  const H = 844
  const pad = 24
  const brand = project.shortName || project.title

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(project.title)} website concept, mobile view">
  <rect width="${W}" height="${H}" fill="${p.paper}"/>
  ${text(pad, 46, brand, { size: 18, weight: 800, fill: p.ink, family: DISPLAY, spacing: -0.4 })}
  ${bar(W - pad - 24, 31, 24, 2.5, p.ink, 0.85)}
  ${bar(W - pad - 24, 39, 24, 2.5, p.ink, 0.85)}
  ${bar(W - pad - 24, 47, 16, 2.5, p.ink, 0.85)}
  <line x1="0" y1="72" x2="${W}" y2="72" stroke="${p.line}"/>

  ${text(pad, 128, project.eyebrow, { size: 10, weight: 600, fill: p.accent, spacing: 2.2 })}
  ${text(pad, 180, project.h1[0], { size: 34, weight: 800, fill: p.ink, family: DISPLAY, spacing: -1.3 })}
  ${text(pad, 220, project.h1[1], { size: 34, weight: 800, fill: p.ink, family: DISPLAY, spacing: -1.3 })}
  ${bar(pad, 248, 230, 8, p.ink, 0.2)}
  ${bar(pad, 266, 180, 8, p.ink, 0.2)}
  <rect x="${pad}" y="298" width="${W - pad * 2}" height="52" rx="26" fill="${p.accent}"/>
  ${text(W / 2, 330, project.heroCta, { size: 15, weight: 600, fill: '#ffffff', anchor: 'middle' })}
  <rect x="${pad}" y="362" width="${W - pad * 2}" height="52" rx="26" fill="none" stroke="${p.ink}" stroke-opacity="0.3"/>
  ${text(W / 2, 394, 'WhatsApp us', { size: 15, weight: 600, fill: p.ink, anchor: 'middle' })}

  ${imagery(pad, 440, W - pad * 2, 196, p, 2)}

  ${text(pad, 686, project.sectionLabel, { size: 10, weight: 600, fill: p.accent, spacing: 2.2 })}
  <rect x="${pad}" y="702" width="${W - pad * 2}" height="56" rx="10" fill="#ffffff" stroke="${p.line}"/>
  ${text(pad + 16, 736, project.cards[0].title, { size: 16, weight: 700, fill: p.ink, family: DISPLAY })}
  <rect x="${pad}" y="770" width="${W - pad * 2}" height="56" rx="10" fill="#ffffff" stroke="${p.line}"/>
  ${text(pad + 16, 804, project.cards[1].title, { size: 16, weight: 700, fill: p.ink, family: DISPLAY })}
</svg>
`
}

/* ---- Concept brands still awaiting a build -------------------------------------------- */

const palettes = {
  plumbing: { paper: '#F4F6F7', ink: '#132836', accent: '#D2703C', line: '#DCE3E7', tint: '#E2EAEF' },
  beauty: { paper: '#F8F4EE', ink: '#2B2823', accent: '#7E9161', line: '#E7DFD3', tint: '#EDE6DA' },
  construction: { paper: '#F5F2EB', ink: '#1B1915', accent: '#C09030', line: '#E3DCCE', tint: '#E9E3D6' },
  cleaning: { paper: '#F1F6F5', ink: '#123033', accent: '#3E9C8E', line: '#DBE7E4', tint: '#E0EDEA' },
  automotive: { paper: '#F3F3F2', ink: '#17181A', accent: '#B8433B', line: '#E0E0DE', tint: '#E5E5E3' },
  hospitality: { paper: '#F9F5EE', ink: '#1F2B2A', accent: '#B5825A', line: '#E6DED1', tint: '#EBE3D6' },
}

/**
 * Empty, and correctly so: all six concepts have now been built for real, and
 * every one of them takes its portfolio images from the running site via
 * `npm run shots`. A concept is dropped from this list the moment it
 * graduates, so a generated placeholder can never overwrite a real
 * screenshot.
 *
 * The before/after revamp placeholders below are still generated — they
 * illustrate a dated site being replaced, and there is no real site to
 * photograph for that.
 *
 * Add an entry here only for a concept that has been designed but not yet
 * built, and remove it again as soon as it has.
 */
const concepts = []

/* ---- Before / after placeholders --------------------------------------- */

function datedSite() {
  const links = ['Home', 'About Us', 'Services', 'Gallery', 'Contact Us']
    .map((l, i) => text(186 + i * 136, 150, l, { size: 15, fill: '#1B4A73', family: 'Georgia, Times New Roman, serif' }))
    .join('\n  ')
  const copy = Array.from({ length: 9 }, (_, i) =>
    bar(186, 566 + i * 26, i % 3 === 2 ? 690 : 900, 10, '#7B7B74', 0.5, 2)
  ).join('\n  ')
  const ctas = ['Read more »', 'Click here »', 'Download our brochure »']
    .map((l, i) => text(186, 856 + i * 34, l, { size: 17, fill: '#2255AA', family: 'Georgia, Times New Roman, serif' }))
    .join('\n  ')
  const sidebar = Array.from({ length: 4 }, (_, i) =>
    bar(1146, 596 + i * 24, 210, 9, '#7B7B74', 0.45, 2)
  ).join('\n  ')

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1080" width="1600" height="1080" role="img" aria-label="Placeholder illustration of a dated, desktop-only website layout">
  <rect width="1600" height="1080" fill="#E9E9E4"/>
  <rect x="150" y="0" width="1300" height="1080" fill="#FFFFFF"/>
  <rect x="150" y="0" width="1300" height="120" fill="#2F5C86"/>
  ${text(186, 76, 'Your Business (Pty) Ltd', { size: 32, weight: 700, fill: '#FFFFFF', family: 'Georgia, Times New Roman, serif' })}
  <rect x="150" y="120" width="1300" height="44" fill="#C9D6E2"/>
  ${links}
  <rect x="186" y="202" width="1228" height="256" fill="#D8D8D2"/>
  ${text(800, 340, 'banner-image-final-v3.jpg', { size: 26, fill: '#8B8B84', anchor: 'middle' })}
  ${text(186, 528, 'Welcome to our website!', { size: 30, weight: 700, fill: '#1B4A73', family: 'Georgia, Times New Roman, serif' })}
  ${copy}
  ${ctas}
  <rect x="1120" y="528" width="294" height="220" fill="#F1F1EC" stroke="#CFCFC8"/>
  ${text(1146, 568, 'Contact', { size: 20, weight: 700, fill: '#1B4A73', family: 'Georgia, Times New Roman, serif' })}
  ${sidebar}
  <rect x="150" y="980" width="1300" height="100" fill="#2F5C86"/>
  ${text(800, 1038, 'Copyright 2011 · All Rights Reserved', { size: 18, weight: 400, fill: '#C9D6E2', family: 'Georgia, Times New Roman, serif', anchor: 'middle' })}
</svg>
`
}

const revampAfter = {
  slug: 'revamp-after',
  title: 'Your Business',
  shortName: 'Your Business',
  palette: { paper: '#FAF8F4', ink: '#16150F', accent: '#C15F3C', line: '#E4DED2', tint: '#EDE7DB' },
  nav: ['Services', 'Projects', 'About', 'Contact'],
  navCta: 'Get a quote',
  eyebrow: 'CAPE TOWN',
  h1: ['Trusted work,', 'done properly.'],
  heroCta: 'Request a quote',
  sectionLabel: 'WHAT WE DO',
  cards: [{ title: 'Our services' }, { title: 'Recent work' }, { title: 'Get a quote' }],
}

/* ---- Write -------------------------------------------------------------- */

let count = 0
function write(path, contents) {
  const full = out(path)
  mkdirSync(dirname(full), { recursive: true })
  writeFileSync(full, contents, 'utf8')
  count += 1
}

for (const c of concepts) {
  write(`projects/${c.slug}/desktop.svg`, desktop(c))
  write(`projects/${c.slug}/mobile.svg`, mobile(c))
}

write('revamp/before.svg', datedSite())
write('revamp/after.svg', desktop(revampAfter))
write('revamp/after-mobile.svg', mobile(revampAfter))

console.log(`Generated ${count} placeholder mockups in public/assets/`)
