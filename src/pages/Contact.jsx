import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, Calendar, Zap, ArrowRight, CheckCircle, CreditCard, Shield, Banknote, Copy, Check, Upload } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
})

// Replace placeholder URLs with your real payment links
const stripePlans = [
  {
    name: 'Starter',
    label: 'AI Website Chatbot + Lead Capture',
    price: '€1,497',
    priceLabel: 'once',
    priceMonthly: '€397',
    priceMonthlyLabel: '/mo',
    paymentLinkOneTime: 'https://buy.stripe.com/REPLACE_STARTER_ONE_TIME',
    paymentLinkMonthly: 'https://buy.stripe.com/REPLACE_STARTER_MONTHLY',
    paypalLinkOneTime: 'https://paypal.me/upgptsystems/1497',
    paypalLinkMonthly: 'https://paypal.me/upgptsystems/397',
    popular: false,
  },
  {
    name: 'Growth',
    label: 'Full automation stack — most popular',
    price: '€3,997',
    priceLabel: 'once',
    priceMonthly: '€897',
    priceMonthlyLabel: '/mo',
    paymentLinkOneTime: 'https://buy.stripe.com/REPLACE_GROWTH_ONE_TIME',
    paymentLinkMonthly: 'https://buy.stripe.com/REPLACE_GROWTH_MONTHLY',
    paypalLinkOneTime: 'https://paypal.me/upgptsystems/3997',
    paypalLinkMonthly: 'https://paypal.me/upgptsystems/897',
    popular: true,
  },
  {
    name: 'Premium',
    label: 'Enterprise AI — unlimited scale',
    price: '€8,997',
    priceLabel: 'once',
    priceMonthly: '€1,997',
    priceMonthlyLabel: '/mo',
    paymentLinkOneTime: 'https://buy.stripe.com/REPLACE_PREMIUM_ONE_TIME',
    paymentLinkMonthly: 'https://buy.stripe.com/REPLACE_PREMIUM_MONTHLY',
    paypalLinkOneTime: 'https://paypal.me/upgptsystems/8997',
    paypalLinkMonthly: 'https://paypal.me/upgptsystems/1997',
    popular: false,
  },
]

// Replace with your real bank details
const bankDetails = {
  accountName: 'UpGPT Systems',
  iban: 'REPLACE_WITH_YOUR_IBAN',
  swift: 'REPLACE_WITH_SWIFT_BIC',
  bank: 'REPLACE_WITH_BANK_NAME',
  reference: 'Include your name + plan as payment reference',
}

const services = [
  'AI Website Chatbot',
  'WhatsApp AI Chatbot',
  'CRM Automation',
  'Lead Generation System',
  'Full Growth Package',
  "Not sure yet — let's talk",
]

