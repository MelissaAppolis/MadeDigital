import { useId, useState } from 'react'
import { isEmail, required } from '../../hooks/useFormSubmit.js'
import { serviceOptions } from './content.js'
import { CheckIcon, WhatsAppIcon } from './icons.jsx'
import { whatsappHref } from './config.js'

function validate(values) {
  const errors = {}
  if (required(values.name)) errors.name = 'Please tell us your name'
  if (required(values.phone))
    errors.phone = 'We need a number to call you back on'
  if (values.email && isEmail(values.email))
    errors.email = 'That email address does not look right'
  if (required(values.details))
    errors.details = 'A sentence about the problem is enough'
  return errors
}

/** One labelled control, wired up for errors. */
function Field({ as = 'input', name, label, optional, error, ...rest }) {
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
    <div className="ctp-field">
      <label htmlFor={id}>
        {label} {optional && <span>(optional)</span>}
      </label>
      {as === 'textarea' && <textarea className="ctp-textarea" {...shared} />}
      {as === 'select' && (
        <select className="ctp-select" {...shared}>
          {serviceOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
      {as === 'input' && <input className="ctp-input" {...shared} />}
      {error && (
        <p className="ctp-error" id={errorId}>
          {error}
        </p>
      )}
    </div>
  )
}

/**
 * Quote request form.
 *
 * The concept has nowhere to send an enquiry, so submission is handled
 * locally: validate, show the submitting state, then show the success panel.
 *
 * To make it live, replace the body of `handleSubmit` below with a POST — a
 * Netlify Forms submission (declare a matching hidden form in index.html), a
 * serverless function, or whatever the business already uses for leads. The
 * markup and states are production-ready as they stand.
 */
export default function QuoteForm() {
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
  }

  if (status === 'success') {
    return (
      <div className="ctp-formcard">
        <div className="ctp-success" role="status">
          <span className="ctp-success__mark" aria-hidden="true">
            <CheckIcon size={22} />
          </span>
          <h3>Thanks — we’ve got your request.</h3>
          <p>
            We’ll be in touch shortly to confirm the details and arrange a time.
            If it’s urgent, send us a WhatsApp and we’ll pick it up faster.
          </p>
          <a
            className="ctp-btn ctp-btn--wa"
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon size={18} />
            WhatsApp Us
          </a>
          <p className="ctp-form__note">
            This is a website concept — the form is not connected to a real
            business.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="ctp-formcard">
      <form className="ctp-form" onSubmit={handleSubmit} noValidate>
        <p className="ctp-hp" aria-hidden="true">
          <label>
            Leave this empty
            <input name="bot-field" tabIndex={-1} autoComplete="off" />
          </label>
        </p>

        <div className="ctp-form__row ctp-form__row--2">
          <Field
            name="name"
            label="Name"
            autoComplete="name"
            error={errors.name}
          />
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
          name="service"
          label="Service required"
          defaultValue=""
        />

        <Field
          as="textarea"
          name="details"
          label="Brief description of the problem"
          placeholder="For example: the kitchen sink is draining slowly and there is water under the cupboard."
          error={errors.details}
        />

        {status === 'invalid' && (
          <p className="ctp-alert" role="alert">
            Please check the highlighted fields and try again.
          </p>
        )}

        <button
          type="submit"
          className="ctp-btn ctp-btn--accent ctp-btn--lg ctp-btn--block"
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? 'Sending…' : 'Request a Quote'}
        </button>

        <p className="ctp-form__note">
          We’ll only use your details to respond to this enquiry.
        </p>
      </form>
    </div>
  )
}
