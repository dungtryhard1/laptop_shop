/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'laptop-shop',
        format: 'png',
        public_id: (req, file) => file.filename,
    },
});

const parser = multer({ storage: storage });
export default parser;
