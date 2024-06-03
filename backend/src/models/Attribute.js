import mongoose, { Schema } from 'mongoose';

const Attribute = mongoose.model(
    'Attribute',
    new Schema(
        {
            key: {
                type: Schema.Types.ObjectId,
                ref: 'AttributeKey',
                required: true,
            },
            value: {
                type: String,
                required: true,
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

export default Attribute;
