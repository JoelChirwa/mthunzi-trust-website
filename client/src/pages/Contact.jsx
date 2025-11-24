import React, { useState } from 'react'
import { apiFetchJson, ApiError } from '../utils/api.js'
import { useToast } from '../context/ToastContext'
import { FaPhoneAlt, FaMapMarkerAlt, FaInbox, FaEnvelope, FaClock, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa'

const Contact = () => {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const { showToast } = useToast()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { firstName, lastName, email, message, subject } = form
    if (!firstName || !lastName || !email || !message) {
      const msg = 'Please fill in name, email and message.'
      setStatus({ type: 'error', message: msg })
      showToast(msg, 'error')
      return
    }
    setStatus(null)
    setLoading(true)
    try {
      await apiFetchJson('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ firstName, lastName, email, subject, message }) })
      const successMsg = 'Thanks — your message has been sent.'
      setStatus({ type: 'success', message: successMsg })
      // show toast after successful send
      showToast(successMsg, 'success')
      setForm({ firstName: '', lastName: '', email: '', subject: '', message: '' })
    } catch (err) {
      let msg = 'Failed to send message'
      if (err instanceof ApiError) msg = err.message || (err.body && (err.body.error || err.body.message)) || msg
      else if (err && err.message) msg = err.message
      setStatus({ type: 'error', message: msg })
      // show toast after failure
      showToast(msg, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="py-12 bg-green-900">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-400">Contact Us</h1>
          <p className="text-white/90 mt-3">To reach Mthunzi Trust, use the form to send a message or contact our offices directly using the details below.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start max-w-5xl mx-auto">
          {/* Left: Info card */}
          <aside className="bg-white/5 p-8 rounded-2xl shadow-md">
            <h2 className="text-2xl font-semibold text-yellow-400 mb-4">Contact Information</h2>

            <div className="space-y-6 text-white/90">
              <div className="flex gap-4">
                <FaMapMarkerAlt className="text-yellow-400 mt-1" />
                <div>
                  <div className="font-semibold">Lilongwe Office</div>
                    <div className="text-sm">Kawale, Lilongwe</div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <FaMapMarkerAlt className="text-yellow-400 mt-1" />
                  <div>
                    <div className="font-semibold">Blantyre Office</div>
                    <div className="text-sm">Chileka, Blantyre</div>
                </div>
              </div>

              <div className="flex gap-4">
                <FaPhoneAlt className="text-yellow-400 mt-1" />
                <div>
                  <div className="font-semibold">Phone (Lilongwe)</div>
                  <div className="text-sm">+265 1 234 567</div>
                </div>
              </div>

              <div className="flex gap-4">
                <FaPhoneAlt className="text-yellow-400 mt-1" />
                <div>
                  <div className="font-semibold">Phone (Blantyre)</div>
                  <div className="text-sm">+265 88 123 4567</div>
                </div>
              </div>

              <div className="flex gap-4">
                <FaInbox className="text-yellow-400 mt-1" />
                <div>
                  <div className="font-semibold">Postal</div>
                  <div className="text-sm">P. O. Box 12, Chileka, Blantyre</div>
                </div>
              </div>

              <div className="flex gap-4">
                <FaEnvelope className="text-yellow-400 mt-1" />
                <div>
                  <div className="font-semibold">Email</div>
                  <div className="text-sm">info@mthunzitrust.org</div>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <FaClock className="text-yellow-400" />
                <div className="text-sm">Mon — Fri: 08:00 — 16:30</div>
              </div>
              
              <div className="pt-4">
                <div className="text-sm font-semibold text-white/90 mb-2">Follow us</div>
                <div className="flex items-center gap-3">
                  <a href="https://www.facebook.com/profile.php?id=61553498614261" target="_blank" rel="noopener noreferrer" className="text-yellow-300 hover:text-white">
                    <FaFacebookF />
                  </a>
                      <a href="https://x.com/mthunzitrust" target="_blank" rel="noopener noreferrer" className="text-yellow-300 hover:text-white" aria-label="X">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                  <a href="https://www.instagram.com/mthunzitrust?igsh=MXZ1NzIxNHUxcmh3Nw==" target="_blank" rel="noopener noreferrer" className="text-yellow-300 hover:text-white">
                    <FaInstagram />
                  </a>
                  <a href="https://www.linkedin.com/company/mthunzi-trust/" target="_blank" rel="noopener noreferrer" className="text-yellow-300 hover:text-white">
                    <FaLinkedinIn />
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* Right: Form card */}
          <section className="bg-white p-8 rounded-2xl shadow-md">
            <h2 className="text-2xl font-semibold text-green-900 mb-4">Send us a message</h2>

            {status && (
              <div className={`mb-4 p-3 rounded ${status.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <span className={`text-sm ${status.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>{status.message}</span>
              </div>
            )}


            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First name</label>
                  <input id="firstName" name="firstName" value={form.firstName} onChange={handleChange} className="w-full px-4 py-3 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400" placeholder="First name" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last name</label>
                  <input id="lastName" name="lastName" value={form.lastName} onChange={handleChange} className="w-full px-4 py-3 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400" placeholder="Last name" />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input id="email" name="email" value={form.email} onChange={handleChange} className="w-full px-4 py-3 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400" placeholder="you@example.com" />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <select id="subject" name="subject" value={form.subject} onChange={handleChange} className="w-full px-4 py-3 rounded border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400">
                  <option value="">-- Select subject --</option>
                  <option value="Donation">Donation</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Volunteer">Volunteer</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea id="message" name="message" value={form.message} onChange={handleChange} className="w-full px-4 py-3 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 h-36" placeholder="Write your message"></textarea>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-4">
                <button type="submit" disabled={loading} aria-busy={loading} className="inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-green-900 font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded disabled:opacity-60 whitespace-nowrap text-center">
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
                <span className="text-sm text-gray-500 text-center">Or email us directly at <a className="text-blue-500 underline" href="mailto:info@mthunzitrust.org">info@mthunzitrust.org</a></span>
              </div>
            </form>
          </section>
        </div>
      </div>
    </main>
  )
}

export default Contact
