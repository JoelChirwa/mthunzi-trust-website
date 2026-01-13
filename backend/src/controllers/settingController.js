import Setting from "../models/settingModel.js";

// @desc    Get organization settings
// @route   GET /api/settings
export const getSettings = async (req, res) => {
  try {
    let settings = await Setting.findOne();
    if (!settings) {
      // Create default settings if none exist
      settings = await Setting.create({});
    }
    res.status(200).json(settings);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching settings", error: error.message });
  }
};

// @desc    Update organization settings
// @route   PUT /api/settings
export const updateSettings = async (req, res) => {
  try {
    let settings = await Setting.findOne();
    if (settings) {
      settings = await Setting.findByIdAndUpdate(settings._id, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(200).json(settings);
    } else {
      settings = await Setting.create(req.body);
      res.status(201).json(settings);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating settings", error: error.message });
  }
};
