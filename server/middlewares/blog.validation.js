import path from 'path'

export const validateCreateBlog = (req, res, next) => {
  const body = req.body || {}
  const title = (body.title || '').trim()
  const shortDescription = (body.shortDescription || '').trim()
  const fullStory = (body.fullStory || '').trim()

  if (!title) return res.status(400).json({ success: false, message: 'Title is required' })
  if (!shortDescription) return res.status(400).json({ success: false, message: 'Short description is required' })
  if (!fullStory) return res.status(400).json({ success: false, message: 'Full story is required' })

  // image may come from uploaded file or in the request body as a URL/path
  const hasFile = !!req.file
  const imageFromBody = typeof body.image === 'string' && body.image.trim() !== ''
  if (!hasFile && !imageFromBody) {
    return res.status(400).json({ success: false, message: 'Image is required (file upload or image path)' })
  }

  next()
}

export const validateUpdateBlog = (req, res, next) => {
  const body = req.body || {}

  // If fields are provided they must not be empty strings
  if (body.title !== undefined && String(body.title).trim() === '') {
    return res.status(400).json({ success: false, message: 'Title cannot be empty' })
  }
  if (body.shortDescription !== undefined && String(body.shortDescription).trim() === '') {
    return res.status(400).json({ success: false, message: 'Short description cannot be empty' })
  }
  if (body.fullStory !== undefined && String(body.fullStory).trim() === '') {
    return res.status(400).json({ success: false, message: 'Full story cannot be empty' })
  }

  // image may be updated with a file; an explicit empty string is allowed (handled by controller)
  next()
}

export default {
  validateCreateBlog,
  validateUpdateBlog,
}
