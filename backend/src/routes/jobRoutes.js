import express from "express";
import {
  getJobs,
  getJobBySlug,
  createJob,
  updateJob,
  deleteJob,
} from "../controllers/jobController.js";

const router = express.Router();

router.route("/").get(getJobs).post(createJob);
router.route("/:id").put(updateJob).delete(deleteJob);
router.route("/slug/:slug").get(getJobBySlug);

export default router;
