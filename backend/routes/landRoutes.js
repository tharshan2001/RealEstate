import express from "express";
import { 
  getLands, 
  getLand, 
  createLand, 
  updateLand, 
  deleteLand 
} from "../controllers/landController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getLands);
router.get("/:slug", getLand);
router.post("/", protect, adminOnly, createLand);
router.put("/:id", protect, adminOnly, updateLand);
router.delete("/:id", protect, adminOnly, deleteLand);

export default router;
