import express from "express";
import multer from 'multer'
import path from 'path'

import {  createPartner, deletePartner, getPartner, getPartners, updatePartner } from "../controllers/partner.controller.js";

const router = express.Router();

const uploadsDir = path.resolve(process.cwd(), 'uploads')
const storage = multer.diskStorage({
	destination: function (req, file, cb) { cb(null, uploadsDir) },
	filename: function (req, file, cb) { const safeName = file.originalname.replace(/\s+/g, '-'); cb(null, `${Date.now()}-${safeName}`) }
})
const upload = multer({ storage })

router.get("/", getPartners);
router.get("/:id", getPartner);
router.post("/", upload.single('logo'), createPartner);
router.put("/:id", upload.single('logo'), updatePartner);
router.delete("/:id", deletePartner);

export default router;