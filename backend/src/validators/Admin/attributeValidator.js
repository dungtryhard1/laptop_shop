import Joi from 'joi';

const attribute = Joi.object({
    key: Joi.string().required(),
    value: Joi.string().required(),
});

const attributeValidator = {
    create: attribute,
    update: attribute,
};

export default attributeValidator;
