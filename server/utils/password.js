import crypto from 'crypto'
import bcrypt from 'bcryptjs'

function genSalt(len = 16) {
  return crypto.randomBytes(len).toString('hex')
}

function scryptAsync(password, salt, keyLen = 64) {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, keyLen, (err, derivedKey) => {
      if (err) return reject(err)
      resolve(derivedKey)
    })
  })
}

async function hash(password) {
  // Use scrypt-based hash for new users by default
  const salt = genSalt(16)
  const derived = await scryptAsync(password, salt)
  return `${salt}:${derived.toString('hex')}`
}

async function compare(password, stored) {
  if (!stored || typeof stored !== 'string') return false

  // If stored looks like a bcrypt hash, use bcrypt for comparison
  if (stored.startsWith('$2a$') || stored.startsWith('$2b$') || stored.startsWith('$2y$')) {
    try {
      return await bcrypt.compare(password, stored)
    } catch (e) {
      return false
    }
  }

  // Otherwise expect our scrypt format: salt:hex
  if (stored.indexOf(':') === -1) return false
  const [salt, keyHex] = stored.split(':')
  try {
    const derived = await scryptAsync(password, salt)
    const key = Buffer.from(keyHex, 'hex')
    if (key.length !== derived.length) return false
    return crypto.timingSafeEqual(key, derived)
  } catch (e) {
    return false
  }
}

export default { hash, compare }
