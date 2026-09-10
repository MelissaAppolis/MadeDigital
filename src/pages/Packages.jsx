import { useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSeo } from '../hooks/useSeo.js'
import Reveal from '../components/Reveal.jsx'
import { CtaBand, ProcessSteps } from '../components/Sections.jsx'
import { BrowserMockup } from '../components/Mockup.jsx'
import { carePlans, faqs, packages, refresh } from '../data/packages.js'
import { revamp } from '../data/projects.js'

function Plan({ plan, featured = false }) {
  return (
    <div className={`plan${featured ? ' plan--featured' : ''}`}>
      <div className="plan__head">
        <p className="plan__name">
          <span>{plan.name}</span>
          {plan.popular && <span className="badge badge--accent">Most popular</span>}
          {plan.recommended && (
            <span className="badge badge--accent">Recommended</span>
          )}
        </p>
        <p className="plan__price">
          {plan.prefix && <span className="plan__prefix">{plan.prefix}</span>}
          <span>{plan.price}</span>
          {plan.period && <span className="plan__period">{plan.period}</span>}
        </p>
        <p className="plan__tagline">{plan.tagline}</p>
      </div>

      <ul className="plan__list">
        {plan.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>

      {plan.cta && (
        <Link
          className={`btn btn--block${featured ? ' btn--light' : ''}`}
          to={plan.to}
        >
          <span>{plan.cta}</span>
          <span className="btn__arrow" aria-hidden="true">
            &rarr;
          </span>
        </Link>
      )}
    </div>
  )
}

function Faq({ item, index }) {
  const [open, setOpen] = useState(index === 0)
  const id = useId()

  return (
    <div className="faq__item" data-open={open}>
      <h3 style={{ margin: 0 }}>
        <button
          type="button"
          id={`${id}-q`}
          className="faq__q"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((v) => !v)}
        >
          <span>{item.q}</span>
          <span className="faq__sign" aria-hidden="true" />
        </button>
      </h3>
      {/* Collapsed content is hidden with visibility so it leaves the
          accessibility tree while the height stays animatable. */}
      <div className="faq__a" id={id} role="region" aria-labelledby={`${id}-q`}>
        <div>
          <p>{item.a}</p>
        </div>
      </div>
    </div>
  )
}

export default function Packages() {
  useSeo({
    title: 'Packages & Pricing | Website Design Cape Town | Made Digital',
    description:
      'Website packages from R4,500. Clear, fixed pricing for new business websites, redesigns and optional monthly website care plans in Cape Town.',
  })

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="page-hero__grid">
            <Reveal>
              <p className="eyebrow">Packages</p>
              <h1 style={{ marginTop: '1.5rem' }}>
                Straight pricing, agreed up front.
              </h1>
            </Reveal>
            <Reveal delay={100}>
              <p className="lede">
                Pick the shape that fits. If none of them do, tell us what you
                need and we will quote it properly — no packages forced on you.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--sm" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="pricing">
            {packages.map((pkg, i) => (
              <Reveal key={pkg.id} delay={i * 80} style={{ height: '100%' }}>
                <Plan plan={pkg} featured={pkg.popular} />
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="plan__note" style={{ marginTop: '2rem' }}>
              Prices are in South African Rand and exclude the annual cost of a
              domain name. Hosting is either included in a care plan or set up
              in your own account — we will explain both before you decide.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---- Website refresh ---- */}
      <section className="section section--cream" id="refresh">
        <div className="container">
          <div className="split">
            <Reveal>
              <p className="eyebrow">Website refresh</p>
              <h2 style={{ marginTop: '1.25rem' }}>{refresh.headline}</h2>
              <p className="lede" style={{ marginTop: '1.5rem' }}>
                {refresh.tagline} We modernise what you already have rather than
                making you start from scratch — your domain, your content and
                your search history stay where they are.
              </p>

              <p className="plan__price" style={{ marginTop: '2rem' }}>
                <span className="plan__prefix">{refresh.prefix}</span>
                <span>{refresh.price}</span>
              </p>

              <ul className="checklist" style={{ marginTop: '1.75rem' }}>
                {refresh.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>

              <div className="btn-row" style={{ marginTop: '2.25rem' }}>
                <Link className="btn btn--lg" to={refresh.to}>
                  <span>{refresh.cta}</span>
                  <span className="btn__arrow" aria-hidden="true">
                    &rarr;
                  </span>
                </Link>
              </div>
            </Reveal>

            <Reveal delay={100} style={{ display: 'grid', gap: '1rem' }}>
              <BrowserMockup
                src={revamp.after.src}
                alt={revamp.after.alt}
                url="yourbusiness.co.za"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- Care plans ---- */}
      <section className="section section--dark">
        <div className="container">
          <Reveal className="head head--split" style={{ marginBottom: '3.5rem' }}>
            <div>
              <p className="eyebrow">Website care</p>
              <h2 style={{ marginTop: '1.25rem' }}>
                Optional monthly plans, if you would rather not manage it.
              </h2>
            </div>
            <p className="lede">
              Every site we build can be handed straight over to you. If you
              would prefer someone else to keep it running and up to date, these
              are the plans. You can start, change or stop one at any time.
            </p>
          </Reveal>

          <div className="care">
            {carePlans.map((plan, i) => (
              <Reveal key={plan.id} delay={i * 80} style={{ height: '100%' }}>
                <Plan plan={plan} featured={plan.recommended} />
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="plan__note" style={{ marginTop: '2rem', color: 'var(--d-muted)' }}>
              Monthly plans are optional and are never a condition of building
              your website.
            </p>
          </Reveal>
        </div>
      </section>

      <ProcessSteps />

      {/* ---- FAQ ---- */}
      <section className="section section--cream">
        <div className="container">
          <div className="split split--sticky">
            <Reveal>
              <p className="eyebrow">Questions</p>
              <h2 style={{ marginTop: '1.25rem' }}>Before you ask.</h2>
            </Reveal>

            <Reveal className="faq" delay={80}>
              {faqs.map((item, i) => (
                <Faq item={item} key={item.q} index={i} />
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready when you are."
        body="Tell us which package looks closest and a little about your business. We will confirm the scope and give you a firm price before anything starts."
        primary={{ to: '/contact', label: 'Send an Enquiry' }}
        secondary={{ to: '/website-review', label: 'Get a free review' }}
      />
    </>
  )
}
