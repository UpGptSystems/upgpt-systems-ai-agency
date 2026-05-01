import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle, X, ArrowRight, Zap, MessageSquare, TrendingUp, Quote } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
})

const caseStudies = [
  {
    tier: 'Starter',
    client: 'Whitfield Dental Studio',
    industry: 'Dental Practice · Manchester',
    headline: '"We stopped losing evening enquiries — and booked 19 new consults in the first month."',
    metrics: [
      { label: 'New leads / month', before: '15', after: '47' },
      { label: 'Booked consultations', before: '4', after: '19' },
      { label: 'Visitor → lead conversion', before: '1.5%', after: '8.2%' },
      { label: 'Revenue (month 1)', before: '—', after: '£8,400' },
    ],
    breakeven: 'Break-even point: Day 12',
    quote: 'I stopped checking emails at night within the first week. Three new Invisalign cases in the first month covered the whole system.',
    author: 'Sarah Whitfield',
    role: 'Practice Manager, Whitfield Dental Studio',
  },
  {
    tier: 'Growth',
    client: 'Lumen Aesthetic',
    industry: 'Aesthetic Clinic · Amsterdam',
    headline: '"+28% in monthly bookings. €34k/month attributable revenue. Paid back in week one."',
    metrics: [
      { label: 'Qualified leads / 60 days', before: '~120', after: '312' },
      { label: 'Monthly bookings', before: 'Baseline', after: '+28%' },
      { label: 'Lead ghost rate', before: '35%', after: '11%' },
      { label: 'Revenue / month', before: '—', after: '€34,000' },
    ],
    breakeven: 'Break-even point: Week 1',
    quote: 'We used to lose patients somewhere between Instagram and the booking page. Show-up rate went from frustrating to predictable.',
    author: 'Lars de Vries',
    role: 'Clinic Director, Lumen Aesthetiek',
  },
  {
    tier: 'Premium',
    client: 'ELEVATE Studios',
    industry: 'Boutique Fitness · Berlin & Munich',
    headline: '"Trial-to-member conversion went from 22% to 38%. €78k/month in incremental revenue."',
    metrics: [
      { label: 'Trial signups / month', before: '~800', after: '1,400+' },
      { label: 'Trial → paid conversion', before: '22%', after: '38%' },
      { label: '90-day retention', before: 'Baseline', after: '+12 pts' },
      { label: 'Revenue lift / month', before: '—', after: '€78,000' },
    ],
    breakeven: 'Paid back 8.6× in month one',
    quote: "We didn't need another lead-gen tool. UPGPT rebuilt the entire trial-to-member journey in 90 days and the numbers are honestly hard to argue with.",
    author: 'Michael Hoffmann',
    role: 'Founder, ELEVATE Studios',
  },
]

const plans = [
  {
    name: 'Starter',
    oneTime: '1,497',
    monthly: '397',
    months: 4,
    maintenance: '19',
    description: 'Everything you need to start automating customer interactions and capturing leads.',
    features: {
      'AI Chatbot (Website)': true,
      'WhatsApp AI Chatbot': false,
      'CRM Integration': false,
      'Lead Qualification Flows': false,
      'Analytics Dashboard': false,
      'Custom AI Training': false,
      'Dedicated Account Manager': false,
      'Multi-Platform Coverage': false,
      'Monthly Optimisation Reports': false,
      '24/7 Priority Support': false,
      'AI Voice Agents': false,
    },
    extras: [
      'Basic FAQ automation',
      'Lead capture & email notifications',
      'Mobile-responsive widget',
      '500 conversations/month',
      '30-day support included',
    ],
    popular: false,
    cta: 'Get Started',
    ctaLink: '/contact',
  },
  {
    name: 'Growth',
    oneTime: '3,997',
    monthly: '897',
    months: 5,
    maintenance: '55',
    description: 'The most popular package — full automation stack for growing businesses.',
    features: {
      'AI Chatbot (Website)': true,
      'WhatsApp AI Chatbot': true,
      'CRM Integration': true,
      'Lead Qualification Flows': true,
      'Analytics Dashboard': true,
      'Custom AI Training': false,
      'Dedicated Account Manager': false,
      'Multi-Platform Coverage': false,
      'Monthly Optimisation Reports': false,
      '24/7 Priority Support': false,
      'AI Voice Agents': false,
    },
    extras: [
      'Custom conversation design',
      'Automated follow-up sequences',
      '2,000 conversations/month',
      '90-day priority support',
      'Onboarding & training call',
    ],
    popular: true,
    cta: 'Get Started',
    ctaLink: '/contact',
  },
  {
    name: 'Premium',
    oneTime: '8,997',
    monthly: '1,997',
    months: 5,
    maintenance: '99',
    description: 'Enterprise-level AI infrastructure — unlimited scale, full automation, white-glove support.',
    features: {
      'AI Chatbot (Website)': true,
      'WhatsApp AI Chatbot': true,
      'CRM Integration': true,
      'Lead Qualification Flows': true,
      'Analytics Dashboard': true,
      'Custom AI Training': true,
      'Dedicated Account Manager': true,
      'Multi-Platform Coverage': true,
      'Monthly Optimisation Reports': true,
      '24/7 Priority Support': true,
      'AI Voice Agents': true,
    },
    extras: [
      'Unlimited conversations',
      'SMS integration',
      'A/B testing & split flows',
      'Quarterly strategy reviews',
      'Lifetime support & updates',
    ],
    popular: false,
    cta: 'Contact Us',
    ctaLink: '/contact',
  },
]

