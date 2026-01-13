import mongoose from "mongoose";

const partnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    logo: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Partner =
  mongoose.models.Partner || mongoose.model("Partner", partnerSchema);

export default Partner;
