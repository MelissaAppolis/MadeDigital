import { useState } from 'react'
import { useSeo } from '../../hooks/useSeo.js'
import Reveal from '../../components/Reveal.jsx'
import ConceptNotice from '../_shared/ConceptNotice.jsx'

import Nav, { scrollToSection } from './Nav.jsx'
import Footer from './Footer.jsx'
import QuoteForm from './QuoteForm.jsx'
import { businessConfig, conceptMeta, whatsappHref } from './config.js'
import { areas, faqs, reasons, services, steps, trustPoints } from './content.js'
import {
  CheckIcon,
  ClockIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  WhatsAppIcon,
  serviceIcons,
} from './icons.jsx'

import './plumbing.css'

/* ---- Small local pieces -------------------------------------------------- */

/** Stable id from the question text — the FAQ list is static, so this is enough. */
const faqId = (text) =>
  `ctp-faq-${text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')}`

function Faq({ item, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  const id = faqId(item.q)

  return (
    <div className="ctp-faq__item" data-open={open}>
      <h3 style={{ margin: 0 }}>
        <button
          type="button"
          id={`${id}-q`}
          className="ctp-faq__q"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((v) => !v)}
        >
          <span>{item.q}</span>
          <span className="ctp-faq__sign" aria-hidden="true" />
        </button>
      </h3>
      <div className="ctp-faq__a" id={id} role="region" aria-labelledby={`${id}-q`}>
        <div>
          <p>{item.a}</p>
        </div>
      </div>
    </div>
  )
}

/* ---- Page ---------------------------------------------------------------- */

