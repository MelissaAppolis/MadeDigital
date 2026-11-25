import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSeo } from '../hooks/useSeo.js'
import Reveal from '../components/Reveal.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import { BeforeAfter, CtaBand } from '../components/Sections.jsx'
import { categories, projects } from '../data/projects.js'
import { offerings } from '../data/services.js'

const products = offerings.filter((o) => o.id === 'invitations' || o.id === 'spadework')

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
              <h1 style={{ marginTop: '1.5rem' }}>Our work.</h1>
            </Reveal>
            <Reveal delay={100}>
              <p className="lede">
                Websites we designed for local trades, a real website refresh,
                and the products we have built.
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
            <div>
              <p className="eyebrow">Website concepts</p>
              <h2 style={{ marginTop: '1.25rem' }}>Built for local trades.</h2>
              <p className="small muted" style={{ marginTop: '1rem' }}>
                The businesses are fictional. The design work is real.
              </p>
            </div>

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

      <section className="section section--cream">
        <div className="container">
          <Reveal className="head head--split" style={{ marginBottom: '3rem' }}>
            <div>
              <p className="eyebrow">Products</p>
              <h2 style={{ marginTop: '1.25rem' }}>Apps we have built.</h2>
            </div>
            <p className="lede">Our own products, ready for your business.</p>
          </Reveal>
          <div className="offers offers--two">
            {products.map((o, i) => (
              <Reveal className="offer" key={o.id} delay={i * 70}>
                <h3>{o.title}</h3>
                <p>{o.body}</p>
                <p className="offer__meta">{o.meta}</p>
                <Link className="offer__link" to={o.to}>
                  {o.link}
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Want something like this?"
        body="Tell us what you do. We will show you what it could look like and what it costs."
        secondary={{ to: '/website-review', label: 'Free website review' }}
      />
    </>
  )
}
