import { sendEmail } from '../utils/emailService.js'

export const submitContact = async (req, res) => {
  const { firstName, lastName, email, subject, message } = req.body || {}
  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ error: 'Please provide your name, email and message.' })
  }

  const fullName = `${firstName} ${lastName}`
  const safeSubject = subject && subject.trim() ? `Contact form: ${subject.trim()}` : 'Contact form message'

  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; color: #222;">
      <div style="max-width:700px;margin:0 auto;border:1px solid #e6e6e6;padding:20px;border-radius:8px;background:#ffffff">
        <h2 style="margin:0 0 10px 0;color:#0f5132">New contact form submission</h2>
        <p style="margin:6px 0;color:#555">You have received a new message from the website contact form. Details below.</p>

        <table cellpadding="6" cellspacing="0" style="width:100%;border-collapse:collapse;margin-top:12px">
          <tr style="background:#f8f9fa"><td style="width:140px;font-weight:600;color:#333">Name</td><td>${String(fullName)}</td></tr>
          <tr><td style="font-weight:600;color:#333">Email</td><td><a href="mailto:${String(email)}">${String(email)}</a></td></tr>
          <tr style="background:#f8f9fa"><td style="font-weight:600;color:#333">Subject</td><td>${String(subject || '—')}</td></tr>
        </table>

        <div style="margin-top:14px">
          <div style="font-weight:600;color:#333;margin-bottom:6px">Message</div>
          <div style="white-space:pre-wrap;padding:12px;border-left:3px solid #e9ecef;background:#fbfbfb;color:#333;border-radius:4px">${String(message)}</div>
        </div>

        <div style="margin-top:18px;font-size:13px;color:#666">This message was sent from the contact form on your website.</div>
      </div>
    </div>
  `

  try {
    const to = process.env.CONTACT_NOTIFY_EMAIL || process.env.EMAIL_USERNAME || process.env.EMAIL_FROM

    // Send emails in background (non-blocking) so transient SMTP issues don't cause request timeouts.
    // Log any failures for operator visibility.
    sendEmail(to, safeSubject, html).catch((err) => {
      console.error('Failed to send admin notification email:', err && err.message ? err.message : err)
    })

    // Send confirmation to the submitter (best-effort). Use reply-to so admins can reply directly.
    const confirmSubject = 'Mthunzi Trust — we received your message'
    const confirmHtml = `
      <div style="font-family: Arial, Helvetica, sans-serif;color:#222;max-width:700px;margin:0 auto">
        <div style="padding:18px;border-radius:8px;background:#ffffff;border:1px solid #e6e6e6">
          <h2 style="margin-top:0;color:#0f5132">Thanks for contacting Mthunzi Trust</h2>
          <p style="color:#555">Hi ${String(fullName)},</p>
          <p style="color:#555">Thanks for reaching out. We have received your message and will respond as soon as possible.</p>
          <p style="color:#666;font-size:13px">Regards,<br/>Mthunzi Trust</p>
        </div>
      </div>
    `
    const replyTo = process.env.CONTACT_NOTIFY_EMAIL || process.env.EMAIL_USERNAME || process.env.EMAIL_FROM
    sendEmail(String(email), confirmSubject, confirmHtml, { replyTo }).catch((confirmErr) => {
      console.warn('Failed to send confirmation email to submitter:', confirmErr && confirmErr.message ? confirmErr.message : confirmErr)
    })

    // Return success quickly; emails are best-effort.
    return res.status(200).json({ message: 'Message received' })
  } catch (err) {
    console.error('contact submit error', err)
    return res.status(500).json({ error: 'Failed to send message' })
  }
}

export default { submitContact }
