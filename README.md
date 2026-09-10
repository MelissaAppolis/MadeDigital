# Made Digital

Marketing website for Made Digital — a Cape Town web design studio.

**Websites that bring you business.**

Built with React + Vite. No backend, no CMS, no server. It builds to static
files and deploys to Netlify.

---

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the production build locally
npm run mockups  # regenerate the placeholder mockup images
```

---

## Before you go live

Two things need your real details. Everything else is ready.

### 1. Contact details — `src/data/site.js`

```js
email: 'PLACEHOLDER@madedigital.co.za',
whatsappNumber: 'PLACEHOLDER',   // digits only, e.g. '27821234567'
whatsappDisplay: '+27 XX XXX XXXX',
phoneDisplay: '+27 XX XXX XXXX',
```

Until these are replaced, the contact page shows them as obvious placeholders
with a note pointing back at this file, and the WhatsApp link stays inert
rather than pointing somewhere wrong. Social links in the same file are `'#'`
placeholders and are labelled as such in the footer.

### 2. Your domain — `src/data/site.js`, `index.html`, `public/sitemap.xml`, `public/robots.txt`

These currently use `https://madedigital.co.za`. Search-and-replace it if your
domain differs. It drives canonical URLs and Open Graph tags.

### Also worth doing

- Replace `public/og-image.svg` with a 1200×630 image (this is the preview card
  people see when your link is shared).
- Replace `public/favicon.svg` if you have a proper logo mark.

---

## Deploying to Netlify

1. Push this folder to a GitHub repository.
2. In Netlify: **Add new site → Import an existing project** → pick the repo.
3. Netlify reads `netlify.toml` and fills in the settings itself:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy.

`netlify.toml` and `public/_redirects` both contain the SPA fallback rule, so
refreshing a deep link like `/work/studio-olive-beauty` serves the app instead of a
404.

### Forms

Both forms use **Netlify Forms**, which needs no backend and no API keys.

Netlify's build bot only reads static HTML, so each form is declared twice:

- A hidden stub in `index.html` — this is what Netlify detects at build time.
- The real React form in `src/pages/` — this posts to Netlify at runtime.

**The field `name` attributes must match between the two.** If you add a field
to a React form, add it to the matching stub in `index.html` too, or that field
will be silently dropped from the submission.

Submissions appear under **Forms** in the Netlify dashboard. Set up email
notifications there (Site settings → Forms → Form notifications).

Locally, forms cannot reach Netlify's endpoint, so `npm run dev` logs the
payload to the console and shows the success state instead. That is a
dev-only fallback — see `src/hooks/useFormSubmit.js`.

To swap in a different provider (Formspree, Basin, a function), replace the
`fetch` in that one hook. Nothing in the pages needs to change.

---

## Adding and replacing portfolio work

Everything the portfolio renders comes from **one array**:
`src/data/projects.js`. No component needs editing.

### Replace a placeholder mockup with a real screenshot

1. Drop your image into `public/assets/projects/<slug>/`.
2. Point the project's `desktop` (and `mobile`) at it:

```js
desktop: '/assets/projects/studio-olive-beauty/desktop.jpg',
mobile:  '/assets/projects/studio-olive-beauty/mobile.jpg',
```

That's it. The card, the showreel, the project page and the Open Graph image
all follow.

Screenshot sizes that work well:

| Slot      | Ratio         | Suggested size | Notes                          |
| --------- | ------------- | -------------- | ------------------------------ |
| `desktop` | 16:10 or 3:2  | 1600 × 1000 px | Cropped from the top           |
| `mobile`  | roughly 9:19  | 390 × 844 px   | Shown inside the phone frame   |

Taller screenshots are fine — they crop from the top, like a real screenshot.

### Add a new project

Append an object to the array. `slug` must be unique; it becomes the URL
(`/work/<slug>`). The industry filter chips on `/work` and the sitemap entries
are derived from the data, so a new `category` appears as a filter
automatically.

```js
{
  slug: 'harbour-cafe',
  title: 'Harbour Café',
  category: 'Hospitality',
  type: 'Concept',          // or 'Client' for real, permitted client work
  description: 'One line for the card.',
  summary: 'A paragraph for the project page.',
  desktop: '/assets/projects/harbour-cafe/desktop.png',
  mobile: '/assets/projects/harbour-cafe/mobile.png',
  accent: '#B5825A',
  featured: true,           // show in the homepage grid
  goals: ['…'],
  features: ['…'],
  tags: ['Hospitality', 'Bookings'],   // optional chips on the card
  demoPath: '/work/harbour-cafe/live', // optional — see "Concept sites" below
  liveUrl: 'https://…',                // optional — external live build
}
```

