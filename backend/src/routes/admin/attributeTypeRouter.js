import { Router } from 'express';
import validate from '../../middlewares/validate.js';
import attributeValidator from '../../validators/Admin/attributeTypeValidator.js';
import attributeTypeController from '../../controller/admin/attributeTypeController.js';

const attributeTypeRouter = Router();

// create
attributeTypeRouter.post(
    '/',
    validate(attributeValidator.create),
    attributeTypeController.create
);
attributeTypeRouter.get('/', attributeTypeController.gets);
attributeTypeRouter.get('/:id', attributeTypeController.get);
attributeTypeRouter.put(
    '/:id',
    validate(attributeValidator.update),
    attributeTypeController.update
);
attributeTypeRouter.delete('/:id', attributeTypeController.remove);

export default attributeTypeRouter;
