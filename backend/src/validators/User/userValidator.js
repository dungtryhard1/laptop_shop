import Joi from 'joi';

const userValidator = {
    update: Joi.object({
        phoneNumber: Joi.string(),
    }),
};

export default userValidator;
