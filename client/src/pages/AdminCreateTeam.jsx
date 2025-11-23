import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiFetch } from '../utils/api.js'

const AdminCreateTeam = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [position, setPosition] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    return () => {
      if (preview) {
        try { 
          URL.revokeObjectURL(preview) 
        } catch (e) { 
          // ignore 
        }
      }
    }
  }, [preview])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    
    if (!name.trim()) return setError('Name is required')
    if (!position.trim()) return setError('Position is required')
    if (!imageFile) return setError('Please choose an image file to upload')

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('name', name.trim())
      // server expects 'role' field; send position as role
      formData.append('role', position.trim())
      formData.append('image', imageFile)

      const res = await apiFetch('/api/team', { 
        method: 'POST', 
        credentials: 'include', 
        body: formData 
      })
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData?.error || errorData?.message || 'Failed to create member')
      }

      const data = await res.json()
      
      // success — go back to admin dashboard and pass created member for optimistic UI
      navigate('/admin', { state: { newTeamMember: data } })
    } catch (err) {
      setError(err.message || 'Network error')
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null
    setImageFile(file)
    
    if (preview) {
      URL.revokeObjectURL(preview)
    }
    
    if (file) {
      try { 
        setPreview(URL.createObjectURL(file)) 
      } catch (err) { 
        setPreview(null) 
      }
    } else {
      setPreview(null)
    }
  }

  const handleRemoveImage = () => {
    if (preview) {
      URL.revokeObjectURL(preview)
    }
    setImageFile(null)
    setPreview(null)
    // Reset file input
    const fileInput = document.getElementById('team-photo-input')
    if (fileInput) {
      fileInput.value = ''
    }
  }

  const handleCancel = () => {
    navigate('/admin')
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Create Team Member</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input 
              id="name"
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" 
              placeholder="Full name" 
              required 
            />
          </div>

          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
              Position
            </label>
            <input 
              id="position"
              type="text" 
              value={position} 
              onChange={(e) => setPosition(e.target.value)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" 
              placeholder="Position or role" 
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Photo
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden shrink-0">
                  {preview ? (
                    <img 
                      src={preview} 
                      alt="Preview" 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-8 w-8 text-gray-400" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                      />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-700 mb-1">
                    {preview ? 'Photo selected' : 'Upload team member photo'}
                  </div>
                  <div className="text-xs text-gray-500 mb-3">
                    PNG, JPG, JPEG — max 5MB
                  </div>
                  <div className="flex items-center gap-2">
                    <input 
                      id="team-photo-input" 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleFileChange}
                    />
                    <label 
                      htmlFor="team-photo-input" 
                      className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 cursor-pointer transition-colors"
                    >
                      Choose File
                    </label>
                    {preview && (
                      <button 
                        type="button" 
                        className="px-4 py-2 bg-red-100 text-red-700 rounded-md text-sm font-medium hover:bg-red-200 transition-colors"
                        onClick={handleRemoveImage}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <div className="text-sm text-red-600">{error}</div>
            </div>
          )}

          <div className="flex items-center gap-3 pt-4">
            <button 
              type="submit" 
              disabled={loading}
              className="bg-green-600 text-white px-6 py-2 rounded-md font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Creating...' : 'Create Team Member'}
            </button>
            <button 
              type="button" 
              onClick={handleCancel}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default AdminCreateTeam