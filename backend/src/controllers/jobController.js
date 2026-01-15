import Job from "../models/jobModel.js";

// @desc    Get all jobs
// @route   GET /api/jobs
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({}).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching jobs", error: error.message });
  }
};

// @desc    Get job by slug
// @route   GET /api/jobs/:slug
export const getJobBySlug = async (req, res) => {
  try {
    const job = await Job.findOne({ slug: req.params.slug });
    if (job) {
      res.status(200).json(job);
    } else {
      res.status(404).json({ message: "Job not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching job", error: error.message });
  }
};

// @desc    Create new job
// @route   POST /api/jobs
export const createJob = async (req, res) => {
  try {
    console.log("Creating job with payload:", req.body);
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (error) {
    console.error("Error creating job:", error);
    res
      .status(500)
      .json({ message: "Error creating job", error: error.message });
  }
};

// @desc    Update job
// @route   PUT /api/jobs/:id
export const updateJob = async (req, res) => {
  try {
    console.log("Updating job:", req.params.id, "with payload:", req.body);
    const job = await Job.findById(req.params.id);

    if (job) {
      Object.assign(job, req.body);
      const updatedJob = await job.save();
      res.status(200).json(updatedJob);
    } else {
      res.status(404).json({ message: "Job not found" });
    }
  } catch (error) {
    console.error("Error updating job:", error);
    res
      .status(500)
      .json({ message: "Error updating job", error: error.message });
  }
};

// @desc    Delete job
// @route   DELETE /api/jobs/:id
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (job) {
      await job.deleteOne();
      res.status(200).json({ message: "Job removed" });
    } else {
      res.status(404).json({ message: "Job not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting job", error: error.message });
  }
};
