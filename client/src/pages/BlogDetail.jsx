import React, { useEffect, useState, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { apiFetchJson, normalizeImageUrl, isValidObjectId } from '../utils/api.js'
import fallbackPosts from '../data/posts-fallback.json'
import { isAdminAuthenticated } from '../utils/auth.js'
import ConfirmModal from '../components/ConfirmModal'
import { useToast } from '../context/ToastContext'

const BlogDetail = () => {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const navigate = useNavigate?.() || (() => {})
  const [confirmOpen, setConfirmOpen] = useState(false)
  const { showToast } = useToast()

  useEffect(() => {
    let cancelled = false
    const ac = new AbortController()
    ;(async () => {
      try {
        setLoading(true)
        setError(null)
        // If id is not a Mongo ObjectId, skip calling the API and try the bundled fallback immediately.
        if (!isValidObjectId(id)) {
          const found = Array.isArray(fallbackPosts) ? fallbackPosts.find(p => String(p.id) === String(id)) : null
          if (found) {
            setPost(found)
            return
          }
          throw new Error('Invalid blog id')
        }

        const data = await apiFetchJson(`/api/blogs/${id}`, { signal: ac.signal })
        if (cancelled) return
        setPost(data)
      } catch (err) {
        if (cancelled) return
        // If API fails, try to find the post in a bundled fallback so the page can still render
        try {
          const found = Array.isArray(fallbackPosts) ? fallbackPosts.find(p => String(p.id) === String(id)) : null
          if (found) {
            console.warn('BlogDetail: using fallback post', err && err.message)
            setPost(found)
            setError(null)
            return
          }
        } catch (e) { /* ignore */ }

        setError(err.message || 'Failed to load blog')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    try { setIsAdmin(isAdminAuthenticated()) } catch (e) { setIsAdmin(false) }
    return () => { cancelled = true; ac.abort() }
  }, [id])

  function formatDate(d) {
    try { return new Date(d).toLocaleString() } catch (e) { return '' }
  }

  function readTime(text) {
    const words = (text || '').split(/\s+/).filter(Boolean).length
    const minutes = Math.max(1, Math.round(words / 200))
    return `${minutes} min read`
  }

  if (loading) return <div className="container mx-auto p-6">Loading…</div>
  if (error) return (
    <div className="container mx-auto p-6 text-red-600">
      <div>Error: {error}</div>
      <div className="mt-3">
        <button className="px-3 py-1 bg-green-500 text-white rounded" onClick={() => window.location.reload()}>Retry</button>
      </div>
    </div>
  )
  if (!post) return <div className="container mx-auto p-6">Not found</div>

  return (
    <main className="container mx-auto px-20 py-20">
      <Link to="/blog" className="text-sm text-green-600 hover:underline mb-4 inline-block">← Back to all blogs</Link>
      <article className="bg-white rounded-lg shadow p-8">
        {post.image && (
          <img
            src={normalizeImageUrl(post.image)}
            alt={post.title}
            className="w-full h-64 object-cover rounded mb-4"
            onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/800x400?text=No+Image' }}
          />
        )}
        <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
          <div className="flex-1">
            {post.author && <span>{post.author}</span>}
            <span className="ml-2">{post.location ? `${post.location} • ` : ''}{post.createdAt ? formatDate(post.createdAt) : ''}</span>
            <span className="ml-2">• {readTime(post.fullStory || post.shortDescription || '')}</span>
          </div>

          {isAdmin && (
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 bg-yellow-400 rounded text-gray-900" onClick={() => navigate(`/admin/blogs/edit/${post.id || post._id}`)}>Edit</button>
              <button className="px-3 py-1 bg-red-600 text-white rounded" onClick={() => setConfirmOpen(true)}>Delete</button>
            </div>
          )}
        </div>

        <div className="prose max-w-none text-gray-800" dangerouslySetInnerHTML={{ __html: (post.fullStory || post.shortDescription || '').replace(/\n/g, '<br/>') }} />

        <div className="mt-6 flex gap-3 items-center">
          <Link to="/blog" className="text-green-600 hover:underline">← Back to all blogs</Link>

          {/* Share menu */}
          <ShareMenu post={post} className="ml-auto" />
        </div>

        <ConfirmModal
          open={confirmOpen}
          title="Delete blog"
          desc="Are you sure you want to delete this blog? This action cannot be undone."
          onCancel={() => setConfirmOpen(false)}
          onConfirm={async () => {
            try {
              await apiFetchJson(`/api/blogs/${post.id || post._id}`, { method: 'DELETE', credentials: 'include' })
              showToast('Blog deleted', 'success')
              setConfirmOpen(false)
              setTimeout(() => { try { navigate('/blog') } catch (e) { window.location.href = '/blog' } }, 400)
            } catch (e) {
              try { console.error('Delete blog failed', e) } catch (err) {}
              // Structured error handling
              const msg = e && e.message ? String(e.message) : 'Failed to delete'
              if (e && (e.isAuthError || (e.status && (e.status === 401 || e.status === 403)))) {
                showToast('Not authorized to delete this blog — please login', 'error')
                try { navigate('/admin-login') } catch (err) { window.location.href = '/admin-login' }
              } else {
                showToast(msg, 'error')
              }
              setConfirmOpen(false)
            }
          }}
        />
        
      </article>
    </main>
  )
}

export default BlogDetail

function ShareMenu({ post, className = '' }) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const containerRef = useRef()
  const toggleRef = useRef()
  const itemRefs = useRef([])

  useEffect(() => {
    function onDoc(e) {
      if (!containerRef.current) return
      if (!containerRef.current.contains(e.target)) setOpen(false)
    }
    function onKey(e) {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current && toggleRef.current.focus()
      }
    }
    document.addEventListener('click', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  useEffect(() => {
    if (open) {
      // focus first item when opened
      setTimeout(() => { if (itemRefs.current[0]) itemRefs.current[0].focus() }, 0)
    }
  }, [open])

  const url = typeof window !== 'undefined' ? window.location.href : ''
  const title = post && post.title ? post.title : ''

  function openWindow(u) {
    window.open(u, '_blank', 'noopener,noreferrer,width=640,height=480')
    setOpen(false)
    toggleRef.current && toggleRef.current.focus()
  }

  async function doCopy() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      setOpen(false)
      toggleRef.current && toggleRef.current.focus()
    } catch (e) {
      alert('Copy failed')
    }
  }

  function shareFacebook() { openWindow(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`) }
  function shareWhatsApp() { openWindow(`https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}`) }
  function shareLinkedIn() { openWindow(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`) }
  function shareGmail() {
    const body = `${post && (post.shortDescription || post.fullStory || '')}\n\n${url}`
    window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`
    setOpen(false)
    toggleRef.current && toggleRef.current.focus()
  }

  // menu items config with simple SVG icons
  const items = [
    { id: 'facebook', label: 'Share on Facebook', action: shareFacebook, icon: (u) => (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="#1877F2"><path d="M22 12a10 10 0 10-11.5 9.9v-7h-2.2V12h2.2V9.7c0-2.2 1.3-3.4 3.3-3.4.95 0 1.95.17 1.95.17v2.14h-1.1c-1.08 0-1.42.67-1.42 1.35V12h2.42l-.39 2.9h-2.03v7A10 10 0 0022 12z"/></svg>
    )},
    { id: 'whatsapp', label: 'Share on WhatsApp', action: shareWhatsApp, icon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="#25D366"><path d="M20.5 3.5A11 11 0 0012 1a11 11 0 00-9.8 6.1A11 11 0 0012 23a11 11 0 008.5-3.5l1.6 1.6 1.1-4.2L22 15a11 11 0 00-1.5-11.5zM12 21A9 9 0 113 6.3 9 9 0 0112 21zm4.3-6.4c-.2-.1-1.2-.6-1.4-.6-.2 0-.4 0-.6.3s-.7.6-1 .9c-.1.2-.3.3-.6.2-.7-.2-2.7-1-3.7-2.8-.5-.8-.6-1.2-.6-1.4 0-.2 0-.5.4-.8.4-.3.9-.8 1.2-1.1.3-.2.4-.4.6-.6.2-.2.1-.4 0-.5-.1-.1-1-2.4-1.4-3.2-.4-.8-.8-.7-1.1-.7-.3 0-.6 0-1 .1-.4.1-1 .4-1.5 1.1-.5.6-1 1.7-1 3.7 0 2 .9 3.9 2.3 5.3 1.4 1.4 3.2 2.5 5.3 2.8 2.1.4 3.6.3 4.7-.3 1-.6 1.8-1.5 2.1-2.1.3-.6.3-1 .2-1.1-.1-.1-.4-.2-.6-.3z"/></svg>
    )},
    { id: 'gmail', label: 'Share via Gmail', action: shareGmail, icon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="#D44638"><path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 2l-8 5L4 6h16zm0 12H4V8l8 5 8-5v10z"/></svg>
    )},
    { id: 'linkedin', label: 'Share on LinkedIn', action: shareLinkedIn, icon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="#0A66C2"><path d="M4.98 3.5C4.98 4.6 4.1 5.5 3 5.5S1 4.6 1 3.5 1.88 1.5 3 1.5 4.98 2.4 4.98 3.5zM1 8.5h4v12H1v-12zM8.5 8.5h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4.1 0 4.9 2.6 4.9 6v6.4h-4v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7h-4v-12z"/></svg>
    )},
    { id: 'copy', label: copied ? 'Link copied' : 'Copy link', action: doCopy, icon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="#6B7280"><path d="M16 1H4a2 2 0 00-2 2v12h2V3h12V1zM20 5H8a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2zm0 16H8V7h12v14z"/></svg>
    )}
  ]

  function onKeyDown(e) {
    const idx = itemRefs.current.findIndex(el => el === document.activeElement)
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = (idx + 1) % items.length
      itemRefs.current[next] && itemRefs.current[next].focus()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const prev = (idx - 1 + items.length) % items.length
      itemRefs.current[prev] && itemRefs.current[prev].focus()
    }
  }

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <button
        ref={toggleRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="share-menu"
        onClick={() => setOpen(o => !o)}
        className="px-3 py-1 bg-gray-100 rounded flex items-center gap-2"
      >
        <span>Share</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 8a3 3 0 11-2.83-4M9 21V7" /></svg>
      </button>

      {open && (
        <div id="share-menu" role="menu" onKeyDown={onKeyDown} className="absolute right-0 mt-2 w-56 bg-white border rounded shadow-lg z-50">
          {items.map((it, i) => (
            <button
              key={it.id}
              ref={el => itemRefs.current[i] = el}
              role="menuitem"
              tabIndex={-1}
              onClick={it.action}
              className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center gap-3"
            >
              <span className="flex-none">{it.icon()}</span>
              <span className="truncate">{it.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// Confirm modal + toast usage handled below via component state

