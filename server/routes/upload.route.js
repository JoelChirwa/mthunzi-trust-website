import express from 'express'
import multer from 'multer'
import path from 'path'

const router = express.Router()
const uploadsDir = path.resolve(process.cwd(), 'uploads')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir)
  },
  filename: function (req, file, cb) {
    const safeName = file.originalname.replace(/\s+/g, '-')
    cb(null, `${Date.now()}-${safeName}`)
  }
})

const upload = multer({ storage })

// POST /api/uploads - field name: `file`
router.post('/', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' })
  const urlPath = `/uploads/${req.file.filename}`
  res.status(201).json({ filename: req.file.filename, url: urlPath })
})

export default router
