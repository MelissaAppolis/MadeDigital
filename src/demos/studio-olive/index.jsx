import { useEffect, useState } from 'react'
import { useSeo } from '../../hooks/useSeo.js'
import Reveal from '../../components/Reveal.jsx'
import ConceptNotice from '../_shared/ConceptNotice.jsx'
import { useWebFont } from '../_shared/useWebFont.js'
import { scrollToSection } from '../_shared/scrollToSection.js'

import Nav from './Nav.jsx'
import Footer from './Footer.jsx'
import TreatmentMenu from './TreatmentMenu.jsx'
import Gallery from './Gallery.jsx'
import BookingForm from './BookingForm.jsx'
import { businessConfig, conceptMeta, fontHref, whatsappHref } from './config.js'
import { benefits, faqs, social, testimonials } from './content.js'
import {
  ClockIcon,
  InstagramIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  Sprig,
  WhatsAppIcon,
} from './icons.jsx'

import './studio-olive.css'

/* ---- Small local pieces -------------------------------------------------- */

const faqId = (text) =>
  `so-faq-${text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`

function Faq({ item, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  const id = faqId(item.q)

  return (
    <div className="so-faq__item" data-open={open}>
      <h3 style={{ margin: 0 }}>
        <button
          type="button"
          id={`${id}-q`}
          className="so-faq__q"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((v) => !v)}
        >
          <span>{item.q}</span>
          <span className="so-faq__sign" aria-hidden="true" />
        </button>
      </h3>
      <div className="so-faq__a" id={id} role="region" aria-labelledby={`${id}-q`}>
        <div>
          <p>{item.a}</p>
        </div>
      </div>
    </div>
  )
}

/** Shows the booking bar once the hero is behind you, hides it at the form. */
function useStickyBar() {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const contact = document.getElementById('contact')
      const pastHero = window.scrollY > window.innerHeight * 0.7
      const atForm = contact
        ? contact.getBoundingClientRect().top < window.innerHeight * 0.85
        : false
      setShown(pastHero && !atForm)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return shown
}

/* ---- Page ---------------------------------------------------------------- */

