import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
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
    content: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
      default: [],
    },
    readTime: {
      type: String,
      default: "5 min read",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      default: "Uncategorized",
    },
    author: {
      type: String,
      default: "Mthunzi Trust",
    },
    order: {
      type: Number,
      default: 999,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to generate slug if not provided
blogSchema.pre("validate", function () {
  if (this.title && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
});

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;
