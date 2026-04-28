import { motion, AnimatePresence } from 'framer-motion'

export default function ChatbotIntro({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 flex items-center justify-center"
          style={{ background: '#000000', zIndex: 10000 }}
        >
          {/* Expanding glow rings */}
          {[1, 1.6, 2.2].map((scale, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: '160px',
                height: '160px',
                border: '1px solid rgba(0,229,255,0.35)',
              }}
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: [0.4, scale], opacity: [0, 0.5, 0] }}
              transition={{
                duration: 2.4,
                delay: i * 0.2,
                ease: 'easeOut',
                times: [0, 0.5, 1],
              }}
            />
          ))}

          {/* Core content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-5 relative z-10"
          >
            {/* Logo container with pulsing glow */}
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 28px rgba(0,229,255,0.35)',
                  '0 0 55px rgba(0,229,255,0.75)',
                  '0 0 28px rgba(0,229,255,0.35)',
                ],
              }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="w-20 h-20 rounded-2xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(0,229,255,0.12), rgba(0,184,212,0.12))',
                border: '1px solid rgba(0,229,255,0.4)',
              }}
            >
              <img
                src="/logo.png"
                alt="UpGpt"
                className="w-12 h-12 mix-blend-screen"
              />
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-center"
            >
              <p
                className="font-black uppercase tracking-widest"
                style={{
                  color: '#00E5FF',
                  fontSize: '20px',
                  textShadow: '0 0 22px rgba(0,229,255,0.9), 0 0 45px rgba(0,229,255,0.4)',
                  letterSpacing: '0.16em',
                }}
              >
                UpGpt Assistant
              </p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.85, duration: 0.4 }}
                style={{
                  color: 'rgba(255,255,255,0.38)',
                  fontSize: '11px',
                  marginTop: '6px',
                  letterSpacing: '0.12em',
                }}
              >
                AI-Powered Lead Intelligence
              </motion.p>
            </motion.div>

            {/* Progress bar */}
            <div
              className="overflow-hidden rounded-full"
              style={{ width: '130px', height: '2px', background: 'rgba(0,229,255,0.12)' }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.5, duration: 2.0, ease: 'easeInOut' }}
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #00E5FF, #33F0FF)',
                  boxShadow: '0 0 8px rgba(0,229,255,0.9)',
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
