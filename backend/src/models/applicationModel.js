import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: [true, "Job ID is required"],
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: "Please provide a valid email address",
      },
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      validate: {
        validator: function (v) {
          // Remove spaces and validate Malawi phone format
          const cleaned = v.replace(/\s/g, "");
          return /^(\+265|265|0)?[1-9]\d{8}$/.test(cleaned);
        },
        message: "Please provide a valid Malawi phone number",
      },
    },
    linkedIn: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: ["male", "female"],
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [18, "Minimum age is 18"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    disabilityStatus: {
      type: String,
      required: [true, "Disability status is required"],
      enum: ["yes", "no"],
    },
    cvUrl: {
      type: String,
      required: [true, "CV/Resume is required"],
    },
    certificates: {
      type: [String],
      required: [true, "At least one certificate is required"],
      validate: [
        (val) => val.length > 0,
        "Please upload at least one certificate",
      ],
    },
    coverLetter: {
      type: String,
      required: [true, "Cover letter/statement is required"],
    },
    status: {
      type: String,
      enum: ["pending", "reviewed", "shortlisted", "rejected", "accepted"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;
