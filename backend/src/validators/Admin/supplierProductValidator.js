import Joi from 'joi';

const supplierProductValidator = {
    create: Joi.object({
        name: Joi.string().required(),
        type: Joi.string(),
        contactInfo: Joi.string(),
    }),
    update: Joi.object({
        name: Joi.string(),
        type: Joi.string(),
        contactInfo: Joi.string(),
        isHidden: Joi.boolean(),
    }),
};

export default supplierProductValidator;
