import { Router } from 'express';
import validate from '../../middlewares/validate.js';
import couponValidator from '../../validators/Admin/couponValidator.js';
import couponController from '../../controller/admin/couponController.js';

const couponRouter = Router();

// create
couponRouter.post(
    '/',
    validate(couponValidator.create),
    couponController.create
);
couponRouter.get('/', couponController.gets);
couponRouter.get('/:id', couponController.get);
couponRouter.put(
    '/:id',
    validate(couponValidator.update),
    couponController.update
);
couponRouter.delete('/:id', couponController.remove);

export default couponRouter;
