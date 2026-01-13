import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { env } from "./config/env.js";
import { serve } from "inngest/express";
import { functions, inngest } from "./config/inngest.js";
import connectDB from "./config/db.js";

import { syncUser } from "./controllers/userController.js";
import { getGeographicReach } from "./controllers/analyticsController.js";

const app = express();

// Database connection (non-blocking for Vercel)
connectDB().catch((err) => console.error("Database connection failed:", err));

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(clerkMiddleware());

// API Endpoints
app.use("/api/inngest", serve({ client: inngest, functions }));
app.post("/api/users/sync", syncUser);
app.get("/api/analytics/geographic-reach", getGeographicReach);

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
