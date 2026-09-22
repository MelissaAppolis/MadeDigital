import { Suspense, lazy, useEffect } from 'react'
import { Outlet, Route, Routes, useLocation } from 'react-router-dom'

import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

import Home from './pages/Home.jsx'
import Services from './pages/Services.jsx'
import Work from './pages/Work.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import Packages from './pages/Packages.jsx'
import About from './pages/About.jsx'
import WebsiteReview from './pages/WebsiteReview.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'

/**
 * Concept sites are whole websites with their own navigation, footer and
 * design system, so they are split out of the main bundle — a visitor who
 * never opens one never downloads it.
 */
const CapeTownPlumbing = lazy(
  () => import('./demos/cape-town-plumbing/index.jsx')
)
const StudioOlive = lazy(() => import('./demos/studio-olive/index.jsx'))
const CapeBuild = lazy(() => import('./demos/cape-build/index.jsx'))
const CleanAndCo = lazy(() => import('./demos/clean-and-co/index.jsx'))
const AutoHaus = lazy(() => import('./demos/autohaus/index.jsx'))
const HarbourHouse = lazy(() => import('./demos/harbour-house/index.jsx'))
const KestrelDermatology = lazy(
  () => import('./demos/kestrel-dermatology/index.jsx')
)

/** Concept routes render bare — no Made Digital header or footer. */
const conceptRoutes = [
  { path: '/work/cape-town-plumbing-co/live', element: <CapeTownPlumbing /> },
  { path: '/work/studio-olive-beauty/live', element: <StudioOlive /> },
  { path: '/work/cape-build-co/live', element: <CapeBuild /> },
  { path: '/work/clean-and-co/live', element: <CleanAndCo /> },
  { path: '/work/autohaus-cape-town/live', element: <AutoHaus /> },
  { path: '/work/harbour-house/live', element: <HarbourHouse /> },
  { path: '/work/kestrel-dermatology/live', element: <KestrelDermatology /> },
]

/**
 * Restores scroll position on navigation, and moves focus to the main region
 * so keyboard and screen reader users land at the top of the new page.
 */
function RouteChange() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash)
      if (target) {
        target.scrollIntoView({ behavior: 'auto', block: 'start' })
        return
      }
    }
    window.scrollTo(0, 0)
    const main = document.getElementById('main')
    if (main) main.focus({ preventScroll: true })
  }, [pathname, hash])

  return null
}

/**
 * The Made Digital site itself: studio header, page, studio footer.
 * Concept sites deliberately render outside this so they carry none of it.
 */
function StudioLayout() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1} style={{ outline: 'none' }}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <>
      <RouteChange />
      <Routes>
        {/* Concept sites — no Made Digital chrome. */}
        {conceptRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
                {route.element}
              </Suspense>
            }
          />
        ))}

        {/* The Made Digital site. */}
        <Route element={<StudioLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<ProjectDetail />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/about" element={<About />} />
          <Route path="/website-review" element={<WebsiteReview />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}
