import mongoose, { Schema } from 'mongoose';

const CategoryBlog = mongoose.model(
    'CategoryBlog',
    new Schema(
        {
            name: {
                type: String,
                required: true,
            },
            description: {
                type: String,
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
            blogs: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Blog',
                    default: [],
                },
            ],
        },
        {
            timestamps: true,
        }
    )
);

export default CategoryBlog;
