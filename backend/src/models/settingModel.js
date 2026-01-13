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
  },
  {
    timestamps: true,
  }
);

const Setting =
  mongoose.models.Setting || mongoose.model("Setting", settingSchema);

export default Setting;
