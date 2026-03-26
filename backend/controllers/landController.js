// Land Controller
import Land from "../models/Land.js";
import { uploadToS3 } from "../middleware/uploadMiddleware.js";

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
    const { title, slug, location, region, size, type, price, description, features, coordinates, status, isPublished } = req.body;

    const parsedCoordinates = coordinates ? JSON.parse(coordinates) : null;

    const gallery = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const url = await uploadToS3(file, "lands/");
        gallery.push(url);
      }
    }

    const land = new Land({
      title,
      slug,
      location,
      region,
      size,
      type,
      price,
      description,
      features: features ? JSON.parse(features) : [],
      heroImg: gallery[0] || "",
      gallery,
      coordinates: parsedCoordinates,
      status: status || "available",
      isPublished: isPublished !== undefined ? isPublished : true,
    });

    const savedLand = await land.save();
    res.status(201).json(savedLand);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update land (admin)
export const updateLand = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (updateData.coordinates && typeof updateData.coordinates === "string") {
      updateData.coordinates = JSON.parse(updateData.coordinates);
    }

    if (req.files && req.files.length > 0) {
      const newGallery = [];
      for (const file of req.files) {
        const url = await uploadToS3(file, "lands/");
        newGallery.push(url);
      }
      
      const existingGallery = req.body.existingGallery ? JSON.parse(req.body.existingGallery) : [];
      updateData.gallery = [...existingGallery, ...newGallery].slice(0, 8);
      
      if (!updateData.heroImg && updateData.gallery.length > 0) {
        updateData.heroImg = updateData.gallery[0];
      }
    }

    if (updateData.features && typeof updateData.features === "string") {
      updateData.features = JSON.parse(updateData.features);
    }

    const land = await Land.findByIdAndUpdate(req.params.id, updateData, { new: true });
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
