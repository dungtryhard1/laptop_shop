import mongoose, { Schema } from 'mongoose';

const SupplierProduct = mongoose.model(
    'SupplierProduct',
    new Schema(
        {
            name: {
                type: String,
                required: true,
            },
            type: {
                type: String,
            },
            contactInfo: {
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

export default SupplierProduct;
