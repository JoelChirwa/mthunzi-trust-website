import express from "express";
import {
  subscribe,
  getSubscribers,
  unsubscribe,
} from "../controllers/subscriberController.js";

const router = express.Router();

router.route("/").post(subscribe).get(getSubscribers);
router.route("/unsubscribe").post(unsubscribe);

export default router;
