import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import net from 'net';

dotenv.config();

// Build transport options with sensible timeouts. Service (eg. SendGrid/Gmail) may be used via
// `EMAIL_SERVICE` or explicit host/port via `EMAIL_HOST` and `EMAIL_PORT`.
const connectionTimeout = Number(process.env.EMAIL_CONNECTION_TIMEOUT) || 10000
const greetingTimeout = Number(process.env.EMAIL_GREETING_TIMEOUT) || 10000
const socketTimeout = Number(process.env.EMAIL_SOCKET_TIMEOUT) || 10000

const transportOptions = {
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
  connectionTimeout,
  greetingTimeout,
  socketTimeout,
}

if (process.env.EMAIL_SERVICE) {
  transportOptions.service = process.env.EMAIL_SERVICE
} else if (process.env.EMAIL_HOST && process.env.EMAIL_PORT) {
  transportOptions.host = process.env.EMAIL_HOST
  transportOptions.port = Number(process.env.EMAIL_PORT)
  transportOptions.secure = process.env.EMAIL_SECURE === 'true' || transportOptions.port === 465
}

const transporter = nodemailer.createTransport(transportOptions)

// Verify transporter configuration (non-throwing) and log connection info (mask credentials)
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email transporter verify failed:', error && error.message ? error.message : error)
    if (transportOptions.host) {
      console.error(`→ SMTP host=${transportOptions.host} port=${transportOptions.port}`)
    } else if (transportOptions.service) {
      console.error(`→ Email service=${transportOptions.service}`)
    }
  } else {
    console.log('✅ Email server is ready to take messages')
  }
})

// Small TCP connectivity check to the SMTP host:port. Helps surface network blocks
const canConnectSMTP = (host, port, timeout = 5000) => {
  return new Promise((resolve, reject) => {
    if (!host || !port) return resolve(true) // nothing to check
    const socket = net.createConnection({ host, port }, () => {
      socket.end()
      resolve(true)
    })
    socket.on('error', (err) => {
      socket.destroy()
      reject(err)
    })
    socket.setTimeout(timeout, () => {
      socket.destroy()
      reject(new Error('connect_timeout'))
    })
  })
}

const wait = (ms) => new Promise((res) => setTimeout(res, ms))

const isRetryable = (err) => {
  if (!err) return false
  const code = err.code || ''
  const msg = (err.message || '').toLowerCase()
  return (
    code === 'ECONNECTION' ||
    code === 'ETIMEDOUT' ||
    code === 'EHOSTUNREACH' ||
    /timeout/.test(msg) ||
    /connection.*timed out/.test(msg)
  )
}

export const sendEmail = async (to, subject, html, opts = {}) => {
  const mailOptions = {
    from: opts.from || process.env.EMAIL_FROM,
    to,
    subject,
    html,
    ...opts,
  }

  // Try a quick connectivity probe when host/port are configured — this surfaces
  // network-level issues quickly (Render often blocks some outbound ports).
  if (transportOptions.host && transportOptions.port) {
    try {
      await canConnectSMTP(transportOptions.host, transportOptions.port, Math.min(connectionTimeout, 5000))
    } catch (connErr) {
      console.warn('⚠️ SMTP connectivity check failed:', connErr && connErr.message ? connErr.message : connErr)
      console.warn(`→ host=${transportOptions.host} port=${transportOptions.port} — this may be blocked by the host environment`)
      // continue — sendMail will report the canonical error (ETIMEDOUT) but we already logged helpful context
    }
  }

  const maxRetries = Number(process.env.EMAIL_MAX_RETRIES) || 2
  const baseDelay = Number(process.env.EMAIL_RETRY_BASE_DELAY_MS) || 500

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const info = await transporter.sendMail(mailOptions)
      console.log('✅ Email sent successfully', info && info.messageId ? info.messageId : '')
      return info
    } catch (error) {
      const retryable = isRetryable(error)
      const attemptNum = attempt + 1
      console.warn(`⚠️ Email send attempt ${attemptNum} failed:`, (error && error.message) || error)

      if (attempt < maxRetries && retryable) {
        const delay = baseDelay * Math.pow(2, attempt) // exponential backoff
        console.log(`→ Retrying email send in ${delay}ms (attempt ${attemptNum + 1}/${maxRetries + 1})`)
        await wait(delay)
        continue
      }

      console.error('❌ Error sending email:', error)
      throw error
    }
  }
}

export default transporter