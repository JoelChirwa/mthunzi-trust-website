import mongoose from "mongoose";

const settingSchema = new mongoose.Schema(
  {
    organizationName: { type: String, default: "Mthunzi Trust" },
    tagline: { type: String, default: "The Umbrella of Hope" },
    email: { type: String, default: "info@mthunzi.org" },
    phone: { type: String, default: "+265 996 654 088" },
    address: { type: String, default: "Lilongwe, Malawi" },
    facebook: { type: String, default: "" },
    twitter: { type: String, default: "" },
    instagram: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    maintenanceMode: { type: Boolean, default: false },
    footerText: {
      type: String,
      default: "© 2024 Mthunzi Trust. All rights reserved.",
    },
    primaryColor: { type: String, default: "#1e3a8a" },
    secondaryColor: { type: String, default: "#10b981" },
    workingHours: { type: String, default: "Mon - Fri: 8:00 AM - 5:00 PM" },
    seoTitle: { type: String, default: "Mthunzi Trust - The Umbrella of Hope" },
    seoDescription: {
      type: String,
      default:
        "Mthunzi Trust is dedicated to providing hope and support to those in need.",
    },
  },
  {
    timestamps: true,
  }
);

const Setting =
  mongoose.models.Setting || mongoose.model("Setting", settingSchema);

export default Setting;
