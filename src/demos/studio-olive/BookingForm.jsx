import { useId, useState } from 'react'
import { isEmail, required } from '../../hooks/useFormSubmit.js'
import { timeOptions, treatmentOptions } from './content.js'
import { Sprig, WhatsAppIcon } from './icons.jsx'
import { whatsappHref } from './config.js'

function validate(values) {
  const errors = {}
  if (required(values.name)) errors.name = 'Please tell us your name'
  if (required(values.phone))
    errors.phone = 'We need a number to confirm your appointment'
  if (values.email && isEmail(values.email))
    errors.email = 'That email address does not look right'
  return errors
}

/** One labelled control. Underlined rather than boxed, to match the site. */
function Field({ as = 'input', name, label, optional, error, options, ...rest }) {
  const id = useId()
  const errorId = `${id}-error`
  const shared = {
    id,
    name,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errorId : undefined,
    ...rest,
  }

  return (
    <div className="so-field">
      <label htmlFor={id}>
        {label} {optional && <span>(optional)</span>}
      </label>
      {as === 'textarea' && <textarea className="so-textarea" {...shared} />}
      {as === 'select' && (
        <select className="so-select" {...shared}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
      {as === 'input' && <input className="so-input" {...shared} />}
      {error && (
        <p className="so-error" id={errorId}>
          {error}
        </p>
      )}
    </div>
  )
}

/**
 * Appointment request form.
 *
 * The concept has nowhere to send a booking, so submission is handled locally:
 * validate, show the submitting state, then the success panel.
 *
 * To make it live, replace the body of `handleSubmit` with a POST — Netlify
 * Forms (declare a matching hidden form in index.html), a serverless function,
 * or whatever booking system the studio uses. The markup and states are
 * production-ready as they stand.
 *
 * `treatment` is controlled so the treatment menu can preselect it when
 * someone taps "Book <treatment>".
 */
export default function BookingForm({ treatment, onTreatmentChange }) {
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})

  async function handleSubmit(event) {
    event.preventDefault()
    const form = event.target
    const values = Object.fromEntries(new FormData(form).entries())

    if (values['bot-field']) {
      setStatus('success')
      return
    }

    const found = validate(values)
    setErrors(found)

    if (Object.keys(found).length > 0) {
      setStatus('invalid')
      form.querySelector(`[name="${Object.keys(found)[0]}"]`)?.focus()
      return
    }

    setStatus('submitting')
    // --- Replace with a real submission ------------------------------------
    await new Promise((resolve) => setTimeout(resolve, 700))
    // -----------------------------------------------------------------------
    setStatus('success')
    form.reset()
    onTreatmentChange?.('')
  }

  if (status === 'success') {
    return (
      <div className="so-success" role="status">
        <Sprig size={52} className="so-sprig" />
        <h3 style={{ fontSize: 'clamp(1.5rem, 2vw + 1rem, 2.1rem)' }}>
          Thank you — your request is with us.
        </h3>
        <p style={{ margin: 0, maxWidth: '42ch' }}>
          We will confirm your appointment shortly. If you would like to change
          anything before then, send us a message and we will sort it out.
        </p>
        <a
          className="so-btn so-btn--outline"
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon />
          WhatsApp Us
        </a>
        <p className="so-form__note">
          This is a website concept — the form is not connected to a real
          business.
        </p>
      </div>
    )
  }

  return (
    <form className="so-form" onSubmit={handleSubmit} noValidate>
      <p className="so-hp" aria-hidden="true">
        <label>
          Leave this empty
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="so-form__row so-form__row--2">
        <Field name="name" label="Name" autoComplete="name" error={errors.name} />
        <Field
          name="phone"
          type="tel"
          label="Phone"
          inputMode="tel"
          autoComplete="tel"
          error={errors.phone}
        />
      </div>

      <Field
        name="email"
        type="email"
        label="Email"
        optional
        inputMode="email"
        autoComplete="email"
        error={errors.email}
      />

      <Field
        as="select"
        name="treatment"
        label="Treatment"
        options={treatmentOptions}
        value={treatment}
        onChange={(e) => onTreatmentChange?.(e.target.value)}
      />

      <div className="so-form__row so-form__row--2">
        <Field
          name="date"
          type="date"
          label="Preferred date"
          optional
        />
        <Field
          as="select"
          name="time"
          label="Preferred time"
          optional
          options={timeOptions}
          defaultValue=""
        />
      </div>

      <Field
        as="textarea"
        name="message"
        label="Message"
        optional
        placeholder="Anything we should know before your appointment?"
      />

      {status === 'invalid' && (
        <p className="so-alert" role="alert">
          Please check the highlighted fields and try again.
        </p>
      )}

      <button
        type="submit"
        className="so-btn so-btn--block"
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? 'Sending…' : 'Request Appointment'}
      </button>

      <p className="so-form__note">
        We will only use your details to arrange this appointment.
      </p>
    </form>
  )
}
