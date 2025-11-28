import express from 'express'
import { subscribe, listSubscribers } from '../controllers/newsletter.controller.js'
import verifyUser from '../middlewares/auth.middleware.js'

const router = express.Router()

// public subscribe
router.post('/', subscribe)

// admin: get subscriber counts (protected)
router.get('/', verifyUser, listSubscribers)

export default router
