import { useId, useState } from 'react'
import { isEmail, required } from '../../hooks/useFormSubmit.js'
import { serviceOptions, timeOptions } from './content.js'
import { ArrowIcon, CheckIcon } from './icons.jsx'

function validate(values) {
  const errors = {}
  if (required(values.name)) errors.name = 'Please tell us your name'
  if (required(values.phone))
    errors.phone = 'We need a number to confirm the booking on'
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
    <div className="ah-field">
      <label htmlFor={id} className="ah-mono">
        {label} {optional && <span>optional</span>}
      </label>
      {as === 'textarea' && <textarea className="ah-textarea" {...shared} />}
      {as === 'select' && (
        <select className="ah-select" {...shared}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
      {as === 'input' && <input className="ah-input" {...shared} />}
      {error && (
        <p className="ah-error" id={errorId}>
          {error}
        </p>
      )}
    </div>
  )
}

/**
 * The booking request form.
 *
 * The concept has nowhere to send a booking, so submission is handled
 * locally: validate, show the submitting state, then the confirmation panel.
 *
 * To make it live, replace the body of `handleSubmit` with a POST — Netlify
 * Forms (declare a matching hidden form in index.html with these exact field
 * names), a serverless function, or whatever the workshop already uses.
 *
 * `service` / `onServiceChange` are lifted to the page, so choosing a service
 * anywhere else on the site arrives here already selected.
 */
export default function BookingForm({ service, onServiceChange }) {
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
      <div className="ah-success" role="status">
        <span className="ah-success__mark" aria-hidden="true">
          <CheckIcon size={22} />
        </span>
        <h3>Booking request received.</h3>
        <p>
          We will come back to you to confirm a date, a drop-off time and what
          the visit is likely to involve.
        </p>
        <p className="ah-note">
          This is a website concept — the form is not connected to a real
          workshop.
        </p>
      </div>
    )
  }

  return (
    <form className="ah-form" onSubmit={handleSubmit} noValidate>
      <p className="ah-hp" aria-hidden="true">
        <label>
          Leave this empty
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="ah-form__grid">
        <Field name="name" label="Name" autoComplete="name" error={errors.name} />
        <Field
          name="phone"
          type="tel"
          label="Phone"
          inputMode="tel"
          autoComplete="tel"
          error={errors.phone}
        />
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
          options={serviceOptions}
          value={service}
          onChange={(event) => onServiceChange?.(event.target.value)}
        />
        {/* Make, model and year belong together, so they share one row
            rather than leaving a field orphaned in the two-column grid. */}
        <div className="ah-form__vehicle">
          <Field
            name="vehicleMake"
            label="Vehicle make"
            placeholder="e.g. Volkswagen"
            optional
          />
          <Field
            name="vehicleModel"
            label="Vehicle model"
            placeholder="e.g. Polo 1.4"
            optional
          />
          <Field
            name="vehicleYear"
            label="Year"
            placeholder="e.g. 2018"
            inputMode="numeric"
            pattern="[0-9]{4}"
            maxLength={4}
            optional
          />
        </div>
        <Field
          name="date"
          type="date"
          label="Preferred date"
          optional
          // A booking is never for a date in the past.
          min={new Date().toISOString().slice(0, 10)}
        />
        <Field
          as="select"
          name="time"
          label="Preferred time"
          options={timeOptions}
          defaultValue=""
        />
      </div>

      <Field
        as="textarea"
        name="message"
        label="What is it doing?"
        optional
        rows={4}
        placeholder="Noises, warning lights, when it happens, anything you have already been told — whatever helps us prepare."
      />

      {status === 'invalid' && (
        <p className="ah-alert" role="alert">
          Please check the highlighted fields and try again.
        </p>
      )}

      <button
        type="submit"
        className="ah-btn ah-btn--lg ah-btn--block"
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? 'Sending…' : 'Request a Booking'}
        {status !== 'submitting' && <ArrowIcon size={18} />}
      </button>
    </form>
  )
}
