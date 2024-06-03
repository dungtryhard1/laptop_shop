import { Router } from 'express';
import validate from '../../middlewares/validate.js';
import categoryProductValidator from '../../validators/Admin/categoryProductValidator.js';
import categoryProductController from '../../controller/admin/categoryProductController.js';

const categoryProductRouter = Router();

// create
categoryProductRouter.post(
    '/',
    validate(categoryProductValidator.create),
    categoryProductController.create
);
categoryProductRouter.get('/', categoryProductController.gets);
categoryProductRouter.get('/:id', categoryProductController.get);
categoryProductRouter.put(
    '/:id',
    validate(categoryProductValidator.update),
    categoryProductController.update
);
categoryProductRouter.delete(
    '/:id',
    categoryProductController.remove
);

export default categoryProductRouter;
