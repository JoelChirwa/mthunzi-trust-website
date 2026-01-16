import User from "../models/userModel.js";
import { getAuth } from "@clerk/express";

const ALL_PERMISSIONS = [
  "blogs",
  "programs",
  "projects",
  "voices",
  "jobs",
  "applications",
  "gallery",
  "team",
  "partners",
  "settings",
  "inquiries",
  "subscribers",
  "users",
];

export const syncUser = async (req, res) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { email, name, imageUrl, country } = req.body;

    // Hardcoded logic for initial super-admin and admins
    const superAdminEmails = ["chirwajj@gmail.com"];

    let role = "user";
    let permissions = [];

    if (superAdminEmails.includes(email?.toLowerCase())) {
      role = "super-admin";
      permissions = ALL_PERMISSIONS;
    }

    const userData = {
      clerkId: userId,
      email: email?.toLowerCase(),
      name,
      imageUrl,
      country: country || "Malawi",
    };

    // Only set role and permissions if we have a special case OR user doesn't exist yet
    // This prevents overwriting custom permissions set via UI on every sync
    const existingUser = await User.findOne({
      $or: [{ clerkId: userId }, { email: email?.toLowerCase() }],
    });

    if (!existingUser) {
      userData.role = role;
      userData.permissions = permissions;
    } else {
      // If user was pre-authorized by email (has pending clerkId)
      // or just updating hardcoded super admin
      if (
        existingUser.clerkId.startsWith("pending_") ||
        superAdminEmails.includes(email?.toLowerCase())
      ) {
        userData.role = superAdminEmails.includes(email?.toLowerCase())
          ? "super-admin"
          : existingUser.role;
        userData.permissions = superAdminEmails.includes(email?.toLowerCase())
          ? ALL_PERMISSIONS
          : existingUser.permissions;
      }
    }

    const user = await User.findOneAndUpdate(
      { $or: [{ clerkId: userId }, { email: email?.toLowerCase() }] },
      userData,
      {
        upsert: true,
        new: true,
      }
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

// Get all users (Admin/Super-Admin)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update user role and permissions (Super-Admin only)
export const updateUserAccess = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, permissions } = req.body;

    if (role && !["user", "admin", "super-admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const updateData = {};
    if (role) updateData.role = role;
    if (permissions) {
      // Ensure only valid permissions are saved
      updateData.permissions = permissions.filter((p) =>
        ALL_PERMISSIONS.includes(p)
      );
    }

    // Special case: if role is super-admin, give all permissions automatically
    if (role === "super-admin") {
      updateData.permissions = ALL_PERMISSIONS;
    }

    const user = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User access updated successfully",
      user,
    });
  } catch (error) {
    console.error("Error updating user access:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete user (Super-Admin only)
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user is trying to delete themselves
    // Since req.user is populated by middleware
    if (req.user._id.toString() === id) {
      return res
        .status(400)
        .json({ message: "You cannot delete your own account" });
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Pre-authorize or update user by email (Super-Admin only)
export const authorizeUser = async (req, res) => {
  try {
    const { email, role, permissions } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    if (role && !["user", "admin", "super-admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const updateData = { role: role || "admin" };
    if (permissions) {
      updateData.permissions = permissions.filter((p) =>
        ALL_PERMISSIONS.includes(p)
      );
    }

    if (role === "super-admin") {
      updateData.permissions = ALL_PERMISSIONS;
    }

    // Find user by email and update or create placeholder
    const user = await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      {
        $set: updateData,
        // If it's a new user, we'll need a placeholder clerkId and name
        // that will be updated on their first sync
        $setOnInsert: {
          name: email.split("@")[0],
          clerkId: `pending_${Date.now()}_${Math.random()
            .toString(36)
            .substr(2, 5)}`,
        },
      },
      { upsert: true, new: true }
    );

    res.status(200).json({
      success: true,
      message: user.clerkId.startsWith("pending_")
        ? "User authorized. They will gain access upon their first login."
        : "Existing user promoted and permissions updated.",
      user,
    });
  } catch (error) {
    console.error("Error authorizing user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
