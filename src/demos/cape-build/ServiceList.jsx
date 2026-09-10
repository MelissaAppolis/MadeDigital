import { useState } from 'react'
import { services } from './content.js'

/**
 * The services list.
 *
 * Two behaviours from one piece of markup, chosen by CSS rather than by
 * measuring the viewport in JavaScript:
 *
 * - Desktop: a tall row list beside a sticky image plate. Pointing at or
 *   focusing a row swaps which plate image is opaque. The photographs
 *   themselves never move — only opacity changes, which is the one image
 *   effect this concept allows.
 * - Mobile: the same rows become an accordion, each carrying its own image.
 *
 * `active` drives the plate, `open` drives the accordion, so hovering on
 * desktop never quietly expands anything on a touch device.
 */
export default function ServiceList() {
  const [active, setActive] = useState(services[0].id)
  const [open, setOpen] = useState(null)

  return (
    <div className="cb-services">
      <div className="cb-servicelist">
        {services.map((service) => {
          const isOpen = open === service.id
          return (
            <div
              key={service.id}
              className={`cb-service${active === service.id ? ' is-active' : ''}${
                isOpen ? ' is-open' : ''
              }`}
              onMouseEnter={() => setActive(service.id)}
            >
              <h3 style={{ margin: 0 }}>
                <button
                  type="button"
                  id={`cb-svc-${service.id}`}
                  className="cb-service__row"
                  aria-expanded={isOpen}
                  aria-controls={`cb-svc-panel-${service.id}`}
                  onFocus={() => setActive(service.id)}
                  onClick={() => setOpen(isOpen ? null : service.id)}
                >
                  <span className="cb-service__num">{service.number}</span>
                  <span className="cb-service__name">{service.title}</span>
                  <span className="cb-service__mark" aria-hidden="true" />
                </button>
              </h3>

              <div
                className="cb-service__panel"
                id={`cb-svc-panel-${service.id}`}
                role="region"
                aria-labelledby={`cb-svc-${service.id}`}
              >
                <div>
                  <figure className="cb-service__shot">
                    <img
                      src={service.image.src}
                      alt={service.image.alt}
                      width="700"
                      height="875"
                      loading="lazy"
                      decoding="async"
                    />
                  </figure>
                  <p className="cb-service__body">{service.body}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Desktop only. Hidden from assistive tech: every image here is already
          announced by the accordion figure above. */}
      <div className="cb-plate" aria-hidden="true">
        {services.map((service) => (
          <img
            key={service.id}
            src={service.image.src}
            alt=""
            width="700"
            height="875"
            loading="lazy"
            decoding="async"
            className={active === service.id ? 'is-shown' : undefined}
          />
        ))}
      </div>
    </div>
  )
}
