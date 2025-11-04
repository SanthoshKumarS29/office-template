import multer from "multer";
import path from "path";
import fs from "fs";


const uploadDir = path.join(process.cwd(), "public", "uploads", "blogs"); // This line creates the full path to the destination folder.
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true }); //mkdirSync: Creates a directory "synchronously" (meaning the code waits for this to finish before moving on).

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext)
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9\-]/g, "");
        cb(null, `${name}-${Date.now()}${ext}`)
    }
})

const fileFilter = (req, file, cb) => {
  const allowed = ["image/png", "image/jpg", "image/jpeg", "image/webp", "image/gif"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};


export const upload = multer({ storage, fileFilter, limits: {fileSize: 5 * 1024 * 1024}}); // 5mb Limit