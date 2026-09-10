import { Link } from 'react-router-dom'
import { scrollToSection } from '../_shared/scrollToSection.js'
import { businessConfig, conceptMeta, whatsappHref } from './config.js'
import { areas, services } from './content.js'
import { ArrowIcon, WhatsAppIcon } from './icons.jsx'

export default function Footer() {
  const onJump = (event, href) => {
    event.preventDefault()
    scrollToSection(href)
  }

  return (
    <footer className="cc-footer">
      <div className="cc-container cc-footer__inner">
        {/* The brand block sits beside the columns rather than above them, so
            the footer reads as a panel and not a sitemap. */}
        <div className="cc-footer__brand">
          <p className="cc-logo cc-logo--footer">
            <span className="cc-logo__mark" aria-hidden="true" />
            {businessConfig.logo}
          </p>
          <p className="cc-footer__tagline">{businessConfig.tagline}</p>
          <a
            className="cc-btn cc-btn--light"
            href="#quote"
            onClick={(e) => onJump(e, '#quote')}
          >
            Get a Quote
            <ArrowIcon size={17} />
          </a>
          <a
            className="cc-footer__wa"
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon size={16} />
            WhatsApp {businessConfig.whatsappDisplay}
          </a>
        </div>

        <div className="cc-footer__cols">
          <div>
            <h2 className="cc-footer__head">Services</h2>
            <ul className="cc-footer__list">
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
            <h2 className="cc-footer__head">Company</h2>
            <ul className="cc-footer__list">
              <li>
                <a href="#about" onClick={(e) => onJump(e, '#about')}>
                  About
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  onClick={(e) => onJump(e, '#how-it-works')}
                >
                  How it works
                </a>
              </li>
              <li>
                <a
                  href="#before-after"
                  onClick={(e) => onJump(e, '#before-after')}
                >
                  Before &amp; after
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
            <h2 className="cc-footer__head">Contact</h2>
            <ul className="cc-footer__list">
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
              {/* Fictional business, so the handle is shown but never linked. */}
              <li>
                <span>Instagram {businessConfig.instagram}</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="cc-footer__head">Service areas</h2>
            <ul className="cc-footer__list">
              {areas.map((area) => (
                <li key={area}>
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="cc-footer__bottom">
          <p>&copy; 2026 Clean &amp; Co. — Website concept.</p>
          <p className="cc-footer__credit">
            {conceptMeta.label}.{' '}
            <Link to={conceptMeta.caseStudyHref}>See how it was built</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
