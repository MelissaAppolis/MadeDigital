import { useState } from 'react'
import { useSeo } from '../../hooks/useSeo.js'
import Reveal from '../../components/Reveal.jsx'
import ConceptNotice from '../_shared/ConceptNotice.jsx'
import { useWebFont } from '../_shared/useWebFont.js'
import { scrollToSection } from '../_shared/scrollToSection.js'

import Nav from './Nav.jsx'
import Footer from './Footer.jsx'
import ServiceList from './ServiceList.jsx'
import EnquiryForm from './EnquiryForm.jsx'
import { businessConfig, conceptMeta, fontHref, images, whatsappHref } from './config.js'
import {
  faqs,
  heroRail,
  principles,
  process,
  projects,
  reasons,
} from './content.js'
import { ScrollMark, WhatsAppIcon } from './icons.jsx'

import './cape-build.css'

/* ---- Small local pieces -------------------------------------------------- */

const faqId = (text) =>
  `cb-faq-${text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`

function Faq({ item, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  const id = faqId(item.q)

  return (
    <div className="cb-faq__item" data-open={open}>
      <h3 style={{ margin: 0 }}>
        <button
          type="button"
          id={`${id}-q`}
          className="cb-faq__q"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((v) => !v)}
        >
          <span>{item.q}</span>
          <span className="cb-faq__sign" aria-hidden="true" />
        </button>
      </h3>
      <div className="cb-faq__a" id={id} role="region" aria-labelledby={`${id}-q`}>
        <div>
          <p>{item.a}</p>
        </div>
      </div>
    </div>
  )
}

/**
 * One showcase project. `layout` picks the composition — the three are
 * deliberately different, so the showcase never settles into a template.
 */
function Project({ project, eager = false }) {
  const meta = (
    <p className="cb-project__meta">
      <span>{project.index}</span>
      <span>{project.kind}</span>
      <span>{project.year}</span>
    </p>
  )

  const shot = (
    <figure className="cb-shot" style={{ margin: 0 }}>
      <img
        src={project.image.src}
        alt={project.image.alt}
        width="1600"
        height="1000"
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
    </figure>
  )

  if (project.layout === 'overlay') {
    return (
      <Reveal as="article" className="cb-project cb-project--overlay">
        {shot}
        <div className="cb-project__text">
          <div>
            {meta}
            <h3 style={{ marginTop: '0.75rem' }}>{project.name}</h3>
          </div>
          <div>
            <p className="cb-project__body">{project.body}</p>
            <p className="cb-project__scope" style={{ marginTop: '0.75rem' }}>
              {project.scope}
            </p>
          </div>
        </div>
      </Reveal>
    )
  }

  return (
    <Reveal
      as="article"
      className={`cb-project cb-project--${project.layout}`}
      delay={80}
    >
      {shot}
      <div className="cb-project__panel">
        {meta}
        <h3>{project.name}</h3>
        <p className="cb-project__body">{project.body}</p>
        <p className="cb-project__scope">{project.scope}</p>
      </div>
    </Reveal>
  )
}

/* ---- Page ---------------------------------------------------------------- */

