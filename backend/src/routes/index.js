import { Router } from 'express';
import authRouter from './authRouter.js';
import userRouter from './user/indexRouter.js';
import publicRouter from './public/indexRouter.js';
import adminRouter from './admin/indexRouter.js';
import authorizationMiddlewares from '../middlewares/authorizationMiddlewares.js';
import errorHandler from '../middlewares/errorHandler.js';

const routes = new Router();

routes.use('/auth', authRouter);
routes.use('/public', publicRouter);
routes.use('/admin', authorizationMiddlewares.admin, adminRouter);
routes.use('/user', authorizationMiddlewares.user, userRouter);
routes.use(errorHandler);
export default routes;
