import { Link } from 'react-router-dom'
import { useSeo } from '../hooks/useSeo.js'
import Reveal from '../components/Reveal.jsx'
import {
  BeforeAfter,
  CtaBand,
  ProcessSteps,
  ReviewCallout,
} from '../components/Sections.jsx'
import { benefits, services } from '../data/services.js'

export default function Services() {
  useSeo({
    title: 'Services | Web Design & Development in Cape Town | Made Digital',
    description:
      'New business websites, website redesigns, mobile optimisation, WhatsApp integration, SEO foundations and website care for Cape Town businesses.',
  })

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="page-hero__grid">
            <Reveal>
              <p className="eyebrow">Services</p>
              <h1 style={{ marginTop: '1.5rem' }}>
                Websites built to bring in work.
              </h1>
            </Reveal>
            <Reveal delay={100}>
              <p className="lede">
                Six things we do, all pointed at the same outcome: more of the
                right people getting in touch with your business.
              </p>
              <div className="btn-row" style={{ marginTop: '2rem' }}>
                <Link className="btn" to="/website-review">
                  <span>Get a Free Website Review</span>
                  <span className="btn__arrow" aria-hidden="true">
                    &rarr;
                  </span>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 'clamp(2rem, 4vw, 3rem)' }}>
        <div className="container">
          <div className="services">
            {services.map((service, i) => (
              <Reveal
                className="service"
                key={service.id}
                id={service.id}
                delay={i * 40}
              >
                <p className="service__num">{service.number}</p>
                {/* Top-level content on this page, so h2 rather than h3. */}
                <h2>{service.title}</h2>
                <div>
                  <p className="service__body">{service.body}</p>
                  <ul className="service__includes">
                    {service.includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <Reveal className="head head--split" style={{ marginBottom: '3.5rem' }}>
            <h2>Why any of this matters.</h2>
            <p className="lede">
              A website is not a brochure any more. For most local businesses it
              is the deciding factor between an enquiry and a missed one.
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

      <ReviewCallout />
      <ProcessSteps detailed />
      <BeforeAfter />

      <CtaBand
        title="Not sure which of these you need?"
        body="Most people are not, and that is fine. Send us your website — or just tell us what you do — and we will tell you honestly what is worth doing first."
        primary={{ to: '/website-review', label: 'Get a Free Website Review' }}
        secondary={{ to: '/packages', label: 'See packages' }}
      />
    </>
  )
}
