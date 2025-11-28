import React, { useEffect, useState } from 'react'
import { apiFetchJson } from '../utils/api.js'

const Events = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      try {
        const data = await apiFetchJson('/api/events')
        if (cancelled) return
        setEvents(Array.isArray(data) ? data : [])
      } catch (err) {
        if (cancelled) return
        setError(err && err.message ? String(err.message) : 'Failed to load events')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Events & Activities</h1>
      <p className="mb-6 text-gray-700">Upcoming events hosted or supported by Mthunzi Trust.</p>

      {loading ? (
        <div>Loading…</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : events.length === 0 ? (
        <div className="p-6 border rounded text-gray-600">No upcoming events at the moment.</div>
      ) : (
        <div className="space-y-4">
          {events.map(ev => {
            const id = ev._id || ev.id
            return (
              <article key={id} className="p-4 border rounded">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{ev.title}</h3>
                    <div className="text-sm text-gray-600">{ev.location || 'Location not specified'}</div>
                  </div>
                  <div className="text-sm text-gray-500">{ev.startsAt ? new Date(ev.startsAt).toLocaleString() : ''}</div>
                </div>
                <div className="mt-3 text-gray-700">{ev.description ? (ev.description.length > 400 ? ev.description.slice(0, 400) + '…' : ev.description) : ''}</div>
              </article>
            )
          })}
        </div>
      )}
    </main>
  )
}

export default Events
