import Newsletter from '../models/newsletter.model.js'
import { sendEmail } from '../utils/emailService.js'

export async function subscribe(req, res) {
  try {
    const { email, name } = req.body || {}
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({ error: 'Please provide a valid email address' })
    }

    const normalized = String(email).toLowerCase().trim()
    const existing = await Newsletter.findOne({ email: normalized })
    if (existing) return res.status(200).json({ success: true, message: 'Already subscribed' })

    const sub = new Newsletter({ email: normalized, name: name ? String(name).trim() : undefined })
    await sub.save()

    // Send confirmation email (best-effort)
    const confirmSubject = 'Thanks for subscribing to Mthunzi Trust'
    const confirmHtml = `
      <div style="font-family: Arial, Helvetica, sans-serif;color:#222;max-width:700px;margin:0 auto">
        <div style="padding:18px;border-radius:8px;background:#ffffff;border:1px solid #e6e6e6">
          <h2 style="margin-top:0;color:#0f5132">Thanks for subscribing</h2>
          <p style="color:#555">You have been added to the Mthunzi Trust newsletter list. We'll send occasional updates and opportunities to get involved.</p>
          <p style="color:#666;font-size:13px">If you didn't subscribe, you can ignore this email.</p>
        </div>
      </div>
    `

    const adminNotify = process.env.CONTACT_NOTIFY_EMAIL || process.env.EMAIL_USERNAME || process.env.EMAIL_FROM
    // Fire-and-forget; log on failure
    sendEmail(normalized, confirmSubject, confirmHtml, { replyTo: adminNotify }).catch(err => console.warn('Failed to send subscription confirmation:', err && err.message))

    // Also notify admins (best-effort)
    const adminSubject = `New newsletter subscriber: ${normalized}`
    const adminHtml = `<p>New subscriber: <strong>${normalized}</strong>${name ? ` (<em>${name}</em>)` : ''}</p>`
    if (adminNotify) sendEmail(adminNotify, adminSubject, adminHtml).catch(err => console.warn('Failed to notify admin about new subscriber:', err && err.message))

    return res.json({ success: true, message: 'Subscribed' })
  } catch (err) {
    console.error('subscribe error', err && err.message)
    return res.status(500).json({ error: 'Failed to subscribe' })
  }
}

export async function listSubscribers(req, res) {
  try {
    const list = await Newsletter.find().sort({ createdAt: -1 }).limit(1000).lean()
    const count = await Newsletter.countDocuments()
    // If caller asked for ?list=true return the list, otherwise only return the count
    if (String(req.query.list).toLowerCase() === 'true') {
      return res.json({ count, subscribers: list })
    }
    return res.json({ count })
  } catch (err) {
    console.error('listSubscribers error', err && err.message)
    return res.status(500).json({ error: 'Failed to list subscribers' })
  }
}

export default { subscribe }
