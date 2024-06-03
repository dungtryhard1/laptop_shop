/* eslint-disable no-undef */
import jwt from 'jsonwebtoken';
import CustomError from '../outcomes/customError.js';

const authorizationMiddlewares = {
    admin: (req, res, next) => {
        try {
            // Lấy token từ request gửi đến
            const token = req.headers?.authorization?.split(' ')[1];
            const jwtObj = jwt.verify(
                token,
                process.env.SECRET_JWT_KEY
            );
            // Check role
            if (jwtObj.role !== 'admin') {
                next(new CustomError('Authorization', 401));
            }
            if (Date.now() > jwtObj.exp * 1000) {
                next(new CustomError('Token is expired', 400));
            }
            next();
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
    user: (req, res, next) => {
        try {
            // Lấy token từ request gửi đến
            const token = req.headers?.authorization?.split(' ')[1];
            const jwtObj = jwt.verify(
                token,
                process.env.SECRET_JWT_KEY
            );
            // Check role
            if (jwtObj.role !== 'user' && jwtObj.role !== 'admin') {
                next(new CustomError('Authorization', 401));
            }
            if (Date.now() > jwtObj.exp * 1000) {
                next(new CustomError('Token is expired', 400));
            }
            req.userId = jwtObj._id;
            next();
        } catch (error) {
            next(new CustomError(error.message, 500));
        }
    },
};

export default authorizationMiddlewares;
