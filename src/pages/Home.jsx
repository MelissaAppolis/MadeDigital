import { Link } from 'react-router-dom'
import { useSeo } from '../hooks/useSeo.js'
import Reveal from '../components/Reveal.jsx'
import { BrowserMockup } from '../components/Mockup.jsx'
import ProjectCard, { previewUrl } from '../components/ProjectCard.jsx'
import {
  BeforeAfter,
  CtaBand,
  ProcessSteps,
  ReviewCallout,
} from '../components/Sections.jsx'
import { featuredProjects, projects } from '../data/projects.js'
import { benefits, services } from '../data/services.js'
import { packages } from '../data/packages.js'

/**
 * Continuous strip of concept mockups under the hero. The list is rendered
 * twice so the loop is seamless; the second copy is hidden from assistive
 * technology.
 */
function Showreel() {
  const items = [...projects, ...projects]

  return (
    <div className="showreel" aria-label="Website concepts by Made Digital">
      <div className="showreel__track">
        {items.map((project, i) => {
          const isClone = i >= projects.length
          return (
            <div
              className="showreel__item"
              key={`${project.slug}-${i}`}
              aria-hidden={isClone || undefined}
            >
              <BrowserMockup
                src={project.desktop}
                alt={
                  isClone
                    ? ''
                    : `${project.title} — ${project.category.toLowerCase()} website concept designed by Made Digital`
                }
                url={previewUrl(project)}
                loading={i < 3 ? 'eager' : 'lazy'}
              />
              <p className="showreel__caption">
                <b>{project.title}</b>
                <span>Concept · {project.category}</span>
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function Home() {
  useSeo({
    title: 'Made Digital | Websites That Bring You Business',
    description:
      'Made Digital creates modern, high-converting websites for small and growing businesses in Cape Town, South Africa.',
  })

  return (
    <>
      {/* ---- Hero ---- */}
      <section className="hero">
        <div className="container">
          <div className="hero__inner">
            <Reveal>
              <p className="eyebrow">Web design studio · Cape Town</p>
              <h1 style={{ marginTop: '1.5rem' }}>
                Websites that bring you business.
              </h1>
            </Reveal>

            <Reveal className="hero__aside" delay={120}>
              <p className="hero__lede">
                Modern, professional websites for Cape Town businesses —
                designed to turn visitors into enquiries.
              </p>
              <div className="btn-row">
                <Link className="btn btn--lg" to="/website-review">
                  <span>Get a Free Website Review</span>
                  <span className="btn__arrow" aria-hidden="true">
                    &rarr;
                  </span>
                </Link>
                <Link className="btn btn--ghost btn--lg" to="/work">
                  View Our Work
                </Link>
              </div>
            </Reveal>
          </div>
        </div>

        <Showreel />

        <div className="container">
          <ul className="hero__meta">
            <li>Built for phones first</li>
            <li>WhatsApp and enquiry forms as standard</li>
            <li>Websites from R4,500</li>
          </ul>
        </div>
      </section>

      {/* ---- First impression / benefits ---- */}
      <section className="section">
        <div className="container">
          <Reveal className="head head--split" style={{ marginBottom: '3.5rem' }}>
            <h2>
              Your website is often the first impression of your business.
            </h2>
            <p className="lede">
              Before someone calls you, visits your shop or asks for a quote,
              they look you up. What they find decides whether they get in touch
              — or carry on scrolling to the next business.
            </p>
          </Reveal>

          <div className="benefits">
            {benefits.map((benefit, i) => (
              <Reveal className="benefit" key={benefit.title} delay={i * 70}>
                <p className="benefit__num">0{i + 1}</p>
                <h3>{benefit.title}</h3>
                <p>{benefit.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Proof: the concepts ---- */}
      <section className="section section--cream">
        <div className="container">
          <Reveal className="head head--split" style={{ marginBottom: '3.5rem' }}>
            <div>
              <p className="eyebrow">Made Digital concepts</p>
              <h2 style={{ marginTop: '1.25rem' }}>
                Website concepts created for local businesses and industries.
              </h2>
            </div>
            <p className="lede">
              These are demonstration websites we designed and built ourselves
              to show what is possible for each trade.
            </p>
          </Reveal>

          <div className="grid-work">
            {featuredProjects.slice(0, 4).map((project, i) => (
              <ProjectCard key={project.slug} project={project} delay={i * 80} />
            ))}
          </div>

          <Reveal className="btn-row" style={{ marginTop: '3.5rem' }}>
            <Link className="btn btn--ghost btn--lg" to="/work">
              <span>View all concepts</span>
              <span className="btn__arrow" aria-hidden="true">
                &rarr;
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---- Lead magnet ---- */}
      <ReviewCallout />

      {/* ---- Services ---- */}
      <section className="section">
        <div className="container">
          <Reveal className="head head--split" style={{ marginBottom: '3.5rem' }}>
            <div>
              <p className="eyebrow">What we do</p>
              <h2 style={{ marginTop: '1.25rem' }}>
                Everything your website needs to earn its keep.
              </h2>
            </div>
            <p className="lede">
              Whether you are starting from nothing or fixing something that no
              longer works, the goal is the same: more enquiries from the people
              already looking for you.
            </p>
          </Reveal>

          <div className="services">
            {services.map((service, i) => (
              <Reveal className="service" key={service.id} delay={i * 50}>
                <p className="service__num">{service.number}</p>
                <h3>{service.title}</h3>
                <p className="service__body">{service.short}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="btn-row" style={{ marginTop: '3rem' }}>
            <Link className="btn btn--ghost btn--lg" to="/services">
              <span>More about our services</span>
              <span className="btn__arrow" aria-hidden="true">
                &rarr;
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---- Revamps ---- */}
      <BeforeAfter />

      {/* ---- Process ---- */}
      <ProcessSteps />

      {/* ---- Packages teaser ---- */}
      <section className="section section--cream">
        <div className="container">
          <Reveal className="head head--split" style={{ marginBottom: '3.5rem' }}>
            <div>
              <p className="eyebrow">Packages</p>
              <h2 style={{ marginTop: '1.25rem' }}>
                Clear pricing, decided before we start.
              </h2>
            </div>
            <p className="lede">
              You will know the cost before any work begins. Monthly care plans
              are available afterwards, and they are entirely optional.
            </p>
          </Reveal>

          <div className="facts" style={{ borderTop: 0, paddingTop: 0 }}>
            {packages.map((pkg, i) => (
              <Reveal key={pkg.id} delay={i * 70}>
                <p className="fact__label">
                  {pkg.name}
                  {pkg.popular ? ' · Most popular' : ''}
                </p>
                <p className="plan__price" style={{ marginBottom: '0.75rem' }}>
                  {pkg.prefix && (
                    <span className="plan__prefix">{pkg.prefix}</span>
                  )}
                  {pkg.price}
                </p>
                <p className="muted small" style={{ maxWidth: '30ch' }}>
                  {pkg.tagline}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal className="btn-row" style={{ marginTop: '3rem' }}>
            <Link className="btn btn--lg" to="/packages">
              <span>See what is included</span>
              <span className="btn__arrow" aria-hidden="true">
                &rarr;
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
