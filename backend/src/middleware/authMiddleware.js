import User from "../models/userModel.js";
import { getAuth } from "@clerk/express";

export const isAdmin = async (req, res, next) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findOne({ clerkId: userId });

    // In development or first run, we might want to check the static list too
    // But for proper RBAC, we should use the DB role.
    if (!user || (user.role !== "admin" && user.role !== "super-admin")) {
      return res
        .status(403)
        .json({ message: "Access denied. Admin privileges required." });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("isAdmin middleware error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const isSuperAdmin = async (req, res, next) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findOne({ clerkId: userId });

    if (!user || user.role !== "super-admin") {
      return res
        .status(403)
        .json({ message: "Access denied. Super Admin privileges required." });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("isSuperAdmin middleware error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
