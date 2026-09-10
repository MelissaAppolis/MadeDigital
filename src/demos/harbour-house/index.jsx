import { useState } from 'react'
import { useSeo } from '../../hooks/useSeo.js'
import Reveal from '../../components/Reveal.jsx'
import ConceptNotice from '../_shared/ConceptNotice.jsx'
import { useWebFont } from '../_shared/useWebFont.js'
import { scrollToSection } from '../_shared/scrollToSection.js'

import Nav from './Nav.jsx'
import Footer from './Footer.jsx'
import BookingBar from './BookingBar.jsx'
import Rooms from './Rooms.jsx'
import RoomDialog from './RoomDialog.jsx'
import Experience from './Experience.jsx'
import EnquiryForm from './EnquiryForm.jsx'
import {
  businessConfig,
  conceptMeta,
  fontHref,
  images,
  whatsappHref,
} from './config.js'
import {
  breakfastItems,
  destinations,
  faqs,
  feedback,
  littleThings,
  roomById,
} from './content.js'
import { ArrowIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from './icons.jsx'

import './harbour-house.css'

/* ---- Small local pieces -------------------------------------------------- */

const faqId = (text) =>
  `hh-faq-${text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')}`

function Faq({ item, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  const id = faqId(item.q)

  return (
    <div className="hh-faq__item" data-open={open}>
      <h3>
        <button
          type="button"
          id={`${id}-q`}
          className="hh-faq__q"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((v) => !v)}
        >
          <span>{item.q}</span>
          <span className="hh-faq__sign" aria-hidden="true" />
        </button>
      </h3>
      <div className="hh-faq__a" id={id} role="region" aria-labelledby={`${id}-q`}>
        <div>
          <p>{item.a}</p>
        </div>
      </div>
    </div>
  )
}

/* ---- Page ---------------------------------------------------------------- */

export default function HarbourHouse() {
  useSeo({
    title: 'Harbour House | Boutique Guesthouse in Cape Town',
    description:
      'Harbour House is a fictional Cape Town guesthouse website concept by Made Digital, showing boutique accommodation, rooms, local experiences and direct booking enquiries.',
    image: '/assets/projects/harbour-house/desktop.jpg',
  })
  useWebFont(fontHref)

  // One stay, shared by the hero booking bar, each room's enquiry button and
  // the enquiry form at the bottom of the page.
  const [stay, setStay] = useState({
    checkIn: '',
    checkOut: '',
    guests: '2',
    room: '',
  })
  const [openRoom, setOpenRoom] = useState(null)

  const jump = (event, href) => {
    event.preventDefault()
    scrollToSection(href)
  }

  const enquireAbout = (roomId) => setStay((s) => ({ ...s, room: roomId }))

  return (
    <div className="hh">
      <a className="hh-skip" href="#top" onClick={(e) => jump(e, '#top')}>
        Skip to content
      </a>

      <ConceptNotice
        businessName={businessConfig.name}
        studioHref={conceptMeta.studioHref}
        caseStudyHref={conceptMeta.caseStudyHref}
      />
      <Nav />

      <main id="top" tabIndex={-1} style={{ outline: 'none' }}>
        {/* ---- Hero: the photograph inset in the page, booking bar across
             its lower edge. Not full-bleed, so the page frames it. ---- */}
        <section className="hh-hero" aria-labelledby="hh-hero-title">
          <div className="hh-shell">
            <div className="hh-hero__head">
              <p className="hh-eyebrow hh-hero__brand">{businessConfig.logo}</p>
              <h1 id="hh-hero-title">
                Stay close to the city.
                <span>Feel away from it all.</span>
              </h1>
              <p className="hh-hero__lede">{businessConfig.supporting}</p>
              <p className="hh-hero__where">
                <PinIcon size={14} />
                {businessConfig.region}
              </p>
            </div>

            <div className="hh-hero__frame">
              <figure className="hh-hero__shot">
                <img
                  src={images.hero.src}
                  alt={images.hero.alt}
                  width="1800"
                  height="1125"
                  // React 18 passes only the lowercase spelling through.
                  fetchpriority="high"
                  decoding="async"
                />
              </figure>

              <BookingBar stay={stay} onStayChange={setStay} />
            </div>

            <p className="hh-hero__note">
              A website concept — enquiries are answered by a person, not by a
              live booking system.
            </p>
          </div>
        </section>

        {/* ---- Introduction ---- */}
        <section
          className="hh-section"
          id="stay"
          tabIndex={-1}
          aria-labelledby="hh-stay-title"
          style={{ outline: 'none' }}
        >
          <div className="hh-shell hh-intro">
            <Reveal className="hh-intro__text">
              <p className="hh-eyebrow">{businessConfig.country}</p>
              <h2 id="hh-stay-title" className="hh-display">
                A quieter way to experience Cape Town.
              </h2>
              <p className="hh-lede">
                Harbour House is designed for travellers who want to explore
                Cape Town by day and return to somewhere comfortable, calm and
                personal at night.
              </p>
              <p className="hh-prose">
                Three rooms, a garden, a good breakfast and people who will tell
                you where to go. Small enough that we know who is staying, and
                close enough that you can walk to most of what you came for.
              </p>
              <a
                className="hh-link"
                href="#rooms"
                onClick={(e) => jump(e, '#rooms')}
              >
                Explore Rooms
                <ArrowIcon size={16} />
              </a>
            </Reveal>

            <Reveal as="figure" className="hh-intro__shot" delay={80}>
              <img
                src={images.intro.src}
                alt={images.intro.alt}
                width="900"
                height="1125"
                loading="lazy"
                decoding="async"
              />
            </Reveal>
          </div>
        </section>

        {/* ---- Rooms ---- */}
        <section
          className="hh-section hh-sand"
          id="rooms"
          tabIndex={-1}
          aria-labelledby="hh-rooms-title"
          style={{ outline: 'none' }}
        >
          <div className="hh-shell">
            <Reveal className="hh-head">
              <p className="hh-eyebrow">Rooms</p>
              <h2 id="hh-rooms-title" className="hh-display">
                Choose your stay.
              </h2>
              <p className="hh-lede">
                Three rooms, each with its own character. All of them have a
                private bathroom, fast Wi-Fi and a bed worth coming back to.
              </p>
            </Reveal>

            <Rooms onOpen={setOpenRoom} />
          </div>
        </section>

        {/* ---- Experience ---- */}
        <section
          className="hh-section"
          id="experience"
          tabIndex={-1}
          aria-labelledby="hh-exp-title"
          style={{ outline: 'none' }}
        >
          <div className="hh-shell">
            <Reveal className="hh-head">
              <p className="hh-eyebrow">Experience</p>
              <h2 id="hh-exp-title" className="hh-display">
                Your Cape Town, your way.
              </h2>
              <p className="hh-lede">
                Everything below is within reach of the house. Tell us what you
                are drawn to and we will help you plan around the weather.
              </p>
            </Reveal>
          </div>

          <Reveal delay={60}>
            <Experience />
          </Reveal>
        </section>

        {/* ---- Cape Town: a stylised plan, not a map embed ---- */}
        <section
          className="hh-section hh-sand"
          id="cape-town"
          tabIndex={-1}
          aria-labelledby="hh-ct-title"
          style={{ outline: 'none' }}
        >
          <div className="hh-shell hh-place">
            <Reveal className="hh-place__text">
              <p className="hh-eyebrow">The neighbourhood</p>
              <h2 id="hh-ct-title" className="hh-display">
                Well placed for exploring the city.
              </h2>
              <p className="hh-lede">
                Close enough to walk into town, far enough that the evenings are
                quiet. Most of what people come to Cape Town for is a short
                drive away.
              </p>
              <p className="hh-place__note">
                Illustrative only — this is a website concept, so there is no
                real address and no real travel times.
              </p>
            </Reveal>

            <Reveal className="hh-plan" delay={80}>
              <p className="hh-plan__centre">
                <span className="hh-eyebrow">You are here</span>
                Harbour House
              </p>
              <ul className="hh-plan__list">
                {destinations.map((place) => (
                  <li key={place.name}>
                    <span className="hh-plan__name">{place.name}</span>
                    <span className="hh-plan__note">{place.note}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ---- Hospitality ---- */}
        <section
          className="hh-section"
          id="about"
          tabIndex={-1}
          aria-labelledby="hh-little-title"
          style={{ outline: 'none' }}
        >
          <div className="hh-shell">
            <Reveal className="hh-head hh-head--centre">
              <p className="hh-eyebrow">Hospitality</p>
              <h2 id="hh-little-title" className="hh-display">
                It’s the little things.
              </h2>
            </Reveal>

            <div className="hh-little">
              {littleThings.map((item, i) => (
                <Reveal className="hh-little__item" key={item.id} delay={i * 60}>
                  <figure>
                    <img
                      src={item.image.src}
                      alt={item.image.alt}
                      width="700"
                      height="700"
                      loading="lazy"
                      decoding="async"
                    />
                  </figure>
                  <h3 className="hh-little__label">{item.label}</h3>
                  <p>{item.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Breakfast ---- */}
        <section className="hh-section hh-ink" aria-labelledby="hh-bf-title">
          <div className="hh-shell hh-breakfast">
            <Reveal as="figure" className="hh-breakfast__shot">
              <img
                src={images.breakfast.src}
                alt={images.breakfast.alt}
                width="1400"
                height="933"
                loading="lazy"
                decoding="async"
              />
            </Reveal>

            <Reveal className="hh-breakfast__text" delay={80}>
              <p className="hh-eyebrow">Breakfast</p>
              <h2 id="hh-bf-title" className="hh-display">
                Start the day slowly.
              </h2>
              <ul className="hh-breakfast__list">
                {breakfastItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a
                className="hh-link hh-link--light"
                href="#rooms"
                onClick={(e) => jump(e, '#rooms')}
              >
                Explore Your Stay
                <ArrowIcon size={16} />
              </a>
            </Reveal>
          </div>
        </section>

        {/* ---- Guest feedback: written examples, clearly labelled ---- */}
        <section className="hh-section" aria-labelledby="hh-fb-title">
          <div className="hh-shell">
            <Reveal className="hh-head hh-head--centre">
              <p className="hh-eyebrow">Example guest feedback</p>
              <h2 id="hh-fb-title" className="hh-display">
                A stay worth remembering.
              </h2>
              <p className="hh-lede">
                Harbour House is a fictional guesthouse, so it has no guests and
                no reviews. These are written examples of the kind of stay it is
                designed around — not feedback from real people.
              </p>
            </Reveal>

            <div className="hh-quotes">
              {feedback.map((item, i) => (
                <Reveal
                  as="figure"
                  className="hh-quote"
                  key={item.who}
                  delay={i * 60}
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

        {/* ---- Gallery: a calm run down the page, not a grid ---- */}
        <section className="hh-section hh-sand" aria-labelledby="hh-gal-title">
          <div className="hh-shell">
            <Reveal className="hh-head">
              <p className="hh-eyebrow">Gallery</p>
              <h2 id="hh-gal-title" className="hh-display">
                A glimpse of Harbour House.
              </h2>
            </Reveal>

            <div className="hh-gallery">
              {images.gallery.map((shot, i) => (
                <Reveal
                  as="figure"
                  className={`hh-gallery__item hh-gallery__item--${i + 1}`}
                  key={shot.src}
                  delay={i * 60}
                >
                  <img
                    src={shot.src}
                    alt={shot.alt}
                    width={i === 1 ? '1400' : '900'}
                    height={i === 1 ? '933' : '1125'}
                    loading="lazy"
                    decoding="async"
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Booking CTA ---- */}
        <section className="hh-cta" aria-labelledby="hh-cta-title">
          <div className="hh-shell hh-cta__inner">
            <Reveal>
              <h2 id="hh-cta-title" className="hh-display">
                Make Cape Town your next stay.
              </h2>
              <p className="hh-lede">Come for the city. Stay for the feeling.</p>
              <div className="hh-btns">
                <a
                  className="hh-btn hh-btn--lg"
                  href="#contact"
                  onClick={(e) => jump(e, '#contact')}
                >
                  Check Availability
                  <ArrowIcon size={16} />
                </a>
                <a
                  className="hh-btn hh-btn--ghost hh-btn--lg"
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

        {/* ---- Contact ---- */}
        <section
          className="hh-section"
          id="contact"
          tabIndex={-1}
          aria-labelledby="hh-contact-title"
          style={{ outline: 'none' }}
        >
          <div className="hh-shell hh-contact">
            <Reveal className="hh-contact__text">
              <p className="hh-eyebrow">Enquiries</p>
              <h2 id="hh-contact-title" className="hh-display">
                Tell us when you’re coming.
              </h2>
              <p className="hh-lede">
                Send your dates and we will confirm whether the room is free and
                what it costs. No deposit, no card details, no booking fee.
              </p>

              <ul className="hh-contact__list">
                <li>
                  <PinIcon size={15} />
                  <div>
                    <span className="hh-eyebrow">Where</span>
                    {businessConfig.address}
                  </div>
                </li>
                <li>
                  <PhoneIcon size={15} />
                  <div>
                    <span className="hh-eyebrow">Phone</span>
                    <a href={businessConfig.phoneHref}>
                      {businessConfig.phoneDisplay}
                    </a>
                  </div>
                </li>
                <li>
                  <MailIcon size={15} />
                  <div>
                    <span className="hh-eyebrow">Email</span>
                    <a href={`mailto:${businessConfig.email}`}>
                      {businessConfig.email}
                    </a>
                  </div>
                </li>
                <li>
                  <WhatsAppIcon size={15} />
                  <div>
                    <span className="hh-eyebrow">WhatsApp</span>
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {businessConfig.whatsappDisplay}
                    </a>
                  </div>
                </li>
              </ul>

              <dl className="hh-contact__times">
                {businessConfig.reception.map((row) => (
                  <div key={row.label}>
                    <dt>{row.label}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal className="hh-contact__form" delay={80}>
              <EnquiryForm stay={stay} onStayChange={setStay} />
            </Reveal>
          </div>
        </section>

        {/* ---- FAQ ---- */}
        <section
          className="hh-section hh-sand"
          id="faqs"
          tabIndex={-1}
          aria-labelledby="hh-faq-title"
          style={{ outline: 'none' }}
        >
          <div className="hh-shell hh-faqwrap">
            <Reveal className="hh-head">
              <p className="hh-eyebrow">Good to know</p>
              <h2 id="hh-faq-title" className="hh-display">
                Before you arrive.
              </h2>
            </Reveal>

            <Reveal className="hh-faq" delay={60}>
              {faqs.map((item, i) => (
                <Faq key={item.q} item={item} defaultOpen={i === 0} />
              ))}
            </Reveal>
          </div>
        </section>

        {/* ---- Final brand moment ---- */}
        <section className="hh-close" aria-labelledby="hh-close-title">
          <figure className="hh-close__shot">
            <img
              src={images.cta.src}
              alt={images.cta.alt}
              width="2000"
              height="760"
              loading="lazy"
              decoding="async"
            />
          </figure>
          <div className="hh-shell hh-close__inner">
            <Reveal>
              <h2 id="hh-close-title" className="hh-display">
                Come for Cape Town.
                <span>Stay for Harbour House.</span>
              </h2>
              <p className="hh-lede">
                A boutique Cape Town stay designed around comfort, character and
                a little more breathing room.
              </p>
              <a
                className="hh-btn hh-btn--lg"
                href="#contact"
                onClick={(e) => jump(e, '#contact')}
              >
                Check Availability
                <ArrowIcon size={16} />
              </a>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />

      <RoomDialog
        room={openRoom ? roomById(openRoom) : null}
        onClose={() => setOpenRoom(null)}
        onEnquire={enquireAbout}
      />
    </div>
  )
}
