import { useRef, useState } from 'react'
import { scrollToSection } from '../_shared/scrollToSection.js'
import { whatsappFor } from './config.js'
import { selectorOptions } from './content.js'
import { ArrowIcon, CheckIcon, WhatsAppIcon, selectorIcons } from './icons.jsx'

/**
 * "What needs cleaning?" — the quick service selector.
 *
 * Built as a proper tab set: roving tabindex, arrow keys, Home/End, and one
 * panel labelled by its tab. That is what a sighted mouse user already gets
 * from five big buttons, given to everyone else as well.
 *
 * The panel photograph is swapped, not animated. There is no cross-fade, no
 * slide and no zoom — the image simply is the selected one.
 */
export default function ServiceSelector() {
  const [active, setActive] = useState(selectorOptions[0].id)
  const tabsRef = useRef([])

  const index = selectorOptions.findIndex((option) => option.id === active)
  const option = selectorOptions[index]
  const Icon = selectorIcons[option.id]

  const focusTab = (next) => {
    const clamped = (next + selectorOptions.length) % selectorOptions.length
    setActive(selectorOptions[clamped].id)
    tabsRef.current[clamped]?.focus()
  }

  const onKeyDown = (event) => {
    const keys = {
      ArrowRight: index + 1,
      ArrowDown: index + 1,
      ArrowLeft: index - 1,
      ArrowUp: index - 1,
      Home: 0,
      End: selectorOptions.length - 1,
    }
    if (!(event.key in keys)) return
    event.preventDefault()
    focusTab(keys[event.key])
  }

  return (
    <div className="cc-picker">
      <div
        className="cc-picker__tabs"
        role="tablist"
        aria-label="What needs cleaning?"
        onKeyDown={onKeyDown}
      >
        {selectorOptions.map((item, i) => {
          const TabIcon = selectorIcons[item.id]
          const selected = item.id === active
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`cc-tab-${item.id}`}
              aria-selected={selected}
              aria-controls="cc-picker-panel"
              tabIndex={selected ? 0 : -1}
              ref={(node) => {
                tabsRef.current[i] = node
              }}
              className={`cc-picker__tab${selected ? ' is-active' : ''}`}
              onClick={() => setActive(item.id)}
            >
              <TabIcon size={26} />
              <span className="cc-picker__label">{item.label}</span>
              <span className="cc-picker__hint">{item.hint}</span>
            </button>
          )
        })}
      </div>

      <div
        className="cc-picker__panel"
        id="cc-picker-panel"
        role="tabpanel"
        aria-labelledby={`cc-tab-${option.id}`}
        tabIndex={-1}
      >
        <div className="cc-picker__text">
          <p className="cc-picker__eyebrow">
            <Icon size={18} />
            {option.label}
          </p>
          <p className="cc-picker__body">{option.body}</p>

          <ul className="cc-ticks">
            {option.points.map((point) => (
              <li key={point}>
                <CheckIcon size={16} />
                {point}
              </li>
            ))}
          </ul>

          <div className="cc-btns">
            <a
              className="cc-btn"
              href="#quote"
              onClick={(event) => {
                event.preventDefault()
                scrollToSection('#quote')
              }}
            >
              {option.cta}
              <ArrowIcon size={17} />
            </a>
            <a
              className="cc-btn cc-btn--ghost"
              href={whatsappFor(option.subject)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon size={16} />
              WhatsApp Us
            </a>
          </div>
        </div>

        {/* One static photograph per option. Swapped, never animated. */}
        <figure className="cc-picker__shot">
          <img
            src={option.image.src}
            alt={option.image.alt}
            width="1000"
            height="750"
            loading="lazy"
            decoding="async"
          />
        </figure>
      </div>
    </div>
  )
}
