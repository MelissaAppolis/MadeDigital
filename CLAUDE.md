# CLAUDE.md

Working notes for Claude Code on this repo. `README.md` is the human-facing
handover doc (deployment, replacing mockups) — this file is the stuff that is
easy to get wrong from reading the code alone.

## What this is

Marketing site for **Made Digital**, a Cape Town web design studio owned by
Melissa Appolis. It sells websites to local SMEs — plumbers, salons, builders,
cleaners, guesthouses. The visitor is a busy business owner on a phone, not a
developer.

Tagline: **Websites that bring you business.**

## Stack and constraints

React 18 + Vite + react-router-dom. **Three runtime dependencies, deliberately.**
Do not add libraries without a real reason — no Tailwind, no CSS-in-JS, no
framer-motion, no react-helmet, no UI kit. Animation is CSS plus one
IntersectionObserver; head tags are a 60-line hook.

Static SPA on Netlify. No backend, no server-side rendering, no CMS.

```bash
npm run dev          # localhost:5173
npm run build        # → dist/
npm run preview      # serve the built site
npm run mockups      # placeholder website mockups for concepts not yet built
npm run shots        # real screenshots of a built concept (needs playwright-core)
```

## Architecture

**All content lives in `src/data/`.** Components read from it; nothing is
hard-coded in JSX. When asked to change copy, pricing, services or portfolio
items, edit the data file — not the page.

| File          | Holds                                            |
| ------------- | ------------------------------------------------ |
| `site.js`     | contact details, nav arrays, placeholder flags   |
| `projects.js` | the portfolio + the before/after `revamp` export |
| `services.js` | services, benefits, process steps                |
| `packages.js` | packages, refresh offer, care plans, FAQ         |

### Concept sites (`src/demos/`)

A concept site is a **whole fictional client website** living inside this
project — its own nav, footer, palette and type. Six exist:

| Concept                | Route                              | Scope  | Character |
| ---------------------- | ---------------------------------- | ------ | --------- |
| Cape Town Plumbing Co. | `/work/cape-town-plumbing-co/live` | `.ctp` | Saturated petrol + copper, Inter, urgency-led |
| Clean & Co.            | `/work/clean-and-co/live`          | `.cc`  | Eucalyptus on warm cream, Bricolage Grotesque, selector-led |
| Studio Olive Beauty    | `/work/studio-olive-beauty/live`   | `.so`  | Warm ivory + olive, serif (Fraunces), booking-led |
| Cape Build Co.         | `/work/cape-build-co/live`         | `.cb`  | Concrete + charcoal, Archivo set wide, photography-led |
| AutoHaus Cape Town     | `/work/autohaus-cape-town/live`    | `.ah`  | Dark charcoal + steel blue, DM Sans over IBM Plex Mono, directory-led |
| Harbour House          | `/work/harbour-house/live`         | `.hh`  | Warm ivory + sea green, Cormorant Garamond over Jost, photography-led |

The table order is the portfolio order, set by the `projects` array in
`src/data/projects.js`. That one array drives the Work grid, the homepage
showcase and the ordering here — change it there and everything follows.

**They must not look alike.** The whole point is demonstrating range, so a new
concept gets its own palette, type, layout language and structural devices —
not the previous one recoloured. Studio Olive avoids bordered cards entirely
(arch-topped imagery, an editorial price list with leader dots, offset benefit
rows, masonry); the plumbing site is colour-blocked (dark petrol hero, copper
trust band, six service cards on six different grounds, a waterline divider);
Cape Build has **zero border-radius anywhere**, a full-screen photographic hero
with the content on the bottom edge, three projects in three different
compositions, and a service list with a sticky image plate instead of cards.
Clean & Co. is the opposite of Cape Build by design — **nothing on it has a
square corner** — and it leads with a headline across a bright cream canvas
above overlapping rounded photo plates, then a five-option tab selector, a
ruled service list whose photograph appears in the row you point at, and
before/after pairs sitting side by side in one frame. AutoHaus is the only
concept that is **dark by default** — a hard 36/64 split hero with a panel
against a photograph, a six-cell instrument strip, a ten-service ruled index
feeding one job card, and a monospace on every index, label and readout. It is
also the only one using a monospace at all. Harbour House is the quiet one and
the only one set in a **serif** — the hero photograph is inset into a warm
ivory page rather than run full bleed, with a booking panel across its lower
edge; the three rooms are three different compositions; the five Cape Town
experiences are a guest-driven horizontal scroll rail; the neighbourhood is a
route line with stops on it instead of a map; and a room opens in an
accessible dialog. There is not one bordered card on it.

