import mongoose from "mongoose";

const landSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    region: { type: String, required: true },
    size: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String },
    features: [{ type: String }],
    heroImg: { type: String },
    gallery: [{ type: String }],
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    status: { type: String, enum: ["available", "sold"], default: "available" },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Land = mongoose.model("Land", landSchema);
export default Land;
