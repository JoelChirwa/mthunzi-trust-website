import User from "../models/userModel.js";

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
