import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Globe, Phone, Database, Target,
  CheckCircle, ArrowRight, Zap,
  MessageSquare, Users, BarChart3, Clock, Shield, TrendingUp,
} from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
})

const services = [
  {
    icon: Globe,
    title: 'AI Website Chatbots',
    tagline: 'Turn visitors into leads — automatically.',
    description:
      "Your website works 24/7. Your team doesn't. Our AI website chatbots fill that gap — engaging every visitor, answering every question, and capturing every lead the moment they arrive.",
    whoFor: 'E-commerce stores, SaaS products, service businesses, and any website that needs to convert more traffic without hiring more support staff.',
    benefits: [
      'Instant response to visitor questions — no wait time',
      'Automated lead capture with name, email, and intent',
      'Smart FAQ handling for your top 50+ questions',
      'Demo and appointment booking built-in',
      'Branded widget that matches your site perfectly',
      'Seamless handoff to human agents when needed',
    ],
    useCases: [
      'SaaS onboarding assistant that guides new sign-ups',
      'E-commerce support bot handling returns and shipping FAQs',
      'Booking bot for consultants and service providers',
      'Real-time product recommendation engine for stores',
    ],
    color: 'from-violet-500 to-violet-700',
    glow: 'rgba(124,58,237,0.3)',
    accent: 'violet',
  },
  {
    icon: Phone,
    title: 'WhatsApp AI Chatbots',
    tagline: '2 billion users. One automated pipeline.',
    description:
      "WhatsApp has a 98% open rate. Your emails don't. We build AI-powered WhatsApp bots that engage leads the moment they message you — qualifying, nurturing, and closing, all in one conversation.",
    whoFor: 'Real estate agents, coaches, course creators, local businesses, and any team that already gets inbound leads via WhatsApp or wants to.',
    benefits: [
      '98% message open rate — dwarfs email',
      'Instant automated replies, 24/7',
      'Lead qualification inside the chat',
      'Appointment scheduling and reminders',
      'Follow-up sequences that feel personal',
      'Multi-agent inbox management',
    ],
    useCases: [
      'Real estate bot qualifying buyers and renters instantly',
      'E-commerce bot sending order updates and upsells',
      "Coaching bot that handles enrolment and FAQs",
      'Service business bot booking appointments via chat',
    ],
    color: 'from-emerald-500 to-teal-600',
    glow: 'rgba(16,185,129,0.25)',
    accent: 'emerald',
  },
  {
    icon: Database,
    title: 'CRM Automation Systems',
    tagline: 'From first touch to closed deal — hands-free.',
    description:
      'Stop losing leads in spreadsheets and inboxes. We connect your AI to your CRM and build intelligent automation that moves every contact through your pipeline — exactly when and how it should.',
    whoFor: 'Sales teams, agencies, consultants, and businesses using HubSpot, Pipedrive, Go High Level, Zoho, or any other CRM platform.',
    benefits: [
      'Automatic lead creation and enrichment in your CRM',
      'Smart pipeline stage updates based on conversation',
      'Automated follow-up sequences for dead leads',
      'Real-time notifications for hot prospects',
      'Custom tagging and segmentation rules',
      'Full conversation history logged in CRM',
    ],
    useCases: [
      'Agency automating client intake from website to CRM',
      'Sales team getting AI-qualified leads scored automatically',
      'Consultant auto-nurturing cold leads with drip sequences',
      'E-commerce re-engaging abandoned cart leads via CRM',
    ],
    color: 'from-cyan-500 to-blue-600',
    glow: 'rgba(34,211,238,0.22)',
    accent: 'cyan',
  },
  {
    icon: Target,
    title: 'Lead Generation Systems',
    tagline: 'Build a machine that fills your pipeline daily.',
    description:
      "Stop relying on referrals and random traffic. We build end-to-end AI lead generation systems — from outbound outreach to inbound qualification — so your pipeline fills itself every single day.",
    whoFor: 'B2B companies, agencies, and any business that needs a consistent, predictable flow of qualified leads without scaling a human SDR team.',
    benefits: [
      'AI-powered outbound sequences (email + LinkedIn)',
      'Landing pages with embedded qualification chatbots',
      'Automated lead scoring and prioritisation',
      'Multi-step nurturing campaigns that run themselves',
      'A/B testing built into every campaign',
      'Weekly performance reports with actionable insights',
    ],
    useCases: [
      'Agency generating 30+ qualified leads per week on autopilot',
      'B2B SaaS running outbound to ICP with AI personalisation',
      'Consultant filling calendar with discovery calls automatically',
      'Local business capturing inbound leads from Google + social',
    ],
    color: 'from-orange-500 to-rose-600',
    glow: 'rgba(249,115,22,0.22)',
    accent: 'orange',
  },
]

