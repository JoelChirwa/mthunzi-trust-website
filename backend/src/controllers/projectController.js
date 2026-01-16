import Project from "../models/projectModel.js";

// @desc    Get all projects
// @route   GET /api/projects
export const getProjects = async (req, res) => {
  try {
    const { status, category, featured } = req.query;
    let filter = {};

    if (status) filter.status = status;
    if (category) filter.category = category;
    if (featured) filter.featured = featured === "true";

    const projects = await Project.find(filter).sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching projects", error: error.message });
  }
};

// @desc    Get single project by ID
// @route   GET /api/projects/:id
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching project", error: error.message });
  }
};

// @desc    Get single project by slug
// @route   GET /api/projects/slug/:slug
export const getProjectBySlug = async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching project", error: error.message });
  }
};

// @desc    Create new project
// @route   POST /api/projects
export const createProject = async (req, res) => {
  try {
    const {
      title,
      image,
      category,
      location,
      status,
      startDate,
      endDate,
      budget,
      beneficiaries,
      shortDesc,
      description,
      objectives,
      achievements,
      partners,
      gallery,
      featured,
    } = req.body;

    // Create slug from title if not provided
    const slug =
      req.body.slug ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const projectExists = await Project.findOne({ slug });
    if (projectExists) {
      return res
        .status(400)
        .json({ message: "Project with this slug already exists" });
    }

    const project = await Project.create({
      title,
      slug,
      image,
      category,
      location,
      status,
      startDate,
      endDate,
      budget,
      beneficiaries,
      shortDesc,
      description,
      objectives,
      achievements,
      partners,
      gallery,
      featured,
    });

    res.status(201).json(project);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating project", error: error.message });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (project) {
      project.title = req.body.title || project.title;
      project.image = req.body.image || project.image;
      project.category = req.body.category || project.category;
      project.location = req.body.location || project.location;
      project.status = req.body.status || project.status;
      project.startDate = req.body.startDate || project.startDate;
      project.endDate = req.body.endDate || project.endDate;
      project.budget =
        req.body.budget !== undefined ? req.body.budget : project.budget;
      project.beneficiaries =
        req.body.beneficiaries !== undefined
          ? req.body.beneficiaries
          : project.beneficiaries;
      project.shortDesc = req.body.shortDesc || project.shortDesc;
      project.description = req.body.description || project.description;
      project.objectives = req.body.objectives || project.objectives;
      project.achievements = req.body.achievements || project.achievements;
      project.partners = req.body.partners || project.partners;
      project.gallery = req.body.gallery || project.gallery;
      project.featured =
        req.body.featured !== undefined ? req.body.featured : project.featured;

      if (req.body.slug) {
        project.slug = req.body.slug;
      }

      const updatedProject = await project.save();
      res.status(200).json(updatedProject);
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating project", error: error.message });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project) {
      await project.deleteOne();
      res.status(200).json({ message: "Project removed" });
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting project", error: error.message });
  }
};
