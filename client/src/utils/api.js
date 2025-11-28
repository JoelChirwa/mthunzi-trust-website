// client/src/utils/api.js
// Simple API helper used throughout the app. Uses Vite env `VITE_API_BASE` if provided.
// Default to a relative base so the client talks to the same origin by default
const API_BASE = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE)
  ? import.meta.env.VITE_API_BASE
  : '';

export async function apiFetch(path, options = {}) {
  // allow callers to pass absolute URLs directly
  const url = /^https?:\/\//i.test(path) ? path : (API_BASE.replace(/\/$/, '') + (path.startsWith('/') ? path : '/' + path));
  const method = (options && options.method) ? options.method.toUpperCase() : 'GET'

  // Attach token if available
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const fetchOptions = {
    ...options,
    headers,
  };

  try {
    console.debug('[apiFetch]', method, url, options && options.signal ? '(with signal)' : '')
    const res = await fetch(url, fetchOptions)
    return res
  } catch (err) {
    // Network-level failures (DNS, refused connection, CORS blocking, etc.)
    console.error('[apiFetch] Network error', method, url, err && err.message)
    throw err
  }
}

export function normalizeImageUrl(src) {
  if (!src) return '';
  if (/^https?:\/\//i.test(src)) return src;
  return API_BASE.replace(/\/$/, '') + (src.startsWith('/') ? src : '/' + src);
}

// Structured API error used by apiFetchJson
export class ApiError extends Error {
  constructor({ message, status, statusText, body } = {}) {
    super(message || statusText || 'API Error')
    this.name = 'ApiError'
    this.status = status
    this.statusText = statusText
    this.body = body
    this.isAuthError = status === 401 || status === 403
    this.isNotFound = status === 404
  }
}

// Helper that fetches and parses JSON (or text) and throws ApiError on non-OK responses.
// Options are the same as fetch options. You can pass `credentials: 'include'` when needed.
export async function apiFetchJson(path, options = {}) {
  const res = await apiFetch(path, options)
  let parsed = null
  let text = null
  try {
    parsed = await res.json().catch(() => null)
  } catch (e) {
    try { text = await res.text().catch(() => null) } catch (e2) { text = null }
  }

  if (!res.ok) {
    const body = parsed || (text ? { _raw: text } : null)
    const message = (parsed && (parsed.error || parsed.message)) || (text ? text : `${res.status} ${res.statusText}`)
    throw new ApiError({ message, status: res.status, statusText: res.statusText, body })
  }

  return parsed !== null ? parsed : text
}

// Rudimentary check for a MongoDB ObjectId (24 hex chars)
export function isValidObjectId(id) {
  if (!id) return false
  return /^[0-9a-fA-F]{24}$/.test(String(id))
}
