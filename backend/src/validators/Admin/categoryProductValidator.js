import Joi from 'joi';

const categoryProductValidator = {
    create: Joi.object({
        name: Joi.string().required(),
        description: Joi.string(),
    }),
    update: Joi.object({
        name: Joi.string().required(),
        description: Joi.string(),
        isHidden: Joi.boolean().required(),
    }),
};

export default categoryProductValidator;
