import jwt from 'jsonwebtoken';
import CustomError from '../outcomes/customError.js';
// eslint-disable-next-line no-undef
const { SECRET_JWT_KEY } = process.env;

const verifyToken = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization) {
        const accessToken = authorization.split(' ')[1];
        try {
            const user = jwt.verify(accessToken, SECRET_JWT_KEY);
            req.user = user;
            next();
        } catch (err) {
            throw new CustomError('Token is not valid', 403);
        }
    } else {
        throw new CustomError('You are not authenticated', 401);
    }
};

export default {
    verifyToken,
};
