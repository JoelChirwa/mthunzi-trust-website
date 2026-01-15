import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema(
  {
    ip: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      default: "Malawi",
    },
    page: {
      type: String,
      default: "/",
    },
    userAgent: String,
  },
  { timestamps: true }
);

// Index for counting unique visitors per IP per day if needed
visitorSchema.index({ ip: 1, createdAt: 1 });

const Visitor =
  mongoose.models.Visitor || mongoose.model("Visitor", visitorSchema);

export default Visitor;
