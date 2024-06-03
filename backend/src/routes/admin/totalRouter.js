import { Router } from 'express';
import orderController from '../../controller/admin/orderController.js';
import productController from '../../controller/admin/productController.js';

const totalRouter = Router();
totalRouter.get('/order', orderController.getTotal);
totalRouter.get('/product', productController.getTotal);
totalRouter.get('/profit', orderController.getTotalProfit);
totalRouter.get('/rating', orderController.getTotalRating);
totalRouter.get('/chart', productController.getChart);

export default totalRouter;
