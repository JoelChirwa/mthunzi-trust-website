import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { apiFetch, normalizeImageUrl } from '../utils/api.js'

const AdminEditTeam = () => {
  const navigate = useNavigate?.() || (() => {})
  const { id } = useParams()
  const [name, setName] = useState('')
  const [position, setPosition] = useState('')
  const [bio, setBio] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [loadingInitial, setLoadingInitial] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoadingInitial(true)
      try {
        const res = await apiFetch(`/api/team/${id}`)
        if (!res.ok) throw new Error('Failed to load')
        const data = await res.json().catch(() => ({}))
        if (cancelled) return
        setName(data.name || '')
        setPosition(data.role || data.position || '')
        setBio(data.bio || '')
        setPreview(data.photo || data.image || null)
      } catch (e) {
        if (!cancelled) setError(e.message || 'Failed to load member')
      } finally {
        if (!cancelled) setLoadingInitial(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [id])

  useEffect(() => {
    return () => {
      if (preview && preview.startsWith('blob:')) {
        try { URL.revokeObjectURL(preview) } catch (e) {}
      }
    }
  }, [preview])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    if (!name.trim()) return setError('Name is required')
    if (!position.trim()) return setError('Position is required')

    setLoading(true)
    try {
      const form = new FormData()
      form.append('name', name.trim())
      form.append('role', position.trim())
      form.append('bio', bio.trim())
      if (imageFile) form.append('image', imageFile)

      const res = await apiFetch(`/api/team/${id}`, { method: 'PUT', credentials: 'include', body: form })
      const data = await res.json().catch(() => ({}))
      setLoading(false)
      if (!res.ok) return setError(data && (data.error || data.message) ? (data.error || data.message) : 'Failed to update member')

      // success — go back to admin dashboard and pass updated member for optimistic UI
      try { navigate('/admin', { state: { updatedTeamMember: data } }) } catch (e) { window.location.href = '/admin' }
    } catch (err) {
      setLoading(false)
      setError('Network error')
    }
  }

  if (loadingInitial) {
    return (
      <main className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4 animate-pulse" />
          <div className="space-y-3">
            <div className="h-10 bg-gray-200 rounded animate-pulse" />
            <div className="h-10 bg-gray-200 rounded animate-pulse" />
            <div className="h-36 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4">Edit Team Member</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input value={name} onChange={e => setName(e.target.value)} className="w-full mt-1 p-2 border rounded" placeholder="Full name" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Position</label>
            <input value={position} onChange={e => setPosition(e.target.value)} className="w-full mt-1 p-2 border rounded" placeholder="Position or role" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Bio (optional)</label>
            <textarea value={bio} onChange={e => setBio(e.target.value)} className="w-full mt-1 p-2 border rounded" rows={4} placeholder="Short bio" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Photo (file) — leave empty to keep existing</label>
            <div className="mt-2">
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-3 flex items-center gap-3">
                <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                  {preview ? (
                    <img src={typeof preview === 'string' ? normalizeImageUrl(preview) : preview} alt="preview" className="w-full h-full object-cover" />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4 4 4m6 8v-4a2 2 0 00-2-2h-6" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-700">Upload new photo</div>
                  <div className="text-xs text-gray-500">PNG, JPG — max 5MB</div>
                </div>
                <div className="flex items-center gap-2">
                  <input id="team-photo-input-edit" type="file" accept="image/*" className="hidden" onChange={e => {
                    const f = e.target.files && e.target.files[0] ? e.target.files[0] : null
                    setImageFile(f)
                    if (f) {
                      try { setPreview(URL.createObjectURL(f)) } catch (err) { setPreview(null) }
                    }
                  }} />
                  <label htmlFor="team-photo-input-edit" className="px-3 py-2 bg-white border rounded text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">Choose file</label>
                  {preview && preview.startsWith('blob:') && <button type="button" className="px-3 py-2 bg-red-50 text-red-600 border rounded text-sm" onClick={() => { setImageFile(null); setPreview(null) }}>Remove</button>}
                </div>
              </div>
            </div>
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <div className="flex items-center gap-3">
            <button type="submit" disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded">{loading ? 'Saving…' : 'Save Changes'}</button>
            <button type="button" onClick={() => navigate('/admin')} className="text-sm text-gray-600 hover:underline">Cancel</button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default AdminEditTeam
