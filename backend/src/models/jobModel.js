import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      default: "Lilongwe, Malawi",
    },
    type: {
      type: String,
      required: [true, "Job type is required"],
      enum: ["Full-Time", "Part-Time", "Contract", "Volunteer", "Internship"],
      default: "Full-Time",
    },
    deadline: {
      type: Date,
      required: [true, "Deadline is required"],
    },
    description: {
      type: String,
      required: [true, "Job description is required"],
    },
    requirements: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["Open", "Closed"],
      default: "Open",
    },
    slug: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to generate slug
jobSchema.pre("validate", function (next) {
  if (this.title && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .split(" ")
      .join("-")
      .replace(/[^\w-]+/g, "");
  }
  next();
});

const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);

export default Job;
