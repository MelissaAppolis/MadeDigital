import { useState } from 'react'
import { scrollToSection } from '../_shared/scrollToSection.js'
import { categories, treatments } from './content.js'

const rowId = (name) =>
  `so-t-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`

/**
 * The treatment menu.
 *
 * An editorial price list rather than a grid of cards: a row per treatment,
 * leader dots running out to the duration and price, and the description
 * revealed on click. Everything comes from `treatments` in content.js, and the
 * tabs are built from `categories`, so a client can add or reprice a treatment
 * without touching this file.
 */
export default function TreatmentMenu({ onBook }) {
  const [active, setActive] = useState(categories[0])
  const [openRow, setOpenRow] = useState(null)

  const shown = treatments.filter((t) => t.category === active)

  return (
    <div>
      <div className="so-tabs" role="tablist" aria-label="Treatment categories">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            role="tab"
            id={`so-tab-${category}`}
            aria-selected={active === category}
            aria-controls={`so-panel-${category}`}
            className="so-tab"
            onClick={() => {
              setActive(category)
              setOpenRow(null)
            }}
          >
            {category}
          </button>
        ))}
      </div>

      <div
        className="so-menu"
        role="tabpanel"
        id={`so-panel-${active}`}
        aria-labelledby={`so-tab-${active}`}
      >
        {shown.map((treatment) => {
          const id = rowId(treatment.name)
          const isOpen = openRow === treatment.name

          return (
            <div className="so-menu__item" key={treatment.name} data-open={isOpen}>
              <h3 style={{ margin: 0 }}>
                <button
                  type="button"
                  id={`${id}-btn`}
                  className="so-menu__row"
                  aria-expanded={isOpen}
                  aria-controls={id}
                  onClick={() => setOpenRow(isOpen ? null : treatment.name)}
                >
                  <span className="so-menu__name">{treatment.name}</span>
                  <span className="so-menu__leader" aria-hidden="true" />
                  <span className="so-menu__meta">
                    <span className="so-menu__duration">
                      {treatment.duration}
                    </span>
                    <span className="so-menu__price">{treatment.price}</span>
                    <span className="so-menu__sign" aria-hidden="true" />
                  </span>
                </button>
              </h3>

              <div
                className="so-menu__detail"
                id={id}
                role="region"
                aria-labelledby={`${id}-btn`}
              >
                <div>
                  <p>{treatment.description}</p>
                  <button
                    type="button"
                    className="so-btn so-btn--sm"
                    onClick={() => {
                      onBook?.(treatment.name)
                      scrollToSection('#contact')
                    }}
                  >
                    Book {treatment.name}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
