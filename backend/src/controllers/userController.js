import User from "../models/userModel.js";
import { getAuth } from "@clerk/express";

export const syncUser = async (req, res) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { email, name, imageUrl, country } = req.body;

    const user = await User.findOneAndUpdate(
      { clerkId: userId },
      {
        clerkId: userId,
        email,
        name,
        imageUrl,
        country: country || "Malawi",
      },
      { upsert: true, new: true }
    );

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error syncing user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
