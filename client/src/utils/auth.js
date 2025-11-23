import { apiFetch } from './api.js'

export function isAdminAuthenticated() {
  try {
    return localStorage.getItem('admin_authenticated') === '1'
  } catch (e) {
    return false
  }
}

export function setAdminAuthenticated(val) {
  try {
    if (val) localStorage.setItem('admin_authenticated', '1')
    else localStorage.removeItem('admin_authenticated')
  } catch (e) {
    // ignore
  }
}

// Query server session endpoint and update local flag.
export async function checkAdminSession() {
  try {
    const res = await apiFetch('/api/admin/session', { credentials: 'include' })
    const data = await res.json().catch(() => ({}))
    const ok = res.ok && data && data.authenticated
    try { setAdminAuthenticated(!!ok) } catch (e) {}
    return !!ok
  } catch (e) {
    try { setAdminAuthenticated(false) } catch (err) {}
    return false
  }
}

export async function logoutAdmin() {
  try {
    const res = await apiFetch('/api/admin/logout', { method: 'POST', credentials: 'include' })
    // return object with ok and any parsed error message for callers
    let body = {}
    try { body = await res.json().catch(() => ({})) } catch (e) {}
    if (res.ok) {
      try { setAdminAuthenticated(false) } catch (e) {}
    }
    return { ok: res.ok, status: res.status, ...body }
  } catch (e) {
    return { ok: false, error: 'network' }
  }
}
