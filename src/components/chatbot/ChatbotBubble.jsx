import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'

export default function ChatbotBubble({ isOpen, onClick }) {
  const [showLabel, setShowLabel] = useState(false)

  // Show "Chat with AI" tooltip 2s after mount, hide after 5s
  useEffect(() => {
    const show = setTimeout(() => setShowLabel(true), 2000)
    const hide = setTimeout(() => setShowLabel(false), 7000)
    return () => { clearTimeout(show); clearTimeout(hide) }
  }, [])

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.0, duration: 0.5, type: 'spring', stiffness: 210, damping: 16 }}
      className="fixed z-[9998]"
      style={{ bottom: '24px', right: '22px' }}
    >
      {/* Pulsing rings — only when closed */}
      <AnimatePresence>
        {!isOpen && (
          <>
            {[0, 0.6].map((delay, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 rounded-full animate-ping"
                style={{
                  background: i === 0
                    ? 'rgba(0,229,255,0.22)'
                    : 'rgba(0,229,255,0.10)',
                  animationDuration: '2.2s',
                  animationDelay: `${delay}s`,
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Tooltip */}
      <AnimatePresence>
        {showLabel && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 6, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap text-xs font-medium px-3 py-1.5 rounded-full pointer-events-none"
            style={{
              background: 'rgba(0,0,0,0.88)',
              border: '1px solid rgba(0,229,255,0.28)',
              color: '#00E5FF',
              boxShadow: '0 0 14px rgba(0,229,255,0.18)',
            }}
          >
            Chat with AI ✨
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main button */}
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.94 }}
        className="relative w-14 h-14 rounded-full flex items-center justify-center cursor-pointer border-0"
        style={{
          background: 'linear-gradient(135deg, #00E5FF, #00B8D4)',
          boxShadow: isOpen
            ? '0 0 22px rgba(0,229,255,0.38), 0 4px 18px rgba(0,0,0,0.55)'
            : '0 0 34px rgba(0,229,255,0.65), 0 4px 22px rgba(0,0,0,0.6)',
        }}
        aria-label={isOpen ? 'Close UpGpt Assistant' : 'Open UpGpt Assistant'}
      >
        <motion.div
          key={isOpen ? 'x' : 'chat'}
          initial={{ rotate: -80, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.22 }}
        >
          {isOpen
            ? <X className="w-5 h-5 text-black" />
            : <MessageCircle className="w-5 h-5 text-black" />
          }
        </motion.div>
      </motion.button>
    </motion.div>
  )
}
