import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/realestate");
    
    const adminExists = await User.findOne({ email: "admin@northernestate.lk" });
    
    if (adminExists) {
      console.log("Admin user already exists");
    } else {
      await User.create({
        name: "Admin",
        email: "admin@northernestate.lk",
        password: "admin123", // In production, use hashed password
        role: "admin",
        phone: "+94771234567"
      });
      console.log("Admin user created: admin@northernestate.lk / admin123");
    }
    
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};

seedAdmin();