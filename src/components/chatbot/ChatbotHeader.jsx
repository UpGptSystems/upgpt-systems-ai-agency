import { X, PanelLeft } from 'lucide-react'
import { t } from './translations'

export default function ChatbotHeader({ currentLang, sidebarOpen, onToggleSidebar, onClose }) {
  return (
    <div
      className="flex items-center justify-between px-4 py-3 flex-shrink-0"
      style={{
        background: 'linear-gradient(180deg, rgba(0,229,255,0.06) 0%, transparent 100%)',
        borderBottom: '1px solid rgba(0,229,255,0.09)',
      }}
    >
      {/* Left: sidebar toggle + identity */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-150 cursor-pointer"
          style={{
            color: sidebarOpen ? '#00E5FF' : 'rgba(255,255,255,0.35)',
            background: sidebarOpen ? 'rgba(0,229,255,0.1)' : 'transparent',
            border: '1px solid',
            borderColor: sidebarOpen ? 'rgba(0,229,255,0.3)' : 'rgba(255,255,255,0.08)',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#00E5FF')}
          onMouseLeave={e => { if (!sidebarOpen) e.currentTarget.style.color = 'rgba(255,255,255,0.35)' }}
          aria-label="Toggle sidebar"
        >
          <PanelLeft className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center gap-2.5">
          <div
            className="relative w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #00E5FF, #00B8D4)',
              boxShadow: '0 0 14px rgba(0,229,255,0.5)',
            }}
          >
            <img src="/logo.png" alt="UpGpt" className="w-5 h-5" style={{ filter: 'brightness(0)' }} />
            <span
              className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border"
              style={{ background: '#00FF88', borderColor: '#000' }}
            />
          </div>

          <div>
            <p className="text-white font-semibold leading-none" style={{ fontSize: '13px' }}>
              {t(currentLang, 'assistantName')}
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#00FF88' }} />
              <span style={{ color: '#00FF88', fontSize: '10px' }}>{t(currentLang, 'online')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Close */}
      <button
        onClick={onClose}
        className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors duration-150 cursor-pointer"
        style={{ color: 'rgba(255,255,255,0.35)' }}
        onMouseEnter={e => (e.currentTarget.style.color = '#ff6b6b')}
        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
        aria-label="Close"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
