import { useId, useState } from 'react'
import { isEmail, required } from '../../hooks/useFormSubmit.js'
import { projectScopes, projectTypes } from './content.js'
import { whatsappHref } from './config.js'
import { CheckIcon, WhatsAppIcon } from './icons.jsx'

function validate(values) {
  const errors = {}
  if (required(values.name)) errors.name = 'Please tell us your name'
  if (required(values.phone))
    errors.phone = 'We need a number to call you back on'
  if (values.email && isEmail(values.email))
    errors.email = 'That email address does not look right'
  if (required(values.message))
    errors.message = 'A short description of the project is enough'
  return errors
}

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
    <div className="cb-field">
      <label htmlFor={id}>
        {label} {optional && <span>(optional)</span>}
      </label>
      {as === 'textarea' && <textarea className="cb-textarea" {...shared} />}
      {as === 'select' && (
        <select className="cb-select" {...shared}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
      {as === 'input' && <input className="cb-input" {...shared} />}
      {error && (
        <p className="cb-error" id={errorId}>
          {error}
        </p>
      )}
    </div>
  )
}

/**
 * Project enquiry form.
 *
 * The concept has nowhere to send an enquiry, so submission is handled
 * locally: validate, show the submitting state, then the success panel.
 *
 * To make it live, replace the body of `handleSubmit` with a POST — Netlify
 * Forms (declare a matching hidden form in index.html), a serverless function,
 * or whatever the builder already uses for leads.
 */
export default function EnquiryForm() {
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
      <div className="cb-success" role="status">
        <span className="cb-success__mark" aria-hidden="true">
          <CheckIcon size={20} />
        </span>
        <h3 style={{ fontSize: 'clamp(1.375rem, 2vw + 1rem, 2rem)' }}>
          Thank you — we have your enquiry.
        </h3>
        <p style={{ margin: 0, maxWidth: '44ch' }}>
          We will come back to you to arrange a time to look at the property and
          talk through what you are planning.
        </p>
        <p className="cb-form__note">
          This is a website concept — the form is not connected to a real
          business.
        </p>
      </div>
    )
  }

  return (
    <form className="cb-form" onSubmit={handleSubmit} noValidate>
      <p className="cb-hp" aria-hidden="true">
        <label>
          Leave this empty
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="cb-form__row cb-form__row--2">
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

      <div className="cb-form__row cb-form__row--2">
        <Field
          as="select"
          name="projectType"
          label="Project type"
          options={projectTypes}
          defaultValue=""
        />
        <Field
          name="location"
          label="Property location"
          placeholder="Suburb"
          optional
        />
      </div>

      <Field
        as="select"
        name="scope"
        label="Approximate project scope"
        options={projectScopes}
        defaultValue=""
      />

      <Field
        as="textarea"
        name="message"
        label="Message"
        error={errors.message}
        placeholder="What are you planning, and roughly when would you like to start?"
      />

      {status === 'invalid' && (
        <p className="cb-alert" role="alert">
          Please check the highlighted fields and try again.
        </p>
      )}

      <button
        type="submit"
        className="cb-btn cb-btn--block"
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? 'Sending…' : 'Submit Project Enquiry'}
      </button>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '0.75rem 1.25rem',
        }}
      >
        <p className="cb-form__note">Prefer WhatsApp?</p>
        <a
          className="cb-btn cb-btn--ghost cb-btn--sm"
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon size={15} />
          WhatsApp Us
        </a>
      </div>
    </form>
  )
}
