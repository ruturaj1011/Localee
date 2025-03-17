import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => {
        return {
            folder: `vendor_services/${req.params.vendorId}`, // Dynamic folder based on vendor ID
            allowed_formats: ["jpeg", "png", "jpg"],
        };
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
    fileFilter: (req, file, cb) => {
        if (["image/jpeg", "image/png", "image/jpg"].includes(file.mimetype)) {
            cb(null, true); // Accept the file
        } else {
            cb(new Error("Invalid file type. Only JPEG, PNG, and JPG are allowed."), false);
        }
    },
})

export default upload;