const featureOrder = [
  'AI Chatbot (Website)',
  'WhatsApp AI Chatbot',
  'CRM Integration',
  'Lead Qualification Flows',
  'Analytics Dashboard',
  'Custom AI Training',
  'Dedicated Account Manager',
  'Multi-Platform Coverage',
  'Monthly Optimisation Reports',
  '24/7 Priority Support',
  'AI Voice Agents',
]

const faqs = [
  {
    q: 'Is this a one-time payment or recurring?',
    a: "You can choose either. The listed prices are one-time setup fees — we also offer monthly retainer options if you prefer to spread the cost. Ask us on the call.",
  },
  {
    q: 'How long does it take to go live?',
    a: 'Most projects go live within 7–14 days from the kickoff call. Premium projects with deep CRM integrations may take up to 3 weeks.',
  },
  {
    q: 'Do I need technical knowledge?',
    a: 'None at all. We handle everything — design, build, integration, testing, and launch. You just review and approve at each stage.',
  },
  {
    q: 'What CRMs do you integrate with?',
    a: 'HubSpot, Pipedrive, Go High Level, Zoho, Salesforce, Notion, Airtable, and more. If your CRM has an API, we can connect it.',
  },
  {
    q: 'Can I upgrade my plan later?',
    a: 'Yes. You pay the difference between plans, not the full amount again. Upgrades are common as clients grow.',
  },
  {
    q: 'Do you offer refunds?',
    a: "We don't do refunds on custom builds, but we do a thorough discovery call before starting — so we're aligned before a single line is written. We guarantee delivery to spec.",
  },
]

