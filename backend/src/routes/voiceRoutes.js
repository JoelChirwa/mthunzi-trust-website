import express from "express";
import {
  getVoices,
  getVoiceById,
  createVoice,
  updateVoice,
  deleteVoice,
} from "../controllers/voiceController.js";

const router = express.Router();

router.route("/").get(getVoices).post(createVoice);
router.route("/:id").get(getVoiceById).put(updateVoice).delete(deleteVoice);

export default router;
