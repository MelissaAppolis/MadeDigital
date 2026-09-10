import { scrollToSection } from '../_shared/scrollToSection.js'
import { services } from './content.js'
import { ArrowIcon } from './icons.jsx'

/**
 * The service menu — a ruled vertical list rather than a grid of cards.
 *
 * One row, one tab stop: the service name carries a stretched link that covers
 * the whole row (the focus ring lives on that link's ::after, so a computed
 * style check on the anchor itself reports no outline). Picking a row scrolls
 * to the quote form and preselects that service.
 *
 * Desktop rows reveal a small photograph as the pointer or focus moves down
 * the list. It is a plain opacity change on a static image — the photograph
 * itself never moves, scales or cross-fades. On phones the same photograph is
 * simply always visible, so nothing depends on hover.
 */
export default function ServiceMenu({ onPick }) {
  const choose = (event, service) => {
    event.preventDefault()
    onPick?.(service.id)
    scrollToSection('#quote')
  }

  return (
    <ol className="cc-menu">
      {services.map((service) => (
        <li className="cc-menu__row" key={service.id}>
          <span className="cc-menu__num" aria-hidden="true">
            {service.number}
          </span>

          <div className="cc-menu__text">
            <h3 className="cc-menu__title">
              <a
                className="cc-menu__link"
                href="#quote"
                onClick={(event) => choose(event, service)}
              >
                {service.title}
              </a>
            </h3>
            <p className="cc-menu__body">{service.body}</p>
          </div>

          <figure className="cc-menu__shot">
            <img
              src={service.image.src}
              alt={service.image.alt}
              width="800"
              height="600"
              loading="lazy"
              decoding="async"
            />
          </figure>

          <p className="cc-menu__price">{service.price}</p>

          <p className="cc-menu__cta" aria-hidden="true">
            <span>Get a quote</span>
            <ArrowIcon size={17} />
          </p>
        </li>
      ))}
    </ol>
  )
}
