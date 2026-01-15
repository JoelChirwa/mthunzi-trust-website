import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    linkedin: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    order: {
      type: Number,
      default: 999,
    },
  },
  {
    timestamps: true,
  }
);

const Team = mongoose.models.Team || mongoose.model("Team", teamSchema);

export default Team;
