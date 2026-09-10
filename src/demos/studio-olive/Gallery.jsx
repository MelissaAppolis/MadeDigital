import { useCallback, useEffect, useRef, useState } from 'react'
import { gallery } from './content.js'
import { CloseIcon } from './icons.jsx'

/**
 * Masonry gallery with a lightbox.
 *
 * The lightbox is about forty lines of state and a keydown handler, which is
 * cheaper than any gallery library and behaves better: it traps nothing it
 * should not, restores focus to the thumbnail that opened it, and closes on
 * Escape or a click outside the image.
 */
export default function Gallery() {
  const [index, setIndex] = useState(null)
  const openerRef = useRef(null)
  const closeRef = useRef(null)
  const open = index !== null

  const close = useCallback(() => {
    setIndex(null)
    openerRef.current?.focus()
  }, [])

  const step = useCallback((delta) => {
    setIndex((i) => (i === null ? i : (i + delta + gallery.length) % gallery.length))
  }, [])

  useEffect(() => {
    if (!open) return

    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', onKey)
    }
  }, [open, close, step])

  const current = open ? gallery[index] : null

  return (
    <>
      <div className="so-gallery">
        {gallery.map((shot, i) => (
          <button
            type="button"
            key={shot.src}
            className={`so-shot${shot.span === 'tall' ? ' so-shot--tall' : ''}${
              shot.span === 'wide' ? ' so-shot--wide' : ''
            }`}
            onClick={(e) => {
              openerRef.current = e.currentTarget
              setIndex(i)
            }}
          >
            <img src={shot.src} alt={shot.alt} loading="lazy" decoding="async" />
          </button>
        ))}
      </div>

      {open && (
        <div
          className="so-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Gallery image ${index + 1} of ${gallery.length}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) close()
          }}
        >
          <button
            ref={closeRef}
            type="button"
            className="so-lightbox__close"
            onClick={close}
            aria-label="Close gallery"
          >
            <CloseIcon size={20} />
          </button>

          <button
            type="button"
            className="so-lightbox__nav so-lightbox__nav--prev"
            onClick={() => step(-1)}
            aria-label="Previous image"
          >
            &larr;
          </button>

          <img src={current.src} alt={current.alt} />

          <button
            type="button"
            className="so-lightbox__nav so-lightbox__nav--next"
            onClick={() => step(1)}
            aria-label="Next image"
          >
            &rarr;
          </button>

          <p className="so-lightbox__caption">
            {current.alt} — {index + 1} of {gallery.length}
          </p>
        </div>
      )}
    </>
  )
}
