import connectDB from "../config/db.js";

/**
 * Middleware to ensure database connection before processing requests
 * Essential for serverless environments like Vercel
 */
export const ensureDbConnection = async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(503).json({
      message: "Service temporarily unavailable - database connection failed",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
