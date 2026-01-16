import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Education",
        "Health",
        "Environmental Conservation",
        "Youth Empowerment",
        "Agriculture & Food Security",
        "Water & Sanitation",
        "Climate Change",
        "Women & Girls Empowerment",
        "Waste Management",
        "Other",
      ],
      default: "Community",
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Planning", "In Progress", "Completed", "On Hold"],
      default: "Planning",
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    budget: {
      type: Number,
      default: 0,
    },
    beneficiaries: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      required: true,
    },
    objectives: {
      type: [String],
      default: [],
    },
    achievements: {
      type: [String],
      default: [],
    },
    partners: {
      type: [String],
      default: [],
    },
    gallery: {
      type: [String],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);
export default Project;
