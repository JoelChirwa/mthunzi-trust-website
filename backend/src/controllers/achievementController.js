import Achievement from "../models/achievementModel.js";

// @desc    Get all achievements
// @route   GET /api/achievements
export const getAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find({}).sort({
      year: -1,
      order: 1,
      createdAt: -1,
    });
    res.status(200).json(achievements);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching achievements", error: error.message });
  }
};

// @desc    Get single achievement by slug
// @route   GET /api/achievements/:slug
export const getAchievementBySlug = async (req, res) => {
  try {
    const achievement = await Achievement.findOne({ slug: req.params.slug });
    if (achievement) {
      res.status(200).json(achievement);
    } else {
      res.status(404).json({ message: "Achievement not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching achievement", error: error.message });
  }
};

// @desc    Create new achievement
// @route   POST /api/achievements
export const createAchievement = async (req, res) => {
  try {
    const {
      title,
      year,
      description,
      content,
      images,
      featured,
      category,
      order,
    } = req.body;

    const achievement = await Achievement.create({
      title,
      year,
      description,
      content,
      images: images || [],
      featured,
      category,
      order: order !== undefined ? order : 999,
    });

    res.status(201).json(achievement);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating achievement", error: error.message });
  }
};

// @desc    Update achievement
// @route   PUT /api/achievements/:id
export const updateAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);

    if (achievement) {
      achievement.title = req.body.title || achievement.title;
      achievement.year = req.body.year || achievement.year;
      achievement.description = req.body.description || achievement.description;
      achievement.content = req.body.content || achievement.content;
      achievement.images = req.body.images || achievement.images;
      achievement.featured =
        req.body.featured !== undefined
          ? req.body.featured
          : achievement.featured;
      achievement.category = req.body.category || achievement.category;
      achievement.order =
        req.body.order !== undefined ? req.body.order : achievement.order;

      if (req.body.slug) {
        achievement.slug = req.body.slug;
      }

      const updatedAchievement = await achievement.save();
      res.status(200).json(updatedAchievement);
    } else {
      res.status(404).json({ message: "Achievement not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating achievement", error: error.message });
  }
};

// @desc    Delete achievement
// @route   DELETE /api/achievements/:id
export const deleteAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);
    if (achievement) {
      await achievement.deleteOne();
      res.status(200).json({ message: "Achievement removed" });
    } else {
      res.status(404).json({ message: "Achievement not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting achievement", error: error.message });
  }
};
