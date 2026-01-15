import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { env } from "./config/env.js";
import { serve } from "inngest/express";
import { functions, inngest } from "./config/inngest.js";
import connectDB from "./config/db.js";
import { ensureDbConnection } from "./middleware/dbMiddleware.js";

// Routes
import userRoutes from "./routes/userRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import programRoutes from "./routes/programRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import partnerRoutes from "./routes/partnerRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import settingRoutes from "./routes/settingRoutes.js";
import inquiryRoutes from "./routes/inquiryRoutes.js";
import subscriberRoutes from "./routes/subscriberRoutes.js";

const app = express();

// Database connection - ensures connection before handling requests
if (env.NODE_ENV === "production") {
  // In production (Vercel), we let the connection establish on first request
  // The connection caching in db.js will handle subsequent requests
  console.log(
    "🔄 Running in production mode - DB will connect on first request"
  );
} else {
  // In development, connect immediately
  connectDB().catch((err) => console.error("Database connection failed:", err));
}

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(clerkMiddleware());

// Ensure database connection for all API routes
app.use("/api", ensureDbConnection);

// API Endpoints
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/users", userRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/programs", programRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/partners", partnerRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/settings", settingRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/subscribers", subscriberRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Mthunzi API is working",
  });
});

// Export app for Vercel serverless function
export default app;

// For local development
if (env.NODE_ENV !== "production") {
  const PORT = env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}
