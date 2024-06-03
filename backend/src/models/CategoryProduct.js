import mongoose, { Schema } from 'mongoose';

const CategoryProduct = mongoose.model(
    'CategoryProduct',
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
            products: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    default: [],
                },
            ],
        },
        {
            timestamps: true,
        }
    )
);

export default CategoryProduct;
