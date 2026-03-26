// Blog Controller
import Blog from "../models/Blog.js";
import { uploadToS3 } from "../middleware/uploadMiddleware.js";

// Get all blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true }).sort({ publishedAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single blog
export const getBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, isPublished: true });
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create blog (admin)
export const createBlog = async (req, res) => {
  try {
    const { title, slug, excerpt, content, category, author, isPublished } = req.body;

    let imageUrl = "";
    if (req.file) {
      imageUrl = await uploadToS3(req.file, "blogs/");
    }

    const blog = new Blog({
      title,
      slug,
      excerpt,
      content,
      image: imageUrl,
      category,
      author: author || "Estate Curator",
      isPublished: isPublished !== undefined ? isPublished : true,
    });

    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update blog (admin)
export const updateBlog = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = await uploadToS3(req.file, "blogs/");
    }

    const blog = await Blog.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete blog (admin)
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json({ message: "Blog deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
