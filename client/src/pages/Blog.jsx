import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { apiFetchJson, normalizeImageUrl } from '../utils/api.js'
import { useToast } from '../context/ToastContext'

const Blog = () => {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { showToast } = useToast()

  const postsPerPage = 6
  const totalPages = Math.max(1, Math.ceil(posts.length / postsPerPage))
  const start = (page - 1) * postsPerPage
  const visible = posts.slice(start, start + postsPerPage)

  useEffect(() => {
    const ac = new AbortController()
    const load = async () => {
      try {
        setLoading(true)
        setError(null)
        // fetch blogs from the API (use apiFetchJson so BASE is respected and errors are structured)
        const data = await apiFetchJson('/api/blogs', { signal: ac.signal })
        setPosts(Array.isArray(data) ? data : [])
        setPage(1) // reset to first page when new data arrives
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message)
          // Surface toast for immediate feedback
          try { showToast(`Failed to load blogs: ${err.message}`, 'error') } catch (e) {}
        }
      } finally {
        setLoading(false)
      }
    }
    load()
    return () => ac.abort()
  }, [])

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-center">Our Blog</h1>
      <p className="text-gray-700 mb-8 max-w-3xl mx-auto text-center">
        Learn about our stories, insights and updates from the work we do across Malawi’s communities through our Blog
      </p>

      {loading ? (
        <p className="text-center text-gray-600">Loading posts…</p>
      ) : error ? (
        <p className="text-center text-red-600">Error: {error}</p>
      ) : posts.length === 0 ? (
        <p className="text-center text-gray-600">No posts found.</p>
      ) : (
        <>
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {visible.map((post) => {
              const id = post.id || post._id
              return (
                <article key={id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <img
                    src={normalizeImageUrl(post.image) || 'https://via.placeholder.com/500x300?text=No+Image'}
                    alt={post.title || 'Post image'}
                    className="w-full h-48 object-cover"
                    onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/500x300?text=No+Image' }}
                  />
                  <div className="p-4">
                    <h2 className="font-semibold text-lg text-gray-900 mb-2">{post.title}</h2>
                    <p className="text-sm text-gray-600">{post.shortDescription || (post.fullStory ? (post.fullStory.slice(0, 200) + (post.fullStory.length > 200 ? '…' : '')) : '')}</p>
                    <div className="mt-3">
                      <Link to={`/blog/${id}`} className="text-green-600 hover:underline font-medium">Learn more →</Link>
                    </div>
                  </div>
                </article>
              )
            })}
          </section>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className={`px-4 py-2 rounded ${page === 1 ? 'bg-gray-200 text-gray-500' : 'bg-white border border-gray-300 hover:bg-gray-50'}`}
            >
              Previous
            </button>

            <span className="text-sm text-gray-600">Page {page} of {totalPages}</span>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className={`px-4 py-2 rounded ${page === totalPages ? 'bg-gray-200 text-gray-500' : 'bg-green-500 text-white hover:bg-green-600'}`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </main>
  )
}

export default Blog
