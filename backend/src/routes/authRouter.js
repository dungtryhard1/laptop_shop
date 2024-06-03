import express from 'express';
import authorization from '../utils/authorization.js';
import validate from '../middlewares/validate.js';
import authValidator from '../validators/authValidator.js';
import authController from '../controller/authController.js';

const authRouter = express.Router();

authRouter.post(
    '/register',
    validate(authValidator.register),
    authController.register
);
authRouter.post(
    '/login',
    validate(authValidator.login),
    authController.login
);
authRouter.post(
    '/forgot-password',
    validate(authValidator.forgotPassword),
    authController.forgotPassword
);
authRouter.post(
    '/gen-otp',
    validate(authValidator.genOTP),
    authController.genOTP
);
authRouter.post(
    '/verify-otp',
    validate(authValidator.verifyOTP),
    authController.verifyOTP
);
authRouter.post(
    '/logout',
    authorization.verifyToken,
    authController.logout
);
authRouter.post(
    '/change-password',
    validate(authValidator.changePassword),
    authController.changePassword
);
export default authRouter;
