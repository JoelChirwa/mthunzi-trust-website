import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiFetchJson } from '../utils/api.js'
import { useToast } from '../context/ToastContext'

const AdminCreateEvent = () => {
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [startsAt, setStartsAt] = useState('')
  const [endsAt, setEndsAt] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()
  const { showToast } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const body = { title, location, description, startsAt, endsAt }
      await apiFetchJson('/api/events', { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' }, credentials: 'include' })
      showToast('Event created', 'success')
      try { navigate('/admin') } catch (e) { window.location.href = '/admin' }
    } catch (err) {
      showToast(err && err.message ? String(err.message) : 'Failed to create event', 'error')
    } finally { setSubmitting(false) }
  }

  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Create Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input className="w-full px-3 py-2 border rounded" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input className="w-full px-3 py-2 border rounded" value={location} onChange={e => setLocation(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea className="w-full px-3 py-2 border rounded" value={description} onChange={e => setDescription(e.target.value)} rows={6} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Starts At</label>
            <input type="datetime-local" className="w-full px-3 py-2 border rounded" value={startsAt} onChange={e => setStartsAt(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Ends At</label>
            <input type="datetime-local" className="w-full px-3 py-2 border rounded" value={endsAt} onChange={e => setEndsAt(e.target.value)} />
          </div>
        </div>
        <div>
          <button className="px-4 py-2 bg-green-600 text-white rounded" disabled={submitting}>{submitting ? 'Creating…' : 'Create Event'}</button>
        </div>
      </form>
    </main>
  )
}

export default AdminCreateEvent
