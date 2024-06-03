import Joi from 'joi';

const addressValidator = {
    create: Joi.object({
        numberPhone: Joi.string().required(),
        addressDetail: Joi.string().required(),
        district: Joi.string().required(),
        city: Joi.string().required(),
        country: Joi.string().required(),
    }),
    update: Joi.object({
        numberPhone: Joi.string(),
        addressDetail: Joi.string(),
        district: Joi.string(),
        city: Joi.string(),
        country: Joi.string(),
    }),
};

export default addressValidator;
