import { useState } from 'react'
import { useSeo } from '../../hooks/useSeo.js'
import Reveal from '../../components/Reveal.jsx'
import ConceptNotice from '../_shared/ConceptNotice.jsx'
import { useWebFont } from '../_shared/useWebFont.js'
import { scrollToSection } from '../_shared/scrollToSection.js'

import Nav from './Nav.jsx'
import Footer from './Footer.jsx'
import ServiceSelector from './ServiceSelector.jsx'
import ServiceMenu from './ServiceMenu.jsx'
import QuoteForm from './QuoteForm.jsx'
import {
  businessConfig,
  conceptMeta,
  fontHref,
  images,
  whatsappHref,
} from './config.js'
import {
  areas,
  benefits,
  businessPoints,
  comparisons,
  faqs,
  feedback,
  heroCard,
  residentialPoints,
  statements,
  steps,
} from './content.js'
import { ArrowIcon, CheckIcon, SparkIcon, WhatsAppIcon } from './icons.jsx'

import './clean-and-co.css'

/* ---- Small local pieces -------------------------------------------------- */

const faqId = (text) =>
  `cc-faq-${text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')}`

function Faq({ item, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  const id = faqId(item.q)

  return (
    <div className="cc-faq__item" data-open={open}>
      <h3>
        <button
          type="button"
          id={`${id}-q`}
          className="cc-faq__q"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((v) => !v)}
        >
          <span>{item.q}</span>
          <span className="cc-faq__sign" aria-hidden="true" />
        </button>
      </h3>
      <div className="cc-faq__a" id={id} role="region" aria-labelledby={`${id}-q`}>
        <div>
          <p>{item.a}</p>
        </div>
      </div>
    </div>
  )
}

/**
 * One before / after example.
 *
 * Two static photographs sitting side by side in a single frame, permanently
 * labelled. Deliberately NOT a slider: there is no handle to drag, nothing
 * cross-fades, and the comparison is fully readable in a screenshot, on a
 * phone, and with every animation switched off.
 */
function Comparison({ item, eager = false }) {
  return (
    <Reveal as="figure" className="cc-ba">
      <div className="cc-ba__pair">
        <div className="cc-ba__half">
          <img
            src={item.before.src}
            alt={item.before.alt}
            width="900"
            height="675"
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
          />
          <span className="cc-ba__tag cc-ba__tag--before">Before</span>
        </div>
        <div className="cc-ba__half">
          <img
            src={item.after.src}
            alt={item.after.alt}
            width="900"
            height="675"
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
          />
          <span className="cc-ba__tag cc-ba__tag--after">After</span>
        </div>
      </div>
      <figcaption className="cc-ba__caption">
        <h3>{item.room}</h3>
        <p>{item.note}</p>
      </figcaption>
    </Reveal>
  )
}

/* ---- Page ---------------------------------------------------------------- */

