import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadPdfToCloudinary = (fileBuffer, originalName) => {
  return new Promise((resolve, reject) => {
    const cleanName = originalName.replace(/\.[^/.]+$/, '').replace(/\s+/g, '_');

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'luot_notices',
        resource_type: 'auto',
        public_id: `notice-${Date.now()}-${cleanName}`,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );

    stream.end(fileBuffer);
  });
};

export default cloudinary;