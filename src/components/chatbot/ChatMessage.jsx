import { motion } from 'framer-motion'
import MessageRenderer from './MessageRenderer'

export default function ChatMessage({ message }) {
  const isBot = message.role === 'bot'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className={`flex items-end gap-2.5 mb-3 ${isBot ? '' : 'flex-row-reverse'}`}
    >
      {/* Bot avatar */}
      {isBot && (
        <div
          className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-black mb-0.5"
          style={{
            background: 'linear-gradient(135deg, rgba(0,229,255,0.15), rgba(0,184,212,0.15))',
            border: '1px solid rgba(0,229,255,0.35)',
            color: '#00E5FF',
            boxShadow: '0 0 10px rgba(0,229,255,0.2)',
            fontSize: '10px',
          }}
        >
          U
        </div>
      )}

      {/* Bubble */}
      <div
        className="max-w-[80%] text-sm leading-relaxed"
        style={
          isBot
            ? {
                background: 'rgba(0,229,255,0.05)',
                border: '1px solid rgba(0,229,255,0.13)',
                borderRadius: '4px 16px 16px 16px',
                color: 'rgba(255,255,255,0.88)',
                padding: '10px 13px',
              }
            : {
                background: 'linear-gradient(135deg, rgba(0,229,255,0.18), rgba(0,184,212,0.18))',
                border: '1px solid rgba(0,229,255,0.32)',
                borderRadius: '16px 4px 16px 16px',
                color: 'white',
                padding: '10px 13px',
              }
        }
      >
        {isBot ? <MessageRenderer text={message.text} /> : message.text}
      </div>
    </motion.div>
  )
}
