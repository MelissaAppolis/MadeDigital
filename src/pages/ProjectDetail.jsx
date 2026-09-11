import { Link, Navigate, useParams } from 'react-router-dom'
import { useSeo } from '../hooks/useSeo.js'
import { useJsonLd } from '../hooks/useJsonLd.js'
import Reveal from '../components/Reveal.jsx'
import { BrowserMockup, PhoneMockup } from '../components/Mockup.jsx'
import { CtaBand } from '../components/Sections.jsx'
import { typeLabel, previewUrl } from '../components/ProjectCard.jsx'
import { projects, projectBySlug } from '../data/projects.js'
import { site } from '../data/site.js'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = projectBySlug(slug)

  // Unknown slug: hand off to the catch-all rather than rendering an empty page.
  if (!project) return <Navigate to="/404" replace />

  const index = projects.findIndex((p) => p.slug === slug)
  const next = projects[(index + 1) % projects.length]
  const isConcept = project.type !== 'Client'

  return <ProjectView project={project} next={next} isConcept={isConcept} />
}

function ProjectView({ project, next, isConcept }) {
  useSeo({
    title: `${project.title} | ${isConcept ? 'Website Concept' : 'Project'} by Made Digital`,
    description: `${project.description} Designed and built by Made Digital, a web design studio in Cape Town.`,
    image: project.desktop,
    type: 'article',
  })

  // Home > Work > this project. Google still surfaces breadcrumbs in results,
  // and these are the only pages on the site that sit more than one level deep.
  useJsonLd({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${site.url}/` },
      { '@type': 'ListItem', position: 2, name: 'Work', item: `${site.url}/work` },
      {
        '@type': 'ListItem',
        position: 3,
        name: project.title,
        item: `${site.url}/work/${project.slug}`,
      },
    ],
  })

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal style={{ marginBottom: '1.75rem' }}>
            <Link className="link-arrow small" to="/work">
              <span aria-hidden="true">&larr;</span>
              <span>All work</span>
            </Link>
          </Reveal>

          <div className="page-hero__grid">
            <Reveal>
              <span className="badge badge--quiet">{typeLabel(project)}</span>
              <h1 style={{ marginTop: '1.5rem' }}>{project.title}</h1>
            </Reveal>
            <Reveal delay={100}>
              <p className="lede">{project.description}</p>
              {project.demoPath && (
                <div className="btn-row" style={{ marginTop: '1.75rem' }}>
                  <Link className="btn btn--lg" to={project.demoPath}>
                    <span>Open the live concept</span>
                    <span className="btn__arrow" aria-hidden="true">
                      &rarr;
                    </span>
                  </Link>
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--sm" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal
            className="project__frame"
            style={{ padding: 'clamp(1.25rem, 4vw, 3.5rem)' }}
          >
            <div className="stage">
              <BrowserMockup
                src={project.desktop}
                alt={`${project.title} homepage concept, desktop layout`}
                url={previewUrl(project)}
                loading="eager"
              />
              {project.mobile && (
                <PhoneMockup
                  src={project.mobile}
                  alt={`${project.title} homepage concept shown on a phone`}
                  loading="eager"
                />
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="split split--sticky">
            <Reveal>
              <p className="eyebrow">The brief</p>
              <div className="prose" style={{ marginTop: '1.5rem' }}>
                <p>{project.summary}</p>
              </div>

              <div className="facts" style={{ marginTop: '2.5rem' }}>
                <div>
                  <p className="fact__label">Industry</p>
                  <p className="fact__value">{project.category}</p>
                </div>
                <div>
                  <p className="fact__label">Type</p>
                  <p className="fact__value">
                    {isConcept ? 'Concept' : 'Client project'}
                  </p>
                </div>
                <div>
                  <p className="fact__label">Studio</p>
                  <p className="fact__value">Made Digital</p>
                </div>
              </div>

              {isConcept && (
                <p className="placeholder-note" style={{ marginTop: '1.5rem' }}>
                  {project.title} is a fictional business
                </p>
              )}
            </Reveal>

            <Reveal delay={100} style={{ display: 'grid', gap: '3rem' }}>
              <div>
                <h2 style={{ fontSize: 'var(--t-h3)' }}>
                  What it needed to do
                </h2>
                <ul className="checklist" style={{ marginTop: '1.5rem' }}>
                  {project.goals.map((goal) => (
                    <li key={goal}>{goal}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 style={{ fontSize: 'var(--t-h3)' }}>What it includes</h2>
                <ul className="checklist" style={{ marginTop: '1.5rem' }}>
                  {project.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>

              {project.demoPath && (
                <Link
                  className="btn"
                  to={project.demoPath}
                  style={{ justifySelf: 'start' }}
                >
                  <span>Browse the concept</span>
                  <span className="btn__arrow" aria-hidden="true">
                    &rarr;
                  </span>
                </Link>
              )}

              {project.liveUrl && (
                <a
                  className="btn"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ justifySelf: 'start' }}
                >
                  <span>Open the live demo</span>
                  <span className="btn__arrow" aria-hidden="true">
                    &#8599;
                  </span>
                </a>
              )}
            </Reveal>
          </div>

          {project.shots && (
            <div style={{ marginTop: 'clamp(3.5rem, 7vw, 6rem)' }}>
              <Reveal style={{ marginBottom: '2.5rem' }}>
                <p className="eyebrow">Inside the concept</p>
              </Reveal>
              <div className="shots">
                {project.shots.map((shot, i) => (
                  <Reveal className="shot" key={shot.src} delay={i * 70}>
                    <BrowserMockup
                      src={shot.src}
                      alt={shot.alt}
                      url={previewUrl(project)}
                    />
                    <p className="shot__label">{shot.label}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          <div className="pager" style={{ marginTop: 'clamp(3rem, 6vw, 5rem)' }}>
            <Link className="link-arrow" to="/work">
              <span aria-hidden="true">&larr;</span>
              <span>All work</span>
            </Link>
            <Link className="link-arrow" to={`/work/${next.slug}`}>
              <span>Next: {next.title}</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        title="Could your business look like this?"
        body="Every concept here started with the same question: how does this business actually win customers? Tell us about yours and we will show you what it could look like."
      />
    </>
  )
}
