// Simple validation middleware for create/update blog requests
export function validateCreateBlog(req, res, next) {
  const errors = {}
  const body = req.body || {}
  const hasFile = !!req.file

  if (!body.title || !String(body.title).trim()) errors.title = 'Title is required'
  if (!body.shortDescription || !String(body.shortDescription).trim()) errors.shortDescription = 'Short description is required'
  if (!body.fullStory || !String(body.fullStory).trim()) errors.fullStory = 'Full story is required'
  if (!hasFile && !(body.image && String(body.image).trim())) errors.image = 'Image is required'

  if (Object.keys(errors).length) {
    return res.status(400).json({ success: false, message: 'Validation failed', fields: errors })
  }
  return next()
}

export function validateUpdateBlog(req, res, next) {
  const body = req.body || {}
  const hasFile = !!req.file
  // For update, at least one updatable field should be provided
  const allowed = ['title', 'shortDescription', 'fullStory', 'location', 'image']
  const changes = Object.keys(body).filter(k => allowed.includes(k) && body[k] !== undefined && String(body[k]).trim() !== '')
  if (!hasFile && changes.length === 0) {
    // nothing to update
    return res.status(400).json({ success: false, message: 'No fields to update' })
  }
  return next()
}
