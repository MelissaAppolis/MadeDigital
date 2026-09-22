import { useState } from 'react'
import { useSeo } from '../../hooks/useSeo.js'
import Reveal from '../../components/Reveal.jsx'
import ConceptNotice from '../_shared/ConceptNotice.jsx'
import { useWebFont } from '../_shared/useWebFont.js'
import { scrollToSection } from '../_shared/scrollToSection.js'

import Nav from './Nav.jsx'
import Footer from './Footer.jsx'
import ConditionFinder from './ConditionFinder.jsx'
import AppointmentForm from './AppointmentForm.jsx'
import { businessConfig, conceptMeta, fontHref, images, whatsappHref } from './config.js'
import {
  abcde,
  bringList,
  doctorInterests,
  doctorLanguages,
  faqs,
  fees,
  quickFacts,
  visitSteps,
} from './content.js'
import {
  ArrowIcon,
  CheckIcon,
  ClockIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  PlusIcon,
  ReferralIcon,
  WhatsAppIcon,
} from './icons.jsx'

import './kestrel.css'

/* ---- Small local pieces -------------------------------------------------- */

/** A photograph seen through the practice's lens: a circle with a ring. */
function Lens({ image, className = '', eager = false }) {
  return (
    <figure className={`kd-lens ${className}`}>
      <img
        src={image.src}
        alt={image.alt}
        loading={eager ? 'eager' : 'lazy'}
        fetchpriority={eager ? 'high' : undefined}
      />
    </figure>
  )
}

/* ---- Page ---------------------------------------------------------------- */

