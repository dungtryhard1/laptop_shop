import { Router } from 'express';
import validate from '../../middlewares/validate.js';
import warrantyProductValidator from '../../validators/Admin/warrantyProductValidator.js';
import warrantyProductController from '../../controller/admin/warrantyProductController.js';

const warrantyProductRouter = Router();

// create
warrantyProductRouter.post(
    '/',
    validate(warrantyProductValidator.create),
    warrantyProductController.create
);
warrantyProductRouter.get('/', warrantyProductController.gets);
warrantyProductRouter.get('/:id', warrantyProductController.get);
warrantyProductRouter.put(
    '/:id',
    validate(warrantyProductValidator.update),
    warrantyProductController.update
);
warrantyProductRouter.delete(
    '/:id',
    warrantyProductController.remove
);

export default warrantyProductRouter;
