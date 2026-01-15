import express from "express";
import {
  submitApplication,
  getApplications,
  getJobApplications,
  updateApplicationStatus,
  deleteApplication,
} from "../controllers/applicationController.js";

const router = express.Router();

router.post("/", submitApplication);
router.get("/", getApplications);
router.get("/job/:jobId", getJobApplications);
router.put("/:id/status", updateApplicationStatus);
router.delete("/:id", deleteApplication);

export default router;
