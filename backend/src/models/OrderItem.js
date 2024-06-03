import mongoose, { Schema } from 'mongoose';
const OrderItem = mongoose.model(
    'OrderItem',
    new Schema(
        {
            quantity: {
                type: Number,
                default: 1,
                required: true,
            },
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            orderId: {
                type: Schema.Types.ObjectId,
                ref: 'Order',
                required: true,
            },
            reviewId: {
                type: Schema.Types.ObjectId,
                ref: 'Review',
            },
        },
        {
            timestamps: true,
        }
    )
);

export default OrderItem;
