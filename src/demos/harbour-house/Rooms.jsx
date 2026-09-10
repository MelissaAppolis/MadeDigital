import Reveal from '../../components/Reveal.jsx'
import { rooms } from './content.js'
import { ArrowIcon } from './icons.jsx'

/**
 * The three rooms.
 *
 * Deliberately NOT three identical cards. Each room gets its own composition,
 * named by `layout` in content.js:
 *
 *   wide   — one broad photograph with the text set beneath its left edge
 *   offset — text first, photograph to the right, with a small square detail
 *            dropped below the text so the pair reads as a spread
 *   full   — a full-width photograph with the text panel sitting on the ivory
 *            below it, indented to the right
 *
 * They share type, rules and button styling, so the section still reads as one
 * family — the variation is in the composition, not the components.
 */
export default function Rooms({ onOpen }) {
  return (
    <div className="hh-rooms">
      {rooms.map((room, i) => (
        <Reveal
          className={`hh-room hh-room--${room.layout}`}
          key={room.id}
          delay={i * 60}
        >
          <figure className="hh-room__shot">
            <img
              src={room.images.main.src}
              alt={room.images.main.alt}
              width="1400"
              height="933"
              loading="lazy"
              decoding="async"
            />
          </figure>

          {room.layout === 'offset' && (
            <figure className="hh-room__detail">
              <img
                src={room.images.detail.src}
                alt={room.images.detail.alt}
                width="800"
                height="800"
                loading="lazy"
                decoding="async"
              />
            </figure>
          )}

          <div className="hh-room__text">
            <p className="hh-eyebrow">
              {room.index} · {room.sleeps}
            </p>
            <h3 className="hh-room__name">{room.name}</h3>
            <p className="hh-room__short">{room.short}</p>

            <button
              type="button"
              className="hh-link"
              onClick={() => onOpen(room.id)}
              aria-label={`View ${room.name}`}
            >
              View Room
              <ArrowIcon size={16} />
            </button>
          </div>
        </Reveal>
      ))}
    </div>
  )
}
