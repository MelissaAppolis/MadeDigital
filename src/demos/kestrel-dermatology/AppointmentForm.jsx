import { useId, useState } from 'react'
import { isEmail, required } from '../../hooks/useFormSubmit.js'
import { reasonOptions } from './content.js'
import { ArrowIcon, CheckIcon } from './icons.jsx'

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']

function validate(values) {
  const errors = {}
  if (required(values.name)) errors.name = 'Please tell us your name'
  if (required(values.phone)) errors.phone = 'We need a number to call you back on'
  if (values.email && isEmail(values.email))
    errors.email = 'That email address does not look right'
  if (!values.consent) errors.consent = 'Please confirm so we can contact you'
  return errors
}

function Field({ as = 'input', name, label, optional, error, hint, ...rest }) {
  const id = useId()
  const describedBy = [error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(' ')
  const shared = {
    id,
    name,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': describedBy || undefined,
    ...rest,
  }
  return (
    <div className="kd-field">
      <label htmlFor={id}>
        {label} {optional && <span className="kd-field__opt">optional</span>}
      </label>
      {as === 'textarea' ? <textarea {...shared} /> : <input {...shared} />}
      {hint && (
        <p className="kd-field__hint" id={`${id}-hint`}>
          {hint}
        </p>
      )}
      {error && (
        <p className="kd-error" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  )
}

/** A set of pill-shaped options backed by real radios or checkboxes. */
function Chips({ legend, name, type = 'radio', options, value, onChange, compact = false }) {
  return (
    <fieldset className={`kd-chips${compact ? ' kd-chips--compact' : ''}`}>
      <legend>{legend}</legend>
      <div className="kd-chips__row">
        {options.map((o) => {
          const checked = type === 'radio' ? value === o.id : value.includes(o.id)
          return (
            <label key={o.id} className="kd-chip">
              <input
                type={type}
                name={name}
                value={o.id}
                checked={checked}
                onChange={() => onChange(o.id)}
              />
              <span>
                {type === 'checkbox' && checked && <CheckIcon size={15} />}
                {o.label}
              </span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

/**
 * The appointment request.
 *
 * A request, not a booking: reception phones back to confirm a time, the fee
 * and whether the patient's medical aid needs a referral. The success panel
 * says exactly that and never claims a slot is held.
 *
 * The form deliberately asks nothing clinical beyond a reason for the visit —
 * no symptoms, no photographs. Health information is special personal
 * information under POPIA, and the rooms are the right place for it.
 *
 * The concept has nowhere to send a request, so submission is handled
 * locally. To make it live, replace the wait in `handleSubmit` with a POST to
 * the practice's own system, and declare a matching hidden form in
 * index.html if it goes through Netlify Forms.
 *
 * `reason` is lifted to the page so the condition finder can preselect it.
 */
export default function AppointmentForm({ reason, onReasonChange }) {
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})
  const [patient, setPatient] = useState('new')
  const [referral, setReferral] = useState('unsure')
  const [prefDays, setPrefDays] = useState([])
  const [time, setTime] = useState('any')

  // Fall back rather than trust the incoming value: an unknown id would
  // otherwise leave no chip selected and nothing submitted.
  const safeReason = reasonOptions.some((r) => r.id === reason) ? reason : 'other'

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

  if (status === 'success') {
    return (
      <div className="kd-sent" role="status">
        <span className="kd-sent__mark" aria-hidden="true">
          <CheckIcon size={28} />
        </span>
        <h3>Thank you. We have your request.</h3>
        <p>
          Reception will phone you within one working day to offer a time and
          confirm the consultation fee. Your appointment is not booked until we
          have spoken.
        </p>
        <button type="button" className="kd-link" onClick={() => setStatus('idle')}>
          Send another request <ArrowIcon size={16} />
        </button>
      </div>
    )
  }

  const toggleDay = (d) =>
    setPrefDays((list) => (list.includes(d) ? list.filter((x) => x !== d) : [...list, d]))

  return (
    <form className="kd-form" onSubmit={handleSubmit} noValidate>
      <p className="kd-hp" aria-hidden="true">
        <label>
          Leave this empty
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <Chips
        legend="What is the appointment for?"
        name="reason"
        options={reasonOptions}
        value={safeReason}
        onChange={onReasonChange}
      />

      <div className="kd-form__pair">
        <Chips
          legend="Have you seen us before?"
          name="patient"
          options={[
            { id: 'new', label: 'New patient' },
            { id: 'returning', label: 'Returning' },
          ]}
          value={patient}
          onChange={setPatient}
        />
        <Chips
          legend="Do you have a referral?"
          name="referral"
          options={[
            { id: 'yes', label: 'Yes' },
            { id: 'no', label: 'No' },
            { id: 'unsure', label: 'Not sure' },
          ]}
          value={referral}
          onChange={setReferral}
        />
      </div>

      <div className="kd-form__grid">
        <Field name="name" label="Full name" autoComplete="name" error={errors.name} />
        <Field
          name="phone"
          type="tel"
          label="Mobile number"
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
          name="medicalAid"
          label="Medical aid & plan"
          optional
          placeholder="Or “private patient”"
        />
      </div>

      <div className="kd-form__pair kd-form__pair--days">
        <Chips
          compact
          legend="Days that suit you"
          name="days"
          type="checkbox"
          options={days.map((d) => ({ id: d, label: d }))}
          value={prefDays}
          onChange={toggleDay}
        />
        <Chips
          legend="Time of day"
          name="time"
          options={[
            { id: 'morning', label: 'Morning' },
            { id: 'afternoon', label: 'Afternoon' },
            { id: 'any', label: 'Any' },
          ]}
          value={time}
          onChange={setTime}
        />
      </div>

      <Field
        as="textarea"
        name="message"
        label="Anything reception should know"
        optional
        rows={3}
        hint="Please do not include medical details or photographs. We will discuss everything at your visit."
      />

      <div className="kd-consent">
        <label>
          <input
            type="checkbox"
            name="consent"
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? 'kd-consent-error' : undefined}
          />
          <span>
            I agree that the practice may use these details to contact me about
            an appointment.
          </span>
        </label>
        {errors.consent && (
          <p className="kd-error" id="kd-consent-error">
            {errors.consent}
          </p>
        )}
      </div>

      {status === 'invalid' && (
        <p className="kd-alert" role="alert">
          Please check the highlighted fields and try again.
        </p>
      )}

      <button type="submit" className="kd-btn kd-btn--lg kd-btn--block" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : 'Request an appointment'}
        {status !== 'submitting' && <ArrowIcon size={18} />}
      </button>
      <p className="kd-form__note">Not for emergencies. If you need urgent care, go to your nearest emergency unit.</p>
    </form>
  )
}
