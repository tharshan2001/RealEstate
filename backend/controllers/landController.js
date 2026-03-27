// Land Controller
import Land from "../models/Land.js";
import { uploadToS3 } from "../middleware/uploadMiddleware.js";

const generateSlug = async (title) => {
  const baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  let slug = baseSlug;
  let counter = 1;
  
  while (await Land.findOne({ slug })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  
  return slug;
};

// Get all lands
export const getLands = async (req, res) => {
  try {
    const lands = await Land.find({ isPublished: true }).sort({ createdAt: -1 });
    res.json(lands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all lands (admin - includes unpublished)
export const getLandsAll = async (req, res) => {
  try {
    const lands = await Land.find({}).sort({ createdAt: -1 });
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

// Get single land by ID (admin)
export const getLandById = async (req, res) => {
  try {
    const land = await Land.findById(req.params.id);
    if (!land) return res.status(404).json({ message: "Land not found" });
    res.json(land);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create land (admin)
export const createLand = async (req, res) => {
  try {
    const { title, location, region, size, type, price, description, features, coordinates, status, isPublished } = req.body;

    const parsedCoordinates = coordinates ? JSON.parse(coordinates) : null;
    const slug = await generateSlug(title);

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

    if (updateData.features && typeof updateData.features === "string") {
      updateData.features = JSON.parse(updateData.features);
    }

    if (req.files && req.files.length > 0) {
      const newGallery = [];
      for (const file of req.files) {
        const url = await uploadToS3(file, "lands/");
        newGallery.push(url);
      }
      
      const existingGallery = req.body.existingGallery ? JSON.parse(req.body.existingGallery) : [];
      updateData.gallery = [...existingGallery, ...newGallery].slice(0, 8);
      
      if (req.body.existingHeroImg) {
        updateData.heroImg = req.body.existingHeroImg;
      } else if (updateData.gallery.length > 0) {
        updateData.heroImg = updateData.gallery[0];
      }
    } else {
      if (req.body.existingGallery) {
        updateData.gallery = JSON.parse(req.body.existingGallery);
      }
      if (req.body.existingHeroImg) {
        updateData.heroImg = req.body.existingHeroImg;
      }
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
