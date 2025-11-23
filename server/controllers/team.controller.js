import mongoose from "mongoose";
import Team from "../models/team.model.js";
import fs from 'fs';
import path from 'path';

/* ================================
   GET ALL TEAM MEMBERS
================================ */
export const getTeams = async (req, res) => {
    try {
        const teams = await Team.find({}).sort({ createdAt: -1 }); // Sort by newest first
        return res.status(200).json(teams);
    } catch (error) {
        console.error("Error fetching teams:", error.message);
        return res.status(500).json({ 
            success: false, 
            message: "Failed to fetch team members",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

/* ================================
   GET SINGLE TEAM MEMBER
================================ */
export const getTeamMember = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ 
            success: false, 
            message: "Invalid Team ID format" 
        });
    }

    try {
        const team = await Team.findById(id);
        if (!team) {
            return res.status(404).json({ 
                success: false, 
                message: "Team member not found" 
            });
        }

        return res.status(200).json(team);
    } catch (error) {
        console.error("Error fetching team member:", error.message);
        return res.status(500).json({ 
            success: false, 
            message: "Failed to fetch team member",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

/* ================================
   CREATE TEAM MEMBER
================================ */
export const createTeamMember = async (req, res) => {
    const body = req.body || {};
    const imagePath = req.file ? `/uploads/${req.file.filename}` : (body.image || "");

    // Validation
    if (!body.name?.trim()) {
        return res.status(400).json({ 
            success: false, 
            message: "Name is required" 
        });
    }

    if (!body.role?.trim()) {
        return res.status(400).json({ 
            success: false, 
            message: "Role is required" 
        });
    }

    if (!imagePath) {
        return res.status(400).json({ 
            success: false, 
            message: "Image is required" 
        });
    }

    try {
        const newTeam = new Team({
            name: body.name.trim(),
            role: body.role.trim(),
            image: imagePath,
            // Optional fields
            bio: body.bio?.trim() || "",
            linkedin: body.linkedin?.trim() || "",
            twitter: body.twitter?.trim() || "",
            email: body.email?.trim() || "",
        });

        await newTeam.save();
        
        return res.status(201).json({
            success: true,
            message: "Team member created successfully",
            data: newTeam
        });
    } catch (error) {
        console.error("Error creating team member:", error.message);
        
        // Clean up uploaded file if creation fails
        if (req.file) {
            try {
                fs.unlinkSync(path.join(process.cwd(), 'uploads', req.file.filename));
            } catch (unlinkError) {
                console.error("Error deleting uploaded file:", unlinkError.message);
            }
        }
        
        return res.status(500).json({ 
            success: false, 
            message: "Failed to create team member",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

/* ================================
   UPDATE TEAM MEMBER
================================ */
export const updateTeamMember = async (req, res) => {
    const { id } = req.params;
    const body = req.body || {};
    const imagePath = req.file ? `/uploads/${req.file.filename}` : undefined;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ 
            success: false, 
            message: "Invalid Team ID format" 
        });
    }

    try {
        // Check if team member exists first
        const existingTeam = await Team.findById(id);
        if (!existingTeam) {
            // Clean up uploaded file if team doesn't exist
            if (req.file) {
                try {
                    fs.unlinkSync(path.join(process.cwd(), 'uploads', req.file.filename));
                } catch (unlinkError) {
                    console.error("Error deleting uploaded file:", unlinkError.message);
                }
            }
            return res.status(404).json({ 
                success: false, 
                message: "Team member not found" 
            });
        }

        const updateData = {
            ...(body.name && { name: body.name.trim() }),
            ...(body.role && { role: body.role.trim() }),
            ...(body.bio !== undefined && { bio: body.bio.trim() }),
            ...(body.linkedin !== undefined && { linkedin: body.linkedin.trim() }),
            ...(body.twitter !== undefined && { twitter: body.twitter.trim() }),
            ...(body.email !== undefined && { email: body.email.trim() }),
            ...(imagePath && { image: imagePath }),
        };

        // If no valid fields to update
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ 
                success: false, 
                message: "No valid fields to update" 
            });
        }

        const updatedTeam = await Team.findByIdAndUpdate(
            id, 
            updateData, 
            { new: true, runValidators: true }
        );

        // Delete old image if new image was uploaded
        if (imagePath && existingTeam.image && existingTeam.image.startsWith('/uploads/')) {
            try {
                const oldFilename = existingTeam.image.replace('/uploads/', '');
                fs.unlinkSync(path.join(process.cwd(), 'uploads', oldFilename));
            } catch (unlinkError) {
                console.error("Error deleting old image:", unlinkError.message);
            }
        }

        return res.status(200).json({
            success: true,
            message: "Team member updated successfully",
            data: updatedTeam
        });
    } catch (error) {
        console.error("Error updating team member:", error.message);
        
        // Clean up uploaded file if update fails
        if (req.file) {
            try {
                fs.unlinkSync(path.join(process.cwd(), 'uploads', req.file.filename));
            } catch (unlinkError) {
                console.error("Error deleting uploaded file:", unlinkError.message);
            }
        }
        
        return res.status(500).json({ 
            success: false, 
            message: "Failed to update team member",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

/* ================================
   DELETE TEAM MEMBER
================================ */
export const deleteTeamMember = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ 
            success: false, 
            message: "Invalid Team ID format" 
        });
    }

    try {
        const teamMember = await Team.findById(id);
        
        if (!teamMember) {
            return res.status(404).json({ 
                success: false, 
                message: "Team member not found" 
            });
        }

        // Delete associated image file
        if (teamMember.image && teamMember.image.startsWith('/uploads/')) {
            try {
                const filename = teamMember.image.replace('/uploads/', '');
                fs.unlinkSync(path.join(process.cwd(), 'uploads', filename));
            } catch (unlinkError) {
                console.error("Error deleting team member image:", unlinkError.message);
            }
        }

        await Team.findByIdAndDelete(id);

        return res.status(200).json({ 
            success: true, 
            message: "Team member deleted successfully" 
        });
    } catch (error) {
        console.error("Error deleting team member:", error.message);
        return res.status(500).json({ 
            success: false, 
            message: "Failed to delete team member",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};