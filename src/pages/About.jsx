import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <StorySection />
      <ProcessSection />
    </motion.div>
  )
}

const HeroSection = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 150])

  return (
    <section ref={containerRef} className="min-h-screen pt-32 pb-20 lg:pt-40 lg:pb-32 bg-paper relative overflow-hidden">
      {/* Decorative elements */}
      <motion.div
        className="absolute top-40 right-20 w-64 h-64 bg-acid/20 blob"
        style={{ y }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Photo */}
          <motion.div
            className="col-span-12 lg:col-span-5 lg:col-start-2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              {/* Main photo */}
              <div className="relative border-3 border-ink overflow-hidden">
                <div className="aspect-[3/4]">
                  <img
                    src="/virginia-foto.jpeg"
                    alt="Virginia Lebrino"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                {/* Overlay pattern */}
                <div className="absolute inset-0 mix-blend-multiply opacity-20 pointer-events-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23B0041A' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-acid -z-10" />
              <div className="absolute -top-6 -left-6 w-24 h-24 border-3 border-coral -z-10" />

            </div>
          </motion.div>

          {/* Content */}
          <div className="col-span-12 lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="font-mono text-coral text-sm uppercase tracking-widest mb-4 block">
                Sobre Mí
              </span>

              <h1 className="font-display text-5xl lg:text-6xl xl:text-7xl text-ink leading-[0.9] mb-8">
                Hola, soy{' '}
                <span className="italic underline-hand">Virginia</span>
              </h1>

              <div className="space-y-6 font-body text-lg text-ink/70 leading-relaxed">
                <p>
                  Soy estudiante de diseño gráfico argentina dedicada a la identidad visual e identidad
                  de marca. Mi recorrido profesional comenzó en el Derecho, una formación que
                  hoy atraviesa mi manera de diseñar: <span className="text-ink font-medium">análisis, claridad conceptual y
                  pensamiento estratégico</span> son la base de cada proyecto que encaro.
                </p>

                <p>
                  Me dedico a crear sistemas visuales que comuniquen con intención y coherencia,
                  ayudando a las marcas a definir quiénes son, cómo se expresan y cómo quieren
                  ser percibidas. Creo en el diseño como una herramienta para ordenar ideas,
                  construir significado y generar <span className="text-ink font-medium">conexiones genuinas y duraderas</span>.
                </p>

                <p>
                  Trabajo desde el concepto hacia la forma, combinando sensibilidad editorial,
                  criterio funcional y una mirada atenta al contexto. Busco soluciones visuales
                  <span className="text-ink font-medium"> honestas, memorables y atemporales</span>,
                  pensadas para trascender modas y sostenerse en el tiempo.
                </p>
              </div>

              {/* Quick facts */}
              <div className="mt-12 grid grid-cols-2 gap-4">
                <div className="p-4 border-3 border-ink bg-cream">
                  <span className="font-mono text-xs uppercase tracking-wider text-ink/50">Ubicación</span>
                  <p className="font-heading text-lg font-semibold text-ink mt-1">Córdoba, AR</p>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-10 flex flex-wrap gap-4">
                <Link to="/contacto" className="btn-brutal">
                  Trabajemos juntos
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

const StorySection = () => {
  const timeline = [
    {
      year: '2025',
      title: 'Inicio del viaje',
      description: 'Comencé a estudiar Diseño Gráfico en el Colegio Universitario IES, Córdoba.',
    },
    {
      year: '2026',
      title: 'Independencia',
      description: 'Me lancé como independiente. Foco en branding, identidad visual y diseño digital.',
    },
  ]

  return (
    <section className="py-24 lg:py-32 bg-merlot relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="font-mono text-paper/70 text-sm uppercase tracking-widest mb-4 block">
            Trayectoria
          </span>
          <h2 className="font-display text-5xl lg:text-6xl text-paper">
            Mi <span className="italic">historia</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-0.5 bg-paper/20 -translate-x-1/2" />

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                className={`relative grid grid-cols-12 gap-4 lg:gap-8 ${
                  index % 2 === 0 ? '' : 'lg:direction-rtl'
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Year dot */}
                <div className="absolute left-8 lg:left-1/2 top-4 w-4 h-4 bg-paper border-3 border-paper rounded-full -translate-x-1/2 z-10" />

                {/* Content */}
                <div className={`col-span-12 lg:col-span-5 pl-20 lg:pl-0 ${
                  index % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:col-start-8 lg:pl-16'
                }`}>
                  <span className="font-display text-4xl text-paper font-bold">{item.year}</span>
                  <h3 className="font-heading text-xl font-semibold text-paper mt-2">{item.title}</h3>
                  <p className="font-body text-paper/60 mt-2">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


const ProcessSection = () => {
  const steps = [
    {
      number: '01',
      title: 'Descubrimiento',
      description: 'Conversamos sobre tu proyecto, objetivos y visión. Investigo tu industria, competencia y audiencia.',
    },
    {
      number: '02',
      title: 'Estrategia',
      description: 'Desarrollo el concepto central y la dirección visual. Presentamos moodboards y primeras ideas.',
    },
    {
      number: '03',
      title: 'Diseño',
      description: 'Creación de las piezas principales. Iteraciones basadas en tu feedback hasta alcanzar la solución perfecta.',
    },
    {
      number: '04',
      title: 'Entrega',
      description: 'Preparación de archivos finales, guidelines y documentación. Soporte post-proyecto incluido.',
    },
  ]

  return (
    <section className="py-24 lg:py-32 bg-cream">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          className="mb-16 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="font-mono text-coral text-sm uppercase tracking-widest mb-4 block">
            Proceso
          </span>
          <h2 className="font-display text-5xl lg:text-6xl text-ink">
            Cómo <span className="italic">trabajo</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="relative p-8 border-3 border-ink -ml-[3px] first:ml-0 bg-paper hover:bg-acid hover:text-paper transition-colors group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <span className="font-display text-6xl text-ink/10 group-hover:text-paper/20 transition-colors">
                {step.number}
              </span>
              <h3 className="font-heading text-xl font-semibold text-ink mt-4 mb-3">
                {step.title}
              </h3>
              <p className="font-body text-ink/60 group-hover:text-ink/80 transition-colors">
                {step.description}
              </p>

              {/* Arrow connector */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-6 top-1/2 -translate-y-1/2 text-ink text-2xl z-10">
                  →
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