const budgets = [
  'Under €1,500',
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
  const [selectedPlan, setSelectedPlan] = useState('Growth')
  const [billing, setBilling] = useState('oneTime')
  const [paymentMethod, setPaymentMethod] = useState('stripe')
  const [proofFile, setProofFile] = useState(null)
  const [copied, setCopied] = useState('')

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

  const activePlan = stripePlans.find((p) => p.name === selectedPlan)
  const displayPrice = billing === 'oneTime' ? activePlan.price : activePlan.priceMonthly
  const displayPriceLabel = billing === 'oneTime' ? activePlan.priceLabel : activePlan.priceMonthlyLabel

  const handlePay = () => {
    const link = billing === 'oneTime' ? activePlan.paymentLinkOneTime : activePlan.paymentLinkMonthly
    window.open(link, '_blank', 'noopener,noreferrer')
  }

  const handlePayPal = () => {
    const link = billing === 'oneTime' ? activePlan.paypalLinkOneTime : activePlan.paypalLinkMonthly
    window.open(link, '_blank', 'noopener,noreferrer')
  }

  const handleCopy = (field, value) => {
    navigator.clipboard.writeText(value)
    setCopied(field)
    setTimeout(() => setCopied(''), 2000)
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
                  <div className="w-16 h-16 rounded-full bg-violet-600/20 border border-violet-500/30 flex items-center justify-center mb-6">
                    <CheckCircle className="w-8 h-8 text-violet-400" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-3">Message Sent!</h3>
                  <p className="text-white/55 max-w-sm">
                    Thanks for reaching out. We'll review your project and get back to you within
                    24 hours with a clear next step.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5">
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
                        className="w-full bg-black border border-[#00E5FF]/20 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF]/20 transition-all duration-150"
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
                        className="w-full bg-black border border-[#00E5FF]/20 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF]/20 transition-all duration-150"
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
                      className="w-full bg-black border border-[#00E5FF]/20 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF]/20 transition-all duration-150"
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
                        className="w-full bg-black border border-[#00E5FF]/20 rounded-xl px-4 py-3 text-sm text-white/70 focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF]/20 transition-all duration-150 appearance-none cursor-pointer"
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
                        className="w-full bg-black border border-[#00E5FF]/20 rounded-xl px-4 py-3 text-sm text-white/70 focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF]/20 transition-all duration-150 appearance-none cursor-pointer"
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
                      rows={4}
                      placeholder="What does your business do? What problem are you trying to solve? What's your current bottleneck?"
                      className="w-full bg-black border border-[#00E5FF]/20 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF]/20 transition-all duration-150 resize-none"
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

                  {/* Divider */}
                  <div className="relative flex items-center gap-3 py-1">
                    <div className="flex-1 h-px bg-white/8" />
                    <span className="text-xs text-white/30 whitespace-nowrap">or pay now and get started immediately</span>
                    <div className="flex-1 h-px bg-white/8" />
                  </div>

                  {/* Plan selector */}
                  <div>
                    <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">
                      Select Your Plan
                    </p>
                    <div className="space-y-2">
                      {stripePlans.map((plan) => {
                        const isSelected = selectedPlan === plan.name
                        const planPrice = billing === 'oneTime' ? plan.price : plan.priceMonthly
                        const planPriceLabel = billing === 'oneTime' ? plan.priceLabel : plan.priceMonthlyLabel
                        return (
                          <button
                            key={plan.name}
                            type="button"
                            onClick={() => setSelectedPlan(plan.name)}
                            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl border text-left transition-all duration-150 ${
                              isSelected
                                ? 'border-violet-500/60 bg-violet-600/10'
                                : 'border-white/8 bg-white/2 hover:border-white/15'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                              isSelected ? 'border-violet-500' : 'border-white/25'
                            }`}>
                              {isSelected && <div className="w-2 h-2 rounded-full bg-violet-500" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-white">{plan.name}</span>
                                {plan.popular && (
                                  <span className="px-2 py-0.5 rounded-full bg-violet-600/30 border border-violet-500/40 text-[10px] font-bold text-violet-300 uppercase tracking-wide">
                                    Popular
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-white/40 mt-0.5">{plan.label}</p>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <span className="text-sm font-black text-white">{planPrice}</span>
                              <span className="text-xs text-white/35 ml-1">{planPriceLabel}</span>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Billing toggle */}
                  <div className="flex items-center glass rounded-lg p-1 gap-1 w-fit">
                    <button
                      type="button"
                      onClick={() => setBilling('oneTime')}
                      className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all duration-150 ${
                        billing === 'oneTime' ? 'bg-violet-600 text-white' : 'text-white/45 hover:text-white'
                      }`}
                    >
                      One-Time Setup
                    </button>
                    <button
                      type="button"
                      onClick={() => setBilling('monthly')}
                      className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all duration-150 ${
                        billing === 'monthly' ? 'bg-violet-600 text-white' : 'text-white/45 hover:text-white'
                      }`}
                    >
                      Monthly Retainer
                    </button>
                  </div>

                  {/* Payment method selector */}
                  <div>
                    <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">
                      Payment Method
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'stripe', icon: CreditCard, label: 'Card', sub: 'Stripe' },
                        { id: 'paypal', icon: null, label: 'PayPal', sub: 'PayPal.me' },
                        { id: 'bank', icon: Banknote, label: 'Bank', sub: 'Transfer' },
                      ].map(({ id, icon: Icon, label, sub }) => (
                        <button
                          key={id}
                          type="button"
                          onClick={() => setPaymentMethod(id)}
                          className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border text-center transition-all duration-150 ${
                            paymentMethod === id
                              ? 'border-violet-500/60 bg-violet-600/10'
                              : 'border-white/8 bg-white/2 hover:border-white/15'
                          }`}
                        >
                          {id === 'paypal' ? (
                            <span className="text-[15px] font-black tracking-tight" style={{ color: paymentMethod === id ? '#009cde' : 'rgba(255,255,255,0.4)' }}>P</span>
                          ) : (
                            <Icon className={`w-4 h-4 ${paymentMethod === id ? 'text-violet-400' : 'text-white/35'}`} />
                          )}
                          <span className={`text-xs font-semibold ${paymentMethod === id ? 'text-white' : 'text-white/45'}`}>{label}</span>
                          <span className="text-[10px] text-white/25">{sub}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Stripe pay button */}
                  {paymentMethod === 'stripe' && (
                    <button
                      type="button"
                      onClick={handlePay}
                      className="btn-primary glow-violet w-full justify-center py-4 text-base"
                    >
                      <CreditCard className="w-5 h-5" />
                      Pay {displayPrice}{displayPriceLabel !== 'once' ? displayPriceLabel : ''} — {activePlan.name} Plan
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  )}

                  {/* PayPal button */}
                  {paymentMethod === 'paypal' && (
                    <button
                      type="button"
                      onClick={handlePayPal}
                      className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-bold text-base transition-all duration-200 hover:opacity-90"
                      style={{ background: 'linear-gradient(135deg, #009cde, #003087)', color: '#fff' }}
                    >
                      <span className="text-lg font-black tracking-tight">Pay</span>
                      <span className="text-lg font-black italic" style={{ color: '#00b4e6' }}>Pal</span>
                      <span className="font-semibold">— {displayPrice}{displayPriceLabel !== 'once' ? displayPriceLabel : ''}</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  )}

                  {/* Bank transfer details */}
                  {paymentMethod === 'bank' && (
                    <div className="space-y-3">
                      <div className="rounded-xl border border-white/8 bg-white/2 overflow-hidden">
                        {[
                          { label: 'Account Name', value: bankDetails.accountName },
                          { label: 'IBAN', value: bankDetails.iban },
                          { label: 'SWIFT / BIC', value: bankDetails.swift },
                          { label: 'Bank', value: bankDetails.bank },
                        ].map(({ label, value }) => (
                          <div key={label} className="flex items-center justify-between px-4 py-3 border-b border-white/6 last:border-0">
                            <div>
                              <p className="text-[10px] font-semibold text-white/30 uppercase tracking-widest">{label}</p>
                              <p className="text-sm font-mono text-white/80 mt-0.5">{value}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleCopy(label, value)}
                              className="ml-3 p-1.5 rounded-lg glass border border-white/8 text-white/30 hover:text-white transition-colors flex-shrink-0"
                            >
                              {copied === label
                                ? <Check className="w-3.5 h-3.5 text-green-400" />
                                : <Copy className="w-3.5 h-3.5" />
                              }
                            </button>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-white/35 px-1">{bankDetails.reference}</p>

                      {/* Proof upload */}
                      <div>
                        <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">
                          Upload Payment Proof
                        </p>
                        <label className={`flex flex-col items-center justify-center gap-2 w-full py-6 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-150 ${
                          proofFile ? 'border-violet-500/50 bg-violet-600/8' : 'border-white/10 hover:border-white/20 bg-white/2'
                        }`}>
                          <input
                            type="file"
                            accept="image/*,.pdf"
                            className="hidden"
                            onChange={(e) => setProofFile(e.target.files?.[0] || null)}
                          />
                          {proofFile ? (
                            <>
                              <CheckCircle className="w-5 h-5 text-violet-400" />
                              <span className="text-xs text-violet-300 font-semibold">{proofFile.name}</span>
                              <span className="text-[10px] text-white/30">Click to change file</span>
                            </>
                          ) : (
                            <>
                              <Upload className="w-5 h-5 text-white/25" />
                              <span className="text-xs text-white/40">Drop screenshot or PDF here</span>
                              <span className="text-[10px] text-white/25">PNG, JPG, PDF accepted</span>
                            </>
                          )}
                        </label>
                      </div>

                      <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-500/8 border border-amber-500/20">
                        <Shield className="w-4 h-4 text-amber-400 flex-shrink-0" />
                        <p className="text-xs text-amber-300/70">Your order will be marked <span className="font-semibold text-amber-300">Pending</span> until payment is confirmed by our team.</p>
                      </div>
                    </div>
                  )}

                  {/* Trust badges */}
                  <div className="flex items-center justify-center gap-6 pt-1 flex-wrap">
                    <div className="flex items-center gap-1.5 text-white/25 text-xs">
                      <Shield className="w-3 h-3" />SSL Encrypted
                    </div>
                    <div className="flex items-center gap-1.5 text-white/25 text-xs">
                      <CreditCard className="w-3 h-3" />
                      {paymentMethod === 'paypal' ? 'Secured by PayPal' : paymentMethod === 'bank' ? 'Bank-level Security' : 'Secured by Stripe'}
                    </div>
                    <div className="flex items-center gap-1.5 text-white/25 text-xs">
                      <CheckCircle className="w-3 h-3" />
                      {paymentMethod === 'bank' ? 'Manual Confirmation' : 'Instant Confirmation'}
                    </div>
                  </div>
                </form>
              )}
            </motion.div>

            <motion.div {...fadeUp(0.15)} className="lg:col-span-2 space-y-5">
              {contactInfo.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className="glass rounded-2xl p-6 flex items-start gap-4 hover:border-violet-500/30 transition-all duration-200 group block"
                >
                  <div className="w-11 h-11 rounded-xl bg-violet-600/15 border border-violet-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-violet-600/25 transition-colors">
                    <c.icon className="w-5 h-5 text-violet-400" />
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
                className="glass rounded-2xl p-7 border border-violet-500/20"
                style={{ boxShadow: '0 0 40px rgba(124,58,237,0.08)' }}
              >
                <p className="text-sm font-semibold text-white mb-1">What happens next?</p>
                <p className="text-white/45 text-sm mb-5">
                  After you send your message or pay, here's what to expect:
                </p>
                <ol className="space-y-4">
                  {[
                    { n: '01', text: 'We review your project and requirements (within 24h)' },
                    { n: '02', text: 'You receive a personalised response with our recommendation' },
                    { n: '03', text: 'We schedule a 30-min call to align on scope and timeline' },
                    { n: '04', text: 'Your system is built and live within 7–14 days' },
                  ].map((step) => (
                    <li key={step.n} className="flex items-start gap-3">
                      <span className="text-xl font-black text-gradient-violet opacity-50 leading-none w-6 flex-shrink-0">
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
