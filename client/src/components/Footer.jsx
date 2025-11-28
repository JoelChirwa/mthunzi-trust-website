import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaInbox, FaFacebookF, FaInstagram, FaLinkedin } from 'react-icons/fa'
import logo from '../assets/logo.jpg'
import { apiFetchJson } from '../utils/api.js'
import { useToast } from '../context/ToastContext'



const Footer = () => {
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { showToast } = useToast()

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!email || !email.includes('@')) return showToast('Please enter a valid email', 'error')
    setSubmitting(true)
    try {
      const data = await apiFetchJson('/api/newsletter', { method: 'POST', body: JSON.stringify({ email }), headers: { 'Content-Type': 'application/json' } })
      showToast(data && data.message ? String(data.message) : 'Subscribed', 'success')
      setEmail('')
    } catch (err) {
      try { console.error('newsletter subscribe failed', err) } catch (e) {}
      const msg = (err && err.message) ? String(err.message) : 'Failed to subscribe'
      showToast(msg, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3">
              <Link to="/" className="inline-flex items-center gap-3">
                <img src={logo} alt="Mthunzi Trust logo" className="w-12 h-12 rounded-md object-cover" />
                <h3 className="text-xl font-bold">Mthunzi Trust</h3>
              </Link>
            </div>

            <p className="text-sm text-gray-300 mt-3 max-w-sm">
              Youth-led nonprofit strengthening communities through education, livelihoods, environment and SRHR.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/" className="hover:underline">Home</Link></li>
              <li><Link to="/about" className="hover:underline">About</Link></li>
              <li><Link to="/careers" className="hover:underline">Careers</Link></li>
              <li><Link to="/programs" className="hover:underline">Programs</Link></li>
              <li><Link to="/blog" className="hover:underline">Blog</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <FaMapMarkerAlt className="mt-1 text-green-400" />
                <span><strong>Lilongwe Office:</strong> Lilongwe, Malawi</span>
              </li>
              <li className="flex items-start gap-2">
                <FaMapMarkerAlt className="mt-1 text-green-400" />
                <span><strong>Blantyre Office:</strong> Chileka, Blantyre</span>
              </li>
              <li className="flex items-start gap-2">
                <FaInbox className="mt-1 text-green-400" />
                <span>P. O. Box 12, Chileka, Blantyre</span>
              </li>
              <li className="flex items-center gap-2"><FaEnvelope className="text-green-400" /><a href="mailto:info@mthunzitrust.org" className="hover:underline">info@mthunzitrust.org</a></li>
              <li className="flex items-center gap-2"><FaPhone className="text-green-400" /><span><strong>Lilongwe:</strong> <a href="tel:+265996654088" className="hover:underline">+265 996 654 088</a></span></li>
              <li className="flex items-center gap-2"><FaPhone className="text-green-400" /><span><strong>Blantyre:</strong> <a href="tel:+265888919670" className="hover:underline">+265 888 919 670</a></span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Stay connected</h4>
            <p className="text-sm text-gray-300 mb-4">Subscribe for updates about our work, events and opportunities to get involved.</p>

            <form onSubmit={onSubmit} className="items-center gap-2 flex-wrap sm:flex-nowrap">
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <input
                id="footer-email"
                type="email"
                placeholder="Email address"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 min-w-0 py-2 px-3 rounded-md text-gray-900 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 mb-3"
              />
              <button type="submit" disabled={submitting} className="bg-green-500 text-white px-4 py-2 rounded-md sm:mt-0">{submitting ? 'Subscribing…' : 'Subscribe'}</button>
            </form>

            <div className="flex items-center gap-3 mt-6">
              <a href="https://www.facebook.com/profile.php?id=61553498614261" aria-label="Facebook" className="text-gray-300 hover:text-white" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
              <a href="https://x.com/MthunziTrust/status/1977639024069316884?t=ezrtOV9r-I-U9wi8VzmfsQ&s=19" aria-label="X" className="text-gray-300 hover:text-white" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 6L6 18" />
                  <path d="M6 6l12 12" />
                </svg>
              </a>
              <a href="https://www.instagram.com/mthunzitrust?igsh=MXZ1NzIxNHUxcmh3Nw==" aria-label="Instagram" className="text-gray-300 hover:text-white" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://www.linkedin.com/company/mthunzi-trust/" aria-label="LinkedIn" className="text-gray-300 hover:text-white" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-800 pt-6 text-sm text-gray-400 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/admin" target='blank' className="hover:underline">
            <span>© {new Date().getFullYear()} Mthunzi Trust. All rights reserved.</span>
          </Link>
            <p>Built with ❤️ by Joel Chirwa</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:underline">Privacy</Link>
            <Link to="/terms" className="hover:underline">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
