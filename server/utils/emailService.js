import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create transporter with optional timeout settings to avoid long blocking operations.
// Prefer explicit host/port/secure when available, otherwise fall back to `service`.
const transportOptions = {
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
  // optional timeouts (ms) - set via env or use sensible defaults
  connectionTimeout: Number(process.env.EMAIL_CONNECTION_TIMEOUT) || 10000,
  greetingTimeout: Number(process.env.EMAIL_GREETING_TIMEOUT) || 10000,
  socketTimeout: Number(process.env.EMAIL_SOCKET_TIMEOUT) || 10000,
  // use pooling for better connection reuse and to reduce intermittent connection issues
  pool: process.env.EMAIL_POOL === 'true' || true,
  maxConnections: Number(process.env.EMAIL_MAX_CONNECTIONS) || 5,
  maxMessages: Number(process.env.EMAIL_MAX_MESSAGES) || Infinity,
  // allow TLS configuration via env, keep default safe behavior
  requireTLS: process.env.EMAIL_REQUIRE_TLS === 'true' || false,
  tls: {
    rejectUnauthorized: process.env.EMAIL_TLS_REJECT_UNAUTHORIZED === 'false' ? false : true,
  },
}

if (process.env.EMAIL_HOST && process.env.EMAIL_PORT) {
  transportOptions.host = process.env.EMAIL_HOST
  transportOptions.port = Number(process.env.EMAIL_PORT)
  transportOptions.secure = process.env.EMAIL_SECURE === 'true' || transportOptions.port === 465
} else if (process.env.EMAIL_SERVICE) {
  transportOptions.service = process.env.EMAIL_SERVICE
}

const transporter = nodemailer.createTransport(transportOptions);

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.log('❌ Email transporter error:', error);
  } else {
    console.log('✅ Email server is ready to take messages');
  }
});

const wait = (ms) => new Promise((res) => setTimeout(res, ms));

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
  };

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

      // Non-retryable or exhausted retries — surface a clear log and throw
      console.error('❌ Error sending email:', error)
      throw error
    }
  }
};

export default transporter;
