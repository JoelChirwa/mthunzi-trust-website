import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setAdminAuthenticated } from '../utils/auth.js'
import { apiFetch, apiFetchJson, ApiError } from '../utils/api.js'
import { useToast } from '../context/ToastContext'

const AdminLogin = () => {
  const navigate = useNavigate?.() || (() => {})
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phase, setPhase] = useState('initial') // initial | master | totp
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [masterValue, setMasterValue] = useState('')
  const [masterLoading, setMasterLoading] = useState(false)
  const [masterError, setMasterError] = useState(null)

  const [code, setCode] = useState('')
  const [codeLoading, setCodeLoading] = useState(false)
  const [codeError, setCodeError] = useState(null)
  const [resendLoading, setResendLoading] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)

  const { showToast } = useToast()
  async function handleLoginSubmit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await apiFetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      })
      const data = await res.json().catch(() => ({}))
      setLoading(false)
      if (!res.ok) {
        setError(data && (data.error || data.message) ? (data.error || data.message) : 'Login failed')
        return
      }
      // If server explicitly authenticated the session, finish login.
      if (data && data.authenticated) {
        setAdminAuthenticated(true)
        try { navigate('/admin') } catch (e) { window.location.href = '/admin' }
        return
      }

      // If server requested a specific challenge, honor it.
      if (data && data.challenge) {
        if (data.challenge === 'master') setPhase('master')
        else if (data.challenge === 'totp') setPhase('totp')
        return
      }

      // Default: require a TOTP code after a correct password.
      // This ensures the user must enter the Google Authenticator code.
      setPhase('totp')
      return
    } catch (err) {
      setLoading(false)
      setError('Network error. Is the server running?')
    }
  }

  async function handleSubmitMaster(e) {
    e.preventDefault()
    setMasterError(null)
    setMasterLoading(true)
    try {
      const res = await apiFetch('/api/admin/master', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, master: masterValue })
      })
      const data = await res.json().catch(() => ({}))
      setMasterLoading(false)
      if (!res.ok) {
        setMasterError(data && (data.error || data.message) ? (data.error || data.message) : 'Invalid master password')
        return
      }
      if (data && data.challenge === 'totp') {
        setPhase('totp')
        return
      }
      setAdminAuthenticated(true)
      try { navigate('/admin') } catch (e) { window.location.href = '/admin' }
    } catch (err) {
      setMasterLoading(false)
      setMasterError('Network error')
    }
  }

  async function handleSubmitCode(e) {
    e.preventDefault()
    setCodeError(null)
    setCodeLoading(true)
    try {
      const res = await apiFetch('/api/admin/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, code })
      })
      const data = await res.json().catch(() => ({}))
      setCodeLoading(false)
      if (!res.ok) {
        setCodeError(data && (data.error || data.message) ? (data.error || data.message) : 'Verification failed')
        return
      }
      setAdminAuthenticated(true)
      try { navigate('/admin') } catch (e) { window.location.href = '/admin' }
    } catch (err) {
      setCodeLoading(false)
      setCodeError('Network error')
    }
  }

  async function handleResendCode() {
    if (resendCooldown > 0) return
    setCodeError(null)
    setResendLoading(true)
    try {
      await apiFetchJson('/api/admin/resend-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setResendLoading(false)
      // ensure we remain on the TOTP phase
      setPhase('totp')
      // start 30s cooldown
      setResendCooldown(30)
      const interval = setInterval(() => {
        setResendCooldown(c => {
          if (c <= 1) { clearInterval(interval); return 0 }
          return c - 1
        })
      }, 1000)
      showToast && showToast('Verification code resent — check your email', 'success')
    } catch (err) {
      setResendLoading(false)
      let msg = 'Network error while resending code'
      if (err instanceof ApiError) msg = err.message || msg
      setCodeError(msg)
      showToast && showToast(msg, 'error')
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="w-full max-w-md bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl border border-gray-700 p-8">
        <h1 className="text-2xl font-bold mb-2">Admin Login</h1>
        <p className="text-sm text-gray-300 mb-6">Enter the administrator credentials to access the admin area.</p>

        {phase === 'initial' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="admin@example.org"
                aria-label="Admin email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-2">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Enter admin password"
                aria-label="Admin password"
              />
            </div>

            {error && <div className="text-sm text-red-300">{error}</div>}

            <div className="flex items-center justify-between">
              <button type="submit" disabled={loading} className="bg-yellow-400 text-gray-900 font-semibold px-4 py-2 rounded disabled:opacity-60">
                {loading ? 'Checking…' : 'Sign In'}
              </button>
              <a href="/" className="text-sm text-gray-300 hover:underline">Back to site</a>
            </div>
          </form>
        )}

        {phase === 'master' && (
          <form onSubmit={handleSubmitMaster} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Master Password</label>
              <input type="password" value={masterValue} onChange={e => setMasterValue(e.target.value)} className="w-full px-4 py-3 rounded bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400" placeholder="Master password" />
            </div>
            {masterError && <div className="text-sm text-red-300">{masterError}</div>}
            <div className="flex items-center justify-between">
              <button type="submit" disabled={masterLoading} className="bg-yellow-400 text-gray-900 font-semibold px-4 py-2 rounded disabled:opacity-60">{masterLoading ? 'Checking…' : 'Submit'}</button>
              <button type="button" onClick={() => { setPhase('initial'); setMasterValue(''); setMasterError(null) }} className="text-sm text-gray-300 hover:underline">Cancel</button>
            </div>
          </form>
        )}

        {phase === 'totp' && (
          <form onSubmit={handleSubmitCode} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Verification Code</label>
              <div className="text-xs text-gray-400 mb-2">Enter the 6-digit verification code we emailed to you (check your Gmail inbox and spam folder).</div>
              <input aria-label="Email verification code" type="text" inputMode="numeric" value={code} onChange={e => setCode(e.target.value)} className="w-full px-4 py-3 rounded bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400" placeholder="6-digit code" maxLength={6} />
            </div>
            {codeError && <div className="text-sm text-red-300">{codeError}</div>}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button type="submit" disabled={codeLoading} className="bg-yellow-400 text-gray-900 font-semibold px-4 py-2 rounded disabled:opacity-60">{codeLoading ? 'Verifying…' : 'Verify Code'}</button>
                <button type="button" onClick={handleResendCode} disabled={resendLoading} className="text-sm text-gray-300 hover:underline disabled:opacity-60">{resendLoading ? 'Resending…' : 'Resend code'}</button>
              </div>
              <button type="button" onClick={() => { setPhase('initial'); setCode(''); setCodeError(null) }} className="text-sm text-gray-300 hover:underline">Cancel</button>
            </div>
          </form>
        )}

      </div>
    </main>
  )
}

export default AdminLogin
