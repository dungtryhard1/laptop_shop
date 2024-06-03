import { Schema } from 'mongoose';
// TODO:
const OrderStatus = new Schema(
    {
        status: {
            type: String,
            enum: [
                'processing',
                'packaging',
                'transfer',
                'success',
                'failure',
                'cancel',
            ],
            default: 'processing',
            required: true,
        },
        step: {
            type: String,
            enum: [0, 1, 2, 3],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default OrderStatus;
