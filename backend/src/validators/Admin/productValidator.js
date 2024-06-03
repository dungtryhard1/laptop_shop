import Joi from 'joi';

const productValidator = {
    create: Joi.object({
        name: Joi.string().required(),
        description: Joi.string(),
        price: Joi.number().required(),
        stockQuantity: Joi.number(),
        warrantyId: Joi.string(),
        supplierId: Joi.string(),
        categoryId: Joi.string(),
        attribute: Joi.array().items(
            Joi.object({
                _id: Joi.string(),
                key: Joi.string().required(),
                value: Joi.string().required(),
            })
        ),
        images: Joi.any(),
    }),
    update: Joi.object({
        images: Joi.any(),
        product: Joi.object({
            name: Joi.string(),
            description: Joi.string(),
            price: Joi.number(),
            stockQuantity: Joi.number(),
            warrantyId: Joi.string(),
            supplierId: Joi.string(),
            categoryId: Joi.string(),
            attribute: Joi.array().items(
                Joi.object({
                    _id: Joi.string(),
                    key: Joi.string(),
                    value: Joi.string(),
                })
            ),
            images: Joi.any(),
            isHidden: Joi.boolean(),
        }),
    }),
    filter: Joi.object({
        supplier: Joi.array().items(Joi.string()),
        category: Joi.array().items(Joi.string()),
        attribute: Joi.array().items(Joi.string()),
        priceMax: Joi.number(),
        priceMin: Joi.number(),
        name: Joi.string(),
        sortName: Joi.string().valid('asc', 'desc'),
        sortPrice: Joi.string().valid('asc', 'desc'),
        page: Joi.number().default(1),
        perPage: Joi.number().default(10),
    }),
};

export default productValidator;
