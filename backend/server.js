import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import landRoutes from "./routes/landRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import { login, logout, getMe, register } from "./controllers/authController.js";
import { protect } from "./middleware/authMiddleware.js";

dotenv.config();
connectDB();

const app = express();

const corsOptions = {
  origin: ["http://localhost:5174", "http://localhost:3000"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/lands", landRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/customers", customerRoutes);

// Auth routes
app.post("/api/auth/login", login);
app.post("/api/auth/register", register);
app.post("/api/auth/logout", logout);
app.get("/api/auth/me", protect, getMe);

// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
