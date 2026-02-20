import { useState } from 'react'
import { motion } from 'framer-motion'

const Contact = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <FormSection />
    </motion.div>
  )
}

const HeroSection = () => {
  return (
    <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-paper relative overflow-hidden">
      {/* Decorative */}
      <motion.div
        className="absolute top-20 right-10 w-48 h-48 border-4 border-acid"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-10 left-20 w-32 h-32 bg-coral/20 blob"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl">
          <motion.span
            className="font-mono text-coral text-sm uppercase tracking-widest mb-4 block"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            Contacto
          </motion.span>

          <motion.h1
            className="font-display text-5xl md:text-6xl lg:text-8xl text-ink leading-[0.9]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Hablemos de tu{' '}
            <span className="italic underline-hand">próximo proyecto</span>
          </motion.h1>

          <motion.p
            className="mt-8 font-body text-xl text-ink/60 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Ya sea que tengas una idea clara o solo una corazonada, me encantaría
            escucharte. Cada gran proyecto comienza con una conversación.
          </motion.p>
        </div>
      </div>
    </section>
  )
}

const FormSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const projectTypes = [
    { value: 'branding', label: 'Branding / Identidad Visual' },
    { value: 'digital', label: 'Diseño Digital / Web' },
    { value: 'redes', label: 'Redes' },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when field is modified
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Tu nombre es requerido'
    if (!formData.email.trim()) {
      newErrors.email = 'Tu email es requerido'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Por favor ingresa un email válido'
    }
    if (!formData.message.trim()) newErrors.message = 'Cuéntame sobre tu proyecto'
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <section className="py-24 lg:py-32 bg-paper">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <motion.div
              className="w-24 h-24 bg-gold border-3 border-ink rounded-full flex items-center justify-center mx-auto mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
            >
              <svg className="w-12 h-12 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>

            <h2 className="font-display text-4xl lg:text-5xl text-ink mb-6">
              ¡Mensaje enviado!
            </h2>
            <p className="font-body text-lg text-ink/60 mb-8">
              Gracias por contactarme. Revisaré tu mensaje y te responderé dentro de
              las próximas 24-48 horas hábiles.
            </p>

            <button
              onClick={() => {
                setIsSubmitted(false)
                setFormData({
                  name: '',
                  email: '',
                  company: '',
                  projectType: '',
                  message: '',
                })
              }}
              className="btn-brutal"
            >
              Enviar otro mensaje
            </button>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 lg:py-32 bg-paper">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-12 gap-8 lg:gap-16">
          {/* Form */}
          <div className="col-span-12 lg:col-span-7">
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {/* Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-heading font-semibold text-sm uppercase tracking-wider text-ink mb-3">
                    Tu nombre *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="María González"
                    className={`w-full px-5 py-4 bg-cream border-3 ${
                      errors.name ? 'border-coral' : 'border-ink'
                    } font-body text-ink placeholder:text-ink/40 focus:outline-none focus:bg-paper transition-colors`}
                  />
                  {errors.name && (
                    <p className="mt-2 font-mono text-xs text-coral">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block font-heading font-semibold text-sm uppercase tracking-wider text-ink mb-3">
                    Tu email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="maria@ejemplo.com"
                    className={`w-full px-5 py-4 bg-cream border-3 ${
                      errors.email ? 'border-coral' : 'border-ink'
                    } font-body text-ink placeholder:text-ink/40 focus:outline-none focus:bg-paper transition-colors`}
                  />
                  {errors.email && (
                    <p className="mt-2 font-mono text-xs text-coral">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Company */}
              <div>
                <label className="block font-heading font-semibold text-sm uppercase tracking-wider text-ink mb-3">
                  Empresa / Organización
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Nombre de tu empresa (opcional)"
                  className="w-full px-5 py-4 bg-cream border-3 border-ink font-body text-ink placeholder:text-ink/40 focus:outline-none focus:bg-paper transition-colors"
                />
              </div>

              {/* Project Type */}
              <div>
                <label className="block font-heading font-semibold text-sm uppercase tracking-wider text-ink mb-3">
                  Tipo de proyecto
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {projectTypes.map((type) => (
                    <label
                      key={type.value}
                      className={`flex items-center justify-center px-4 py-3 border-3 cursor-pointer transition-all ${
                        formData.projectType === type.value
                          ? 'bg-gold border-ink'
                          : 'bg-cream border-ink/30 hover:border-ink'
                      }`}
                    >
                      <input
                        type="radio"
                        name="projectType"
                        value={type.value}
                        checked={formData.projectType === type.value}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <span className="font-body text-sm text-ink text-center">{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block font-heading font-semibold text-sm uppercase tracking-wider text-ink mb-3">
                  Cuéntame sobre tu proyecto *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Describe tu proyecto, objetivos, timeline y cualquier detalle relevante..."
                  className={`w-full px-5 py-4 bg-cream border-3 ${
                    errors.message ? 'border-coral' : 'border-ink'
                  } font-body text-ink placeholder:text-ink/40 focus:outline-none focus:bg-paper transition-colors resize-none`}
                />
                {errors.message && (
                  <p className="mt-2 font-mono text-xs text-coral">{errors.message}</p>
                )}
              </div>

              {/* Submit */}
              <div className="flex items-center gap-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn-brutal inline-flex items-center gap-3 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-ink border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar mensaje
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>

                <p className="font-mono text-xs text-ink/40">
                  * Campos requeridos
                </p>
              </div>
            </motion.form>
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
              {/* Direct contact */}
              <div className="p-6 border-3 border-ink bg-cream">
                <h4 className="font-heading font-semibold text-sm uppercase tracking-widest text-ink mb-6">
                  Contacto directo
                </h4>

                <div className="space-y-4">
                  <a
                    href="mailto:lebrinovirginia@gmail.com"
                    className="flex items-center gap-3 font-body text-ink hover:text-acid transition-colors"
                  >
                    <span className="w-10 h-10 bg-gold border-2 border-ink flex items-center justify-center font-bold">
                      @
                    </span>
                    lebrinovirginia@gmail.com
                  </a>

                  <a
                    href="tel:3535084764"
                    className="flex items-center gap-3 font-body text-ink hover:text-acid transition-colors"
                  >
                    <span className="w-10 h-10 bg-gold border-2 border-ink flex items-center justify-center font-bold">
                      T
                    </span>
                    3535084764
                  </a>
                </div>
              </div>

              {/* Social */}
              <div className="p-6 border-3 border-ink bg-paper">
                <h4 className="font-heading font-semibold text-sm uppercase tracking-widest text-ink mb-6">
                  Sígueme
                </h4>

                <div className="flex gap-3">
                  {[
                    { name: 'IG', url: 'https://instagram.com' },
                    { name: 'BE', url: 'https://behance.net' },
                    { name: 'LI', url: 'https://linkedin.com' },
                  ].map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 border-3 border-ink flex items-center justify-center font-heading font-bold text-sm hover:bg-acid transition-colors"
                    >
                      {social.name}
                    </a>
                  ))}
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
