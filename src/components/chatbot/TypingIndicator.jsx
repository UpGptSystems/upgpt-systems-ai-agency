const DELAYS = [0, 180, 360]

export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-2.5 mb-3">
      {/* Bot avatar */}
      <div
        className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-black"
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

      {/* Animated dots */}
      <div
        className="flex items-center gap-1.5 px-4 py-3"
        style={{
          background: 'rgba(0,229,255,0.05)',
          border: '1px solid rgba(0,229,255,0.12)',
          borderRadius: '4px 16px 16px 16px',
        }}
      >
        {DELAYS.map((delay, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full animate-bounce"
            style={{
              background: '#00E5FF',
              animationDelay: `${delay}ms`,
              animationDuration: '1.1s',
              boxShadow: '0 0 6px rgba(0,229,255,0.9)',
            }}
          />
        ))}
      </div>
    </div>
  )
}
