import crypto from 'crypto'

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
  const salt = genSalt(16)
  const derived = await scryptAsync(password, salt)
  return `${salt}:${derived.toString('hex')}`
}

async function compare(password, stored) {
  if (!stored || typeof stored !== 'string' || stored.indexOf(':') === -1) return false
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
