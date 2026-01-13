import express from "express";
import {
  submitInquiry,
  getInquiries,
  deleteInquiry,
} from "../controllers/inquiryController.js";

const router = express.Router();

router.route("/").post(submitInquiry).get(getInquiries);
router.route("/:id").delete(deleteInquiry);

export default router;
