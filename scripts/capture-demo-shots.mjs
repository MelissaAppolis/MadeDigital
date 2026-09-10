/**
 * Screenshots a concept site and writes the images the portfolio uses.
 *
 * The Work grid, the homepage showreel and the project page all read their
 * images from src/data/projects.js. This script produces those images from the
 * real running concept, so the portfolio always shows what the concept
 * actually looks like rather than a drawing of it.
 *
 * Playwright is NOT a dependency of this project — it is only needed to
 * regenerate screenshots, which is a rare, local task:
 *
 *   npm run dev                 # in one terminal
 *   npm i -D playwright-core    # once, if you have not already
 *   npm run shots               # in another
 *
 * Pass a different origin if your dev server is not on 5173:
 *   node scripts/capture-demo-shots.mjs http://localhost:4173
 *
 * Pass one or more slugs to recapture only those concepts, so adding a new one
 * does not rewrite the other three:
 *   node scripts/capture-demo-shots.mjs http://localhost:4173 clean-and-co
 */
import { mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const origin = process.argv[2] || 'http://localhost:5173'

let chromium
try {
  ;({ chromium } = await import('playwright-core'))
} catch {
  console.error(
    'playwright-core is not installed.\n' +
      'It is only needed for this script, so it is not a project dependency.\n\n' +
      '  npm i -D playwright-core\n'
  )
  process.exit(1)
}

/**
 * Playwright's own browsers are not bundled with playwright-core. Point this
 * at any Chromium build; the default is where `npx playwright install` puts it
 * on Windows.
 */
const executablePath =
  process.env.CHROME_PATH ||
  `${process.env.LOCALAPPDATA}\\ms-playwright\\chromium-1243\\chrome-win64\\chrome.exe`

/** One concept: where it lives and which views to capture. */
const targets = [
  {
    slug: 'cape-town-plumbing-co',
    path: '/work/cape-town-plumbing-co/live',
    shots: [
      { name: 'desktop', at: '#top' },
      { name: 'shot-services', at: '#services' },
      { name: 'shot-emergency', at: '#emergency' },
      { name: 'shot-contact', at: '#contact' },
    ],
  },
  {
    slug: 'cape-build-co',
    path: '/work/cape-build-co/live',
    shots: [
      { name: 'desktop', at: '#top' },
      { name: 'shot-projects', at: '#projects' },
      { name: 'shot-services', at: '#services' },
      { name: 'shot-contact', at: '#contact' },
    ],
  },
  {
    slug: 'studio-olive-beauty',
    path: '/work/studio-olive-beauty/live',
    shots: [
      { name: 'desktop', at: '#top' },
      { name: 'shot-treatments', at: '#treatments' },
      { name: 'shot-gallery', at: '#gallery' },
      { name: 'shot-contact', at: '#contact' },
    ],
  },
  {
    slug: 'clean-and-co',
    path: '/work/clean-and-co/live',
    shots: [
      { name: 'desktop', at: '#top' },
      { name: 'shot-selector', at: '#needs' },
      { name: 'shot-before-after', at: '#before-after' },
      { name: 'shot-quote', at: '#quote' },
    ],
  },
  {
    slug: 'autohaus-cape-town',
    path: '/work/autohaus-cape-town/live',
    shots: [
      { name: 'desktop', at: '#top' },
      { name: 'shot-services', at: '#services' },
      { name: 'shot-diagnostics', at: '#diagnostics' },
      { name: 'shot-booking', at: '#booking' },
    ],
  },
  {
    slug: 'harbour-house',
    path: '/work/harbour-house/live',
    shots: [
      { name: 'desktop', at: '#top' },
      { name: 'shot-rooms', at: '#rooms' },
      { name: 'shot-experience', at: '#experience' },
      { name: 'shot-contact', at: '#contact' },
    ],
  },
]

/** Optional slug filter: any argument after the origin names a concept. */
const only = process.argv.slice(3)
const selected = only.length
  ? targets.filter((target) => only.includes(target.slug))
  : targets

if (only.length && selected.length === 0) {
  console.error(`No concept matches: ${only.join(', ')}`)
  process.exit(1)
}

const DESKTOP = { width: 1600, height: 1000 }
const MOBILE = { width: 390, height: 844 }

const browser = await chromium.launch({ executablePath })

for (const target of selected) {
  const outDir = resolve(root, 'public/assets/projects', target.slug)
  mkdirSync(outDir, { recursive: true })
  const url = `${origin}${target.path}`

  // Reduced motion keeps every reveal fully rendered, so nothing is captured
  // mid-fade.
  const context = await browser.newContext({
    viewport: DESKTOP,
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
  })
  const page = await context.newPage()
  page.on('console', (m) => {
    if (m.type() === 'error') console.warn('  console error:', m.text())
  })

  await page.goto(url, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)

  for (const shot of target.shots) {
    await page.evaluate((selector) => {
      // For the homepage shot, scroll exactly past the "website concept"
      // notice bar: it belongs on the live page but only clutters a portfolio
      // image, and stopping short of it leaves a clipped sliver of text.
      if (selector === '#top') {
        const notice = document.querySelector('.mdc-notice')
        window.scrollTo(0, notice ? Math.ceil(notice.getBoundingClientRect().height) : 0)
        return
      }
      const el = document.querySelector(selector)
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' })
      else window.scrollTo(0, 0)
    }, shot.at)
    await page.waitForTimeout(350)

    // JPEG, not PNG: these shots contain photographic-style artwork, and the
    // PNGs came out three times the size for no visible gain at the sizes the
    // portfolio displays them.
    const file = resolve(outDir, `${shot.name}.jpg`)
    await page.screenshot({
      path: file,
      quality: 84,
      type: 'jpeg',
      clip: { x: 0, y: 0, ...DESKTOP },
    })
    console.log(`  ${target.slug}/${shot.name}.jpg`)
  }

  await context.close()

  // Mobile home view for the phone mockups.
  const mobileContext = await browser.newContext({
    viewport: MOBILE,
    // The phone mockup renders about 200px wide, so 1.5x is already generous.
    deviceScaleFactor: 1.5,
    isMobile: true,
    hasTouch: true,
    reducedMotion: 'reduce',
  })
  const mobilePage = await mobileContext.newPage()
  await mobilePage.goto(url, { waitUntil: 'networkidle' })
  await mobilePage.evaluate(() => document.fonts.ready)
  await mobilePage.waitForTimeout(350)
  await mobilePage.screenshot({
    path: resolve(outDir, 'mobile.jpg'),
    quality: 84,
    type: 'jpeg',
    clip: { x: 0, y: 0, ...MOBILE },
  })
  console.log(`  ${target.slug}/mobile.jpg`)
  await mobileContext.close()
}

await browser.close()
console.log('\nDone. Point the project at these files in src/data/projects.js.')