export default function CleanAndCo() {
  useSeo({
    title: 'Clean & Co. | Professional Cleaning Services Cape Town',
    description:
      'Clean & Co. is a fictional Cape Town cleaning service website concept by Made Digital, offering residential, commercial, deep and move-in cleaning.',
    image: '/assets/projects/clean-and-co/desktop.jpg',
  })
  useWebFont(fontHref)

  // Picking a service anywhere on the page preselects it in the quote form.
  const [service, setService] = useState('')

  const jump = (event, href) => {
    event.preventDefault()
    scrollToSection(href)
  }

  return (
    <div className="cc">
      <a className="cc-skip" href="#top" onClick={(e) => jump(e, '#top')}>
        Skip to content
      </a>

      <ConceptNotice
        businessName={businessConfig.name}
        studioHref={conceptMeta.studioHref}
        caseStudyHref={conceptMeta.caseStudyHref}
      />
      <Nav />

      <main id="top" tabIndex={-1} style={{ outline: 'none' }}>
        {/* ---- Hero: a bright canvas, with the photography set into it ---- */}
        <section className="cc-hero" aria-labelledby="cc-hero-title">
          <div className="cc-container">
            <p className="cc-pill cc-hero__pill">
              <span className="cc-dot" aria-hidden="true" />
              Serving Cape Town
            </p>

            <h1 id="cc-hero-title">
              A cleaner space.
              <span className="cc-hero__line2">A better day.</span>
            </h1>

            <div className="cc-hero__grid">
              <div className="cc-hero__left">
                <p className="cc-hero__lede">
                  Professional cleaning for homes, offices and everything in
                  between.
                </p>

                <div className="cc-btns">
                  <a
                    className="cc-btn cc-btn--lg"
                    href="#quote"
                    onClick={(e) => jump(e, '#quote')}
                  >
                    Get a Cleaning Quote
                    <ArrowIcon size={18} />
                  </a>
                  <a
                    className="cc-btn cc-btn--ghost cc-btn--lg"
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppIcon size={17} />
                    WhatsApp Us
                  </a>
                </div>

                <figure className="cc-hero__detail">
                  <img
                    src={images.heroDetail.src}
                    alt={images.heroDetail.alt}
                    width="800"
                    height="800"
                    // Hidden below 900px, so it never competes with the hero
                    // plate for bandwidth on a phone.
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              </div>

              <div className="cc-hero__stage">
                <figure className="cc-hero__shot">
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

                <div className="cc-hero__card">
                  <p className="cc-hero__card-title">
                    <SparkIcon size={18} />
                    {heroCard.location}
                  </p>
                  <p className="cc-hero__card-body">{heroCard.body}</p>
                  <ul className="cc-hero__chips">
                    {heroCard.chips.map((chip) => (
                      <li key={chip}>{chip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---- Quick service selector ---- */}
        <section
          className="cc-section cc-sand"
          id="needs"
          tabIndex={-1}
          aria-labelledby="cc-needs-title"
          style={{ outline: 'none' }}
        >
          <div className="cc-container">
            <Reveal className="cc-head">
              <h2 id="cc-needs-title">What needs cleaning?</h2>
              <p className="cc-lede">
                Pick the closest one. We will take it from there.
              </p>
            </Reveal>

            <Reveal delay={60}>
              <ServiceSelector />
            </Reveal>
          </div>
        </section>

        {/* ---- Value proposition ---- */}
        <section className="cc-section cc-green" aria-labelledby="cc-value-title">
          <div className="cc-container">
            <Reveal className="cc-value__head">
              <h2 id="cc-value-title">
                We handle the cleaning.
                <span>You get your time back.</span>
              </h2>
            </Reveal>

            <div className="cc-value">
              {benefits.map((benefit, i) => (
                <Reveal className="cc-value__item" key={benefit.id} delay={i * 80}>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Services ---- */}
        <section
          className="cc-section"
          id="services"
          tabIndex={-1}
          aria-labelledby="cc-services-title"
          style={{ outline: 'none' }}
        >
          <div className="cc-container">
            <Reveal className="cc-head cc-head--split">
              <h2 id="cc-services-title">Cleaning for real life.</h2>
              <p className="cc-lede">
                Six services covering the things people actually book — from a
                standing weekly clean to the one nobody wants to do themselves.
              </p>
            </Reveal>

            <Reveal delay={60}>
              <ServiceMenu onPick={setService} />
            </Reveal>
          </div>
        </section>

        {/* ---- Before & after ---- */}
        <section
          className="cc-section cc-ink"
          id="before-after"
          tabIndex={-1}
          aria-labelledby="cc-ba-title"
          style={{ outline: 'none' }}
        >
          <div className="cc-container">
            <Reveal className="cc-head cc-head--split">
              <div>
                <p className="cc-pill cc-pill--light">
                  Example cleaning transformations
                </p>
                <h2 id="cc-ba-title" style={{ marginTop: '1.25rem' }}>
                  See the difference.
                </h2>
              </div>
              <p className="cc-lede">
                Two photographs, side by side, nothing moving. Illustrative
                images for the concept rather than photographs of real jobs.
              </p>
            </Reveal>

            <div className="cc-ba-grid">
              {comparisons.map((item, i) => (
                <Comparison key={item.id} item={item} eager={i === 0} />
              ))}
            </div>
          </div>
        </section>

        {/* ---- How it works ---- */}
        <section
          className="cc-section"
          id="how-it-works"
          tabIndex={-1}
          aria-labelledby="cc-how-title"
          style={{ outline: 'none' }}
        >
          <div className="cc-container">
            <Reveal className="cc-head cc-head--split">
              <h2 id="cc-how-title">Booked in four steps.</h2>
              <p className="cc-lede">
                No account, no call centre, no waiting on hold to find out
                whether we cover your suburb.
              </p>
            </Reveal>

            <ol className="cc-steps">
              {steps.map((step, i) => (
                <Reveal
                  as="li"
                  className="cc-step"
                  key={step.number}
                  delay={i * 70}
                  style={{ '--i': i }}
                >
                  <span className="cc-step__num" aria-hidden="true">
                    {step.number}
                  </span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ---- Why Clean & Co. ---- */}
        <section
          className="cc-section cc-sand"
          id="about"
          tabIndex={-1}
          aria-labelledby="cc-about-title"
          style={{ outline: 'none' }}
        >
          <div className="cc-container">
            <Reveal className="cc-head">
              <h2 id="cc-about-title" className="cc-head__big">
                Cleaning should be the easy part.
              </h2>
              <p className="cc-lede">
                Clean &amp; Co. is built around the parts people complain about:
                not knowing who is coming, not knowing what is included, and
                chasing someone for a price.
              </p>
            </Reveal>

            <div className="cc-statements">
              {statements.map((statement, i) => (
                <Reveal
                  className="cc-statement"
                  key={statement.title}
                  delay={i * 70}
                >
                  <h3>{statement.title}</h3>
                  <p>{statement.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Residential ---- */}
        <section className="cc-section" aria-labelledby="cc-home-title">
          <div className="cc-container cc-duo">
            <Reveal className="cc-duo__media">
              <figure className="cc-frame">
                <img
                  src={images.residential.src}
                  alt={images.residential.alt}
                  width="1200"
                  height="1500"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <figure className="cc-frame cc-duo__inset">
                <img
                  src={images.linen.src}
                  alt={images.linen.alt}
                  width="800"
                  height="800"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </Reveal>

            <Reveal className="cc-duo__text" delay={80}>
              <h2 id="cc-home-title">Come home to clean.</h2>
              <p className="cc-lede">
                From weekly upkeep to a once-off deep clean, we help keep your
                home feeling fresh, comfortable and cared for.
              </p>

              <ul className="cc-ticks cc-ticks--lg">
                {residentialPoints.map((point) => (
                  <li key={point}>
                    <CheckIcon size={17} />
                    {point}
                  </li>
                ))}
              </ul>

              <a
                className="cc-btn cc-btn--lg"
                href="#quote"
                onClick={(e) => {
                  setService('residential')
                  jump(e, '#quote')
                }}
              >
                Book Home Cleaning
                <ArrowIcon size={18} />
              </a>
            </Reveal>
          </div>
        </section>

        {/* ---- Business ---- */}
        <section
          className="cc-section cc-green"
          aria-labelledby="cc-business-title"
        >
          <div className="cc-container">
            <Reveal className="cc-head cc-head--split">
              <h2 id="cc-business-title">A cleaner workplace.</h2>
              <div>
                <p className="cc-lede">
                  Give your team and customers a space that feels professional,
                  comfortable and cared for.
                </p>
                <a
                  className="cc-btn cc-btn--light"
                  href="#quote"
                  onClick={(e) => {
                    setService('office')
                    jump(e, '#quote')
                  }}
                  style={{ marginTop: '1.75rem' }}
                >
                  Request a Business Quote
                  <ArrowIcon size={18} />
                </a>
              </div>
            </Reveal>

            <Reveal className="cc-tags" as="ul" delay={60}>
              {businessPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </Reveal>

            <Reveal className="cc-frame cc-frame--wide" as="figure" delay={100}>
              <img
                src={images.business.src}
                alt={images.business.alt}
                width="1800"
                height="1013"
                loading="lazy"
                decoding="async"
              />
            </Reveal>
          </div>
        </section>

        {/* ---- Example feedback ---- */}
        <section className="cc-section" aria-labelledby="cc-feedback-title">
          <div className="cc-container">
            <Reveal className="cc-head">
              <p className="cc-pill">Example client feedback</p>
              <h2 id="cc-feedback-title" style={{ marginTop: '1.25rem' }}>
                What it should sound like.
              </h2>
              <p className="cc-lede">
                Clean &amp; Co. is a fictional business, so these are written
                examples of the feedback a service like this would aim for — not
                reviews from real customers.
              </p>
            </Reveal>

            <div className="cc-quotes">
              {feedback.map((item, i) => (
                <Reveal
                  as="figure"
                  className="cc-quote"
                  key={item.who}
                  delay={i * 80}
                >
                  <blockquote>
                    <p>{item.quote}</p>
                  </blockquote>
                  <figcaption>{item.who}</figcaption>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---- FAQ ---- */}
        <section
          className="cc-section cc-sand"
          id="faqs"
          tabIndex={-1}
          aria-labelledby="cc-faq-title"
          style={{ outline: 'none' }}
        >
          <div className="cc-container cc-faq-layout">
            <Reveal>
              <h2 id="cc-faq-title">Questions, answered.</h2>
              <p className="cc-lede">
                Anything else, send a WhatsApp — it is usually quicker than a
                form.
              </p>
              <a
                className="cc-btn cc-btn--ghost"
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginTop: '1.75rem' }}
              >
                <WhatsAppIcon size={16} />
                WhatsApp Us
              </a>
            </Reveal>

            <Reveal className="cc-faq" delay={60}>
              {faqs.map((item, i) => (
                <Faq item={item} key={item.q} defaultOpen={i === 0} />
              ))}
            </Reveal>
          </div>
        </section>

        {/* ---- Cape Town ---- */}
        <section className="cc-section" aria-labelledby="cc-city-title">
          <div className="cc-container">
            <Reveal className="cc-city">
              <img
                className="cc-city__img"
                src={images.capeTown.src}
                alt={images.capeTown.alt}
                width="1600"
                height="1067"
                loading="lazy"
                decoding="async"
              />
              <div className="cc-city__inner">
                <h2 id="cc-city-title">Proudly cleaning across Cape Town.</h2>
                <ul className="cc-city__areas">
                  {areas.map((area) => (
                    <li key={area}>{area}</li>
                  ))}
                </ul>
                <p className="cc-city__note">
                  Not sure whether we reach you? Ask — we will tell you straight.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---- Quote ---- */}
        <section
          className="cc-section cc-sand"
          id="quote"
          tabIndex={-1}
          aria-labelledby="cc-quote-title"
          style={{ outline: 'none' }}
        >
          <div className="cc-container cc-getquote">
            <Reveal className="cc-getquote__aside">
              <h2 id="cc-quote-title">Tell us what needs cleaning.</h2>
              <p className="cc-lede">
                Give us a few details and we will get back to you with the next
                step.
              </p>

              <dl className="cc-details">
                <div>
                  <dt>Phone</dt>
                  <dd>
                    <a href={businessConfig.phoneHref}>
                      {businessConfig.phoneDisplay}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>WhatsApp</dt>
                  <dd>
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {businessConfig.whatsappDisplay}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>
                    <a href={`mailto:${businessConfig.email}`}>
                      {businessConfig.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>Hours</dt>
                  <dd>
                    {businessConfig.hours.map((hour) => (
                      <span key={hour.days}>
                        {hour.days} — {hour.time}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </Reveal>

            <Reveal className="cc-getquote__panel" delay={80}>
              <QuoteForm service={service} onServiceChange={setService} />
            </Reveal>
          </div>
        </section>
      </main>

      {/* Phones only — the enquiry channel most people actually use. */}
      <a
        className="cc-float"
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
      >
        <WhatsAppIcon size={26} />
        <span className="cc-sr">WhatsApp Clean &amp; Co.</span>
      </a>

      <Footer />
    </div>
  )
}
