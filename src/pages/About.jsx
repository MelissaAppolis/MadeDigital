import { Link } from 'react-router-dom'
import { useSeo } from '../hooks/useSeo.js'
import Reveal from '../components/Reveal.jsx'
import { CtaBand, ProcessSteps } from '../components/Sections.jsx'
import { DeviceStage } from '../components/Mockup.jsx'
import { previewUrl } from '../components/ProjectCard.jsx'
import { projectBySlug } from '../data/projects.js'
import { site } from '../data/site.js'

const principles = [
  {
    title: 'One studio, start to finish',
    body: 'The person you speak to is the person designing and building your website. Nothing gets handed down a chain.',
  },
  {
    title: 'Business first, technology second',
    body: 'We care what your website does for you. The tools underneath are our problem, not yours.',
  },
  {
    title: 'Built to be used',
    body: 'A website you cannot update is a website that goes stale. We hand over something you can actually live with.',
  },
  {
    title: 'Honest about scope',
    body: 'If something is not worth doing, we will say so. If a job is bigger than a package, we will price it properly.',
  },
]

export default function About() {
  // Picked by slug, not by position — the portfolio order changes.
  const showcase = projectBySlug('cape-build-co')

  useSeo({
    title: 'About | Made Digital — Cape Town Web Design Studio',
    description:
      'Made Digital is a Cape Town digital studio founded by Melissa Appolis, building modern websites for small and growing businesses.',
  })

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="page-hero__grid">
            <Reveal>
              <p className="eyebrow">About</p>
              <h1 style={{ marginTop: '1.5rem' }}>
                Built by a developer. Designed for business.
              </h1>
            </Reveal>
            <Reveal delay={100}>
              <p className="lede">
                A small Cape Town studio that would rather make a handful of
                websites properly than a hundred of them quickly.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 'clamp(2rem, 4vw, 3rem)' }}>
        <div className="container">
          <div className="split">
            <Reveal className="prose">
              <p>
                Made Digital is a Cape Town digital studio founded by{' '}
                <strong style={{ color: 'var(--ink)' }}>Melissa Appolis</strong>,
                a full-stack web developer passionate about building modern
                digital experiences.
              </p>
              <p>
                We created Made Digital to help small and growing businesses
                build a stronger online presence without the complexity and cost
                of a traditional agency.
              </p>
              <p>
                Most of the businesses we work with are good at what they do and
                busy doing it. Their website is usually the thing that got left
                behind — built years ago, never quite finished, or never built
                at all. It rarely reflects the standard of the actual work.
              </p>
              <p>
                That is the gap we work in. Not a marketing department, not a
                sales pipeline — one studio that designs and builds a website
                you would be happy for a customer to see.
              </p>

              <div className="facts" style={{ marginTop: '1.5rem' }}>
                <div>
                  <p className="fact__label">Founder</p>
                  <p className="fact__value">{site.founder}</p>
                </div>
                <div>
                  <p className="fact__label">Studio</p>
                  <p className="fact__value">Made Digital</p>
                </div>
                <div>
                  <p className="fact__label">Based in</p>
                  <p className="fact__value">Cape Town</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div
                className="project__frame"
                style={{ padding: 'clamp(1.25rem, 3vw, 2.5rem)' }}
              >
                <DeviceStage
                  className="stage--compact"
                  desktop={showcase.desktop}
                  mobile={showcase.mobile}
                  alt={`${showcase.title} website concept by Made Digital`}
                  url={previewUrl(showcase)}
                />
              </div>
              <p className="small muted" style={{ marginTop: '1.25rem' }}>
                {showcase.title} — a Made Digital concept. Fictional business,
                real design work.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <Reveal className="head head--split" style={{ marginBottom: '3.5rem' }}>
            <h2>How we work.</h2>
            <p className="lede">
              Four things we hold to, whether the job is R4,500 or considerably
              more.
            </p>
          </Reveal>

          <div className="benefits">
            {principles.map((principle, i) => (
              <Reveal className="benefit" key={principle.title} delay={i * 70}>
                <p className="benefit__num">0{i + 1}</p>
                <h3>{principle.title}</h3>
                <p>{principle.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ProcessSteps detailed />

      <CtaBand
        title="Let’s build something better."
        body="Tell us about your business. We will tell you honestly whether we are the right studio for it."
        primary={{ to: '/contact', label: 'Get in Touch' }}
        secondary={{ to: '/website-review', label: 'Free website review' }}
      />
    </>
  )
}