export default function KestrelDermatology() {
  useSeo({
    title: 'Kestrel Dermatology | Specialist Dermatologist in Cape Town',
    description:
      'Kestrel Dermatology is a fictional Cape Town dermatology practice website concept by Made Digital, showing conditions, skin checks, fees and appointment requests.',
    image: '/assets/projects/kestrel-dermatology/desktop.jpg',
  })
  useWebFont(fontHref)

  // Shared by the condition finder and the appointment form.
  const [reason, setReason] = useState('skin-check')

  const jump = (event, href) => {
    event.preventDefault()
    scrollToSection(href)
  }

  const askAbout = (reasonId) => {
    setReason(reasonId)
    scrollToSection('#appointment')
  }

  return (
    <div className="kd">
      <a className="kd-skip" href="#top" onClick={(e) => jump(e, '#top')}>
        Skip to content
      </a>

      <ConceptNotice
        businessName={businessConfig.name}
        studioHref={conceptMeta.studioHref}
        caseStudyHref={conceptMeta.caseStudyHref}
      />
      <Nav />

      <main id="top" tabIndex={-1} style={{ outline: 'none' }}>
        {/* ---- Hero: the headline beside a lens, not a banner. ---- */}
        <section className="kd-hero" aria-labelledby="kd-hero-title">
          <div className="kd-shell kd-hero__grid">
            <div className="kd-hero__copy">
              <p className="kd-eyebrow">
                {businessConfig.doctor} · {businessConfig.doctorRole}
              </p>
              <h1 id="kd-hero-title">
                Specialist skin care, <em>clearly</em> explained.
              </h1>
              <p className="kd-hero__lead">
                Medical and surgical dermatology for adults and children in Cape
                Town. You leave every appointment knowing what we found, what it
                means and what happens next.
              </p>
              <div className="kd-hero__actions">
                <a className="kd-btn kd-btn--lg" href="#appointment" onClick={(e) => jump(e, '#appointment')}>
                  Request an appointment <ArrowIcon size={18} />
                </a>
                <a className="kd-btn kd-btn--lg kd-btn--line" href="#conditions" onClick={(e) => jump(e, '#conditions')}>
                  Find your condition
                </a>
              </div>
              <p className="kd-hero__referral">
                <CheckIcon size={18} />
                <span>
                  <strong>No referral needed to book.</strong> We check whether
                  your medical aid wants one.
                </span>
              </p>
            </div>

            <div className="kd-hero__media">
              <Lens image={images.hero} className="kd-lens--hero" eager />
              <Lens image={images.lens} className="kd-lens--inset" eager />
              <div className="kd-hero__card">
                <ClockIcon size={20} />
                <div>
                  <strong>Skin checks</strong>
                  <span>30-minute, head-to-toe appointments</span>
                </div>
              </div>
            </div>
          </div>

          <ul className="kd-shell kd-facts">
            {quickFacts.map((f) => (
              <li key={f.title}>
                <strong>{f.title}</strong>
                <span>{f.text}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ---- Conditions: search first, because patients arrive with a word. ---- */}
        <section className="kd-section" id="conditions" aria-labelledby="kd-conditions-title" tabIndex={-1}>
          <div className="kd-shell">
            <Reveal className="kd-head">
              <p className="kd-eyebrow">Conditions &amp; treatments</p>
              <h2 id="kd-conditions-title">
                What can we <em>help</em> with?
              </h2>
              <p>
                Search for what is worrying you, or browse by type. Each note
                explains what happens at your visit.
              </p>
            </Reveal>
            <Reveal>
              <ConditionFinder onAsk={askAbout} />
            </Reveal>
          </div>
        </section>

        {/* ---- Skin checks: the one service most practices want to grow. ---- */}
        <section className="kd-section kd-section--ink" id="skin-checks" aria-labelledby="kd-checks-title" tabIndex={-1}>
          <div className="kd-shell kd-checks">
            <div className="kd-checks__media">
              <Lens image={images.skinCheck} className="kd-lens--check" />
              <Lens image={images.skinCheckDetail} className="kd-lens--small" />
            </div>
            <Reveal className="kd-checks__copy">
              <p className="kd-eyebrow kd-eyebrow--light">Skin & mole checks</p>
              <h2 id="kd-checks-title">
                A closer look, <em>head to toe</em>.
              </h2>
              <p>
                South Africa has one of the highest rates of skin cancer in the
                world, and most skin cancers are easier to treat when they are
                found early. A skin check examines every part of your skin, with
                magnified images of anything that needs a second look.
              </p>
              <a className="kd-btn kd-btn--light" href="#appointment" onClick={(e) => { e.preventDefault(); askAbout('skin-check') }}>
                Book a skin check <ArrowIcon size={18} />
              </a>
            </Reveal>
          </div>

          <div className="kd-shell">
            <p className="kd-abcde__intro">
              Between checks, look out for moles that show any of these signs:
            </p>
            <ol className="kd-abcde">
              {abcde.map((s) => (
                <li key={s.letter}>
                  <span className="kd-abcde__letter" aria-hidden="true">{s.letter}</span>
                  <strong>{s.title}</strong>
                  <span>{s.text}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---- Your visit: a three-point line, plus what to bring. ---- */}
        <section className="kd-section" id="visit" aria-labelledby="kd-visit-title" tabIndex={-1}>
          <div className="kd-shell">
            <Reveal className="kd-head">
              <p className="kd-eyebrow">Your first visit</p>
              <h2 id="kd-visit-title">
                What to <em>expect</em>.
              </h2>
            </Reveal>

            <ol className="kd-steps">
              {visitSteps.map((step, i) => (
                <Reveal as="li" key={step.title} delay={i * 90}>
                  <span className="kd-steps__dot" aria-hidden="true">{i + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </Reveal>
              ))}
            </ol>

            <div className="kd-visit">
              <figure className="kd-visit__photo">
                <img src={images.consult.src} alt={images.consult.alt} loading="lazy" />
              </figure>
              <Reveal className="kd-visit__bring">
                <h3>Please bring</h3>
                <ul>
                  {bringList.map((item) => (
                    <li key={item}>
                      <CheckIcon size={18} />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---- The doctor. Facts only: no rankings, no testimonials. ---- */}
        <section className="kd-section kd-section--blush" id="doctor" aria-labelledby="kd-doctor-title" tabIndex={-1}>
          <div className="kd-shell kd-doctor">
            <Lens image={images.doctor} className="kd-lens--doctor" />
            <Reveal className="kd-doctor__copy">
              <p className="kd-eyebrow">About the practice</p>
              <h2 id="kd-doctor-title">{businessConfig.doctor}</h2>
              <p className="kd-doctor__role">
                {businessConfig.doctorRole} · {businessConfig.qualifications}
              </p>
              <p>
                Dr Fourie sees adults and children for medical and surgical skin
                conditions, and takes time to explain each diagnosis in plain
                language. The practice is small by design, so you see the same
                doctor at every visit.
              </p>
              <div className="kd-doctor__lists">
                <div>
                  <h3>Special interests</h3>
                  <ul className="kd-tags">
                    {doctorInterests.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3>Consults in</h3>
                  <ul className="kd-tags kd-tags--plain">
                    {doctorLanguages.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---- Fees: the question every patient is shy to ask. ---- */}
        <section className="kd-section" id="fees" aria-labelledby="kd-fees-title" tabIndex={-1}>
          <div className="kd-shell kd-fees">
            <Reveal className="kd-fees__head">
              <p className="kd-eyebrow">Fees &amp; medical aid</p>
              <h2 id="kd-fees-title">
                Costs, explained <em>before</em> you arrive.
              </h2>
              <figure className="kd-fees__photo">
                <img src={images.rooms.src} alt={images.rooms.alt} loading="lazy" />
              </figure>
            </Reveal>
            <dl className="kd-fees__list">
              {fees.map((f) => (
                <div key={f.title}>
                  <dt>{f.title}</dt>
                  <dd>{f.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ---- For referring doctors: a small B2B strip. ---- */}
        <section className="kd-referrals" aria-labelledby="kd-referrals-title">
          <div className="kd-shell kd-referrals__inner">
            <span className="kd-referrals__icon" aria-hidden="true">
              <ReferralIcon size={28} />
            </span>
            <div>
              <h2 id="kd-referrals-title">For GPs and referring doctors</h2>
              <p>
                Send referrals to{' '}
                <a href={`mailto:${businessConfig.referralEmail}`}>{businessConfig.referralEmail}</a>.
                We send a report back after every consultation.
              </p>
            </div>
            <a className="kd-btn kd-btn--line" href={`mailto:${businessConfig.referralEmail}`}>
              <MailIcon size={18} /> Email a referral
            </a>
          </div>
        </section>

        {/* ---- FAQ ---- */}
        <section className="kd-section" aria-labelledby="kd-faq-title">
          <div className="kd-shell kd-faq">
            <Reveal className="kd-faq__head">
              <p className="kd-eyebrow">Questions</p>
              <h2 id="kd-faq-title">
                Before you <em>book</em>.
              </h2>
            </Reveal>
            <div className="kd-faq__list">
              {faqs.map((item, i) => (
                <details key={item.q} className="kd-faq__item" open={i === 0}>
                  <summary>
                    <span>{item.q}</span>
                    <PlusIcon size={20} />
                  </summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Appointment ---- */}
        <section className="kd-section kd-section--mist" id="appointment" aria-labelledby="kd-appt-title" tabIndex={-1}>
          <div className="kd-shell kd-appt">
            <div className="kd-appt__side">
              <p className="kd-eyebrow">Appointments</p>
              <h2 id="kd-appt-title">
                Request a <em>time</em>.
              </h2>
              <p>
                Tell us what the visit is for and when suits you. Reception will
                phone you to confirm.
              </p>
              <ul className="kd-appt__contact">
                <li>
                  <PhoneIcon size={18} />
                  <a href={businessConfig.phoneHref}>{businessConfig.phoneDisplay}</a>
                </li>
                <li>
                  <WhatsAppIcon size={18} />
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                    WhatsApp the rooms
                  </a>
                </li>
                <li>
                  <PinIcon size={18} />
                  {businessConfig.address}
                </li>
              </ul>
              <dl className="kd-appt__hours">
                {businessConfig.hours.map((h) => (
                  <div key={h.label}>
                    <dt>{h.label}</dt>
                    <dd>{h.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="kd-appt__form">
              <AppointmentForm reason={reason} onReasonChange={setReason} />
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Phones: the two actions a patient actually takes, always in reach. */}
      <div className="kd-mobilebar">
        <a className="kd-btn kd-btn--line" href={businessConfig.phoneHref}>
          <PhoneIcon size={18} /> Call
        </a>
        <a className="kd-btn" href="#appointment" onClick={(e) => jump(e, '#appointment')}>
          Request appointment
        </a>
      </div>
    </div>
  )
}
