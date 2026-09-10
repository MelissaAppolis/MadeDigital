import { Link } from 'react-router-dom'
import { useSeo } from '../hooks/useSeo.js'
import Reveal from '../components/Reveal.jsx'
import { footerNav } from '../data/site.js'

export default function NotFound() {
  useSeo({
    title: 'Page Not Found | Made Digital',
    description:
      'That page does not exist. Find our work, services, packages and contact details instead.',
    noindex: true,
  })

  return (
    <section className="section" style={{ paddingTop: 'clamp(5rem, 12vw, 9rem)' }}>
      <div className="container container--tight">
        <Reveal>
          <p className="eyebrow">404</p>
          <h1 style={{ marginTop: '1.5rem' }}>
            That page has moved on.
          </h1>
          <p className="lede" style={{ marginTop: '1.5rem' }}>
            The link you followed does not lead anywhere. Everything else is
            still where it should be.
          </p>

          <div className="btn-row" style={{ marginTop: '2.25rem' }}>
            <Link className="btn btn--lg" to="/">
              <span>Back to the homepage</span>
              <span className="btn__arrow" aria-hidden="true">
                &rarr;
              </span>
            </Link>
          </div>

          <nav
            aria-label="Site pages"
            style={{
              marginTop: '3.5rem',
              paddingTop: '2rem',
              borderTop: '1px solid var(--line)',
            }}
          >
            <ul className="filters">
              {footerNav.map((item) => (
                <li key={item.to}>
                  <Link className="filter" to={item.to}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Reveal>
      </div>
    </section>
  )
}
