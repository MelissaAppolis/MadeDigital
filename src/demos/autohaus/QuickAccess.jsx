import { scrollToSection } from '../_shared/scrollToSection.js'
import { quickServices } from './content.js'
import { serviceIcons } from './icons.jsx'

/**
 * "What does your car need?" — six cells in one continuous strip.
 *
 * Deliberately not cards: the cells share hairline seams and sit edge to edge
 * so the row reads as one instrument face rather than six boxes. Picking a
 * cell selects that service in the directory below and scrolls to it.
 *
 * Hover and focus lighten the cell and bring up its description and a small
 * photograph. Both are already in the DOM at a reserved size, so nothing
 * reflows and the photograph only ever changes opacity — it never moves,
 * scales or cross-fades. Below the desktop breakpoint the description is
 * simply always visible, so nothing at all depends on hovering.
 */
export default function QuickAccess({ onPick }) {
  const choose = (id) => {
    onPick?.(id)
    scrollToSection('#services')
  }

  return (
    <div className="ah-quick">
      {quickServices.map((service) => {
        const Icon = serviceIcons[service.id] ?? null
        return (
          <button
            type="button"
            className="ah-quick__cell"
            key={service.id}
            onClick={() => choose(service.id)}
          >
            <span className="ah-quick__top">
              <span className="ah-quick__index">{service.number}</span>
              {Icon && <Icon size={24} />}
            </span>

            <span className="ah-quick__label">{service.quickLabel}</span>
            <span className="ah-quick__desc">{service.short}</span>

            <span className="ah-quick__shot" aria-hidden="true">
              <img
                src={service.image.src}
                alt=""
                width="900"
                height="675"
                loading="lazy"
                decoding="async"
              />
            </span>
          </button>
        )
      })}
    </div>
  )
}
