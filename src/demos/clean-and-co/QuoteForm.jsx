import { useId, useState } from 'react'
import { isEmail, required } from '../../hooks/useFormSubmit.js'
import { whatsappHref } from './config.js'
import { frequencies, propertyTypes, serviceOptions } from './content.js'
import { CheckIcon, WhatsAppIcon } from './icons.jsx'

function validate(values) {
  const errors = {}
  if (required(values.name)) errors.name = 'Please tell us your name'
  if (required(values.phone))
    errors.phone = 'We need a number to send your quote to'
  if (values.email && isEmail(values.email))
    errors.email = 'That email address does not look right'
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
    <div className="cc-field">
      <label htmlFor={id}>
        {label} {optional && <span>(optional)</span>}
      </label>
      {as === 'textarea' && <textarea className="cc-textarea" {...shared} />}
      {as === 'select' && (
        <select className="cc-select" {...shared}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
      {as === 'input' && <input className="cc-input" {...shared} />}
      {error && (
        <p className="cc-error" id={errorId}>
          {error}
        </p>
      )}
    </div>
  )
}

/**
 * A radio group drawn as chips.
 *
 * Real radios, visually hidden but focusable, with the chip as their label —
 * so arrow keys move through the group and the focus ring lands on the chip.
 * Chips make a five-option question feel like one tap instead of a dropdown.
 */
function ChipGroup({ name, legend, options, defaultValue }) {
  return (
    <fieldset className="cc-chips">
      <legend>{legend}</legend>
      <div className="cc-chips__row">
        {options.map((option) => (
          <label className="cc-chip" key={option.value}>
            <input
              type="radio"
              name={name}
              value={option.value}
              defaultChecked={option.value === defaultValue}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

/**
 * The quote form.
 *
 * The concept has nowhere to send an enquiry, so submission is handled
 * locally: validate, show the submitting state, then the success panel.
 *
 * To make it live, replace the body of `handleSubmit` with a POST — Netlify
 * Forms (declare a matching hidden form in index.html), a serverless function,
 * or whatever the company already uses for leads.
 *
 * `service` / `onServiceChange` are lifted to the page so that picking a
 * service anywhere else on the site preselects it here.
 */
export default function QuoteForm({ service, onServiceChange }) {
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
    onServiceChange?.('')
  }

  if (status === 'success') {
    return (
      <div className="cc-success" role="status">
        <span className="cc-success__mark" aria-hidden="true">
          <CheckIcon size={22} />
        </span>
        <h3>Thank you — we have your details.</h3>
        <p>
          We will come back to you with a quote and a couple of times that could
          work for the clean.
        </p>
        <p className="cc-note">
          This is a website concept — the form is not connected to a real
          business.
        </p>
      </div>
    )
  }

  return (
    <form className="cc-form" onSubmit={handleSubmit} noValidate>
      <p className="cc-hp" aria-hidden="true">
        <label>
          Leave this empty
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="cc-form__row cc-form__row--2">
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

      <ChipGroup
        name="propertyType"
        legend="Property type"
        options={propertyTypes}
        defaultValue="home"
      />

      <div className="cc-form__row cc-form__row--2">
        <Field
          as="select"
          name="service"
          label="Service"
          options={serviceOptions}
          value={service}
          onChange={(event) => onServiceChange?.(event.target.value)}
        />
        <Field
          name="date"
          type="date"
          label="Preferred date"
          optional
          // A cleaning quote is never for a date in the past.
          min={new Date().toISOString().slice(0, 10)}
        />
      </div>

      <ChipGroup
        name="frequency"
        legend="How often?"
        options={frequencies}
        defaultValue="once-off"
      />

      <Field
        as="textarea"
        name="message"
        label="Anything else we should know?"
        optional
        rows={4}
        placeholder="Number of bedrooms and bathrooms, pets, parking, access — whatever helps us price it properly."
      />

      {status === 'invalid' && (
        <p className="cc-alert" role="alert">
          Please check the highlighted fields and try again.
        </p>
      )}

      <button
        type="submit"
        className="cc-btn cc-btn--block cc-btn--lg"
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? 'Sending…' : 'Request My Quote'}
      </button>

      <p className="cc-form__foot">
        <span>Would rather message?</span>
        <a
          className="cc-btn cc-btn--ghost cc-btn--sm"
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon size={15} />
          WhatsApp Us
        </a>
      </p>
    </form>
  )
}