export default function CapeBuild() {
  useSeo({
    title: 'Cape Build Co. | Residential Construction & Renovation Cape Town',
    description:
      'Cape Build Co. is a fictional Cape Town residential construction and renovation website concept by Made Digital.',
    image: '/assets/projects/cape-build-co/desktop.jpg',
  })
  useWebFont(fontHref)

  const jump = (event, href) => {
    event.preventDefault()
    scrollToSection(href)
  }

  return (
    <div className="cb">
      <a className="cb-skip" href="#top" onClick={(e) => jump(e, '#top')}>
        Skip to content
      </a>

      <ConceptNotice
        businessName={businessConfig.name}
        studioHref={conceptMeta.studioHref}
        caseStudyHref={conceptMeta.caseStudyHref}
      />
      <Nav />

      <main id="top" tabIndex={-1} style={{ outline: 'none' }}>
        {/* ---- Hero: one full-screen static photograph ---- */}
        <section className="cb-hero" aria-labelledby="cb-hero-title">
          <img
            className="cb-hero__img"
            src={images.hero.src}
            alt={images.hero.alt}
            width="2000"
            height="1125"
            // React 18 passes only the lowercase spelling through.
            fetchpriority="high"
            decoding="async"
          />

          <div className="cb-container cb-hero__inner">
            <p className="cb-label cb-hero__label">
              Cape Town · Residential Construction
            </p>
            <h1 id="cb-hero-title">{businessConfig.tagline}</h1>
            <p className="cb-hero__lede">
              Construction and renovation work designed around your home, your
              needs and your vision.
            </p>

            <div className="cb-btns cb-hero__actions">
              <a
                className="cb-btn cb-btn--light"
                href="#contact"
                onClick={(e) => jump(e, '#contact')}
              >
                Start a Project
              </a>
              <a
                className="cb-btn cb-btn--outline-light"
                href="#projects"
                onClick={(e) => jump(e, '#projects')}
              >
                View Our Work
              </a>
            </div>

            <p className="cb-hero__foot">
              <span>{businessConfig.locationNote}</span>
              <span>New homes · Renovations · Extensions</span>
              <ScrollMark />
            </p>
          </div>

          <p className="cb-hero__rail" aria-hidden="true">
            {heroRail.map((word) => (
              <span key={word}>{word}</span>
            ))}
          </p>
        </section>

        {/* ---- Statement ---- */}
        <section
          className="cb-section cb-dark"
          id="about"
          tabIndex={-1}
          aria-labelledby="cb-statement-title"
          style={{ outline: 'none' }}
        >
          <div className="cb-container">
            <Reveal className="cb-statement">
              <div>
                <p className="cb-label">Approach</p>
                <h2 id="cb-statement-title">
                  Good building starts long before construction begins.
                </h2>
              </div>
              <p className="cb-lede">
                We believe successful projects come from clear communication,
                careful planning and quality workmanship from start to finish.
              </p>
            </Reveal>

            <div className="cb-principles">
              {principles.map((principle, i) => (
                <Reveal
                  className="cb-principle"
                  key={principle.number}
                  delay={i * 90}
                >
                  <p className="cb-principle__num" aria-hidden="true">
                    {principle.number}
                  </p>
                  <h3>{principle.title}</h3>
                  <p>{principle.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Selected work ---- */}
        <section
          className="cb-section"
          id="projects"
          tabIndex={-1}
          aria-labelledby="cb-work-title"
          style={{ outline: 'none' }}
        >
          <div className="cb-container">
            <Reveal style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
              <p className="cb-label">Selected work</p>
              <h2 id="cb-work-title" style={{ maxWidth: '16ch' }}>
                Three recent residential projects.
              </h2>
            </Reveal>

            <div className="cb-work">
              {projects.map((project, i) => (
                <Project key={project.id} project={project} eager={i === 0} />
              ))}
            </div>

            <Reveal>
              <p
                className="cb-form__note"
                style={{ marginTop: 'clamp(2rem, 4vw, 3rem)' }}
              >
                Cape Build Co. is a website concept. The projects shown here are
                illustrative and are not real client work.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ---- Services ---- */}
        <section
          className="cb-section"
          id="services"
          tabIndex={-1}
          aria-labelledby="cb-services-title"
          style={{ outline: 'none', background: 'var(--cb-pale)' }}
        >
          <div className="cb-container">
            <Reveal style={{ marginBottom: 'clamp(2.5rem, 4vw, 3.5rem)' }}>
              <p className="cb-label">Services</p>
              <h2 id="cb-services-title" style={{ maxWidth: '14ch' }}>
                What we build.
              </h2>
            </Reveal>

            <Reveal delay={60}>
              <ServiceList />
            </Reveal>
          </div>
        </section>

        {/* ---- Built in Cape Town ---- */}
        <section className="cb-section" aria-labelledby="cb-city-title">
          <div className="cb-container">
            <Reveal
              style={{
                display: 'grid',
                gap: 'clamp(1.5rem, 3vw, 3rem)',
                marginBottom: 'clamp(2rem, 4vw, 3rem)',
              }}
            >
              <div>
                <p className="cb-label">The city</p>
                <h2 id="cb-city-title" style={{ maxWidth: '12ch' }}>
                  Built in Cape Town.
                </h2>
              </div>
              <p className="cb-lede">
                From the character of older Southern Suburbs homes to
                contemporary coastal architecture, every project responds to its
                surroundings.
              </p>
            </Reveal>
          </div>

          <Reveal className="cb-strip" delay={60}>
            {images.capeTown.map((shot) => (
              <figure key={shot.src}>
                <img
                  src={shot.src}
                  alt={shot.alt}
                  width="640"
                  height="800"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            ))}
          </Reveal>
        </section>

        {/* ---- Process ---- */}
        <section
          className="cb-section"
          id="process"
          tabIndex={-1}
          aria-labelledby="cb-process-title"
          style={{ outline: 'none' }}
        >
          <div className="cb-container">
            <Reveal style={{ marginBottom: 'clamp(3rem, 5vw, 4.5rem)' }}>
              <p className="cb-label">Process</p>
              <h2 id="cb-process-title" style={{ maxWidth: '18ch' }}>
                How a project runs.
              </h2>
            </Reveal>

            <ol className="cb-process">
              {process.map((step, i) => (
                <Reveal as="li" className="cb-step" key={step.number} delay={i * 70}>
                  <span className="cb-step__num" aria-hidden="true">
                    {step.number}
                  </span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ---- Why Cape Build Co. ---- */}
        <section className="cb-section cb-black" aria-labelledby="cb-why-title">
          <div className="cb-container">
            <Reveal style={{ marginBottom: 'clamp(2.5rem, 4vw, 3.5rem)' }}>
              <p className="cb-label">Why Cape Build Co.</p>
              <h2 id="cb-why-title" style={{ maxWidth: '14ch' }}>
                A better building experience.
              </h2>
            </Reveal>

            <div className="cb-reasons">
              {reasons.map((reason, i) => (
                <Reveal className="cb-reason" key={reason.title} delay={i * 70}>
                  <h3>{reason.title}</h3>
                  <p>{reason.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Details ---- */}
        <section className="cb-section" aria-labelledby="cb-details-title">
          <div className="cb-container">
            <div className="cb-details">
              <Reveal className="cb-detail cb-detail--a">
                <img
                  src={images.details.beams.src}
                  alt={images.details.beams.alt}
                  width="900"
                  height="1200"
                  loading="lazy"
                  decoding="async"
                />
              </Reveal>

              <Reveal className="cb-details__text" delay={60}>
                <p className="cb-label">Craft</p>
                <h2 id="cb-details-title">Details matter.</h2>
                <p className="cb-lede" style={{ marginTop: '1.25rem' }}>
                  The parts of a build you go on noticing years later are rarely
                  the big ones.
                </p>
              </Reveal>

              <Reveal className="cb-detail cb-detail--b" delay={100}>
                <img
                  src={images.details.timber.src}
                  alt={images.details.timber.alt}
                  width="700"
                  height="700"
                  loading="lazy"
                  decoding="async"
                />
              </Reveal>

              <Reveal className="cb-detail cb-detail--c" delay={140}>
                <img
                  src={images.details.concrete.src}
                  alt={images.details.concrete.alt}
                  width="900"
                  height="600"
                  loading="lazy"
                  decoding="async"
                />
              </Reveal>

              <Reveal className="cb-detail cb-detail--d" delay={180}>
                <img
                  src={images.details.fixture.src}
                  alt={images.details.fixture.alt}
                  width="900"
                  height="900"
                  loading="lazy"
                  decoding="async"
                />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---- Full-bleed CTA ---- */}
        <section className="cb-cta" aria-labelledby="cb-cta-title">
          <img
            className="cb-cta__img"
            src={images.cta.src}
            alt=""
            aria-hidden="true"
            width="2000"
            height="1000"
            loading="lazy"
            decoding="async"
          />
          <div className="cb-container">
            <Reveal>
              <p className="cb-label">Start here</p>
              <h2 id="cb-cta-title">Thinking about changing your home?</h2>
              <p className="cb-lede">
                Tell us what you’re planning and we’ll start the conversation.
              </p>
              <div className="cb-btns" style={{ marginTop: '2.25rem' }}>
                <a
                  className="cb-btn cb-btn--light"
                  href="#contact"
                  onClick={(e) => jump(e, '#contact')}
                >
                  Start Your Project
                </a>
                <a
                  className="cb-btn cb-btn--outline-light"
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon size={16} />
                  WhatsApp Us
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---- Enquiry ---- */}
        <section
          id="contact"
          tabIndex={-1}
          aria-labelledby="cb-contact-title"
          style={{ outline: 'none' }}
        >
          <div className="cb-enquiry">
            <div className="cb-enquiry__aside">
              <p className="cb-label">Enquiries</p>
              <h2 id="cb-contact-title" style={{ maxWidth: '12ch' }}>
                Tell us about your project.
              </h2>
              <p className="cb-lede" style={{ marginTop: '1.25rem' }}>
                The more you can tell us up front, the more useful our first
                conversation will be.
              </p>

              <dl style={{ margin: '2.25rem 0 0' }}>
                <div className="cb-detailrow">
                  <dt>Phone</dt>
                  <dd>
                    <a href={businessConfig.phoneHref}>
                      {businessConfig.phoneDisplay}
                    </a>
                  </dd>
                </div>
                <div className="cb-detailrow">
                  <dt>Email</dt>
                  <dd>
                    <a href={`mailto:${businessConfig.email}`}>
                      {businessConfig.email}
                    </a>
                  </dd>
                </div>
                <div className="cb-detailrow">
                  <dt>Area</dt>
                  <dd>{businessConfig.locationNote}</dd>
                </div>
                <div className="cb-detailrow">
                  <dt>Hours</dt>
                  <dd>
                    {businessConfig.hours.map((h) => (
                      <span key={h.days} style={{ display: 'block' }}>
                        {h.days} — {h.time}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="cb-enquiry__form">
              <EnquiryForm />
            </div>
          </div>
        </section>

        {/* ---- FAQ ---- */}
        <section
          className="cb-section"
          id="faqs"
          tabIndex={-1}
          aria-labelledby="cb-faq-title"
          style={{ outline: 'none' }}
        >
          <div className="cb-container">
            <Reveal style={{ marginBottom: 'clamp(2rem, 3vw, 3rem)' }}>
              <p className="cb-label">Questions</p>
              <h2 id="cb-faq-title" style={{ maxWidth: '16ch' }}>
                Before you get in touch.
              </h2>
            </Reveal>

            <Reveal className="cb-faq" delay={60}>
              {faqs.map((item, i) => (
                <Faq item={item} key={item.q} defaultOpen={i === 0} />
              ))}
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
