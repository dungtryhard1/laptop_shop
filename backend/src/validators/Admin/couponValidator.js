import Joi from 'joi';

const couponValidator = {
    create: Joi.object({
        code: Joi.string().required(),
        description: Joi.string(),
        discountPercent: Joi.number().max(1),
        validFrom: Joi.date(),
        validUntil: Joi.date(),
    }),
    update: Joi.object({
        description: Joi.string(),
        discountPercent: Joi.number().max(1),
        validFrom: Joi.date(),
        validUntil: Joi.date(),
        isHidden: Joi.boolean(),
    }),
};

export default couponValidator;
