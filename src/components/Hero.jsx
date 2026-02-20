import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'

const Hero = () => {
  const containerRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 50, stiffness: 400 }
  const mouseXSpring = useSpring(mouseX, springConfig)
  const mouseYSpring = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      mouseX.set((clientX - innerWidth / 2) / 20)
      mouseY.set((clientY - innerHeight / 2) / 20)
      setMousePosition({ x: clientX, y: clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Letter animation variants
  const titleVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.3,
      },
    },
  }

  const letterVariants = {
    hidden: { y: 100, opacity: 0, rotateX: 90 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  }

  const name = 'Virginia Lebrino'
  const title = 'Estudiante de Diseño Gráfico'

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12"
    >
      {/* Animated background shapes */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-acid/30 blob"
        style={{
          x: mouseXSpring,
          y: mouseYSpring,
        }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <motion.div
        className="absolute bottom-32 right-20 w-48 h-48 border-4 border-coral"
        style={{
          x: useTransform(mouseXSpring, (v) => -v * 1.5),
          y: useTransform(mouseYSpring, (v) => -v * 1.5),
        }}
        animate={{
          rotate: [0, 90, 180, 270, 360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <motion.div
        className="absolute top-1/3 right-1/4 w-32 h-32 bg-electric/20 rounded-full blur-xl"
        style={{
          x: useTransform(mouseXSpring, (v) => v * 2),
          y: useTransform(mouseYSpring, (v) => v * 2),
        }}
      />

      {/* Abstract rotating shape */}
      <motion.div
        className="absolute top-32 right-12 lg:right-24 w-20 h-20 lg:w-28 lg:h-28 border-3 border-acid/40 rounded-[30%]"
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      />

      {/* Main content */}
      <motion.div
        className="container mx-auto px-6 lg:px-12 relative z-10"
        style={{ y, opacity, scale }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Pre-title */}
          <motion.div
            className="mb-8 flex items-center gap-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <div className="w-12 h-0.5 bg-ink" />
            <span className="font-mono text-sm uppercase tracking-widest text-ink/60">
              Portfolio 2026
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[12rem] leading-[0.85] text-ink perspective-1000"
            variants={titleVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="overflow-visible pb-2">
              {name.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  variants={letterVariants}
                  style={{
                    marginRight: letter === ' ' ? '0.3em' : '0',
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </div>
          </motion.h1>

          {/* Title with handmade underline */}
          <motion.div
            className="mt-6 lg:mt-8 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-medium text-ink underline-hand inline-block">
              {title}
            </h2>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-coral rounded-full" />
              <span className="font-body text-ink/60">Córdoba, Argentina</span>
            </div>
          </motion.div>


        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <span className="font-mono text-xs uppercase tracking-widest text-ink/40">Scroll</span>
        <motion.div
          className="w-6 h-10 border-2 border-ink/30 rounded-full flex justify-center pt-2"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-1.5 bg-ink/50 rounded-full"
            animate={{ y: [0, 12, 0], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>

      {/* Hand-drawn decorative elements */}
      <svg
        className="absolute bottom-20 left-10 w-32 h-32 text-coral/30"
        viewBox="0 0 100 100"
        fill="none"
      >
        <motion.path
          d="M10 50 Q25 20, 50 50 T90 50"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.5, duration: 1.5, ease: 'easeInOut' }}
        />
      </svg>

      <svg
        className="absolute top-1/2 right-10 w-20 h-20 text-acid/50"
        viewBox="0 0 100 100"
        fill="none"
      >
        <motion.circle
          cx="50"
          cy="50"
          r="40"
          stroke="currentColor"
          strokeWidth="3"
          strokeDasharray="10 5"
          initial={{ pathLength: 0, rotate: 0 }}
          animate={{ pathLength: 1, rotate: 360 }}
          transition={{ delay: 1.8, duration: 2, ease: 'easeInOut' }}
        />
      </svg>
    </section>
  )
}

export default Hero