**Cape Build, Clean & Co., AutoHaus and Harbour House allow no image motion at
all.** Their
briefs banned zoom, pan, parallax and Ken Burns outright — hover may change an overlay or opacity, never
the photograph. `scratchpad/nomotion.mjs` checks this by looking for a CSS
animation or a non-zero transition duration on a transform-ish property. Note
that `transition-property: all` on an `<img>` is the CSS *initial value* and
means nothing on its own; check the duration too, or you will chase a ghost.
Studio Olive's gallery and Made Digital's own Work cards do use a subtle hover
zoom — that is deliberate and specific to them.

Clean & Co., AutoHaus and Harbour House go one step further: they override the
shared `<Reveal>` so the reveal is **opacity only**, dropping the 22px lift,
because on those concepts a reveal often wraps a photograph and their briefs
ruled out photographic movement of every kind. The override lives at the bottom
of `clean-and-co.css` / `autohaus.css` / `harbour-house.css` and depends on the
concept stylesheet loading after the studio ones — which it does, because
concepts are lazy-imported. Do not "tidy" it away.

**No concept uses white.** The plumbing site’s lightest ground is
`--ctp-cream` #fdf6ea, Studio Olive's is `--so-ivory` #fbf7ef, Cape Build's is
`--cb-paper` #f1efe9, Harbour House's is `--hh-ivory` #faf7f2. Anything that
would ordinarily be a white card is cream or sand. Melissa asked for this
directly — warm grounds are what keep a saturated site feeling premium rather
than shouty. Do not reintroduce `#fff` as a surface.

**Every image on a concept is a photograph.** Melissa asked for this in as many
words: no illustrated or drawn imagery anywhere. The concepts previously used
generated SVG artwork; those generators have been deleted, and reintroducing
drawn imagery would undo an explicit instruction.

Photos are licensed from **Pexels** — free for commercial use, no attribution
required — downloaded into `public/assets/demos/<concept>/` so nothing depends
on an external URL. They are stock, and the studio's own photography would be
better; the paths live in each concept's `config.js` (and `content.js` for
Studio Olive's gallery and social grids) with the expected crop noted against
each slot.

To source more: Pexels search pages give photo ids via WebFetch, and
`https://images.pexels.com/photos/<id>/pexels-photo-<id>.jpeg?auto=compress&cs=tinysrgb&w=<n>`
downloads one. **Pexels ignores its own quality parameter** — a 2000px hero
arrives over a megabyte — so re-encode locally (`sharp`, installed in the
scratchpad, never in this project) at about quality 74, progressive, mozjpeg.

**All six concepts are now built**, so `npm run mockups` has an empty concept
list and only regenerates the before/after revamp placeholders. Every portfolio
card image comes from `npm run shots` against the running site. If a seventh
concept is ever designed but not yet built, add it to `concepts` in
`generate-mockups.mjs` for a placeholder card, and take it out again the moment
it is built — that is what stops a placeholder overwriting a real screenshot.

Rules that make this work, none of them optional:

- **Routing.** `/work/:slug` is the *case study*; `/work/:slug/live` is the
  browsable concept. Concepts are listed in `conceptRoutes` in `src/App.jsx`
  and render **outside** `StudioLayout`, so they carry no Made Digital header
  or footer, and are `lazy()` imported so they stay out of the main bundle.
- **Shared pieces live in `src/demos/_shared/`** — `ConceptNotice` (+ its
  `concept.css`, themed per concept with `--notice-*` variables),
  `scrollToSection`, `useWebFont`. Reuse these rather than copying; a concept's
  own `Nav.jsx` re-exports `scrollToSection` so its siblings import one path.
