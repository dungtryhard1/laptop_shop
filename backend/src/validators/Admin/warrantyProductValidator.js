import Joi from 'joi';

const warrantyProductValidator = {
    create: Joi.object({
        validUntil: Joi.date().required(),
        description: Joi.string().required(),
    }),
    update: Joi.object({
        validUntil: Joi.date(),
        description: Joi.string(),
        isHidden: Joi.boolean(),
    }),
};

export default warrantyProductValidator;
