import express from "express";
import { 
  getLands, 
  getLandsAll,
  getLand, 
  getLandById,
  createLand, 
  updateLand, 
  deleteLand 
} from "../controllers/landController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { uploadLandImages } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", getLands);
router.get("/all", protect, adminOnly, getLandsAll);
router.get("/:slug", getLand);
router.get("/id/:id", protect, adminOnly, getLandById);
router.post("/", protect, adminOnly, uploadLandImages, createLand);
router.put("/:id", protect, adminOnly, uploadLandImages, updateLand);
router.delete("/:id", protect, adminOnly, deleteLand);

export default router;
