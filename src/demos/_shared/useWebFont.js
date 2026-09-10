import { useEffect } from 'react'

/**
 * Loads a Google Fonts stylesheet for one concept only.
 *
 * A concept's display typeface is part of that client's brand, not Made
 * Digital's, so it must not sit in index.html where every visitor pays for it.
 * Injecting it from the (lazily loaded) concept means the request happens the
 * first time someone opens that concept and never otherwise.
 *
 * The link is left in place after unmount: the browser has already cached the
 * font, and removing it would restyle the page mid-navigation.
 *
 * @param {string} href  Full Google Fonts stylesheet URL.
 */
export function useWebFont(href) {
  useEffect(() => {
    if (!href) return
    if (document.head.querySelector(`link[href="${href}"]`)) return

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = href
    document.head.appendChild(link)
  }, [href])
}
