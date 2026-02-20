import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navigation from './Navigation'
import Footer from './Footer'

const Layout = ({ children }) => {
  const location = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-paper grain relative overflow-x-hidden">
      {/* Decorative elements */}
      <div className="fixed top-0 right-0 w-64 h-64 bg-coral/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-acid/5 rounded-full blur-3xl pointer-events-none" />

      <Navigation />

      <main className="relative z-10">
        {children}
      </main>

      <Footer />
    </div>
  )
}

export default Layout
