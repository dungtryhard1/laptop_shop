import { Router } from 'express';
import validate from '../../middlewares/validate.js';
import parser from '../../lib/cloudinary.js';
import productValidator from '../../validators/Admin/productValidator.js';
import productController from '../../controller/admin/productController.js';
import productMiddlewares from '../../middlewares/admin/productMiddlewares.js';
const productRouter = Router();

// create
productRouter.post(
    '/',
    parser.array('images'),
    validate(productValidator.create),
    productMiddlewares.create,
    productController.create
);

// get all
productRouter.get('/', productController.gets);

// get a product
productRouter.get('/:id', productController.get);

// remove product
productRouter.delete('/:id', productController.remove);

// update a product
productRouter.put(
    '/:id',
    parser.array('images'),
    validate(productValidator.update),
    productMiddlewares.update,
    productController.update
);

export default productRouter;
