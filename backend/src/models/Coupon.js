import mongoose, { Schema } from 'mongoose';
const Coupon = mongoose.model(
    'Coupon',
    new Schema(
        {
            code: {
                type: String,
                unique: true,
                required: true,
            },
            description: {
                type: String,
            },
            discountPercent: {
                type: Number,
                max: 1,
                required: true,
            },
            validFrom: { type: Date, required: true },
            validUntil: { type: Date, required: true },
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
            order: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Order',
                    required: true,
                },
            ],
        },
        {
            timestamps: true,
        }
    )
);

export default Coupon;
