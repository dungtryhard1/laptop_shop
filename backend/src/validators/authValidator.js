import Joi from 'joi';

const REGEX_PASSWORD =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$&*]).{8,}$/;

const authValidator = {
    login: Joi.object({
        email: Joi.string().email().lowercase().required(),
        password: Joi.string().regex(REGEX_PASSWORD).required(),
    }),
    register: Joi.object({
        email: Joi.string().email().lowercase().required(),
        password: Joi.string().regex(REGEX_PASSWORD).required(),
        username: Joi.string().required(),
        phoneNumber: Joi.string()
            .regex(/(84|0[3|5|7|8|9])+(\d{8})\b/)
            .required(),
    }),
    forgotPassword: Joi.object({
        email: Joi.string().email().lowercase().required(),
    }),

    genOTP: Joi.object({
        email: Joi.string().email().lowercase().required(),
    }),
    verifyOTP: Joi.object({
        email: Joi.string().email().required(),
        otp: Joi.string().length(6).required(),
    }),
    changePassword: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().regex(REGEX_PASSWORD).required(),
        newPassword: Joi.string().regex(REGEX_PASSWORD).required(),
    }),
};

export default authValidator;
