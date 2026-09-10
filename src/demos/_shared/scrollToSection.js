/**
 * Scrolls to an in-page section and moves focus there.
 *
 * Shared by every concept site, because they are all single pages with anchor
 * navigation and they all hit the same problem: the mobile drawer sets
 * `body { overflow: hidden }`, so a native anchor jump is clamped before React
 * has unmounted the drawer and released the lock. Waiting two frames lets the
 * unmount land first.
 *
 * @param {string} href  A selector such as '#treatments'.
 */
export function scrollToSection(href) {
  const target = document.querySelector(href)
  if (!target) return
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      target.scrollIntoView({
        behavior: reduced ? 'auto' : 'smooth',
        block: 'start',
      })
      target.focus?.({ preventScroll: true })
      window.history.replaceState(null, '', href)
    })
  })
}
