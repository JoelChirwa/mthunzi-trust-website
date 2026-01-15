import express from "express";
import {
  getGeographicReach,
  getAdminStats,
  trackVisit,
} from "../controllers/analyticsController.js";

const router = express.Router();

router.get("/geographic-reach", getGeographicReach);
router.get("/admin-stats", getAdminStats);
router.post("/track", trackVisit);

export default router;
