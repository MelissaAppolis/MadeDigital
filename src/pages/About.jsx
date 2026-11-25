import { Link } from 'react-router-dom'
import { useSeo } from '../hooks/useSeo.js'
import Reveal from '../components/Reveal.jsx'
import { CtaBand } from '../components/Sections.jsx'
import { DeviceStage } from '../components/Mockup.jsx'
import { previewUrl } from '../components/ProjectCard.jsx'
import { projectBySlug } from '../data/projects.js'
import { site } from '../data/site.js'

const principles = [
  {
    title: 'One person, start to finish',
    body: 'The person you talk to designs and builds your project.',
  },
  {
    title: 'Business first',
    body: 'We care what it does for you, not which tools are underneath.',
  },
  {
    title: 'Easy to use',
    body: 'You get something you can actually run yourself.',
  },
  {
    title: 'Honest about scope',
    body: 'If something is not worth doing, we will say so.',
  },
]

export default function About() {
  // Picked by slug, not by position — the portfolio order changes.
  const showcase = projectBySlug('cape-build-co')

  useSeo({
    title: 'About | Made Digital — Cape Town Web Design Studio',
    description:
      'Made Digital is a Cape Town digital studio founded by Melissa Appolis, building modern websites and business apps for small and growing businesses.',
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
                A small Cape Town studio. Fewer projects, done properly.
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
                Made Digital was started by{' '}
                <strong style={{ color: 'var(--ink)' }}>Melissa Appolis</strong>,
                a full-stack developer in Cape Town. The studio is new, so
                every project gets her full attention.
              </p>
              <p>
                Most small businesses are good at what they do but their
                website was left behind. We build websites that match the
                standard of your work, and apps that take the admin off your
                hands.
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
            <h2>What we stand for.</h2>
            <p className="lede">The same on every job, big or small.</p>
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

      <CtaBand
        title="Let’s talk."
        body="Tell us about your business. We will tell you honestly if we are the right fit."
        primary={{ to: '/contact', label: 'Get in Touch' }}
        secondary={{ to: '/products', label: 'See our products' }}
      />
    </>
  )
}
