import mongoose, { Schema } from 'mongoose';
import Image from './schema/ImageSchema.js';

const Product = mongoose.model(
    'Product',
    new Schema(
        {
            name: {
                type: String,
                required: true,
            },
            description: {
                type: String,
            },
            price: {
                type: Number,
                required: true,
            },
            stockQuantity: {
                type: Number,
                required: true,
                default: 0,
            },
            attribute: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Attribute',
                    default: [],
                },
            ],
            warrantyId: {
                type: Schema.Types.ObjectId,
                ref: 'WarrantyProduct',
                required: true,
            },
            supplierId: {
                type: Schema.Types.ObjectId,
                ref: 'SupplierProduct',
                required: true,
            },
            categoryId: {
                type: Schema.Types.ObjectId,
                ref: 'CategoryProduct',
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
            orderItem: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'OrderItem',
                    required: true,
                },
            ],
            images: {
                type: [Image],
            },
        },
        {
            timestamps: true,
        }
    )
);

export default Product;
