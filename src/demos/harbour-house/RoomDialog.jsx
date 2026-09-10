import { useEffect, useRef } from 'react'
import { scrollToSection } from '../_shared/scrollToSection.js'
import { images, whatsappHref } from './config.js'
import { ArrowIcon, CloseIcon, WhatsAppIcon, amenityIcons } from './icons.jsx'

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'

/**
 * The room detail view, as a modal dialog.
 *
 * A guest deciding between three rooms wants to compare them, and sending
 * them to a separate page each time loses their place in the list. The dialog
 * keeps the page underneath and returns focus to the card that opened it.
 *
 * Accessibility this has to get right, because a modal that traps a keyboard
 * user is worse than no modal at all:
 *   - role="dialog" aria-modal, labelled by the room name
 *   - focus moves in on open and returns to the trigger on close
 *   - Tab and Shift+Tab cycle inside; Escape closes
 *   - the page behind is scroll-locked and inert to pointer events
 */
export default function RoomDialog({ room, onClose, onEnquire }) {
  const panelRef = useRef(null)
  const closeRef = useRef(null)

  useEffect(() => {
    if (!room) return

    const opener = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKey = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
        return
      }
      if (event.key !== 'Tab') return

      const nodes = panelRef.current?.querySelectorAll(FOCUSABLE)
      if (!nodes?.length) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey, true)
    return () => {
      document.removeEventListener('keydown', onKey, true)
      document.body.style.overflow = previousOverflow
      // Returning focus to the card that opened the dialog is what keeps
      // keyboard navigation in place rather than dumping it at the top.
      if (opener instanceof HTMLElement) opener.focus({ preventScroll: true })
    }
  }, [room, onClose])

  if (!room) return null

  const enquire = () => {
    onEnquire?.(room.id)
    onClose()
    scrollToSection('#contact')
  }

  return (
    <div
      className="hh-modal"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        className="hh-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="hh-room-title"
        ref={panelRef}
      >
        <button
          type="button"
          className="hh-modal__close"
          onClick={onClose}
          ref={closeRef}
        >
          <CloseIcon size={18} />
          <span>Close</span>
        </button>

        <div className="hh-modal__scroll">
          <figure className="hh-modal__shot">
            <img
              src={room.images.main.src}
              alt={room.images.main.alt}
              width="1400"
              height="933"
              decoding="async"
            />
          </figure>

          <div className="hh-modal__body">
            <p className="hh-eyebrow">
              {room.index} · {room.sleeps}
            </p>
            <h2 id="hh-room-title" className="hh-modal__title">
              {room.name}
            </h2>
            <p className="hh-lede">{room.lede}</p>
            <p className="hh-modal__prose">{room.body}</p>

            <dl className="hh-modal__specs">
              {room.details.map((detail) => {
                const Icon = amenityIcons[detail.label] ?? null
                return (
                  <div key={detail.label}>
                    <dt>
                      {Icon && <Icon size={15} />}
                      {detail.label}
                    </dt>
                    <dd>{detail.value}</dd>
                  </div>
                )
              })}
            </dl>

            <div className="hh-modal__extras">
              <div>
                <p className="hh-eyebrow">In the room</p>
                <ul className="hh-ticks">
                  {room.amenities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <figure className="hh-modal__detail">
                <img
                  src={room.images.detail.src}
                  alt={room.images.detail.alt}
                  width="800"
                  height="800"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </div>

            <figure className="hh-modal__bath">
              <img
                src={images.bathroom.src}
                alt={images.bathroom.alt}
                width="1200"
                height="900"
                loading="lazy"
                decoding="async"
              />
              <figcaption>
                Every room has its own bathroom. The suite has a bath as well
                as a shower.
              </figcaption>
            </figure>

            <div className="hh-modal__actions">
              <button type="button" className="hh-btn hh-btn--lg" onClick={enquire}>
                Check Availability
                <ArrowIcon size={16} />
              </button>
              <a
                className="hh-btn hh-btn--ghost hh-btn--lg"
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon size={16} />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
