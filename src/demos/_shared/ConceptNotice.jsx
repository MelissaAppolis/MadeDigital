import { Link } from 'react-router-dom'
import './concept.css'

/**
 * Slim bar that sits above a concept site's own navigation.
 *
 * Every Made Digital concept uses this, so a visitor is never left thinking a
 * fictional business is a real one. It is deliberately quiet — one line of
 * small text — so it reads as a label rather than competing with the design.
 *
 * Theme it from the concept's root scope with --notice-bg, --notice-fg,
 * --notice-fg-muted, --notice-rule, --notice-max and --notice-gutter.
 */
export default function ConceptNotice({
  businessName,
  studioHref = '/',
  caseStudyHref,
}) {
  return (
    <div className="mdc-notice">
      <div className="mdc-notice__inner">
        <p>
          <strong>Website concept</strong> — {businessName} is a fictional
          business, designed and built by{' '}
          <Link to={studioHref}>Made Digital</Link>.
        </p>
        {caseStudyHref && (
          <Link to={caseStudyHref}>About this concept &rarr;</Link>
        )}
      </div>
    </div>
  )
}
