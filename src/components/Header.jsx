import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { nav, site } from '../data/site.js'

function Wordmark({ onClick }) {
  return (
    <Link className="wordmark" to="/" onClick={onClick} aria-label={`${site.name} — home`}>
      <span>Made Digital</span>
      <span className="wordmark__dot" aria-hidden="true" />
    </Link>
  )
}

export default function Header() {
  const [stuck, setStuck] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const burgerRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the drawer whenever the route changes.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // A resize past the desktop breakpoint leaves the drawer hidden by CSS, so
  // close it to keep state and the scroll lock in step.
  useEffect(() => {
    if (!open) return
    const mq = window.matchMedia('(min-width: 900px)')
    const onChange = (e) => e.matches && setOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [open])

  // Lock the page behind the drawer and allow Escape to dismiss it.
  useEffect(() => {
    if (!open) return
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        burgerRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = overflow
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header className={`header${stuck ? ' is-stuck' : ''}`}>
      <div className="container header__inner">
        <Wordmark />

        <nav className="header__nav" aria-label="Primary">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `header__link${isActive ? ' is-active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Link className="btn btn--sm header__cta" to="/website-review">
            Free Website Review
          </Link>
        </nav>

        <button
          ref={burgerRef}
          type="button"
          className="burger"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      {open && (
        <div className="drawer" id="mobile-menu">
          <nav className="drawer__nav" aria-label="Mobile">
            {[...nav, { label: 'Contact', to: '/contact' }].map((item, i) => (
              <NavLink
                key={item.to}
                to={item.to}
                style={{ '--i': i }}
                className={({ isActive }) =>
                  `drawer__link${isActive ? ' is-active' : ''}`
                }
              >
                <span>{item.label}</span>
                <span className="drawer__index" aria-hidden="true">
                  0{i + 1}
                </span>
              </NavLink>
            ))}
          </nav>

          <div className="drawer__foot">
            <Link className="btn btn--block btn--lg" to="/website-review">
              <span>Free Website Review</span>
              <span className="btn__arrow" aria-hidden="true">
                &rarr;
              </span>
            </Link>
            <p className="drawer__meta">{site.location}</p>
          </div>
        </div>
      )}
    </header>
  )
}
