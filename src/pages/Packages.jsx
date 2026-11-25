import { useEffect, useId, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSeo } from '../hooks/useSeo.js'
import Reveal from '../components/Reveal.jsx'
import { CtaBand } from '../components/Sections.jsx'
import { BrowserMockup } from '../components/Mockup.jsx'
import { carePlans, faqs, packages, refresh } from '../data/packages.js'
import { invitations } from '../data/products.js'
import { revamp } from '../data/projects.js'

function Arrow() {
  return (
    <span className="btn__arrow" aria-hidden="true">
      &rarr;
    </span>
  )
}

function Plan({ plan, featured = false }) {
  const badge =
    plan.badge ||
    (plan.popular && 'Most popular') ||
    (plan.recommended && 'Recommended')

  return (
    <div className={`plan${featured ? ' plan--featured' : ''}`}>
      <div className="plan__head">
        <p className="plan__name">
          <span>{plan.name}</span>
          {badge && <span className="badge badge--accent">{badge}</span>}
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
          <Arrow />
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

function FaqSection({ items, title = 'Questions' }) {
  return (
    <section className="section section--cream">
      <div className="container">
        <div className="split split--sticky">
          <Reveal>
            <p className="eyebrow">Questions</p>
            <h2 style={{ marginTop: '1.25rem' }}>{title}</h2>
          </Reveal>
          <Reveal className="faq" delay={80}>
            {items.map((item, i) => (
              <Faq item={item} key={item.q} index={i} />
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/** Section heading used inside a tab: eyebrow, h2, one short line. */
function GroupHead({ eyebrow, title, line }) {
  return (
    <Reveal className="group-head">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {line && (
        <p className="lede">{line}</p>
      )}
    </Reveal>
  )
}

/* ---- Websites tab -------------------------------------------------------- */

function Websites() {
  return (
    <>
      <section className="section section--sm" style={{ paddingTop: 'clamp(2.5rem, 5vw, 4rem)' }}>
        <div className="container">
          <GroupHead
            eyebrow="New website"
            title="Three sizes. One fixed price."
          />
          <div className="pricing">
            {packages.map((pkg, i) => (
              <Reveal key={pkg.id} delay={i * 80} style={{ height: '100%' }}>
                <Plan plan={pkg} featured={pkg.popular} />
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="plan__note" style={{ marginTop: '2rem' }}>
              Prices in rand. A domain name is a small yearly extra.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section--cream" id="refresh">
        <div className="container">
          <div className="split">
            <Reveal>
              <p className="eyebrow">Website refresh</p>
              <h2 style={{ marginTop: '1.25rem' }}>{refresh.headline}</h2>
              <p className="lede" style={{ marginTop: '1.25rem' }}>
                {refresh.tagline}
              </p>
              <p className="plan__price" style={{ marginTop: '1.75rem' }}>
                <span className="plan__prefix">{refresh.prefix}</span>
                <span>{refresh.price}</span>
              </p>
              <ul className="checklist" style={{ marginTop: '1.5rem' }}>
                {refresh.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <div className="btn-row" style={{ marginTop: '2rem' }}>
                <Link className="btn btn--lg" to={refresh.to}>
                  <span>{refresh.cta}</span>
                  <Arrow />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <BrowserMockup
                src={revamp.after.src}
                alt={revamp.after.alt}
                url={revamp.url}
                width={revamp.width}
                height={revamp.height}
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <GroupHead
            eyebrow="Website care"
            title="Monthly care, if you want it."
            line="Optional. Start, change or stop any time."
          />
          <div className="care">
            {carePlans.map((plan, i) => (
              <Reveal key={plan.id} delay={i * 80} style={{ height: '100%' }}>
                <Plan plan={plan} featured={plan.recommended} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FaqSection items={faqs} title="Website questions." />
    </>
  )
}

/* ---- Invitations tab ----------------------------------------------------- */

function Invitations() {
  const p = invitations
  const plans = p.pricing.map((tier) => ({
    ...tier,
    name: tier.label,
    to: p.contact,
  }))

  return (
    <>
      <section className="section section--sm" style={{ paddingTop: 'clamp(2.5rem, 5vw, 4rem)' }}>
        <div className="container">
          <GroupHead
            eyebrow={p.audience}
            title="Digital invitations."
            line="Guests reply on their phones. You see the final numbers in one place."
          />
          <div className="pricing">
            {plans.map((plan, i) => (
              <Reveal key={plan.label} delay={i * 80} style={{ height: '100%' }}>
                <Plan plan={plan} featured={i === 0} />
              </Reveal>
            ))}
          </div>
          <Reveal className="btn-row" style={{ marginTop: '2.5rem' }}>
            {/* /invites/ is a separate static app, so a full page load. */}
            <a className="btn btn--ghost btn--lg" href={p.demoHref}>
              <span>Try the demo</span>
              <Arrow />
            </a>
            <Link className="link-arrow" to={p.to}>
              <span>What the invitations do</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <FaqSection items={p.faqs} title="Invitation questions." />
    </>
  )
}

/* ---- Page ---------------------------------------------------------------- */

const groups = [
  { id: 'websites', label: 'Websites', from: 'From R4,500' },
  { id: 'invitations', label: 'Digital invitations', from: 'Free trial' },
]

/** The hash picks the tab, so /packages#invitations can be linked to. */
function groupFromHash(hash) {
  return hash === '#invitations' ? 'invitations' : 'websites'
}

export default function Packages() {
  useSeo({
    title: 'Pricing | Website Packages & Digital Invitations | Made Digital',
    description:
      'Fixed prices for websites from R4,500, website refreshes and care plans, plus digital invitations for venues with a free trial. Made Digital, Cape Town.',
  })

  const { hash } = useLocation()
  const [active, setActive] = useState(() => groupFromHash(hash))
  const tabRefs = useRef({})
  const uid = useId()

  useEffect(() => {
    setActive(groupFromHash(hash))
  }, [hash])

  function choose(id, focus = false) {
    setActive(id)
    // Update the address without a router navigation, which would scroll.
    window.history.replaceState(window.history.state, '', `#${id}`)
    if (focus) tabRefs.current[id]?.focus()
  }

  function onKeyDown(e) {
    const i = groups.findIndex((g) => g.id === active)
    let next = null
    if (e.key === 'ArrowRight') next = groups[(i + 1) % groups.length]
    if (e.key === 'ArrowLeft') next = groups[(i - 1 + groups.length) % groups.length]
    if (e.key === 'Home') next = groups[0]
    if (e.key === 'End') next = groups[groups.length - 1]
    if (next) {
      e.preventDefault()
      choose(next.id, true)
    }
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="page-hero__grid">
            <Reveal>
              <p className="eyebrow">Pricing</p>
              <h1 style={{ marginTop: '1.5rem' }}>
                Clear prices, agreed up front.
              </h1>
            </Reveal>
            <Reveal delay={100}>
              <p className="lede">Choose what you are looking for.</p>
            </Reveal>
          </div>

          <Reveal delay={150}>
            <div
              className="switch"
              role="tablist"
              aria-label="Pricing"
              onKeyDown={onKeyDown}
            >
              {groups.map((g) => (
                <button
                  key={g.id}
                  ref={(el) => (tabRefs.current[g.id] = el)}
                  type="button"
                  role="tab"
                  id={`${uid}-${g.id}-tab`}
                  aria-selected={active === g.id}
                  aria-controls={`${uid}-${g.id}-panel`}
                  tabIndex={active === g.id ? 0 : -1}
                  className="switch__tab"
                  onClick={() => choose(g.id)}
                >
                  <span className="switch__label">{g.label}</span>
                  <span className="switch__from">{g.from}</span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Both panels stay in the page so each tab has a panel to control.
          No id on the panels: a #invitations link should land on the tabs. */}
      {groups.map((g) => (
        <div
          key={g.id}
          role="tabpanel"
          id={`${uid}-${g.id}-panel`}
          aria-labelledby={`${uid}-${g.id}-tab`}
          hidden={active !== g.id}
        >
          {g.id === 'invitations' ? <Invitations /> : <Websites />}
        </div>
      ))}

      <section className="section section--sm">
        <div className="container">
          <Reveal className="aside-row">
            <p>
              <b>Custom apps and Spadework</b> are priced for your business.
            </p>
            <Link className="link-arrow" to="/products">
              <span>See products</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Not sure which fits?"
        body="Tell us a little about your business. We will confirm the scope and give you a firm price before anything starts."
        primary={{ to: '/contact', label: 'Get in Touch' }}
        secondary={{ to: '/products', label: 'See our products' }}
      />
    </>
  )
}
