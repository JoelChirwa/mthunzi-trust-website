import express from "express";
import {
  getPrograms,
  getProgramBySlug,
  createProgram,
  updateProgram,
  deleteProgram,
} from "../controllers/programController.js";

const router = express.Router();

router.get("/", getPrograms);
router.get("/:slug", getProgramBySlug);
router.post("/", createProgram);
router.put("/:id", updateProgram);
router.delete("/:id", deleteProgram);

export default router;