Remember to add the new URL to `public/sitemap.xml`.

### Concept vs client work

`type: 'Concept'` badges the project **"Made Digital Concept"** everywhere it
appears, and the project page states the business is fictional. `type:
'Client'` badges it **"Client Project"** and drops the fictional-business note.

The six starter projects are concepts — demonstration sites, not client work —
and the site says so plainly on `/work` and on each project page. Only switch a
project to `'Client'` when it really is client work you have permission to show.

### Concept sites — the browsable demos

Some concepts are not just screenshots: they are complete websites you can
click through, living inside this project. Five are built:

| Concept                | Live at                             | Scope |
| ---------------------- | ----------------------------------- | ----- |
| Cape Town Plumbing Co. | `/work/cape-town-plumbing-co/live`  | `.ctp` |
| Studio Olive Beauty    | `/work/studio-olive-beauty/live`    | `.so`  |
| Cape Build Co.         | `/work/cape-build-co/live`          | `.cb`  |
| Clean & Co.            | `/work/clean-and-co/live`           | `.cc`  |
| AutoHaus Cape Town     | `/work/autohaus-cape-town/live`     | `.ah`  |

A concept site has its own navigation, footer, colours and typography, and
renders with **none** of the Made Digital header or footer — so it reads as a
client's website, not as another page of yours. All its CSS is scoped under one
class, which is what stops the design systems touching each other. They are
deliberately nothing like one another: the plumbing site is saturated petrol
and copper, colour-blocked and built around urgency; Studio Olive is warm ivory
and olive, serif and built around bookings; Cape Build is concrete and charcoal,
square-cornered and built around large static photography; Clean & Co. is
eucalyptus on warm cream, heavily rounded and built around a service selector
that leads straight to a quote; AutoHaus is dark charcoal and steel blue,
squared off at 4px and built around a service directory that reads like a
workshop index. None of them uses white anywhere.

Each one carries a slim bar at the top saying it is a concept and the business
is fictional, plus a line in its footer. That bar is deliberately quiet, and it
is the reason nobody mistakes a demo for a real business.

```
src/demos/
  _shared/                     used by every concept
    ConceptNotice.jsx          the "website concept" bar
    concept.css                its styles — themed per concept with CSS vars
    scrollToSection.js         anchor scrolling that survives the mobile drawer
    useWebFont.js              loads a concept's display font, only on that page
  cape-town-plumbing/
    config.js       ← phone, WhatsApp, email. Change the number ONCE, here.
    content.js      ← all copy: services, areas, FAQs, steps
    index.jsx  Nav.jsx  Footer.jsx  QuoteForm.jsx  icons.jsx
    plumbing.css    its design system, all scoped to .ctp
  studio-olive/
    config.js  content.js  ← business details and the treatment catalogue
    index.jsx  Nav.jsx  Footer.jsx  icons.jsx
    TreatmentMenu.jsx  Gallery.jsx  BookingForm.jsx
    studio-olive.css  its design system, all scoped to .so
  cape-build/
    config.js  content.js  index.jsx  Nav.jsx  Footer.jsx  icons.jsx
    ServiceList.jsx  EnquiryForm.jsx
    cape-build.css    its design system, all scoped to .cb
  clean-and-co/
    config.js  content.js  index.jsx  Nav.jsx  Footer.jsx  icons.jsx
    ServiceSelector.jsx  ServiceMenu.jsx  QuoteForm.jsx
    clean-and-co.css  its design system, all scoped to .cc
  autohaus/
    config.js  content.js  index.jsx  Nav.jsx  Footer.jsx  icons.jsx
    QuickAccess.jsx  ServiceDirectory.jsx  BookingForm.jsx
    autohaus.css      its design system, all scoped to .ah
```

**To add another concept site:**

1. Copy an existing concept folder and pick a new CSS prefix —
   scoping is what keeps them isolated. Rename every selector in its stylesheet.
2. Add it to `conceptRoutes` in `src/App.jsx`. Those render **outside** the
   `StudioLayout` route, so they carry none of your header or footer, and they
   are lazy-loaded so nobody downloads a concept they never open.
3. Set `demoPath` on that project in `src/data/projects.js`. That alone adds the
   "Open live site" button to its card and the "Open the live concept" button to
   its project page.
4. Add the route to `public/sitemap.xml` and to `targets` in
   `scripts/capture-demo-shots.mjs`, and remove the slug from `concepts` in
   `scripts/generate-mockups.mjs` so a placeholder cannot overwrite the real
   screenshots.

