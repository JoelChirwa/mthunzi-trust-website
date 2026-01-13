import Team from "../models/teamModel.js";

// @desc    Get all team members
// @route   GET /api/team
export const getTeam = async (req, res) => {
  try {
    const team = await Team.find({}).sort({ createdAt: 1 });
    res.status(200).json(team);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching team members", error: error.message });
  }
};

// @desc    Create new team member
// @route   POST /api/team
export const createTeamMember = async (req, res) => {
  try {
    const { name, role, image, linkedin, email } = req.body;

    const member = await Team.create({
      name,
      role,
      image,
      linkedin,
      email,
    });

    res.status(201).json(member);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating team member", error: error.message });
  }
};

// @desc    Update team member
// @route   PUT /api/team/:id
export const updateTeamMember = async (req, res) => {
  try {
    const member = await Team.findById(req.params.id);

    if (member) {
      member.name = req.body.name || member.name;
      member.role = req.body.role || member.role;
      member.image = req.body.image || member.image;
      member.linkedin = req.body.linkedin || member.linkedin;
      member.email = req.body.email || member.email;

      const updatedMember = await member.save();
      res.status(200).json(updatedMember);
    } else {
      res.status(404).json({ message: "Member not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating team member", error: error.message });
  }
};

// @desc    Delete team member
// @route   DELETE /api/team/:id
export const deleteTeamMember = async (req, res) => {
  try {
    const member = await Team.findById(req.params.id);
    if (member) {
      await member.deleteOne();
      res.status(200).json({ message: "Member removed" });
    } else {
      res.status(404).json({ message: "Member not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting member", error: error.message });
  }
};
