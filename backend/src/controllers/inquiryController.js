import Inquiry from "../models/inquiryModel.js";

// @desc    Submit a new inquiry
// @route   POST /api/inquiries
export const submitInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.create(req.body);
    res.status(201).json({ success: true, inquiry });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error submitting inquiry", error: error.message });
  }
};

// @desc    Get all inquiries (for admin)
// @route   GET /api/inquiries
export const getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });
    res.status(200).json(inquiries);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching inquiries", error: error.message });
  }
};

// @desc    Delete an inquiry
// @route   DELETE /api/inquiries/:id
export const deleteInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (inquiry) {
      await inquiry.deleteOne();
      res.status(200).json({ message: "Inquiry removed" });
    } else {
      res.status(404).json({ message: "Inquiry not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting inquiry", error: error.message });
  }
};
