import { Link } from 'react-router-dom'
import { scrollToSection } from '../_shared/scrollToSection.js'
import { businessConfig, conceptMeta, whatsappHref } from './config.js'
import { navLinks } from './content.js'
import { Sprig } from './icons.jsx'

export default function Footer() {
  const onJump = (event, href) => {
    event.preventDefault()
    scrollToSection(href)
  }

  return (
    <footer className="so-footer">
      <div className="so-container">
        <div className="so-footer__top">
          <div>
            <span className="so-logo">
              <Sprig size={30} />
              Studio Olive
            </span>
            <p className="so-footer__tagline">{businessConfig.tagline}</p>
          </div>

          <nav aria-label="Footer">
            <h2 className="so-footer__head">Studio</h2>
            <ul className="so-footer__list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={(e) => onJump(e, link.href)}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="so-footer__head">Contact</h2>
            <ul className="so-footer__list">
              <li>
                <a href={businessConfig.phoneHref}>
                  {businessConfig.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${businessConfig.email}`}>
                  {businessConfig.email}
                </a>
              </li>
              <li>
                <span>{businessConfig.area}</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="so-footer__head">Follow</h2>
            <ul className="so-footer__list">
              <li>
                <a
                  href={businessConfig.instagramUrl}
                  aria-label="Instagram — placeholder link, no account is set up"
                >
                  Instagram
                </a>
              </li>
            </ul>

            <h2 className="so-footer__head" style={{ marginTop: '1.75rem' }}>
              Hours
            </h2>
            <ul className="so-footer__list">
              {businessConfig.hours.map((h) => (
                <li key={h.days}>
                  <span>
                    {h.days} — {h.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="so-footer__bottom">
          <p style={{ margin: 0 }}>
            &copy; 2026 Studio Olive Beauty — Website concept.
          </p>
          <p className="so-footer__credit" style={{ margin: 0 }}>
            {conceptMeta.label}.{' '}
            <Link to={conceptMeta.caseStudyHref}>See how it was built</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
