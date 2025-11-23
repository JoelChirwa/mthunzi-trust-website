import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		shortDescription: {
			type: String,
			required: true,
		},
    location: {
      type: String,
      required: false,
    },
		fullStory: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true, // createdAt, updatedAt
	}
);
  
const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
