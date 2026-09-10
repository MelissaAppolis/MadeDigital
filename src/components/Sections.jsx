import { Link } from 'react-router-dom'
import Reveal from './Reveal.jsx'
import { BrowserMockup, PhoneMockup } from './Mockup.jsx'
import { process } from '../data/services.js'
import { revamp } from '../data/projects.js'

/** Closing call-to-action band used at the bottom of most pages. */
export function CtaBand({
  eyebrow = 'Start here',
  title = 'Let’s build something better.',
  body = 'Tell us about your business and what you need. We will come back with a straight answer on scope, timing and cost — no pressure, no jargon.',
  primary = { to: '/website-review', label: 'Get a Free Website Review' },
  secondary = { to: '/contact', label: 'Contact Us' },
}) {
  return (
    <section className="section section--dark">
      <div className="container">
        <Reveal className="cta-band">
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          <p className="lede lede--wide" style={{ textAlign: 'center' }}>
            {body}
          </p>
          <div className="btn-row" style={{ justifyContent: 'center' }}>
            <Link className="btn btn--light btn--lg" to={primary.to}>
              <span>{primary.label}</span>
              <span className="btn__arrow" aria-hidden="true">
                &rarr;
              </span>
            </Link>
            {secondary && (
              <Link className="btn btn--ghost-light btn--lg" to={secondary.to}>
                {secondary.label}
              </Link>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/** The free website review lead magnet. */
export function ReviewCallout() {
  return (
    <section className="section section--dark" id="website-review">
      <div className="container">
        <div className="callout">
          <Reveal>
            <p className="eyebrow">Free website review</p>
            <h2 style={{ marginTop: '1.25rem' }}>
              Is your website costing you customers?
            </h2>
            <p className="lede lede--wide" style={{ marginTop: '1.5rem' }}>
              Your website should work as hard as you do. We’ll review your
              current website and identify the biggest opportunities to improve
              its design, mobile experience and ability to generate enquiries.
            </p>
            <ul className="callout__points">
              <li>
                <b>What we look at</b> — first impression, mobile experience,
                how easy you are to contact, and how quickly the site loads.
              </li>
              <li>
                <b>What you get</b> — a short, plain-English write-up of what to
                fix first and why it matters.
              </li>
              <li>
                <b>What it costs</b> — nothing, and there is no obligation
                afterwards.
              </li>
            </ul>
            <div className="btn-row" style={{ marginTop: '2.25rem' }}>
              <Link className="btn btn--light btn--lg" to="/website-review">
                <span>Get My Free Website Review</span>
                <span className="btn__arrow" aria-hidden="true">
                  &rarr;
                </span>
              </Link>
            </div>
          </Reveal>

          <Reveal
            delay={120}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <PhoneMockup
              src={revamp.after.mobile}
              alt="A modern business website concept shown on a phone"
              style={{ '--phone-w': 'clamp(13rem, 32vw, 17rem)' }}
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/** Four-step process. */
export function ProcessSteps({ dark = false, detailed = false }) {
  return (
    <section className={`section${dark ? ' section--dark' : ''}`}>
      <div className="container">
        <Reveal className="head head--split" style={{ marginBottom: '3.5rem' }}>
          <div>
            <p className="eyebrow">How it works</p>
            <h2 style={{ marginTop: '1.25rem' }}>
              A simple process, start to finish.
            </h2>
          </div>
          <p className="lede">
            You always know what is happening, what we need from you, and what
            comes next.
          </p>
        </Reveal>

        <ol className="steps">
          {process.map((step, i) => (
            <Reveal as="li" className="step" key={step.number} delay={i * 70}>
              <div className="step__num" aria-hidden="true">
                {step.number}
              </div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
              {detailed && <p>{step.detail}</p>}
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

/** Before / after revamp block. */
export function BeforeAfter({ showCta = true }) {
  return (
    <section className="section section--dark">
      <div className="container">
        <Reveal className="head head--split" style={{ marginBottom: '3.5rem' }}>
          <div>
            <p className="eyebrow">Website revamps</p>
            <h2 style={{ marginTop: '1.25rem' }}>
              Your business has grown. Your website should too.
            </h2>
          </div>
          <p className="lede">
            You do not have to start from scratch. We keep your domain, your
            content and whatever is already working, and rebuild the rest around
            it.
          </p>
        </Reveal>

        <div className="compare">
          <Reveal className="compare__item compare__item--before">
            <p className="compare__label">
              <span>{revamp.before.label}</span>
              <span>Old website</span>
            </p>
            <BrowserMockup
              src={revamp.before.src}
              alt={revamp.before.alt}
              url="yourbusiness.co.za"
            />
            <p className="compare__caption">{revamp.before.caption}</p>
          </Reveal>

          <Reveal className="compare__item compare__item--after" delay={120}>
            <p className="compare__label">
              <span>{revamp.after.label}</span>
              <span>Made Digital</span>
            </p>
            <BrowserMockup
              src={revamp.after.src}
              alt={revamp.after.alt}
              url="yourbusiness.co.za"
            />
            <p className="compare__caption">{revamp.after.caption}</p>
          </Reveal>
        </div>

        {showCta && (
          <Reveal className="btn-row" style={{ marginTop: '3rem' }}>
            <Link className="btn btn--light btn--lg" to="/website-review">
              <span>Improve My Website</span>
              <span className="btn__arrow" aria-hidden="true">
                &rarr;
              </span>
            </Link>
            <Link className="btn btn--ghost-light btn--lg" to="/packages#refresh">
              See refresh pricing
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  )
}
