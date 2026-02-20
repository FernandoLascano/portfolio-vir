import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Hero from '../components/Hero'
import ProjectsGallery from '../components/ProjectsGallery'

const Home = () => {
  const containerRef = useRef(null)

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <ProjectsGallery />

      {/* Manifesto Section */}
      <ManifestoSection />



    </motion.div>
  )
}

const ManifestoSection = () => {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const rotate = useTransform(scrollYProgress, [0, 1], [5, -5])

  return (
    <section ref={sectionRef} className="py-32 lg:py-48 bg-merlot relative overflow-hidden">
      {/* Decorative shapes */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 bg-paper/20 rounded-full"
        style={{ y, rotate }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-48 h-48 border-4 border-paper/30"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
      />

      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-5xl mx-auto text-center">
          <motion.span
            className="inline-block font-mono text-paper/70 text-sm uppercase tracking-widest mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Manifiesto
          </motion.span>

          <motion.h2
            className="font-display text-4xl md:text-6xl lg:text-7xl text-paper leading-tight"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Creo que el buen diseño es{' '}
            <span className="italic text-gold font-bold">honesto</span>, cuenta{' '}
            <span className="italic text-pink">historias</span> y desafía lo{' '}
            <span className="text-outline-thin text-paper">esperado</span>.
          </motion.h2>

          <motion.p
            className="mt-12 text-paper/70 font-body text-lg md:text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Cada proyecto es una oportunidad para crear algo significativo.
            No busco seguir tendencias, sino construir identidades que perduren
            y conecten con las personas a un nivel más profundo.
          </motion.p>
        </div>
      </div>
    </section>
  )
}

const ServicesSection = () => {
  const services = [
    {
      number: '01',
      title: 'Identidad Visual',
      description: 'Desarrollo de marcas completas: logo, sistema visual, guidelines y aplicaciones.',
      tags: ['Branding', 'Logo Design', 'Guidelines'],
    },
    {
      number: '02',
      title: 'Diseño Editorial',
      description: 'Revistas, libros, catálogos y publicaciones con layouts únicos y tipografía expresiva.',
      tags: ['Revistas', 'Libros', 'Catálogos'],
    },
    {
      number: '03',
      title: 'Diseño Digital',
      description: 'Interfaces web y móviles que combinan funcionalidad con personalidad visual.',
      tags: ['Web Design', 'UI/UX', 'Apps'],
    },
    {
      number: '04',
      title: 'Dirección de Arte',
      description: 'Conceptualización y dirección visual para campañas, sesiones y proyectos especiales.',
      tags: ['Campañas', 'Fotografía', 'Video'],
    },
  ]

  return (
    <section className="py-32 lg:py-48 bg-paper relative">
      {/* Section header */}
      <div className="container mx-auto px-6 lg:px-12 mb-20">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <motion.span
              className="inline-block font-mono text-coral text-sm uppercase tracking-widest mb-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              Servicios
            </motion.span>
            <motion.h2
              className="font-display text-5xl md:text-6xl lg:text-7xl text-ink"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Lo que{' '}
              <span className="italic">hago</span>
            </motion.h2>
          </div>

          <motion.p
            className="text-ink/60 font-body max-w-md text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Cada proyecto es único. Adapto mi enfoque y proceso según las necesidades
            específicas de cada cliente y desafío creativo.
          </motion.p>
        </div>
      </div>

      {/* Services list */}
      <div className="container mx-auto px-6 lg:px-12">
        <div className="space-y-0">
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              className="group border-t-3 border-ink py-12 lg:py-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="grid grid-cols-12 gap-4 lg:gap-8 items-start">
                {/* Number */}
                <div className="col-span-2 lg:col-span-1">
                  <span className="font-mono text-coral text-sm">{service.number}</span>
                </div>

                {/* Title */}
                <div className="col-span-10 lg:col-span-4">
                  <h3 className="font-heading text-2xl lg:text-3xl font-semibold text-ink group-hover:text-acid transition-colors">
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="col-span-12 lg:col-span-4 lg:col-start-6">
                  <p className="text-ink/60 font-body">{service.description}</p>
                </div>

                {/* Tags */}
                <div className="col-span-12 lg:col-span-3 flex flex-wrap gap-2 mt-4 lg:mt-0">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-cream text-ink font-mono text-xs uppercase tracking-wider border border-ink/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="container mx-auto px-6 lg:px-12 mt-20">
        <motion.div
          className="bg-ink p-12 lg:p-20 relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <h3 className="font-display text-3xl lg:text-5xl text-paper italic">
                ¿Tienes un proyecto en mente?
              </h3>
              <p className="mt-4 text-paper/60 font-body">
                Me encantaría escuchar sobre tu próximo desafío creativo.
              </p>
            </div>

            <a
              href="/contacto"
              className="inline-flex items-center gap-3 px-8 py-4 bg-acid text-paper font-heading font-semibold uppercase tracking-wider text-sm border-3 border-acid hover:bg-coral hover:border-coral transition-colors"
            >
              Hablemos
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Decorative */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-electric/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-coral/20 rounded-full blur-3xl" />
        </motion.div>
      </div>
    </section>
  )
}

export default Home
