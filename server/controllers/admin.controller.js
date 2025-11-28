import Admin from '../models/admin.model.js'
import passwordUtil from '../utils/password.js'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me'

export async function adminLogin(req, res) {
  try {
    const { email, password } = req.body || {}
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required' })

    const admin = await Admin.findOne({ email: String(email).toLowerCase().trim() })
    if (!admin) return res.status(401).json({ message: 'Invalid email or password' })

    const ok = await passwordUtil.compare(password, admin.password)
    if (!ok) return res.status(401).json({ message: 'Invalid email or password' })

    const token = jwt.sign({ id: admin._id, role: admin.role }, JWT_SECRET, { expiresIn: '7d' })

    const adminSafe = {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      profileImage: admin.profileImage || null,
    }

    return res.json({ success: true, admin: adminSafe, token })
  } catch (err) {
    console.error('adminLogin error:', err && err.message)
    return res.status(500).json({ message: 'Server error' })
  }
}

export async function adminSession(req, res) {
  // This route expects verifyUser middleware to have set req.user
  try {
    if (!req.user) return res.status(401).json({ message: 'Not authenticated' })
    return res.json({ success: true, authenticated: true, admin: req.user })
  } catch (err) {
    console.error('adminSession error:', err && err.message)
    return res.status(500).json({ message: 'Server error' })
  }
}

export async function adminLogout(req, res) {
  // Stateless JWT logout: client should remove token. Provide a success response.
  try {
    return res.json({ success: true })
  } catch (err) {
    console.error('adminLogout error:', err && err.message)
    return res.status(500).json({ message: 'Server error' })
  }
}

export async function createAdmin(req, res) {
  try {
    const { email, password, name } = req.body || {}
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required' })

    const existing = await Admin.findOne({ email: String(email).toLowerCase().trim() })
    if (existing) return res.status(400).json({ message: 'Admin already exists' })

    const passwordHash = await passwordUtil.hash(password)
    const admin = new Admin({ email: String(email).toLowerCase().trim(), password: passwordHash, name: name || 'Admin' })
    await admin.save()
    return res.json({ success: true, message: 'Admin created' })
  } catch (err) {
    console.error('createAdmin error:', err && err.message)
    return res.status(500).json({ message: 'Server error' })
  }
}

export default { adminLogin, adminSession, adminLogout, createAdmin }
