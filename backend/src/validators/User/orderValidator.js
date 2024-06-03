import Joi from 'joi';

const orderValidator = {
    create: Joi.object({
        couponId: Joi.string(),
        addressId: Joi.string().required(),
        userId: Joi.string().required(),
        amount: Joi.number().required(),
        shippingDate: Joi.date().required(),
        estimatedArrivalDate: Joi.date().required(),
        note: Joi.string(),
        orderItem: Joi.array()
            .items(
                Joi.object({
                    quantity: Joi.number().required(),
                    productId: Joi.string().required(),
                })
            )
            .required()
            .min(1),
    }),
    update: Joi.object({
        status: Joi.string()
            .valid('packaging', 'transfer', 'success', 'failure')
            .required(),
        shippingDate: Joi.date(),
        estimatedArrivalDate: Joi.date(),
    }),
};

export default orderValidator;
