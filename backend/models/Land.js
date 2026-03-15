import mongoose from "mongoose";

const landSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    area: { type: Number, required: true }, // sq meters or acres
    landType: {
      type: String,
      enum: ["residential", "agricultural", "commercial", "industrial"],
      required: true,
    },
    utilities: [{ type: String }], // water, electricity, road access, etc.
    location: {
      address: { type: String },
      city: { type: String },
      state: { type: String },
      zipcode: { type: String },
      coordinates: {
        lat: { type: Number },
        lng: { type: Number },
      },
    },
    images: [{ type: String }], // URLs
    ownerName: { type: String },
    ownerContact: { type: String },
    assignedAgent: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ["available", "sold"], default: "available" },
  },
  { timestamps: true }
);

const Land = mongoose.model("Land", landSchema);
export default Land;