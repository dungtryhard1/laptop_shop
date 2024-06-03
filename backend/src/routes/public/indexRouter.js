import express from 'express';
import productRouter from './productRouter.js';
import attributeRouter from './attributeRouter.js';
import warrantyProductRouter from './warrantyProductRouter.js';
import supplierProductRouter from './supplierProductRouter.js';
import categoryProductRouter from './categoryProductRouter.js';
import categoryBlogRouter from './categoryBlogRouter.js';
import blogRouter from './blogRouter.js';
import couponRouter from './couponRouter.js';
import attributeTypeRouter from './attributeTypeRouter.js';

const publicRouter = express.Router();
publicRouter.use('/product', productRouter);
publicRouter.use('/attribute', attributeRouter);
publicRouter.use('/warranty', warrantyProductRouter);
publicRouter.use('/supplier', supplierProductRouter);
publicRouter.use('/category-product', categoryProductRouter);
publicRouter.use('/category-blog', categoryBlogRouter);
publicRouter.use('/blog', blogRouter);
publicRouter.use('/coupon', couponRouter);
publicRouter.use('/attribute-key', attributeTypeRouter);

export default publicRouter;
