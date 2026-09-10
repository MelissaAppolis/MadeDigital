import { useState } from 'react'
import { useSeo } from '../hooks/useSeo.js'
import Reveal from '../components/Reveal.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import { BeforeAfter, CtaBand } from '../components/Sections.jsx'
import { categories, projects } from '../data/projects.js'

export default function Work() {
  const [filter, setFilter] = useState('All')

  useSeo({
    title: 'Our Work | Website Concepts by Made Digital',
    description:
      'Website concepts designed by Made Digital for plumbing, beauty, construction, cleaning, automotive and hospitality businesses in Cape Town.',
  })

  const shown =
    filter === 'All' ? projects : projects.filter((p) => p.category === filter)

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="page-hero__grid">
            <Reveal>
              <p className="eyebrow">Our work</p>
              <h1 style={{ marginTop: '1.5rem' }}>
                Made Digital concepts.
              </h1>
            </Reveal>
            <Reveal delay={100}>
              <p className="lede">
                Website concepts created for local businesses and industries.
                Each one was designed and built by us to show what a properly
                made website looks like for that trade.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--sm" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal
            style={{
              display: 'grid',
              gap: '1.5rem',
              paddingBottom: '2.5rem',
              borderBottom: '1px solid var(--line)',
              marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
            }}
          >
            <p className="small muted" style={{ maxWidth: '68ch' }}>
              The businesses below are fictional. We built these sites to
              demonstrate our design and development work.
            </p>

            <div
              className="filters"
              role="group"
              aria-label="Filter concepts by industry"
            >
              {categories.map((category) => (
                <button
                  type="button"
                  key={category}
                  className="filter"
                  aria-pressed={filter === category}
                  onClick={() => setFilter(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="grid-work" aria-live="polite">
            {shown.map((project, i) => (
              <ProjectCard
                key={project.slug}
                project={project}
                delay={i * 60}
                loading={i < 2 ? 'eager' : 'lazy'}
                headingLevel="h2"
              />
            ))}
          </div>

          {shown.length === 0 && (
            <p className="empty">
              Nothing in that industry yet. Try another filter.
            </p>
          )}
        </div>
      </section>

      <BeforeAfter />
      <CtaBand
        title="Want something like this for your business?"
        body="Tell us what you do and who you sell to. We will show you what your website could look like — and what it would cost."
      />
    </>
  )
}
