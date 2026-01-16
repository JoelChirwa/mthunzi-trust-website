import express from "express";
import {
  syncUser,
  getAllUsers,
  updateUserAccess,
  deleteUser,
  authorizeUser,
} from "../controllers/userController.js";
import { isAdmin, isSuperAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/sync", syncUser);

// Admin Routes
router.get("/", isAdmin, getAllUsers);

// Super Admin Routes
router.post("/authorize", isSuperAdmin, authorizeUser);
router.patch("/:id/access", isSuperAdmin, updateUserAccess);
router.delete("/:id", isSuperAdmin, deleteUser);

export default router;
