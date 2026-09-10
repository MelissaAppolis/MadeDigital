import { Link } from 'react-router-dom'
import { scrollToSection } from '../_shared/scrollToSection.js'
import { businessConfig, conceptMeta, whatsappHref } from './config.js'
import { navLinks } from './content.js'
import { MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from './icons.jsx'

/**
 * The footer.
 *
 * Carries the Made Digital credit, which every concept must: a visitor has to
 * be able to tell that Harbour House is a portfolio piece and not a real
 * guesthouse taking real money for real rooms.
 */
export default function Footer() {
  const jump = (event, href) => {
    event.preventDefault()
    scrollToSection(href)
  }

  return (
    <footer className="hh-footer">
      <div className="hh-shell">
        <div className="hh-footer__top">
          <div className="hh-footer__brand">
            <p className="hh-logo">{businessConfig.logo}</p>
            <p className="hh-footer__tagline">{businessConfig.tagline}</p>
          </div>

          <nav className="hh-footer__nav" aria-label="Footer">
            <p className="hh-eyebrow">Explore</p>
            <ul>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={(e) => jump(e, link.href)}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hh-footer__contact">
            <p className="hh-eyebrow">Get in touch</p>
            <ul>
              <li>
                <PinIcon size={15} />
                {businessConfig.address}
              </li>
              <li>
                <PhoneIcon size={15} />
                <a href={businessConfig.phoneHref}>
                  {businessConfig.phoneDisplay}
                </a>
              </li>
              <li>
                <MailIcon size={15} />
                <a href={`mailto:${businessConfig.email}`}>
                  {businessConfig.email}
                </a>
              </li>
              <li>
                <WhatsAppIcon size={15} />
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="hh-footer__base">
          <p>
            © {new Date().getFullYear()} {businessConfig.name} — website
            concept.
          </p>
          <p>
            Website concept by{' '}
            <Link to={conceptMeta.studioHref}>Made Digital</Link>.{' '}
            <Link to={conceptMeta.caseStudyHref}>See how it was built</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
