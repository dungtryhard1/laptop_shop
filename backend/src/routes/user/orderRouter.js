import { Router } from 'express';
import validate from '../../middlewares/validate.js';
import orderValidator from '../../validators/User/orderValidator.js';
import orderController from '../../controller/user/orderController.js';
import blogMiddlewares from '../../middlewares/user/blogMiddlewares.js';

const orderRouter = Router();
orderRouter.post(
    '/',
    validate(orderValidator.create),
    blogMiddlewares.create,
    orderController.create
);

orderRouter.get('/:id', orderController.get);
orderRouter.get('/search/:userId', orderController.gets);

orderRouter.get('/', orderController.gets);

orderRouter.put('/:id', orderController.cancel);

export default orderRouter;
