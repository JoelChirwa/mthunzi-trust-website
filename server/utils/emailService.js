import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create transporter with simplified configuration
// Using SERVICE=gmail lets Nodemailer handle the optimal settings automatically
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

// Simplified configuration - just use SERVICE if provided
if (process.env.EMAIL_SERVICE) {
  transportOptions.service = process.env.EMAIL_SERVICE;
} else if (process.env.EMAIL_HOST && process.env.EMAIL_PORT) {
  // Fallback to explicit host/port if SERVICE is not set
  transportOptions.host = process.env.EMAIL_HOST;
  transportOptions.port = Number(process.env.EMAIL_PORT);
  transportOptions.secure = process.env.EMAIL_SECURE === 'true' || transportOptions.port === 465;
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
    console.log('✅ Email sent successfully', info && info.messageId ? info.messageId : '');
    return info;
  } catch (error) {
    console.log('❌ Error sending email:', error);
    throw error;
  }
};

export default transporter;