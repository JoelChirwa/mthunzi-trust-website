import mongoose from "mongoose";
import Partner from "../models/partner.model.js";

export const getPartners = async (req, res) => {
    try {
        const partners = await Partner.find({});
        return res.status(200).json(partners);
    } catch (error) {
        console.log("error in fetching partners:", error.message);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const getPartner = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: 'Invalid Partner Id' });
    }
    try {
        const partner = await Partner.findById(id);
        if (!partner) return res.status(404).json({ success: false, message: 'Partner not found' });
        return res.status(200).json(partner);
    } catch (error) {
        console.error('error in fetching partner:', error.message);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const createPartner = async (req, res) => {
    const body = req.body || {}
    const logoPath = req.file ? `/uploads/${req.file.filename}` : (body.logo || '')
    if (!body.name || !logoPath) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }
    const newPartner = new Partner({
        name: body.name,
        website: body.website || '',
        logo: logoPath,
        description: body.description || ''
    })
    try {
        await newPartner.save();
        return res.status(201).json(newPartner);
    } catch (error) {
        console.error("Error in creating partner:", error.message);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const updatePartner = async (req, res) => {
    const { id } = req.params;
    const body = req.body || {}
    const logoPath = req.file ? `/uploads/${req.file.filename}` : undefined
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Partner Id" });
    }
    try {
        const update = {
            ...(body.name !== undefined ? { name: body.name } : {}),
            ...(body.website !== undefined ? { website: body.website } : {}),
            ...(body.description !== undefined ? { description: body.description } : {}),
            ...(logoPath ? { logo: logoPath } : {})
        }
        const updatedPartner = await Partner.findByIdAndUpdate(id, update, { new: true });
        return res.status(200).json(updatedPartner);
    } catch (error) {
        console.error('error in updating partner:', error.message);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const deletePartner = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Partner Id" });
    }
    try {
        await Partner.findByIdAndDelete(id);
        return res.status(200).json({ message: "Partner deleted successfully" });
    } catch (error) {
        console.log("error in deleting partner:", error.message);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