- **A concept's display font loads from the concept**, via `useWebFont`, never
  from `index.html` — otherwise every Made Digital visitor pays for a font only
  one demo uses.
- **A concept's nav is the first thing to run out of room, and a page-level
  overflow check will not see it.** The bar clips instead of widening the
  document. AutoHaus lost its menu button off the right edge at 390px and
  again at 560px (where the phone number appears) while `scrollWidth ===
  clientWidth` the whole time. Measure each nav child against the **viewport**,
  and check nothing has wrapped onto a second line. Note that Made Digital's
  own burger deliberately sits inside the container padding — that is not a
  fault, so do not measure against the content box.
- **`sharp`'s `position: 'attention'` picks the busiest region, not the
  subject.** Cropping Harbour House's garden room to 3:2 that way framed a
  blank panelled wall and cut the bed out entirely; the closing Lion's Head
  band came back as empty sky. Always contact-sheet the generated crops and
  look at them — a crop that is wrong is invisible in the code and obvious in
  the picture. `position: 'south'`/`'southwest'`, or an explicit
  `.extract()` band, is usually what you actually wanted.
- **A primary button inherits the section ground and can vanish.** Harbour
  House's `.hh-btn` is an ink fill; on the charcoal closing section and the
  dark breakfast band that is a button you cannot see. Any concept with both
  light and dark grounds needs the primary button inverted on the dark ones.
- **A photograph spanning two grid rows stretches both of them.** The Harbour
  House room layout puts text and a square detail in a left column beside a
  tall photograph; without a third `1fr` slack row the detail drifted far away
  from the text it belongs to.
- **A contrast checker cannot composite a gradient scrim.** Harbour House's
  experience rail sets light text over a photograph darkened by a pseudo-
  element gradient, and `scratchpad/contrast.mjs` reports it as 1.06:1 against
  the page ground. Sample the rendered pixels behind the text instead — the
  real figure there is 8.5–10.4:1.
- **Adding a service to a concept means adding its icon too.** AutoHaus maps
  service id → mark in `serviceIcons` (`icons.jsx`). A new id with no entry
  makes `serviceIcons[id]` undefined, and rendering `<Icon />` blanks the whole
  page with minified React error #130 — not a missing glyph, a white screen.
  Both consuming ends now guard with `{Icon && <Icon …/>}`, but add the icon.
  A face-on wheel also collides with the brake disc in the same directory, so
  the tyre mark is a tread band rather than another concentric circle.
- **Lifting one piece of state across two components can hand one of them a
  value it has no record for.** AutoHaus shares `service` between the booking
  form and the service directory; the form's select also offers "" and
  "other", and the directory crashed on `services[index].id` the moment either
  was chosen. A shared selection needs a fallback at the consuming end, not
  just discipline at the setting end.
- **A flex `gap` on a button applies between its text node and any `<span>`
  inside it.** `Book<span> a Service</span>` renders with a doubled space,
  because the gap and the literal space both apply.
- **Watch for class-name collisions inside one concept.** Clean & Co. briefly
  had `.cc-quote` on both the testimonial figures and the quote *section*
  container, which handed the testimonials the section's two-column grid and a
  2px rule. Symptoms are cosmetic and easy to misread as a layout bug; the fix
  is a distinct name (`.cc-getquote`), not more specificity.
- **CSS is scoped to a root class** (`.ctp` for plumbing). Every selector in
  `plumbing.css` starts with it. This is what keeps the two design systems
  apart, and it is also why the file re-declares headings, focus rings and
  button styles — it has to beat Made Digital's globals inside the concept.
  A new concept gets a new prefix.
- **One config object per concept.** `config.js` holds every phone number,
  WhatsApp number and email; `whatsappHref` is built there once. Nothing
  hard-codes a number. Demo numbers are `+27 00 000 0000` on purpose.
- **Every concept renders `_shared/ConceptNotice.jsx`** plus a footer credit.
  A visitor must never be able to mistake a fictional business for a real one.
  Do not remove or soften these.
- **Copy stays inside what a real business could claim on day one** — no
  certifications, years of trading, customer counts or reviews.
- `demoPath` on the project in `src/data/projects.js` is what surfaces the
  concept in the portfolio. Setting it adds the buttons; nothing else to wire.

