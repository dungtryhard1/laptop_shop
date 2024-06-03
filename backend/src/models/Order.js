import mongoose, { Schema } from 'mongoose';
import OrderStatus from './schema/OrderStatusSchema.js';
const Order = mongoose.model(
    'Order',
    new Schema(
        {
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            couponId: {
                type: Schema.Types.ObjectId,
                ref: 'Coupon',
            },
            addressId: {
                type: Schema.Types.ObjectId,
                ref: 'Address',
                required: true,
            },
            amount: {
                type: Number,
                required: true,
            },
            shippingDate: {
                type: Date,
                required: true,
            },
            estimatedArrivalDate: {
                type: Date,
                required: true,
            },
            note: {
                type: String,
            },
            orderItem: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'OrderItem',
                },
            ],
            orderStatus: [OrderStatus],
        },
        {
            timestamps: true,
        }
    )
);

export default Order;
