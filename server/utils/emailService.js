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

export const sendEmail = async (to, subject, html, opts = {}) => {
  const mailOptions = {
    from: opts.from || process.env.EMAIL_FROM,
    to,
    subject,
    html,
    ...opts,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully', info && info.messageId ? info.messageId : '')
    return info
  } catch (error) {
    console.log('❌ Error sending email:', error);
    throw error
  }
};

export default transporter;
