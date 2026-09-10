import { Link } from 'react-router-dom'
import { BrowserMockup } from './Mockup.jsx'
import Reveal from './Reveal.jsx'

/**
 * Badge text. Concepts are labelled as concepts everywhere they appear — they
 * are demonstration sites built by Made Digital, not client work.
 */
export function typeLabel(project) {
  if (project.typeLabel) return project.typeLabel
  return project.type === 'Client' ? 'Client Project' : 'Made Digital Concept'
}

export function ctaLabel(project) {
  return project.type === 'Client' ? 'View Project' : 'View Concept'
}

export function previewUrl(project) {
  return `${project.slug.replace(/-/g, '')}.co.za`
}

/**
 * The whole card is one link: the title carries it and stretches over the
 * card, so there is a single tab stop and no duplicate announcement.
 */
export default function ProjectCard({
  project,
  delay = 0,
  loading = 'lazy',
  // On /work the cards are the page's top-level content, so they sit at h2.
  // On the homepage they live under a section heading and drop to h3.
  headingLevel: Heading = 'h3',
}) {
  return (
    <Reveal as="article" className="project" delay={delay}>
      <div className="project__frame">
        <span className="badge project__badge">{typeLabel(project)}</span>
        <BrowserMockup
          src={project.desktop}
          alt={`${project.title} — ${project.category.toLowerCase()} website concept designed by Made Digital`}
          url={previewUrl(project)}
          loading={loading}
        />
      </div>

      <div className="project__meta">
        <Heading>
          <Link className="project__link" to={`/work/${project.slug}`}>
            {project.title}
          </Link>
        </Heading>
        <span className="project__cat">{project.category}</span>
      </div>

      <p>{project.description}</p>

      {project.tags && (
        <ul className="project__tags">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      )}

      <div className="project__actions">
        {/* The card's stretched link already goes here; this is its affordance. */}
        <span className="link-arrow project__cta" aria-hidden="true">
          <span>{ctaLabel(project)}</span>
          <span>&rarr;</span>
        </span>

        {project.demoPath && (
          <Link className="project__live" to={project.demoPath}>
            Open live site
            <span className="sr-only"> — {project.title} concept</span>
          </Link>
        )}
      </div>
    </Reveal>
  )
}
