import mongoose from "mongoose";
import { env } from "./env.js";

const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URL || env.DATABASE_URL);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    // Don't exit in production (Vercel serverless), just log the error
    if (env.NODE_ENV !== "production") {
      process.exit(1);
    }
  }
};

export default connectDB;
