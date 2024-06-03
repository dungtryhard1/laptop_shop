import mongoose, { Schema } from 'mongoose';
import Image from './schema/ImageSchema.js';
const Review = mongoose.model(
    'Review',
    new Schema(
        {
            comment: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                max: 5,
                required: true,
            },
            isHidden: {
                type: Boolean,
                required: true,
                default: false,
            },
            isDeleted: {
                type: Boolean,
                required: true,
                default: false,
            },
            orderItemId: {
                type: Schema.Types.ObjectId,
                ref: 'OrderItem',
                required: true,
            },
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            images: {
                type: [Image],
            },
        },
        {
            timestamps: true,
        }
    )
);

export default Review;
