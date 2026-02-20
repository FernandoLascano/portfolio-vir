import { useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { projects } from '../data/projects'

const ProjectDetail = () => {
  const { slug } = useParams()
  const navigate = useNavigate()

  const project = projects.find(p => p.slug === slug)

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-6xl text-ink mb-4">404</h1>
          <p className="text-ink/60 mb-8">Proyecto no encontrado</p>
          <Link to="/" className="btn-brutal">Volver al inicio</Link>
        </div>
      </div>
    )
  }


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Image */}
      <HeroSection project={project} />

      {/* Project Info */}
      <section className="py-20 lg:py-32 bg-paper">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-12 gap-8 lg:gap-16">
            {/* Main content */}
            <div className="col-span-12 lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-display text-4xl lg:text-5xl text-ink mb-8 italic">
                  El Desafío
                </h2>
                <p className="font-body text-lg text-ink/70 leading-relaxed mb-8">
                  {project.challenge}
                </p>

                <h2 className="font-display text-4xl lg:text-5xl text-ink mb-8 italic mt-16">
                  La Solución
                </h2>
                <p className="font-body text-lg text-ink/70 leading-relaxed">
                  {project.solution}
                </p>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="col-span-12 lg:col-span-4 lg:col-start-9">
              <motion.div
                className="lg:sticky lg:top-32 space-y-8"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                {/* Services */}
                <div className="p-6 border-3 border-ink bg-cream">
                  <h4 className="font-heading font-semibold text-sm uppercase tracking-widest text-ink mb-4">
                    Servicios
                  </h4>
                  <ul className="space-y-2">
                    {project.services.map((service, i) => (
                      <li key={i} className="flex items-center gap-3 font-body text-ink/70">
                        <span className="w-2 h-2 bg-coral rounded-full" />
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Year & Category */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border-3 border-ink bg-gold">
                    <span className="font-mono text-xs uppercase tracking-wider text-ink/60">Año</span>
                    <p className="font-heading text-2xl font-bold text-ink mt-1">{project.year}</p>
                  </div>
                  <div className="p-4 border-3 border-ink bg-paper">
                    <span className="font-mono text-xs uppercase tracking-wider text-ink/60">Categoría</span>
                    <p className="font-heading text-lg font-semibold text-ink mt-1 capitalize">{project.category}</p>
                  </div>
                </div>

                {/* Live URL */}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-4 border-3 border-ink bg-acid hover:bg-ink hover:text-paper transition-colors font-heading text-sm uppercase tracking-wider text-center text-paper"
                  >
                    Tocar aquí para conocer a {project.title} ↗
                  </a>
                )}

                {/* Share */}
                <div className="flex gap-3">
                  <button className="flex-1 py-3 border-3 border-ink bg-paper hover:bg-acid transition-colors font-heading text-sm uppercase tracking-wider">
                    Compartir
                  </button>
                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="w-12 border-3 border-ink bg-paper hover:bg-acid transition-colors flex items-center justify-center"
                  >
                    ↑
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>



    </motion.div>
  )
}

const HeroSection = ({ project }) => {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const isLogoHero = project.heroStyle === 'logo'

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-end overflow-hidden"
      style={isLogoHero ? { backgroundColor: '#EBE4DA' } : undefined}
    >
      {/* Background Image */}
      <motion.div
        className="absolute inset-0"
        style={{ y }}
      >
        {!isLogoHero && (
          <>
            <img
              src={project.images[0]}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
          </>
        )}
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 container mx-auto px-6 lg:px-12 pb-20 lg:pb-32 pt-40"
        style={{ opacity }}
      >
        <div className="max-w-4xl">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/"
              className={`inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wider transition-colors mb-8 ${isLogoHero ? 'text-ink/40 hover:text-ink' : 'text-paper/60 hover:text-acid'}`}
            >
              <span>←</span>
              <span>Volver a proyectos</span>
            </Link>
          </motion.div>

          {/* Category badge */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span
              className="inline-block px-4 py-2 font-heading text-sm uppercase tracking-wider border-2"
              style={{
                backgroundColor: project.accentColor,
                borderColor: project.accentColor,
                color: project.color,
              }}
            >
              {project.category}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className={`font-display text-5xl md:text-7xl lg:text-8xl leading-[0.9] mb-6 ${isLogoHero ? 'text-ink' : 'text-paper'}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, type: 'spring', damping: 20 }}
          >
            {project.title}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className={`font-body text-xl lg:text-2xl max-w-2xl ${isLogoHero ? 'text-ink/60' : 'text-paper/70'}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {project.tagline}
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            className="mt-12 flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className={`w-12 h-px ${isLogoHero ? 'bg-ink/20' : 'bg-paper/30'}`} />
            <span className={`font-mono text-xs uppercase tracking-wider ${isLogoHero ? 'text-ink/30' : 'text-paper/40'}`}>
              Scroll para descubrir
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* Year badge */}
      <motion.div
        className="absolute bottom-20 right-6 lg:right-12"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, type: 'spring' }}
      >
        <div className={`w-24 h-24 lg:w-32 lg:h-32 rounded-full border-3 flex items-center justify-center ${isLogoHero ? 'border-ink/20' : 'border-paper'}`}>
          <span className={`font-display text-3xl lg:text-4xl ${isLogoHero ? 'text-ink/40' : 'text-paper'}`}>{project.year}</span>
        </div>
      </motion.div>
    </section>
  )
}

export default ProjectDetail
