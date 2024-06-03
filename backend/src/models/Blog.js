import mongoose, { Schema } from 'mongoose';
import Image from './schema/ImageSchema.js';

const Blog = mongoose.model(
    'Blog',
    new Schema(
        {
            title: {
                type: String,
                required: true,
            },
            content: {
                type: String,
                required: true,
            },
            image: Image,
            publishDate: { type: Date, required: true },
            categoryBlogId: {
                type: Schema.Types.ObjectId,
                ref: 'CategoryBlog',
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
        },
        {
            timestamps: true,
        }
    )
);

export default Blog;
