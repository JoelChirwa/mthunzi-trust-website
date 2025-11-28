import express from 'express'
import {
  listEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent
} from '../controllers/event.controller.js'
import verifyUser from '../middlewares/auth.middleware.js'

const router = express.Router()

router.get('/', listEvents)
router.get('/:id', getEvent)

// Admin protected
router.post('/', verifyUser, createEvent)
router.put('/:id', verifyUser, updateEvent)
router.delete('/:id', verifyUser, deleteEvent)

export default router
