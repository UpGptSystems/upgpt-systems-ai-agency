import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, MessageSquare, Trash2, Globe } from 'lucide-react'
import { t, LANGUAGES } from './translations'

const relativeTime = (ts) => {
  const diff = Date.now() - ts
  const mins  = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days  = Math.floor(diff / 86400000)
  if (mins  < 1)  return 'Just now'
  if (mins  < 60) return `${mins}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days  < 7)  return `${days}d ago`
  return new Date(ts).toLocaleDateString()
}

export default function ChatSidebar({ sessions, activeSessionId, currentLang, onNewChat, onOpenSession, onDeleteSession, onChangeLang }) {
  const [langOpen, setLangOpen] = useState(false)
  const [hoveredId, setHoveredId] = useState(null)

  return (
    <div
      className="flex flex-col h-full"
      style={{
        width: '200px',
        borderRight: '1px solid rgba(0,229,255,0.08)',
        background: 'rgba(0,0,0,0.35)',
        flexShrink: 0,
      }}
    >
      {/* Header */}
      <div
        className="px-3 pt-4 pb-3 flex-shrink-0"
        style={{ borderBottom: '1px solid rgba(0,229,255,0.07)' }}
      >
        {/* New chat button */}
        <button
          onClick={onNewChat}
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, rgba(0,229,255,0.15), rgba(0,184,212,0.15))',
            border: '1px solid rgba(0,229,255,0.3)',
            color: '#00E5FF',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,229,255,0.25), rgba(0,184,212,0.25))'
            e.currentTarget.style.boxShadow = '0 0 14px rgba(0,229,255,0.25)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,229,255,0.15), rgba(0,184,212,0.15))'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          <Plus className="w-3.5 h-3.5 flex-shrink-0" />
          {t(currentLang, 'newChat')}
        </button>

        {/* Section label */}
        <p
          className="mt-3 mb-1 px-1 uppercase tracking-widest"
          style={{ fontSize: '9px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.12em' }}
        >
          {t(currentLang, 'history')}
        </p>
      </div>

      {/* Sessions list */}
      <div
        className="flex-1 overflow-y-auto py-1"
        style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(0,229,255,0.12) transparent' }}
      >
        {sessions.length === 0 ? (
          <p
            className="px-4 py-6 text-center"
            style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)' }}
          >
            {t(currentLang, 'noHistory')}
          </p>
        ) : (
          sessions.map(session => {
            const isActive  = session.id === activeSessionId
            const isHovered = session.id === hoveredId

            return (
              <div
                key={session.id}
                onMouseEnter={() => setHoveredId(session.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="relative mx-2 mb-0.5 rounded-lg cursor-pointer flex items-center gap-2 px-2.5 py-2 transition-all duration-150"
                onClick={() => onOpenSession(session.id)}
                style={{
                  background: isActive
                    ? 'rgba(0,229,255,0.1)'
                    : isHovered
                    ? 'rgba(255,255,255,0.04)'
                    : 'transparent',
                  borderLeft: isActive ? '2px solid rgba(0,229,255,0.6)' : '2px solid transparent',
                }}
              >
                <MessageSquare
                  className="w-3 h-3 flex-shrink-0"
                  style={{ color: isActive ? '#00E5FF' : 'rgba(255,255,255,0.3)' }}
                />
                <div className="flex-1 min-w-0">
                  <p
                    className="truncate leading-tight"
                    style={{
                      fontSize: '11.5px',
                      color: isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.55)',
                      fontWeight: isActive ? '500' : '400',
                    }}
                  >
                    {session.title}
                  </p>
                  <p style={{ fontSize: '9.5px', color: 'rgba(255,255,255,0.22)', marginTop: '1px' }}>
                    {relativeTime(session.updatedAt)}
                  </p>
                </div>

                {/* Delete button */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.12 }}
                      onClick={e => { e.stopPropagation(); onDeleteSession(session.id) }}
                      className="flex-shrink-0 w-5 h-5 rounded flex items-center justify-center"
                      style={{ color: 'rgba(255,100,100,0.6)' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#ff6b6b')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,100,100,0.6)')}
                    >
                      <Trash2 className="w-3 h-3" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            )
          })
        )}
      </div>

      {/* Language selector */}
      <div
        className="px-3 py-3 flex-shrink-0 relative"
        style={{ borderTop: '1px solid rgba(0,229,255,0.07)' }}
      >
        <button
          onClick={() => setLangOpen(prev => !prev)}
          className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg transition-all duration-150 cursor-pointer"
          style={{
            background: langOpen ? 'rgba(0,229,255,0.08)' : 'transparent',
            border: '1px solid rgba(0,229,255,0.12)',
            color: 'rgba(255,255,255,0.55)',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
        >
          <Globe className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#00E5FF' }} />
          <span style={{ fontSize: '11px', flex: 1, textAlign: 'left' }}>
            {LANGUAGES.find(l => l.code === currentLang)?.name ?? 'English'}
          </span>
          <span style={{ fontSize: '10px', opacity: 0.5 }}>{langOpen ? '▲' : '▼'}</span>
        </button>

        <AnimatePresence>
          {langOpen && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.18 }}
              className="absolute bottom-14 left-3 right-3 rounded-xl overflow-hidden"
              style={{
                background: 'rgba(5,5,18,0.97)',
                border: '1px solid rgba(0,229,255,0.18)',
                boxShadow: '0 0 20px rgba(0,229,255,0.08)',
                zIndex: 10,
              }}
            >
              {LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => { onChangeLang(lang.code); setLangOpen(false) }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-left transition-colors duration-100 cursor-pointer"
                  style={{
                    fontSize: '12px',
                    color: lang.code === currentLang ? '#00E5FF' : 'rgba(255,255,255,0.6)',
                    background: lang.code === currentLang ? 'rgba(0,229,255,0.08)' : 'transparent',
                    fontWeight: lang.code === currentLang ? '600' : '400',
                  }}
                  onMouseEnter={e => { if (lang.code !== currentLang) e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
                  onMouseLeave={e => { if (lang.code !== currentLang) e.currentTarget.style.background = 'transparent' }}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                  {lang.code === currentLang && <span className="ml-auto text-xs">✓</span>}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
