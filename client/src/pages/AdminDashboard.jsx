import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { isAdminAuthenticated, setAdminAuthenticated, logoutAdmin } from '../utils/auth.js'
import { apiFetchJson, ApiError, normalizeImageUrl } from '../utils/api.js'
import { useToast } from '../context/ToastContext'

const sections = ['Overview', 'Blogs', 'Partners', 'Events', 'Jobs']

const AdminDashboard = () => {
  const navigate = useNavigate?.() || (() => {})
  const [active, setActive] = useState('Overview')
  const [posts, setPosts] = useState([])
  const [jobs, setJobs] = useState([])
  const [events, setEvents] = useState([])
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [partners, setPartners] = useState([])
  const [partnersLoading, setPartnersLoading] = useState(false)
  const [partnersError, setPartnersError] = useState(null)
  const [initialLoading, setInitialLoading] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [subscribersCount, setSubscribersCount] = useState(0)
  const [logoutLoading, setLogoutLoading] = useState(false)
  const { showToast } = useToast()

  const location = useLocation()

  useEffect(() => {
    let cancelled = false
    async function ensureSession() {
      if (isAdminAuthenticated()) return
      try {
        const data = await apiFetchJson('/api/admin/session', { credentials: 'include' })
        if (cancelled) return
        if (data && data.authenticated) {
          setAdminAuthenticated(true)
          return
        }
      } catch (e) {
        // ignore network errors here
      }
      try { navigate('/admin-login') } catch (e) { window.location.href = '/admin-login' }
    }
    ensureSession()
    return () => { cancelled = true }
  }, [])

  // no local toast; use global showToast

  useEffect(() => {
    let cancelled = false
    async function fetchBlogs() {
      setError(null)
      setLoading(true)
      try {
        const data = await apiFetchJson('/api/blogs', { credentials: 'include' })
        if (cancelled) return
        const list = Array.isArray(data) ? data : data.posts || []
        setPosts(list)
      } catch (err) {
        if (cancelled) return
        setError(err && err.message ? err.message : 'Failed to load blogs')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    if (active === 'Blogs') fetchBlogs()
    return () => { cancelled = true }
  }, [active])

  

  useEffect(() => {
    let cancelled = false
    async function fetchPartners() {
      setPartnersError(null)
      setPartnersLoading(true)
      try {
        const data = await apiFetchJson('/api/partners', { credentials: 'include' })
        if (cancelled) return
        const list = Array.isArray(data) ? data : data.partners || []
        setPartners(list)
      } catch (err) {
        if (cancelled) return
        try { console.error('fetchPartners error', err) } catch (e) {}
        // If unauthorized, redirect admin to login
        if (err && (err.isAuthError || (err instanceof ApiError && err.isAuthError))) {
          showToast('Please sign in to view partners', 'error')
          try { navigate('/admin-login') } catch (e) { window.location.href = '/admin-login' }
          return
        }
        setPartnersError(err && err.message ? err.message : 'Failed to load partners')
        showToast(err && err.message ? String(err.message) : 'Failed to load partners', 'error')
      } finally {
        if (!cancelled) setPartnersLoading(false)
      }
    }

    if (active === 'Partners') fetchPartners()
    return () => { cancelled = true }
  }, [active])


  useEffect(() => {
    let cancelled = false
    async function fetchJobs() {
      try {
        const data = await apiFetchJson('/api/jobs', { credentials: 'include' })
        if (cancelled) return
        const list = Array.isArray(data) ? data : []
        setJobs(list)
      } catch (err) {
        if (cancelled) return
        try { console.error('fetchJobs error', err) } catch (e) {}
      }
    }

    if (active === 'Jobs') fetchJobs()
    return () => { cancelled = true }
  }, [active])


  useEffect(() => {
    let cancelled = false
    async function fetchEvents() {
      try {
        const data = await apiFetchJson('/api/events', { credentials: 'include' })
        if (cancelled) return
        const list = Array.isArray(data) ? data : []
        setEvents(list)
      } catch (err) {
        if (cancelled) return
        try { console.error('fetchEvents error', err) } catch (e) {}
      }
    }

    if (active === 'Events') fetchEvents()
    return () => { cancelled = true }
  }, [active])

  // Also fetch blogs once at mount so overview counts show up
  useEffect(() => {
    let cancelled = false
    async function initialLoad() {
      setInitialLoading(true)
      try {
        const data = await apiFetchJson('/api/blogs')
        if (cancelled) return
        const list = Array.isArray(data) ? data : data.posts || []
        setPosts(list)
        // if navigated back with a newly created blog, optimistically add it
        if (location && location.state && location.state.newBlog) {
          const nb = location.state.newBlog
          setPosts(prev => {
            const exists = prev.find(p => p.id === nb.id)
            if (exists) return prev
            return [nb, ...prev]
          })
          // clear location state to avoid duplicate insert on further mounts
          try { window.history.replaceState({}, document.title) } catch (e) {}
        }

        // (removed team fetch — Team management removed from dashboard)
        // fetch partners for overview counts and handle optimistic insertion
        try {
          const d3 = await apiFetchJson('/api/partners')
          const pList = Array.isArray(d3) ? d3 : d3.partners || []
          setPartners(pList)
          if (location && location.state && location.state.newPartner) {
            const np = location.state.newPartner
            setPartners(prev => {
              const exists = prev.find(x => x.id === np.id)
              if (exists) return prev
              return [np, ...prev]
            })
            try { window.history.replaceState({}, document.title) } catch (e) {}
          }
        } catch (e) { /* ignore */ }
        // fetch jobs count for overview
        try {
          const d4 = await apiFetchJson('/api/jobs')
          const jList = Array.isArray(d4) ? d4 : []
          setJobs(jList)
        } catch (e) { /* ignore */ }

        // fetch events count for overview
        try {
          const d5 = await apiFetchJson('/api/events')
          const eList = Array.isArray(d5) ? d5 : []
          setEvents(eList)
        } catch (e) { /* ignore */ }

        // fetch subscribers count for overview (protected)
        try {
          const d6 = await apiFetchJson('/api/newsletter', { credentials: 'include' })
          const count = d6 && typeof d6.count === 'number' ? d6.count : (Array.isArray(d6) ? d6.length : 0)
          setSubscribersCount(count)
        } catch (e) { /* ignore */ }
      } catch (e) {
        // ignore
      } finally {
        if (!cancelled) setInitialLoading(false)
      }
    }
    initialLoad()
    return () => { cancelled = true }
  }, [])

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden flex">
        {/* Sidebar */}
        <nav className="w-64 bg-gray-800 text-white p-6">
          <h2 className="text-xl font-semibold mb-6">Admin</h2>
          <ul className="space-y-2">
            {sections.map(s => (
              <li key={s}>
                <button
                  onClick={() => setActive(s)}
                  className={`w-full text-left px-3 py-2 rounded ${active === s ? 'bg-gray-700' : 'hover:bg-gray-700/50'}`}
                >
                  {s}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Main content */}
        <section className="flex-1 p-8">
          <header className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">{active}</h1>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500">Signed in as Admin</div>
              <button
                onClick={async () => {
                  setLogoutLoading(true)
                  try {
                    const result = await logoutAdmin()
                    if (result.ok) {
                      showToast('Signed out successfully', 'success')
                      try { setAdminAuthenticated(false) } catch (e) {}
                      setTimeout(() => { try { navigate('/admin-login') } catch (e) { window.location.href = '/admin-login' } }, 800)
                      return
                    }
                    showToast(result.error || 'Failed to logout', 'error')
                  } catch (e) {
                    showToast('Network error during logout', 'error')
                  } finally {
                    setLogoutLoading(false)
                  }
                }}
                className={`px-3 py-1 rounded text-sm ${logoutLoading ? 'bg-gray-400 text-white cursor-wait' : 'bg-red-600 text-white hover:bg-red-700'}`}
                disabled={logoutLoading}
              >
                {logoutLoading ? 'Signing out…' : 'Logout'}
              </button>
            </div>
          </header>

          {/* overlay to disable UI when logout is in progress */}
          {logoutLoading && (
            <div className="fixed inset-0 z-40 bg-white/60 flex items-center justify-center">
              <div className="flex items-center gap-3">
                <svg className="animate-spin h-6 w-6 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                <div className="text-gray-700">Signing out…</div>
              </div>
            </div>
          )}

          {/* Content for Overview */}
          {active === 'Overview' && (
            <div className="text-gray-700">
              <p className="mb-4">Select a section from the left to manage content. You can create, edit or remove items for Blogs and Partners.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 border rounded">Blogs<br />
                    <span className="text-2xl font-semibold">{initialLoading ? (
                      <svg className="inline-block h-6 w-6 animate-spin text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
                    ) : (posts.length || 0)}</span>
                  </div>
                        <div className="p-4 border rounded">Partners<br />
                          <span className="text-2xl font-semibold">{initialLoading ? (
                            <svg className="inline-block h-6 w-6 animate-spin text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
                          ) : (partners.length || 0)}</span>
                        </div>
                        <div className="p-4 border rounded">Subscribers<br />
                          <span className="text-2xl font-semibold">{initialLoading ? (
                            <svg className="inline-block h-6 w-6 animate-spin text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
                          ) : (subscribersCount || 0)}</span>
                        </div>
                        <div className="p-4 border rounded">Events<br />
                          <span className="text-2xl font-semibold">{initialLoading ? (
                            <svg className="inline-block h-6 w-6 animate-spin text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
                          ) : (events.length || 0)}</span>
                        </div>
                        <div className="p-4 border rounded">Jobs<br />
                          <span className="text-2xl font-semibold">{initialLoading ? (
                            <svg className="inline-block h-6 w-6 animate-spin text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
                          ) : (jobs.length || 0)}</span>
                        </div>
              </div>

              {/* Admin Users management removed per request */}
            </div>
          )}

          {/* Blogs */}
          {active === 'Blogs' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">All Blogs</h2>
                <div className="flex items-center gap-3">
                  <div className="text-sm text-gray-600">{posts.length} total</div>
                  <select className="px-2 py-1 border rounded" value={perPage} onChange={e => { setPerPage(Number(e.target.value)); setPage(1) }}>
                    <option value={5}>5 / page</option>
                    <option value={10}>10 / page</option>
                    <option value={20}>20 / page</option>
                  </select>
                  <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={() => navigate('/admin/blogs/create')}>Create new Blog</button>
                </div>
              </div>

              {loading ? (
                <p>Loading blogs…</p>
              ) : error ? (
                <p className="text-red-600">{error}</p>
              ) : posts.length === 0 ? (
                <div className="p-6 border rounded text-gray-600">No blog posts available. <button className="ml-3 px-3 py-1 bg-green-600 text-white rounded" onClick={() => navigate('/admin/blogs/create')}>Create new Blog</button></div>
              ) : (
                <div className="space-y-4">
                  {(() => {
                    const start = (page - 1) * perPage
                    const pageItems = posts.slice(start, start + perPage)
                    return pageItems.map(p => {
                      const id = p.id || p._id
                      return (
                      <article key={id} className="p-4 border rounded flex items-start gap-4">
                        <div className="w-28 h-20 bg-gray-100 rounded overflow-hidden shrink-0">
                          {p.image ? (
                            <img src={normalizeImageUrl(p.image)} alt={`thumbnail-${p.title}`} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{p.title}</h3>
                          <div className="text-sm text-gray-600 mt-1">{p.shortDescription || (p.fullStory ? p.fullStory.slice(0, 200) + (p.fullStory.length > 200 ? '…' : '') : '')}</div>
                          <div className="text-xs text-gray-400 mt-2">{p.createdAt ? new Date(p.createdAt).toLocaleString() : ''}</div>
                        </div>
                          <div className="flex flex-col gap-2">
                          <button className="px-3 py-1 bg-yellow-400 rounded text-gray-900" onClick={() => navigate(`/admin/blogs/edit/${id}`)}>Edit</button>
                          <button className="px-3 py-1 bg-red-600 text-white rounded" onClick={async () => {
                            const ok = window.confirm('Delete this blog? This cannot be undone.')
                            if (!ok) return
                            const backup = posts
                            // optimistic remove using id fallback
                            setPosts(prev => prev.filter(x => (x.id || x._id) !== id))
                            try {
                              await apiFetchJson(`/api/blogs/${id}`, { method: 'DELETE', credentials: 'include' })
                              showToast('Blog deleted', 'success')
                            } catch (e) {
                              try { console.error('Delete blog failed', e) } catch (err) {}
                              const msg = e && e.message ? String(e.message) : 'Failed to delete'
                              showToast(msg, 'error')
                              setPosts(backup)
                            }
                          }}>Delete</button>
                        </div>
                      </article>
                    )})
                  })()}
                </div>
              )}

              {posts.length > perPage && (
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-gray-600">Page {page} of {Math.max(1, Math.ceil(posts.length / perPage))}</div>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1 border rounded" disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p - 1))}>Prev</button>
                    <button className="px-3 py-1 border rounded" disabled={page >= Math.ceil(posts.length / perPage)} onClick={() => setPage(p => Math.min(Math.ceil(posts.length / perPage), p + 1))}>Next</button>
                  </div>
                </div>
              )}
            </div>
          )}

            {/* Jobs */}
            {/* Events */}
            {active === 'Events' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">All Events</h2>
                  <div className="flex items-center gap-3">
                    <div className="text-sm text-gray-600">{events.length} total</div>
                    <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={() => navigate('/admin/events/create')}>Create new Event</button>
                  </div>
                </div>

                {events.length === 0 ? (
                  <div className="p-6 border rounded text-gray-600">No events available. <button className="ml-3 px-3 py-1 bg-green-600 text-white rounded" onClick={() => navigate('/admin/events/create')}>Create new Event</button></div>
                ) : (
                  <div className="space-y-4">
                    {events.map(ev => {
                      const id = ev._id || ev.id
                      return (
                        <article key={id} className="p-4 border rounded flex items-start gap-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{ev.title}</h3>
                            <div className="text-sm text-gray-600 mt-1">{ev.location || 'Location not specified'}</div>
                            <div className="text-xs text-gray-400 mt-2">{ev.startsAt ? new Date(ev.startsAt).toLocaleString() : ''}</div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <button className="px-3 py-1 bg-yellow-400 rounded text-gray-900" onClick={() => navigate(`/admin/events/edit/${id}`)}>Edit</button>
                            <button className="px-3 py-1 bg-red-600 text-white rounded" onClick={async () => {
                              const ok = window.confirm('Delete this event? This cannot be undone.')
                              if (!ok) return
                              const backup = events
                              setEvents(prev => prev.filter(x => (x.id || x._id) !== id))
                              try {
                                await apiFetchJson(`/api/events/${id}`, { method: 'DELETE', credentials: 'include' })
                                showToast('Event deleted', 'success')
                              } catch (e) {
                                try { console.error('Delete event failed', e) } catch (err) {}
                                const msg = e && e.message ? String(e.message) : 'Failed to delete'
                                showToast(msg, 'error')
                                setEvents(backup)
                              }
                            }}>Delete</button>
                          </div>
                        </article>
                      )
                    })}
                  </div>
                )}
              </div>
            )}

            {active === 'Jobs' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">All Jobs</h2>
                  <div className="flex items-center gap-3">
                    <div className="text-sm text-gray-600">{jobs.length} total</div>
                    <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={() => navigate('/admin/jobs/create')}>Create new Job</button>
                  </div>
                </div>

                {jobs.length === 0 ? (
                  <div className="p-6 border rounded text-gray-600">No job postings available. <button className="ml-3 px-3 py-1 bg-green-600 text-white rounded" onClick={() => navigate('/admin/jobs/create')}>Create new Job</button></div>
                ) : (
                  <div className="space-y-4">
                    {jobs.map(j => {
                      const id = j._id || j.id
                      return (
                        <article key={id} className="p-4 border rounded flex items-start gap-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{j.title}</h3>
                            <div className="text-sm text-gray-600 mt-1">{j.location || 'Location not specified'} — {j.type || 'Type not specified'}</div>
                            <div className="text-xs text-gray-400 mt-2">{j.postedAt ? new Date(j.postedAt).toLocaleString() : ''}</div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <button className="px-3 py-1 bg-yellow-400 rounded text-gray-900" onClick={() => navigate(`/admin/jobs/edit/${id}`)}>Edit</button>
                            <button className="px-3 py-1 bg-red-600 text-white rounded" onClick={async () => {
                              const ok = window.confirm('Delete this job? This cannot be undone.')
                              if (!ok) return
                              const backup = jobs
                              setJobs(prev => prev.filter(x => (x.id || x._id) !== id))
                              try {
                                await apiFetchJson(`/api/jobs/${id}`, { method: 'DELETE', credentials: 'include' })
                                showToast('Job deleted', 'success')
                              } catch (e) {
                                try { console.error('Delete job failed', e) } catch (err) {}
                                const msg = e && e.message ? String(e.message) : 'Failed to delete'
                                showToast(msg, 'error')
                                setJobs(backup)
                              }
                            }}>Delete</button>
                          </div>
                        </article>
                      )
                    })}
                  </div>
                )}
              </div>
            )}

          

          {/* Partners */}
          {active === 'Partners' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Partners / Donors</h2>
                <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={() => navigate('/admin/partners/create')}>Create new Partner</button>
              </div>
              {partnersLoading ? (
                <p>Loading partners…</p>
              ) : partnersError ? (
                <p className="text-red-600">{partnersError}</p>
              ) : partners.length === 0 ? (
                <div className="p-6 border rounded text-gray-600">No partners available. Use the button above to add new partners.</div>
              ) : (
                <div className="space-y-4">
                  {partners.map(p => (
                    <article key={p.id || p._id} className="p-4 border rounded flex items-start gap-4">
                      <div className="w-28 h-20 bg-gray-100 rounded overflow-hidden shrink-0">
                        {p.logo ? (
                          <img src={normalizeImageUrl(p.logo)} alt={`logo-${p.name}`} className="w-full h-full object-contain" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">No logo</div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{p.name}</h3>
                        <div className="text-sm text-gray-600 mt-1">{p.description ? (p.description.length > 200 ? p.description.slice(0, 200) + '…' : p.description) : ''}</div>
                        <div className="text-sm text-gray-500 mt-2">{p.website ? (<a href={p.website} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">{p.website}</a>) : null}</div>
                        <div className="text-xs text-gray-400 mt-2">{p.createdAt ? new Date(p.createdAt).toLocaleString() : ''}</div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button className="px-3 py-1 bg-yellow-400 rounded text-gray-900" onClick={() => navigate(`/admin/partners/edit/${p.id || p._id}`)}>Edit</button>
                          <button className="px-3 py-1 bg-red-600 text-white rounded" onClick={async () => {
                          const ok = window.confirm('Delete this partner? This cannot be undone.')
                          if (!ok) return
                          const backup = partners
                          setPartners(prev => prev.filter(x => (x.id || x._id) !== (p.id || p._id)))
                          try {
                            await apiFetchJson(`/api/partners/${p.id || p._id}`, { method: 'DELETE', credentials: 'include' })
                            showToast('Partner deleted', 'success')
                          } catch (e) {
                            try { console.error('Delete partner failed', e) } catch (err) {}
                            const msg = e && e.message ? String(e.message) : 'Failed to delete'
                            showToast(msg, 'error')
                            setPartners(backup)
                          }
                        }}>Delete</button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>
      </div>
      {/* global Toast provided by ToastProvider */}
    </main>
  )
}

export default AdminDashboard
