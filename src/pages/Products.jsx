import { Link } from 'react-router-dom'
import { useSeo } from '../hooks/useSeo.js'
import Reveal from '../components/Reveal.jsx'
import { DeviceStage } from '../components/Mockup.jsx'
import { CtaBand } from '../components/Sections.jsx'
import { appExamples, invitations, spadework } from '../data/products.js'

function Status({ children }) {
  return (
    <p className="status">
      <span className="status__dot" aria-hidden="true" />
      {children}
    </p>
  )
}

function Invitations() {
  const p = invitations
  return (
    <section className="section" id={p.id} style={{ paddingTop: 'clamp(2rem, 4vw, 3rem)' }}>
      <div className="container">
        <div className="product">
          <Reveal className="product__text">
            <p className="eyebrow">{p.audience}</p>
            <h2 style={{ marginTop: '1.25rem' }}>{p.name}</h2>
            <Status>{p.status}</Status>
            <p className="product__headline">{p.headline}</p>
            <p className="lede">{p.body}</p>
            <ul className="service__includes product__features">
              {p.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <div className="product__frame">
              <DeviceStage
                className="stage--compact"
                desktop={p.images.desktop}
                mobile={p.images.mobile}
                alt={p.images.alt}
                url={p.images.url}
              />
            </div>
            <p className="small muted" style={{ marginTop: '1rem' }}>
              Sample event at a fictional venue.
            </p>
          </Reveal>
        </div>

        <Reveal className="head" style={{ margin: 'clamp(3rem, 6vw, 4.5rem) 0 1.75rem' }}>
          <h3 className="product__subhead">Pricing</h3>
        </Reveal>
        <div className="prices">
          {p.pricing.map((tier, i) => (
            <Reveal className="price" key={tier.label} delay={i * 70}>
              <p className="fact__label">{tier.label}</p>
              <p className="plan__price">
                <span>{tier.price}</span>
                {tier.period && <span className="plan__period">{tier.period}</span>}
              </p>
              <p className="muted small">{tier.note}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="product__foot">
          <p className="muted">{p.note}</p>
          <div className="btn-row">
            {/* /invites/ is a separate static app, so a full page load. */}
            <a className="btn btn--lg" href={p.demoHref}>
              <span>Try the demo</span>
              <span className="btn__arrow" aria-hidden="true">
                &rarr;
              </span>
            </a>
            <Link className="btn btn--ghost btn--lg" to={p.contact}>
              Ask about a free trial
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Spadework() {
  const p = spadework
  return (
    <section className="section section--dark" id={p.id}>
      <div className="container">
        <Reveal className="head head--split" style={{ marginBottom: '3.5rem' }}>
          <div>
            <p className="eyebrow">{p.audience}</p>
            <h2 style={{ marginTop: '1.25rem' }}>{p.name}</h2>
            <Status>{p.status}</Status>
          </div>
          <div>
            <p className="product__headline">{p.headline}</p>
            <p className="lede">{p.body}</p>
          </div>
        </Reveal>

        <div className="modules">
          {p.groups.map((g, i) => (
            <Reveal className="module" key={g.title} delay={i * 60}>
              <h3>{g.title}</h3>
              <p>{g.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="product__foot">
          <p className="muted">{p.note}</p>
          <div className="btn-row">
            <Link className="btn btn--light btn--lg" to={p.contact}>
              <span>Book a walkthrough</span>
              <span className="btn__arrow" aria-hidden="true">
                &rarr;
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function CustomApps() {
  return (
    <section className="section section--cream" id="custom-apps">
      <div className="container">
        <Reveal className="head head--split" style={{ marginBottom: '3.5rem' }}>
          <div>
            <p className="eyebrow">Built for you</p>
            <h2 style={{ marginTop: '1.25rem' }}>
              Need something that fits the way you work?
            </h2>
          </div>
          <p className="lede">
            Not every business fits a ready-made product. We build apps around
            how you already quote, follow up and get the job done, so the
            routine work takes less of your day.
          </p>
        </Reveal>

        <div className="benefits">
          {appExamples.map((item, i) => (
            <Reveal className="benefit" key={item.title} delay={i * 70}>
              <p className="benefit__num">0{i + 1}</p>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="btn-row" style={{ marginTop: '3rem' }}>
          <Link className="btn btn--lg" to="/contact?need=app">
            <span>Tell us what slows you down</span>
            <span className="btn__arrow" aria-hidden="true">
              &rarr;
            </span>
          </Link>
          <Link className="btn btn--ghost btn--lg" to="/services#custom-apps">
            About custom apps
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

export default function Products() {
  useSeo({
    title: 'Products | Digital Invitations, Spadework & Custom Apps | Made Digital',
    description:
      'Digital invitations for venues, Spadework construction management for builders, and tailor-made business apps from Made Digital in Cape Town.',
  })

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="page-hero__grid">
            <Reveal>
              <p className="eyebrow">Products</p>
              <h1 style={{ marginTop: '1.5rem' }}>
                More than websites. Tools that save you time.
              </h1>
            </Reveal>
            <Reveal delay={100}>
              <p className="lede">
                Two products of our own, and apps built to order for businesses
                that have outgrown spreadsheets and paper.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <Invitations />
      <Spadework />
      <CustomApps />

      <CtaBand
        title="Not sure what you need?"
        body="Tell us how your business runs and where the time goes. We will tell you honestly whether a website, an app or neither is the answer."
        primary={{ to: '/contact', label: 'Get in Touch' }}
        secondary={{ to: '/services', label: 'See all services' }}
      />
    </>
  )
}
