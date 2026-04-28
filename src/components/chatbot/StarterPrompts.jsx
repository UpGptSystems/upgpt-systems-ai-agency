import { motion, AnimatePresence } from 'framer-motion'

export default function StarterPrompts({ prompts, visible, onSelect }) {
  return (
    <AnimatePresence>
      {visible && prompts?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="px-4 pb-3 grid grid-cols-2 gap-2"
        >
          {prompts.map((p, i) => (
            <motion.button
              key={p.text}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.06 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(p.text)}
              className="text-left p-3 rounded-xl cursor-pointer transition-all duration-200"
              style={{
                background: 'rgba(0,229,255,0.04)',
                border: '1px solid rgba(0,229,255,0.14)',
                color: 'rgba(255,255,255,0.72)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(0,229,255,0.1)'
                e.currentTarget.style.borderColor = 'rgba(0,229,255,0.3)'
                e.currentTarget.style.boxShadow = '0 0 12px rgba(0,229,255,0.12)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(0,229,255,0.04)'
                e.currentTarget.style.borderColor = 'rgba(0,229,255,0.14)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <span style={{ fontSize: '16px', display: 'block', marginBottom: '4px' }}>{p.icon}</span>
              <span style={{ fontSize: '11px', lineHeight: 1.4 }}>{p.text}</span>
            </motion.button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
