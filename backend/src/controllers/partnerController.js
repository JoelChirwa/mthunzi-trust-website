import Partner from "../models/partnerModel.js";

// @desc    Get all partners
// @route   GET /api/partners
export const getPartners = async (req, res) => {
  try {
    const partners = await Partner.find({}).sort({ createdAt: 1 });
    res.status(200).json(partners);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching partners", error: error.message });
  }
};

// @desc    Create new partner
// @route   POST /api/partners
export const createPartner = async (req, res) => {
  try {
    const { name, logo, url } = req.body;

    const partner = await Partner.create({
      name,
      logo,
      url,
    });

    res.status(201).json(partner);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating partner", error: error.message });
  }
};

// @desc    Update partner
// @route   PUT /api/partners/:id
export const updatePartner = async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);

    if (partner) {
      partner.name = req.body.name || partner.name;
      partner.logo = req.body.logo || partner.logo;
      partner.url = req.body.url || partner.url;

      const updatedPartner = await partner.save();
      res.status(200).json(updatedPartner);
    } else {
      res.status(404).json({ message: "Partner not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating partner", error: error.message });
  }
};

// @desc    Delete partner
// @route   DELETE /api/partners/:id
export const deletePartner = async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (partner) {
      await partner.deleteOne();
      res.status(200).json({ message: "Partner removed" });
    } else {
      res.status(404).json({ message: "Partner not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting partner", error: error.message });
  }
};
