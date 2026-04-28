import { motion, AnimatePresence } from 'framer-motion'
import { LANGUAGES } from './translations'

export default function LanguagePicker({ visible, onSelect }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.25, delay: 0.1 }}
          className="px-4 pb-3 grid grid-cols-3 gap-2"
        >
          {LANGUAGES.map((lang, i) => (
            <motion.button
              key={lang.code}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onSelect(lang.code)}
              className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl cursor-pointer transition-all duration-150"
              style={{
                background: 'rgba(0,229,255,0.04)',
                border: '1px solid rgba(0,229,255,0.14)',
                color: 'rgba(255,255,255,0.8)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(0,229,255,0.12)'
                e.currentTarget.style.borderColor = 'rgba(0,229,255,0.35)'
                e.currentTarget.style.boxShadow = '0 0 14px rgba(0,229,255,0.14)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(0,229,255,0.04)'
                e.currentTarget.style.borderColor = 'rgba(0,229,255,0.14)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <span style={{ fontSize: '22px', lineHeight: 1 }}>{lang.flag}</span>
              <span style={{ fontSize: '11px', fontWeight: '500' }}>{lang.name}</span>
            </motion.button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
