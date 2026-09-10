import { useCallback, useEffect, useRef, useState } from 'react'
import { scrollToSection } from '../_shared/scrollToSection.js'
import { businessConfig, whatsappHref } from './config.js'
import { navLinks } from './content.js'
import { Sprig, WhatsAppIcon } from './icons.jsx'

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
    <header className={`so-nav${stuck ? ' is-stuck' : ''}`}>
      <div className="so-container so-nav__inner">
        <a
          className="so-logo"
          href="#top"
          onClick={(e) => onNavClick(e, '#top')}
          aria-label={`${businessConfig.name} — back to top`}
        >
          <Sprig size={30} />
          Studio Olive
        </a>

        <nav className="so-nav__links" aria-label="Main">
          {navLinks.map((link) => (
            <a
              key={link.href}
              className="so-nav__link"
              href={link.href}
              onClick={(e) => onNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          className="so-btn so-btn--sm so-nav__cta"
          href="#contact"
          onClick={(e) => onNavClick(e, '#contact')}
        >
          Book Now
        </a>

        <div className="so-nav__mobile">
          <a
            className="so-btn so-btn--sm"
            href="#contact"
            onClick={(e) => onNavClick(e, '#contact')}
          >
            Book
          </a>
          <button
            ref={burgerRef}
            type="button"
            className="so-burger"
            aria-expanded={open}
            aria-controls="so-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {open && (
        <div className="so-drawer" id="so-menu">
          <nav className="so-drawer__nav" aria-label="Mobile">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                className="so-drawer__link"
                href={link.href}
                style={{ '--i': i }}
                onClick={(e) => onNavClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="so-drawer__foot">
            <a
              className="so-btn so-btn--block"
              href="#contact"
              onClick={(e) => onNavClick(e, '#contact')}
            >
              Book an Appointment
            </a>
            <a
              className="so-btn so-btn--outline so-btn--block"
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon />
              WhatsApp Us
            </a>
            <p className="so-drawer__meta">
              {businessConfig.area} · Tue–Fri 09:00–18:00
            </p>
          </div>
        </div>
      )}
    </header>
  )
}
