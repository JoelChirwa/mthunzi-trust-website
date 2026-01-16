import express from "express";
import {
  submitInquiry,
  getInquiries,
  deleteInquiry,
  updateInquiryStatus,
} from "../controllers/inquiryController.js";

const router = express.Router();

router.route("/").post(submitInquiry).get(getInquiries);
router.route("/:id").delete(deleteInquiry);
router.route("/:id/status").patch(updateInquiryStatus);

export default router;
