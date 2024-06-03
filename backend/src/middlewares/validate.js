import CustomError from '../outcomes/customError.js';

const validate = (schema) => {
    return async function (req, res, next) {
        try {
            const validated = await schema.validateAsync(req.body);
            req.body = validated;
            next();
        } catch (err) {
            //* Pass err to next
            //! If validation error occurs call next with HTTP 422. Otherwise HTTP 500
            if (err.isJoi) {
                next(new CustomError(err.message, 422));
            }
            next(new CustomError(err.message, 400));
        }
    };
};

export default validate;