export default function CapeTownPlumbing() {
  useSeo({
    title: 'Cape Town Plumbing Co. | Reliable Plumbing Services',
    description:
      'Professional plumbing services across Cape Town including emergency plumbing, blocked drains, leak repairs, geyser services and installations.',
    image: '/assets/projects/cape-town-plumbing-co/desktop.jpg',
  })

  const jump = (event, href) => {
    event.preventDefault()
    scrollToSection(href)
  }

  return (
    <div className="ctp">
      <a className="ctp-skip" href="#top" onClick={(e) => jump(e, '#top')}>
        Skip to content
      </a>

      <ConceptNotice
        businessName={businessConfig.name}
        studioHref={conceptMeta.studioHref}
        caseStudyHref={conceptMeta.caseStudyHref}
      />
      <Nav />

      <main id="top" tabIndex={-1} style={{ outline: 'none' }}>
        {/* ---- Hero ---- */}
        <section className="ctp-hero">
          {/* Full-bleed backdrop. Two crops: wide for desktop, portrait for
              phones, where the wide one would zoom past the pipework. */}
          <picture className="ctp-hero__bg">
            <source
              media="(min-width: 760px)"
              srcSet={businessConfig.heroImageWide}
            />
            <img
              src={businessConfig.heroImage}
              alt={businessConfig.heroImageAlt}
              width="900"
              height="1200"
              // React 18 passes only the lowercase spelling through.
              fetchpriority="high"
              decoding="async"
            />
          </picture>

          <div className="ctp-container">
            <div className="ctp-hero__grid">
              <Reveal>
                <span className="ctp-eyebrow">Cape Town plumbing services</span>
                <h1>
                  Reliable plumbing. <em>Done right.</em>
                </h1>
                <p className="ctp-hero__lede">
                  From urgent leaks and blocked drains to installations and
                  maintenance, Cape Town Plumbing Co. provides professional
                  plumbing services for homes and businesses across Cape Town.
                </p>

                <div className="ctp-btns ctp-hero__actions">
                  <a
                    className="ctp-btn ctp-btn--lg"
                    href="#contact"
                    onClick={(e) => jump(e, '#contact')}
                  >
                    Get a Quote
                  </a>
                  <a
                    className="ctp-btn ctp-btn--wa ctp-btn--lg"
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppIcon size={19} />
                    WhatsApp Us
                  </a>
                </div>

                <p className="ctp-hero__note">
                  <ClockIcon size={17} />
                  Mon–Fri 07:00–17:00 · Saturdays 08:00–13:00 · Emergencies any
                  time
                </p>
              </Reveal>

              <Reveal delay={120} className="ctp-hero__visual">
                <div className="ctp-hero__card">
                  <div className="ctp-hero__cardrow">
                    <PhoneIcon size={19} />
                    <div>
                      <p className="ctp-hero__cardlabel">Call us</p>
                      <p className="ctp-hero__cardvalue">
                        <a href={businessConfig.phoneHref}>
                          {businessConfig.phoneDisplay}
                        </a>
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="ctp-hero__cardrow">
                    <PinIcon size={19} />
                    <div>
                      <p className="ctp-hero__cardlabel">Where we work</p>
                      <p className="ctp-hero__cardvalue">
                        Cape Town &amp; surrounding areas
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---- Trust strip ---- */}
        <section className="ctp-trust" aria-label="What we offer">
          <div className="ctp-container">
            <ul className="ctp-trust__list">
              {trustPoints.map((point) => (
                <li className="ctp-trust__item" key={point}>
                  <CheckIcon size={17} />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Waterline between the copper band and the services below it. */}
        <div className="ctp-wave" aria-hidden="true">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
            <path
              d="M0 34c120-30 240-30 360 0s240 30 360 0 240-30 360 0 240 30 360 0v26H0z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* ---- Services ---- */}
        <section
          className="ctp-section"
          id="services"
          tabIndex={-1}
          aria-labelledby="services-title"
          style={{ outline: 'none' }}
        >
          <div className="ctp-container">
            <Reveal className="ctp-head">
              <span className="ctp-eyebrow">Our services</span>
              <h2 id="services-title">
                Plumbing services for every situation
              </h2>
              <p className="ctp-lede">
                From everyday plumbing problems to larger installations, we help
                keep Cape Town homes and businesses running smoothly.
              </p>
            </Reveal>

            <Reveal className="ctp-services" delay={80}>
              {services.map((service) => {
                const Icon = serviceIcons[service.icon]
                return (
                  <article className="ctp-service" key={service.id}>
                    <span className="ctp-service__icon">
                      <Icon size={22} />
                    </span>
                    <h3>{service.title}</h3>
                    <p>{service.body}</p>
                  </article>
                )
              })}
            </Reveal>
          </div>
        </section>

        {/* ---- Why choose us ---- */}
        <section
          className="ctp-section ctp-section--tight"
          aria-labelledby="why-title"
        >
          <div className="ctp-container">
            <div className="ctp-why">
              <Reveal>
                <span className="ctp-eyebrow">Why choose us</span>
                <h2 id="why-title">A plumber you can count on.</h2>
                <p className="ctp-lede" style={{ marginTop: '1.25rem' }}>
                  Plumbing work is disruptive at the best of times. We try to
                  make it as straightforward as possible — clear about the
                  problem, clear about the cost, and tidy when we leave.
                </p>
                <div className="ctp-btns" style={{ marginTop: '2rem' }}>
                  <a
                    className="ctp-btn ctp-btn--accent"
                    href="#contact"
                    onClick={(e) => jump(e, '#contact')}
                  >
                    Request a Quote
                  </a>
                </div>

                <figure className="ctp-why__figure">
                  <img
                    src={businessConfig.workImage}
                    alt={businessConfig.workImageAlt}
                    width="1300"
                    height="867"
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              </Reveal>

              <Reveal className="ctp-reasons" delay={100}>
                {reasons.map((reason, i) => (
                  <div className="ctp-reason" key={reason.title}>
                    <p className="ctp-reason__num">0{i + 1}</p>
                    <h3>{reason.title}</h3>
                    <p>{reason.body}</p>
                  </div>
                ))}
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---- Emergency ---- */}
        <section
          className="ctp-section ctp-dark ctp-emergency"
          id="emergency"
          aria-labelledby="emergency-title"
        >
          {/* Pipework behind the urgent call-out — the section that most needs
              to look like the trade rather than like a coloured band. */}
          <img
            className="ctp-emergency__bg"
            src={businessConfig.bandImage}
            alt=""
            aria-hidden="true"
            width="2000"
            height="860"
            loading="lazy"
            decoding="async"
          />
          <div className="ctp-container">
            <div className="ctp-emergency__inner">
              <Reveal>
                <span className="ctp-pill">Urgent plumbing</span>
                <h2 id="emergency-title">Got a plumbing emergency?</h2>
                <p className="ctp-lede" style={{ marginTop: '1.25rem' }}>
                  Don’t let a small leak become a major problem. Get in touch
                  and we’ll help you determine the next step.
                </p>
                <p
                  className="ctp-lede"
                  style={{ marginTop: '1rem', fontSize: '0.9375rem' }}
                >
                  If water is running and you can reach your main stopcock,
                  close it before you call.
                </p>
              </Reveal>

              <Reveal className="ctp-emergency__actions" delay={100}>
                <a
                  className="ctp-btn ctp-btn--wa ctp-btn--lg ctp-btn--block"
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon size={19} />
                  WhatsApp Now
                </a>
                <a
                  className="ctp-btn ctp-btn--light ctp-btn--lg ctp-btn--block"
                  href={businessConfig.phoneHref}
                >
                  <PhoneIcon size={19} />
                  Call {businessConfig.phoneDisplay}
                </a>
                <p>Mon–Fri 07:00–17:00 · Emergencies any time</p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---- How it works ---- */}
        <section
          className="ctp-section ctp-section--tight"
          aria-labelledby="steps-title"
        >
          <div className="ctp-container">
            <Reveal className="ctp-head">
              <span className="ctp-eyebrow">How it works</span>
              <h2 id="steps-title">Three steps, no surprises.</h2>
            </Reveal>

            <Reveal className="ctp-steps" delay={80}>
              {steps.map((step) => (
                <div className="ctp-step" key={step.number}>
                  <p className="ctp-step__num">{step.number}</p>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ---- About ---- */}
        <section
          className="ctp-section ctp-surface"
          id="about"
          tabIndex={-1}
          aria-labelledby="about-title"
          style={{ outline: 'none' }}
        >
          <div className="ctp-container">
            <div className="ctp-about">
              <Reveal>
                <figure className="ctp-about__figure">
                  <img
                    src={businessConfig.aboutImage}
                    alt={businessConfig.aboutImageAlt}
                    width="1300"
                    height="867"
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              </Reveal>

              <Reveal delay={100}>
                <span className="ctp-eyebrow">About us</span>
                <h2 id="about-title">Local plumbers. Professional service.</h2>
                <p className="ctp-lede" style={{ marginTop: '1.25rem' }}>
                  Cape Town Plumbing Co. was created around a simple idea:
                  plumbing services should be professional, straightforward and
                  easy to access.
                </p>
                <ul className="ctp-about__list">
                  <li>
                    <CheckIcon size={17} />
                    Serving Cape Town and the surrounding areas
                  </li>
                  <li>
                    <CheckIcon size={17} />
                    Residential and commercial plumbing work
                  </li>
                  <li>
                    <CheckIcon size={17} />
                    Quotes explained before the work begins
                  </li>
                  <li>
                    <CheckIcon size={17} />
                    Contactable by phone or WhatsApp
                  </li>
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---- Service areas ---- */}
        <section
          className="ctp-section"
          id="areas"
          tabIndex={-1}
          aria-labelledby="areas-title"
          style={{ outline: 'none' }}
        >
          <div className="ctp-container">
            <Reveal className="ctp-head">
              <span className="ctp-eyebrow">Service areas</span>
              <h2 id="areas-title">Serving Cape Town and surrounding areas</h2>
            </Reveal>

            <Reveal className="ctp-areas" delay={80}>
              {areas.map((area) => (
                <div className="ctp-area" key={area.name}>
                  <PinIcon size={19} />
                  <div>
                    <h3>{area.name}</h3>
                    <p>{area.note}</p>
                  </div>
                </div>
              ))}
            </Reveal>

            <Reveal>
              <p className="ctp-areas__note">
                Not sure whether you fall inside our area?{' '}
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: 'var(--ctp-accent)',
                    fontWeight: 600,
                    textDecoration: 'underline',
                    textUnderlineOffset: '2px',
                  }}
                >
                  Send us a message
                </a>{' '}
                and we’ll let you know.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ---- FAQs ---- */}
        <section
          className="ctp-section ctp-surface"
          id="faqs"
          tabIndex={-1}
          aria-labelledby="faq-title"
          style={{ outline: 'none' }}
        >
          <div className="ctp-container">
            <Reveal className="ctp-head">
              <span className="ctp-eyebrow">FAQs</span>
              <h2 id="faq-title">Questions we get asked</h2>
            </Reveal>

            <Reveal className="ctp-faq" delay={80}>
              {faqs.map((item, i) => (
                <Faq item={item} key={item.q} defaultOpen={i === 0} />
              ))}
            </Reveal>
          </div>
        </section>

        {/* ---- Contact ---- */}
        <section
          className="ctp-section ctp-dark"
          id="contact"
          tabIndex={-1}
          aria-labelledby="contact-title"
          style={{ outline: 'none' }}
        >
          <div className="ctp-container">
            <div className="ctp-contact">
              <Reveal>
                <span className="ctp-eyebrow">Get in touch</span>
                <h2 id="contact-title">Let’s get your plumbing sorted.</h2>
                <p className="ctp-lede" style={{ marginTop: '1.25rem' }}>
                  Tell us what’s happening and we’ll come back to you with the
                  next step. For anything urgent, WhatsApp is the fastest way to
                  reach us.
                </p>

                <div className="ctp-details">
                  <div className="ctp-detail">
                    <PhoneIcon size={19} />
                    <div>
                      <p className="ctp-detail__label">Phone</p>
                      <p className="ctp-detail__value">
                        <a href={businessConfig.phoneHref}>
                          {businessConfig.phoneDisplay}
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="ctp-detail">
                    <WhatsAppIcon size={19} />
                    <div>
                      <p className="ctp-detail__label">WhatsApp</p>
                      <p className="ctp-detail__value">
                        <a
                          href={whatsappHref}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {businessConfig.whatsappDisplay}
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="ctp-detail">
                    <MailIcon size={19} />
                    <div>
                      <p className="ctp-detail__label">Email</p>
                      <p className="ctp-detail__value">
                        <a href={`mailto:${businessConfig.email}`}>
                          {businessConfig.email}
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="ctp-detail">
                    <ClockIcon size={19} />
                    <div>
                      <p className="ctp-detail__label">Hours</p>
                      <div className="ctp-detail__value">
                        {businessConfig.hours.map((h) => (
                          <span key={h.days}>
                            {h.days} — {h.time}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <QuoteForm />
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <a
        className="ctp-fab"
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
      >
        <WhatsAppIcon size={20} />
        WhatsApp
      </a>
    </div>
  )
}
