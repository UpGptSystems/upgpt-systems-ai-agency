import { useState, useRef } from 'react'
import { Send } from 'lucide-react'
import { t } from './translations'

export default function ChatInput({ currentLang, onSend, isLocked }) {
  const [value, setValue] = useState('')
  const inputRef = useRef(null)

  const canSend = value.trim().length > 0 && !isLocked

  const submit = () => {
    if (!canSend) return
    onSend(value.trim())
    setValue('')
    inputRef.current?.focus()
  }

  const onKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  return (
    <div className="flex items-end gap-2 px-4 pb-3 pt-2 flex-shrink-0">
      <textarea
        ref={inputRef}
        rows={1}
        value={value}
        onChange={e => {
          setValue(e.target.value)
          // Auto-grow up to 3 lines
          e.target.style.height = 'auto'
          e.target.style.height = Math.min(e.target.scrollHeight, 84) + 'px'
        }}
        onKeyDown={onKey}
        placeholder={t(currentLang, 'placeholder')}
        disabled={isLocked}
        className="flex-1 text-sm resize-none outline-none bg-transparent"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(0,229,255,0.18)',
          borderRadius: '14px',
          color: 'rgba(255,255,255,0.9)',
          padding: '10px 14px',
          lineHeight: '1.5',
          transition: 'border-color 0.2s, box-shadow 0.2s',
          minHeight: '42px',
          maxHeight: '84px',
          scrollbarWidth: 'none',
        }}
        onFocus={e => {
          e.target.style.borderColor = 'rgba(0,229,255,0.5)'
          e.target.style.boxShadow = '0 0 16px rgba(0,229,255,0.1)'
        }}
        onBlur={e => {
          e.target.style.borderColor = 'rgba(0,229,255,0.18)'
          e.target.style.boxShadow = 'none'
        }}
      />
      <button
        onClick={submit}
        disabled={!canSend}
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 cursor-pointer"
        style={{
          background: canSend
            ? 'linear-gradient(135deg, #00E5FF, #00B8D4)'
            : 'rgba(0,229,255,0.07)',
          boxShadow: canSend ? '0 0 18px rgba(0,229,255,0.45)' : 'none',
          cursor: canSend ? 'pointer' : 'not-allowed',
          marginBottom: '1px',
        }}
        aria-label="Send"
      >
        <Send
          className="w-3.5 h-3.5"
          style={{ color: canSend ? '#000' : 'rgba(0,229,255,0.25)' }}
        />
      </button>
    </div>
  )
}
