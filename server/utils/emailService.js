import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create transporter - FIXED THE FUNCTION NAME
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

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
