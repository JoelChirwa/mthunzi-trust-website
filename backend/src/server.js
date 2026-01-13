import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { env } from "./config/env.js";
import { serve } from "inngest/express";
import { functions, inngest } from "./config/inngest.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// API Endpoints
app.use("/api/inngest", serve({ client: inngest, functions }));

app.get("/", (req, res) => {
  res.json({
    message: "Mthunzi API is working",
  });
});

app.listen(env.PORT, () => {
  connectDB();
  console.log(`🚀 Server running on port ${env.PORT}`);
});
