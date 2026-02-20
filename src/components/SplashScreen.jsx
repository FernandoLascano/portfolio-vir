import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SplashScreen = ({ onEnter }) => {
  const [isExiting, setIsExiting] = useState(false)
  const [hovering, setHovering] = useState(false)

  const handleEnter = () => {
    setIsExiting(true)
    setTimeout(() => {
      onEnter()
    }, 1200)
  }

  // Allow Enter key to dismiss
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Enter' || e.key === ' ') handleEnter()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-[9999] overflow-hidden select-none"
          style={{ cursor: 'none' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          onClick={handleEnter}
        >
          {/* Background with grid */}
          <div
            className="absolute inset-0 bg-[#FAF7F2]"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />

          {/* Vertical red line */}
          <motion.div
            className="absolute left-[28%] top-0 bottom-0 w-[3px] bg-[#B0041A]"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            style={{ transformOrigin: 'top' }}
          />

          {/* Giant typography */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="relative"
              style={{
                marginLeft: '10%',
                width: '75%',
              }}
            >
              {/* "bienvenida" */}
              <motion.div
                className="overflow-hidden"
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
              >
                <h1
                  style={{
                    fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                    fontWeight: 700,
                    fontSize: 'clamp(60px, 12vw, 180px)',
                    lineHeight: 0.9,
                    color: '#B0041A',
                    margin: 0,
                    letterSpacing: '-0.04em',
                  }}
                >
                  bienvenido
                </h1>
              </motion.div>

              {/* "a mi" */}
              <motion.div
                className="overflow-hidden"
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.45 }}
              >
                <h1
                  style={{
                    fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                    fontWeight: 700,
                    fontSize: 'clamp(60px, 12vw, 180px)',
                    lineHeight: 0.9,
                    color: '#B0041A',
                    margin: 0,
                    letterSpacing: '-0.04em',
                    paddingLeft: '15%',
                  }}
                >
                  a mi
                </h1>
              </motion.div>

              {/* "portfolio" */}
              <motion.div
                className="overflow-hidden"
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.6 }}
              >
                <h1
                  style={{
                    fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                    fontWeight: 700,
                    fontSize: 'clamp(60px, 12vw, 180px)',
                    lineHeight: 0.9,
                    color: '#B0041A',
                    margin: 0,
                    letterSpacing: '-0.04em',
                  }}
                >
                  portfolio <span style={{ fontSize: '13px', fontWeight: 300, letterSpacing: '0.02em', verticalAlign: 'super', position: 'relative', top: '-0.3em', marginLeft: '-0.3em' }}>©2026</span>
                </h1>
              </motion.div>
            </div>
          </div>

          {/* Bottom right - enter button */}
          <motion.div
            className="absolute bottom-10 right-10 z-10 pointer-events-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
          >
            <button
              onClick={handleEnter}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              className="group flex items-center gap-3"
              style={{ cursor: 'none' }}
            >
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '13px',
                  fontWeight: 400,
                  color: '#1a1a1a',
                  opacity: 0.5,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                click para entrar
              </span>
              <motion.div
                className="w-10 h-10 border border-[#B0041A] rounded-full flex items-center justify-center"
                animate={{
                  scale: hovering ? 1.2 : 1,
                  backgroundColor: hovering ? '#B0041A' : 'transparent',
                }}
                transition={{ duration: 0.3 }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={hovering ? '#FAF7F2' : '#B0041A'}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </motion.div>
            </button>
          </motion.div>

          {/* Córdoba, AR label */}
          <motion.div
            className="absolute bottom-10 left-[6%]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 1.6, duration: 0.6 }}
          >
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                color: '#1a1a1a',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Córdoba, Argentina
            </p>
          </motion.div>

        </motion.div>
      )}

      {/* Exit animation - red wipe */}
      {isExiting && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[#FAF7F2]"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: [0, 1, 1, 0] }}
          transition={{
            duration: 1.2,
            times: [0, 0.4, 0.6, 1],
            ease: [0.76, 0, 0.24, 1],
          }}
          style={{ transformOrigin: 'top' }}
        />
      )}
    </AnimatePresence>
  )
}

export default SplashScreen
