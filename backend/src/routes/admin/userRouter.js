import { Router } from 'express';
import userController from '../../controller/admin/userController.js';

const userRouter = Router();
userRouter.get('/', userController.gets);
userRouter.get('/:id', userController.get);
userRouter.put('/:id', userController.active);
export default userRouter;
