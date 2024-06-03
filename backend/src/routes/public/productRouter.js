import { Router } from 'express';
import productController from '../../controller/public/productController.js';
import validate from '../../middlewares/validate.js';
import productValidator from '../../validators/Admin/productValidator.js';
const productRouter = Router();

productRouter.get(
    '/',
    validate(productValidator.filter),
    productController.gets
);
productRouter.get('/top-selling', productController.getTopSelling);
productRouter.get('/top-new', productController.getTopNew);
productRouter.get('/:id', productController.get);
export default productRouter;
