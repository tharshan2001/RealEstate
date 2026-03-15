import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    land: { type: mongoose.Schema.Types.ObjectId, ref: "Land", required: true },
    contactName: { type: String, required: true },
    contactEmail: { type: String },
    contactPhone: { type: String },
    message: { type: String },
    assignedAgent: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["new", "contacted", "inProgress", "closed"],
      default: "new",
    },
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
  },
  { timestamps: true }
);

const Lead = mongoose.model("Lead", leadSchema);
export default Lead;