import { experiences } from './content.js'

/**
 * The five Cape Town experiences, as a horizontal rail.
 *
 * A rail rather than a grid or a slideshow: the guest drags or scrolls it
 * themselves, nothing advances on a timer, and no photograph moves. Each panel
 * is a tall static photograph with the label and a line of copy over a fixed
 * gradient scrim — the scrim is part of the panel, not an effect that animates
 * in on hover.
 *
 * It is a plain scroll container with scroll-snap, so a keyboard user can tab
 * through the panels and the browser scrolls them into view for free, and a
 * screen reader gets an ordinary list.
 */
export default function Experience() {
  return (
    <div className="hh-rail" role="group" aria-label="Cape Town experiences">
      <ul className="hh-rail__track">
        {experiences.map((item) => (
          <li className="hh-rail__item" key={item.id}>
            <article className="hh-exp">
              <img
                src={item.image.src}
                alt={item.image.alt}
                width="900"
                height="1350"
                loading="lazy"
                decoding="async"
              />
              <div className="hh-exp__text">
                <h3 className="hh-exp__label">{item.label}</h3>
                <p className="hh-exp__line">{item.line}</p>
                <p className="hh-exp__body">{item.body}</p>
              </div>
            </article>
          </li>
        ))}
      </ul>
      <p className="hh-rail__hint" aria-hidden="true">
        Scroll for more &rarr;
      </p>
    </div>
  )
}
