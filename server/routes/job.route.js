import express from 'express'
import {
  listJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob
} from '../controllers/job.controller.js'
import verifyUser from '../middlewares/auth.middleware.js'

const router = express.Router()

router.get('/', listJobs)
router.get('/:id', getJob)

// Protected admin endpoints
router.post('/', verifyUser, createJob)
router.put('/:id', verifyUser, updateJob)
router.delete('/:id', verifyUser, deleteJob)

export default router
