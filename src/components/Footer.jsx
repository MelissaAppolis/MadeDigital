import { Link } from 'react-router-dom'
import { footerNav, hasRealContact, site } from '../data/site.js'

export default function Footer() {
  return (
    <footer className="footer section--dark">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <span className="wordmark">
              <span>Made Digital</span>
              <span className="wordmark__dot" aria-hidden="true" />
            </span>
            <p className="footer__tagline">{site.tagline}</p>
            <p className="footer__place">{site.location}</p>
          </div>

          <nav aria-label="Footer">
            <h2 className="footer__colhead">Navigation</h2>
            <ul className="footer__list">
              {footerNav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {hasRealContact && (
            <div>
              <h2 className="footer__colhead">Contact</h2>
              <ul className="footer__list">
                <li>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="footer__bottom">
          <p>&copy; 2026 Made Digital. All rights reserved.</p>
          <p>
            Web design in Cape Town, South Africa.
          </p>
        </div>
      </div>
    </footer>
  )
}
