import { Link } from 'react-router-dom'
import { useSeo } from '../hooks/useSeo.js'
import Reveal from '../components/Reveal.jsx'
import { BrowserMockup, DeviceStage } from '../components/Mockup.jsx'
import ProjectCard, { previewUrl } from '../components/ProjectCard.jsx'
import { CtaBand } from '../components/Sections.jsx'
import { featuredProjects, projects } from '../data/projects.js'
import { offerings } from '../data/services.js'
import { appExamples, invitations, spadework } from '../data/products.js'

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

function Arrow() {
  return (
    <span className="btn__arrow" aria-hidden="true">
      &rarr;
    </span>
  )
}

/** Eyebrow + h2 (+ optional one-liner) that opens each homepage section. */
function Head({ eyebrow, title, line }) {
  return (
    <Reveal className="head head--split" style={{ marginBottom: '3rem' }}>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 style={{ marginTop: '1.25rem' }}>{title}</h2>
      </div>
      {line && <p className="lede">{line}</p>}
    </Reveal>
  )
}

export default function Home() {
  useSeo({
    title: 'Made Digital | Websites and Apps That Bring You Business',
    description:
      'Made Digital creates modern websites and tailor-made business apps for small and growing businesses in Cape Town, South Africa.',
  })

  return (
    <>
      {/* ---- Hero ---- */}
      <section className="hero">
        <div className="container">
          <div className="hero__inner">
            <Reveal>
              <p className="eyebrow">Web and app studio · Cape Town</p>
              <h1 style={{ marginTop: '1.5rem' }}>
                Websites and apps that bring you business.
              </h1>
            </Reveal>

            <Reveal className="hero__aside" delay={120}>
              <p className="hero__lede">
                Websites that win enquiries. Apps that save you time.
              </p>
              <div className="btn-row">
                <Link className="btn btn--lg" to="/contact">
                  <span>Get in Touch</span>
                  <Arrow />
                </Link>
                <a className="btn btn--ghost btn--lg" href="#what-we-do">
                  What We Do
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        <Showreel />
      </section>

      {/* ---- The four offerings, given equal weight ---- */}
      <section className="section" id="what-we-do">
        <div className="container">
          <Head eyebrow="What we do" title="Four ways to grow your business." />
          <div className="offers offers--four">
            {offerings.map((o, i) => (
              <Reveal className="offer" key={o.id} delay={i * 70}>
                <p className="offer__num">0{i + 1}</p>
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

      {/* ---- Websites: the concepts ---- */}
      <section className="section section--cream">
        <div className="container">
          <Head
            eyebrow="Websites"
            title="Built to look the part."
            line="Concept sites we designed for local trades."
          />
          <div className="grid-work">
            {featuredProjects.slice(0, 2).map((project, i) => (
              <ProjectCard key={project.slug} project={project} delay={i * 80} />
            ))}
          </div>
          <Reveal className="btn-row" style={{ marginTop: '3rem' }}>
            <Link className="btn btn--lg" to="/work">
              <span>View all work</span>
              <Arrow />
            </Link>
            <Link className="btn btn--ghost btn--lg" to="/packages">
              Website prices
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---- Digital invitations ---- */}
      <section className="section">
        <div className="container">
          <div className="split">
            <Reveal>
              <p className="eyebrow">{invitations.audience}</p>
              <h2 style={{ marginTop: '1.25rem' }}>
                Invitations guests answer on their phones.
              </h2>
              <ul className="checklist" style={{ marginTop: '1.75rem' }}>
                <li>Shared on WhatsApp, no app needed</li>
                <li>Live guest count and dietary needs</li>
                <li>Your venue’s name on every invitation</li>
              </ul>
              <div className="btn-row" style={{ marginTop: '2rem' }}>
                {/* /invites/ is a separate static app, so a full page load. */}
                <a className="btn btn--lg" href={invitations.demoHref}>
                  <span>Try the demo</span>
                  <Arrow />
                </a>
                <Link className="btn btn--ghost btn--lg" to="/packages#invitations">
                  Free trial and prices
                </Link>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <DeviceStage
                className="stage--compact"
                desktop={invitations.images.desktop}
                mobile={invitations.images.mobile}
                alt={invitations.images.alt}
                url={invitations.images.url}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- Spadework ---- */}
      <section className="section section--dark">
        <div className="container">
          <Head
            eyebrow={`${spadework.audience} · ${spadework.status}`}
            title="Spadework. Every job, one place."
            line="From the first quote to the final invoice."
          />
          <Reveal>
            <ul className="chips">
              {spadework.groups.map((g) => (
                <li key={g.title}>{g.title}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="btn-row" style={{ marginTop: '2.5rem' }}>
            <Link className="btn btn--light btn--lg" to={spadework.contact}>
              <span>Book a walkthrough</span>
              <Arrow />
            </Link>
            <Link className="btn btn--ghost-light btn--lg" to={spadework.to}>
              See Spadework
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---- Custom apps ---- */}
      <section className="section section--cream">
        <div className="container">
          <Head
            eyebrow="Custom apps"
            title="Admin eating your week? We build the fix."
          />
          <div className="benefits">
            {appExamples.map((item, i) => (
              <Reveal className="benefit" key={item.title} delay={i * 70}>
                <p className="benefit__num">0{i + 1}</p>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="btn-row" style={{ marginTop: '3rem' }}>
            <Link className="btn btn--lg" to="/contact?need=app">
              <span>Tell us what slows you down</span>
              <Arrow />
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Let’s talk."
        body="Tell us what you need. We will tell you what it takes and what it costs."
        secondary={{ to: '/packages', label: 'See prices' }}
      />
    </>
  )
}
