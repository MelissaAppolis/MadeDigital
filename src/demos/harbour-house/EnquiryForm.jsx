import { useId, useState } from 'react'
import { isEmail, required } from '../../hooks/useFormSubmit.js'
import { guestOptions, roomOptions } from './content.js'
import { ArrowIcon } from './icons.jsx'

function validate(values) {
  const errors = {}
  if (required(values.name)) errors.name = 'Please tell us your name'
  if (required(values.email)) errors.email = 'We need an email to reply to'
  else if (isEmail(values.email))
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
    <div className="hh-field">
      <label htmlFor={id} className="hh-eyebrow">
        {label} {optional && <span>optional</span>}
      </label>
      {as === 'textarea' && <textarea className="hh-textarea" {...shared} />}
      {as === 'select' && (
        <select className="hh-select" {...shared}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
      {as === 'input' && <input className="hh-input" {...shared} />}
      {error && (
        <p className="hh-error" id={errorId}>
          {error}
        </p>
      )}
    </div>
  )
}

/**
 * The enquiry form.
 *
 * The concept has nowhere to send an enquiry, so submission is handled
 * locally: validate, show the sending state, then a confirmation panel that is
 * careful to say a person will confirm — it never claims a room is booked or
 * held, because nothing behind this checked.
 *
 * To make it live, replace the body of `handleSubmit` with a POST — Netlify
 * Forms (declare a matching hidden form in index.html with these exact field
 * names), a serverless function, or whatever the guesthouse already uses.
 *
 * `stay` is lifted to the page, so dates chosen in the hero booking bar or a
 * room chosen in the room dialog arrive here already filled in.
 */
export default function EnquiryForm({ stay, onStayChange }) {
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
    await new Promise((resolve) => setTimeout(resolve, 650))
    setStatus('success')
  }

  const set = (key) => (event) =>
    onStayChange({ ...stay, [key]: event.target.value })

  if (status === 'success') {
    return (
      <div className="hh-sent" role="status">
        <p className="hh-eyebrow">Enquiry sent</p>
        <h3 className="hh-sent__title">Thank you — we have your dates.</h3>
        <p>
          Someone will come back to you by email to confirm whether we have the
          room free and what it would cost. Nothing is held or booked yet.
        </p>
        <button
          type="button"
          className="hh-link"
          onClick={() => setStatus('idle')}
        >
          Send another enquiry
          <ArrowIcon size={16} />
        </button>
      </div>
    )
  }

  return (
    <form className="hh-form" onSubmit={handleSubmit} noValidate>
      {/* Honeypot: a real person never fills this in. */}
      <p className="hh-hp" aria-hidden="true">
        <label>
          Leave this empty
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="hh-form__grid">
        <Field name="name" label="Name" autoComplete="name" error={errors.name} />
        <Field
          name="email"
          type="email"
          label="Email"
          inputMode="email"
          autoComplete="email"
          error={errors.email}
        />
        <Field
          name="phone"
          type="tel"
          label="Phone"
          optional
          inputMode="tel"
          autoComplete="tel"
        />
        <Field
          as="select"
          name="room"
          label="Room"
          options={roomOptions}
          value={stay.room}
          onChange={set('room')}
        />
        <Field
          name="checkIn"
          type="date"
          label="Check-in"
          optional
          value={stay.checkIn}
          min={new Date().toISOString().slice(0, 10)}
          onChange={set('checkIn')}
        />
        <Field
          name="checkOut"
          type="date"
          label="Check-out"
          optional
          value={stay.checkOut}
          min={stay.checkIn || new Date().toISOString().slice(0, 10)}
          onChange={set('checkOut')}
        />
        <Field
          as="select"
          name="guests"
          label="Guests"
          options={guestOptions}
          value={stay.guests}
          onChange={set('guests')}
        />
      </div>

      <Field
        as="textarea"
        name="message"
        label="Message"
        optional
        rows={4}
        placeholder="Anything that would help — arrival time, what brings you to Cape Town, dietary requirements, whether you need parking."
      />

      {status === 'invalid' && (
        <p className="hh-alert" role="alert">
          Please check the highlighted fields and try again.
        </p>
      )}

      <button
        type="submit"
        className="hh-btn hh-btn--lg hh-btn--block"
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? 'Sending…' : 'Send Enquiry'}
        {status !== 'submitting' && <ArrowIcon size={16} />}
      </button>
    </form>
  )
}
