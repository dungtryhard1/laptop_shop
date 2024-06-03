import Joi from 'joi';

const reviewValidator = {
    create: Joi.object({
        rating: Joi.number().required(),
        comment: Joi.string().required(),
        images: Joi.array().items(Joi.any()),
    }),
};

export default reviewValidator;
