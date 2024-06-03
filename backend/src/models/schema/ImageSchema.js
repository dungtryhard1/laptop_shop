import { Schema } from 'mongoose';

const Image = new Schema(
    {
        url: {
            type: String,
            required: true,
        },
        publicId: {
            type: String,
            required: true,
        },
        caption: {
            type: String,
        },
        isMain: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);
export default Image;
