import { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ChatSidebar from './ChatSidebar'
import ChatbotHeader from './ChatbotHeader'
import ChatMessage from './ChatMessage'
import TypingIndicator from './TypingIndicator'
import StarterPrompts from './StarterPrompts'
import LanguagePicker from './LanguagePicker'
import ChatInput from './ChatInput'

export default function ChatbotWindow({
  isOpen,
  messages,
  isTyping,
  isLocked,
  showStarters,
  showLangPicker,
  starterPrompts,
  sidebarOpen,
  sessions,
  activeSessionId,
  currentLang,
  onClose,
  onToggleSidebar,
  onNewChat,
  onOpenSession,
  onDeleteSession,
  onChangeLang,
  onLangSelect,
  onUserMessage,
}) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping, showStarters])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16, transformOrigin: 'bottom right' }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed z-[9997] flex"
          style={{
            bottom: '90px',
            right: '22px',
            width: '680px',
            maxWidth: 'calc(100vw - 28px)',
            height: '580px',
            maxHeight: 'calc(100vh - 120px)',
            background: 'rgba(2,2,10,0.96)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            border: '1px solid rgba(0,229,255,0.16)',
            borderRadius: '20px',
            boxShadow:
              '0 0 0 1px rgba(0,229,255,0.04) inset, 0 0 60px rgba(0,229,255,0.06), 0 32px 70px rgba(0,0,0,0.9)',
            overflow: 'hidden',
          }}
        >
          {/* Top edge glow */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '15%',
              right: '15%',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.65), transparent)',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />

          {/* Sidebar */}
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 200, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                style={{ overflow: 'hidden', flexShrink: 0 }}
              >
                <ChatSidebar
                  sessions={sessions}
                  activeSessionId={activeSessionId}
                  currentLang={currentLang}
                  onNewChat={onNewChat}
                  onOpenSession={onOpenSession}
                  onDeleteSession={onDeleteSession}
                  onChangeLang={onChangeLang}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chat area */}
          <div className="flex flex-col flex-1 min-w-0">
            <ChatbotHeader
              currentLang={currentLang}
              sidebarOpen={sidebarOpen}
              onToggleSidebar={onToggleSidebar}
              onClose={onClose}
            />

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto px-4 pt-4 pb-2"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(0,229,255,0.15) transparent',
              }}
            >
              {messages.map(msg => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={bottomRef} />
            </div>

            {/* Language picker — shown on fresh session */}
            <LanguagePicker visible={showLangPicker} onSelect={onLangSelect} />

            {/* Starter prompts */}
            <StarterPrompts
              prompts={starterPrompts}
              visible={showStarters && messages.length <= 2}
              onSelect={onUserMessage}
            />

            {/* Divider */}
            <div style={{ height: '1px', background: 'rgba(0,229,255,0.07)', margin: '0 16px', flexShrink: 0 }} />

            {/* Input — always visible */}
            <ChatInput
              currentLang={currentLang}
              onSend={onUserMessage}
              isLocked={isLocked}
            />

            {/* Branding */}
            <p
              className="text-center pb-2 flex-shrink-0"
              style={{ fontSize: '10px', color: 'rgba(255,255,255,0.15)', letterSpacing: '0.04em' }}
            >
              Powered by <span style={{ color: 'rgba(0,229,255,0.4)' }}>UpGpt Systems</span>
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
