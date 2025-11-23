import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiFetchJson, ApiError, normalizeImageUrl } from '../utils/api.js'
import { useToast } from '../context/ToastContext'

const AdminCreatePartner = () => {
  const navigate = useNavigate?.() || (() => {})
  const [name, setName] = useState('')
  const [website, setWebsite] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { showToast } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    if (!name.trim()) return setError('Name is required')
    setLoading(true)
    try {
      let data
      // if a local file is selected, send multipart/form-data
      if (imageFile) {
        const form = new FormData()
        form.append('name', name.trim())
        form.append('website', website.trim())
        form.append('description', description.trim())
        form.append('logo', imageFile)
        data = await apiFetchJson('/api/partners', { method: 'POST', credentials: 'include', body: form })
      } else {
        const payload = { name: name.trim(), website: website.trim(), logo: '', description: description.trim() }
        data = await apiFetchJson('/api/partners', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
      }
      setLoading(false)
      showToast('Partner created', 'success')
      try { navigate('/admin', { state: { newPartner: data } }) } catch (e) { window.location.href = '/admin' }
    } catch (err) {
      setLoading(false)
      if (err instanceof ApiError) {
        const msg = err.message || (err.body && (err.body.error || err.body.message)) || 'Failed to create partner'
        setError(msg)
        showToast(msg, 'error')
      } else {
        setError('Network error')
        showToast('Network error', 'error')
      }
    }
  }

  useEffect(() => {
    return () => {
      if (preview) {
        try { URL.revokeObjectURL(preview) } catch (e) { /* ignore */ }
      }
    }
  }, [preview])

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4">Create Partner / Donor</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input value={name} onChange={e => setName(e.target.value)} className="w-full mt-1 p-2 border rounded" placeholder="Partner name" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Website (optional)</label>
            <input value={website} onChange={e => setWebsite(e.target.value)} className="w-full mt-1 p-2 border rounded" placeholder="https://example.org" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Logo (file)</label>
            <div className="mt-2">
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-3 flex items-center gap-3">
                <div className="w-24 h-16 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                  {preview ? (
                    <img src={typeof preview === 'string' ? normalizeImageUrl(preview) : preview} alt="preview" className="w-full h-full object-contain" />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4 4 4m6 8v-4a2 2 0 00-2-2h-6" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-700">Upload a logo file</div>
                  <div className="text-xs text-gray-500">PNG, JPG — max 5MB</div>
                </div>
                <div className="flex items-center gap-2">
                  <input id="partner-logo-input" type="file" accept="image/*" className="hidden" onChange={e => {
                    const f = e.target.files && e.target.files[0] ? e.target.files[0] : null
                    setImageFile(f)
                    if (f) {
                      try { setPreview(URL.createObjectURL(f)) } catch (err) { setPreview(null) }
                    } else setPreview(null)
                  }} />
                  <label htmlFor="partner-logo-input" className="px-3 py-2 bg-white border rounded text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">Choose file</label>
                  {preview && <button type="button" className="px-3 py-2 bg-red-50 text-red-600 border rounded text-sm" onClick={() => { setImageFile(null); setPreview(null) }}>Remove</button>}
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description (optional)</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} rows={6} className="w-full mt-1 p-2 border rounded" placeholder="Short description of the partner" />
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <div className="flex items-center gap-3">
            <button type="submit" disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded">{loading ? 'Creating…' : 'Create Partner'}</button>
            <button type="button" onClick={() => navigate('/admin')} className="text-sm text-gray-600 hover:underline">Cancel</button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default AdminCreatePartner
