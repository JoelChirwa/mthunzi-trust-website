import mongoose from 'mongoose'
import fs from 'fs'
import path from 'path'
import Blog from '../models/blog.model.js'

const uploadsDir = path.resolve(process.cwd(), 'uploads')

const isObjectId = (id) => mongoose.Types.ObjectId.isValid(String(id))

const sendServerError = (res, err) => {
  console.error(err && err.message ? err.message : err)
  return res.status(500).json({ success: false, message: 'Server error' })
}

const removeUploadFile = async (imagePath) => {
  try {
    if (!imagePath) return
    // Expect imagePath like '/uploads/filename.ext' or 'uploads/filename.ext'
    const normalized = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath
    if (!normalized.startsWith('uploads' + path.sep) && !normalized.startsWith('uploads/')) {
      // If path doesn't reference uploads, skip removing
      return
    }
    const filename = normalized.split(/[/\\]/).pop()
    if (!filename) return
    const filePath = path.join(uploadsDir, filename)
    if (fs.existsSync(filePath)) await fs.promises.unlink(filePath)
  } catch (e) {
    console.warn('Failed to remove upload file', imagePath, e && e.message)
  }
}

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 })
    return res.json(blogs)
  } catch (err) {
    return sendServerError(res, err)
  }
}

export const getBlog = async (req, res) => {
  const { id } = req.params
  if (!isObjectId(id)) return res.status(400).json({ success: false, message: 'Invalid blog id' })

  try {
    const blog = await Blog.findById(id)
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' })
    return res.json(blog)
  } catch (err) {
    return sendServerError(res, err)
  }
}

export const createBlog = async (req, res) => {
  try {
    const body = req.body || {}
    const imagePath = req.file ? `/uploads/${req.file.filename}` : (body.image || '')

    const blog = new Blog({
      title: body.title,
      shortDescription: body.shortDescription,
      fullStory: body.fullStory,
      location: body.location || '',
      image: imagePath
    })

    await blog.save()
    return res.status(201).json(blog)
  } catch (err) {
    return sendServerError(res, err)
  }
}

export const updateBlog = async (req, res) => {
  const { id } = req.params
  if (!isObjectId(id)) return res.status(400).json({ success: false, message: 'Invalid blog id' })

  try {
    const body = req.body || {}
    const newImagePath = req.file ? `/uploads/${req.file.filename}` : (body.image === '' ? undefined : body.image)

    const update = {}
    if (body.title !== undefined) update.title = body.title
    if (body.shortDescription !== undefined) update.shortDescription = body.shortDescription
    if (body.fullStory !== undefined) update.fullStory = body.fullStory
    if (body.location !== undefined) update.location = body.location
    if (newImagePath) update.image = newImagePath

    // If replacing image, remove previous file after updating
    const existing = await Blog.findById(id)
    if (!existing) return res.status(404).json({ success: false, message: 'Blog not found' })

    const updated = await Blog.findByIdAndUpdate(id, update, { new: true })

    if (newImagePath && existing.image && existing.image !== newImagePath) {
      // remove previous image file (best-effort)
      await removeUploadFile(existing.image)
    }

    return res.json(updated)
  } catch (err) {
    return sendServerError(res, err)
  }
}

export const deleteBlog = async (req, res) => {
  const { id } = req.params
  if (!isObjectId(id)) return res.status(400).json({ success: false, message: 'Invalid blog id' })

  try {
    const deleted = await Blog.findByIdAndDelete(id)
    if (!deleted) return res.status(404).json({ success: false, message: 'Blog not found' })
    // remove associated uploaded file (best-effort)
    if (deleted.image) await removeUploadFile(deleted.image)
    return res.json({ message: 'Blog deleted' })
  } catch (err) {
    return sendServerError(res, err)
  }
}
