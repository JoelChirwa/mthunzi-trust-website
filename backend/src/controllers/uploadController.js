import { v2 as cloudinary } from "cloudinary";
import multerStorageCloudinary from "multer-storage-cloudinary";
const CloudinaryStorage =
  multerStorageCloudinary.CloudinaryStorage || multerStorageCloudinary;
import multer from "multer";
import { env } from "../config/env.js";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

// Use memory storage instead of automated cloudinary storage for more control
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Determine resource type
    const isPDF =
      req.file.mimetype === "application/pdf" ||
      req.file.originalname.toLowerCase().endsWith(".pdf");

    // Upload to Cloudinary using a promise-wrapped stream
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "mthunzi",
        resource_type: "auto", // Let Cloudinary decide but with manual overrides
        access_mode: "public",
        flags: "attachment", // Can help with PDF delivery issues
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return res.status(500).json({ message: "Upload failed", error });
        }
        res.status(200).json({
          success: true,
          url: result.secure_url,
          resource_type: result.resource_type,
        });
      }
    );

    // Write the buffer to the stream
    uploadStream.end(req.file.buffer);
  } catch (err) {
    console.error("Server upload error:", err);
    res.status(500).json({ message: "Internal server error during upload" });
  }
};

export const uploadMiddleware = upload.single("image");
