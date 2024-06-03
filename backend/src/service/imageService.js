import { v2 as cloudinary } from 'cloudinary';

const imageService = {
    upload: async (path) => {
        const results = await cloudinary.uploader.upload(path);
        return {
            url: results.secure_url,
            publicId: results.public_id,
        };
    },
    remove: async (publicId) => {
        await cloudinary.uploader.destroy(publicId);
    },
};
export default imageService;
