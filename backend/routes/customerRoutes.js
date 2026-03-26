import express from "express";
import { 
  getCustomers, 
  createCustomer, 
  updateCustomer, 
  deleteCustomer 
} from "../controllers/customerController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, adminOnly, getCustomers);
router.post("/", createCustomer);
router.put("/:id", protect, adminOnly, updateCustomer);
router.delete("/:id", protect, adminOnly, deleteCustomer);

export default router;
