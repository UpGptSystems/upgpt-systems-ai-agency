import { Link } from 'react-router-dom'
import { Instagram, Mail } from 'lucide-react'

const footerLinks = {
  Company: [
    { label: 'Services', path: '/services' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Contact', path: '/contact' },
    { label: 'Book a Demo', path: '/contact' },
  ],
  Services: [
    { label: 'Website Chatbots', path: '/services' },
    { label: 'WhatsApp AI', path: '/services' },
    { label: 'CRM Automation', path: '/services' },
    { label: 'Lead Generation', path: '/services' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#060610]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img
                src="/logo.png"
                alt="UPGPT Systems"
                className="w-9 h-9 mix-blend-screen flex-shrink-0"
              />
              <span className="font-black text-[15px] tracking-tight">
                <span className="text-gradient">UPGPT</span>
                <span className="text-white/50"> SYSTEMS</span>
              </span>
            </Link>
            <p className="text-white/45 text-sm leading-relaxed max-w-xs">
              We build AI automation systems that work 24/7 — capturing leads, handling support, and closing sales while you focus on growth.
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href="https://www.instagram.com/upgpt_systems?igsh=MXJ2dTB6NnkwZDM3MA=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg glass border border-white/8 flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="mailto:upgptsystems@gmail.com"
                className="w-9 h-9 rounded-lg glass border border-white/8 flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([group, items]) => (
            <div key={group}>
              <h4 className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-4">
                {group}
              </h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.path}
                      className="text-sm text-white/50 hover:text-white transition-colors duration-150"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} UPGPT SYSTEMS. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-white/25 hover:text-white/50 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-white/25 hover:text-white/50 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
