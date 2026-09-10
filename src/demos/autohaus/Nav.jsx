import { useCallback, useEffect, useRef, useState } from 'react'
import { scrollToSection } from '../_shared/scrollToSection.js'
import { businessConfig, whatsappHref } from './config.js'
import { navLinks } from './content.js'
import { ArrowIcon, PhoneIcon, WhatsAppIcon } from './icons.jsx'

/**
 * Fixed navigation bar.
 *
 * Solid from the first pixel and never transparent: the hero is a split, so
 * the bar sits over the dark panel on one side and a photograph on the other,
 * and a solid bar is the only thing that reads correctly across both.
 *
 * The mobile menu is a full-viewport panel rather than a drawer — it opens
 * below the bar and covers everything, so the page behind never shows through.
 */
export default function Nav() {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const mq = window.matchMedia('(min-width: 1040px)')
    const onChange = (e) => e.matches && setOpen(false)

    document.addEventListener('keydown', onKey)
    mq.addEventListener('change', onChange)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onChange)
    }
  }, [open])

  const onNavClick = useCallback((event, href) => {
    event.preventDefault()
    setOpen(false)
    scrollToSection(href)
  }, [])

  return (
    <header className="ah-nav">
      <div className="ah-container ah-nav__inner">
        <a
          className="ah-logo"
          href="#top"
          onClick={(e) => onNavClick(e, '#top')}
          aria-label={`${businessConfig.name} — back to top`}
        >
          <span className="ah-logo__mark" aria-hidden="true" />
          <span className="ah-logo__name">{businessConfig.logo}</span>
          <span className="ah-logo__sub">{businessConfig.logoSuffix}</span>
        </a>

        <nav className="ah-nav__links" aria-label="Main">
          {navLinks.map((link) => (
            <a
              key={link.href}
              className="ah-nav__link"
              href={link.href}
              onClick={(e) => onNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ah-nav__actions">
          <a className="ah-nav__tel" href={businessConfig.phoneHref}>
            <PhoneIcon size={15} />
            {businessConfig.phoneDisplay}
          </a>
          {/* The full label does not fit beside the menu control on a small
              phone, and a nav that clips is not caught by a page-level
              overflow check — so the label itself shortens. */}
          <a
            className="ah-btn ah-btn--sm ah-nav__cta"
            href="#booking"
            onClick={(e) => onNavClick(e, '#booking')}
          >
            {/* One flex item, not two: .ah-btn has a gap for its icon, and a
                bare text node beside a span would have that gap applied
                between the two halves of the label. */}
            <span>
              Book<span className="ah-nav__cta-rest"> a Service</span>
            </span>
          </a>

          {/* A labelled control rather than a bare burger — the rest of this
              concept is labelled too. */}
          <button
            ref={toggleRef}
            type="button"
            className="ah-menubtn"
            aria-expanded={open}
            aria-controls="ah-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="ah-menubtn__bars" aria-hidden="true">
              <i />
              <i />
            </span>
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {open && (
        <div className="ah-menu" id="ah-menu">
          <nav className="ah-menu__nav" aria-label="Mobile">
            {navLinks.map((link) => (
              <a
                key={link.href}
                className="ah-menu__link"
                href={link.href}
                onClick={(e) => onNavClick(e, link.href)}
              >
                <span>{link.label}</span>
                <ArrowIcon size={18} />
              </a>
            ))}
          </nav>

          <div className="ah-menu__foot">
            <a
              className="ah-btn ah-btn--block"
              href="#booking"
              onClick={(e) => onNavClick(e, '#booking')}
            >
              Book a Service
            </a>
            <a
              className="ah-btn ah-btn--ghost ah-btn--block"
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon size={16} />
              WhatsApp Us
            </a>
            <dl className="ah-menu__meta">
              <div>
                <dt>Call</dt>
                <dd>
                  <a href={businessConfig.phoneHref}>
                    {businessConfig.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt>Where</dt>
                <dd>{businessConfig.address}</dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </header>
  )
}

export { scrollToSection }
