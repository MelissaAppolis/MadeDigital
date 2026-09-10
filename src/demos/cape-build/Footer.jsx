import { Link } from 'react-router-dom'
import { scrollToSection } from '../_shared/scrollToSection.js'
import { businessConfig, conceptMeta, whatsappHref } from './config.js'
import { projects, services } from './content.js'

export default function Footer() {
  const onJump = (event, href) => {
    event.preventDefault()
    scrollToSection(href)
  }

  return (
    <footer className="cb-footer">
      <div className="cb-container">
        {/* The name set large across the full measure, as a closing plate. */}
        <div className="cb-footer__brand">
          <span className="cb-logo">Cape Build Co.</span>
          <p className="cb-footer__tagline">{businessConfig.tagline}</p>
        </div>

        <div className="cb-footer__cols">
          <div>
            <h2 className="cb-footer__head">Projects</h2>
            <ul className="cb-footer__list">
              {projects.map((project) => (
                <li key={project.id}>
                  <a href="#projects" onClick={(e) => onJump(e, '#projects')}>
                    {project.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="cb-footer__head">Services</h2>
            <ul className="cb-footer__list">
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
            <h2 className="cb-footer__head">Company</h2>
            <ul className="cb-footer__list">
              <li>
                <a href="#about" onClick={(e) => onJump(e, '#about')}>
                  About
                </a>
              </li>
              <li>
                <a href="#process" onClick={(e) => onJump(e, '#process')}>
                  Process
                </a>
              </li>
              <li>
                <a href="#faqs" onClick={(e) => onJump(e, '#faqs')}>
                  FAQs
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => onJump(e, '#contact')}>
                  Start a project
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="cb-footer__head">Contact</h2>
            <ul className="cb-footer__list">
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
                <span>{businessConfig.locationNote}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="cb-footer__bottom">
          <p style={{ margin: 0 }}>
            &copy; 2026 Cape Build Co. — Website concept.
          </p>
          <p className="cb-footer__credit" style={{ margin: 0 }}>
            {conceptMeta.label}.{' '}
            <Link to={conceptMeta.caseStudyHref}>See how it was built</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
