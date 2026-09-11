import { useEffect } from 'react'

/**
 * Adds a page-level JSON-LD block to the head and removes it when the route
 * unmounts, so one page's structured data never leaks onto the next.
 *
 * The site-wide ProfessionalService block lives in index.html and stays put —
 * this is only for structured data that differs per page.
 *
 * The object is stringified before it becomes the effect dependency, so a
 * caller can pass a fresh literal on every render without the script being
 * torn down and re-added each time.
 *
 * @param {object|null} data  A schema.org object, or null to add nothing.
 */
export function useJsonLd(data) {
  const json = data ? JSON.stringify(data) : null

  useEffect(() => {
    if (!json) return undefined

    const el = document.createElement('script')
    el.type = 'application/ld+json'
    el.textContent = json
    document.head.appendChild(el)

    return () => el.remove()
  }, [json])
}
