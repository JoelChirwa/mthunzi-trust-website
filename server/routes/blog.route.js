import express from "express";
import multer from 'multer'
import path from 'path'

import { createBlog, deleteBlog, getBlog, getBlogs, updateBlog } from "../controllers/blog.controller.js";
import { validateCreateBlog, validateUpdateBlog } from '../middlewares/blog.validation.js'

const router = express.Router();

// multer setup to save files into uploads/ directory
const uploadsDir = path.resolve(process.cwd(), 'uploads')
const storage = multer.diskStorage({
	destination: function (req, file, cb) { cb(null, uploadsDir) },
	filename: function (req, file, cb) {
		const safeName = file.originalname.replace(/\s+/g, '-')
		cb(null, `${Date.now()}-${safeName}`)
	}
})
const upload = multer({ storage })

router.get("/", getBlogs);
router.get("/:id", getBlog);
// accept a single file under field name `image`
router.post("/", upload.single('image'), validateCreateBlog, createBlog);
router.put("/:id", upload.single('image'), validateUpdateBlog, updateBlog);
router.delete("/:id", deleteBlog);

export default router;