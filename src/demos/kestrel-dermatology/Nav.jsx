import { useCallback, useEffect, useRef, useState } from 'react'
import { scrollToSection } from '../_shared/scrollToSection.js'
import { businessConfig } from './config.js'
import { navLinks } from './content.js'
import { ArrowIcon, CloseIcon, LogoMark, PhoneIcon } from './icons.jsx'

/**
 * Navigation for Kestrel Dermatology.
 *
 * A calm porcelain bar. Below 1080px the links move into a drawer and the
 * phone number collapses to an icon, so the logo, the appointment button and
 * the menu button always fit on one line — measured against the viewport at
 * 320px, not just the document width, because a nav clips rather than widens
 * the page when it runs out of room.
 *
 * The drawer renders inside the header, which is positioned and stacked above
 * it, so the close control is never covered by the panel it closes.
 */
export default function Nav() {
  const [open, setOpen] = useState(false)
  const [stuck, setStuck] = useState(false)
  const toggleRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 16)
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
    const mq = window.matchMedia('(min-width: 1080px)')
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
    <header className={`kd-nav${stuck ? ' is-stuck' : ''}${open ? ' is-open' : ''}`}>
      <div className="kd-shell kd-nav__inner">
        <a
          className="kd-logo"
          href="#top"
          onClick={(e) => onNavClick(e, '#top')}
          aria-label={`${businessConfig.name} — back to top`}
        >
          <LogoMark size={30} />
          <span className="kd-logo__text">
            {businessConfig.logoLead}
            <span>{businessConfig.logoTail}</span>
          </span>
        </a>

        <nav className="kd-nav__links" aria-label="Main">
          {navLinks.map((link) => (
            <a
              key={link.href}
              className="kd-nav__link"
              href={link.href}
              onClick={(e) => onNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="kd-nav__actions">
          <a
            className="kd-nav__phone"
            href={businessConfig.phoneHref}
            aria-label={`Call the rooms on ${businessConfig.phoneDisplay}`}
          >
            <PhoneIcon size={18} />
            <span>{businessConfig.phoneDisplay}</span>
          </a>
          <a
            className="kd-btn kd-btn--sm kd-nav__cta"
            href="#appointment"
            onClick={(e) => onNavClick(e, '#appointment')}
          >
            Book<span className="kd-nav__cta-long">&nbsp;an appointment</span>
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="kd-menubtn"
            aria-expanded={open}
            aria-controls="kd-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon size={20} /> : <span className="kd-menubtn__bars" aria-hidden="true"><i /><i /></span>}
          </button>
        </div>
      </div>

      {open && (
        <div className="kd-menu" id="kd-menu">
          <nav className="kd-shell kd-menu__nav" aria-label="Mobile">
            {navLinks.map((link) => (
              <a
                key={link.href}
                className="kd-menu__link"
                href={link.href}
                onClick={(e) => onNavClick(e, link.href)}
              >
                <span>{link.label}</span>
                <ArrowIcon size={18} />
              </a>
            ))}
            <div className="kd-menu__foot">
              <a
                className="kd-btn kd-btn--block"
                href="#appointment"
                onClick={(e) => onNavClick(e, '#appointment')}
              >
                Request an appointment
              </a>
              <a className="kd-btn kd-btn--line kd-btn--block" href={businessConfig.phoneHref}>
                <PhoneIcon size={18} /> {businessConfig.phoneDisplay}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

export { scrollToSection }
