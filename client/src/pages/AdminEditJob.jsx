import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { apiFetchJson } from '../utils/api.js'
import { useToast } from '../context/ToastContext'

const AdminEditJob = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [type, setType] = useState('')
  const [description, setDescription] = useState('')
  const [requirements, setRequirements] = useState('')
  const [applyUrl, setApplyUrl] = useState('')
  const [applyEmail, setApplyEmail] = useState('')
  const [deadline, setDeadline] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()
  const { showToast } = useToast()

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      try {
        const job = await apiFetchJson(`/api/jobs/${id}`)
        if (cancelled) return
        setTitle(job.title || '')
        setLocation(job.location || '')
        setType(job.type || '')
        setDescription(job.description || '')
        setRequirements(job.requirements || '')
        setApplyUrl(job.applyUrl || '')
        setApplyEmail(job.applyEmail || '')
        setDeadline(job.deadline ? new Date(job.deadline).toISOString().slice(0,10) : '')
      } catch (err) {
        showToast('Failed to load job', 'error')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const body = { title, location, type, description, requirements, applyUrl, applyEmail, deadline }
      const data = await apiFetchJson(`/api/jobs/${id}`, { method: 'PUT', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' }, credentials: 'include' })
      showToast('Job updated', 'success')
      try { navigate('/admin') } catch (e) { window.location.href = '/admin' }
    } catch (err) {
      showToast(err && err.message ? String(err.message) : 'Failed to update job', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Edit Job</h1>
      {loading ? <div>Loading…</div> : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input className="w-full px-3 py-2 border rounded" value={title} onChange={e => setTitle(e.target.value)} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input className="w-full px-3 py-2 border rounded" value={location} onChange={e => setLocation(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Type</label>
              <input className="w-full px-3 py-2 border rounded" value={type} onChange={e => setType(e.target.value)} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea className="w-full px-3 py-2 border rounded" value={description} onChange={e => setDescription(e.target.value)} rows={6} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Requirements / Qualifications</label>
            <textarea className="w-full px-3 py-2 border rounded" value={requirements} onChange={e => setRequirements(e.target.value)} rows={4} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Apply URL</label>
              <input className="w-full px-3 py-2 border rounded" value={applyUrl} onChange={e => setApplyUrl(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Apply Email</label>
              <input className="w-full px-3 py-2 border rounded" value={applyEmail} onChange={e => setApplyEmail(e.target.value)} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Application Deadline</label>
            <input type="date" className="px-3 py-2 border rounded" value={deadline} onChange={e => setDeadline(e.target.value)} />
          </div>

          <div>
            <button className="px-4 py-2 bg-green-600 text-white rounded" disabled={submitting}>{submitting ? 'Updating…' : 'Update Job'}</button>
          </div>
        </form>
      )}
    </main>
  )
}

export default AdminEditJob
