import { useChatbot } from './useChatbot'
import ChatbotIntro from './ChatbotIntro'
import ChatbotWindow from './ChatbotWindow'
import ChatbotBubble from './ChatbotBubble'

export default function ChatbotWidget() {
  const {
    messages,
    isTyping,
    isLocked,
    isOpen,
    showIntro,
    sidebarOpen,
    sessions,
    activeSessionId,
    currentLang,
    showStarters,
    starterPrompts,
    openChat,
    closeChat,
    handleUserMessage,
    startNewChat,
    openSession,
    deleteSession,
    setSidebarOpen,
    changeLang,
    handleLangSelect,
    showLangPicker,
  } = useChatbot()

  return (
    <>
      <ChatbotIntro show={showIntro} />
      <ChatbotWindow
        isOpen={isOpen}
        messages={messages}
        isTyping={isTyping}
        isLocked={isLocked}
        showStarters={showStarters}
        showLangPicker={showLangPicker}
        starterPrompts={starterPrompts}
        sidebarOpen={sidebarOpen}
        sessions={sessions}
        activeSessionId={activeSessionId}
        currentLang={currentLang}
        onClose={closeChat}
        onToggleSidebar={() => setSidebarOpen(prev => !prev)}
        onNewChat={startNewChat}
        onOpenSession={openSession}
        onDeleteSession={deleteSession}
        onChangeLang={changeLang}
        onLangSelect={handleLangSelect}
        onUserMessage={handleUserMessage}
      />
      <ChatbotBubble isOpen={isOpen} onClick={openChat} />
    </>
  )
}
