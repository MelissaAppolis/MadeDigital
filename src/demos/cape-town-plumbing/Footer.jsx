import { Link } from 'react-router-dom'
import { businessConfig, conceptMeta, whatsappHref } from './config.js'
import { areas, navLinks, services } from './content.js'
import { scrollToSection } from './Nav.jsx'

export default function Footer() {
  const onJump = (event, href) => {
    event.preventDefault()
    scrollToSection(href)
  }

  return (
    <footer className="ctp-footer">
      <div className="ctp-container">
        <div className="ctp-footer__top">
          <div>
            <span className="ctp-logo">
              <span className="ctp-logo__mark" aria-hidden="true">
                CT
              </span>
              <span className="ctp-logo__text">
                Cape Town Plumbing Co.
                <small>Cape Town</small>
              </span>
            </span>
            <p className="ctp-footer__tagline">{businessConfig.tagline}</p>
            <p className="ctp-footer__blurb">
              Professional plumbing for homes and businesses across Cape Town
              and the surrounding areas.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="ctp-footer__head">Navigation</h2>
            <ul className="ctp-footer__list">
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
            <h2 className="ctp-footer__head">Services</h2>
            <ul className="ctp-footer__list">
              {services.map((service) => (
                <li key={service.id}>
                  <a href="#services" onClick={(e) => onJump(e, '#services')}>
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="ctp-footer__head">Contact</h2>
            <ul className="ctp-footer__list">
              <li>
                <a href={businessConfig.phoneHref}>
                  {businessConfig.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${businessConfig.email}`}>
                  {businessConfig.email}
                </a>
              </li>
              <li>
                <span>{businessConfig.base}</span>
              </li>
            </ul>

            <h2 className="ctp-footer__head" style={{ marginTop: '1.75rem' }}>
              Service Areas
            </h2>
            <ul className="ctp-footer__list">
              {areas.slice(0, 3).map((area) => (
                <li key={area.name}>
                  <a href="#areas" onClick={(e) => onJump(e, '#areas')}>
                    {area.name}
                  </a>
                </li>
              ))}
              <li>
                <a href="#areas" onClick={(e) => onJump(e, '#areas')}>
                  All areas
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="ctp-footer__bottom">
          <p style={{ margin: 0 }}>
            &copy; 2026 Cape Town Plumbing Co. — Website concept.
          </p>
          <p className="ctp-footer__credit" style={{ margin: 0 }}>
            <span>{conceptMeta.label}.</span>
            <Link to={conceptMeta.caseStudyHref}>See how it was built</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
