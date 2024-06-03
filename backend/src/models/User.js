import mongoose, { Schema } from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';
const User = mongoose.model(
    'User',
    new Schema(
        {
            username: {
                type: String,
                required: true,
                validate: {
                    validator: (value) => value.length > 3,
                    message:
                        'Length of name must be greater than 3 characters.',
                },
                trim: true,
            },
            email: {
                type: String,
                required: true,
                unique: true,
                validate: {
                    validator: () => isEmail,
                    message: 'Email is incorrect format.',
                },
            },
            password: {
                type: String,
                required: true,
                validate: {
                    validator: (value) =>
                        value.match(
                            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[#?!@$ %^&*-]).{8,}$/
                        ),
                    message:
                        'Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character',
                },
            },
            status: {
                type: String,
                enum: ['active', 'de-active', 'block'],
                default: 'de-active',
            },
            role: {
                type: String,
                enum: ['admin', 'user'],
                default: 'user',
            },

            phoneNumber: {
                type: String,
                trim: false,
            },
            confirmationCode: {
                type: String,
            },
            confirmationCodExpired: {
                type: String,
            },
            address: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Address',
                },
            ],
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

export default User;
