import User from "../models/userModel.js";
import Blog from "../models/blogModel.js";
import Program from "../models/programModel.js";
import Team from "../models/teamModel.js";
import Partner from "../models/partnerModel.js";
import Job from "../models/jobModel.js";
import Subscriber from "../models/subscriberModel.js";
import Visitor from "../models/visitorModel.js";
import Application from "../models/applicationModel.js";

export const getAdminStats = async (req, res) => {
  try {
    const [
      blogs,
      programs,
      team,
      partners,
      jobs,
      subscribers,
      pageViews,
      visitors,
      applications,
    ] = await Promise.all([
      Blog.countDocuments(),
      Program.countDocuments(),
      Team.countDocuments(),
      Partner.countDocuments(),
      Job.countDocuments(),
      Subscriber.countDocuments({ status: "active" }),
      Visitor.countDocuments(),
      Visitor.distinct("ip").then((ips) => ips.length),
      Application.countDocuments(),
    ]);

    res.status(200).json({
      success: true,
      stats: {
        blogs,
        programs,
        team,
        partners,
        jobs,
        subscribers,
        visitors,
        pageViews,
        applications,
      },
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getGeographicReach = async (req, res) => {
  try {
    const reach = await Visitor.aggregate([
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

    // Add registered users to the mix for better coverage
    const registeredUsers = await User.aggregate([
      {
        $group: {
          _id: "$country",
          count: { $sum: 1 },
        },
      },
    ]);

    // Merge logic
    const merger = {};
    reach.forEach((item) => {
      merger[item.country] = item.visitors;
    });
    registeredUsers.forEach((item) => {
      const country = item._id || "Malawi";
      merger[country] = (merger[country] || 0) + item.count;
    });

    const finalReach = Object.entries(merger).map(([country, visitors]) => ({
      country,
      visitors,
    }));

    // Calculate percentages
    const total = finalReach.reduce((sum, item) => sum + item.visitors, 0);
    const reachWithPercentage = finalReach.map((item) => ({
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

export const trackVisit = async (req, res) => {
  try {
    const { country, page } = req.body;
    const ip = req.ip || req.headers["x-forwarded-for"] || "anonymous";

    // Simple cooldown: Don't record same IP on same page within 1 hour
    const cooldown = new Date(Date.now() - 60 * 60 * 1000);
    const recentVisit = await Visitor.findOne({
      ip,
      page: page || "/",
      createdAt: { $gte: cooldown },
    });

    if (!recentVisit) {
      await Visitor.create({
        ip,
        country: country || "Malawi",
        page: page || "/",
        userAgent: req.headers["user-agent"],
      });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error tracking visit:", error);
    // Don't fail the request if tracking fails
    res.status(200).json({ success: true });
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
