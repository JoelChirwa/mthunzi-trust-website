import express from 'express';
import {
  adminLogin,
  adminSession,
  adminLogout,
  createAdmin,
} from '../controllers/admin.controller.js';
import verifyUser from '../middlewares/auth.middleware.js'

const router = express.Router();

// Routes
router.post('/login', adminLogin);
router.post('/logout', adminLogout);
router.get('/session', verifyUser, adminSession);

// Admin management
router.post('/admins', verifyUser, createAdmin);


export default router;
