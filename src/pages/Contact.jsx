import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, Calendar, Zap, ArrowRight, CheckCircle, MapPin } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
})

const services = [
  'AI Website Chatbot',
  'WhatsApp AI Chatbot',
  'CRM Automation',
  'Lead Generation System',
  'Full Growth Package',
  "Not sure yet — let's talk",
]

const budgets = [
  '€1,500 – €4,000',
  '€4,000 – €9,000',
  '€9,000+',
  'Monthly retainer',
]

const contactInfo = [
  {
    icon: Mail,
    label: 'Email Us',
    value: 'upgptsystems@gmail.com',
    sub: 'We reply within 24 hours',
    href: 'mailto:upgptsystems@gmail.com',
  },
  {
    icon: Calendar,
    label: 'Book a Call',
    value: 'Free 30-min Strategy Call',
    sub: 'Pick a slot that works for you',
    href: '#booking',
  },
  {
    icon: Phone,
    label: 'WhatsApp',
    value: '+355 69 671 5055',
    sub: 'Chat with us directly',
    href: 'https://wa.me/355696715055',
  },
]

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('https://formspree.io/f/xdayrynr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className="relative pt-36 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-violet-600/10 rounded-full blur-[130px]" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <motion.div {...fadeUp()} className="inline-block section-label mb-5">
            <Zap className="w-3 h-3" />
            Get in Touch
          </motion.div>
          <motion.h1 {...fadeUp(0.1)} className="text-5xl lg:text-6xl font-black text-white mb-5 leading-tight">
            Let's Build Something{' '}
            <span className="text-gradient">That Works for You</span>
          </motion.h1>
          <motion.p {...fadeUp(0.2)} className="text-xl text-white/50">
            Tell us about your business — we'll come back with a clear plan and honest advice.
            No obligation.
          </motion.p>
        </div>
      </section>

      <section className="pb-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-10">
            <motion.div {...fadeUp()} className="lg:col-span-3">
              {submitted ? (
                <div className="glass rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 flex items-center justify-center mb-6">
                    <CheckCircle className="w-8 h-8 text-[#00E5FF]" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-3">Message Sent!</h3>
                  <p className="text-white/55 max-w-sm">
                    Thanks for reaching out. We'll review your project and get back to you within
                    24 hours with a clear next step.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="glass rounded-2xl p-8 space-y-5"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">
                        Full Name *
                      </label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="John Smith"
                        className="w-full bg-black border border-[#00E5FF]/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#00E5FF]/60 focus:ring-1 focus:ring-[#00E5FF]/20 transition-all duration-150"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">
                        Email Address *
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="john@company.com"
                        className="w-full bg-black border border-[#00E5FF]/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#00E5FF]/60 focus:ring-1 focus:ring-[#00E5FF]/20 transition-all duration-150"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">
                      Company Name
                    </label>
                    <input
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Acme Inc."
                      className="w-full bg-black border border-[#00E5FF]/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#00E5FF]/60 focus:ring-1 focus:ring-[#00E5FF]/20 transition-all duration-150"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">
                        Service Interested In
                      </label>
                      <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        className="w-full bg-black border border-[#00E5FF]/15 rounded-xl px-4 py-3 text-sm text-white/70 focus:outline-none focus:border-[#00E5FF]/60 focus:ring-1 focus:ring-[#00E5FF]/20 transition-all duration-150 appearance-none cursor-pointer"
                      >
                        <option value="" disabled>Select a service…</option>
                        {services.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">
                        Budget Range
                      </label>
                      <select
                        name="budget"
                        value={form.budget}
                        onChange={handleChange}
                        className="w-full bg-black border border-[#00E5FF]/15 rounded-xl px-4 py-3 text-sm text-white/70 focus:outline-none focus:border-[#00E5FF]/60 focus:ring-1 focus:ring-[#00E5FF]/20 transition-all duration-150 appearance-none cursor-pointer"
                      >
                        <option value="" disabled>Select a range…</option>
                        {budgets.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">
                      Tell Us About Your Project *
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="What does your business do? What problem are you trying to solve? What's your current bottleneck?"
                      className="w-full bg-black border border-[#00E5FF]/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#00E5FF]/60 focus:ring-1 focus:ring-[#00E5FF]/20 transition-all duration-150 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary glow-violet w-full justify-center py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <p className="text-xs text-white/25 text-center">
                    We respond within 24 hours. No spam, ever.
                  </p>
                </form>
              )}
            </motion.div>

            <motion.div {...fadeUp(0.15)} className="lg:col-span-2 space-y-5">
              {contactInfo.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className="glass rounded-2xl p-6 flex items-start gap-4 hover:border-[#00E5FF]/30 transition-all duration-200 group block"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#00E5FF]/15 transition-colors">
                    <c.icon className="w-5 h-5 text-[#00E5FF]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white/35 uppercase tracking-widest mb-0.5">
                      {c.label}
                    </p>
                    <p className="text-white font-semibold text-sm">{c.value}</p>
                    <p className="text-white/40 text-xs mt-0.5">{c.sub}</p>
                  </div>
                </a>
              ))}

              <div
                id="booking"
                className="glass rounded-2xl p-7 border border-[#00E5FF]/20"
                style={{ boxShadow: '0 0 40px rgba(0,229,255,0.08)' }}
              >
                <p className="text-sm font-semibold text-white mb-1">What happens next?</p>
                <p className="text-white/45 text-sm mb-5">
                  After you send your message, here's exactly what to expect:
                </p>
                <ol className="space-y-4">
                  {[
                    { n: '01', text: 'We review your project and requirements (within 24h)' },
                    { n: '02', text: "You receive a personalized response with our recommendation" },
                    { n: '03', text: 'We schedule a 30-min call to align on scope and timeline' },
                    { n: '04', text: 'You receive a detailed proposal — no obligation to proceed' },
                  ].map((step) => (
                    <li key={step.n} className="flex items-start gap-3">
                      <span className="text-xl font-black leading-none w-6 flex-shrink-0" style={{ color: '#00E5FF', opacity: 0.5 }}>
                        {step.n}
                      </span>
                      <span className="text-sm text-white/55 leading-relaxed">{step.text}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="glass rounded-2xl p-6 text-center">
                <p className="text-sm text-white/45 mb-3">Prefer to skip the form?</p>
                <a
                  href="https://calendly.com/upgptsystems"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary glow-violet w-full justify-center text-sm"
                >
                  <Calendar className="w-4 h-4" />
                  Book via Calendly
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
