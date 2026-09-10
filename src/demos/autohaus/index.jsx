import { useState } from 'react'
import { useSeo } from '../../hooks/useSeo.js'
import Reveal from '../../components/Reveal.jsx'
import ConceptNotice from '../_shared/ConceptNotice.jsx'
import { useWebFont } from '../_shared/useWebFont.js'
import { scrollToSection } from '../_shared/scrollToSection.js'

import Nav from './Nav.jsx'
import Footer from './Footer.jsx'
import QuickAccess from './QuickAccess.jsx'
import ServiceDirectory from './ServiceDirectory.jsx'
import BookingForm from './BookingForm.jsx'
import {
  businessConfig,
  conceptMeta,
  fontHref,
  images,
  whatsappHref,
} from './config.js'
import {
  diagnosticsReadout,
  faqs,
  feedback,
  heroStrip,
  inspectionPoints,
  principles,
  serviceAreas,
  statements,
  vehicleTypes,
} from './content.js'
import { ArrowIcon, CheckIcon, PhoneIcon, WhatsAppIcon } from './icons.jsx'

import './autohaus.css'

/* ---- Small local pieces -------------------------------------------------- */

const faqId = (text) =>
  `ah-faq-${text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')}`

function Faq({ item, number, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  const id = faqId(item.q)

  return (
    <div className="ah-faq__item" data-open={open}>
      <h3>
        <button
          type="button"
          id={`${id}-q`}
          className="ah-faq__q"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="ah-mono ah-faq__num">{number}</span>
          <span className="ah-faq__text">{item.q}</span>
          <span className="ah-faq__sign" aria-hidden="true" />
        </button>
      </h3>
      <div className="ah-faq__a" id={id} role="region" aria-labelledby={`${id}-q`}>
        <div>
          <p>{item.a}</p>
        </div>
      </div>
    </div>
  )
}

/* ---- Page ---------------------------------------------------------------- */

export default function AutoHaus() {
  useSeo({
    title: 'AutoHaus Cape Town | Vehicle Servicing & Diagnostics',
    description:
      'AutoHaus Cape Town is a fictional automotive workshop website concept by Made Digital, showcasing vehicle servicing, diagnostics, repairs and inspections.',
    image: '/assets/projects/autohaus-cape-town/desktop.jpg',
  })
  useWebFont(fontHref)

  // Choosing a service anywhere on the page selects it in the directory and
  // arrives preselected in the booking form.
  const [service, setService] = useState('service')

  const jump = (event, href) => {
    event.preventDefault()
    scrollToSection(href)
  }

  return (
    <div className="ah">
      <a className="ah-skip" href="#top" onClick={(e) => jump(e, '#top')}>
        Skip to content
      </a>

      <ConceptNotice
        businessName={businessConfig.name}
        studioHref={conceptMeta.studioHref}
        caseStudyHref={conceptMeta.caseStudyHref}
      />
      <Nav />

      <main id="top" tabIndex={-1} style={{ outline: 'none' }}>
        {/* ---- Hero: a hard split, panel against photograph ---- */}
        <section className="ah-hero" aria-labelledby="ah-hero-title">
          <div className="ah-hero__split">
            <div className="ah-hero__panel">
              <p className="ah-mono ah-hero__eyebrow">
                {businessConfig.logo} <span>{businessConfig.logoSuffix}</span>
              </p>

              <h1 id="ah-hero-title">
                Know your car.
                <span>Trust the work.</span>
              </h1>

              <p className="ah-hero__lede">
                Professional servicing, diagnostics and repairs for modern
                vehicles.
              </p>

              <div className="ah-btns">
                <a
                  className="ah-btn ah-btn--lg"
                  href="#booking"
                  onClick={(e) => jump(e, '#booking')}
                >
                  Book a Service
                  <ArrowIcon size={18} />
                </a>
                <a
                  className="ah-btn ah-btn--ghost ah-btn--lg"
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon size={17} />
                  WhatsApp Us
                </a>
              </div>

              <p className="ah-mono ah-hero__foot">
                {businessConfig.address} · Independent workshop
              </p>
            </div>

            <figure className="ah-hero__shot">
              <img
                src={images.hero.src}
                alt={images.hero.alt}
                width="1600"
                height="1200"
                // React 18 passes only the lowercase spelling through.
                fetchpriority="high"
                decoding="async"
              />
            </figure>
          </div>

          {/* The strip sits across the seam, tying the two halves together. */}
          <ul className="ah-strip">
            {heroStrip.map((item) => (
              <li key={item.index}>
                <span className="ah-mono">{item.index}</span>
                {item.label}
              </li>
            ))}
            <li className="ah-strip__end">
              <a href={businessConfig.phoneHref}>
                <PhoneIcon size={15} />
                {businessConfig.phoneDisplay}
              </a>
            </li>
          </ul>
        </section>

        {/* ---- Quick service access ---- */}
        <section
          className="ah-section ah-section--flush ah-graphite"
          id="needs"
          tabIndex={-1}
          aria-labelledby="ah-needs-title"
          style={{ outline: 'none' }}
        >
          <div className="ah-container">
            <Reveal className="ah-head">
              <h2 id="ah-needs-title">What does your car need?</h2>
              <p className="ah-lede">
                Start with the closest one. Every option opens the full detail
                further down the page.
              </p>
            </Reveal>
          </div>

          <Reveal delay={60}>
            <QuickAccess onPick={setService} />
          </Reveal>
        </section>

        {/* ---- The workshop ---- */}
        <section
          className="ah-section"
          id="workshop"
          tabIndex={-1}
          aria-labelledby="ah-workshop-title"
          style={{ outline: 'none' }}
        >
          <div className="ah-container">
            <Reveal className="ah-head ah-head--split">
              <h2 id="ah-workshop-title" className="ah-head__big">
                Proper diagnostics.
                <span>Proper repairs.</span>
              </h2>
              <p className="ah-lede">
                We believe good automotive service starts with understanding the
                problem before replacing parts.
              </p>
            </Reveal>

            {/* A spec table, not three cards: one rule across the top and
                hairlines between the columns. */}
            <Reveal className="ah-principles" delay={60}>
              {principles.map((principle) => (
                <div className="ah-principle" key={principle.number}>
                  <p className="ah-mono ah-principle__head">
                    <span>{principle.number}</span>
                    {principle.title}
                  </p>
                  <p className="ah-principle__body">{principle.body}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ---- Service directory ---- */}
        <section
          className="ah-section ah-paper-2"
          id="services"
          tabIndex={-1}
          aria-labelledby="ah-services-title"
          style={{ outline: 'none' }}
        >
          <div className="ah-container">
            <Reveal className="ah-head ah-head--split">
              <h2 id="ah-services-title">Everything the workshop does.</h2>
              <p className="ah-lede">
                Pick a service to see what gets checked, what is included and
                who it is for.
              </p>
            </Reveal>

            <Reveal delay={60}>
              <ServiceDirectory active={service} onSelect={setService} />
            </Reveal>
          </div>
        </section>

        {/* ---- Diagnostics ---- */}
        <section
          className="ah-section ah-black"
          id="diagnostics"
          tabIndex={-1}
          aria-labelledby="ah-diag-title"
          style={{ outline: 'none' }}
        >
          <div className="ah-container">
            <Reveal>
              <h2 id="ah-diag-title" className="ah-diag__title">
                Don&rsquo;t guess.
                <span>Diagnose.</span>
              </h2>
            </Reveal>

            <div className="ah-diag">
              <Reveal className="ah-diag__shot ah-diag__shot--a" delay={60}>
                <img
                  src={images.diagnostics.tablet.src}
                  alt={images.diagnostics.tablet.alt}
                  width="900"
                  height="1200"
                  loading="lazy"
                  decoding="async"
                />
              </Reveal>

              <Reveal className="ah-diag__panel" delay={100}>
                <p className="ah-diag__lede">
                  Warning lights and strange noises don&rsquo;t always tell the
                  whole story. Proper diagnostics help identify what&rsquo;s
                  actually happening.
                </p>

                <dl className="ah-readout">
                  {diagnosticsReadout.map((row) => (
                    <div key={row.label}>
                      <dt className="ah-mono">{row.label}</dt>
                      <dd className="ah-mono">{row.value}</dd>
                    </div>
                  ))}
                </dl>

                <a
                  className="ah-btn ah-btn--block"
                  href="#booking"
                  onClick={(e) => {
                    setService('diagnostics')
                    jump(e, '#booking')
                  }}
                >
                  Book Diagnostics
                  <ArrowIcon size={17} />
                </a>
              </Reveal>

              <Reveal className="ah-diag__shot ah-diag__shot--b" delay={140}>
                <img
                  src={images.diagnostics.lights.src}
                  alt={images.diagnostics.lights.alt}
                  width="1200"
                  height="900"
                  loading="lazy"
                  decoding="async"
                />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---- Vehicle types: four panels, edge to edge ---- */}
        <section
          className="ah-section ah-section--flush ah-char"
          id="vehicles"
          tabIndex={-1}
          aria-labelledby="ah-vehicles-title"
          style={{ outline: 'none' }}
        >
          <div className="ah-container">
            <Reveal className="ah-head ah-head--split">
              <h2 id="ah-vehicles-title">Vehicles we work on.</h2>
              <p className="ah-lede">
                Categories rather than badges. Send us your vehicle details and
                we will confirm whether we can help.
              </p>
            </Reveal>
          </div>

          <Reveal className="ah-vehicles" delay={60}>
            {vehicleTypes.map((vehicle) => (
              <figure className="ah-vehicle" key={vehicle.id}>
                <img
                  src={vehicle.image.src}
                  alt={vehicle.image.alt}
                  width="900"
                  height="1125"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>
                  <h3>{vehicle.label}</h3>
                  <p>{vehicle.body}</p>
                </figcaption>
              </figure>
            ))}
          </Reveal>

          <div className="ah-container">
            <p className="ah-mono ah-vehicles__note">
              Independent workshop. Not affiliated with vehicle manufacturers.
            </p>
          </div>
        </section>

        {/* ---- Why AutoHaus ---- */}
        <section
          className="ah-section"
          id="why"
          tabIndex={-1}
          aria-labelledby="ah-why-title"
          style={{ outline: 'none' }}
        >
          <div className="ah-container">
            <Reveal className="ah-head">
              <h2 id="ah-why-title" className="ah-head__big">
                A workshop should make things clearer.
              </h2>
            </Reveal>

            <div className="ah-statements">
              {statements.map((statement, i) => (
                <Reveal
                  className="ah-statement"
                  key={statement.number}
                  delay={i * 60}
                >
                  <p className="ah-mono ah-statement__num">{statement.number}</p>
                  <h3>{statement.title}</h3>
                  <p className="ah-statement__body">{statement.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---- The workshop, photographed ---- */}
        <section className="ah-plate" aria-labelledby="ah-plate-title">
          <img
            src={images.workshop.src}
            alt={images.workshop.alt}
            width="1800"
            height="1013"
            loading="lazy"
            decoding="async"
          />
          <Reveal className="ah-plate__panel">
            <p className="ah-mono">The AutoHaus approach</p>
            <h2 id="ah-plate-title">
              Professional service without unnecessary complexity.
            </h2>
            <a
              className="ah-btn ah-btn--sm"
              href="#workshop"
              onClick={(e) => jump(e, '#workshop')}
            >
              Meet the Workshop
              <ArrowIcon size={16} />
            </a>
          </Reveal>
        </section>

        {/* ---- Pre-purchase inspection ---- */}
        <section
          className="ah-section ah-graphite"
          id="inspection"
          tabIndex={-1}
          aria-labelledby="ah-inspection-title"
          style={{ outline: 'none' }}
        >
          <div className="ah-container ah-inspection">
            <Reveal className="ah-inspection__text">
              <h2 id="ah-inspection-title">Buying a used car?</h2>
              <p className="ah-lede">
                A professional inspection can help you understand the condition
                of a vehicle before making a major purchase.
              </p>
              <a
                className="ah-btn ah-btn--lg"
                href="#booking"
                onClick={(e) => {
                  setService('inspection')
                  jump(e, '#booking')
                }}
              >
                Book an Inspection
                <ArrowIcon size={18} />
              </a>
              <figure className="ah-inspection__shot">
                <img
                  src={images.inspection.src}
                  alt={images.inspection.alt}
                  width="1200"
                  height="900"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </Reveal>

            {/* An inspection sheet rather than a bullet list. */}
            <Reveal className="ah-sheet" delay={80}>
              <p className="ah-sheet__head ah-mono">
                <span>Inspection points</span>
                <span>{String(inspectionPoints.length).padStart(2, '0')}</span>
              </p>
              <ul className="ah-sheet__list">
                {inspectionPoints.map((point, i) => (
                  <li key={point}>
                    <span className="ah-mono">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {point}
                    <CheckIcon size={15} />
                  </li>
                ))}
              </ul>
              <p className="ah-sheet__foot">
                Findings are photographed and explained, whichever way the answer
                goes.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ---- Example feedback ---- */}
        <section className="ah-section ah-paper-2" aria-labelledby="ah-feedback-title">
          <div className="ah-container">
            <Reveal className="ah-head ah-head--split">
              <div>
                <p className="ah-mono ah-tag">Example customer feedback</p>
                <h2 id="ah-feedback-title" style={{ marginTop: '1rem' }}>
                  What it should sound like.
                </h2>
              </div>
              <p className="ah-lede">
                AutoHaus Cape Town is a fictional business, so these are written
                examples of the feedback a workshop like this would aim for — not
                reviews from real customers.
              </p>
            </Reveal>

            <div className="ah-quotes">
              {feedback.map((item, i) => (
                <Reveal
                  as="figure"
                  className="ah-quote"
                  key={item.who}
                  delay={i * 70}
                >
                  <blockquote>
                    <p>{item.quote}</p>
                  </blockquote>
                  <figcaption className="ah-mono">{item.who}</figcaption>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Cape Town ---- */}
        <section className="ah-section" aria-labelledby="ah-city-title">
          <div className="ah-container ah-city">
            <Reveal className="ah-city__lead">
              <h2 id="ah-city-title">Keeping Cape Town moving.</h2>
              <p className="ah-lede">
                Professional automotive services for drivers across Cape Town —
                the daily commute, the school run, the long weekend up the coast.
              </p>
              {/* Named areas, not a pinned map — the business is fictional,
                  and a driver reads "is this near me?" off the area name. */}
              <div className="ah-areas">
                <p className="ah-mono ah-areas__head">Areas we draw from</p>
                <ul className="ah-areas__list">
                  {serviceAreas.map((area) => (
                    <li key={area.index}>
                      <span className="ah-mono">{area.index}</span>
                      {area.name}
                    </li>
                  ))}
                </ul>
                <p className="ah-areas__note">
                  Not sure whether you fall inside that? Send us the suburb and
                  we will tell you straight.
                </p>
              </div>

              <figure className="ah-city__detail">
                <img
                  src={images.capeTown.detail.src}
                  alt={images.capeTown.detail.alt}
                  width="800"
                  height="800"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </Reveal>

            <div className="ah-city__stack">
              <Reveal as="figure" className="ah-city__road" delay={60}>
                <img
                  src={images.capeTown.road.src}
                  alt={images.capeTown.road.alt}
                  width="1400"
                  height="933"
                  loading="lazy"
                  decoding="async"
                />
              </Reveal>
              <Reveal as="figure" className="ah-city__workshop" delay={100}>
                <img
                  src={images.capeTown.workshop.src}
                  alt={images.capeTown.workshop.alt}
                  width="1000"
                  height="750"
                  loading="lazy"
                  decoding="async"
                />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---- Booking ---- */}
        <section
          className="ah-section ah-char"
          id="booking"
          tabIndex={-1}
          aria-labelledby="ah-booking-title"
          style={{ outline: 'none' }}
        >
          <div className="ah-container">
            <Reveal className="ah-console">
              <div className="ah-console__head">
                <div>
                  <p className="ah-mono ah-tag ah-tag--light">Booking request</p>
                  <h2 id="ah-booking-title" style={{ marginTop: '0.875rem' }}>
                    Book your visit.
                  </h2>
                </div>
                <p className="ah-lede">
                  Tell us what the vehicle is doing and when suits you. We will
                  come back to confirm.
                </p>
              </div>

              <div className="ah-console__body">
                <BookingForm service={service} onServiceChange={setService} />
              </div>

              <div className="ah-console__foot">
                <a href={businessConfig.phoneHref}>
                  <span className="ah-mono">Call</span>
                  {businessConfig.phoneDisplay}
                </a>
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  <span className="ah-mono">WhatsApp</span>
                  {businessConfig.whatsappDisplay}
                </a>
                <span>
                  <span className="ah-mono">Hours</span>
                  {businessConfig.hours
                    .map((hour) => `${hour.days} ${hour.time}`)
                    .join(' · ')}
                </span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---- FAQ ---- */}
        <section
          className="ah-section"
          id="faqs"
          tabIndex={-1}
          aria-labelledby="ah-faq-title"
          style={{ outline: 'none' }}
        >
          <div className="ah-container">
            <Reveal className="ah-head ah-head--split">
              <h2 id="ah-faq-title">Before you book.</h2>
              <p className="ah-lede">
                Anything not covered here, send a WhatsApp with your vehicle
                details and we will answer straight.
              </p>
            </Reveal>

            <Reveal className="ah-faq" delay={60}>
              {faqs.map((item, i) => (
                <Faq
                  item={item}
                  key={item.q}
                  number={String(i + 1).padStart(2, '0')}
                  defaultOpen={i === 0}
                />
              ))}
            </Reveal>
          </div>
        </section>

        {/* ---- Closing ---- */}
        <section className="ah-close" aria-labelledby="ah-close-title">
          <div className="ah-container">
            <Reveal className="ah-close__inner">
              <h2 id="ah-close-title">
                Your car deserves better than guesswork.
              </h2>
              <p className="ah-lede">
                Book your next service or talk to us about what your vehicle
                needs.
              </p>
              <div className="ah-btns">
                <a
                  className="ah-btn ah-btn--lg"
                  href="#booking"
                  onClick={(e) => jump(e, '#booking')}
                >
                  Book a Service
                  <ArrowIcon size={18} />
                </a>
                <a
                  className="ah-btn ah-btn--ghost ah-btn--lg"
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon size={17} />
                  WhatsApp Us
                </a>
              </div>
            </Reveal>
          </div>

          <img
            className="ah-close__strip"
            src={images.ctaStrip.src}
            alt=""
            aria-hidden="true"
            width="2000"
            height="600"
            loading="lazy"
            decoding="async"
          />
        </section>
      </main>

      {/* Phones only — the channel most people actually use. */}
      <a
        className="ah-float"
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
      >
        <WhatsAppIcon size={24} />
        <span className="ah-sr">WhatsApp AutoHaus Cape Town</span>
      </a>

      <Footer />
    </div>
  )
}
