import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useSeo } from '../hooks/useSeo.js'
import { isEmail, required, useFormSubmit } from '../hooks/useFormSubmit.js'
import Reveal from '../components/Reveal.jsx'
import Field from '../components/Field.jsx'
import { CtaBand } from '../components/Sections.jsx'

const industries = [
  { value: '', label: 'Select your industry' },
  { value: 'Plumbing', label: 'Plumbing' },
  { value: 'Electrical', label: 'Electrical' },
  { value: 'Building / construction', label: 'Building / construction' },
  { value: 'Cleaning', label: 'Cleaning' },
  { value: 'Landscaping', label: 'Landscaping' },
  { value: 'Automotive', label: 'Automotive' },
  { value: 'Hair / beauty', label: 'Hair / beauty' },
  { value: 'Professional services', label: 'Professional services' },
  { value: 'Hospitality / guesthouse', label: 'Hospitality / guesthouse' },
  { value: 'Retail', label: 'Retail' },
  { value: 'Other', label: 'Other' },
]

const improvements = [
  { value: '', label: 'Select what matters most' },
  { value: 'How it looks', label: 'How it looks' },
  { value: 'Mobile experience', label: 'How it works on a phone' },
  { value: 'More enquiries', label: 'Getting more enquiries' },
  { value: 'Being found on Google', label: 'Being found on Google' },
  { value: 'Speed', label: 'How fast it loads' },
  { value: 'Everything', label: 'Honestly, all of it' },
]

const checks = [
  {
    title: 'First impression',
    body: 'What someone thinks in the first three seconds, and whether it matches the quality of your work.',
  },
  {
    title: 'Mobile experience',
    body: 'How the site behaves on a phone — text size, tap targets, layout, load time on mobile data.',
  },
  {
    title: 'Getting in touch',
    body: 'How obvious it is to call, WhatsApp or send an enquiry, and how much friction is in the way.',
  },
  {
    title: 'Being found',
    body: 'Page titles, structure and Google Business basics that decide whether you show up locally.',
  },
]

export default function WebsiteReview() {
  useSeo({
    title: 'Free Website Review | Made Digital Cape Town',
    description:
      'Get a free, no-obligation review of your website. We identify the biggest opportunities to improve your design, mobile experience and ability to generate enquiries.',
  })

  const validate = useCallback((values) => {
    const errors = {}
    if (required(values.name)) errors.name = 'Please tell us your name'
    if (required(values.email)) errors.email = 'We need an email to send the review to'
    else if (isEmail(values.email)) errors.email = isEmail(values.email)
    return errors
  }, [])

  const { status, errors, submit } = useFormSubmit('website-review', validate)

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="page-hero__grid">
            <Reveal>
              <p className="eyebrow">Free website review</p>
              <h1 style={{ marginTop: '1.5rem' }}>
                Is your website costing you customers?
              </h1>
            </Reveal>
            <Reveal delay={100}>
              <p className="lede">
                Get a free, no-obligation review of your website. We’ll identify
                the biggest opportunities to improve your design, mobile
                experience and ability to generate enquiries.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 'clamp(2rem, 4vw, 3rem)' }}>
        <div className="container">
          <div className="split split--sticky">
            <Reveal>
              <p className="eyebrow">What we look at</p>
              <ul
                style={{ display: 'grid', gap: '2rem', marginTop: '2rem' }}
              >
                {checks.map((check, i) => (
                  <li key={check.title}>
                    <p className="benefit__num">0{i + 1}</p>
                    <h2 style={{ fontSize: 'var(--t-xl)', marginBottom: '0.5rem' }}>
                      {check.title}
                    </h2>
                    <p className="muted" style={{ maxWidth: '38ch' }}>
                      {check.body}
                    </p>
                  </li>
                ))}
              </ul>

              <p
                className="small muted"
                style={{
                  marginTop: '2.5rem',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid var(--line)',
                  maxWidth: '40ch',
                }}
              >
                No website yet? Send the form anyway and leave the URL blank —
                we will come back with what we would build first and why.
              </p>
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
                    Thank you — your request is in.
                  </h2>
                  <p className="muted" style={{ maxWidth: '44ch' }}>
                    We will look at your website properly and come back to you
                    by email, usually within two working days. There is nothing
                    else you need to do.
                  </p>
                  <Link className="btn" to="/work">
                    <span>See our work while you wait</span>
                    <span className="btn__arrow" aria-hidden="true">
                      &rarr;
                    </span>
                  </Link>
                </div>
              ) : (
                <form
                  className="form"
                  name="website-review"
                  method="POST"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  onSubmit={submit}
                  noValidate
                >
                  <input type="hidden" name="form-name" value="website-review" />
                  <p className="hp" aria-hidden="true">
                    <label>
                      Do not fill this in
                      <input name="bot-field" tabIndex={-1} autoComplete="off" />
                    </label>
                  </p>

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
                      label="Phone / WhatsApp"
                      autoComplete="tel"
                      inputMode="tel"
                    />
                  </div>

                  <Field
                    name="website"
                    type="url"
                    label="Website URL"
                    placeholder="https://"
                    inputMode="url"
                    hint="Leave blank if you do not have one yet."
                  />

                  <div className="form__grid form__grid--2">
                    <Field
                      as="select"
                      name="industry"
                      label="Industry"
                      options={industries}
                      defaultValue=""
                    />
                    <Field
                      as="select"
                      name="improve"
                      label="What would you like to improve?"
                      options={improvements}
                      defaultValue=""
                    />
                  </div>

                  <Field
                    as="textarea"
                    name="message"
                    label="Additional message"
                    placeholder="Anything else we should know before we look?"
                  />

                  {status === 'invalid' && (
                    <p className="form__status form__status--error" role="alert">
                      Please check the highlighted fields and try again.
                    </p>
                  )}

                  {status === 'error' && (
                    <p className="form__status form__status--error" role="alert">
                      Something went wrong sending your request. Please try
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
                        {status === 'submitting'
                          ? 'Sending…'
                          : 'Request My Free Review'}
                      </span>
                      <span className="btn__arrow" aria-hidden="true">
                        &rarr;
                      </span>
                    </button>
                    <p className="small muted" style={{ maxWidth: '30ch' }}>
                      No cost, no obligation, and we will not add you to any
                      mailing list.
                    </p>
                  </div>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Or skip the form"
        title="Would rather just talk it through?"
        body="Send us a message instead and tell us what you are trying to fix. We will reply either way."
        primary={{ to: '/contact', label: 'Contact Us' }}
        secondary={{ to: '/packages', label: 'See packages' }}
      />
    </>
  )
}
