import { useState, useCallback, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { processMessage, getGreeting, getStarterPrompts } from './chatEngine'
import { useChatHistory } from './useChatHistory'

let _id = 0
const uid = () => `m${++_id}`

const getStoredLang = () => {
  try {
    const stored = localStorage.getItem('upgpt-lang')
    if (stored && ['en','sq','es','fr','de','it'].includes(stored)) return stored
  } catch {}
  return 'en'
}

export const useChatbot = () => {
  const navigate = useNavigate()
  const { sessions, createSession, appendMessage, deleteSession, getSession } = useChatHistory()

  const [messages,        setMessages]      = useState([])
  const [isTyping,        setIsTyping]       = useState(false)
  const [isLocked,        setIsLocked]       = useState(false)
  const [isOpen,          setIsOpen]         = useState(false)
  const [showIntro,       setShowIntro]      = useState(false)
  const [sidebarOpen,     setSidebarOpen]    = useState(false)
  const [currentLang,     setCurrentLang]    = useState(getStoredLang)
  const [activeSessionId, setActiveSession]  = useState(null)
  const [showStarters,    setShowStarters]   = useState(false)
  const [showLangPicker,  setShowLangPicker] = useState(false)

  const introShownRef   = useRef(false)
  const activeIdRef     = useRef(null)  // mirror for callbacks

  // ── Boot a session ────────────────────────────────────────────────────────
  const bootSession = useCallback((sessionId, existingMessages) => {
    activeIdRef.current = sessionId
    setActiveSession(sessionId)

    if (existingMessages && existingMessages.length > 0) {
      setMessages(existingMessages)
      setShowStarters(false)
      return
    }

    // Fresh session: ask language first, then greet
    setMessages([])
    setShowStarters(false)
    setShowLangPicker(false)
    setIsLocked(true)

    const langPrompt = {
      en: "Hi! 👋 Before we start — which language would you like to chat in?",
      sq: "Hej! 👋 Para se të fillojmë — në çfarë gjuhe dëshironi të bisedoni?",
      es: "¡Hola! 👋 Antes de empezar — ¿en qué idioma te gustaría chatear?",
      fr: "Salut! 👋 Avant de commencer — dans quelle langue souhaitez-vous discuter?",
      de: "Hallo! 👋 Bevor wir anfangen — in welcher Sprache möchten Sie chatten?",
      it: "Ciao! 👋 Prima di iniziare — in quale lingua vorresti chattare?",
    }
    const promptText = langPrompt[currentLang] || langPrompt.en

    setTimeout(() => setIsTyping(true), 350)
    setTimeout(() => {
      setIsTyping(false)
      const msg = { id: uid(), role: 'bot', text: promptText }
      setMessages([msg])
      appendMessage(sessionId, msg)
      setShowLangPicker(true)
      setIsLocked(false)
    }, 350 + 900)
  }, [currentLang, appendMessage])

  // ── New chat ──────────────────────────────────────────────────────────────
  const startNewChat = useCallback(() => {
    const id = createSession()
    bootSession(id, [])
    setSidebarOpen(false)
  }, [createSession, bootSession])

  // ── Load existing session ─────────────────────────────────────────────────
  const openSession = useCallback((sessionId) => {
    const session = getSession(sessionId)
    if (!session) return
    bootSession(sessionId, session.messages)
    setSidebarOpen(false)
  }, [getSession, bootSession])

  // ── Handle user message ───────────────────────────────────────────────────
  const handleUserMessage = useCallback((text) => {
    const trimmed = text.trim()
    if (!trimmed || isLocked) return

    setShowStarters(false)

    const userMsg = { id: uid(), role: 'user', text: trimmed }
    setMessages(prev => [...prev, userMsg])

    const sid = activeIdRef.current
    if (sid) appendMessage(sid, userMsg, trimmed)

    setIsLocked(true)

    const { text: reply, lang: detectedLang, typingMs, navigateTo } =
      processMessage(trimmed, messages, currentLang)

    // Persist detected language
    if (detectedLang !== currentLang) {
      setCurrentLang(detectedLang)
      try { localStorage.setItem('upgpt-lang', detectedLang) } catch {}
    }

    setTimeout(() => setIsTyping(true), 180)

    setTimeout(() => {
      setIsTyping(false)
      const botMsg = { id: uid(), role: 'bot', text: reply }
      setMessages(prev => [...prev, botMsg])
      if (sid) appendMessage(sid, botMsg)
      setIsLocked(false)

      if (navigateTo) setTimeout(() => navigate(navigateTo), 1600)
    }, 180 + typingMs)
  }, [isLocked, messages, currentLang, appendMessage, navigate])

  // ── Open / close ──────────────────────────────────────────────────────────
  const openChat = useCallback(() => {
    if (!introShownRef.current) {
      introShownRef.current = true
      setShowIntro(true)
      setTimeout(() => {
        setShowIntro(false)
        setIsOpen(true)
        if (!activeIdRef.current) startNewChat()
      }, 2900)
    } else {
      setIsOpen(prev => {
        if (!prev && !activeIdRef.current) startNewChat()
        return !prev
      })
    }
  }, [startNewChat])

  const closeChat = useCallback(() => setIsOpen(false), [])

  // ── Language change (from sidebar picker) ────────────────────────────────
  const changeLang = useCallback((lang) => {
    setCurrentLang(lang)
    try { localStorage.setItem('upgpt-lang', lang) } catch {}
  }, [])

  // ── Language selected from in-chat picker ─────────────────────────────────
  const handleLangSelect = useCallback((lang) => {
    setCurrentLang(lang)
    try { localStorage.setItem('upgpt-lang', lang) } catch {}
    setShowLangPicker(false)
    setIsLocked(true)

    const sid = activeIdRef.current
    const greetText = getGreeting(lang)

    setTimeout(() => setIsTyping(true), 300)
    setTimeout(() => {
      setIsTyping(false)
      const msg = { id: uid(), role: 'bot', text: greetText }
      setMessages(prev => [...prev, msg])
      if (sid) appendMessage(sid, msg)
      setShowStarters(true)
      setIsLocked(false)
    }, 300 + Math.min(1800, Math.max(700, greetText.length * 10)))
  }, [appendMessage])

  // ── Delete session + fallback to new chat ─────────────────────────────────
  const handleDeleteSession = useCallback((sessionId) => {
    deleteSession(sessionId)
    if (activeIdRef.current === sessionId) {
      activeIdRef.current = null
      setActiveSession(null)
      setMessages([])
      startNewChat()
    }
  }, [deleteSession, startNewChat])

  return {
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
    starterPrompts: getStarterPrompts(currentLang),
    openChat,
    closeChat,
    handleUserMessage,
    startNewChat,
    openSession,
    deleteSession: handleDeleteSession,
    setSidebarOpen,
    changeLang,
    handleLangSelect,
    showLangPicker,
  }
}
