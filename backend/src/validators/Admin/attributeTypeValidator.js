import Joi from 'joi';

const attributeTypeValidator = {
    create: Joi.object({
        name: Joi.string().required(),
        description: Joi.string(),
    }),
    update: Joi.object({
        name: Joi.string(),
        description: Joi.string(),
        isHidden: Joi.boolean(),
    }),
};

export default attributeTypeValidator;
