import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    url: {
      type: String,
      required: [true, "Media URL is required"],
    },
    type: {
      type: String,
      required: [true, "Media type is required"],
      enum: ["picture", "video"],
      default: "picture",
    },
    size: {
      type: String,
      default: "Unknown",
    },
    folder: {
      type: String,
      default: "General",
    },
  },
  {
    timestamps: true,
  }
);

const Gallery =
  mongoose.models.Gallery || mongoose.model("Gallery", gallerySchema);

export default Gallery;
