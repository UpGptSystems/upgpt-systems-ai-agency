import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import {
  ArrowRight, Zap, Bot, MessageSquare, Workflow, TrendingUp,
  CheckCircle, Star, Clock, Users, BarChart3, ChevronRight,
  Globe, Phone, Database, Target,
} from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
})

function StatCounter({ end, suffix = '', prefix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf
    const start = performance.now()
    const duration = 1800
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(ease * end))
      if (progress < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, end])

  return <span ref={ref}>{prefix}{count}{suffix}</span>
}

function HeroSection() {
  const messages = [
    { type: 'user', text: 'Hey, do you have pricing info?', delay: 0.8 },
    { type: 'bot', text: "Of course! Our Growth plan is most popular — starts at €3,997. Want a quick walkthrough?", delay: 1.8 },
    { type: 'user', text: 'Yes please, can I book a demo?', delay: 3.0 },
    { type: 'bot', text: '✅ Demo booked for tomorrow at 3PM. Check your inbox for the confirmation!', delay: 4.0 },
  ]

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-dots" />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-[130px] -translate-x-1/2 -translate-y-1/2 animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[110px] translate-x-1/2 animate-float-slow" />

      <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-24 grid lg:grid-cols-2 gap-16 items-center w-full">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="section-label mb-6"
          >
            <Zap className="w-3 h-3" />
            AI Automation for Modern Businesses
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl lg:text-6xl xl:text-[68px] font-black leading-[1.04] tracking-tight text-white mb-6"
          >
            AI Systems That{' '}
            <span className="text-gradient">Convert,</span>
            <br />
            Qualify &{' '}
            <span className="text-gradient">Support</span>
            <br />
            <span className="text-white/35">Around the Clock.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-[17px] text-white/55 leading-relaxed mb-9 max-w-[480px]"
          >
            We build custom AI chatbot systems for your website, WhatsApp, and CRM — so your
            business captures leads, handles support, and closes sales while you sleep.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-wrap gap-3 mb-10"
          >
            <Link to="/contact" className="btn-primary glow-violet">
              Book a Free Demo
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/services" className="btn-ghost">
              Explore Services
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center gap-5"
          >
            <div className="flex -space-x-2">
              {['S', 'D', 'M', 'A'].map((l, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-[#060610] flex items-center justify-center text-[11px] font-bold text-white"
                  style={{
                    background: `linear-gradient(135deg, hsl(${260 + i * 20}, 70%, 55%), hsl(${190 + i * 15}, 80%, 55%))`,
                  }}
                >
                  {l}
                </div>
              ))}
            </div>
            <p className="text-sm text-white/45">
              <span className="text-white font-semibold">50+</span> businesses automated worldwide
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 48, scale: 0.97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:flex justify-center relative"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-violet-600/20 rounded-3xl blur-3xl scale-110" />

            <div className="relative gradient-border rounded-2xl overflow-hidden w-[320px] bg-[#0c0c1e]">
              <div className="px-4 py-3 border-b border-white/5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">UPGPT Assistant</p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <p className="text-[11px] text-white/40">Active 24/7</p>
                  </div>
                </div>
                <div className="ml-auto flex gap-1.5">
                  {['bg-red-500', 'bg-yellow-500', 'bg-emerald-500'].map((c) => (
                    <div key={c} className={`w-2 h-2 rounded-full ${c} opacity-80`} />
                  ))}
                </div>
              </div>

              <div className="p-4 space-y-3 min-h-[260px]">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: msg.delay, duration: 0.4, ease: 'easeOut' }}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[88%] px-3 py-2 text-xs leading-relaxed rounded-xl ${
                        msg.type === 'user'
                          ? 'bg-violet-600 text-white rounded-br-sm'
                          : 'bg-white/6 text-white/75 rounded-bl-sm border border-white/5'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ delay: 5.2, duration: 1.4, repeat: Infinity }}
                  className="flex justify-start"
                >
                  <div className="bg-white/6 border border-white/5 px-3 py-2.5 rounded-xl rounded-bl-sm flex gap-1 items-center">
                    {[0, 0.18, 0.36].map((d, i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.55, repeat: Infinity, delay: d }}
                        className="w-1.5 h-1.5 rounded-full bg-violet-400"
                      />
                    ))}
                  </div>
                </motion.div>
              </div>

              <div className="px-4 pb-3">
                <div className="h-9 rounded-lg bg-white/5 border border-white/8 flex items-center px-3 gap-2">
                  <p className="text-xs text-white/25 flex-1">Type a message…</p>
                  <div className="w-5 h-5 rounded bg-violet-600/80 flex items-center justify-center">
                    <ArrowRight className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-7 -right-12 glass rounded-xl px-3.5 py-2.5 border border-white/8 shadow-xl"
            >
              <p className="text-[10px] text-white/40 mb-0.5">Response Time</p>
              <p className="text-base font-bold text-emerald-400">&lt; 1.5s</p>
            </motion.div>

            <motion.div
              animate={{ y: [0, 9, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
              className="absolute -bottom-7 -left-12 glass rounded-xl px-3.5 py-2.5 border border-white/8 shadow-xl"
            >
              <p className="text-[10px] text-white/40 mb-0.5">Leads Captured</p>
              <p className="text-base font-bold text-cyan-400">+127%</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function StatsSection() {
  const stats = [
    { value: 50, suffix: '+', prefix: '', label: 'Chatbots Deployed' },
    { value: 98, suffix: '%', prefix: '', label: 'Client Satisfaction' },
    { value: 24, suffix: '/7', prefix: '', label: 'Automated Support' },
    { value: 3, suffix: 'x', prefix: '', label: 'Average Client ROI' },
  ]

  return (
    <section className="py-16 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              {...fadeUp(i * 0.08)}
              className="text-center"
            >
              <p className="text-4xl font-black text-white mb-1">
                <StatCounter end={s.value} suffix={s.suffix} prefix={s.prefix} />
              </p>
              <p className="text-sm text-white/40">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ServicesSection() {
  const services = [
    {
      icon: Globe,
      title: 'AI Website Chatbots',
      description:
        'Intelligent virtual assistants embedded on your website. Answer FAQs, capture leads, book demos, and guide visitors — around the clock, no manual effort.',
      color: 'from-violet-500 to-violet-700',
      glow: 'rgba(124,58,237,0.25)',
    },
    {
      icon: Phone,
      title: 'WhatsApp AI Chatbots',
      description:
        "Meet customers on the world's most-used messaging app. Automate conversations, send follow-ups, qualify leads, and close sales — all inside WhatsApp.",
      color: 'from-emerald-500 to-teal-600',
      glow: 'rgba(16,185,129,0.2)',
    },
    {
      icon: Database,
      title: 'CRM Automation',
      description:
        'Connect your AI to your CRM and automate the entire lead lifecycle — from first touch to closed deal. Zero manual data entry, full pipeline visibility.',
      color: 'from-cyan-500 to-blue-600',
      glow: 'rgba(34,211,238,0.2)',
    },
    {
      icon: Target,
      title: 'Lead Generation Systems',
      description:
        'AI-powered pipelines that identify, engage, and qualify prospects automatically. Fill your sales pipeline with ready-to-close leads on autopilot.',
      color: 'from-orange-500 to-rose-600',
      glow: 'rgba(249,115,22,0.2)',
    },
  ]

  return (
    <section className="py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div {...fadeUp()} className="inline-block section-label mb-4">
            What We Build
          </motion.div>
          <motion.h2 {...fadeUp(0.1)} className="text-4xl lg:text-5xl font-black text-white mb-4">
            Everything Your Business Needs{' '}
            <span className="text-gradient">to Run on Autopilot</span>
          </motion.h2>
          <motion.p {...fadeUp(0.2)} className="text-white/50 max-w-xl mx-auto text-lg">
            Four core systems — built, integrated, and optimised for your specific business.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              {...fadeUp(i * 0.1)}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="glass rounded-2xl p-7 group cursor-default"
              style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.06)` }}
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-5`}
                style={{ boxShadow: `0 4px 20px ${s.glow}` }}
              >
                <s.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-5">{s.description}</p>
              <Link
                to="/services"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors"
              >
                Learn more
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorksSection() {
  const steps = [
    {
      n: '01',
      title: 'Discovery Call',
      desc: 'We learn your business, goals, and current pain points. 30 minutes is all it takes.',
    },
    {
      n: '02',
      title: 'Custom Build',
      desc: "Our team designs and builds your AI system — tailored to your brand, tone, and workflows.",
    },
    {
      n: '03',
      title: 'Full Integration',
      desc: 'We connect everything: your website, WhatsApp, CRM, calendar, and any other tools.',
    },
    {
      n: '04',
      title: 'Go Live & Scale',
      desc: 'Your AI launches and starts working immediately. We monitor, optimise, and support you.',
    },
  ]

  return (
    <section className="py-28 bg-[#080814]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div {...fadeUp()} className="inline-block section-label mb-4">
            The Process
          </motion.div>
          <motion.h2 {...fadeUp(0.1)} className="text-4xl lg:text-5xl font-black text-white mb-4">
            Live in{' '}
            <span className="text-gradient">Under 2 Weeks</span>
          </motion.h2>
          <motion.p {...fadeUp(0.2)} className="text-white/50 max-w-lg mx-auto">
            A streamlined four-step process — from first call to a fully automated AI system.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              {...fadeUp(i * 0.12)}
              className="relative glass rounded-2xl p-6"
            >
              <div className="text-5xl font-black text-gradient-violet opacity-30 mb-4 leading-none">
                {s.n}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
              <p className="text-white/45 text-sm leading-relaxed">{s.desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-2.5 w-5 h-0.5 bg-gradient-to-r from-violet-500/40 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ResultsSection() {
  const results = [
    {
      value: '+47%',
      label: 'Average Lead Conversion Increase',
      sub: 'Across e-commerce and SaaS clients',
      color: 'text-violet-400',
    },
    {
      value: '85%',
      label: 'Customer Queries Handled Automatically',
      sub: 'No human agent required',
      color: 'text-cyan-400',
    },
    {
      value: '< 2s',
      label: 'AI Response Time',
      sub: 'vs 4-hour average for human agents',
      color: 'text-emerald-400',
    },
  ]

  return (
    <section className="py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div {...fadeUp()} className="inline-block section-label mb-4">
            Real Results
          </motion.div>
          <motion.h2 {...fadeUp(0.1)} className="text-4xl lg:text-5xl font-black text-white mb-4">
            Numbers That{' '}
            <span className="text-gradient">Speak for Themselves</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {results.map((r, i) => (
            <motion.div
              key={r.label}
              {...fadeUp(i * 0.12)}
              className="glass rounded-2xl p-8 text-center gradient-border"
            >
              <p className={`text-6xl font-black mb-3 ${r.color}`}>{r.value}</p>
              <p className="text-white font-semibold mb-2">{r.label}</p>
              <p className="text-white/40 text-sm">{r.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "We went from manually handling 200 daily inquiries to having 85% resolved automatically. Our team now focuses on closing deals — not answering the same questions on repeat.",
      name: 'Sarah M.',
      role: 'E-Commerce Director',
      company: 'StyleHive',
      rating: 5,
      initials: 'SM',
    },
    {
      quote:
        "The WhatsApp chatbot changed everything. Our lead response time dropped from 4 hours to under 2 seconds. We've booked 3x more qualified demos since day one.",
      name: 'Daniel K.',
      role: 'Head of Sales',
      company: 'PropTech Solutions',
      rating: 5,
      initials: 'DK',
    },
    {
      quote:
        "UPGPT built a chatbot that genuinely feels human. It qualifies leads, books calls, handles support — all while we sleep. ROI was hit within the first 30 days.",
      name: 'Marcus R.',
      role: 'Founder',
      company: 'SaaS.io',
      rating: 5,
      initials: 'MR',
    },
  ]

  return (
    <section className="py-28 bg-[#080814]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div {...fadeUp()} className="inline-block section-label mb-4">
            Client Stories
          </motion.div>
          <motion.h2 {...fadeUp(0.1)} className="text-4xl lg:text-5xl font-black text-white mb-4">
            What Our Clients{' '}
            <span className="text-gradient">Actually Say</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              {...fadeUp(i * 0.1)}
              className="glass rounded-2xl p-7 flex flex-col"
            >
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-white/65 text-sm leading-relaxed flex-1 mb-6 italic">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3 pt-5 border-t border-white/6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-white/40">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PricingSection() {
  const plans = [
    {
      name: 'Starter',
      price: '1,497',
      sub: 'One-time setup',
      description: 'Perfect for small businesses ready to automate their first touchpoint.',
      features: [
        '1 AI Chatbot (Website)',
        'Basic FAQ automation',
        'Lead capture & email alerts',
        'Mobile-responsive widget',
        '30-day support included',
        'Up to 500 conversations/mo',
      ],
      popular: false,
      cta: 'Get Started',
    },
    {
      name: 'Growth',
      price: '3,997',
      sub: 'One-time setup',
      description: 'The most popular choice for growing businesses that want full automation.',
      features: [
        '2 AI Chatbots (Web + WhatsApp)',
        'CRM integration',
        'Lead qualification flows',
        'Analytics & reporting dashboard',
        '90-day priority support',
        'Up to 2,000 conversations/mo',
        'Custom conversation design',
      ],
      popular: true,
      cta: 'Get Started',
    },
    {
      name: 'Premium',
      price: '8,997',
      sub: 'One-time setup',
      description: 'Enterprise-level AI infrastructure. Unlimited scale, dedicated support.',
      features: [
        'Unlimited AI chatbots',
        'Full CRM automation suite',
        'Custom AI training on your data',
        'Web, WhatsApp & SMS coverage',
        'Dedicated account manager',
        'Unlimited conversations',
        'Monthly optimisation reports',
        'Priority 24/7 support',
      ],
      popular: false,
      cta: 'Contact Us',
    },
  ]

  return (
    <section className="py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div {...fadeUp()} className="inline-block section-label mb-4">
            Pricing
          </motion.div>
          <motion.h2 {...fadeUp(0.1)} className="text-4xl lg:text-5xl font-black text-white mb-4">
            Transparent Pricing,{' '}
            <span className="text-gradient">Real Returns</span>
          </motion.h2>
          <motion.p {...fadeUp(0.2)} className="text-white/50 max-w-lg mx-auto">
            No hidden fees. No recurring lock-ins unless you want them. Just results.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 items-start">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              {...fadeUp(i * 0.1)}
              className={`rounded-2xl p-7 flex flex-col relative overflow-hidden ${
                p.popular
                  ? 'bg-gradient-to-b from-violet-900/40 to-violet-950/20 border border-violet-500/40 glow-card'
                  : 'glass'
              }`}
            >
              {p.popular && (
                <div className="absolute top-5 right-5">
                  <span className="px-3 py-1 rounded-full bg-violet-600 text-white text-[11px] font-bold uppercase tracking-wide">
                    Most Popular
                  </span>
                </div>
              )}
              <p className="text-sm font-semibold text-white/50 mb-1">{p.name}</p>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-4xl font-black text-white">€{p.price}</span>
              </div>
              <p className="text-xs text-white/35 mb-4">{p.sub}</p>
              <p className="text-sm text-white/50 leading-relaxed mb-7 pb-7 border-b border-white/8">
                {p.description}
              </p>
              <ul className="space-y-3 mb-8 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-white/65">
                    <CheckCircle className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className={`w-full text-center py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  p.popular
                    ? 'bg-gradient-to-r from-violet-600 to-violet-700 text-white hover:from-violet-500 hover:to-violet-600 glow-violet'
                    : 'glass border border-white/10 text-white/70 hover:text-white hover:border-white/20'
                }`}
              >
                {p.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.p {...fadeUp(0.3)} className="text-center text-white/30 text-sm mt-8">
          All plans include a free 30-minute strategy call.{' '}
          <Link to="/pricing" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">
            Compare full features →
          </Link>
        </motion.p>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="py-28">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          {...fadeUp()}
          className="relative rounded-3xl overflow-hidden p-14 text-center"
          style={{
            background:
              'linear-gradient(135deg, rgba(124,58,237,0.25) 0%, rgba(34,211,238,0.1) 100%)',
            border: '1px solid rgba(124,58,237,0.3)',
            boxShadow: '0 0 80px rgba(124,58,237,0.15)',
          }}
        >
          <div className="absolute inset-0 bg-dots opacity-30" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-violet-600/20 rounded-full blur-3xl" />
          <div className="relative">
            <div className="inline-block section-label mb-6">
              <Zap className="w-3 h-3" />
              Ready to Automate?
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-5">
              Let's Build Your AI System{' '}
              <span className="text-gradient">This Week</span>
            </h2>
            <p className="text-white/55 text-lg mb-8 max-w-lg mx-auto">
              Book a free 30-minute strategy call. We'll map out exactly how AI can transform your
              lead generation and customer support — no fluff, no hard sell.
            </p>
            <Link to="/contact" className="btn-primary glow-violet text-base px-9 py-4">
              Book Your Free Strategy Call
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <HowItWorksSection />
      <ResultsSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
    </>
  )
}
