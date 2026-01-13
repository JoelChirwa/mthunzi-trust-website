import express from "express";
import {
  getGeographicReach,
  getAdminStats,
} from "../controllers/analyticsController.js";

const router = express.Router();

router.get("/geographic-reach", getGeographicReach);
router.get("/admin-stats", getAdminStats);

export default router;
