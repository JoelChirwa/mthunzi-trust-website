import React, { useEffect, useRef } from 'react'

export default function ConfirmModal({ open, title = 'Confirm', desc = '', onCancel = () => {}, onConfirm = () => {} }) {
  const dialogRef = useRef(null)
  const cancelRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const el = dialogRef.current
    // focus the cancel button by default
    try { cancelRef.current && cancelRef.current.focus() } catch (e) {}

    function onKey(e) {
      if (e.key === 'Escape') {
        e.preventDefault()
        onCancel()
      }
      if (e.key === 'Tab') {
        // simple focus trap
        const focusable = el.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
        if (!focusable || focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    }

    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" aria-hidden={!open}>
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="confirm-title" className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <h3 id="confirm-title" className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">{desc}</p>
        <div className="flex justify-end gap-3">
          <button ref={cancelRef} onClick={onCancel} className="px-3 py-2 rounded bg-gray-100">Cancel</button>
          <button onClick={onConfirm} className="px-3 py-2 rounded bg-red-600 text-white">Delete</button>
        </div>
      </div>
    </div>
  )
}
