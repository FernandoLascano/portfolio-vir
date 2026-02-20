import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-paper text-ink overflow-hidden">
      {/* Marquee */}
      <div className="py-8 border-b border-ink/10 overflow-hidden">
        <div className="marquee-container">
          <motion.div
            className="marquee-content font-display text-6xl md:text-8xl italic text-ink/10"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            Diseño Gráfico — Branding — Identidad Visual — Redes — Diseño Gráfico — Branding — Identidad Visual — Redes —&nbsp;
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block">
              <span className="font-display text-4xl lg:text-5xl italic">
                Virginia
                <span className="text-acid">.</span>
              </span>
            </Link>
            <p className="mt-6 text-ink/50 font-body max-w-xs">
              Estudiante de diseño gráfico especializada en crear identidades visuales
              memorables y experiencias de marca significativas.
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="font-heading font-semibold text-sm uppercase tracking-widest text-acid mb-6">
              Navegación
            </h4>
            <nav className="flex flex-col gap-3">
              <Link to="/" className="text-ink/50 hover:text-ink transition-colors font-body">
                Proyectos
              </Link>
              <Link to="/sobre-mi" className="text-ink/50 hover:text-ink transition-colors font-body">
                Sobre Mí
              </Link>
              <Link to="/contacto" className="text-ink/50 hover:text-ink transition-colors font-body">
                Contacto
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="font-heading font-semibold text-sm uppercase tracking-widest text-acid mb-6">
              Contacto
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:lebrinovirginia@gmail.com"
                className="text-ink/50 hover:text-ink transition-colors font-body"
              >
                lebrinovirginia@gmail.com
              </a>
              <a
                href="tel:3535084764"
                className="text-ink/50 hover:text-ink transition-colors font-body"
              >
                3535084764
              </a>
              <p className="text-ink/50 font-body">
                Córdoba, Argentina
              </p>
            </div>

            <Link
              to="/contacto"
              className="inline-block mt-8 px-6 py-3 bg-acid text-[#FAF7F2] font-heading font-semibold uppercase tracking-wider text-sm border-3 border-acid hover:bg-transparent hover:text-acid transition-colors"
            >
              Iniciar Proyecto
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-ink/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-ink/40 font-mono text-sm">
            © {currentYear} Virginia Lebrino. Todos los derechos reservados.
          </p>
          <p className="text-ink/40 font-mono text-sm">
            Diseñado con <span className="text-coral">♥</span> y mucho mate
          </p>
        </div>
      </div>

      {/* Decorative shape */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-acid/5 rounded-full blur-3xl pointer-events-none" />
    </footer>
  )
}

export default Footer
