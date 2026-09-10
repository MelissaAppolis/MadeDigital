import { useCallback, useEffect, useRef, useState } from 'react'
import { scrollToSection } from '../_shared/scrollToSection.js'
import { businessConfig, whatsappHref } from './config.js'
import { navLinks } from './content.js'
import { PhoneIcon, WhatsAppIcon } from './icons.jsx'

// Re-exported so this concept's Footer and page keep importing from one place.
export { scrollToSection }

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [stuck, setStuck] = useState(false)
  const burgerRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8)
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
    <header className={`ctp-nav${stuck ? ' is-stuck' : ''}`}>
      <div className="ctp-container ctp-nav__inner">
        <a
          className="ctp-logo"
          href="#top"
          onClick={(e) => onNavClick(e, '#top')}
          aria-label={`${businessConfig.name} — back to top`}
        >
          <span className="ctp-logo__mark" aria-hidden="true">
            CT
          </span>
          <span className="ctp-logo__text">
            Cape Town Plumbing Co.
            <small>Cape Town</small>
          </span>
        </a>

        <nav className="ctp-nav__links" aria-label="Main">
          {navLinks.map((link) => (
            <a
              key={link.href}
              className="ctp-nav__link"
              href={link.href}
              onClick={(e) => onNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ctp-nav__actions">
          <a className="ctp-nav__phone" href={businessConfig.phoneHref}>
            <PhoneIcon size={17} />
            {businessConfig.phoneDisplay}
          </a>
          <a
            className="ctp-btn ctp-btn--wa ctp-btn--sm"
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon size={17} />
            WhatsApp Us
          </a>
        </div>

        <div className="ctp-nav__mobile">
          <a
            className="ctp-btn ctp-btn--wa ctp-btn--sm"
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Message us on WhatsApp"
          >
            <WhatsAppIcon size={17} />
            <span aria-hidden="true">WhatsApp</span>
          </a>
          <button
            ref={burgerRef}
            type="button"
            className="ctp-burger"
            aria-expanded={open}
            aria-controls="ctp-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {open && (
        <div className="ctp-drawer" id="ctp-menu">
          <nav className="ctp-drawer__nav" aria-label="Mobile">
            {navLinks.map((link) => (
              <a
                key={link.href}
                className="ctp-drawer__link"
                href={link.href}
                onClick={(e) => onNavClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="ctp-drawer__foot">
            <a
              className="ctp-btn ctp-btn--wa ctp-btn--block ctp-btn--lg"
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon />
              WhatsApp Us
            </a>
            <a
              className="ctp-btn ctp-btn--ghost ctp-btn--block ctp-btn--lg"
              href={businessConfig.phoneHref}
            >
              <PhoneIcon />
              {businessConfig.phoneDisplay}
            </a>
            <p className="ctp-drawer__meta">
              {businessConfig.base} · Mon–Fri 07:00–17:00
            </p>
          </div>
        </div>
      )}
    </header>
  )
}
