// Land Controller
import Land from "../models/Land.js";

// Get all lands
export const getLands = async (req, res) => {
  try {
    const lands = await Land.find({ isPublished: true }).sort({ createdAt: -1 });
    res.json(lands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single land
export const getLand = async (req, res) => {
  try {
    const land = await Land.findOne({ slug: req.params.slug, isPublished: true });
    if (!land) return res.status(404).json({ message: "Land not found" });
    res.json(land);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create land (admin)
export const createLand = async (req, res) => {
  try {
    const land = new Land(req.body);
    const savedLand = await land.save();
    res.status(201).json(savedLand);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update land (admin)
export const updateLand = async (req, res) => {
  try {
    const land = await Land.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!land) return res.status(404).json({ message: "Land not found" });
    res.json(land);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete land (admin)
export const deleteLand = async (req, res) => {
  try {
    const land = await Land.findByIdAndDelete(req.params.id);
    if (!land) return res.status(404).json({ message: "Land not found" });
    res.json({ message: "Land deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
