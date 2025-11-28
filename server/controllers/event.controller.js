import Event from '../models/event.model.js'
import Newsletter from '../models/newsletter.model.js'
import { sendEmail } from '../utils/emailService.js'

export async function listEvents(req, res) {
  try {
    // only return active upcoming events sorted by start date
    const events = await Event.find({ isActive: true }).sort({ startsAt: 1 })
    return res.json(events)
  } catch (err) {
    console.error('listEvents error', err && err.message)
    return res.status(500).json({ error: 'Failed to list events' })
  }
}

export async function getEvent(req, res) {
  try {
    const id = req.params.id
    const ev = await Event.findById(id)
    if (!ev) return res.status(404).json({ error: 'Not found' })
    return res.json(ev)
  } catch (err) {
    console.error('getEvent error', err && err.message)
    return res.status(500).json({ error: 'Failed to fetch event' })
  }
}

async function notifySubscribers(subject, html) {
  try {
    const subs = await Newsletter.find({})
    if (!subs || subs.length === 0) return
    const adminReply = process.env.CONTACT_NOTIFY_EMAIL || process.env.EMAIL_USERNAME || process.env.EMAIL_FROM
    // send to each subscriber (best-effort)
    for (const s of subs) {
      try {
        await sendEmail(s.email, subject, html, { replyTo: adminReply })
      } catch (e) {
        console.warn('Failed to send event notification to', s.email, e && e.message)
      }
    }
  } catch (e) {
    console.warn('notifySubscribers error', e && e.message)
  }
}

export async function createEvent(req, res) {
  try {
    const body = req.body || {}
    if (!body.title) return res.status(400).json({ error: 'Title is required' })
    const ev = new Event({
      title: body.title,
      location: body.location,
      description: body.description,
      startsAt: body.startsAt ? new Date(body.startsAt) : undefined,
      endsAt: body.endsAt ? new Date(body.endsAt) : undefined,
      isActive: typeof body.isActive === 'boolean' ? body.isActive : true,
    })
    await ev.save()

    // Notify subscribers about new upcoming event
    const subject = `New event: ${ev.title}`
    const html = `<p>Dear subscriber,</p><p>We've posted a new event: <strong>${ev.title}</strong>.</p><p>${ev.description || ''}</p><p>${ev.location ? `<strong>Location:</strong> ${ev.location}<br/>` : ''}${ev.startsAt ? `<strong>Starts:</strong> ${new Date(ev.startsAt).toLocaleString()}<br/>` : ''}</p><p>Visit our website for more details.</p>`
    notifySubscribers(subject, html)

    return res.json({ success: true, event: ev })
  } catch (err) {
    console.error('createEvent error', err && err.message)
    return res.status(500).json({ error: 'Failed to create event' })
  }
}

export async function updateEvent(req, res) {
  try {
    const id = req.params.id
    const body = req.body || {}
    const ev = await Event.findById(id)
    if (!ev) return res.status(404).json({ error: 'Not found' })

    ev.title = body.title || ev.title
    ev.location = body.location || ev.location
    ev.description = body.description || ev.description
    ev.startsAt = body.startsAt ? new Date(body.startsAt) : ev.startsAt
    ev.endsAt = body.endsAt ? new Date(body.endsAt) : ev.endsAt
    ev.isActive = typeof body.isActive === 'boolean' ? body.isActive : ev.isActive

    await ev.save()
    return res.json({ success: true, event: ev })
  } catch (err) {
    console.error('updateEvent error', err && err.message)
    return res.status(500).json({ error: 'Failed to update event' })
  }
}

export async function deleteEvent(req, res) {
  try {
    const id = req.params.id
    const ev = await Event.findById(id)
    if (!ev) return res.status(404).json({ error: 'Not found' })
    await ev.remove()
    return res.json({ success: true })
  } catch (err) {
    console.error('deleteEvent error', err && err.message)
    return res.status(500).json({ error: 'Failed to delete event' })
  }
}

export default { listEvents, getEvent, createEvent, updateEvent, deleteEvent }
