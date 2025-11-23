import React, { createContext, useContext, useState, useCallback } from 'react'
import Toast from '../components/Toast'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({ show: false, text: '', type: 'info' })

  const showToast = useCallback((text, type = 'success', ttl = 3000) => {
    setToast({ show: true, text, type })
    if (ttl > 0) setTimeout(() => setToast(t => ({ ...t, show: false })), ttl)
  }, [])

  const value = { showToast }

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toast show={toast.show} text={toast.text} type={toast.type} onClose={() => setToast(t => ({ ...t, show: false }))} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
