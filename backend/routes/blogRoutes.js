import express from "express";
import { 
  getBlogs, 
  getBlogsAll,
  getBlog,
  getBlogById,
  createBlog, 
  updateBlog, 
  deleteBlog 
} from "../controllers/blogController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { uploadBlogImage } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", getBlogs);
router.get("/all", protect, adminOnly, getBlogsAll);
router.get("/:slug", getBlog);
router.get("/id/:id", protect, adminOnly, getBlogById);
router.post("/", protect, adminOnly, uploadBlogImage, createBlog);
router.put("/:id", protect, adminOnly, uploadBlogImage, updateBlog);
router.delete("/:id", protect, adminOnly, deleteBlog);

export default router;
