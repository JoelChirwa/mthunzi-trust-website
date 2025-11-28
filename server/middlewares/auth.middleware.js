import jwt from 'jsonwebtoken'
import Admin from '../models/admin.model.js'

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me'

export default async function verifyUser(req, res, next) {
  try {
    const auth = req.headers && (req.headers.authorization || req.headers.Authorization)
    if (!auth) return res.status(401).json({ message: 'Not authenticated' })

    const m = String(auth).match(/^Bearer\s+(.+)$/i)
    if (!m) return res.status(401).json({ message: 'Not authenticated' })

    const token = m[1]
    let payload
    try {
      payload = jwt.verify(token, JWT_SECRET)
    } catch (e) {
      return res.status(401).json({ message: 'Invalid token' })
    }

    const admin = await Admin.findById(payload.id)
    if (!admin) return res.status(401).json({ message: 'Invalid token' })

    req.user = {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      profileImage: admin.profileImage || null,
    }
    next()
  } catch (err) {
    console.error('verifyUser error:', err && err.message)
    return res.status(500).json({ message: 'Server error' })
  }
}
