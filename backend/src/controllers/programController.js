import Program from "../models/programModel.js";

// @desc    Get all programs
// @route   GET /api/programs
export const getPrograms = async (req, res) => {
  try {
    const programs = await Program.find({}).sort({ createdAt: -1 });
    res.status(200).json(programs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching programs", error: error.message });
  }
};

// @desc    Get single program by slug
// @route   GET /api/programs/:slug
export const getProgramBySlug = async (req, res) => {
  try {
    const program = await Program.findOne({ slug: req.params.slug });
    if (program) {
      res.status(200).json(program);
    } else {
      res.status(404).json({ message: "Program not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching program", error: error.message });
  }
};

// @desc    Create new program
// @route   POST /api/programs
export const createProgram = async (req, res) => {
  try {
    const { title, image, icon, color, shortDesc, description } = req.body;

    // Create slug from title if not provided or ensure it's valid
    const slug =
      req.body.slug ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const programExists = await Program.findOne({ slug });
    if (programExists) {
      return res
        .status(400)
        .json({ message: "Program with this slug already exists" });
    }

    const program = await Program.create({
      title,
      slug,
      image,
      icon,
      color,
      shortDesc,
      description,
    });

    res.status(201).json(program);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating program", error: error.message });
  }
};

// @desc    Update program
// @route   PUT /api/programs/:id
export const updateProgram = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);

    if (program) {
      program.title = req.body.title || program.title;
      program.image = req.body.image || program.image;
      program.icon = req.body.icon || program.icon;
      program.color = req.body.color || program.color;
      program.shortDesc = req.body.shortDesc || program.shortDesc;
      program.description = req.body.description || program.description;

      if (req.body.slug) {
        program.slug = req.body.slug;
      }

      const updatedProgram = await program.save();
      res.status(200).json(updatedProgram);
    } else {
      res.status(404).json({ message: "Program not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating program", error: error.message });
  }
};

// @desc    Delete program
// @route   DELETE /api/programs/:id
export const deleteProgram = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (program) {
      await program.deleteOne();
      res.status(200).json({ message: "Program removed" });
    } else {
      res.status(404).json({ message: "Program not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting program", error: error.message });
  }
};
