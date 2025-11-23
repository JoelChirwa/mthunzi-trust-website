import React, { useEffect } from 'react'

export default function Toast({ show, text = '', type = 'info', onClose = () => {} }) {
  useEffect(() => {
    if (!show) return
    const id = setTimeout(() => onClose(), 3000)
    return () => clearTimeout(id)
  }, [show])

  if (!show) return null
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className={`px-4 py-2 rounded shadow-md text-sm ${type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
        {text}
      </div>
    </div>
  )
}
