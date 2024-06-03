import { Router } from 'express';
import validate from '../../middlewares/validate.js';
import addressController from '../../controller/user/addressController.js';
import addressValidator from '../../validators/User/addressValidator.js';

const addressRouter = Router();

// create
addressRouter.post(
    '/',
    validate(addressValidator.create),
    addressController.create
);
addressRouter.get('/', addressController.gets);
addressRouter.get('/:id', addressController.get);
addressRouter.put(
    '/:id',
    validate(addressValidator.update),
    addressController.update
);
addressRouter.delete('/:id', addressController.remove);

export default addressRouter;
