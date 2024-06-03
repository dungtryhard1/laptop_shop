import { Router } from 'express';
import couponController from '../../controller/public/couponController.js';

const couponRouter = Router();

couponRouter.get('/search/:code', couponController.search);

export default couponRouter;
