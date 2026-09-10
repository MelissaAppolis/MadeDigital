import { useId } from 'react'
import { scrollToSection } from '../_shared/scrollToSection.js'
import { guestOptions } from './content.js'
import { ArrowIcon, CalendarIcon, GuestIcon } from './icons.jsx'

const today = () => new Date().toISOString().slice(0, 10)

/**
 * The booking panel that sits across the bottom edge of the hero photograph.
 *
 * There is no booking engine behind this and the concept does not pretend
 * otherwise: nothing here reports availability, prices or a confirmed
 * reservation. "Check Availability" carries the dates and guest count down to
 * the enquiry form, already filled in, and the guesthouse answers. That is
 * how a small guesthouse actually takes a direct booking, and it is honest
 * about what the visitor is doing.
 *
 * `stay` / `onStayChange` are lifted to the page so the same values are shared
 * with the enquiry form and with every room's "Check Availability" button.
 */
export default function BookingBar({ stay, onStayChange, variant = 'hero' }) {
  const id = useId()
  const set = (key) => (event) =>
    onStayChange({ ...stay, [key]: event.target.value })

  const submit = (event) => {
    event.preventDefault()
    scrollToSection('#contact')
  }

  return (
    <form
      className={`hh-booking hh-booking--${variant}`}
      onSubmit={submit}
      aria-label="Check availability"
    >
      <div className="hh-booking__field">
        <label className="hh-eyebrow" htmlFor={`${id}-in`}>
          Check-in
        </label>
        <span className="hh-booking__input">
          <CalendarIcon size={15} />
          <input
            id={`${id}-in`}
            type="date"
            name="checkIn"
            value={stay.checkIn}
            min={today()}
            onChange={set('checkIn')}
          />
        </span>
      </div>

      <div className="hh-booking__field">
        <label className="hh-eyebrow" htmlFor={`${id}-out`}>
          Check-out
        </label>
        <span className="hh-booking__input">
          <CalendarIcon size={15} />
          <input
            id={`${id}-out`}
            type="date"
            name="checkOut"
            value={stay.checkOut}
            // Never before the arrival date, and never in the past.
            min={stay.checkIn || today()}
            onChange={set('checkOut')}
          />
        </span>
      </div>

      <div className="hh-booking__field">
        <label className="hh-eyebrow" htmlFor={`${id}-guests`}>
          Guests
        </label>
        <span className="hh-booking__input">
          <GuestIcon size={15} />
          <select
            id={`${id}-guests`}
            name="guests"
            value={stay.guests}
            onChange={set('guests')}
          >
            {guestOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </span>
      </div>

      <button type="submit" className="hh-btn hh-booking__go">
        Check Availability
        <ArrowIcon size={16} />
      </button>
    </form>
  )
}
