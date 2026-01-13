import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    clerkId: {
      type: String,
      unique: true,
      required: true,
    },
    country: {
      type: String,
      default: "Malawi",
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