**Fonts.** Made Digital loads Inter and Manrope in `index.html`. A concept that
needs its own display face (Studio Olive uses Fraunces, Cape Build uses
Archivo, Clean & Co. uses Bricolage Grotesque, AutoHaus uses DM Sans with IBM
Plex Mono, Harbour House uses Cormorant Garamond with Jost) loads it with
`useWebFont` from its own component, so the request only happens when someone
opens that concept — it never slows your own site down.

**Screenshots come from the real thing.** Rather than drawing a mockup, the
portfolio images for a concept site are captured from the running site:

```bash
npm run dev              # in one terminal
npm i -D playwright-core # once — not a project dependency, only this script needs it
npm run shots            # in another

# or just one concept, leaving the others' images untouched:
node scripts/capture-demo-shots.mjs http://localhost:5173 autohaus-cape-town
```

That writes `desktop.jpg`, `mobile.jpg` and the section shots into
`public/assets/projects/<slug>/`. The placeholder generator (`npm run mockups`)
deliberately skips any concept that has graduated this way, so a drawing can
never overwrite a real screenshot.

**Concept photography.** Every concept uses real photographs, licensed from
[Pexels](https://www.pexels.com/license/) — free for commercial use, no
attribution required. They are downloaded into
`public/assets/demos/<concept>/` so nothing depends on an external URL that
could disappear.

They are stock, and your own photographs (or a client's) will always be better.
To swap one, drop the new file into that folder and repoint the path in the
concept's `config.js` — or `content.js` for Studio Olive's gallery and social
grids. The crop each slot expects is noted next to it.

Keep replacements web-sized: around 2000px wide for a full-bleed hero, 1000px
for gallery images, saved as progressive JPEG at roughly 75% quality. The five
concepts together come to about 7.5 MB of photography.

The concepts' forms validate properly and show real success and error states,
but deliberately send nowhere — there is no business to send them to.
`QuoteForm.jsx` and `BookingForm.jsx` each mark the exact spot to add a real
submission.

### Before / after

The revamp section reads from the `revamp` export at the bottom of
`src/data/projects.js`. Replace the two image paths with a real redesign and
set `placeholder: false` to remove the "illustrative placeholders" note.

---

## Where things live

```
public/
  assets/projects/<slug>/    portfolio images, one folder per project
  assets/demos/<slug>/       artwork used inside a concept site
  assets/revamp/             before / after images
  favicon.svg  og-image.svg  robots.txt  sitemap.xml  _redirects
scripts/
  generate-mockups.mjs       placeholder SVG mockups        (npm run mockups)
  capture-demo-shots.mjs     real screenshots of a concept  (npm run shots)
src/
  demos/                     ← browsable concept sites, each self-contained
  data/                      ← all content lives here
    site.js                  contact details, navigation
    projects.js              the portfolio
    services.js              services, benefits, process steps
    packages.js              pricing, care plans, FAQ
  components/
    Mockup.jsx               BrowserMockup, PhoneMockup, DeviceStage
    ProjectCard.jsx          portfolio card
    Sections.jsx             shared page sections (CTA, review, process…)
    Header.jsx  Footer.jsx  Field.jsx  Reveal.jsx
  hooks/
    useSeo.js                per-page title, meta, OG tags, canonical
    useFormSubmit.js         form submission + validation
  pages/                     one file per route
  styles/
    base.css                 design tokens, reset, typography
    components.css           buttons, header, footer, forms
    blocks.css               mockups, portfolio, pricing, process
```

Colours, type scale and spacing are CSS custom properties at the top of
`src/styles/base.css`. Changing `--accent` there re-tints the whole site.

---

## Notes

- **No fake anything.** There are no invented testimonials, client logos,
  statistics or awards on this site, and the About page says openly that the
  studio is new. Please keep it that way — it is the most credible thing about
  the site while there is no client work to show yet.
- **Accessibility.** Semantic landmarks, one `h1` per page, visible focus
  rings, labelled fields, and `prefers-reduced-motion` respected throughout
  (the homepage marquee stops and becomes a scrollable strip).
- **Performance.** Roughly 83 KB gzipped of JS and 7 KB of CSS for the studio
  site. Each concept site is code-split into its own chunk (about 8 KB of JS
  and 5 KB of CSS), so a visitor who never opens one never downloads it.
  Placeholder mockups are SVG, images below the fold are lazy-loaded, and the
  only external request is Google Fonts.
- **One rendering caveat.** This is a client-rendered app, so page titles and
  descriptions are set by JavaScript. Google renders JavaScript and will index
  every page correctly. Social scrapers (WhatsApp, Facebook, LinkedIn) do
  **not** run JavaScript, so a shared link to an inner page shows the
  homepage's preview card from `index.html` rather than that page's own. The
  homepage — the link you will share most — is unaffected. If inner-page
  previews start to matter, the fix is prerendering at build time; it does not
  require changing the stack.
