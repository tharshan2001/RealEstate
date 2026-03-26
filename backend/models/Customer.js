import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String, required: true },
    message: { type: String },
    property: { type: String }, // Which property they're interested in
    status: {
      type: String,
      enum: ["new", "contacted", "followup", "closed"],
      default: "new",
    },
    source: { type: String, default: "website" },
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);
export default Customer;
