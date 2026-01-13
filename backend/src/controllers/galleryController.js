import Gallery from "../models/galleryModel.js";

// @desc    Get all gallery items
// @route   GET /api/gallery
export const getGalleryItems = async (req, res) => {
  try {
    const items = await Gallery.find({}).sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching gallery items", error: error.message });
  }
};

// @desc    Add new gallery item
// @route   POST /api/gallery
export const addGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding gallery item", error: error.message });
  }
};

// @desc    Delete gallery item
// @route   DELETE /api/gallery/:id
export const deleteGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (item) {
      await item.deleteOne();
      res.status(200).json({ message: "Media item removed" });
    } else {
      res.status(404).json({ message: "Media item not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting gallery item", error: error.message });
  }
};
