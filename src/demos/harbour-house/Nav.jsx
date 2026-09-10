import { useCallback, useEffect, useRef, useState } from 'react'
import { scrollToSection } from '../_shared/scrollToSection.js'
import { businessConfig } from './config.js'
import { navLinks } from './content.js'
import { ArrowIcon, CloseIcon } from './icons.jsx'

/**
 * Navigation for Harbour House.
 *
 * The hero photograph is inset inside the ivory page rather than run full
 * bleed, so the bar sits over the page ground and not over a picture — it can
 * therefore be quiet and transparent at the top and take a hairline rule and
 * a solid ground once the page scrolls. No colour inversion is needed, which
 * is what keeps it feeling unobtrusive.
 *
 * The mobile menu is a full-height panel with the links set large in the
 * display serif — on a phone the menu is the one moment the type gets to be
 * the whole screen.
 */
export default function Nav() {
  const [open, setOpen] = useState(false)
  const [stuck, setStuck] = useState(false)
  const toggleRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
    const mq = window.matchMedia('(min-width: 1000px)')
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
    <header className={`hh-nav${stuck ? ' is-stuck' : ''}`}>
      <div className="hh-shell hh-nav__inner">
        <a
          className="hh-logo"
          href="#top"
          onClick={(e) => onNavClick(e, '#top')}
          aria-label={`${businessConfig.name} — back to top`}
        >
          {businessConfig.logo}
        </a>

        <nav className="hh-nav__links" aria-label="Main">
          {navLinks.map((link) => (
            <a
              key={link.href}
              className="hh-nav__link"
              href={link.href}
              onClick={(e) => onNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hh-nav__actions">
          <a
            className="hh-btn hh-btn--sm hh-nav__cta"
            href="#contact"
            onClick={(e) => onNavClick(e, '#contact')}
          >
            Check Availability
          </a>

          <button
            ref={toggleRef}
            type="button"
            className="hh-menubtn"
            aria-expanded={open}
            aria-controls="hh-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="hh-menubtn__bars" aria-hidden="true">
              <i />
              <i />
            </span>
            <span className="hh-menubtn__label">Menu</span>
          </button>
        </div>
      </div>

      {open && (
        <div className="hh-menu" id="hh-menu">
          <div className="hh-menu__head">
            <span className="hh-logo">{businessConfig.logo}</span>
            <button
              type="button"
              className="hh-menu__close"
              onClick={() => {
                setOpen(false)
                toggleRef.current?.focus()
              }}
            >
              <CloseIcon size={18} />
              Close
            </button>
          </div>

          <nav className="hh-menu__nav" aria-label="Mobile">
            {navLinks.map((link) => (
              <a
                key={link.href}
                className="hh-menu__link"
                href={link.href}
                onClick={(e) => onNavClick(e, link.href)}
              >
                <span>{link.label}</span>
                <ArrowIcon size={18} />
              </a>
            ))}
          </nav>

          <div className="hh-menu__foot">
            <a
              className="hh-btn hh-btn--block"
              href="#contact"
              onClick={(e) => onNavClick(e, '#contact')}
            >
              Check Availability
            </a>
            <p className="hh-menu__meta">
              {businessConfig.region}
              <br />
              <a href={`mailto:${businessConfig.email}`}>
                {businessConfig.email}
              </a>
            </p>
          </div>
        </div>
      )}
    </header>
  )
}

export { scrollToSection }
