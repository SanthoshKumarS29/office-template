import multer from "multer";
import path from "path";
import fs from "fs";

const resumeDir = path.join(process.cwd(), "public", "uploads", "resumes");
if (!fs.existsSync(resumeDir)) fs.mkdirSync(resumeDir, {recursive: true});


const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, resumeDir),

    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();

        cb(null, `resume-${Date.now()}${ext}`)
    } 
})

const fileFilter = (req, file, cb) => {
    const allowed = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
    if(allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Only Pdf or Word document allowedd"), false)
}

export const uploadResume = multer({
    storage,
    fileFilter,
    limits: {fileSize: 10 * 1024 * 1024} //10MB
})