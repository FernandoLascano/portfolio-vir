import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { projects, categories } from '../data/projects'

const ProjectsGallery = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [hoveredProject, setHoveredProject] = useState(null)
  const galleryRef = useRef(null)

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory)

  return (
    <section className="py-24 lg:py-32 bg-paper relative">
      {/* Section Header */}
      <div className="container mx-auto px-6 lg:px-12 mb-16">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <motion.span
              className="inline-block font-mono text-coral text-sm uppercase tracking-widest mb-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              Trabajos Seleccionados
            </motion.span>
            <motion.h2
              className="font-display text-5xl md:text-6xl lg:text-7xl text-ink"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Proyectos<span className="text-coral">.</span>
            </motion.h2>
          </div>

          {/* Category filters */}
          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-2 font-heading text-sm uppercase tracking-wider border-3 transition-all duration-200 ${
                  activeCategory === category.id
                    ? 'bg-ink text-paper border-ink'
                    : 'bg-transparent text-ink border-ink hover:bg-acid hover:border-acid'
                }`}
              >
                {category.label}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Irregular Grid */}
      <div ref={galleryRef} className="container mx-auto px-6 lg:px-12">
        <motion.div
          className="grid grid-cols-12 gap-4 lg:gap-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onHover={setHoveredProject}
                isHovered={hoveredProject === project.id}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* View All CTA */}
      <motion.div
        className="container mx-auto px-6 lg:px-12 mt-20 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Link
          to="/contacto"
          className="inline-flex items-center gap-3 font-heading text-lg uppercase tracking-wider text-ink group"
        >
          <span className="underline-hand">¿Quieres ver más proyectos?</span>
          <motion.span
            className="text-coral"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            →
          </motion.span>
        </Link>
      </motion.div>
    </section>
  )
}

const ProjectCard = ({ project, index, onHover, isHovered }) => {
  const cardRef = useRef(null)

  // Determine grid span based on project size
  const getGridClasses = () => {
    const sizeClasses = {
      large: 'col-span-12 lg:col-span-8',
      medium: 'col-span-12 md:col-span-6 lg:col-span-4',
      small: 'col-span-12 md:col-span-6 lg:col-span-4',
    }

    // Create asymmetric layout
    if (index % 5 === 0) return 'col-span-12 lg:col-span-8 lg:row-span-2'
    if (index % 5 === 1) return 'col-span-12 md:col-span-6 lg:col-span-4'
    if (index % 5 === 2) return 'col-span-12 md:col-span-6 lg:col-span-4'
    if (index % 5 === 3) return 'col-span-12 md:col-span-6 lg:col-span-5'
    return 'col-span-12 md:col-span-6 lg:col-span-7'
  }

  const getAspectRatio = () => {
    if (index % 5 === 0) return 'aspect-[4/3]'
    if (index % 5 === 1) return 'aspect-square'
    if (index % 5 === 2) return 'aspect-[3/4]'
    return 'aspect-[16/10]'
  }

  return (
    <motion.article
      ref={cardRef}
      className={`${getGridClasses()} group relative`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      layout
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={() => onHover(null)}
    >
      <Link
        to={`/proyecto/${project.slug}`}
        className="block relative overflow-hidden"
        data-cursor="view"
      >
        {/* Image container */}
        <div
          className={`relative ${getAspectRatio()} overflow-hidden border-3 border-ink bg-cream`}
        >
          {/* Image */}
          {project.heroStyle === 'logo' ? (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              style={{ backgroundColor: '#f5f0e9' }}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
            >
              <img
                src={project.images[0]}
                alt={project.title}
                className="w-[90%] h-[90%] object-contain"
              />
            </motion.div>
          ) : (
            <motion.img
              src={project.images[0]}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
            />
          )}

          {/* Overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-ink/60 flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="text-center p-6"
              initial={{ y: 20, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <span className="inline-block px-4 py-2 bg-gold text-ink font-heading text-sm uppercase tracking-wider mb-4">
                {project.category}
              </span>
              <p className="text-paper font-body text-sm max-w-xs">
                {project.tagline}
              </p>
            </motion.div>
          </motion.div>

          {/* Corner accent */}
          <div
            className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-b-[40px] border-l-transparent transition-colors duration-300"
            style={{ borderBottomColor: project.accentColor }}
          />
        </div>

        {/* Card info */}
        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-heading text-xl lg:text-2xl font-semibold text-ink group-hover:text-acid transition-colors">
              {project.title}
            </h3>
            <div className="mt-1 flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-wider text-ink/50">
                {project.year}
              </span>
              <span className="w-1 h-1 bg-coral rounded-full" />
              <span className="font-mono text-xs uppercase tracking-wider text-ink/50">
                {project.category}
              </span>
            </div>
          </div>

          {/* Arrow */}
          <motion.div
            className="mt-1 w-10 h-10 border-2 border-ink flex items-center justify-center group-hover:bg-acid group-hover:border-acid transition-colors"
            whileHover={{ scale: 1.1, rotate: -10 }}
          >
            <svg
              className="w-5 h-5 text-ink transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 17L17 7M17 7H7M17 7v10"
              />
            </svg>
          </motion.div>
        </div>
      </Link>

    </motion.article>
  )
}

export default ProjectsGallery
