import { Router } from 'express';
import orderController from '../../controller/admin/orderController.js';
import orderValidator from '../../validators/User/orderValidator.js';
import validate from '../../middlewares/validate.js';

const orderRouter = Router();
orderRouter.get('/:id', orderController.get);
orderRouter.get('/', orderController.gets);
orderRouter.put(
    '/:id',
    validate(orderValidator.update),
    orderController.update
);

export default orderRouter;
