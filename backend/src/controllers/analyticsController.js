import User from "../models/userModel.js";
import Blog from "../models/blogModel.js";
import Program from "../models/programModel.js";
import Team from "../models/teamModel.js";
import Partner from "../models/partnerModel.js";
import Job from "../models/jobModel.js";

export const getAdminStats = async (req, res) => {
  try {
    const [blogs, programs, team, partners, jobs] = await Promise.all([
      Blog.countDocuments(),
      Program.countDocuments(),
      Team.countDocuments(),
      Partner.countDocuments(),
      Job.countDocuments(),
    ]);

    res.status(200).json({
      success: true,
      stats: {
        blogs,
        programs,
        team,
        partners,
        jobs,
      },
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getGeographicReach = async (req, res) => {
  try {
    const reach = await User.aggregate([
      {
        $group: {
          _id: "$country",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          country: "$_id",
          visitors: "$count",
        },
      },
    ]);

    // Calculate percentages
    const total = reach.reduce((sum, item) => sum + item.visitors, 0);
    const reachWithPercentage = reach.map((item) => ({
      ...item,
      percentage: total > 0 ? Math.round((item.visitors / total) * 100) : 0,
      // Mapping flags for common countries
      flag: getFlag(item.country),
    }));

    // If empty, return some default values for UI visibility if needed, or just empty array
    res.status(200).json({
      success: true,
      total,
      data: reachWithPercentage,
    });
  } catch (error) {
    console.error("Error fetching geographic reach:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getFlag = (country) => {
  const flags = {
    Malawi: "🇲🇼",
    "South Africa": "🇿🇦",
    "United Kingdom": "🇬🇧",
    "United States": "🇺🇸",
    Germany: "🇩🇪",
    Canada: "🇨🇦",
    France: "🇫🇷",
    Australia: "🇦🇺",
  };
  return flags[country] || "🌍";
};