export default function StudioOlive() {
  useSeo({
    title: 'Studio Olive Beauty | Beauty Studio Cape Town',
    description:
      'A boutique beauty studio in Cape Town offering facials, nails, brows, lashes and personalised beauty treatments.',
    image: '/assets/projects/studio-olive-beauty/desktop.jpg',
  })
  useWebFont(fontHref)

  const [treatment, setTreatment] = useState('')
  const stickyShown = useStickyBar()

  const jump = (event, href) => {
    event.preventDefault()
    scrollToSection(href)
  }

  return (
    <div className="so">
      <a className="so-skip" href="#top" onClick={(e) => jump(e, '#top')}>
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
        <section className="so-hero">
          <div className="so-container">
            <div className="so-hero__grid">
              <Reveal>
                <span className="so-label">Studio Olive Beauty</span>
                <h1>
                  Beauty,{' '}
                  <em>thoughtfully</em> done.
                </h1>
                <p className="so-hero__lede">
                  Beauty treatments designed around you, in a calm and welcoming
                  Cape Town studio.
                </p>

                <div className="so-btns so-hero__actions">
                  <a
                    className="so-btn"
                    href="#contact"
                    onClick={(e) => jump(e, '#contact')}
                  >
                    Book an Appointment
                  </a>
                  <a
                    className="so-btn so-btn--outline"
                    href="#treatments"
                    onClick={(e) => jump(e, '#treatments')}
                  >
                    Explore Treatments
                  </a>
                </div>

                <ul className="so-hero__meta">
                  <li>{businessConfig.area}</li>
                  <li>Tue–Sat by appointment</li>
                  <li>Facials · Nails · Brows &amp; lashes</li>
                </ul>
              </Reveal>

              <Reveal delay={140} className="so-hero__visual">
                <figure className="so-arch so-hero__figure">
                  <img
                    src={businessConfig.images.hero}
                    alt="The treatment room at Studio Olive, lit warm and low"
                    width="1100"
                    height="1375"
                    fetchpriority="high"
                    decoding="async"
                  />
                </figure>
                <div className="so-stamp" aria-hidden="true">
                  A little
                  <br />
                  time for
                  <br />
                  you
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---- Intro ---- */}
        <section className="so-section so-cream" aria-labelledby="intro-title">
          <div className="so-container">
            <div className="so-intro">
              <Reveal className="so-intro__images">
                <figure className="so-arch so-intro__large">
                  <img
                    src={businessConfig.images.introLarge}
                    alt="A made-up treatment table in a quiet, uncluttered room"
                    width="1100"
                    height="1375"
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
                <figure className="so-frame so-intro__small">
                  <img
                    src={businessConfig.images.introSmall}
                    alt="A serum bottle and a sprig of eucalyptus on marble"
                    width="900"
                    height="900"
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              </Reveal>

              <Reveal delay={120}>
                <Sprig className="so-sprig" />
                <h2 id="intro-title">A little time for you.</h2>
                <p className="so-lede" style={{ marginTop: '1.5rem' }}>
                  Studio Olive Beauty is a boutique beauty space created for
                  those who appreciate thoughtful treatments, beautiful
                  surroundings and a little time to slow down.
                </p>
                <div className="so-btns" style={{ marginTop: '2.25rem' }}>
                  <a
                    className="so-link"
                    href="#treatments"
                    onClick={(e) => jump(e, '#treatments')}
                  >
                    See the treatment menu &rarr;
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---- Treatments ---- */}
        <section
          className="so-section"
          id="treatments"
          tabIndex={-1}
          aria-labelledby="treatments-title"
          style={{ outline: 'none' }}
        >
          <div className="so-container">
            <Reveal style={{ marginBottom: 'clamp(2.5rem, 4vw, 3.5rem)' }}>
              <span className="so-label">Treatments</span>
              <h2 id="treatments-title" style={{ maxWidth: '15ch' }}>
                Treatments designed around you
              </h2>
              <p className="so-lede" style={{ marginTop: '1.5rem' }}>
                From skin and beauty essentials to moments of relaxation, choose
                a treatment that leaves you feeling your best.
              </p>
            </Reveal>

            <Reveal delay={80}>
              <TreatmentMenu onBook={setTreatment} />
            </Reveal>
          </div>
        </section>

        {/* ---- Booking band ---- */}
        <section className="so-band" aria-labelledby="band-title">
          <img
            className="so-band__bg"
            src={businessConfig.images.band}
            alt=""
            aria-hidden="true"
            width="2000"
            height="860"
            loading="lazy"
            decoding="async"
          />
          <div className="so-container">
            <Reveal className="so-band__inner">
              <Sprig className="so-sprig" size={52} />
              <h2 id="band-title" style={{ color: 'var(--so-d-text)' }}>
                Ready for a little time to yourself?
              </h2>
              <p className="so-lede">
                Choose your treatment and get in touch to book your appointment.
              </p>
              <div
                className="so-btns"
                style={{ justifyContent: 'center', marginTop: '0.75rem' }}
              >
                <a
                  className="so-btn so-btn--light"
                  href="#contact"
                  onClick={(e) => jump(e, '#contact')}
                >
                  Book an Appointment
                </a>
                <a
                  className="so-btn so-btn--outline-light"
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon />
                  WhatsApp Us
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---- Why Studio Olive ---- */}
        <section className="so-section" aria-labelledby="why-title">
          <div className="so-container">
            <Reveal style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
              <span className="so-label">Why Studio Olive</span>
              <h2 id="why-title" style={{ maxWidth: '14ch' }}>
                The Studio Olive experience
              </h2>
            </Reveal>

            <div className="so-benefits">
              {benefits.map((benefit, i) => (
                <Reveal className="so-benefit" key={benefit.title} delay={i * 80}>
                  <p className="so-benefit__num">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Gallery ---- */}
        <section
          className="so-section so-cream"
          id="gallery"
          tabIndex={-1}
          aria-labelledby="gallery-title"
          style={{ outline: 'none' }}
        >
          <div className="so-container">
            <Reveal style={{ marginBottom: 'clamp(2.5rem, 4vw, 3.5rem)' }}>
              <span className="so-label">Gallery</span>
              <h2 id="gallery-title">A space to slow down.</h2>
            </Reveal>
            <Reveal delay={80}>
              <Gallery />
            </Reveal>
          </div>
        </section>

        {/* ---- About ---- */}
        <section
          className="so-section"
          id="about"
          tabIndex={-1}
          aria-labelledby="about-title"
          style={{ outline: 'none' }}
        >
          <div className="so-container">
            <div className="so-about">
              <Reveal>
                <figure className="so-arch so-about__figure">
                  <img
                    src={businessConfig.images.about}
                    alt="A rolled towel and treatment oils set out for an appointment"
                    width="1000"
                    height="1333"
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              </Reveal>

              <Reveal delay={120}>
                <span className="so-label">About</span>
                <h2 id="about-title">Beauty with intention.</h2>
                <p className="so-lede" style={{ marginTop: '1.5rem' }}>
                  Studio Olive was created for women who want their beauty
                  appointments to feel like more than another item on the
                  calendar. Every detail is considered — from the atmosphere to
                  the treatment itself.
                </p>
                <div className="so-btns" style={{ marginTop: '2.25rem' }}>
                  <a
                    className="so-btn so-btn--outline"
                    href="#contact"
                    onClick={(e) => jump(e, '#contact')}
                  >
                    Book an Appointment
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---- Testimonials ---- */}
        <section className="so-section so-cream" aria-labelledby="quotes-title">
          <div className="so-container">
            <Reveal style={{ marginBottom: 'clamp(2.5rem, 4vw, 3.5rem)' }}>
              <span className="so-label">Example client feedback</span>
              <h2 id="quotes-title" style={{ maxWidth: '17ch' }}>
                What an appointment feels like
              </h2>
            </Reveal>

            <div className="so-quotes">
              {testimonials.map((item, i) => (
                <Reveal
                  as="figure"
                  className="so-quote"
                  key={item.name}
                  delay={i * 90}
                  style={{ margin: 0 }}
                >
                  <span className="so-quote__mark" aria-hidden="true">
                    &ldquo;
                  </span>
                  <blockquote>{item.quote}</blockquote>
                  <figcaption>
                    {item.name} — {item.place}
                  </figcaption>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <p className="so-note">
                These are written examples showing how client feedback would
                appear, not reviews from real customers. Studio Olive is a
                website concept, so it has none — a live site would replace them
                with genuine ones.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ---- Social ---- */}
        <section className="so-section so-section--tight" aria-labelledby="social-title">
          <div className="so-container">
            <Reveal
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'end',
                justifyContent: 'space-between',
                gap: '1.5rem',
                marginBottom: '2rem',
              }}
            >
              <div>
                <span className="so-label">{businessConfig.instagramHandle}</span>
                <h2 id="social-title">Follow the studio</h2>
              </div>
              <a
                className="so-btn so-btn--outline so-btn--sm"
                href={businessConfig.instagramUrl}
                aria-label="Instagram — placeholder link, no account is set up"
              >
                <InstagramIcon />
                Instagram
              </a>
            </Reveal>

            <Reveal className="so-social" delay={80}>
              {social.map((item) => (
                <figure key={item.src}>
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ---- FAQs ---- */}
        <section
          className="so-section so-cream"
          id="faqs"
          tabIndex={-1}
          aria-labelledby="faq-title"
          style={{ outline: 'none' }}
        >
          <div className="so-container so-narrow">
            <Reveal style={{ marginBottom: 'clamp(2rem, 3vw, 3rem)' }}>
              <span className="so-label">FAQs</span>
              <h2 id="faq-title">Before you visit</h2>
            </Reveal>

            <Reveal className="so-faq" delay={80}>
              {faqs.map((item, i) => (
                <Faq item={item} key={item.q} defaultOpen={i === 0} />
              ))}
            </Reveal>
          </div>
        </section>

        {/* ---- Booking ---- */}
        <section
          className="so-section"
          id="contact"
          tabIndex={-1}
          aria-labelledby="contact-title"
          style={{ outline: 'none' }}
        >
          <div className="so-container">
            <div className="so-book">
              <Reveal>
                <span className="so-label">Bookings</span>
                <h2 id="contact-title">Let’s book your moment.</h2>
                <p className="so-lede" style={{ marginTop: '1.5rem' }}>
                  Send your details and the treatment you would like, and we
                  will confirm a time. WhatsApp is the quickest way to reach us.
                </p>

                <div className="so-btns" style={{ marginTop: '2rem' }}>
                  <a
                    className="so-btn so-btn--outline"
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppIcon />
                    WhatsApp Us
                  </a>
                </div>

                <div className="so-details">
                  <div>
                    <p className="so-detail__label">
                      <PhoneIcon size={13} /> Phone
                    </p>
                    <p className="so-detail__value">
                      <a href={businessConfig.phoneHref}>
                        {businessConfig.phoneDisplay}
                      </a>
                    </p>
                  </div>
                  <div>
                    <p className="so-detail__label">
                      <MailIcon size={13} /> Email
                    </p>
                    <p className="so-detail__value">
                      <a href={`mailto:${businessConfig.email}`}>
                        {businessConfig.email}
                      </a>
                    </p>
                  </div>
                  <div>
                    <p className="so-detail__label">
                      <PinIcon size={13} /> Studio
                    </p>
                    <p className="so-detail__value">
                      {businessConfig.area}
                      <span>{businessConfig.locationNote}</span>
                    </p>
                  </div>
                  <div>
                    <p className="so-detail__label">
                      <ClockIcon size={13} /> Hours
                    </p>
                    <div className="so-detail__value">
                      {businessConfig.hours.map((h) => (
                        <span key={h.days}>
                          {h.days} — {h.time}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={120}>
                <BookingForm
                  treatment={treatment}
                  onTreatmentChange={setTreatment}
                />
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Sticky booking bar, phones only. */}
      <div className={`so-sticky${stickyShown ? ' is-shown' : ''}`}>
        <a
          className="so-btn"
          href="#contact"
          onClick={(e) => jump(e, '#contact')}
        >
          Book Appointment
        </a>
        <a
          className="so-btn so-btn--outline"
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Message the studio on WhatsApp"
        >
          <WhatsAppIcon />
        </a>
      </div>
    </div>
  )
}
