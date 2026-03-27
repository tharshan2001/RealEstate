// middleware/uploadMiddleware.js
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
});

export const uploadToS3 = async (file, folder = "") => {
  if (!file) throw new Error("No file provided");

  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  const fileKey = `${folder}${uniqueSuffix}-${file.originalname}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileKey,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  await s3.send(command);

  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;
};

export const uploadLandImages = (req, res, next) => {
  req.uploadFolder = "lands/";
  const multerUpload = upload.array("images", 8);
  
  multerUpload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: err.message });
    }
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};

export const uploadBlogImage = (req, res, next) => {
  req.uploadFolder = "blogs/";
  const multerUpload = upload.single("image");
  
  multerUpload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: err.message });
    }
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};

export default upload;
