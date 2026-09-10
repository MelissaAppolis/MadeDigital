import { useCallback, useEffect, useRef, useState } from 'react'
import { scrollToSection } from '../_shared/scrollToSection.js'
import { businessConfig, whatsappHref } from './config.js'
import { navLinks } from './content.js'
import { WhatsAppIcon } from './icons.jsx'

/**
 * Sticky navigation.
 *
 * Solid from the first pixel — the hero is a light canvas rather than a
 * photograph, so there is nothing to sit transparently over. All that changes
 * on scroll is a hairline and a shadow, which keeps the bar readable once
 * photographs start passing underneath it.
 *
 * The mobile drawer is a cream sheet with large links, not a dark overlay:
 * Clean & Co. stays bright everywhere.
 */
export default function Nav() {
  const [open, setOpen] = useState(false)
  const [lifted, setLifted] = useState(false)
  const burgerRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 12)
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
        burgerRef.current?.focus()
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
    <header className={`cc-nav${lifted ? ' is-lifted' : ''}`}>
      <div className="cc-container cc-nav__inner">
        <a
          className="cc-logo"
          href="#top"
          onClick={(e) => onNavClick(e, '#top')}
          aria-label={`${businessConfig.name} — back to top`}
        >
          <span className="cc-logo__mark" aria-hidden="true" />
          {businessConfig.logo}
        </a>

        <nav className="cc-nav__links" aria-label="Main">
          {navLinks.map((link) => (
            <a
              key={link.href}
              className="cc-nav__link"
              href={link.href}
              onClick={(e) => onNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="cc-nav__actions">
          <a
            className="cc-btn cc-btn--ghost cc-btn--sm cc-nav__wa"
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon size={15} />
            WhatsApp
          </a>
          <a
            className="cc-btn cc-btn--sm"
            href="#quote"
            onClick={(e) => onNavClick(e, '#quote')}
          >
            Get a Quote
          </a>

          <button
            ref={burgerRef}
            type="button"
            className="cc-burger"
            aria-expanded={open}
            aria-controls="cc-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {open && (
        <div className="cc-drawer" id="cc-menu">
          <nav className="cc-drawer__nav" aria-label="Mobile">
            {navLinks.map((link) => (
              <a
                key={link.href}
                className="cc-drawer__link"
                href={link.href}
                onClick={(e) => onNavClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="cc-drawer__foot">
            <a
              className="cc-btn cc-btn--block"
              href="#quote"
              onClick={(e) => onNavClick(e, '#quote')}
            >
              Get a Quote
            </a>
            <a
              className="cc-btn cc-btn--ghost cc-btn--block"
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon size={16} />
              WhatsApp Us
            </a>
            <p className="cc-drawer__meta">
              <a href={businessConfig.phoneHref}>{businessConfig.phoneDisplay}</a>
              <span>{businessConfig.locationNote}</span>
            </p>
          </div>
        </div>
      )}
    </header>
  )
}

export { scrollToSection }
