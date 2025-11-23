import express from 'express';
import {
  createAdmin,
  adminLogin,
  resendCode,
  requestPasswordReset,
  resetPassword,
  deleteAdmin,
  adminSession,
  adminLogout,
  verifyCode,
  getAdmins
} from '../controllers/admin.controller.js';
import { adminMaster, verifyTotp } from '../controllers/admin.controller.js';

const router = express.Router();

// Routes
// Routes
router.post('/create', createAdmin);
router.post('/admins', createAdmin);
router.get('/admins', getAdmins);
router.post('/login', adminLogin);
router.post('/master', adminMaster);
router.post('/verify-totp', verifyTotp);
router.post('/resend-code', resendCode);
router.post('/verify-code', verifyCode);
router.post('/logout', adminLogout);
router.get('/session', adminSession);
router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password', resetPassword);
router.delete('/:id', deleteAdmin);

export default router;
