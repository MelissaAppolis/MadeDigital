import { useCallback, useEffect, useRef, useState } from 'react'
import { scrollToSection } from '../_shared/scrollToSection.js'
import { businessConfig } from './config.js'
import { navLinks } from './content.js'

/**
 * Fixed navigation, transparent over the hero and solid once past it.
 *
 * The switch is driven by the hero's height rather than a fixed scroll
 * distance, so it stays correct at any viewport size.
 */
export default function Nav() {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  const burgerRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector('.cb-hero')
      const point = hero ? hero.offsetHeight - 90 : 400
      setSolid(window.scrollY > point)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
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

  // While the drawer is open the bar sits on black, so it must read light.
  const barClass = `cb-nav${solid && !open ? ' is-solid' : ''}`

  return (
    <header className={barClass}>
      <div className="cb-container cb-nav__inner">
        <a
          className="cb-logo"
          href="#top"
          onClick={(e) => onNavClick(e, '#top')}
          aria-label={`${businessConfig.name} — back to top`}
        >
          Cape Build Co.
        </a>

        <nav className="cb-nav__links" aria-label="Main">
          {navLinks.map((link) => (
            <a
              key={link.href}
              className="cb-nav__link"
              href={link.href}
              onClick={(e) => onNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          className="cb-btn cb-btn--sm cb-nav__cta"
          href="#contact"
          onClick={(e) => onNavClick(e, '#contact')}
        >
          Start a Project
        </a>

        <div className="cb-nav__mobile">
          <button
            ref={burgerRef}
            type="button"
            className="cb-burger"
            aria-expanded={open}
            aria-controls="cb-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {open && (
        <div className="cb-drawer" id="cb-menu">
          <nav className="cb-drawer__nav" aria-label="Mobile">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                className="cb-drawer__link"
                href={link.href}
                onClick={(e) => onNavClick(e, link.href)}
              >
                <i aria-hidden="true">0{i + 1}</i>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="cb-drawer__foot">
            <a
              className="cb-btn cb-btn--light cb-btn--block"
              href="#contact"
              onClick={(e) => onNavClick(e, '#contact')}
            >
              Start a Project
            </a>
            <p className="cb-drawer__meta">
              {businessConfig.area} · {businessConfig.phoneDisplay}
            </p>
          </div>
        </div>
      )}
    </header>
  )
}
