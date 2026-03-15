import express from "express";
import {
  authUser,
  getUserProfile,
  adminLogin,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// User login
router.post("/login", authUser);

// Admin login
router.post("/admin-login", adminLogin);

// Get user profile (protected route)
router.get("/profile", protect, getUserProfile);

export default router;
