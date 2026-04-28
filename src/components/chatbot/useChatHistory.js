import { useState, useCallback } from 'react'

const KEY      = 'upgpt-chat-history'
const MAX_SESS = 25

const persist = (sessions) => {
  try { localStorage.setItem(KEY, JSON.stringify(sessions)) } catch {}
}

const hydrate = () => {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]') } catch { return [] }
}

let _n = 0
const newId = () => `s_${Date.now()}_${++_n}`

export const useChatHistory = () => {
  const [sessions, setSessions] = useState(hydrate)

  const createSession = useCallback(() => {
    const id = newId()
    const session = {
      id,
      title: 'New conversation',
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    setSessions(prev => {
      const next = [session, ...prev].slice(0, MAX_SESS)
      persist(next)
      return next
    })
    return id
  }, [])

  const appendMessage = useCallback((sessionId, message, titleHint) => {
    setSessions(prev => {
      const next = prev.map(s => {
        if (s.id !== sessionId) return s
        const title =
          s.title === 'New conversation' && titleHint
            ? titleHint.slice(0, 42) + (titleHint.length > 42 ? '…' : '')
            : s.title
        return { ...s, messages: [...s.messages, message], title, updatedAt: Date.now() }
      })
      persist(next)
      return next
    })
  }, [])

  const deleteSession = useCallback((sessionId) => {
    setSessions(prev => {
      const next = prev.filter(s => s.id !== sessionId)
      persist(next)
      return next
    })
  }, [])

  const getSession = useCallback(
    (sessionId) => sessions.find(s => s.id === sessionId) ?? null,
    [sessions],
  )

  return { sessions, createSession, appendMessage, deleteSession, getSession }
}