function ServiceCard({ service, index }) {
  const isEven = index % 2 === 0
  return (
    <section className={`py-24 ${index % 2 === 1 ? 'bg-[#080814]' : ''}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`grid lg:grid-cols-2 gap-16 items-center ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}>
          <motion.div {...fadeUp()} className={!isEven ? 'lg:col-start-2' : ''}>
            <div
              className="w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-6"
              style={{
                background: `linear-gradient(135deg, var(--s-from), var(--s-to))`,
                boxShadow: `0 8px 30px ${service.glow}`,
              }}
            >
              <service.icon className="w-6 h-6 text-white" />
            </div>

            <div className="section-label mb-4">{service.tagline}</div>
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-5 leading-tight">
              {service.title}
            </h2>
            <p className="text-white/55 text-[17px] leading-relaxed mb-8">
              {service.description}
            </p>

            <div className="p-5 rounded-xl bg-white/3 border border-white/6 mb-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-2">
                Who it's for
              </p>
              <p className="text-sm text-white/60 leading-relaxed">{service.whoFor}</p>
            </div>

            <Link to="/contact" className="btn-primary glow-violet">
              Get Started with {service.title}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div {...fadeUp(0.15)} className={!isEven ? 'lg:col-start-1' : ''}>
            <div className="glass rounded-2xl p-7">
              <p className="text-sm font-semibold text-white mb-5">What's included:</p>
              <ul className="space-y-3.5 mb-8">
                {service.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-white/65">
                    <CheckCircle className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />
                    {b}
                  </li>
                ))}
              </ul>

              <div className="pt-6 border-t border-white/6">
                <p className="text-sm font-semibold text-white mb-4">Use cases:</p>
                <ul className="space-y-2.5">
                  {service.useCases.map((u) => (
                    <li key={u} className="flex items-start gap-2.5 text-sm text-white/50">
                      <span className="text-violet-400 mt-0.5">→</span>
                      {u}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default function Services() {
  return (
    <>
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[150px]" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div {...fadeUp()} className="inline-block section-label mb-5">
            <Zap className="w-3 h-3" />
            Our Services
          </motion.div>
          <motion.h1 {...fadeUp(0.1)} className="text-5xl lg:text-6xl font-black text-white mb-5 leading-tight">
            Four Systems.{' '}
            <span className="text-gradient">One Mission.</span>
          </motion.h1>
          <motion.p {...fadeUp(0.2)} className="text-xl text-white/50 max-w-2xl mx-auto">
            We build AI automation systems that handle your lead generation, customer support, and
            sales — so you can focus on what only you can do.
          </motion.p>
        </div>
      </section>

      {services.map((service, i) => (
        <ServiceCard key={service.title} service={service} index={i} />
      ))}

      <section className="py-28">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            {...fadeUp()}
            className="relative rounded-3xl overflow-hidden p-14 text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(34,211,238,0.08) 100%)',
              border: '1px solid rgba(124,58,237,0.25)',
            }}
          >
            <div className="absolute inset-0 bg-dots opacity-25" />
            <div className="relative">
              <h2 className="text-4xl font-black text-white mb-4">
                Not Sure Which Service You Need?
              </h2>
              <p className="text-white/55 text-lg mb-8 max-w-lg mx-auto">
                Book a free strategy call — we'll diagnose your biggest bottleneck and recommend
                exactly what to build first.
              </p>
              <Link to="/contact" className="btn-primary glow-violet text-base px-8 py-3.5">
                Book a Free Strategy Call
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
