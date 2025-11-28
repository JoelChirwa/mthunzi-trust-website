import Job from '../models/job.model.js'
import Newsletter from '../models/newsletter.model.js'
import { sendEmail } from '../utils/emailService.js'

export async function listJobs(req, res) {
  try {
    const jobs = await Job.find({}).sort({ postedAt: -1 })
    return res.json(jobs)
  } catch (err) {
    console.error('listJobs error', err && err.message)
    return res.status(500).json({ error: 'Failed to list jobs' })
  }
}

export async function getJob(req, res) {
  try {
    const id = req.params.id
    const job = await Job.findById(id)
    if (!job) return res.status(404).json({ error: 'Not found' })
    return res.json(job)
  } catch (err) {
    console.error('getJob error', err && err.message)
    return res.status(500).json({ error: 'Failed to fetch job' })
  }
}

export async function createJob(req, res) {
  try {
    const body = req.body || {}
    if (!body.title) return res.status(400).json({ error: 'Title is required' })
    const job = new Job({
      title: body.title,
      location: body.location,
      type: body.type,
      description: body.description,
      requirements: body.requirements,
      applyUrl: body.applyUrl,
      applyEmail: body.applyEmail,
      deadline: body.deadline ? new Date(body.deadline) : undefined,
      isActive: typeof body.isActive === 'boolean' ? body.isActive : true,
    })
    await job.save()
    // Notify subscribers about new vacancy (best-effort)
    (async () => {
      try {
        const subs = await Newsletter.find({})
        if (subs && subs.length > 0) {
          const adminReply = process.env.CONTACT_NOTIFY_EMAIL || process.env.EMAIL_USERNAME || process.env.EMAIL_FROM
          const subject = `New vacancy: ${job.title}`
          const html = `<p>Hello,</p><p>We have posted a new vacancy: <strong>${job.title}</strong>.</p><p>${job.description || ''}</p><p>${job.applyUrl ? `<a href="${job.applyUrl}">Apply online</a>` : job.applyEmail ? `Apply via email: ${job.applyEmail}` : ''}</p>`
          for (const s of subs) {
            try { await sendEmail(s.email, subject, html, { replyTo: adminReply }) } catch (e) { console.warn('Failed to send job notification to', s.email, e && e.message) }
          }
        }
      } catch (e) { console.warn('Job notify subscribers error', e && e.message) }
    })()

    return res.json({ success: true, job })
  } catch (err) {
    console.error('createJob error', err && err.message)
    return res.status(500).json({ error: 'Failed to create job' })
  }
}

export async function updateJob(req, res) {
  try {
    const id = req.params.id
    const body = req.body || {}
    const job = await Job.findById(id)
    if (!job) return res.status(404).json({ error: 'Not found' })

    job.title = body.title || job.title
    job.location = body.location || job.location
    job.type = body.type || job.type
    job.description = body.description || job.description
    job.requirements = body.requirements || job.requirements
    job.applyUrl = body.applyUrl || job.applyUrl
    job.applyEmail = body.applyEmail || job.applyEmail
    job.isActive = typeof body.isActive === 'boolean' ? body.isActive : job.isActive
    job.deadline = body.deadline ? new Date(body.deadline) : job.deadline

    await job.save()
    return res.json({ success: true, job })
  } catch (err) {
    console.error('updateJob error', err && err.message)
    return res.status(500).json({ error: 'Failed to update job' })
  }
}

export async function deleteJob(req, res) {
  try {
    const id = req.params.id
    const job = await Job.findById(id)
    if (!job) return res.status(404).json({ error: 'Not found' })
    await job.remove()
    return res.json({ success: true })
  } catch (err) {
    console.error('deleteJob error', err && err.message)
    return res.status(500).json({ error: 'Failed to delete job' })
  }
}

export default { listJobs, getJob, createJob, updateJob, deleteJob }
