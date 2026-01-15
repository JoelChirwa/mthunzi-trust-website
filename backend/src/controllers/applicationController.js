import Application from "../models/applicationModel.js";
import Job from "../models/jobModel.js";
import { inngest } from "../config/inngest.js";

// @desc    Submit a new job application
// @route   POST /api/applications
export const submitApplication = async (req, res) => {
  try {
    const { jobId, email, phone, fullName } = req.body;

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check for duplicate application (same email for same job)
    const existingApplication = await Application.findOne({
      jobId,
      email: email.toLowerCase().trim(),
    });

    if (existingApplication) {
      return res.status(409).json({
        message:
          "You have already submitted an application for this position. Please check your email for updates.",
      });
    }

    // Sanitize and validate data
    const sanitizedData = {
      ...req.body,
      email: email.toLowerCase().trim(),
      fullName: fullName.trim(),
      phone: phone.replace(/\s/g, ""), // Remove spaces from phone
    };

    const application = await Application.create(sanitizedData);

    // Trigger email notification via Inngest (non-blocking)
    try {
      await inngest.send({
        name: "application/submitted",
        data: {
          applicationId: application._id.toString(),
        },
      });
    } catch (emailError) {
      // Log error but don't fail the application submission
      console.error("Failed to send email notification:", emailError);
    }

    res.status(201).json({
      success: true,
      data: application,
      message: "Application submitted successfully",
    });
  } catch (error) {
    console.error("Error submitting application:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        message: "Validation failed",
        errors,
      });
    }

    res.status(500).json({
      message: "Error submitting application",
      error: error.message,
    });
  }
};

// @desc    Get all applications (for admin)
// @route   GET /api/applications
export const getApplications = async (req, res) => {
  try {
    const applications = await Application.find({})
      .populate("jobId", "title department")
      .sort({ createdAt: -1 });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching applications",
      error: error.message,
    });
  }
};

// @desc    Get applications for a specific job
// @route   GET /api/applications/job/:jobId
export const getJobApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      jobId: req.params.jobId,
    }).sort({
      createdAt: -1,
    });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching job applications",
      error: error.message,
    });
  }
};

// @desc    Update application status
// @route   PUT /api/applications/:id/status
export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const application = await Application.findById(req.params.id);

    if (application) {
      application.status = status;
      const updatedApplication = await application.save();

      // Trigger status update email notification via Inngest (non-blocking)
      try {
        await inngest.send({
          name: "application/status-updated",
          data: {
            applicationId: application._id.toString(),
            newStatus: status,
          },
        });
      } catch (emailError) {
        // Log error but don't fail the status update
        console.error("Failed to send status update email:", emailError);
      }

      res.status(200).json(updatedApplication);
    } else {
      res.status(404).json({ message: "Application not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error updating application status",
      error: error.message,
    });
  }
};

// @desc    Delete application
// @route   DELETE /api/applications/:id
export const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (application) {
      await application.deleteOne();
      res.status(200).json({ message: "Application removed" });
    } else {
      res.status(404).json({ message: "Application not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error deleting application",
      error: error.message,
    });
  }
};
