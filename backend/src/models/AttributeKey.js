import mongoose, { Schema } from 'mongoose';

const AttributeKey = mongoose.model(
    'AttributeKey',
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
        },
        {
            timestamps: true,
        }
    )
);

export default AttributeKey;
