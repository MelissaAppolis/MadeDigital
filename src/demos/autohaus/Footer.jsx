import { Link } from 'react-router-dom'
import { scrollToSection } from '../_shared/scrollToSection.js'
import { businessConfig, conceptMeta, whatsappHref } from './config.js'
import { services } from './content.js'
import { ArrowIcon, PhoneIcon, WhatsAppIcon } from './icons.jsx'

export default function Footer() {
  const onJump = (event, href) => {
    event.preventDefault()
    scrollToSection(href)
  }

  return (
    <footer className="ah-footer">
      {/* An action bar rather than a brand plate: the last thing on the page is
          still a way to book. */}
      <div className="ah-footer__bar">
        <div className="ah-container ah-footer__bar-inner">
          <p className="ah-logo ah-logo--footer">
            <span className="ah-logo__mark" aria-hidden="true" />
            <span className="ah-logo__name">{businessConfig.logo}</span>
            <span className="ah-logo__sub">{businessConfig.logoSuffix}</span>
          </p>
          <p className="ah-footer__tagline">{businessConfig.tagline}</p>
          <div className="ah-footer__actions">
            <a
              className="ah-btn ah-btn--sm"
              href="#booking"
              onClick={(e) => onJump(e, '#booking')}
            >
              Book a Service
              <ArrowIcon size={16} />
            </a>
            <a
              className="ah-btn ah-btn--ghost ah-btn--sm"
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon size={15} />
              WhatsApp
            </a>
            <a className="ah-footer__tel" href={businessConfig.phoneHref}>
              <PhoneIcon size={15} />
              {businessConfig.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      <div className="ah-container">
        <div className="ah-footer__cols">
          <div>
            <h2 className="ah-mono ah-footer__head">Services</h2>
            <ul className="ah-footer__list">
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
            <h2 className="ah-mono ah-footer__head">Company</h2>
            <ul className="ah-footer__list">
              <li>
                <a href="#workshop" onClick={(e) => onJump(e, '#workshop')}>
                  The workshop
                </a>
              </li>
              <li>
                <a href="#diagnostics" onClick={(e) => onJump(e, '#diagnostics')}>
                  Diagnostics
                </a>
              </li>
              <li>
                <a href="#vehicles" onClick={(e) => onJump(e, '#vehicles')}>
                  Vehicles we work on
                </a>
              </li>
              <li>
                <a href="#why" onClick={(e) => onJump(e, '#why')}>
                  Why AutoHaus
                </a>
              </li>
              <li>
                <a href="#faqs" onClick={(e) => onJump(e, '#faqs')}>
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="ah-mono ah-footer__head">Contact</h2>
            <ul className="ah-footer__list">
              <li>
                <a href={businessConfig.phoneHref}>
                  {businessConfig.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  WhatsApp {businessConfig.whatsappDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${businessConfig.email}`}>
                  {businessConfig.email}
                </a>
              </li>
              <li>
                <span>{businessConfig.address}</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="ah-mono ah-footer__head">Booking</h2>
            <ul className="ah-footer__list">
              <li>
                <a href="#booking" onClick={(e) => onJump(e, '#booking')}>
                  Booking form
                </a>
              </li>
              <li>
                <a href="#inspection" onClick={(e) => onJump(e, '#inspection')}>
                  Pre-purchase inspection
                </a>
              </li>
              {businessConfig.hours.map((hour) => (
                <li key={hour.days}>
                  <span>
                    {hour.days} — {hour.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="ah-footer__bottom">
          <p>&copy; 2026 AutoHaus Cape Town — Website concept.</p>
          <p className="ah-footer__credit">
            {conceptMeta.label}.{' '}
            <Link to={conceptMeta.caseStudyHref}>See how it was built</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
