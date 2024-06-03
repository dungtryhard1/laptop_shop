import mongoose, { Schema } from 'mongoose';

const WarrantyProduct = mongoose.model(
    'WarrantyProduct',
    new Schema(
        {
            description: {
                type: String,
                required: true,
            },
            validUntil: {
                type: Date,
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

export default WarrantyProduct;
