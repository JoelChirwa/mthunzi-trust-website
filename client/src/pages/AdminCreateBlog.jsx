import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiFetch, normalizeImageUrl } from '../utils/api.js'

const AdminCreateBlog = () => {
  const navigate = useNavigate?.() || (() => {})
  const [title, setTitle] = useState('')
  const [shortDescription, setShortDescription] = useState('')
  const [fullStory, setFullStory] = useState('')
  const [location, setLocation] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [fieldErrors, setFieldErrors] = useState({})

  useEffect(() => {
    return () => {
      if (preview) {
        try { URL.revokeObjectURL(preview) } catch (e) { /* ignore */ }
      }
    }
  }, [preview])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    if (!title.trim()) return setError('Title is required')
    setLoading(true)
    try {
      // use FormData so we can send a local file optionally
      const form = new FormData()
      form.append('title', title.trim())
      form.append('shortDescription', shortDescription.trim())
      form.append('fullStory', fullStory.trim())
      form.append('location', location.trim())
      // require a file upload
      if (!imageFile) {
        setLoading(false)
        return setError('Please choose an image file to upload')
      }
      form.append('image', imageFile)

      const res = await apiFetch('/api/blogs', {
        method: 'POST',
        credentials: 'include',
        body: form
      })
      const data = await res.json().catch(() => ({}))
      setLoading(false)
      if (!res.ok) {
        if (data && data.fields) {
          setFieldErrors(data.fields)
          return
        }
        return setError(data && (data.error || data.message) ? (data.error || data.message) : 'Failed to create blog')
      }
      setFieldErrors({})
      // success - navigate back and pass new blog for optimistic UI
      try { navigate('/admin', { state: { newBlog: data } }) } catch (e) { window.location.href = '/admin' }
    } catch (err) {
      setLoading(false)
      setError('Network error')
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4">Create Blog</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input value={title} onChange={e => { setTitle(e.target.value); setFieldErrors(prev => ({ ...prev, title: undefined })) }} className="w-full mt-1 p-2 border rounded" placeholder="Blog title" required />
            {fieldErrors.title && <div className="text-sm text-red-600">{fieldErrors.title}</div>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Short description</label>
            <input value={shortDescription} onChange={e => { setShortDescription(e.target.value); setFieldErrors(prev => ({ ...prev, shortDescription: undefined })) }} className="w-full mt-1 p-2 border rounded" placeholder="A short excerpt" />
            {fieldErrors.shortDescription && <div className="text-sm text-red-600">{fieldErrors.shortDescription}</div>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Full story</label>
            <textarea value={fullStory} onChange={e => { setFullStory(e.target.value); setFieldErrors(prev => ({ ...prev, fullStory: undefined })) }} rows={8} className="w-full mt-1 p-2 border rounded" placeholder="Full blog content" />
            {fieldErrors.fullStory && <div className="text-sm text-red-600">{fieldErrors.fullStory}</div>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input value={location} onChange={e => { setLocation(e.target.value); setFieldErrors(prev => ({ ...prev, location: undefined })) }} className="w-full mt-1 p-2 border rounded" placeholder="Location (optional)" />
              {fieldErrors.location && <div className="text-sm text-red-600">{fieldErrors.location}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Image (file only)</label>
              <div className="mt-2">
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-3 flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                        {preview ? (
                          <img src={typeof preview === 'string' ? normalizeImageUrl(preview) : preview} alt="preview" className="w-full h-full object-cover" />
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4 4 4m6 8v-4a2 2 0 00-2-2h-6" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-700">Upload an image</div>
                        <div className="text-xs text-gray-500">PNG, JPG or GIF — max 5MB</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="file" accept="image/*" onChange={e => {
                      const f = e.target.files && e.target.files[0] ? e.target.files[0] : null
                      setImageFile(f)
                      if (f) {
                        try { setPreview(URL.createObjectURL(f)) } catch (err) { setPreview(null) }
                      } else {
                        setPreview(null)
                      }
                    }} className="hidden" id="image-upload-input" />
                    <label htmlFor="image-upload-input" className="px-3 py-2 bg-white border rounded text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">Choose file</label>
                    {preview && <button type="button" onClick={() => { setImageFile(null); setPreview(null); }} className="px-3 py-2 bg-red-50 text-red-600 border rounded text-sm">Remove</button>}
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-2">Please upload a local image file. URLs are not accepted.</div>
              </div>
            </div>
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <div className="flex items-center gap-3">
            <button type="submit" disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded">{loading ? 'Creating…' : 'Create Blog'}</button>
            <button type="button" onClick={() => navigate('/admin')} className="text-sm text-gray-600 hover:underline">Cancel</button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default AdminCreateBlog