Portfolio images for a built concept are **captured from the running site**
(`npm run shots`), not drawn. `generate-mockups.mjs` deliberately omits any
concept that has graduated, so a placeholder cannot overwrite a screenshot.

### Styles

CSS is three files loaded in order from `main.jsx`, and order matters:

1. `base.css` — design tokens, reset, typography, `.container`/`.section`, `.reveal`
2. `components.css` — buttons, header, footer, forms
3. `blocks.css` — mockups, portfolio, pricing, process, page-hero

All colour, type and spacing values are custom properties at the top of
`base.css`. Change `--accent` there to re-tint the site. Dark sections use the
`--d-*` tokens via `.section--dark`.

## Conventions to follow

- **Every page** calls `useSeo({ title, description })` — unique per route.
- **Section content** is wrapped in `<Reveal>` (optionally `delay={n}` for a
  stagger). It merges an incoming `style` prop, so passing both `delay` and
  `style` is safe.
- **Screenshots** always go through `BrowserMockup` / `PhoneMockup` /
  `DeviceStage` from `components/Mockup.jsx`. Never put a bare `<img>` of a
  website into a page.
- **Headings**: exactly one `h1` per page, no skipped levels. `ProjectCard`
  takes `headingLevel` (`h2` on `/work` where cards are top-level, default `h3`
  under a section heading). CSS uses `.project :is(h2, h3)` so either works.
- **Copy voice**: short sentences, plain language, benefits over jargon. Banned:
  "world-class", "cutting-edge", "revolutionary", "leverage", "we are the best".
- **Spelling is South African/British** — optimisation, personalised, colour,
  organisation. Currency is `R4,500` format.

## Hard rules — do not break these

The business is new and the site's credibility rests on being honest about it.

1. **No fake testimonials, client logos, statistics, awards or reviews.** Not
   even as placeholder text. The About page says openly that the studio is new.
2. **The six portfolio items are concepts, not clients.** `type: 'Concept'`
   badges them "Made Digital Concept" everywhere and adds a "fictional
   business" note on the project page. Only set `type: 'Client'` for real work
   with permission.
3. **Never invent contact details.** `site.js` holds `PLACEHOLDER` values; the
   `hasRealContact` / `hasRealWhatsapp` flags drive visible "replace this"
   markers and keep the WhatsApp link inert until a real number is set.
4. **Do not make the site about technology.** No React/AI/stack talk in the
   copy. The customer cares about looking professional and getting enquiries.

## Gotchas already hit (don't reintroduce)

- **Netlify Forms need the field names declared twice.** Netlify's bot only
  parses static HTML, so each form has a hidden stub in `index.html` plus the
  real React form in `src/pages/`. Add a field to one → add it to the other, or
  it is silently dropped from submissions.
- **Forms only submit for real on Netlify.** `useFormSubmit` falls back to the
  success state in DEV; on the preview server it correctly shows the error
  state. A "success: FAIL" against `npm run preview` is expected, not a bug.
- **`Reveal` uses `threshold: 0`.** An element taller than the viewport can
  never reach a positive intersection ratio and would stay stuck at opacity 0.
- **The mobile drawer renders inside `<header>`.** `.header__inner` needs
  `position: relative; z-index: 100` or the drawer covers its own close button.
- **`.project__frame` has extra top padding** so the concept badge sits above
  the browser chrome instead of on top of its URL bar.
- **Project cards use a stretched link** (`.project__link::after` covers the
  card) so there is one tab stop. The focus ring is on the `::after`, not the
  anchor — a computed-style check on the anchor reports `outline: none`.
- **Screenshots without scrolling look broken.** Below-the-fold sections are
  `Reveal`-hidden until scrolled; scroll to the bottom and back before
  capturing, or use `fullPage`. Better: `reducedMotion: 'reduce'` on the
  Playwright context makes every reveal render immediately.
- **`fetchPriority` must be lowercase.** React 18 only passes through
  `fetchpriority`; the camelCase spelling logs a console warning.
- **In-page anchors are intercepted, not native.** `scrollToSection` in the
  concept's `Nav.jsx` waits two frames before scrolling, because the mobile
  drawer sets `body { overflow: hidden }` and a native jump would be clamped
  before React has unmounted the drawer and released it.
