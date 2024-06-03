import Joi from 'joi';

const blogValidator = {
    create: Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        publishDate: Joi.date().required(),
        categoryBlogId: Joi.string().required(),
        images: Joi.array().items(Joi.any()),
    }),
    update: Joi.object({
        images: Joi.array().items(Joi.any()),
        blog: Joi.object({
            title: Joi.string(),
            content: Joi.string(),
            publishDate: Joi.date(),
            categoryBlogId: Joi.string(),
            isHidden: Joi.boolean(),
        }),
    }),
};

export default blogValidator;
