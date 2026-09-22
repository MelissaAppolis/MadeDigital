import { Link } from 'react-router-dom'
import { scrollToSection } from '../_shared/scrollToSection.js'
import { businessConfig, conceptMeta, whatsappHref } from './config.js'
import { navLinks } from './content.js'
import { LogoMark, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from './icons.jsx'

/**
 * The footer.
 *
 * Carries the Made Digital credit, which every concept must: a visitor has to
 * be able to tell that Kestrel Dermatology is a portfolio piece and not a real
 * practice seeing real patients.
 */
export default function Footer() {
  const jump = (event, href) => {
    event.preventDefault()
    scrollToSection(href)
  }

  return (
    <footer className="kd-footer">
      <div className="kd-shell">
        <div className="kd-footer__top">
          <div className="kd-footer__brand">
            <p className="kd-logo kd-logo--light">
              <LogoMark size={30} />
              <span className="kd-logo__text">
                {businessConfig.logoLead}
                <span>{businessConfig.logoTail}</span>
              </span>
            </p>
            <p>
              {businessConfig.doctor}, {businessConfig.doctorRole}.
              <br />
              {businessConfig.qualifications}
            </p>
          </div>

          <nav className="kd-footer__col" aria-label="Footer">
            <h2 className="kd-footer__head">The practice</h2>
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

          <div className="kd-footer__col">
            <h2 className="kd-footer__head">Consulting hours</h2>
            <ul>
              {businessConfig.hours.map((h) => (
                <li key={h.label} className="kd-footer__hours">
                  <span>{h.label}</span>
                  <span>{h.value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="kd-footer__col">
            <h2 className="kd-footer__head">Contact</h2>
            <ul>
              <li>
                <PhoneIcon size={16} />
                <a href={businessConfig.phoneHref}>{businessConfig.phoneDisplay}</a>
              </li>
              <li>
                <WhatsAppIcon size={16} />
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  WhatsApp the rooms
                </a>
              </li>
              <li>
                <MailIcon size={16} />
                <a href={`mailto:${businessConfig.email}`}>{businessConfig.email}</a>
              </li>
              <li>
                <PinIcon size={16} />
                {businessConfig.address}
              </li>
            </ul>
          </div>
        </div>

        <div className="kd-footer__base">
          <p>
            © {new Date().getFullYear()} {businessConfig.name} · Practice no.{' '}
            {businessConfig.practiceNumber} — website concept.
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