- **The concept nav runs out of room below ~560px.** The brand name is long, so
  the WhatsApp button drops its label and the logo wraps. Without that the
  burger gets pushed off the right edge — and page-level overflow checks do
  *not* catch it, because the nav clips rather than widening the document.
- **Scope heading rules with `:where()`.** `.ctp h2` is specificity (0,1,1) and
  silently beat `.ctp-footer__head` (0,1,0), rendering footer column headings at
  display size. Both concepts now use `.ctp :where(h2)` / `.so :where(h2)`,
  which still beats Made Digital's global `h2` but loses to any component class.
  Keep base heading rules above component rules in the file.
- **SVG grain needs an alpha matrix, not `mix-blend-mode`.** Blend modes do not
  composite in an `<img>`-loaded SVG. Studio Olive's texture comes from
  `feTurbulence` + `feColorMatrix` writing black with noise-driven alpha.
- **Generated artwork needs tight crops.** A small object floating in empty
  space reads as clip art; one that fills the frame and runs out of it reads as
  a photograph. Both asset scripts follow the same recipe — background tone,
  out-of-focus layer, surface, large sharp subject, cast shadow, light, grain.
- **Recolouring a scoped design system needs a rule-order pass, not just a
  token swap.** Editing `.ctp`'s custom properties left `.ctp-nav__link`,
  `.ctp-burger` and `.ctp-hero__note` unreadable, because their original
  light-context rules sit *after* the new dark-nav block and kept winning.
  After changing a palette, grep for `color:` in the file and check anything
  that now sits on a different ground.
- **Check contrast in the browser, not from the tokens.** A token-level sweep
  passed while three real pairs were failing on the page, exactly because of
  the rule-order problem above. `scratchpad/contrast.mjs` walks the rendered
  DOM, composites each element's real background, and applies the AA
  thresholds (3:1 for large text). The honeypot label it flags is a false
  positive — `.ctp-hp` is parked at `left: -9999px`.
- **Git Bash mangles `/path` arguments** into `C:/Program Files/Git/path`.
  Prefix commands with `MSYS_NO_PATHCONV=1` when passing a route as an argv.
- **`vite preview` does not fail loudly on a busy port** in a background task —
  check the task output, or an audit will silently hit a stale server.
- **A Playwright screenshot must scroll the page first.** Lazy images below the
  fold never load otherwise, and a full-page capture comes back with grey holes
  where the photographs should be. Scroll to the bottom, back to the top, wait
  for network idle, then capture.
- **`npm run shots` takes a slug.** `node scripts/capture-demo-shots.mjs <origin>
  <slug>` recaptures one concept, so adding a fifth does not rewrite the other
  four's images for no reason.
- **Do not rebuild while an audit is running.** `vite preview` serves `dist/`,
  so `npm run build` mid-run pulls the files out from under the browser and the
  audit dies on a navigation error that looks like a site fault.

## Verifying changes

Anything visual should be checked in a real browser, not reasoned about.
Playwright browsers are already installed on this machine:

```
C:/Users/melis/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe
```

Install `playwright-core` in the scratchpad (not in this project) and drive it
against `npm run preview`. The checks worth repeating after any layout change:

- **Horizontal overflow** at 320/375/390/414/768/1024/1440/1920 — the
  requirement is zero, on every route. Compare
  `documentElement.scrollWidth` to `clientWidth` and list offending elements.
- Console errors, page errors, failed requests
- Every internal `href` resolves to a page with an `h1`
- One `h1` per page, no skipped heading levels, no `img` without `alt`
- Drawer: scroll lock, Escape, close-on-navigate, close button visible
- Forms: empty submit focuses the first bad field; success and error panels
- `prefers-reduced-motion`: no hidden reveals, marquee animation `none`

## Known limitation

Client-rendered, so `useSeo` sets head tags in JavaScript. Google renders JS and
indexes fine. Social scrapers (WhatsApp, Facebook, LinkedIn) do not, so a shared
link to an inner page shows the homepage card from `index.html`. Accepted
trade-off; fix is build-time prerendering if it ever matters.
