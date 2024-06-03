import mongoose, { Schema } from 'mongoose';
const Address = mongoose.model(
    'Address',
    new Schema(
        {
            numberPhone: {
                type: String,
                required: true,
            },
            addressDetail: {
                type: String,
                required: true,
            },
            district: { type: String, required: true },
            city: { type: String, required: true },
            country: { type: String, required: true },
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            order: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Order',
                    required: true,
                },
            ],
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

export default Address;
