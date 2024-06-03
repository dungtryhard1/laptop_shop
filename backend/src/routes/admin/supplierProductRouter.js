import { Router } from 'express';
import validate from '../../middlewares/validate.js';
import supplierProductValidator from '../../validators/Admin/supplierProductValidator.js';
import supplierProductController from '../../controller/admin/supplierProductController.js';

const supplierProductRouter = Router();

// create
supplierProductRouter.post(
    '/',
    validate(supplierProductValidator.create),
    supplierProductController.create
);
supplierProductRouter.get('/', supplierProductController.gets);
supplierProductRouter.get('/:id', supplierProductController.get);
supplierProductRouter.put(
    '/:id',
    validate(supplierProductValidator.update),
    supplierProductController.update
);
supplierProductRouter.delete(
    '/:id',
    supplierProductController.remove
);

export default supplierProductRouter;
