import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const navLinks = [
    { to: '/', label: 'Proyectos' },
    { to: '/sobre-mi', label: 'Sobre Mí' },
    { to: '/contacto', label: 'Contacto' },
  ]

  const menuVariants = {
    closed: {
      clipPath: 'circle(0% at calc(100% - 40px) 40px)',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      clipPath: 'circle(150% at calc(100% - 40px) 40px)',
      transition: {
        type: 'spring',
        stiffness: 20,
        restDelta: 2,
      },
    },
  }

  const linkVariants = {
    closed: { opacity: 0, y: 50 },
    open: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1 + 0.3,
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    }),
  }

  return (
    <>
      {/* Desktop Navigation */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-4 bg-paper/95 backdrop-blur-md shadow-sm' : 'py-6'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="relative group">
              <motion.div
                className={`font-display text-2xl lg:text-3xl italic transition-colors ${
                  scrolled ? 'text-ink' : 'text-ink'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Virginia
                <span className="text-gold">.</span>
              </motion.div>
              <div className="absolute -bottom-1 left-0 w-0 h-1 bg-acid group-hover:w-full transition-all duration-300" />
            </Link>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-12">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="relative group"
                >
                  <span className={`font-heading text-sm uppercase tracking-widest transition-colors ${
                    location.pathname === link.to ? 'text-acid' : 'text-ink hover:text-coral'
                  }`}>
                    {link.label}
                  </span>
                  {location.pathname === link.to && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-acid"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden relative w-12 h-12 flex items-center justify-center border-3 border-ink bg-paper hover:bg-acid transition-colors"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-4">
                <motion.span
                  className="absolute left-0 w-full h-0.5 bg-ink"
                  animate={{
                    top: isOpen ? '50%' : '0%',
                    rotate: isOpen ? 45 : 0,
                    translateY: isOpen ? '-50%' : 0,
                  }}
                />
                <motion.span
                  className="absolute left-0 top-1/2 w-full h-0.5 bg-ink -translate-y-1/2"
                  animate={{
                    opacity: isOpen ? 0 : 1,
                    scaleX: isOpen ? 0 : 1,
                  }}
                />
                <motion.span
                  className="absolute left-0 w-full h-0.5 bg-ink"
                  animate={{
                    bottom: isOpen ? '50%' : '0%',
                    rotate: isOpen ? -45 : 0,
                    translateY: isOpen ? '50%' : 0,
                  }}
                />
              </div>
            </button>

            {/* CTA Button Desktop */}
            <div className="hidden lg:block">
              <Link
                to="/contacto"
                className="btn-brutal text-sm"
              >
                Hablemos
              </Link>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu Fullscreen */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden bg-ink"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className="h-full flex flex-col items-center justify-center">
              <nav className="flex flex-col items-center gap-8">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    custom={i}
                    variants={linkVariants}
                  >
                    <Link
                      to={link.to}
                      className={`font-display text-5xl md:text-7xl italic transition-colors ${
                        location.pathname === link.to
                          ? 'text-acid'
                          : 'text-paper hover:text-coral'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Decorative elements in menu */}
              <motion.div
                className="absolute bottom-12 left-12 text-paper/20 font-mono text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                PORTFOLIO 2026
              </motion.div>

              <motion.div
                className="absolute bottom-12 right-12 flex gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-paper/50 hover:text-acid transition-colors">
                  IG
                </a>
                <a href="https://behance.net" target="_blank" rel="noopener noreferrer" className="text-paper/50 hover:text-acid transition-colors">
                  BE
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-paper/50 hover:text-acid transition-colors">
                  LI
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navigation
