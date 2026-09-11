import { useCallback } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useSeo } from '../hooks/useSeo.js'
import { isEmail, required, useFormSubmit } from '../hooks/useFormSubmit.js'
import Reveal from '../components/Reveal.jsx'
import Field, { ChoiceGroup } from '../components/Field.jsx'
import {
  hasRealContact,
  hasRealPhone,
  hasRealWhatsapp,
  phoneLink,
  site,
  whatsappLink,
} from '../data/site.js'

const needs = [
  { value: 'New website', label: 'New website' },
  { value: 'Website redesign', label: 'Website redesign' },
  { value: 'Website maintenance', label: 'Website maintenance' },
  { value: 'Not sure yet', label: 'I’m not sure yet' },
]

const packageNames = { start: 'Start', grow: 'Grow', pro: 'Pro' }

/** A contact detail that reads as a placeholder until it has been replaced. */
function Detail({ label, value, href, isPlaceholder }) {
  return (
    <div>
      <p className="detail__label">{label}</p>
      <p className="detail__value">
        {href && !isPlaceholder ? <a href={href}>{value}</a> : value}
      </p>
      {isPlaceholder && (
        <p className="placeholder-note">Replace in src/data/site.js</p>
      )}
    </div>
  )
}

export default function Contact() {
  const [params] = useSearchParams()
  const chosenPackage = packageNames[params.get('package')] || ''

  useSeo({
    title: 'Contact | Made Digital — Web Design Cape Town',
    description:
      'Get in touch with Made Digital about a new website, a redesign or ongoing website care for your Cape Town business.',
  })

  const validate = useCallback((values) => {
    const errors = {}
    if (required(values.name)) errors.name = 'Please tell us your name'
    if (required(values.email)) errors.email = 'We need an email to reply to'
    else if (isEmail(values.email)) errors.email = isEmail(values.email)
    if (required(values.message))
      errors.message = 'A sentence or two about what you need is enough'
    return errors
  }, [])

  const { status, errors, submit } = useFormSubmit('contact', validate)

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="page-hero__grid">
            <Reveal>
              <p className="eyebrow">Contact</p>
              <h1 style={{ marginTop: '1.5rem' }}>
                Let’s build something better.
              </h1>
            </Reveal>
            <Reveal delay={100}>
              <p className="lede">
                Tell us about your business and what you need. We read every
                message and reply personally.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 'clamp(2rem, 4vw, 3rem)' }}>
        <div className="container">
          <div className="split split--sticky">
            <Reveal>
              <div className="details">
                <Detail label="Studio" value={site.location} />
                <Detail
                  label="Email"
                  value={site.email}
                  href={`mailto:${site.email}`}
                  isPlaceholder={!hasRealContact}
                />
                <Detail
                  label="Phone"
                  value={site.phoneDisplay}
                  href={phoneLink}
                  isPlaceholder={!hasRealPhone}
                />
                <Detail
                  label="WhatsApp"
                  value={site.whatsappDisplay}
                  href={whatsappLink}
                  isPlaceholder={!hasRealWhatsapp}
                />
                <Detail label="Hours" value="Monday to Friday, 9am – 5pm" />
              </div>

              <div
                style={{
                  marginTop: '2.5rem',
                  paddingTop: '2rem',
                  borderTop: '1px solid var(--line)',
                }}
              >
                <p className="muted small" style={{ maxWidth: '38ch' }}>
                  Not ready for a full conversation? Send your website address
                  through the free review instead and we will come back with
                  what we would change.
                </p>
                <Link
                  className="link-arrow"
                  to="/website-review"
                  style={{ marginTop: '1rem', display: 'inline-flex' }}
                >
                  <span>Get a free website review</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </Reveal>

            <Reveal delay={100}>
              {status === 'success' ? (
                <div className="success" role="status">
                  <span className="success__mark" aria-hidden="true">
                    <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                      <path
                        d="M1.5 7.5 6 12 16.5 1.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <h2 style={{ fontSize: 'var(--t-h3)' }}>
                    Thank you — message received.
                  </h2>
                  <p className="muted" style={{ maxWidth: '44ch' }}>
                    We will get back to you by email, usually within one working
                    day. If it is urgent, reply to that email and it comes
                    straight to us.
                  </p>
                  <Link className="btn" to="/work">
                    <span>See our work</span>
                    <span className="btn__arrow" aria-hidden="true">
                      &rarr;
                    </span>
                  </Link>
                </div>
              ) : (
                <form
                  className="form"
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  onSubmit={submit}
                  noValidate
                >
                  <input type="hidden" name="form-name" value="contact" />
                  {chosenPackage && (
                    <input
                      type="hidden"
                      name="package"
                      value={chosenPackage}
                    />
                  )}
                  <p className="hp" aria-hidden="true">
                    <label>
                      Do not fill this in
                      <input name="bot-field" tabIndex={-1} autoComplete="off" />
                    </label>
                  </p>

                  {chosenPackage && (
                    <p className="form__status">
                      Enquiring about the <strong>{chosenPackage}</strong>{' '}
                      package. Add anything else below and we will confirm the
                      details.
                    </p>
                  )}

                  <div className="form__grid form__grid--2">
                    <Field
                      name="name"
                      label="Your name"
                      autoComplete="name"
                      required
                      error={errors.name}
                    />
                    <Field
                      name="business"
                      label="Business name"
                      autoComplete="organization"
                    />
                  </div>

                  <div className="form__grid form__grid--2">
                    <Field
                      name="email"
                      type="email"
                      label="Email"
                      autoComplete="email"
                      inputMode="email"
                      required
                      error={errors.email}
                    />
                    <Field
                      name="phone"
                      type="tel"
                      label="Phone"
                      autoComplete="tel"
                      inputMode="tel"
                    />
                  </div>

                  <Field
                    name="whatsapp"
                    type="tel"
                    label="WhatsApp number"
                    inputMode="tel"
                    hint="Only if it differs from the number above."
                  />

                  <ChoiceGroup
                    legend="What do you need?"
                    name="need"
                    options={needs}
                    defaultValue={chosenPackage ? 'New website' : undefined}
                  />

                  <Field
                    as="textarea"
                    name="message"
                    label="Message"
                    required
                    error={errors.message}
                    placeholder="What does your business do, and what would you like the website to achieve?"
                  />

                  {status === 'invalid' && (
                    <p className="form__status form__status--error" role="alert">
                      Please check the highlighted fields and try again.
                    </p>
                  )}

                  {status === 'error' && (
                    <p className="form__status form__status--error" role="alert">
                      Something went wrong sending your message. Please try
                      again in a moment.
                    </p>
                  )}

                  <div className="form__foot">
                    <button
                      type="submit"
                      className="btn btn--lg"
                      disabled={status === 'submitting'}
                    >
                      <span>
                        {status === 'submitting' ? 'Sending…' : 'Send Enquiry'}
                      </span>
                      <span className="btn__arrow" aria-hidden="true">
                        &rarr;
                      </span>
                    </button>
                    <p className="small muted" style={{ maxWidth: '30ch' }}>
                      We reply to every enquiry, even the ones that turn out not
                      to be a fit.
                    </p>
                  </div>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
