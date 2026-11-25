import { Link } from 'react-router-dom'
import { useSeo } from '../hooks/useSeo.js'
import Reveal from '../components/Reveal.jsx'
import { CtaBand, ProcessSteps } from '../components/Sections.jsx'
import { offerings, services } from '../data/services.js'

/** Everything except websites, which this page lists service by service. */
const apps = offerings.filter((o) => o.id !== 'websites')

export default function Services() {
  useSeo({
    title: 'Services | Websites & Business Apps in Cape Town | Made Digital',
    description:
      'New websites, website refreshes, WhatsApp and enquiry forms, Google setup and website care, plus digital invitations, Spadework and custom business apps.',
  })

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="page-hero__grid">
            <Reveal>
              <p className="eyebrow">Services</p>
              <h1 style={{ marginTop: '1.5rem' }}>What we do.</h1>
            </Reveal>
            <Reveal delay={100}>
              <p className="lede">
                Websites that bring in work. Apps that save you time.
              </p>
              <div className="btn-row" style={{ marginTop: '2rem' }}>
                <a className="btn btn--ghost" href="#websites">
                  Websites
                </a>
                <a className="btn btn--ghost" href="#apps">
                  Apps and products
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- Websites ---- */}
      <section className="section" id="websites" style={{ paddingTop: 'clamp(2rem, 4vw, 3rem)' }}>
        <div className="container">
          <Reveal className="head head--split" style={{ marginBottom: '3rem' }}>
            <div>
              <p className="eyebrow">Websites</p>
              <h2 style={{ marginTop: '1.25rem' }}>
                Everything your website needs.
              </h2>
            </div>
            <p className="lede">From R4,500, at a fixed price.</p>
          </Reveal>

          <div className="offers">
            {services.map((s, i) => (
              <Reveal className="offer" key={s.id} id={s.id} delay={i * 60}>
                <p className="offer__num">0{i + 1}</p>
                <h3>{s.title}</h3>
                <p>{s.short}</p>
                <ul className="ticks">
                  {s.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          <Reveal className="btn-row" style={{ marginTop: '3rem' }}>
            <Link className="btn btn--lg" to="/packages">
              <span>Website prices</span>
              <span className="btn__arrow" aria-hidden="true">
                &rarr;
              </span>
            </Link>
            <Link className="btn btn--ghost btn--lg" to="/website-review">
              Free review of your website
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---- Apps and products ---- */}
      <section className="section section--cream" id="apps">
        <div className="container">
          <Reveal className="head head--split" style={{ marginBottom: '3rem' }}>
            <div>
              <p className="eyebrow">Apps and products</p>
              <h2 style={{ marginTop: '1.25rem' }}>Tools that save you time.</h2>
            </div>
            <p className="lede">Two products of our own, or an app built for you.</p>
          </Reveal>

          <div className="offers">
            {apps.map((o, i) => (
              <Reveal className="offer" key={o.id} delay={i * 70}>
                <h3>{o.title}</h3>
                <p>{o.body}</p>
                <p className="offer__meta">{o.meta}</p>
                <Link className="offer__link" to={o.to}>
                  {o.link}
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ProcessSteps />

      <CtaBand
        title="Not sure what you need?"
        body="Tell us about your business. We will point you the right way."
        secondary={{ to: '/packages', label: 'See prices' }}
      />
    </>
  )
}
