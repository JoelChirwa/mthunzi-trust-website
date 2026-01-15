import express from "express";
import {
  getGeographicReach,
  getAdminStats,
  trackVisit,
  getPopularPages,
  getViewsByDate,
} from "../controllers/analyticsController.js";

const router = express.Router();

router.get("/geographic-reach", getGeographicReach);
router.get("/admin-stats", getAdminStats);
router.get("/popular-pages", getPopularPages);
router.get("/views-by-date", getViewsByDate);
router.post("/track", trackVisit);

export default router;