export default function Pricing() {
  const [billing, setBilling] = useState('oneTime')
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <>
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-violet-600/10 rounded-full blur-[150px]" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <motion.div {...fadeUp()} className="inline-block section-label mb-5">
            <Zap className="w-3 h-3" />
            Pricing
          </motion.div>
          <motion.h1 {...fadeUp(0.1)} className="text-5xl lg:text-6xl font-black text-white mb-5">
            Invest Once.{' '}
            <span className="text-gradient">Profit Forever.</span>
          </motion.h1>
          <motion.p {...fadeUp(0.2)} className="text-xl text-white/50 mb-10">
            No hidden fees. No surprise bills. Just a system that pays for itself — typically within
            the first 60 days.
          </motion.p>

          <motion.div {...fadeUp(0.3)} className="inline-flex items-center glass rounded-xl p-1 gap-1">
            <button
              onClick={() => setBilling('oneTime')}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                billing === 'oneTime'
                  ? 'bg-violet-600 text-white shadow-lg'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              One-Time Setup
            </button>
            <button
              onClick={() => setBilling('monthly')}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                billing === 'monthly'
                  ? 'bg-violet-600 text-white shadow-lg'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              Monthly Retainer
            </button>
          </motion.div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-5 items-start">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                {...fadeUp(i * 0.1)}
                className={`rounded-2xl p-7 flex flex-col relative ${
                  plan.popular
                    ? 'bg-gradient-to-b from-violet-900/35 to-[#060610] border border-violet-500/40 glow-card'
                    : 'glass'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-violet-600 to-violet-700 text-white text-[11px] font-bold uppercase tracking-wide shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className={`${plan.popular ? 'mt-3' : ''}`}>
                  <p className="text-white/50 text-sm font-semibold mb-2">{plan.name}</p>
                  <div className="flex items-end gap-1 mb-1">
                    <span className="text-[42px] font-black text-white leading-none">
                      €{billing === 'oneTime' ? plan.oneTime : plan.monthly}
                    </span>
                  </div>
                  <p className="text-white/30 text-xs mb-1">
                    {billing === 'oneTime' ? 'one-time setup fee' : 'per month'}
                  </p>
                  <div className="flex items-center gap-1.5 mb-3">
                    <span className="text-[11px] text-white/35">+</span>
                    <span className="text-[11px] font-semibold text-violet-300">€{plan.maintenance}/month</span>
                    <span className="text-[11px] text-white/35">maintenance</span>
                  </div>
                  {billing === 'monthly' && (
                    <div className="mb-4 mt-1 px-3 py-2 rounded-lg bg-violet-600/10 border border-violet-500/20">
                      <p className="text-violet-300 text-xs font-semibold">
                        {plan.months} months · €{(parseInt(plan.monthly.replace(',', '')) * plan.months).toLocaleString()} total
                      </p>
                      <p className="text-white/35 text-[11px] mt-0.5">
                        vs €{plan.oneTime} one-time — save with upfront payment
                      </p>
                    </div>
                  )}
                  <p className="text-white/50 text-sm leading-relaxed mb-6 pb-6 border-b border-white/6">
                    {plan.description}
                  </p>
                </div>

                <div className="space-y-2.5 mb-7 flex-1">
                  {featureOrder.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      {plan.features[feature] ? (
                        <CheckCircle className="w-4 h-4 text-violet-400 flex-shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-white/15 flex-shrink-0" />
                      )}
                      <span
                        className={`text-sm ${
                          plan.features[feature] ? 'text-white/70' : 'text-white/25'
                        }`}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {plan.extras.length > 0 && (
                  <div className="mb-6 p-4 rounded-xl bg-white/3 border border-white/5">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-white/30 mb-3">
                      Also included
                    </p>
                    <ul className="space-y-2">
                      {plan.extras.map((e) => (
                        <li key={e} className="text-xs text-white/50 flex items-center gap-2">
                          <span className="text-violet-400">·</span> {e}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Link
                  to={plan.ctaLink}
                  className={`w-full text-center py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-violet-600 to-violet-700 text-white hover:from-violet-500 hover:to-violet-600 glow-violet'
                      : 'glass border border-white/10 text-white/70 hover:text-white hover:border-white/20'
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Case Studies */}
          <div className="mt-20">
            <motion.div {...fadeUp(0)} className="text-center mb-3">
              <div className="inline-flex items-center gap-2 section-label mb-5">
                <TrendingUp className="w-3 h-3" />
                Real Results
              </div>
              <h2 className="text-3xl lg:text-4xl font-black text-white mb-3">
                What Each Plan Delivers
              </h2>
              <p className="text-white/45 max-w-xl mx-auto">
                Three deployments. Three tiers. Numbers calibrated to what AI systems actually deliver — not marketing fantasy.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-5 mt-10">
              {caseStudies.map((cs, i) => (
                <motion.div
                  key={cs.tier}
                  {...fadeUp(i * 0.1)}
                  className="rounded-2xl glass border border-white/6 overflow-hidden flex flex-col"
                >
                  <div className="p-6 border-b border-white/6">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-violet-400 mb-1">{cs.tier} Plan</p>
                    <p className="text-white font-bold text-base leading-snug">{cs.client}</p>
                    <p className="text-white/35 text-xs mt-0.5">{cs.industry}</p>
                    <p className="text-white/60 text-sm mt-4 leading-relaxed italic">{cs.headline}</p>
                  </div>

                  <div className="p-6 border-b border-white/6">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-3">Key Results</p>
                    <div className="space-y-2.5">
                      {cs.metrics.map((m) => (
                        <div key={m.label} className="flex items-center justify-between gap-3">
                          <span className="text-xs text-white/45 flex-1">{m.label}</span>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="text-xs text-white/25 line-through">{m.before}</span>
                            <span className="text-xs font-bold text-violet-300">{m.after}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 inline-block px-3 py-1.5 rounded-lg bg-violet-600/15 border border-violet-500/25">
                      <p className="text-[11px] font-semibold text-violet-300">{cs.breakeven}</p>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col gap-3 flex-1">
                    <Quote className="w-5 h-5 text-violet-400/50" />
                    <p className="text-sm text-white/60 leading-relaxed flex-1">"{cs.quote}"</p>
                    <div>
                      <p className="text-sm font-semibold text-white">{cs.author}</p>
                      <p className="text-xs text-white/35">{cs.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div {...fadeUp(0.4)} className="mt-12 p-6 rounded-2xl glass border border-white/6 flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <p className="font-semibold text-white text-sm">Need a custom solution?</p>
                <p className="text-white/45 text-sm">
                  Enterprises and agencies with complex requirements — let's talk.
                </p>
              </div>
            </div>
            <Link to="/contact" className="btn-primary text-sm whitespace-nowrap">
              Contact Sales
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-[#080814]">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black text-white mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-white/45">
              Straight answers. No jargon.
            </p>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.q}
                {...fadeUp(i * 0.06)}
                className="glass rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left group"
                >
                  <span className="text-sm font-semibold text-white group-hover:text-violet-300 transition-colors">
                    {faq.q}
                  </span>
                  <span
                    className={`text-white/40 transition-transform duration-200 flex-shrink-0 ml-4 ${
                      openFaq === i ? 'rotate-45' : ''
                    }`}
                  >
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 border-t border-white/5 pt-4">
                    <p className="text-sm text-white/55 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div {...fadeUp()}>
            <h2 className="text-4xl font-black text-white mb-5">
              Still Have Questions?
            </h2>
            <p className="text-white/50 mb-8">
              Book a 30-minute call — we'll answer everything and help you pick the right plan.
              No pressure. No pitch.
            </p>
            <Link to="/contact" className="btn-primary glow-violet text-base px-8 py-4">
              Book a Free Call
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
