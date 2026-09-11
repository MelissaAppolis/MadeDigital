import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { site } from '../data/site.js'

function setMeta(selector, attr, value) {
  if (!value) return
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    const [, key, name] = selector.match(/\[(\w+)="([^"]+)"\]/) || []
    if (key && name) el.setAttribute(key, name)
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

/**
 * Per-page document head. Small enough not to warrant a helmet dependency.
 *
 * @param {object} meta
 * @param {string} meta.title        Full <title>, used verbatim.
 * @param {string} meta.description  Meta + OG description.
 * @param {string} [meta.image]      Absolute or root-relative OG image path.
 * @param {string} [meta.type]       OG type. Defaults to 'website'.
 * @param {boolean} [meta.noindex]   Adds a robots noindex tag.
 */
export function useSeo({ title, description, image, type = 'website', noindex = false }) {
  const { pathname } = useLocation()

  useEffect(() => {
    const url = `${site.url}${pathname === '/' ? '/' : pathname}`
    const img = image
      ? image.startsWith('http')
        ? image
        : `${site.url}${image}`
      : `${site.url}/og-image.png`

    document.title = title
    setMeta('meta[name="description"]', 'content', description)
    setMeta('meta[property="og:title"]', 'content', title)
    setMeta('meta[property="og:description"]', 'content', description)
    setMeta('meta[property="og:url"]', 'content', url)
    setMeta('meta[property="og:image"]', 'content', img)
    setMeta('meta[property="og:type"]', 'content', type)
    setMeta('meta[name="twitter:title"]', 'content', title)
    setMeta('meta[name="twitter:description"]', 'content', description)
    setMeta('meta[name="twitter:image"]', 'content', img)

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', url)

    const robots = document.head.querySelector('meta[name="robots"]')
    if (noindex) {
      setMeta('meta[name="robots"]', 'content', 'noindex, follow')
    } else if (robots) {
      robots.remove()
    }
  }, [title, description, image, type, noindex, pathname])
}
