// server/routes/team.route.js
import express from 'express';
import multer from 'multer'
import path from 'path'
import {
  getTeams,
  getTeamMember,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember
} from '../controllers/team.controller.js';

const router = express.Router();

const uploadsDir = path.resolve(process.cwd(), 'uploads')
const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, uploadsDir) },
  filename: function (req, file, cb) { const safeName = file.originalname.replace(/\s+/g, '-'); cb(null, `${Date.now()}-${safeName}`) }
})
const upload = multer({ storage })

// Routes
router.get('/', getTeams);               // GET /api/team
router.get('/:id', getTeamMember);       // GET /api/team/:id
router.post('/', upload.single('image'), createTeamMember);      // POST /api/team
router.put('/:id', upload.single('image'), updateTeamMember);    // PUT /api/team/:id
router.delete('/:id', deleteTeamMember); // DELETE /api/team/:id

export default router;
