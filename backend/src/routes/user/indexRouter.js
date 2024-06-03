import express from 'express';
import addressRouter from './addressRouter.js';
import orderRouter from './orderRouter.js';
import profileRouter from './profileRouter.js';
import reviewRouter from './reviewRouter.js';

const userRouter = express.Router();
userRouter.use('/profile', profileRouter);
userRouter.use('/address', addressRouter);
userRouter.use('/order', orderRouter);
userRouter.use('/review', reviewRouter);

export default userRouter;
