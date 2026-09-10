import { useRef } from 'react'
import { scrollToSection } from '../_shared/scrollToSection.js'
import { whatsappFor } from './config.js'
import { services } from './content.js'
import { ArrowIcon, WhatsAppIcon, serviceIcons } from './icons.jsx'

/** The directory is two columns wide on desktop, so up/down moves by two. */
const COLUMNS = 2

/**
 * The service directory and its job card.
 *
 * The eight services are set out as a ruled index — hairline seams forming a
 * continuous grid, no boxes, no shadows, nothing that reads as a card. Picking
 * one fills in the job card underneath: photograph, what gets checked, what is
 * included, and who the service is for.
 *
 * It is a real tab set, but a two-dimensional one: left and right step through
 * the row, up and down jump a row, Home and End go to the ends. The panel is
 * labelled by whichever cell is selected.
 *
 * Hovering a cell lifts its ground and brings up a small photograph at the
 * right-hand end. The photograph is already there at its final size and only
 * its opacity changes — it never moves or scales.
 */
export default function ServiceDirectory({ active, onSelect }) {
  const tabsRef = useRef([])

  // The booking form shares this state and can hold values the directory has
  // no record for — an empty selection, or "Other / not sure" — so the
  // directory falls back to its first entry rather than rendering nothing.
  const found = services.findIndex((service) => service.id === active)
  const index = found === -1 ? 0 : found
  const service = services[index]
  const selectedId = service.id

  const focusTab = (next) => {
    const clamped = (next + services.length) % services.length
    onSelect(services[clamped].id)
    tabsRef.current[clamped]?.focus()
  }

  const onKeyDown = (event) => {
    const moves = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      ArrowDown: index + COLUMNS,
      ArrowUp: index - COLUMNS,
      Home: 0,
      End: services.length - 1,
    }
    if (!(event.key in moves)) return
    event.preventDefault()
    focusTab(moves[event.key])
  }

  return (
    <div className="ah-directory">
      <div
        className="ah-index"
        role="tablist"
        aria-label="Services"
        onKeyDown={onKeyDown}
      >
        {services.map((item, i) => {
          // A service with no mark renders without one, rather than taking
          // the whole page down with it.
          const Icon = serviceIcons[item.id] ?? null
          const selected = item.id === selectedId
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`ah-svc-${item.id}`}
              aria-selected={selected}
              aria-controls="ah-job"
              tabIndex={selected ? 0 : -1}
              ref={(node) => {
                tabsRef.current[i] = node
              }}
              className={`ah-index__cell${selected ? ' is-active' : ''}`}
              onClick={() => onSelect(item.id)}
            >
              <span className="ah-index__num">{item.number}</span>

              <span className="ah-index__text">
                <span className="ah-index__name">
                  {Icon && <Icon size={20} />}
                  {item.title}
                </span>
                <span className="ah-index__short">{item.short}</span>
              </span>

              <span className="ah-index__shot" aria-hidden="true">
                <img
                  src={item.image.src}
                  alt=""
                  width="900"
                  height="675"
                  loading="lazy"
                  decoding="async"
                />
              </span>

              <span className="ah-index__mark" aria-hidden="true">
                <ArrowIcon size={16} />
              </span>
            </button>
          )
        })}
      </div>

      {/* The job card. One record, filled in from whichever cell is selected. */}
      <div
        className="ah-job"
        id="ah-job"
        role="tabpanel"
        aria-labelledby={`ah-svc-${service.id}`}
        tabIndex={-1}
      >
        <div className="ah-job__head">
          <h3 className="ah-job__title">
            <span className="ah-mono">{service.number}</span>
            {service.title}
          </h3>
          <div className="ah-job__actions">
            <a
              className="ah-btn ah-btn--sm"
              href="#booking"
              onClick={(event) => {
                event.preventDefault()
                scrollToSection('#booking')
              }}
            >
              Book This Service
              <ArrowIcon size={16} />
            </a>
            <a
              className="ah-btn ah-btn--ghost ah-btn--sm"
              href={whatsappFor(service.title.toLowerCase())}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon size={15} />
              WhatsApp
            </a>
          </div>
        </div>

        <div className="ah-job__body">
          <figure className="ah-job__shot">
            <img
              src={service.image.src}
              alt={service.image.alt}
              width="900"
              height="675"
              loading="lazy"
              decoding="async"
            />
          </figure>

          <div className="ah-job__col">
            <p className="ah-job__lede">{service.lede}</p>
            <h4 className="ah-mono ah-job__label">What we check</h4>
            <ul className="ah-speclist">
              {service.checks.map((check) => (
                <li key={check}>{check}</li>
              ))}
            </ul>
          </div>

          <div className="ah-job__col">
            <h4 className="ah-mono ah-job__label">What the service includes</h4>
            <ul className="ah-speclist">
              {service.includes.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <h4 className="ah-mono ah-job__label">Who it is for</h4>
            <p className="ah-job__who">{service.who}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
