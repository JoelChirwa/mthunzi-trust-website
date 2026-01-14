import express from "express";
import {
  getAchievements,
  getAchievementBySlug,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} from "../controllers/achievementController.js";

const router = express.Router();

router.get("/", getAchievements);
router.get("/:slug", getAchievementBySlug);
router.post("/", createAchievement);
router.put("/:id", updateAchievement);
router.delete("/:id", deleteAchievement);

export default router;
