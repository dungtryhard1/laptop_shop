import { Router } from 'express';
import userController from '../../controller/user/UserController.js';
import userValidator from '../../validators/User/userValidator.js';
import validate from '../../middlewares/validate.js';

const profileRouter = Router();
profileRouter.get('/:id', userController.get);
profileRouter.put(
    '/:id',
    validate(userValidator.update),
    userController.update
);

export default profileRouter;
